# ALL-PROMPTS — GeoSun redesign stages

Печать / копипаст всех этапных промптов.


========================================================================
# STAGE 01 — app-shell
========================================================================

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


========================================================================
# STAGE 02 — auth
========================================================================

# Cursor IDE Agent — этап 02: AuthShell + Login / Register / Forgot / Verify / Reset

Скопируй **всё ниже линии** в чат Cursor Agent в репозитории GeoSun (`frontend-angular`).
К чату приложи файлы из `pack/` (см. раздел «Что приложить»).

---

## Цель

Портировать **AuthShell** и страницы **Login, Register, Forgot password, Verify email, Reset password** из прототипа. Desktop split ≥960 (brand ~42% / form ~58%); mobile: brand strip + rounded sheet. Не ломать AuthService / существующие формы и маппинг ошибок.

### Точные маршруты
- `/login`
- `/register`
- `/forgot-password`
- `/verify-email`
- `/reset-password`

### Куда править (предположения по репо)
- Корень UI: `frontend-angular/`
- Целевые компоненты: `src/app/pages/{login,register,forgot-password,verify-email,reset-password}/ + shared AuthShell`
- i18n: `frontend-angular/src/assets/i18n/{uk,en,ru}.json`
- Темы: `src/styles/_theme.scss` + `ThemeService`
- Роутинг: существующий `app.routes.ts` (не изобретать новые path)

### Заметка этапа
Guest routes вне App shell. AuthService не переписывать. Опционально: geosun-login-material-dev как исторический референс Login.

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

- `pack/` = `geosun-auth-pages-material-dev/` (все preview-*.png, index.html, README).
- Опционально как доп. референс Login: `/workspace/geosun-login-material-dev/` (не обязателен, auth-pages уже включает login).
- В Cursor: этот промпт + скриншоты из `pack/`.

### Скриншоты-референс (в `pack/`)
- `pack/preview-chrome-theme-menu-desktop.png`
- `pack/preview-forgot-desktop.png`
- `pack/preview-forgot-mobile.png`
- `pack/preview-login-desktop-chrome.png`
- `pack/preview-login-mobile-chrome.png`
- `pack/preview-register-desktop-magenta.png`
- `pack/preview-register-desktop.png`
- `pack/preview-register-mobile.png`
- `pack/preview-reset-desktop.png`
- `pack/preview-reset-invalid-desktop.png`
- `pack/preview-reset-mobile.png`
- `pack/preview-reset-success-desktop.png`
- `pack/preview-verify-loading-desktop.png`
- `pack/preview-verify-success-desktop.png`
- `pack/preview-verify-success-mobile.png`

Открой прототип локально для интерактива:
```bash
cd pack   # эта папка этапа
python3 -m http.server
# затем ?lang=uk&theme=azure-blue&hideDemo=1  (+ page/role/state по README pack)
```

## Критерии приёмки
- Desktop/mobile register/forgot/verify/reset/login соответствуют preview-*-desktop/mobile.png
- Magenta (или любая тёмная тема) обновляет brand + form + soft banners
- uk/en/ru через TranslateModule; AuthService error mapping по смыслу без изменений
- Кросс-ссылки /login ↔ /register ↔ /forgot-password; verify CTA → login; reset requestAgain → forgot
- Zero `::ng-deep`; demo theme/lang pickers НЕ в прод auth UI

## Порядок работ (рекомендация)

1. Открыть `pack/README.md` и скриншоты; сверить поля/ключи i18n с прод-компонентом.
2. Рестайл **только** шаблон/SCSS целевой страницы (или shell на этапе 01); логику/API не ломать.
3. Проверить 4 темы + uk/en/ru + desktop/mobile.
4. Не коммитить несвязанные файлы; не пушить на GitHub без запроса.

## Вне скоупа

- Правки других feature-страниц / backend
- Копирование demo-данных прототипа в прод
- Переписывание ThemeService / TranslateModule setup


========================================================================
# STAGE 03 — main
========================================================================

# Cursor IDE Agent — этап 03: Home dashboard `/main`

Скопируй **всё ниже линии** в чат Cursor Agent в репозитории GeoSun (`frontend-angular`).
К чату приложи файлы из `pack/` (см. раздел «Что приложить»).

---

## Цель

Портировать утверждённый UI этапа **Home dashboard `/main`** из HTML-прототипа в Angular `frontend-angular`, **внутри уже утверждённого App shell** (контент outlet only). Контент внутри уже утверждённого App shell.

### Точные маршруты
- `/main`

### Куда править (предположения по репо)
- Корень UI: `frontend-angular/`
- Целевые компоненты: `src/app/pages/main/ (MainComponent)`
- i18n: `frontend-angular/src/assets/i18n/{uk,en,ru}.json`
- Темы: `src/styles/_theme.scss` + `ThemeService`
- Роутинг: существующий `app.routes.ts` (не изобретать новые path)

### Заметка этапа
Контент внутри уже утверждённого App shell.

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

- Папка `pack/` этого этапа — полная копия `geosun-main-material-dev/` (index.html, CSS/JS страницы, shell.*, i18n.js, README, preview-*.png).
- В чат Cursor: этот `CURSOR-PROMPT.md` + релевантные скриншоты из `pack/` + при необходимости `pack/README.md`.

### Скриншоты-референс (в `pack/`)
- `pack/preview-main-desktop-magenta.png`
- `pack/preview-main-desktop.png`
- `pack/preview-main-mobile.png`

Открой прототип локально для интерактива:
```bash
cd pack   # эта папка этапа
python3 -m http.server
# затем ?lang=uk&theme=azure-blue&hideDemo=1  (+ page/role/state по README pack)
```

## Критерии приёмки
- Desktop + mobile соответствуют скриншотам по духу (токены, плотность, empty/loading/failed)
- Все 4 темы перекрашивают страницу внутри shell
- uk / en / ru — существующие строки страницы; API/guards/roles без регрессий
- Другие маршруты не изменены; Zero `::ng-deep`

## Порядок работ (рекомендация)

1. Открыть `pack/README.md` и скриншоты; сверить поля/ключи i18n с прод-компонентом.
2. Рестайл **только** шаблон/SCSS целевой страницы (или shell на этапе 01); логику/API не ломать.
3. Проверить 4 темы + uk/en/ru + desktop/mobile.
4. Не коммитить несвязанные файлы; не пушить на GitHub без запроса.

## Вне скоупа

- Правки других feature-страниц / backend
- Копирование demo-данных прототипа в прод
- Переписывание ThemeService / TranslateModule setup


========================================================================
# STAGE 04 — routes
========================================================================

# Cursor IDE Agent — этап 04: Список маршрутов пользователя `/routes`

Скопируй **всё ниже линии** в чат Cursor Agent в репозитории GeoSun (`frontend-angular`).
К чату приложи файлы из `pack/` (см. раздел «Что приложить»).

---

## Цель

Портировать утверждённый UI этапа **Список маршрутов пользователя `/routes`** из HTML-прототипа в Angular `frontend-angular`, **внутри уже утверждённого App shell** (контент outlet only). Desktop table + mobile cards; фильтры/soft-delete сохранить.

### Точные маршруты
- `/routes`

### Куда править (предположения по репо)
- Корень UI: `frontend-angular/`
- Целевые компоненты: `src/app/pages/routes/ (RoutesComponent)`
- i18n: `frontend-angular/src/assets/i18n/{uk,en,ru}.json`
- Темы: `src/styles/_theme.scss` + `ThemeService`
- Роутинг: существующий `app.routes.ts` (не изобретать новые path)

### Заметка этапа
Desktop table + mobile cards; фильтры/soft-delete сохранить.

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

- Папка `pack/` этого этапа — полная копия `geosun-routes-material-dev/` (index.html, CSS/JS страницы, shell.*, i18n.js, README, preview-*.png).
- В чат Cursor: этот `CURSOR-PROMPT.md` + релевантные скриншоты из `pack/` + при необходимости `pack/README.md`.

