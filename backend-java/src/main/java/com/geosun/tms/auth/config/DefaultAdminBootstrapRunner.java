package com.geosun.tms.auth.config;

import com.geosun.tms.auth.service.DefaultAdminBootstrapService;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

/** Виклик bootstrap ADMIN після підняття контексту та Flyway. */
@Component
@Order(100)
public class DefaultAdminBootstrapRunner implements ApplicationRunner {

  private final DefaultAdminBootstrapService bootstrapService;

  public DefaultAdminBootstrapRunner(DefaultAdminBootstrapService bootstrapService) {
    this.bootstrapService = bootstrapService;
  }

  @Override
  public void run(ApplicationArguments args) {
    bootstrapService.ensureDefaultAdmin();
  }
}
