package com.geosun.tms.auth.domain.user;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.EnumSet;
import java.util.List;
import java.util.Objects;
import org.junit.jupiter.api.Test;
import org.springframework.lang.NonNull;

class UserRoleRulesTest {

  @Test
  void pickPreferredActive_prefersUserThenManager() {
    assertThat(UserRoleRules.pickPreferredActive(nonNullRoles(Role.MANAGER, Role.DRIVER)))
        .isEqualTo(Role.MANAGER);
    assertThat(UserRoleRules.pickPreferredActive(nonNullRoles(Role.USER, Role.ADMIN)))
        .isEqualTo(Role.USER);
  }

  @Test
  void toSortedNames_followsEnumOrder() {
    List<String> names =
        UserRoleRules.toSortedNames(nonNullRoles(Role.ADMIN, Role.USER, Role.DRIVER));
    assertThat(names).containsExactly("USER", "DRIVER", "ADMIN");
  }

  /** EnumSet.of не анотований @NonNull — обгортаємо для null-analysis. */
  @NonNull
  private static java.util.Set<Role> nonNullRoles(Role first, Role... rest) {
    return Objects.requireNonNull(EnumSet.of(first, rest));
  }
}