### Скриншоты-референс (в `pack/`)
- `pack/preview-routes-desktop-magenta.png`
- `pack/preview-routes-desktop.png`
- `pack/preview-routes-empty-desktop.png`
- `pack/preview-routes-mobile.png`

Открой прототип локально для интерактива:
```bash
cd pack   # эта папка этапа
python3 -m http.server
# затем ?lang=uk&theme=azure-blue&hideDemo=1  (+ page/role/state по README pack)
```

## Критерии приёмки
- Desktop + mobile соответствуют скриншотам по духу (токены, плотность, empty/loading/failed)
- Все 4 темы перекрашивают страницу внутри shell
- uk / en / ru — существующие строки страницы; API/guards/roles без регрессий
- Другие маршруты не изменены; Zero `::ng-deep`

## Порядок работ (рекомендация)

1. Открыть `pack/README.md` и скриншоты; сверить поля/ключи i18n с прод-компонентом.
2. Рестайл **только** шаблон/SCSS целевой страницы (или shell на этапе 01); логику/API не ломать.
3. Проверить 4 темы + uk/en/ru + desktop/mobile.
4. Не коммитить несвязанные файлы; не пушить на GitHub без запроса.

## Вне скоупа

- Правки других feature-страниц / backend
- Копирование demo-данных прототипа в прод
- Переписывание ThemeService / TranslateModule setup


========================================================================
# STAGE 05 — route-builder
========================================================================

# Cursor IDE Agent — этап 05: Конструктор маршрута `/route-builder`

Скопируй **всё ниже линии** в чат Cursor Agent в репозитории GeoSun (`frontend-angular`).
К чату приложи файлы из `pack/` (см. раздел «Что приложить»).

---

## Цель

Портировать утверждённый UI этапа **Конструктор маршрута `/route-builder`** из HTML-прототипа в Angular `frontend-angular`, **внутри уже утверждённого App shell** (контент outlet only). Карта Leaflet — движок не менять; прототипная карта только визуальный стенд-ин. Flush outlet.

### Точные маршруты
- `/route-builder`

### Куда править (предположения по репо)
- Корень UI: `frontend-angular/`
- Целевые компоненты: `src/app/pages/route-builder/ (RouteBuilderComponent)`
- i18n: `frontend-angular/src/assets/i18n/{uk,en,ru}.json`
- Темы: `src/styles/_theme.scss` + `ThemeService`
- Роутинг: существующий `app.routes.ts` (не изобретать новые path)

### Заметка этапа
Карта Leaflet — движок не менять; прототипная карта только визуальный стенд-ин. Flush outlet.

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

- Папка `pack/` этого этапа — полная копия `geosun-route-builder-material-dev/` (index.html, CSS/JS страницы, shell.*, i18n.js, README, preview-*.png).
- В чат Cursor: этот `CURSOR-PROMPT.md` + релевантные скриншоты из `pack/` + при необходимости `pack/README.md`.

### Скриншоты-референс (в `pack/`)
- `pack/preview-route-builder-desktop-magenta.png`
- `pack/preview-route-builder-desktop.png`
- `pack/preview-route-builder-mobile-map.png`
- `pack/preview-route-builder-mobile.png`

Открой прототип локально для интерактива:
```bash
cd pack   # эта папка этапа
python3 -m http.server
# затем ?lang=uk&theme=azure-blue&hideDemo=1  (+ page/role/state по README pack)
```

## Критерии приёмки
- Desktop + mobile соответствуют скриншотам по духу (токены, плотность, empty/loading/failed)
- Все 4 темы перекрашивают страницу внутри shell
- uk / en / ru — существующие строки страницы; API/guards/roles без регрессий
- Другие маршруты не изменены; Zero `::ng-deep`

## Порядок работ (рекомендация)

1. Открыть `pack/README.md` и скриншоты; сверить поля/ключи i18n с прод-компонентом.
2. Рестайл **только** шаблон/SCSS целевой страницы (или shell на этапе 01); логику/API не ломать.
3. Проверить 4 темы + uk/en/ru + desktop/mobile.
4. Не коммитить несвязанные файлы; не пушить на GitHub без запроса.

## Вне скоупа

- Правки других feature-страниц / backend
- Копирование demo-данных прототипа в прод
- Переписывание ThemeService / TranslateModule setup


========================================================================
# STAGE 06 — my-freight-requests
========================================================================

# Cursor IDE Agent — этап 06: Мои заявки на фрахт `/my-freight-requests`

Скопируй **всё ниже линии** в чат Cursor Agent в репозитории GeoSun (`frontend-angular`).
К чату приложи файлы из `pack/` (см. раздел «Что приложить»).

---

## Цель

Портировать утверждённый UI этапа **Мои заявки на фрахт `/my-freight-requests`** из HTML-прототипа в Angular `frontend-angular`, **внутри уже утверждённого App shell** (контент outlet only). Очередь заявок пользователя; статусы через i18n.

### Точные маршруты
- `/my-freight-requests`

### Куда править (предположения по репо)
- Корень UI: `frontend-angular/`
- Целевые компоненты: `src/app/pages/… freight / my-freight-requests`
- i18n: `frontend-angular/src/assets/i18n/{uk,en,ru}.json`
- Темы: `src/styles/_theme.scss` + `ThemeService`
- Роутинг: существующий `app.routes.ts` (не изобретать новые path)

### Заметка этапа
Очередь заявок пользователя; статусы через i18n.

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

- Папка `pack/` этого этапа — полная копия `geosun-freight-requests-material-dev/` (index.html, CSS/JS страницы, shell.*, i18n.js, README, preview-*.png).
- В чат Cursor: этот `CURSOR-PROMPT.md` + релевантные скриншоты из `pack/` + при необходимости `pack/README.md`.

### Скриншоты-референс (в `pack/`)
- `pack/preview-freight-desktop-magenta.png`
- `pack/preview-freight-desktop.png`
- `pack/preview-freight-empty-desktop.png`
- `pack/preview-freight-mobile.png`

Открой прототип локально для интерактива:
```bash
cd pack   # эта папка этапа
python3 -m http.server
# затем ?lang=uk&theme=azure-blue&hideDemo=1  (+ page/role/state по README pack)
```

## Критерии приёмки
- Desktop + mobile соответствуют скриншотам по духу (токены, плотность, empty/loading/failed)
- Все 4 темы перекрашивают страницу внутри shell
- uk / en / ru — существующие строки страницы; API/guards/roles без регрессий
- Другие маршруты не изменены; Zero `::ng-deep`

## Порядок работ (рекомендация)

1. Открыть `pack/README.md` и скриншоты; сверить поля/ключи i18n с прод-компонентом.
2. Рестайл **только** шаблон/SCSS целевой страницы (или shell на этапе 01); логику/API не ломать.
3. Проверить 4 темы + uk/en/ru + desktop/mobile.
4. Не коммитить несвязанные файлы; не пушить на GitHub без запроса.

## Вне скоупа

- Правки других feature-страниц / backend
- Копирование demo-данных прототипа в прод
- Переписывание ThemeService / TranslateModule setup


========================================================================
# STAGE 07 — profile
========================================================================

# Cursor IDE Agent — этап 07: Профиль `/profile`

Скопируй **всё ниже линии** в чат Cursor Agent в репозитории GeoSun (`frontend-angular`).
К чату приложи файлы из `pack/` (см. раздел «Что приложить»).

---

## Цель

Портировать утверждённый UI этапа **Профиль `/profile`** из HTML-прототипа в Angular `frontend-angular`, **внутри уже утверждённого App shell** (контент outlet only). Hero + section cards + sticky footer; поля/Telegram не выкидывать.

### Точные маршруты
- `/profile`

