# 00 — Overview

Пакет **поэтапного** редизайна GeoSun TMS (Material 3) для работы в **Cursor IDE**.

## Источники

Все HTML-прототипы живут в `/workspace/geosun-*-material-dev/` (см. также `/workspace/geosun-design-index.md`).
В каждом этапе `NN-*/pack/` лежит **копия** нужного material-dev пака.

## Порядок внедрения

См. корневой `STAGES.md`. Сначала **01-app-shell**, затем **02-auth**, затем контентные страницы 03…24.
Auth (guest) и App shell независимы по layout, но визуальный язык общий (M3 `--mat-sys-*`, 4 темы).

## Как работать в Cursor

1. Открой репозиторий `tms-geosun-v4` / `frontend-angular`.
2. Выбери этап `NN-…/CURSOR-PROMPT.md`.
3. Скопируй текст **ниже `---`** в Agent chat.
4. Приложи скриншоты и при необходимости файлы из `NN-…/pack/`.
5. После merge/проверки — следующий этап. Не смешивай несколько страниц в одном промпте.

## Ограничения (все этапы)

- Только `frontend-angular`
- Material 3 tokens, без `::ng-deep`
- i18n uk/en/ru — сохранять ключи
- 4 темы, desktop+mobile
- Не трогать чужие routes в рамках одного этапа

Полный каталог паков: `../geosun-design-index.md` (или `/workspace/geosun-design-index.md`).
