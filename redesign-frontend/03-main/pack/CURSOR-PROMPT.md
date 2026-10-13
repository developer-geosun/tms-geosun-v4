# Cursor IDE Agent prompt — port GeoSun `/main` dashboard

Copy everything below the line into Cursor Agent chat in the GeoSun Angular repo.

---

## Task

Implement the approved **`/main` home dashboard** UI from the HTML prototype (`geosun-main-material-dev/`) into Angular `frontend-angular` **`MainComponent`**, inside the approved **App shell** (sidenav + toolbar).

Reference screenshots:

- `preview-main-desktop.png` (1280×800, azure-blue, uk, admin)
- `preview-main-mobile.png` (390×844)
- `preview-main-desktop-magenta.png` (dark theme check)

Open `index.html` with `?role=admin|manager|driver|user` to compare role layouts.

## Hard constraints

1. **Do not redesign other pages** or invent new routes. Quick-action / KPI destinations must be existing `app.routes.ts` paths the role can already open.
2. **Keep AuthService role checks** — same gates as today: manager banner `admin|manager`, admin banner `admin`; KPI/quick sets mirror prototype `main.js` role tables.
3. **Use ngx-translate.** Prefer existing keys:
   - `pages.main.title|welcome|signedInAs|managerSection|adminSection`
   - `pages.main.freightCalculationLink|adminRouteRequestsLink` (already in i18n, unused in template)
   - `navigation.*`, `pages.routeBuilder.newRoute`
   - Empty copy: `pages.adminRouteRequests.empty`, `pages.myTrips.empty`, `pages.routes.empty`
4. **Add only the missing heading/hint keys** listed in the prototype README (or hardcode EN/UK/RU via translate JSON) — do not invent alternate product labels for nav items.
5. **KPI numbers are stubs** until real APIs exist — show placeholders or hide stats and keep cards as navigation tiles.
6. **Themes / shell** — do not re-implement sidenav/toolbar here; rely on approved App shell. Main is content-only (`app-main` inside outlet).
7. **No `::ng-deep`.** Match M3 tokens (`--mat-sys-*`), soft surfaces, tonal hero, pill CTAs from `main.css`.

## Suggested structure

```
src/app/pages/main/
  main.component.ts|html|scss
  # optional: main-kpi / main-quick-actions child components
```

`MainComponent` already has `user`, `canSeeManagerSection`, `canSeeAdminSection` — extend with computed quick/KPI lists filtered by `hasAnyRole`.

## Acceptance

- Desktop + mobile match screenshots in spirit (hero, KPI grid, quick tiles, empty activity)
- Switching role (or logging in as different roles) shows the matching widget set
- All four themes recolor surfaces via tokens
- Welcome / signed-in / role banners remain accurate
- No Angular changes to other feature pages in this task
