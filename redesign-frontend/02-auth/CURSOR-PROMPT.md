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
