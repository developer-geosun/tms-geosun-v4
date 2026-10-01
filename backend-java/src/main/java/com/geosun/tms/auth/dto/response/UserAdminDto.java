package com.geosun.tms.auth.dto.response;

import java.time.Instant;
import java.util.List;

/** Адмін-представлення користувача (без passwordHash). */
public record UserAdminDto(
    String id,
    String email,
    String role,
    List<String> availableRoles,
    boolean active,
    boolean deleted,
    boolean emailVerified,
    Instant createdAt,
    Instant updatedAt,
    Instant deletedAt,
    String displayName,
    UserProfileDto profile) {}
