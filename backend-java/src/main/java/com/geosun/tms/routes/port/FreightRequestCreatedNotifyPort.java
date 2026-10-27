package com.geosun.tms.routes.port;

import org.springframework.lang.NonNull;

/**
 * Порт сповіщення ADMIN про новий запит на розрахунок фрахту (реалізація поза пакетом routes).
 */
public interface FreightRequestCreatedNotifyPort {

  /** Best-effort після commit створення заявки. */
  void notifyCreated(
      @NonNull Long requestId, @NonNull String authorUserId, @NonNull String authorEmail);
}