### Куда править (предположения по репо)
- Корень UI: `frontend-angular/`
- Целевые компоненты: `src/app/pages/profile/ (ProfileComponent + TelegramLinkDialog)`
- i18n: `frontend-angular/src/assets/i18n/{uk,en,ru}.json`
- Темы: `src/styles/_theme.scss` + `ThemeService`
- Роутинг: существующий `app.routes.ts` (не изобретать новые path)

### Заметка этапа
Hero + section cards + sticky footer; поля/Telegram не выкидывать.

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

- Папка `pack/` этого этапа — полная копия `geosun-profile-material-dev/` (index.html, CSS/JS страницы, shell.*, i18n.js, README, preview-*.png).
- В чат Cursor: этот `CURSOR-PROMPT.md` + релевантные скриншоты из `pack/` + при необходимости `pack/README.md`.

### Скриншоты-референс (в `pack/`)
- `pack/preview-profile-desktop-magenta.png`
- `pack/preview-profile-desktop.png`
- `pack/preview-profile-mobile.png`

Открой прототип локально для интерактива:
```bash
cd pack   # эта папка этапа
python3 -m http.server
# затем ?lang=uk&theme=azure-blue&hideDemo=1  (+ page/role/state по README pack)
```

## Критерии приёмки
- Desktop + mobile соответствуют скриншотам по духу (токены, плотность, empty/loading/failed)
- Все 4 темы перекрашивают страницу внутри shell
- uk / en / ru — существующие строки страницы; API/guards/roles без регрессий
- Другие маршруты не изменены; Zero `::ng-deep`

## Порядок работ (рекомендация)

1. Открыть `pack/README.md` и скриншоты; сверить поля/ключи i18n с прод-компонентом.
2. Рестайл **только** шаблон/SCSS целевой страницы (или shell на этапе 01); логику/API не ломать.
3. Проверить 4 темы + uk/en/ru + desktop/mobile.
4. Не коммитить несвязанные файлы; не пушить на GitHub без запроса.

## Вне скоупа

- Правки других feature-страниц / backend
- Копирование demo-данных прототипа в прод
- Переписывание ThemeService / TranslateModule setup


========================================================================
# STAGE 08 — my-trips
========================================================================

# Cursor IDE Agent — этап 08: Мои рейсы `/my-trips`

Скопируй **всё ниже линии** в чат Cursor Agent в репозитории GeoSun (`frontend-angular`).
К чату приложи файлы из `pack/` (см. раздел «Что приложить»).

---

## Цель

Портировать утверждённый UI этапа **Мои рейсы `/my-trips`** из HTML-прототипа в Angular `frontend-angular`, **внутри уже утверждённого App shell** (контент outlet only). Accordion рейсов + expense report.

### Точные маршруты
- `/my-trips`

### Куда править (предположения по репо)
- Корень UI: `frontend-angular/`
- Целевые компоненты: `src/app/pages/my-trips/ (или аналог)`
- i18n: `frontend-angular/src/assets/i18n/{uk,en,ru}.json`
- Темы: `src/styles/_theme.scss` + `ThemeService`
- Роутинг: существующий `app.routes.ts` (не изобретать новые path)

### Заметка этапа
Accordion рейсов + expense report.

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

- Папка `pack/` этого этапа — полная копия `geosun-my-trips-material-dev/` (index.html, CSS/JS страницы, shell.*, i18n.js, README, preview-*.png).
- В чат Cursor: этот `CURSOR-PROMPT.md` + релевантные скриншоты из `pack/` + при необходимости `pack/README.md`.

### Скриншоты-референс (в `pack/`)
- `pack/preview-my-trips-desktop.png`
- `pack/preview-my-trips-mobile.png`

Открой прототип локально для интерактива:
```bash
cd pack   # эта папка этапа
python3 -m http.server
# затем ?lang=uk&theme=azure-blue&hideDemo=1  (+ page/role/state по README pack)
```

## Критерии приёмки
- Desktop + mobile соответствуют скриншотам по духу (токены, плотность, empty/loading/failed)
- Все 4 темы перекрашивают страницу внутри shell
- uk / en / ru — существующие строки страницы; API/guards/roles без регрессий
- Другие маршруты не изменены; Zero `::ng-deep`

## Порядок работ (рекомендация)

1. Открыть `pack/README.md` и скриншоты; сверить поля/ключи i18n с прод-компонентом.
2. Рестайл **только** шаблон/SCSS целевой страницы (или shell на этапе 01); логику/API не ломать.
3. Проверить 4 темы + uk/en/ru + desktop/mobile.
4. Не коммитить несвязанные файлы; не пушить на GitHub без запроса.

## Вне скоупа

- Правки других feature-страниц / backend
- Копирование demo-данных прототипа в прод
- Переписывание ThemeService / TranslateModule setup


========================================================================
# STAGE 09 — admin-route-requests
========================================================================

# Cursor IDE Agent — этап 09: Админ: заявки на маршруты `/admin/route-requests`

Скопируй **всё ниже линии** в чат Cursor Agent в репозитории GeoSun (`frontend-angular`).
К чату приложи файлы из `pack/` (см. раздел «Что приложить»).

---

## Цель

Портировать утверждённый UI этапа **Админ: заявки на маршруты `/admin/route-requests`** из HTML-прототипа в Angular `frontend-angular`, **внутри уже утверждённого App shell** (контент outlet only). Table+cards + drawer/details; NBU/quote сохранить. Roles: admin|manager.

### Точные маршруты
- `/admin/route-requests`

### Куда править (предположения по репо)
- Корень UI: `frontend-angular/`
- Целевые компоненты: `src/app/pages/admin-route-requests/ (AdminRouteRequestsComponent)`
- i18n: `frontend-angular/src/assets/i18n/{uk,en,ru}.json`
- Темы: `src/styles/_theme.scss` + `ThemeService`
- Роутинг: существующий `app.routes.ts` (не изобретать новые path)

### Заметка этапа
Table+cards + drawer/details; NBU/quote сохранить. Roles: admin|manager.

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

- Папка `pack/` этого этапа — полная копия `geosun-admin-route-requests-material-dev/` (index.html, CSS/JS страницы, shell.*, i18n.js, README, preview-*.png).
- В чат Cursor: этот `CURSOR-PROMPT.md` + релевантные скриншоты из `pack/` + при необходимости `pack/README.md`.

### Скриншоты-референс (в `pack/`)
- `pack/preview-admin-rr-desktop-magenta.png`
- `pack/preview-admin-rr-desktop.png`
- `pack/preview-admin-rr-empty-desktop.png`
- `pack/preview-admin-rr-mobile.png`

Открой прототип локально для интерактива:
```bash
cd pack   # эта папка этапа
python3 -m http.server
# затем ?lang=uk&theme=azure-blue&hideDemo=1  (+ page/role/state по README pack)
```

## Критерии приёмки
- Desktop + mobile соответствуют скриншотам по духу (токены, плотность, empty/loading/failed)
- Все 4 темы перекрашивают страницу внутри shell
- uk / en / ru — существующие строки страницы; API/guards/roles без регрессий
- Другие маршруты не изменены; Zero `::ng-deep`

## Порядок работ (рекомендация)

1. Открыть `pack/README.md` и скриншоты; сверить поля/ключи i18n с прод-компонентом.
2. Рестайл **только** шаблон/SCSS целевой страницы (или shell на этапе 01); логику/API не ломать.
3. Проверить 4 темы + uk/en/ru + desktop/mobile.
4. Не коммитить несвязанные файлы; не пушить на GitHub без запроса.

## Вне скоупа

- Правки других feature-страниц / backend
- Копирование demo-данных прототипа в прод
- Переписывание ThemeService / TranslateModule setup


========================================================================
# STAGE 10 — admin-trips-list
========================================================================

# Cursor IDE Agent — этап 10: Админ: список рейсов `/admin/trips`

Скопируй **всё ниже линии** в чат Cursor Agent в репозитории GeoSun (`frontend-angular`).
К чату приложи файлы из `pack/` (см. раздел «Что приложить»).

