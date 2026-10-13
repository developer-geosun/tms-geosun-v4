# Cursor IDE Agent prompt — port GeoSun `/my-trips`

Copy everything below the line into Cursor Agent chat in the GeoSun Angular repo.

---

## Task

Implement the approved UI from the HTML prototype (`geosun-my-trips-material-dev/`) into Angular `frontend-angular` for `/my-trips`, inside the approved **App shell**.

Reference screenshots:

- `preview-my-trips-desktop.png` (1280×800, azure-blue, uk)
- `preview-my-trips-mobile.png` (390×844)

## Hard constraints

1. **Do not redesign other pages.** Keep existing APIs and route guards/roles.
2. **Match production fields** listed in the prototype README / i18n keys under the page namespace.
3. **Use ngx-translate** with existing keys; add only missing hint keys if needed.
4. **Themes / shell** — content only inside the outlet; no sidenav/toolbar reimplementation. No `::ng-deep`. M3 tokens (`--mat-sys-*`).
5. Desktop table + mobile cards (or accordion/form as in prototype) should follow the screenshots in spirit.

## Acceptance

- Desktop + mobile match screenshots in spirit
- All four themes recolor the page inside the shell
- uk / en / ru use existing strings
- Empty / loading / failed (where applicable) still work
