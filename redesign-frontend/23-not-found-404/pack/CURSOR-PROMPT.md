# Cursor IDE Agent prompt — port GeoSun `/404`

Copy everything below the line into Cursor Agent chat in the GeoSun Angular repo.

---

## Task

Implement the approved UI from the HTML prototype (`geosun-404-material-dev/`) into Angular `frontend-angular/src/app/pages/not-found/` for `/404`.

Reference screenshots:

- `preview-404-desktop.png` (1280×800, azure-blue, uk)\n- `preview-404-mobile.png` (390×844)

## Hard constraints

1. **Do not redesign other pages.** Keep existing route registration in `app.routes.ts` and guards as today.
2. **Use ngx-translate** with existing keys under `pages.notFound.*` (and `common.returnToHome` for 404).
3. **Themes** — recolor via `--mat-sys-*`. No `::ng-deep`.
4. Match desktop + mobile screenshots in spirit (centered card, typography, CTA).

## Page specifics (`NotFoundComponent`)

Production template is minimal (`h1` + `p` + `routerLink="/main"`). Restyle in place:

- Centered status card in the outlet (flex host, min-height ~viewport minus chrome)
- Large **404** numeral (`pages.notFound.title`) + `pages.notFound.message`
- Primary CTA: `common.returnToHome` → `/main` (keep `RouterLink`)
- Optional icon (`search_off`) in a tonal disc — no new i18n required
- Do **not** add invented copy beyond existing keys

## Acceptance

- Desktop + mobile match screenshots in spirit
- All four themes recolor the page
- uk / en / ru use existing strings
- No Angular edits outside this page (and shared tokens if needed)