---

## Цель

Портировать утверждённый UI этапа **Админ: список рейсов `/admin/trips`** из HTML-прототипа в Angular `frontend-angular`, **внутри уже утверждённого App shell** (контент outlet only). Не трогать detail/create в этом этапе.

### Точные маршруты
- `/admin/trips`

### Куда править (предположения по репо)
- Корень UI: `frontend-angular/`
- Целевые компоненты: `src/app/pages/admin-trips/ (AdminTripsComponent — только список)`
- i18n: `frontend-angular/src/assets/i18n/{uk,en,ru}.json`
- Темы: `src/styles/_theme.scss` + `ThemeService`
- Роутинг: существующий `app.routes.ts` (не изобретать новые path)

### Заметка этапа
Не трогать detail/create в этом этапе.

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

- Папка `pack/` этого этапа — полная копия `geosun-admin-trips-material-dev/` (index.html, CSS/JS страницы, shell.*, i18n.js, README, preview-*.png).
- В чат Cursor: этот `CURSOR-PROMPT.md` + релевантные скриншоты из `pack/` + при необходимости `pack/README.md`.

### Скриншоты-референс (в `pack/`)
- `pack/preview-admin-trips-desktop-magenta.png`
- `pack/preview-admin-trips-desktop.png`
- `pack/preview-admin-trips-empty-desktop.png`
- `pack/preview-admin-trips-mobile.png`

Открой прототип локально для интерактива:
```bash
cd pack   # эта папка этапа
python3 -m http.server
# затем ?lang=uk&theme=azure-blue&hideDemo=1  (+ page/role/state по README pack)
```

## Критерии приёмки
- Desktop + mobile соответствуют скриншотам по духу (токены, плотность, empty/loading/failed)
- Все 4 темы перекрашивают страницу внутри shell
- uk / en / ru — существующие строки страницы; API/guards/roles без регрессий
- Другие маршруты не изменены; Zero `::ng-deep`

## Порядок работ (рекомендация)

1. Открыть `pack/README.md` и скриншоты; сверить поля/ключи i18n с прод-компонентом.
2. Рестайл **только** шаблон/SCSS целевой страницы (или shell на этапе 01); логику/API не ломать.
3. Проверить 4 темы + uk/en/ru + desktop/mobile.
4. Не коммитить несвязанные файлы; не пушить на GitHub без запроса.

## Вне скоупа

- Правки других feature-страниц / backend
- Копирование demo-данных прототипа в прод
- Переписывание ThemeService / TranslateModule setup


========================================================================
# STAGE 11 — admin-trip-detail
========================================================================

# Cursor IDE Agent — этап 11: Админ: создание/редактирование рейса

Скопируй **всё ниже линии** в чат Cursor Agent в репозитории GeoSun (`frontend-angular`).
К чату приложи файлы из `pack/` (см. раздел «Что приложить»).

---

## Цель

Портировать утверждённый UI этапа **Админ: создание/редактирование рейса** из HTML-прототипа в Angular `frontend-angular`, **внутри уже утверждённого App shell** (контент outlet only). Форма + expense panel + status actions.

### Точные маршруты
- `/admin/trips/new`
- `/admin/trips/:id`

### Куда править (предположения по репо)
- Корень UI: `frontend-angular/`
- Целевые компоненты: `src/app/pages/admin-trips/ admin-trip-detail`
- i18n: `frontend-angular/src/assets/i18n/{uk,en,ru}.json`
- Темы: `src/styles/_theme.scss` + `ThemeService`
- Роутинг: существующий `app.routes.ts` (не изобретать новые path)

### Заметка этапа
Форма + expense panel + status actions.

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

- Папка `pack/` этого этапа — полная копия `geosun-admin-trip-detail-material-dev/` (index.html, CSS/JS страницы, shell.*, i18n.js, README, preview-*.png).
- В чат Cursor: этот `CURSOR-PROMPT.md` + релевантные скриншоты из `pack/` + при необходимости `pack/README.md`.

### Скриншоты-референс (в `pack/`)
- `pack/preview-admin-trip-detail-desktop.png`
- `pack/preview-admin-trip-detail-mobile.png`

Открой прототип локально для интерактива:
```bash
cd pack   # эта папка этапа
python3 -m http.server
# затем ?lang=uk&theme=azure-blue&hideDemo=1  (+ page/role/state по README pack)
```

## Критерии приёмки
- Desktop + mobile соответствуют скриншотам по духу (токены, плотность, empty/loading/failed)
- Все 4 темы перекрашивают страницу внутри shell
- uk / en / ru — существующие строки страницы; API/guards/roles без регрессий
- Другие маршруты не изменены; Zero `::ng-deep`

## Порядок работ (рекомендация)

1. Открыть `pack/README.md` и скриншоты; сверить поля/ключи i18n с прод-компонентом.
2. Рестайл **только** шаблон/SCSS целевой страницы (или shell на этапе 01); логику/API не ломать.
3. Проверить 4 темы + uk/en/ru + desktop/mobile.
4. Не коммитить несвязанные файлы; не пушить на GitHub без запроса.

## Вне скоупа

- Правки других feature-страниц / backend
- Копирование demo-данных прототипа в прод
- Переписывание ThemeService / TranslateModule setup


========================================================================
# STAGE 12 — admin-vehicles
========================================================================

# Cursor IDE Agent — этап 12: Админ: транспорт `/admin/vehicles`

Скопируй **всё ниже линии** в чат Cursor Agent в репозитории GeoSun (`frontend-angular`).
К чату приложи файлы из `pack/` (см. раздел «Что приложить»).

---

## Цель

Портировать утверждённый UI этапа **Админ: транспорт `/admin/vehicles`** из HTML-прототипа в Angular `frontend-angular`, **внутри уже утверждённого App shell** (контент outlet only). Fleet table/cards, soft-delete views.

### Точные маршруты
- `/admin/vehicles`

### Куда править (предположения по репо)
- Корень UI: `frontend-angular/`
- Целевые компоненты: `src/app/pages/admin-vehicles/`
- i18n: `frontend-angular/src/assets/i18n/{uk,en,ru}.json`
- Темы: `src/styles/_theme.scss` + `ThemeService`
- Роутинг: существующий `app.routes.ts` (не изобретать новые path)

### Заметка этапа
Fleet table/cards, soft-delete views.

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

- Папка `pack/` этого этапа — полная копия `geosun-admin-vehicles-material-dev/` (index.html, CSS/JS страницы, shell.*, i18n.js, README, preview-*.png).
- В чат Cursor: этот `CURSOR-PROMPT.md` + релевантные скриншоты из `pack/` + при необходимости `pack/README.md`.

### Скриншоты-референс (в `pack/`)
- `pack/preview-admin-vehicles-desktop.png`
- `pack/preview-admin-vehicles-mobile.png`

Открой прототип локально для интерактива:
```bash
cd pack   # эта папка этапа
python3 -m http.server
# затем ?lang=uk&theme=azure-blue&hideDemo=1  (+ page/role/state по README pack)
```

## Критерии приёмки
- Desktop + mobile соответствуют скриншотам по духу (токены, плотность, empty/loading/failed)
- Все 4 темы перекрашивают страницу внутри shell
- uk / en / ru — существующие строки страницы; API/guards/roles без регрессий
- Другие маршруты не изменены; Zero `::ng-deep`

## Порядок работ (рекомендация)

1. Открыть `pack/README.md` и скриншоты; сверить поля/ключи i18n с прод-компонентом.
2. Рестайл **только** шаблон/SCSS целевой страницы (или shell на этапе 01); логику/API не ломать.
3. Проверить 4 темы + uk/en/ru + desktop/mobile.
4. Не коммитить несвязанные файлы; не пушить на GitHub без запроса.

## Вне скоупа

