# STAGES — порядок внедрения GeoSun redesign

| # | Папка | Название | Routes | Source pack |
|---|-------|----------|--------|-------------|
| 01 | `01-app-shell/` | App Shell (sidenav + toolbar) | `(chrome) authenticated layout — sidenav + toolbar + router-outlet` | `geosun-app-shell-material-dev` |
| 02 | `02-auth/` | AuthShell + Login / Register / Forgot / Verify / Reset | `/login`, `/register`, `/forgot-password`, `/verify-email`, `/reset-password` | `geosun-auth-pages-material-dev` |
| 03 | `03-main/` | Home dashboard `/main` | `/main` | `geosun-main-material-dev` |
| 04 | `04-routes/` | Список маршрутов пользователя `/routes` | `/routes` | `geosun-routes-material-dev` |
| 05 | `05-route-builder/` | Конструктор маршрута `/route-builder` | `/route-builder` | `geosun-route-builder-material-dev` |
| 06 | `06-my-freight-requests/` | Мои заявки на фрахт `/my-freight-requests` | `/my-freight-requests` | `geosun-freight-requests-material-dev` |
| 07 | `07-profile/` | Профиль `/profile` | `/profile` | `geosun-profile-material-dev` |
| 08 | `08-my-trips/` | Мои рейсы `/my-trips` | `/my-trips` | `geosun-my-trips-material-dev` |
| 09 | `09-admin-route-requests/` | Админ: заявки на маршруты `/admin/route-requests` | `/admin/route-requests` | `geosun-admin-route-requests-material-dev` |
| 10 | `10-admin-trips-list/` | Админ: список рейсов `/admin/trips` | `/admin/trips` | `geosun-admin-trips-material-dev` |
| 11 | `11-admin-trip-detail/` | Админ: создание/редактирование рейса | `/admin/trips/new`, `/admin/trips/:id` | `geosun-admin-trip-detail-material-dev` |
| 12 | `12-admin-vehicles/` | Админ: транспорт `/admin/vehicles` | `/admin/vehicles` | `geosun-admin-vehicles-material-dev` |
| 13 | `13-admin-drivers/` | Админ: водители `/admin/drivers` | `/admin/drivers` | `geosun-admin-drivers-material-dev` |
| 14 | `14-admin-vehicle-combinations/` | Админ: сцепки `/admin/vehicle-combinations` | `/admin/vehicle-combinations` | `geosun-admin-vehicle-combinations-material-dev` |
| 15 | `15-admin-currencies/` | Админ: валюты `/admin/currencies` | `/admin/currencies` | `geosun-admin-currencies-material-dev` |
| 16 | `16-admin-country-reference/` | Админ: справочник стран `/admin/country-reference` | `/admin/country-reference` | `geosun-admin-country-reference-material-dev` |
| 17 | `17-admin-document-types/` | Админ: типы документов `/admin/document-types` | `/admin/document-types` | `geosun-admin-document-types-material-dev` |
| 18 | `18-admin-freight-numeric-scenarios/` | Админ: числовые сценарии фрахта | `/admin/freight-numeric-scenarios` | `geosun-admin-freight-numeric-scenarios-material-dev` |
| 19 | `19-admin-toll-tariff-sets/` | Админ: наборы тарифов платных дорог | `/admin/toll-tariff-sets` | `geosun-admin-toll-tariff-sets-material-dev` |
| 20 | `20-admin-chatbots/` | Админ: чат-боты `/admin/chatbots` | `/admin/chatbots` | `geosun-admin-chatbots-material-dev` |
| 21 | `21-admin-users/` | Админ: пользователи `/admin/users` | `/admin/users`, `/admin/users/:userId` | `geosun-admin-users-material-dev` |
| 22 | `22-admin-file-storage-test/` | Админ: тест файлового хранилища | `/admin/file-storage-test` | `geosun-admin-file-storage-test-material-dev` |
| 23 | `23-not-found-404/` | Страница 404 `/404` | `/404` | `geosun-404-material-dev` |
| 24 | `24-stop-service/` | Техработы `/stop-service` | `/stop-service` | `geosun-stop-service-material-dev` |

## Зависимости

1. **01-app-shell** — фундамент authenticated chrome.
2. **02-auth** — guest AuthShell (можно параллельно с 01, но визуально согласовать темы).
3. **03…22** — контент страниц внутри shell (по одной за промпт).
4. **23–24** — 404 и stop-service (могут быть вне/поверх shell — как в прод-роутинге).

## Правило одной страницы

Один этап Cursor Agent = один stage folder. Не смешивать admin-trips list и trip-detail.
