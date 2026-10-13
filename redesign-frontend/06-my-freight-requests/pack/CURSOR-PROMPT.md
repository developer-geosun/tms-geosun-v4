# Cursor IDE Agent prompt — port GeoSun `/my-freight-requests`

Copy everything below the line into Cursor Agent chat in the GeoSun Angular repo.

---

## Task

Implement the approved **`/my-freight-requests`** UI from the HTML prototype (`geosun-freight-requests-material-dev/`) into Angular `frontend-angular` **`MyFreightRequestsComponent`**, inside the approved **App shell** (sidenav + toolbar).

Reference screenshots:

- `preview-freight-desktop.png` (1280×800, azure-blue, uk, user)
- `preview-freight-mobile.png` (390×844)
- `preview-freight-desktop-magenta.png` (dark theme check)
- `preview-freight-empty-desktop.png` (empty state)

Open `index.html` with `?role=user&state=list|empty|loading|failed` to compare states.

## Hard constraints

1. **Do not redesign other pages** or invent routes. **Open route** still goes to `/route-builder` with `queryParams: { routeId, mode: 'view' }`.
2. **Keep existing data.** `RouteRequestsApiService.getMyRouteRequests()`, client sort by `createdAt` desc, same `RouteRequestContractDto` / `QuoteContractDto` fields. Do **not** add server filters — the user endpoint has none (admin queue filters stay on `/admin/route-requests` only).
3. **Use ngx-translate.** Existing keys under `pages.myFreightRequests.*`, `navigation.myFreightRequests`, `pages.freightCalculation.km`, `pages.freightCalculation.labels.border`. Status chips: `requestStatus.*` and `quoteStatus.*`.
4. **`pages.myFreightRequests.quoteStatus` is an object**, not a label. Do not bind the parent key as a row title (it does not resolve to a string). Use `pages.adminRouteRequests.status` or add a real label key.
5. **Add only the missing column/hint keys** listed in the prototype README — or skip the client status chips entirely. If you keep chips, filter the already loaded array locally (`all` + the 7 request statuses). Do not call admin list params.
6. **Desktop table + mobile cards** — match prototype: table (or MatTable) ≥960px with an expandable detail row; card list below. Do not ship the current full-width stacked `mat-card` as the primary desktop layout.
7. **States** — loading spinner, `loadFailed`, empty (`empty`). Refresh stays a stroked button and calls `reload()`.
8. **Themes / shell** — content only inside the outlet; do not re-implement sidenav/toolbar. Role stays **user** (existing `navigationItems` gating).
9. **No `::ng-deep`.** M3 tokens (`--mat-sys-*`), tonal hero, pill refresh, status chips. Quoted/accepted may use `primary-container` if `--mat-sys-tertiary` is not on the shell theme.

## Suggested structure

```
src/app/pages/my-freight-requests/
  my-freight-requests.component.ts|html|scss
  # optional: freight-request-table / freight-request-card
```

Keep signals (`requests`, `isLoading`, `loadFailed`) and helpers (`requestStatusKey`, `quoteStatusKey`, `countryDistanceKm`, `countryStepNumber`, `sortedPoints`, `openRoute`). Swap the template layout.

## Acceptance

- Desktop + mobile match the screenshots in spirit (tokens, density, status color groups)
- All four themes recolor the page inside the shell
- uk / en / ru use existing freight-request strings
- Empty, loading, and failed states still come from the same signals
- No new API and no admin-only filters on this page
