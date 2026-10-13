# Cursor IDE Agent — этап 01: App Shell (sidenav + toolbar)

Скопируй **всё ниже линии** в чат Cursor Agent в репозитории GeoSun (`frontend-angular`).
К чату приложи файлы из `pack/` (см. раздел «Что приложить»).

---

## Цель

Портировать утверждённый **App shell**: постоянный sidenav (desktop), temporary drawer (mobile), top toolbar (title + theme + lang + user menu) и `<router-outlet>`. Пункты навигации — из существующего `ToolbarComponent.navigationItems` (routes + labelKey + roles). Guest auth остаётся вне shell.

### Точные маршруты
- `(chrome) authenticated layout — sidenav + toolbar + router-outlet`

### Куда править (предположения по репо)
- Корень UI: `frontend-angular/`
- Целевые компоненты: `src/app/layout/ (app-shell / sidenav / toolbar)`
- i18n: `frontend-angular/src/assets/i18n/{uk,en,ru}.json`
- Темы: `src/styles/_theme.scss` + `ThemeService`
- Роутинг: существующий `app.routes.ts` (не изобретать новые path)

### Заметка этапа
Только оболочка. Не трогать тела страниц и auth.

## Жёсткие ограничения (обязательно)

1. **Репозиторий:** правки только в `frontend-angular` (путь в монорепо `tms-geosun-v4` / `developer-geosun/tms-geosun-v4`). Не трогать backend без явной просьбы.
2. **Material 3:** стили через токены `--mat-sys-*` и существующие классы тем `theme-azure-blue` | `theme-rose-red` | `theme-magenta-violet` | `theme-cyan-orange` (`ThemeService` + `_theme.scss`).
3. **Запрет `::ng-deep`.** Только component SCSS, host-классы, CSS variables / Material tokens.
4. **i18n:** ngx-translate, ключи uk / en / ru из `src/assets/i18n/{uk,en,ru}.json`. Сохранять существующие ключи; добавлять только недостающие hint/column keys (во все 3 файла). Не переименовывать продуктовые лейблы.
5. **4 темы** должны перекрашивать поверхности этапа.
6. **Desktop + mobile** (≥960px / ≤959px) — как в скриншотах pack.
7. **Не трогать другие маршруты** и не изобретать новые routes вне текущего `app.routes.ts` для этого этапа.
8. **Не клонировать** HTML-прототип как static assets в прод-сборку. Портировать визуал/разметку в Angular-компоненты.
9. Сохранить существующие API-сервисы, guards, roles, ReactiveForms / signals / поведение ошибок.


## Что приложить в Cursor

- Папку `pack/` этого этапа (копия `geosun-app-shell-material-dev/`): `index.html`, `shell.css`, `shell.js`, README, скриншоты.
- Приложить к чату Cursor: этот `CURSOR-PROMPT.md` + скриншоты из `pack/` + при необходимости `pack/README.md`.

### Скриншоты-референс (в `pack/`)
- `pack/preview-shell-desktop-magenta.png`
- `pack/preview-shell-desktop.png`
- `pack/preview-shell-mobile-drawer.png`
- `pack/preview-shell-mobile.png`

Открой прототип локально для интерактива:
```bash
cd pack   # эта папка этапа
python3 -m http.server
# затем ?lang=uk&theme=azure-blue&hideDemo=1  (+ page/role/state по README pack)
```

## Критерии приёмки
- Desktop (≥960): permanent sidenav ~280px + toolbar + content; Mobile: hamburger → drawer + scrim
- 4 темы перекрашивают shell
- Role switch (admin/manager/driver/user) показывает/скрывает те же пункты, что сегодня
- Нет новых routes; тела страниц не редизайнить в этом этапе
- Zero `::ng-deep`

## Порядок работ (рекомендация)

1. Открыть `pack/README.md` и скриншоты; сверить поля/ключи i18n с прод-компонентом.
2. Рестайл **только** шаблон/SCSS целевой страницы (или shell на этапе 01); логику/API не ломать.
3. Проверить 4 темы + uk/en/ru + desktop/mobile.
4. Не коммитить несвязанные файлы; не пушить на GitHub без запроса.

## Вне скоупа

- Правки других feature-страниц / backend
- Копирование demo-данных прототипа в прод
- Переписывание ThemeService / TranslateModule setup
