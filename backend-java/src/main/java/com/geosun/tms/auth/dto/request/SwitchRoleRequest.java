package com.geosun.tms.auth.dto.request;

import com.geosun.tms.auth.domain.user.Role;
import jakarta.validation.constraints.NotNull;
import org.springframework.lang.NonNull;

/** Тіло {@code POST /api/v1/auth/switch-role}. */
public record SwitchRoleRequest(@NotNull @NonNull Role role) {}
