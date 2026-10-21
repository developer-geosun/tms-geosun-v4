# Продолжение редизайна: Stage 01 gap → приёмка

**Дата создания:** 13 октября 2026, 22:15 (UTC+3)  
**Дата изменения:** 21 октября 2026, 15:26 (UTC+3)

**Решение:** A+1 — pack-faithful с Stage 01, дальше по одному этапу после «+».  
**Канон этапов:** [`redesign-frontend-stages.ru.md`](redesign-frontend-stages.ru.md)  
**Pack:** [`redesign-frontend/01-app-shell/`](../../redesign-frontend/01-app-shell/)

## Phase 0 — результат сверки

### Чеклист приёмки Stage 01

| Проверка | Роли / условия |
|----------|----------------|
| Desktop ≥960: permanent sidenav ~280px + sticky toolbar + content | admin, manager, driver, user |
| Mobile ≤959: hamburger → drawer + scrim; закрытие по nav / scrim / Escape / X | те же |
| a11y: открытие → фокус в drawer; закрытие → фокус на hamburger; `aria-expanded` / `aria-controls` | mobile |
| Nav filter по роли совпадает с pack README | admin (полный), manager (без document-types / file-storage-test), driver, user |
| 4 темы перекрашивают shell | azure-blue, rose-red, magenta-violet, cyan-orange |
| i18n видимых строк shell | uk / en / ru |
| Guest: на `/login` и `/404` **нет** AppShell | guest |
| Тела страниц в этом этапе не редизайнились | — |

Скрин-референс: `pack/preview-shell-desktop.png`, `preview-shell-desktop-magenta.png`, `preview-shell-mobile.png`, `preview-shell-mobile-drawer.png`.

### NAVIGATION_ITEMS vs pack README

Сверено с [`navigation.config.ts`](../../frontend-angular/src/app/layout/navigation.config.ts): routes, roles, icons совпадают с таблицей pack. Секции Overview / User / Ops / Refs / System — как в прототипе. `/stop-service` и `/404` в меню нет (ок).

### Footer-слоты

| Слот | Статус |
|------|--------|
| Authenticated sidenav-footer: © + App Info | есть в AppShell |
| AuthShell brand: соцсети + © + App Info | есть (deep-port Auth — этап 02) |
| Старый `app-footer` / `app-toolbar` | удалены как мёртвый chrome |

## Stage 01 — gap-close (готово к UI-приёмке)

Сделано в коде:

- Фокус в drawer при открытии (`#drawerCloseBtn` / первый nav-item).
- Active nav: FILL icons + secondary-container; scrim drawer через токены; logo disc на surface token.
- `findNavigationItem` — longest prefix (title для `/admin/trips/:id`).
- `app.component.spec` под root `router-outlet`; удалены `layout/toolbar`, `layout/footer`.

**Сознательно не 1:1 с pack:** текст footer прототипа «© GeoSun · Material Design 3» не копировали — в проде остаётся `common.designedBy` + App Info (решение v2 плана). Placeholder-контент `/main` в preview — не scope этапа 01.

**Ворота агента (2026-10-13):** ReadLints 0 · `lint:fix` 0 · `build` 0 · `test` 124/124.

**Статус Stage 01:** ворота агента зелёные. **UI-приёмка на паузе** с 21 октября 2026 (по запросу). Чекбокс `01` в v2-плане не закрывать, Stage 02 не начинать, пока пауза не снята и не будет «+».

## Далее

После снятия паузы и «+» на 01 → Stage 02 AuthShell (тот же цикл: pack → код → ворота → приёмка).