- Правки других feature-страниц / backend
- Копирование demo-данных прототипа в прод
- Переписывание ThemeService / TranslateModule setup


========================================================================
# STAGE 13 — admin-drivers
========================================================================

# Cursor IDE Agent — этап 13: Админ: водители `/admin/drivers`

Скопируй **всё ниже линии** в чат Cursor Agent в репозитории GeoSun (`frontend-angular`).
К чату приложи файлы из `pack/` (см. раздел «Что приложить»).

---

## Цель

Портировать утверждённый UI этапа **Админ: водители `/admin/drivers`** из HTML-прототипа в Angular `frontend-angular`, **внутри уже утверждённого App shell** (контент outlet only). Список водителей, license, compliance.

### Точные маршруты
- `/admin/drivers`

### Куда править (предположения по репо)
- Корень UI: `frontend-angular/`
- Целевые компоненты: `src/app/pages/admin-drivers/`
- i18n: `frontend-angular/src/assets/i18n/{uk,en,ru}.json`
- Темы: `src/styles/_theme.scss` + `ThemeService`
- Роутинг: существующий `app.routes.ts` (не изобретать новые path)

### Заметка этапа
Список водителей, license, compliance.

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

- Папка `pack/` этого этапа — полная копия `geosun-admin-drivers-material-dev/` (index.html, CSS/JS страницы, shell.*, i18n.js, README, preview-*.png).
- В чат Cursor: этот `CURSOR-PROMPT.md` + релевантные скриншоты из `pack/` + при необходимости `pack/README.md`.

### Скриншоты-референс (в `pack/`)
- `pack/preview-admin-drivers-desktop.png`
- `pack/preview-admin-drivers-mobile.png`

Открой прототип локально для интерактива:
```bash
cd pack   # эта папка этапа
python3 -m http.server
# затем ?lang=uk&theme=azure-blue&hideDemo=1  (+ page/role/state по README pack)
```

## Критерии приёмки
- Desktop + mobile соответствуют скриншотам по духу (токены, плотность, empty/loading/failed)
- Все 4 темы перекрашивают страницу внутри shell
- uk / en / ru — существующие строки страницы; API/guards/roles без регрессий
- Другие маршруты не изменены; Zero `::ng-deep`

## Порядок работ (рекомендация)

1. Открыть `pack/README.md` и скриншоты; сверить поля/ключи i18n с прод-компонентом.
2. Рестайл **только** шаблон/SCSS целевой страницы (или shell на этапе 01); логику/API не ломать.
3. Проверить 4 темы + uk/en/ru + desktop/mobile.
4. Не коммитить несвязанные файлы; не пушить на GitHub без запроса.

## Вне скоупа

- Правки других feature-страниц / backend
- Копирование demo-данных прототипа в прод
- Переписывание ThemeService / TranslateModule setup


========================================================================
# STAGE 14 — admin-vehicle-combinations
========================================================================

# Cursor IDE Agent — этап 14: Админ: сцепки `/admin/vehicle-combinations`

Скопируй **всё ниже линии** в чат Cursor Agent в репозитории GeoSun (`frontend-angular`).
К чату приложи файлы из `pack/` (см. раздел «Что приложить»).

---

## Цель

Портировать утверждённый UI этапа **Админ: сцепки `/admin/vehicle-combinations`** из HTML-прототипа в Angular `frontend-angular`, **внутри уже утверждённого App shell** (контент outlet only). Tractor+trailer combinations.

### Точные маршруты
- `/admin/vehicle-combinations`

### Куда править (предположения по репо)
- Корень UI: `frontend-angular/`
- Целевые компоненты: `src/app/pages/admin-vehicle-combinations/`
- i18n: `frontend-angular/src/assets/i18n/{uk,en,ru}.json`
- Темы: `src/styles/_theme.scss` + `ThemeService`
- Роутинг: существующий `app.routes.ts` (не изобретать новые path)

### Заметка этапа
Tractor+trailer combinations.

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

- Папка `pack/` этого этапа — полная копия `geosun-admin-vehicle-combinations-material-dev/` (index.html, CSS/JS страницы, shell.*, i18n.js, README, preview-*.png).
- В чат Cursor: этот `CURSOR-PROMPT.md` + релевантные скриншоты из `pack/` + при необходимости `pack/README.md`.

### Скриншоты-референс (в `pack/`)
- `pack/preview-admin-vehicle-combinations-desktop.png`
- `pack/preview-admin-vehicle-combinations-mobile.png`

Открой прототип локально для интерактива:
```bash
cd pack   # эта папка этапа
python3 -m http.server
# затем ?lang=uk&theme=azure-blue&hideDemo=1  (+ page/role/state по README pack)
```

## Критерии приёмки
- Desktop + mobile соответствуют скриншотам по духу (токены, плотность, empty/loading/failed)
- Все 4 темы перекрашивают страницу внутри shell
- uk / en / ru — существующие строки страницы; API/guards/roles без регрессий
- Другие маршруты не изменены; Zero `::ng-deep`

## Порядок работ (рекомендация)

1. Открыть `pack/README.md` и скриншоты; сверить поля/ключи i18n с прод-компонентом.
2. Рестайл **только** шаблон/SCSS целевой страницы (или shell на этапе 01); логику/API не ломать.
3. Проверить 4 темы + uk/en/ru + desktop/mobile.
4. Не коммитить несвязанные файлы; не пушить на GitHub без запроса.

## Вне скоупа

- Правки других feature-страниц / backend
- Копирование demo-данных прототипа в прод
- Переписывание ThemeService / TranslateModule setup


========================================================================
# STAGE 15 — admin-currencies
========================================================================

# Cursor IDE Agent — этап 15: Админ: валюты `/admin/currencies`

Скопируй **всё ниже линии** в чат Cursor Agent в репозитории GeoSun (`frontend-angular`).
К чату приложи файлы из `pack/` (см. раздел «Что приложить»).

---

## Цель

Портировать утверждённый UI этапа **Админ: валюты `/admin/currencies`** из HTML-прототипа в Angular `frontend-angular`, **внутри уже утверждённого App shell** (контент outlet only). NBU snapshot + catalog.

### Точные маршруты
- `/admin/currencies`

### Куда править (предположения по репо)
- Корень UI: `frontend-angular/`
- Целевые компоненты: `src/app/pages/admin-currencies/`
- i18n: `frontend-angular/src/assets/i18n/{uk,en,ru}.json`
- Темы: `src/styles/_theme.scss` + `ThemeService`
- Роутинг: существующий `app.routes.ts` (не изобретать новые path)

### Заметка этапа
NBU snapshot + catalog.

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

- Папка `pack/` этого этапа — полная копия `geosun-admin-currencies-material-dev/` (index.html, CSS/JS страницы, shell.*, i18n.js, README, preview-*.png).
- В чат Cursor: этот `CURSOR-PROMPT.md` + релевантные скриншоты из `pack/` + при необходимости `pack/README.md`.

### Скриншоты-референс (в `pack/`)
- `pack/preview-admin-currencies-desktop.png`
- `pack/preview-admin-currencies-mobile.png`

Открой прототип локально для интерактива:
```bash
cd pack   # эта папка этапа
python3 -m http.server
# затем ?lang=uk&theme=azure-blue&hideDemo=1  (+ page/role/state по README pack)
```

## Критерии приёмки
- Desktop + mobile соответствуют скриншотам по духу (токены, плотность, empty/loading/failed)
- Все 4 темы перекрашивают страницу внутри shell
- uk / en / ru — существующие строки страницы; API/guards/roles без регрессий
- Другие маршруты не изменены; Zero `::ng-deep`

## Порядок работ (рекомендация)

1. Открыть `pack/README.md` и скриншоты; сверить поля/ключи i18n с прод-компонентом.
2. Рестайл **только** шаблон/SCSS целевой страницы (или shell на этапе 01); логику/API не ломать.
3. Проверить 4 темы + uk/en/ru + desktop/mobile.
4. Не коммитить несвязанные файлы; не пушить на GitHub без запроса.

