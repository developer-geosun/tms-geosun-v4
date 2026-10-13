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
