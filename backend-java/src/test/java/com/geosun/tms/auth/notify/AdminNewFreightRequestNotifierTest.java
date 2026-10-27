package com.geosun.tms.auth.notify;

import static org.assertj.core.api.Assertions.assertThat;

import com.geosun.tms.auth.domain.user.Role;
import com.geosun.tms.auth.domain.user.User;
import com.geosun.tms.auth.dto.response.UserProfileDto;
import com.geosun.tms.chatbot.service.ChatbotMessages;
import com.geosun.tms.chatbot.service.ChatbotOutboundNotifier;
import java.util.List;
import org.junit.jupiter.api.Test;

/** Матриця отримувачів і текстів для FREIGHT_REQUEST_CREATED. */
class AdminNewFreightRequestNotifierTest {

  @Test
  void hasMessengersChannel_requiresExplicitFlag() {
    assertThat(AdminNewFreightRequestNotifier.hasMessengersChannel(null)).isFalse();
    assertThat(AdminNewFreightRequestNotifier.hasMessengersChannel(UserProfileDto.empty()))
        .isFalse();

    UserProfileDto emailOnly =
        new UserProfileDto("A", "B", null, "INDIVIDUAL", null, List.of("EMAIL"), List.of(), false);
    assertThat(AdminNewFreightRequestNotifier.hasMessengersChannel(emailOnly)).isFalse();

    UserProfileDto messengers =
        new UserProfileDto(
            "A", "B", null, "INDIVIDUAL", null, List.of("MESSENGERS"), List.of(), false);
    assertThat(AdminNewFreightRequestNotifier.hasMessengersChannel(messengers)).isTrue();
  }

  @Test
  void filterAuthor_excludesAuthorAdmin() {
    User author = new User();
    author.setId("author-1");
    author.setRole(Role.ADMIN);
    User other = new User();
    other.setId("admin-2");
    other.setRole(Role.ADMIN);

    assertThat(AdminNewFreightRequestNotifier.filterAuthor(List.of(author, other), "author-1"))
        .containsExactly("admin-2");
  }

  @Test
  void resolveLocale_unknownFallsBackToUa() {
    assertThat(ChatbotOutboundNotifier.resolveLocale(null)).isEqualTo("ua");
    assertThat(ChatbotOutboundNotifier.resolveLocale("")).isEqualTo("ua");
    assertThat(ChatbotOutboundNotifier.resolveLocale("EN")).isEqualTo("en");
    assertThat(ChatbotOutboundNotifier.resolveLocale("xx")).isEqualTo("ua");
  }

  @Test
  void freightRequestCreated_textsByLocale() {
    String ua =
        ChatbotMessages.freightRequestCreated("ua", 42L, "u@example.com", "http://x?requestId=42");
    assertThat(ua).contains("новий запит");
    assertThat(ua).contains("Id: 42");
    assertThat(ua).contains("u@example.com");

    String en =
        ChatbotMessages.freightRequestCreated("en", 42L, "u@example.com", "http://x?requestId=42");
    assertThat(en).contains("new freight");

    String ru =
        ChatbotMessages.freightRequestCreated("ru", 42L, "u@example.com", "http://x?requestId=42");
    assertThat(ru).contains("новый запрос");
  }
}