## Вне скоупа

- Правки других feature-страниц / backend
- Копирование demo-данных прототипа в прод
- Переписывание ThemeService / TranslateModule setup


========================================================================
# STAGE 16 — admin-country-reference
========================================================================

# Cursor IDE Agent — этап 16: Админ: справочник стран `/admin/country-reference`

Скопируй **всё ниже линии** в чат Cursor Agent в репозитории GeoSun (`frontend-angular`).
К чату приложи файлы из `pack/` (см. раздел «Что приложить»).

---

## Цель

Портировать утверждённый UI этапа **Админ: справочник стран `/admin/country-reference`** из HTML-прототипа в Angular `frontend-angular`, **внутри уже утверждённого App shell** (контент outlet only). Read-only + search.

### Точные маршруты
- `/admin/country-reference`

### Куда править (предположения по репо)
- Корень UI: `frontend-angular/`
- Целевые компоненты: `src/app/pages/admin-country-reference/`
- i18n: `frontend-angular/src/assets/i18n/{uk,en,ru}.json`
- Темы: `src/styles/_theme.scss` + `ThemeService`
- Роутинг: существующий `app.routes.ts` (не изобретать новые path)

### Заметка этапа
Read-only + search.

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

- Папка `pack/` этого этапа — полная копия `geosun-admin-country-reference-material-dev/` (index.html, CSS/JS страницы, shell.*, i18n.js, README, preview-*.png).
- В чат Cursor: этот `CURSOR-PROMPT.md` + релевантные скриншоты из `pack/` + при необходимости `pack/README.md`.

### Скриншоты-референс (в `pack/`)
- `pack/preview-admin-country-reference-desktop.png`
- `pack/preview-admin-country-reference-mobile.png`

Открой прототип локально для интерактива:
```bash
cd pack   # эта папка этапа
python3 -m http.server
# затем ?lang=uk&theme=azure-blue&hideDemo=1  (+ page/role/state по README pack)
```

## Критерии приёмки
- Desktop + mobile соответствуют скриншотам по духу (токены, плотность, empty/loading/failed)
- Все 4 темы перекрашивают страницу внутри shell
- uk / en / ru — существующие строки страницы; API/guards/roles без регрессий
- Другие маршруты не изменены; Zero `::ng-deep`

## Порядок работ (рекомендация)

1. Открыть `pack/README.md` и скриншоты; сверить поля/ключи i18n с прод-компонентом.
2. Рестайл **только** шаблон/SCSS целевой страницы (или shell на этапе 01); логику/API не ломать.
3. Проверить 4 темы + uk/en/ru + desktop/mobile.
4. Не коммитить несвязанные файлы; не пушить на GitHub без запроса.

## Вне скоупа

- Правки других feature-страниц / backend
- Копирование demo-данных прототипа в прод
- Переписывание ThemeService / TranslateModule setup


========================================================================
# STAGE 17 — admin-document-types
========================================================================

# Cursor IDE Agent — этап 17: Админ: типы документов `/admin/document-types`

Скопируй **всё ниже линии** в чат Cursor Agent в репозитории GeoSun (`frontend-angular`).
К чату приложи файлы из `pack/` (см. раздел «Что приложить»).

---

## Цель

Портировать утверждённый UI этапа **Админ: типы документов `/admin/document-types`** из HTML-прототипа в Angular `frontend-angular`, **внутри уже утверждённого App shell** (контент outlet only). Catalog + soft-delete views.

### Точные маршруты
- `/admin/document-types`

### Куда править (предположения по репо)
- Корень UI: `frontend-angular/`
- Целевые компоненты: `src/app/pages/admin-document-types/`
- i18n: `frontend-angular/src/assets/i18n/{uk,en,ru}.json`
- Темы: `src/styles/_theme.scss` + `ThemeService`
- Роутинг: существующий `app.routes.ts` (не изобретать новые path)

### Заметка этапа
Catalog + soft-delete views.

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

- Папка `pack/` этого этапа — полная копия `geosun-admin-document-types-material-dev/` (index.html, CSS/JS страницы, shell.*, i18n.js, README, preview-*.png).
- В чат Cursor: этот `CURSOR-PROMPT.md` + релевантные скриншоты из `pack/` + при необходимости `pack/README.md`.

### Скриншоты-референс (в `pack/`)
- `pack/preview-admin-document-types-desktop.png`
- `pack/preview-admin-document-types-mobile.png`

Открой прототип локально для интерактива:
```bash
cd pack   # эта папка этапа
python3 -m http.server
# затем ?lang=uk&theme=azure-blue&hideDemo=1  (+ page/role/state по README pack)
```

## Критерии приёмки
- Desktop + mobile соответствуют скриншотам по духу (токены, плотность, empty/loading/failed)
- Все 4 темы перекрашивают страницу внутри shell
- uk / en / ru — существующие строки страницы; API/guards/roles без регрессий
- Другие маршруты не изменены; Zero `::ng-deep`

## Порядок работ (рекомендация)

1. Открыть `pack/README.md` и скриншоты; сверить поля/ключи i18n с прод-компонентом.
2. Рестайл **только** шаблон/SCSS целевой страницы (или shell на этапе 01); логику/API не ломать.
3. Проверить 4 темы + uk/en/ru + desktop/mobile.
4. Не коммитить несвязанные файлы; не пушить на GitHub без запроса.

## Вне скоупа

- Правки других feature-страниц / backend
- Копирование demo-данных прототипа в прод
- Переписывание ThemeService / TranslateModule setup


========================================================================
# STAGE 18 — admin-freight-numeric-scenarios
========================================================================

# Cursor IDE Agent — этап 18: Админ: числовые сценарии фрахта

Скопируй **всё ниже линии** в чат Cursor Agent в репозитории GeoSun (`frontend-angular`).
К чату приложи файлы из `pack/` (см. раздел «Что приложить»).

---

## Цель

Портировать утверждённый UI этапа **Админ: числовые сценарии фрахта** из HTML-прототипа в Angular `frontend-angular`, **внутри уже утверждённого App shell** (контент outlet only). List + side form (toll/season/margin/fuel/…).

### Точные маршруты
- `/admin/freight-numeric-scenarios`

### Куда править (предположения по репо)
- Корень UI: `frontend-angular/`
- Целевые компоненты: `src/app/pages/admin-freight-numeric-scenarios/`
- i18n: `frontend-angular/src/assets/i18n/{uk,en,ru}.json`
- Темы: `src/styles/_theme.scss` + `ThemeService`
- Роутинг: существующий `app.routes.ts` (не изобретать новые path)

### Заметка этапа
List + side form (toll/season/margin/fuel/…).

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

- Папка `pack/` этого этапа — полная копия `geosun-admin-freight-numeric-scenarios-material-dev/` (index.html, CSS/JS страницы, shell.*, i18n.js, README, preview-*.png).
- В чат Cursor: этот `CURSOR-PROMPT.md` + релевантные скриншоты из `pack/` + при необходимости `pack/README.md`.

### Скриншоты-референс (в `pack/`)
- `pack/preview-admin-freight-numeric-scenarios-desktop.png`
- `pack/preview-admin-freight-numeric-scenarios-mobile.png`

Открой прототип локально для интерактива:
```bash
cd pack   # эта папка этапа
python3 -m http.server
# затем ?lang=uk&theme=azure-blue&hideDemo=1  (+ page/role/state по README pack)
```

## Критерии приёмки
- Desktop + mobile соответствуют скриншотам по духу (токены, плотность, empty/loading/failed)
- Все 4 темы перекрашивают страницу внутри shell
- uk / en / ru — существующие строки страницы; API/guards/roles без регрессий
- Другие маршруты не изменены; Zero `::ng-deep`

## Порядок работ (рекомендация)

