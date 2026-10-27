package com.geosun.tms.chatbot.service;

import com.geosun.tms.chatbot.adapter.ChatbotChannelAdapter;
import com.geosun.tms.chatbot.adapter.ChatbotOutboundMessage;
import com.geosun.tms.chatbot.domain.BotIdentity;
import com.geosun.tms.chatbot.domain.BotIdentityStatus;
import com.geosun.tms.chatbot.domain.BotMessageDirection;
import com.geosun.tms.chatbot.domain.BotMessageLog;
import com.geosun.tms.chatbot.domain.BotMessageStatus;
import com.geosun.tms.chatbot.domain.ChatbotChannel;
import com.geosun.tms.chatbot.repository.BotIdentityRepository;
import com.geosun.tms.chatbot.repository.BotMessageLogRepository;
import java.time.Instant;
import java.util.EnumMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.function.Function;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 * Outbound для доменних подій ({@code USER_REGISTERED}, {@code FREIGHT_REQUEST_CREATED}).
 */
@Service
public class ChatbotOutboundNotifier {

  public static final String EVENT_USER_REGISTERED = "USER_REGISTERED";
  public static final String EVENT_FREIGHT_REQUEST_CREATED = "FREIGHT_REQUEST_CREATED";

  private static final Logger log = LoggerFactory.getLogger(ChatbotOutboundNotifier.class);

  private final BotIdentityRepository botIdentityRepository;
  private final BotMessageLogRepository botMessageLogRepository;
  private final Map<ChatbotChannel, ChatbotChannelAdapter> adaptersByChannel;

  public ChatbotOutboundNotifier(
      BotIdentityRepository botIdentityRepository,
      BotMessageLogRepository botMessageLogRepository,
      List<ChatbotChannelAdapter> adapters) {
    this.botIdentityRepository = botIdentityRepository;
    this.botMessageLogRepository = botMessageLogRepository;
    Map<ChatbotChannel, ChatbotChannelAdapter> map = new EnumMap<>(ChatbotChannel.class);
    for (ChatbotChannelAdapter adapter : adapters) {
      map.put(adapter.channel(), adapter);
    }
    this.adaptersByChannel = Map.copyOf(map);
  }

  /**
   * Надіслати повідомлення на всі ACTIVE-прив'язки користувача (реєстрація).
   *
   * @return кількість успішних SENT
   */
  @Transactional
  public int notifyUserRegistered(
      @NonNull String recipientUserId, @NonNull String newUserId, @NonNull String messageText) {
    String text = Objects.requireNonNull(messageText);
    return notifyActiveIdentities(
        Objects.requireNonNull(recipientUserId),
        EVENT_USER_REGISTERED,
        Objects.requireNonNull(newUserId),
        identity -> text,
        "admin_notify");
  }

  /**
   * Надіслати повідомлення про новий запит на розрахунок (текст за locale прив'язки).
   *
   * @return кількість успішних SENT
   */
  @Transactional(propagation = Propagation.REQUIRES_NEW)
  public int notifyFreightRequestCreated(
      @NonNull String recipientUserId,
      @NonNull Long requestId,
      @NonNull String authorEmail,
      @NonNull String queueLink) {
    Long id = Objects.requireNonNull(requestId);
    String email = Objects.requireNonNull(authorEmail);
    String link = Objects.requireNonNull(queueLink);
    return notifyActiveIdentities(
        Objects.requireNonNull(recipientUserId),
        EVENT_FREIGHT_REQUEST_CREATED,
        Objects.requireNonNull(String.valueOf(id)),
        identity ->
            ChatbotMessages.freightRequestCreated(
                resolveLocale(identity.getLocale()), id, email, link),
        "freight_request_notify");
  }

