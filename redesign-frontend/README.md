# GeoSun TMS — Staged redesign handoff (Cursor IDE)

Поэтапный handoff HTML Material-прототипов → Angular `frontend-angular` для работы в **Cursor Agent**.

## Быстрый старт

1. Распакуй архив `geosun-redesign-stages.tar.gz` (или работай из `/workspace/geosun-redesign-stages/`).
2. Открой `STAGES.md` — порядок этапов 01…24.
3. Для этапа `NN-…`:
   - прочитай `NN-…/CURSOR-PROMPT.md` (русский, copy-paste в Agent);
   - приложи скриншоты / файлы из `NN-…/pack/`;
   - прототип: `cd NN-…/pack && python3 -m http.server`.
4. После приёмки этапа — следующий номер.

См. также `00-overview/README.md`.

## Структура

```
geosun-redesign-stages/
  README.md
  STAGES.md
  ALL-PROMPTS.md          # все промпты подряд
  00-overview/README.md
  01-app-shell/
    CURSOR-PROMPT.md
    pack/                 # копия geosun-app-shell-material-dev
  02-auth/
    …
  24-stop-service/
```

Индекс исходных паков: [`/workspace/geosun-design-index.md`](../geosun-design-index.md).

## Общие constraints (каждый промпт)

- Только `frontend-angular`
- Material 3 `--mat-sys-*`, **без** `::ng-deep`
- i18n **uk / en / ru** — сохранять ключи
- 4 темы: azure-blue, rose-red, magenta-violet, cyan-orange
- Desktop + mobile
- Не трогать другие маршруты в рамках этапа
- Не копировать HTML-прототип в прод как static UI

## Архив

`/workspace/geosun-redesign-stages.tar.gz` — всё дерево целиком (packs вложены в этапы).

## Примечание

Angular-код в этом handoff **не** правится — только материалы для IDE.
Исходные `/workspace/geosun-*-material-dev/` остаются на месте; stages содержат копии для автономной передачи.
