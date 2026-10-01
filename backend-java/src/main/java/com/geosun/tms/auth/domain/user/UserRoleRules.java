package com.geosun.tms.auth.domain.user;

import java.util.ArrayList;
import java.util.Collection;
import java.util.EnumSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import org.springframework.lang.NonNull;

/** Допоміжні правила для available / active ролей. */
public final class UserRoleRules {

  /** Порядок вибору active, якщо поточна роль випала з набору. */
  private static final List<Role> ACTIVE_PREFERENCE =
      List.of(Role.USER, Role.MANAGER, Role.DRIVER, Role.ADMIN);

  private UserRoleRules() {}

  public static @NonNull Set<Role> normalize(@NonNull Collection<Role> roles) {
    Set<Role> normalized = EnumSet.noneOf(Role.class);
    for (Role role : roles) {
      if (role != null) {
        normalized.add(role);
      }
    }
    return Objects.requireNonNull(normalized);
  }

  public static @NonNull Role pickPreferredActive(@NonNull Set<Role> roles) {
    for (Role preferred : ACTIVE_PREFERENCE) {
      if (roles.contains(preferred)) {
        return Objects.requireNonNull(preferred);
      }
    }
    // Набір непорожній за інваріантом викликача
    return Objects.requireNonNull(roles.iterator().next());
  }

  public static @NonNull List<String> toSortedNames(@NonNull Collection<Role> roles) {
    List<String> names = new ArrayList<>();
    for (Role role : Role.values()) {
      if (roles.contains(role)) {
        names.add(Objects.requireNonNull(role.name()));
      }
    }
    return Objects.requireNonNull(names);
  }
}
