package com.geosun.tms.auth.notify;

import com.geosun.tms.routes.port.FreightRequestCreatedNotifyPort;
import java.util.Objects;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;

/** Адаптер порту маршрутів → async-нотифаєр (як AuthService → AdminNewUserNotifier). */
@Component
public class FreightRequestCreatedNotifyAdapter implements FreightRequestCreatedNotifyPort {

  private final AdminNewFreightRequestNotifier notifier;

  public FreightRequestCreatedNotifyAdapter(AdminNewFreightRequestNotifier notifier) {
    this.notifier = notifier;
  }

  @Override
  public void notifyCreated(
      @NonNull Long requestId, @NonNull String authorUserId, @NonNull String authorEmail) {
    notifier.notifyAdminsAsync(
        Objects.requireNonNull(requestId),
        Objects.requireNonNull(authorUserId),
        Objects.requireNonNull(authorEmail));
  }
}
