# Technical Specification / Техническое задание: Multi-role & role switching

**Дата создания:** 1 октября 2026, 12:00 (UTC+3)  
**Дата изменения:** 1 октября 2026, 12:10 (UTC+3)

## Статус
- **Реализация:** реализовано
- **Роль:** источник истины по multi-role и переключению активной роли
- **Клиент:** Angular + Java
- **Baseline:** [BASELINE.ru.md](BASELINE.ru.md) **B18**; дополняет B01 / B02
- **Остаток:** нет
- **Реестр:** [README.ru.md](README.ru.md)
- **Brief:** [user-multi-role-switching.ru.md](../briefs/user-multi-role-switching.ru.md)

## Language Rules / Правила языка
- **Primary language / Основной язык:** RU
- **Secondary language / Дополнительный язык:** EN
- **Terms to keep in English / Термины, которые оставляем на английском:** `auth`, `access token`, `refresh token`, `RBAC`, `active role`, `available roles`, `Definition of Done`

## 1) Goal / Цель
- **Problem / Проблема:** у учётки одна роль; человек с несколькими контурами (manager+driver и т.п.) вынужден плодить аккаунты или просить смену роли.
- **Value / Ценность:** один логин, набор ролей от ADMIN, переключение активной роли без повторного входа.
- **Expected outcome / Ожидаемый результат:** модель «доступные роли + одна активная»; admin API назначения набора; self API переключения; UI переключателя и multi-select в `/admin/users`.

## 2) Context / Контекст
- **Project/module / Проект/модуль:** `backend-java` auth Identity; `frontend-angular` auth + toolbar + admin users.
- **Current behavior / Текущее поведение:** колонка `users.role` — единственная роль; JWT **не** содержит роль (фильтр читает из БД); регистрация → `USER`; `PATCH /admin/users/{id}/role` заменяет роль; multi-role в B02 Out of Scope.
- **Related docs / Связанные документы:** B01 `auth-authentication-authorization.ru.en.md`, B02 `admin-user-management.ru.en.md`, B03 `user-profile.ru.en.md`, brief выше.
- **Environment constraints / Ограничения окружения:** Java 21 / Spring Boot 3, Flyway, Angular Material, Flutter не трогаем.

## 3) Scope (In) / Scope (входит в задачу)
- Набор **available roles** у пользователя (`USER` | `MANAGER` | `DRIVER` | `ADMIN`).
- Одна **active role** (`users.role`) — единственный источник для RBAC на каждый запрос.
- Регистрация: available = `{USER}`, active = `USER`.
- ADMIN назначает полный набор available roles (не меньше одной).
- Пользователь с ≥ 2 available roles переключает active role (self).
- DTO login / me / refresh / admin: `role` + `availableRoles`.
- Angular: переключатель в toolbar; multi-select ролей в `/admin/users`.
- Миграция существующих пользователей: available = {текущая role}.
- Синхронизация текстов B01/B02 (убрать multi-role из Out of Scope B02; ссылка на эту спеку).

## 4) Out of Scope / Out of Scope (не входит)
- Permission matrix / fine-grained permissions.
- Новые роли сверх enum.
- Одновременная «работа под двумя ролями».
- Impersonation.
- Invite / смена email-пароля админом.
- Flutter.

## 5) User Stories / Пользовательские сценарии
1. **Как** новый пользователь, **я хочу** получить роль `USER` по умолчанию, **чтобы** сразу работать в базовом контуре.
2. **Как** ADMIN, **я хочу** назначить пользователю несколько ролей, **чтобы** один человек закрывал разные контуры.
3. **Как** пользователь с несколькими ролями, **я хочу** переключать активную роль, **чтобы** менять доступный UI/API без второго аккаунта.
4. **Как** пользователь с одной ролью, **я хочу** не видеть лишний переключатель, **чтобы** UX оставался прежним.

## 6) Functional Requirements / Функциональные требования
1. Таблица `user_roles (user_id, role)` PK `(user_id, role)`; FK на `users` CASCADE.
2. Инвариант: `availableRoles` не пуст; `activeRole ∈ availableRoles`.
3. Регистрация: вставить `USER` в `user_roles`, `users.role = USER`.
4. `PUT /api/v1/admin/users/{id}/roles` — тело `{ "roles": ["USER","MANAGER"], "superAdminPassword"?: "..." }`. Заменяет набор. Если текущий active ∉ нового набора — active = первый из набора в порядке enum `USER → MANAGER → DRIVER → ADMIN` (предпочтение `USER` если есть). Revoke всех refresh цели. Self-op → `400 SELF_OPERATION_FORBIDDEN`. Soft-deleted → `409 USER_DELETED`. Снятие последнего ADMIN из available у последнего активного admin → `409 LAST_ADMIN_PROTECTED` + пароль суперадмина при снятии ADMIN (как сейчас при demote).
5. `PATCH /api/v1/admin/users/{id}/role` — **совместимость**: эквивалент `PUT .../roles` с singleton `{roles:[role]}` (тот же superAdminPassword). Документировать как thin wrapper.
6. Фильтр списка admin `role=` — пользователи, у которых роль есть в **available** (не только active).
7. `POST /api/v1/auth/switch-role` — тело `{ "role": "MANAGER" }`. Только если роль в available; иначе `400 ROLE_NOT_ASSIGNED`. Обновляет `users.role`. **Не** revoke sessions (фильтр читает роль из БД). Ответ: `UserPublicDto`.
8. Login / refresh / me: `role` = active; `availableRoles` = отсортированный список assigned.
9. Подсчёт «последнего ADMIN»: пользователи с `ADMIN` в **available**, active=true, deleted=false.
10. Связка водителя (`DriverService`): при линковке добавлять `DRIVER` в available (не затирать остальные); если active был `USER` — можно оставить или переключить на `DRIVER` только если продукт уже делал `setRole(DRIVER)` — сохранить текущее поведение: active → `DRIVER`, available содержит `DRIVER` (+ прежние).
11. Angular `AuthService.hasAnyRole` / guards — по **active** role.
12. Toolbar: `mat-select` / menu переключения, если `availableRoles.length > 1`; после switch — `getMe()` или ответ switch; при смене роли уйти с недоступного маршрута на безопасный home роли (как при role mismatch guard).