1. Открыть `pack/README.md` и скриншоты; сверить поля/ключи i18n с прод-компонентом.
2. Рестайл **только** шаблон/SCSS целевой страницы (или shell на этапе 01); логику/API не ломать.
3. Проверить 4 темы + uk/en/ru + desktop/mobile.
4. Не коммитить несвязанные файлы; не пушить на GitHub без запроса.

## Вне скоупа

- Правки других feature-страниц / backend
- Копирование demo-данных прототипа в прод
- Переписывание ThemeService / TranslateModule setup


========================================================================
# STAGE 19 — admin-toll-tariff-sets
========================================================================

# Cursor IDE Agent — этап 19: Админ: наборы тарифов платных дорог

Скопируй **всё ниже линии** в чат Cursor Agent в репозитории GeoSun (`frontend-angular`).
К чату приложи файлы из `pack/` (см. раздел «Что приложить»).

---

## Цель

Портировать утверждённый UI этапа **Админ: наборы тарифов платных дорог** из HTML-прототипа в Angular `frontend-angular`, **внутри уже утверждённого App shell** (контент outlet only). Master/detail tariff sets + country rules.

### Точные маршруты
- `/admin/toll-tariff-sets`

### Куда править (предположения по репо)
- Корень UI: `frontend-angular/`
- Целевые компоненты: `src/app/pages/admin-toll-tariff-sets/`
- i18n: `frontend-angular/src/assets/i18n/{uk,en,ru}.json`
- Темы: `src/styles/_theme.scss` + `ThemeService`
- Роутинг: существующий `app.routes.ts` (не изобретать новые path)

### Заметка этапа
Master/detail tariff sets + country rules.

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

- Папка `pack/` этого этапа — полная копия `geosun-admin-toll-tariff-sets-material-dev/` (index.html, CSS/JS страницы, shell.*, i18n.js, README, preview-*.png).
- В чат Cursor: этот `CURSOR-PROMPT.md` + релевантные скриншоты из `pack/` + при необходимости `pack/README.md`.

### Скриншоты-референс (в `pack/`)
- `pack/preview-admin-toll-tariff-sets-desktop.png`
- `pack/preview-admin-toll-tariff-sets-mobile.png`

Открой прототип локально для интерактива:
```bash
cd pack   # эта папка этапа
python3 -m http.server
# затем ?lang=uk&theme=azure-blue&hideDemo=1  (+ page/role/state по README pack)
```

## Критерии приёмки
- Desktop + mobile соответствуют скриншотам по духу (токены, плотность, empty/loading/failed)
- Все 4 темы перекрашивают страницу внутри shell
- uk / en / ru — существующие строки страницы; API/guards/roles без регрессий
- Другие маршруты не изменены; Zero `::ng-deep`

## Порядок работ (рекомендация)

1. Открыть `pack/README.md` и скриншоты; сверить поля/ключи i18n с прод-компонентом.
2. Рестайл **только** шаблон/SCSS целевой страницы (или shell на этапе 01); логику/API не ломать.
3. Проверить 4 темы + uk/en/ru + desktop/mobile.
4. Не коммитить несвязанные файлы; не пушить на GitHub без запроса.

## Вне скоупа

- Правки других feature-страниц / backend
- Копирование demo-данных прототипа в прод
- Переписывание ThemeService / TranslateModule setup


========================================================================
# STAGE 20 — admin-chatbots
========================================================================

# Cursor IDE Agent — этап 20: Админ: чат-боты `/admin/chatbots`

Скопируй **всё ниже линии** в чат Cursor Agent в репозитории GeoSun (`frontend-angular`).
К чату приложи файлы из `pack/` (см. раздел «Что приложить»).

---

## Цель

Портировать утверждённый UI этапа **Админ: чат-боты `/admin/chatbots`** из HTML-прототипа в Angular `frontend-angular`, **внутри уже утверждённого App shell** (контент outlet only). Module on/off + messenger identities.

### Точные маршруты
- `/admin/chatbots`

### Куда править (предположения по репо)
- Корень UI: `frontend-angular/`
- Целевые компоненты: `src/app/pages/admin-chatbots/`
- i18n: `frontend-angular/src/assets/i18n/{uk,en,ru}.json`
- Темы: `src/styles/_theme.scss` + `ThemeService`
- Роутинг: существующий `app.routes.ts` (не изобретать новые path)

### Заметка этапа
Module on/off + messenger identities.

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

- Папка `pack/` этого этапа — полная копия `geosun-admin-chatbots-material-dev/` (index.html, CSS/JS страницы, shell.*, i18n.js, README, preview-*.png).
- В чат Cursor: этот `CURSOR-PROMPT.md` + релевантные скриншоты из `pack/` + при необходимости `pack/README.md`.

### Скриншоты-референс (в `pack/`)
- `pack/preview-admin-chatbots-desktop.png`
- `pack/preview-admin-chatbots-mobile.png`

Открой прототип локально для интерактива:
```bash
cd pack   # эта папка этапа
python3 -m http.server
# затем ?lang=uk&theme=azure-blue&hideDemo=1  (+ page/role/state по README pack)
```

## Критерии приёмки
- Desktop + mobile соответствуют скриншотам по духу (токены, плотность, empty/loading/failed)
- Все 4 темы перекрашивают страницу внутри shell
- uk / en / ru — существующие строки страницы; API/guards/roles без регрессий
- Другие маршруты не изменены; Zero `::ng-deep`

## Порядок работ (рекомендация)

1. Открыть `pack/README.md` и скриншоты; сверить поля/ключи i18n с прод-компонентом.
2. Рестайл **только** шаблон/SCSS целевой страницы (или shell на этапе 01); логику/API не ломать.
3. Проверить 4 темы + uk/en/ru + desktop/mobile.
4. Не коммитить несвязанные файлы; не пушить на GitHub без запроса.

## Вне скоупа

- Правки других feature-страниц / backend
- Копирование demo-данных прототипа в прод
- Переписывание ThemeService / TranslateModule setup


========================================================================
# STAGE 21 — admin-users
========================================================================

# Cursor IDE Agent — этап 21: Админ: пользователи `/admin/users`

Скопируй **всё ниже линии** в чат Cursor Agent в репозитории GeoSun (`frontend-angular`).
К чату приложи файлы из `pack/` (см. раздел «Что приложить»).

---

## Цель

Портировать утверждённый UI этапа **Админ: пользователи `/admin/users`** из HTML-прототипа в Angular `frontend-angular`, **внутри уже утверждённого App shell** (контент outlet only). Тот же компонент для :userId deep-link.

### Точные маршруты
- `/admin/users`
- `/admin/users/:userId`

### Куда править (предположения по репо)
- Корень UI: `frontend-angular/`
- Целевые компоненты: `src/app/pages/admin-users/`
- i18n: `frontend-angular/src/assets/i18n/{uk,en,ru}.json`
- Темы: `src/styles/_theme.scss` + `ThemeService`
- Роутинг: существующий `app.routes.ts` (не изобретать новые path)

### Заметка этапа
Тот же компонент для :userId deep-link.

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

- Папка `pack/` этого этапа — полная копия `geosun-admin-users-material-dev/` (index.html, CSS/JS страницы, shell.*, i18n.js, README, preview-*.png).
- В чат Cursor: этот `CURSOR-PROMPT.md` + релевантные скриншоты из `pack/` + при необходимости `pack/README.md`.

### Скриншоты-референс (в `pack/`)
- `pack/preview-admin-users-desktop.png`
- `pack/preview-admin-users-mobile.png`

Открой прототип локально для интерактива:
```bash
cd pack   # эта папка этапа
python3 -m http.server
# затем ?lang=uk&theme=azure-blue&hideDemo=1  (+ page/role/state по README pack)
```

## Критерии приёмки
- Desktop + mobile соответствуют скриншотам по духу (токены, плотность, empty/loading/failed)
- Все 4 темы перекрашивают страницу внутри shell
- uk / en / ru — существующие строки страницы; API/guards/roles без регрессий
- Другие маршруты не изменены; Zero `::ng-deep`

