# План: повідомлення ADMIN про новий запит на розрахунок фрахту

**Дата создания:** 27 октября 2026, 11:15 (UTC+3)  
**Дата изменения:** 27 октября 2026, 11:25 (UTC+3)  
**Спека:** [`docs/specs/admin-notify-new-freight-request.ru.en.md`](../specs/admin-notify-new-freight-request.ru.en.md)  
**Brief:** [`docs/briefs/admin-notify-new-freight-request.ru.md`](../briefs/admin-notify-new-freight-request.ru.md)

## 1. Розуміння

- Тригер — лише успішне створення `RouteRequest` користувачем (`RouteRequestService.createRouteRequest`), після commit. Quote, статус, breakdown і реєстрація облікового запису не шлють це повідомлення.
- Отримувачі: активні не видалені користувачі з доступною роллю `ADMIN` і прапорцем профілю `MESSENGERS`. Автор заявки виключається. Немає профілю або прапорця — тиша, без листа-заміни (на відміну від B04).
- Канал лише месенджер через існуючий outbound. Один ключ `FREIGHT_REQUEST_CREATED|{requestId}|{adminId}|{CHANNEL}` — одне повідомлення. WhatsApp без template `admin_freight_request_created` — SKIP.
- Текст ua/en/ru за `bot_identities.locale` (порожній locale → ua): id заявки, email автора, посилання `{angularBase}/admin/route-requests?requestId={id}`.
- Збій бота не змінює відповідь `POST /api/v1/route-requests`. Прапор `app.notifications.freight-request-created.enabled` (default true) не пов’язаний з `user-registered`.
- Сторінка черги відкриває картку за `requestId`. Hint профілю ADMIN згадує і це подія.

## 2. Кроки

1. Порт `FreightRequestCreatedNotifyPort` у пакеті маршрутів. Реалізація в `com.geosun.tms.auth.notify`.
2. У `createRouteRequest` — `afterCommit` + async через `adminNotifyExecutor`.
3. `FreightRequestCreatedNotifyProperties` + `application.yml`.
4. Нотифаєр: ADMIN + MESSENGERS, без автора, без EMAIL-fallback. Лог `freight_request_notify_*`.
5. Розширити `ChatbotOutboundNotifier` спільним циклом; не змінювати `USER_REGISTERED`.
6. Тексти `ChatbotMessages` ua/en/ru; посилання в `AppEmailProperties`.
7. Deep-link `requestId` на `/admin/route-requests`; hint профілю.
8. Тести, Spotless, `lint:fix`, Problems = 0.
9. Після здачі: Статус спеки, DoD, README, BASELINE, ворота brief.

## 3. Файли

- Нові: порт у `routes/`, `AdminNewFreightRequestNotifier`, properties, unit + integration тести.
- Зміни: `RouteRequestService`, `ChatbotOutboundNotifier`, `ChatbotMessages`, `AppEmailProperties`, `AsyncConfig`, `application.yml`, admin-route-requests, i18n.
- Не чіпати: Flutter, `AdminNewUserNotifier` EMAIL/SMS, FSM заявки, quote.

## 4. Приймання

- Створення заявки → одне повідомлення підходящому ADMIN; автор мовчить; без `MESSENGERS` — тиша; прапор false — тиша; deep-link відкриває картку.

## 5. Problems = 0

- ReadLints по змінених Java (main+test) і Angular. Мета — 0.
- Чеклист null-safety; Spotless; `lint:fix`; exit code команд = 0.
