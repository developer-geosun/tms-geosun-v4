# План: Multi-role & role switching

**Дата создания:** 1 октября 2026, 12:05 (UTC+3)  
**Дата изменения:** 1 октября 2026, 12:05 (UTC+3)  
**Спека:** [`docs/specs/user-multi-role-switching.ru.en.md`](../specs/user-multi-role-switching.ru.en.md)

## 1. Понимание

- Available roles + одна active (`users.role`).
- Регистрация → `USER`.
- ADMIN назначает набор (`PUT .../roles`); `PATCH .../role` = singleton wrapper.
- Self switch без revoke sessions.
- UI: toolbar switcher; admin multi-select.
- Last-admin и notify admins — по available, не только active.

## 2. Шаги

1. Flyway `V44__user_roles.sql` + backfill.
2. Entity `User.availableRoles`; хелпери инвариантов.
3. DTO: `availableRoles`; mapper.
4. `AdminUserService.updateRoles` + controller PUT; PATCH wrapper; filter/count по available.
5. `AuthService.switchRole` + `POST /auth/switch-role`; register инициализирует available.
6. `DriverService` — linkable по available; добавить DRIVER.
7. Integration tests.
8. Angular: model, AuthService.switchRole, toolbar, admin users multi-select, i18n.
9. Docs B01/B02/README/BASELINE; Spotless; lint:fix.
10. **Problems = 0** (ReadLints + null-safety checklist, вкл. `src/test/**`).

## 3. Затронутые модули

- `backend-java/.../auth/**`, `DriverService`, Flyway.
- `frontend-angular` auth, toolbar, admin-users, i18n.
- `docs/specs/*`.

## 4. Риски

- Код, трактующий `users.role` как «назначенную» роль.
- EAGER ElementCollection на admin list — ок при size≤100.

## 5. Приёмка

- По DoD спеки §13; тесты AdminUser + Auth switch; ручной smoke toolbar.

## 6. Problems = 0

- Отдельный шаг сдачи: ReadLints по всем изменённым Java (main+test) и Angular; чеклист null-safety.
