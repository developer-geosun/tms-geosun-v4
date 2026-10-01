# План: Default ADMIN bootstrap

**Дата создания:** 1 октября 2026, 21:25 (UTC+3)  
**Дата изменения:** 1 октября 2026, 21:25 (UTC+3)  
**Спека:** [`docs/specs/default-admin-bootstrap.ru.en.md`](../specs/default-admin-bootstrap.ru.en.md)

## 1. Понимание

- Один ADMIN из `ADMIN_EMAIL` / `ADMIN_PASSWORD` при первом старте на пустой БД (нет ADMIN в available).
- Skip + warn при пустых env, слабом пароле, занятом email, уже существующем ADMIN.
- Не путать с `SUPER_ADMIN_PASSWORD`.

## 2. Шаги

1. Спека B19 + README + BASELINE.
2. `DefaultAdminBootstrapProperties`, `application.yml`, env examples, docker-compose.
3. `UserRepository.countNonDeletedWithAvailableRole`.
4. `DefaultAdminBootstrapService` + `DefaultAdminBootstrapRunner` + `AuthBootstrapConfig`.
5. Tests: service unit + integration (create / skip).
6. RUN.ru.md — блок переменных.
7. Spotless; **Problems = 0**.

## 3. Модули

- `backend-java/.../auth/config`, `service`, `repository`
- `docs/specs`, `.env.example`, `docker-compose.yml`

## 4. Приёмка

- DoD спеки; `mvn test` для новых тестов.