## 7) Non-functional Requirements / Нефункциональные требования
- **Security / Безопасность:** RBAC только по active из БД; нельзя активировать невыданную роль; admin revoke sessions при смене набора.
- **Performance / Производительность:** available roles грузить вместе с User (ElementCollection / OneToMany fetch); без N+1 в admin list (batch).
- **Reliability / Надежность:** миграция backfill обязательна и идемпотентна.
- **Logging/Monitoring / Логирование и мониторинг:** без новых метрик в v1.
- **Accessibility/UX / Доступность и UX:** Material; i18n ua/ru/en для подписей ролей и ошибок; handset.

## 8) Data Contracts and API / Контракты данных и API
### 8.1 Input Data / Входные данные
- Admin roles: non-empty unique set из enum Role.
- Switch: одна Role из enum.

### 8.2 Output Data / Выходные данные
- `UserPublicDto` / `UserAdminDto`: добавить `availableRoles: string[]` (enum names). Поле `role` остаётся active.
- Ошибки: `ROLE_NOT_ASSIGNED`, `ROLES_REQUIRED`, существующие `SELF_OPERATION_FORBIDDEN`, `USER_DELETED`, `LAST_ADMIN_PROTECTED`, `SUPER_ADMIN_PASSWORD_*`.

### 8.3 Endpoints
- `PUT /api/v1/admin/users/{id}/roles` — назначить набор.
- `PATCH /api/v1/admin/users/{id}/role` — singleton wrapper (совместимость).
- `POST /api/v1/auth/switch-role` — переключить active.

Request switch:
```json
{ "role": "MANAGER" }
```

Response (фрагмент me/login):
```json
{
  "id": "...",
  "email": "a@b.c",
  "role": "MANAGER",
  "availableRoles": ["USER", "MANAGER"],
  "displayName": "...",
  "profile": {}
}
```

## 9) UX/UI Requirements (frontend) / UX/UI требования (frontend)
- States: loading на switch; snack при ошибке.
- Admin users: multi-select ролей вместо одиночного; confirm при demote ADMIN / снятии ролей.
- Navigation: пункт переключения рядом с аккаунтом в toolbar.
- UI texts: ключи i18n `auth.role.*`, `auth.switchRole.*`, `admin.users.roles.*`.

## 10) Architecture Changes / Изменения в архитектуре
- **Components/services:** `User` + коллекция ролей; `AdminUserService.updateRoles`; `AuthService.switchRole`; Angular toolbar + admin-users.
- **Data storage:** Flyway `V44__user_roles.sql` (+ backfill).
- **Integrations:** нет.
- **Compatibility:** поле `role` сохраняет смысл active; старые клиенты, игнорирующие `availableRoles`, продолжают работать с одной активной ролью; Flutter не обновляем.

## 11) Implementation Constraints / Ограничения реализации
- Identity = supporting: transaction script.
- Не менять несвязанные домены.
- Spotless + lint:fix; Problems = 0 вкл. тесты.

## 12) Implementation Plan / План реализации
1. Миграция + entity collection + backfill.
2. Backend services/API/DTO + тесты интеграции.
3. Angular auth model/service + toolbar switcher.
4. Admin users multi-select roles.
5. Docs B01/B02/README/BASELINE; Spotless; lint:fix; Problems = 0.

## 13) Acceptance Criteria (Definition of Done) / Критерии приемки
- [x] Регистрация → available=`USER`, active=`USER`.
- [x] ADMIN может назначить ≥2 ролей; пользователь переключает active.
- [x] Невыданная роль → `ROLE_NOT_ASSIGNED`.
- [x] RBAC следует active role после switch без повторного login.
- [x] Singleton PATCH `/role` работает.
- [x] Last-admin защита по available ADMIN.
- [x] UI: switcher при ≥2 ролях; admin multi-select.
- [x] Документация обновлена.
- [x] Тесты зелёные; Problems = 0.

## 14) Test Plan / Тест-план
- **Unit:** инварианты набора ролей / выбор active при усечении набора.
- **Integration:** register defaults; PUT roles; switch; ROLE_NOT_ASSIGNED; last-admin; filter by available role; PATCH wrapper; revoke on admin roles change.
- **E2E/UI:** не обязательно в v1 (ручная проверка toolbar + admin).
- **Regression:** login/me/refresh; Driver link добавляет DRIVER.

## 15) Risks and Assumptions / Риски и допущения
- **Assumptions:** JWT по-прежнему без роли; active в `users.role`.
- **Risks:** места кода, фильтрующие `users.role` как «имеет роль» — перевести на available где семантика «назначен».
- **Open questions:** нет (brief закрыт вариантом 3).

## 16) Release Notes Draft / Черновик релиз-нотсов
- Пользователь может иметь несколько ролей; ADMIN назначает набор; переключение активной роли в UI.
- Новые пользователи по умолчанию получают `USER`.
