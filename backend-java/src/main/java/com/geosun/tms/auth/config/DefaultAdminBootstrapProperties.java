package com.geosun.tms.auth.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Облікові дані первинного ADMIN з env ({@code ADMIN_EMAIL}, {@code ADMIN_PASSWORD}).
 * Використовуються лише для bootstrap, якщо в БД ще немає ADMIN у available roles.
 */
@ConfigurationProperties(prefix = "app.bootstrap.admin")
public class DefaultAdminBootstrapProperties {

  private String email = "";
  private String password = "";

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email != null ? email : "";
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password != null ? password : "";
  }
}
