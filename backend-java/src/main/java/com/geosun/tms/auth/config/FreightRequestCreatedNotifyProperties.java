package com.geosun.tms.auth.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Прапорець сповіщення ADMIN про новий запит на розрахунок
 * (app.notifications.freight-request-created.*).
 */
@ConfigurationProperties(prefix = "app.notifications.freight-request-created")
public class FreightRequestCreatedNotifyProperties {

  /** Майстер-вимикач хука після створення заявки. */
  private boolean enabled = true;

  public boolean isEnabled() {
    return enabled;
  }

  public void setEnabled(boolean enabled) {
    this.enabled = enabled;
  }
}
