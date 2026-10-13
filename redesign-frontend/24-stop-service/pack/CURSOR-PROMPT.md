# Cursor IDE Agent prompt — port GeoSun `/stop-service`

Copy everything below the line into Cursor Agent chat in the GeoSun Angular repo.

---

## Task

Implement the approved UI from the HTML prototype (`geosun-stop-service-material-dev/`) into Angular `frontend-angular/src/app/pages/stop-service/` for `/stop-service`.

Reference screenshots:

- `preview-stop-service-desktop.png` (1280×800, azure-blue, uk)\n- `preview-stop-service-mobile.png` (390×844)

## Hard constraints

1. **Do not redesign other pages.** Keep existing route registration in `app.routes.ts` and guards as today.
2. **Use ngx-translate** with existing keys under `pages.stopService.*` (and `common.returnToHome` for 404).
3. **Themes** — recolor via `--mat-sys-*`. No `::ng-deep`.
4. Match desktop + mobile screenshots in spirit (centered card, typography, CTA).

## Page specifics (`StopServiceComponent`)

Keep `AuthAvailabilityService.checkOnStartup` + navigate to `/login` when available.
Keep refresh spinner (`isChecking` signal) and mat-stroked button affordance.

**Visual change (required):** replace hardcoded `#d32f2f` / white with M3 tokens so all four themes recolor:

- Card: `background: var(--mat-sys-error); color: var(--mat-sys-on-error);`
- Sub text: mix `on-error` at ~88–92%
- Refresh: stroked with `on-error` border; spinner uses `currentColor`
- Keep loading-dots pulse animation
- Strings: `pages.stopService.title|message|subMessage|tryLater|refresh`

Layout stays centered in the host (production has no sidenav requirement for this
public route — content-only SCSS is fine; do not force App shell chrome onto the
Angular stop-service route if the app root already wraps it).

## Acceptance

- Desktop + mobile match screenshots in spirit
- All four themes recolor the page
- uk / en / ru use existing strings
- No Angular edits outside this page (and shared tokens if needed)
