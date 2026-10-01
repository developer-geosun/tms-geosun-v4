package com.geosun.tms.auth.dto.request;

import com.geosun.tms.auth.domain.user.Role;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.Set;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;

/**
 * Тіло {@code PUT /api/v1/admin/users/{id}/roles}.
 * {@code superAdminPassword} обов'язковий при знятті ролі ADMIN.
 */
public record UpdateUserRolesRequest(
    @NotEmpty @NonNull Set<@NotNull Role> roles, @Nullable String superAdminPassword) {}