## Порядок работ (рекомендация)

1. Открыть `pack/README.md` и скриншоты; сверить поля/ключи i18n с прод-компонентом.
2. Рестайл **только** шаблон/SCSS целевой страницы (или shell на этапе 01); логику/API не ломать.
3. Проверить 4 темы + uk/en/ru + desktop/mobile.
4. Не коммитить несвязанные файлы; не пушить на GitHub без запроса.

## Вне скоупа

- Правки других feature-страниц / backend
- Копирование demo-данных прототипа в прод
- Переписывание ThemeService / TranslateModule setup


========================================================================
# STAGE 22 — admin-file-storage-test
========================================================================

# Cursor IDE Agent — этап 22: Админ: тест файлового хранилища

Скопируй **всё ниже линии** в чат Cursor Agent в репозитории GeoSun (`frontend-angular`).
К чату приложи файлы из `pack/` (см. раздел «Что приложить»).

---

## Цель

Портировать утверждённый UI этапа **Админ: тест файлового хранилища** из HTML-прототипа в Angular `frontend-angular`, **внутри уже утверждённого App shell** (контент outlet only). Dropzone + objects table.

### Точные маршруты
- `/admin/file-storage-test`

### Куда править (предположения по репо)
- Корень UI: `frontend-angular/`
- Целевые компоненты: `src/app/pages/admin-file-storage-test/`
- i18n: `frontend-angular/src/assets/i18n/{uk,en,ru}.json`
- Темы: `src/styles/_theme.scss` + `ThemeService`
- Роутинг: существующий `app.routes.ts` (не изобретать новые path)

### Заметка этапа
Dropzone + objects table.

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

- Папка `pack/` этого этапа — полная копия `geosun-admin-file-storage-test-material-dev/` (index.html, CSS/JS страницы, shell.*, i18n.js, README, preview-*.png).
- В чат Cursor: этот `CURSOR-PROMPT.md` + релевантные скриншоты из `pack/` + при необходимости `pack/README.md`.

### Скриншоты-референс (в `pack/`)
- `pack/preview-admin-file-storage-test-desktop.png`
- `pack/preview-admin-file-storage-test-mobile.png`

Открой прототип локально для интерактива:
```bash
cd pack   # эта папка этапа
python3 -m http.server
# затем ?lang=uk&theme=azure-blue&hideDemo=1  (+ page/role/state по README pack)
```

## Критерии приёмки
- Desktop + mobile соответствуют скриншотам по духу (токены, плотность, empty/loading/failed)
- Все 4 темы перекрашивают страницу внутри shell
- uk / en / ru — существующие строки страницы; API/guards/roles без регрессий
- Другие маршруты не изменены; Zero `::ng-deep`

## Порядок работ (рекомендация)

1. Открыть `pack/README.md` и скриншоты; сверить поля/ключи i18n с прод-компонентом.
2. Рестайл **только** шаблон/SCSS целевой страницы (или shell на этапе 01); логику/API не ломать.
3. Проверить 4 темы + uk/en/ru + desktop/mobile.
4. Не коммитить несвязанные файлы; не пушить на GitHub без запроса.

## Вне скоупа

- Правки других feature-страниц / backend
- Копирование demo-данных прототипа в прод
- Переписывание ThemeService / TranslateModule setup


========================================================================
# STAGE 23 — not-found-404
========================================================================

# Cursor IDE Agent — этап 23: Страница 404 `/404`

Скопируй **всё ниже линии** в чат Cursor Agent в репозитории GeoSun (`frontend-angular`).
К чату приложи файлы из `pack/` (см. раздел «Что приложить»).

---

## Цель

Рестайл `NotFoundComponent` (`/404`): центрированная status-card, крупный 404, message, CTA `common.returnToHome` → `/main`.

### Точные маршруты
- `/404`

### Куда править (предположения по репо)
- Корень UI: `frontend-angular/`
- Целевые компоненты: `src/app/pages/not-found/ (NotFoundComponent)`
- i18n: `frontend-angular/src/assets/i18n/{uk,en,ru}.json`
- Темы: `src/styles/_theme.scss` + `ThemeService`
- Роутинг: существующий `app.routes.ts` (не изобретать новые path)

### Заметка этапа
Centered card + CTA → /main.

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

- `pack/` = `geosun-404-material-dev/`.
- Промпт + `pack/preview-404-*.png`.

### Скриншоты-референс (в `pack/`)
- `pack/preview-404-desktop.png`
- `pack/preview-404-mobile.png`

Открой прототип локально для интерактива:
```bash
cd pack   # эта папка этапа
python3 -m http.server
# затем ?lang=uk&theme=azure-blue&hideDemo=1  (+ page/role/state по README pack)
```

## Критерии приёмки
- Desktop + mobile ≈ скриншоты; 4 темы; uk/en/ru `pages.notFound.*` + `common.returnToHome`
- Не добавлять выдуманный copy; правки только этой страницы (+ shared tokens при необходимости)

## Порядок работ (рекомендация)

1. Открыть `pack/README.md` и скриншоты; сверить поля/ключи i18n с прод-компонентом.
2. Рестайл **только** шаблон/SCSS целевой страницы (или shell на этапе 01); логику/API не ломать.
3. Проверить 4 темы + uk/en/ru + desktop/mobile.
4. Не коммитить несвязанные файлы; не пушить на GitHub без запроса.

## Вне скоупа

- Правки других feature-страниц / backend
- Копирование demo-данных прототипа в прод
- Переписывание ThemeService / TranslateModule setup


========================================================================
# STAGE 24 — stop-service
========================================================================

# Cursor IDE Agent — этап 24: Техработы `/stop-service`

Скопируй **всё ниже линии** в чат Cursor Agent в репозитории GeoSun (`frontend-angular`).
К чату приложи файлы из `pack/` (см. раздел «Что приложить»).

---

## Цель

Рестайл `/stop-service`: maintenance card на M3 error tokens (убрать hardcoded `#d32f2f`), loading dots, refresh re-check. Ключи `pages.stopService.*`.

### Точные маршруты
- `/stop-service`

### Куда править (предположения по репо)
- Корень UI: `frontend-angular/`
- Целевые компоненты: `src/app/pages/stop-service/`
- i18n: `frontend-angular/src/assets/i18n/{uk,en,ru}.json`
- Темы: `src/styles/_theme.scss` + `ThemeService`
- Роутинг: существующий `app.routes.ts` (не изобретать новые path)

### Заметка этапа
M3 error tokens вместо hardcoded #d32f2f; refresh re-check.

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

- `pack/` = `geosun-stop-service-material-dev/`.
- Промпт + `pack/preview-stop-service-*.png`.

### Скриншоты-референс (в `pack/`)
- `pack/preview-stop-service-desktop.png`
- `pack/preview-stop-service-mobile.png`

Открой прототип локально для интерактива:
```bash
cd pack   # эта папка этапа
python3 -m http.server
# затем ?lang=uk&theme=azure-blue&hideDemo=1  (+ page/role/state по README pack)
```

## Критерии приёмки
- Desktop + mobile ≈ скриншоты; 4 темы через `--mat-sys-*`
- Поведение refresh/re-check сохранено; без правок других страниц

## Порядок работ (рекомендация)

1. Открыть `pack/README.md` и скриншоты; сверить поля/ключи i18n с прод-компонентом.
2. Рестайл **только** шаблон/SCSS целевой страницы (или shell на этапе 01); логику/API не ломать.
3. Проверить 4 темы + uk/en/ru + desktop/mobile.
4. Не коммитить несвязанные файлы; не пушить на GitHub без запроса.

## Вне скоупа

- Правки других feature-страниц / backend
- Копирование demo-данных прототипа в прод
- Переписывание ThemeService / TranslateModule setup