  private int notifyActiveIdentities(
      @NonNull String recipientUserId,
      @NonNull String eventType,
      @NonNull String aggregateId,
      @NonNull Function<BotIdentity, String> textResolver,
      @NonNull String logPrefix) {
    String adminId = Objects.requireNonNull(recipientUserId);
    String event = Objects.requireNonNull(eventType);
    String aggregate = Objects.requireNonNull(aggregateId);

    List<BotIdentity> identities =
        botIdentityRepository.findByUserIdAndStatus(adminId, BotIdentityStatus.ACTIVE);
    if (identities.isEmpty()) {
      log.info("{}_messenger_skipped_no_identity adminId={}", logPrefix, adminId);
      return 0;
    }

    int sent = 0;
    Set<ChatbotChannel> seenChannels = new HashSet<>();
    for (BotIdentity identity : identities) {
      ChatbotChannel channel = identity.getChannel();
      // Один канал — одне повідомлення (перша ACTIVE-прив'язка).
      if (!seenChannels.add(channel)) {
        continue;
      }
      String idempotencyKey = event + "|" + aggregate + "|" + adminId + "|" + channel.name();
      if (botMessageLogRepository.existsByIdempotencyKey(idempotencyKey)) {
        continue;
      }
      ChatbotChannelAdapter adapter = adaptersByChannel.get(channel);
      if (adapter == null || !adapter.enabled()) {
        log.info(
            "{}_messenger_channel_disabled adminId={} channel={}", logPrefix, adminId, channel);
        continue;
      }
      if (channel == ChatbotChannel.WHATSAPP) {
        // Шаблон Meta ще не заведений — вільний текст поза 24h window заборонений.
        log.info("{}_whatsapp_template_missing adminId={}", logPrefix, adminId);
        continue;
      }
      String text = Objects.requireNonNull(textResolver.apply(identity));
      if (sendAndLog(adapter, identity, text, event, idempotencyKey, logPrefix)) {
        sent++;
      }
    }
    return sent;
  }

  private boolean sendAndLog(
      ChatbotChannelAdapter adapter,
      BotIdentity identity,
      String text,
      String eventType,
      String idempotencyKey,
      String logPrefix) {
    BotMessageStatus status = BotMessageStatus.SENT;
    String providerError = null;
    try {
      adapter.send(
          new ChatbotOutboundMessage(
              Objects.requireNonNull(identity.getExternalUserId()),
              Objects.requireNonNull(text),
              false));
    } catch (Exception ex) {
      status = BotMessageStatus.FAILED;
      providerError = truncate(ex.getMessage(), 256);
      log.warn("{}_messenger_failed: {}", logPrefix, ex.getMessage());
    }
    BotMessageLog row = new BotMessageLog();
    row.setDirection(BotMessageDirection.OUT);
    row.setChannel(adapter.channel());
    row.setIdentityId(identity.getId());
    row.setUserId(identity.getUserId());
    row.setEventType(eventType);
    row.setIdempotencyKey(idempotencyKey);
    row.setStatus(status);
    row.setPayloadPreview(truncate(text, 512));
    row.setProviderError(providerError);
    row.setAttemptCount(1);
    if (status == BotMessageStatus.SENT) {
      row.setSentAt(Instant.now());
    }
    try {
      botMessageLogRepository.save(Objects.requireNonNull(row));
    } catch (DataIntegrityViolationException ex) {
      // Унікальний idempotency_key — повторне повідомлення ігноруємо.
      log.info("{}_messenger_duplicate_skipped key={}", logPrefix, idempotencyKey);
      return false;
    }
    if (status == BotMessageStatus.SENT) {
      log.info(
          "{}_messenger_queued adminId={} channel={}",
          logPrefix,
          identity.getUserId(),
          adapter.channel());
      return true;
    }
    return false;
  }

  @NonNull
  public static String resolveLocale(String locale) {
    if (locale == null || locale.isBlank()) {
      return "ua";
    }
    String normalized = locale.trim().toLowerCase();
    return switch (normalized) {
      case "en", "ru", "ua" -> normalized;
      default -> "ua";
    };
  }

  private static String truncate(String value, int max) {
    if (value == null) {
      return null;
    }
    if (value.length() <= max) {
      return value;
    }
    return value.substring(0, max);
  }
}
