# Cursor IDE Agent prompt — port GeoSun `/admin/trips`

Copy everything below the line into Cursor Agent chat in the GeoSun Angular repo.

---

## Task

Implement the approved **`/admin/trips`** list UI from the HTML prototype (`geosun-admin-trips-material-dev/`) into Angular `frontend-angular` **`AdminTripsComponent`**, inside the approved **App shell** (sidenav + toolbar).

Reference screenshots:

- `preview-admin-trips-desktop.png` (1280×800, azure-blue, uk, admin)
- `preview-admin-trips-mobile.png` (390×844)
- `preview-admin-trips-desktop-magenta.png` (dark theme check)
- `preview-admin-trips-empty-desktop.png` (empty state)

Open `index.html` with `?role=admin|manager&state=list|empty|loading|failed` to compare states.

## Hard constraints

1. **Do not redesign other pages.** Keep existing APIs: `TripsApiService.listAdmin`, and leave **`AdminTripDetailComponent`** / create / expense flows as separate routes (`/admin/trips/:id`, `/admin/trips/new`).
2. **Keep production filters and paging.** Status filter only in the list UI (`''` + `DRAFT`/`PLANNED`/`IN_PROGRESS`/`COMPLETED`/`CANCELLED`). Page sizes **5/10/25/50**; desktop default **10**, handset default **5**. Always `view: 'active'`.
3. **Layout polish:** keep **desktop MatTable + mobile cards**, matching the prototype density, hero/actions, and **translated status chips** (not plain text). Status chip colors should follow M3 containers by status group.
4. **Use ngx-translate.** Existing keys under `pages.adminTrips.*`, `navigation.adminTrips`. Prefer `statusLabelKey` → `pages.adminTrips.status.*`.
5. **Add only missing hint/pager keys** listed in the prototype README, or hardcode temporarily.
6. **Roles** remain **admin** and **manager** via existing `navigationItems` gating.
7. **Actions** stay: Refresh → `reload()`, Create → `routerLink="/admin/trips/new"`, Open → `['/admin/trips', row.id]`.
8. **Themes / shell** — content only inside the outlet; no sidenav/toolbar reimplementation. No `::ng-deep`. M3 tokens (`--mat-sys-*`).
9. Optional list enrichment: show expense report status under title when present — do **not** invent new API fields.

## Suggested structure

```
src/app/pages/admin-trips/
  admin-trips.component.ts|html|scss   # list only
  admin-trip-detail.component.*        # leave alone unless shared status chip helper
```

Keep signals (`trips`, `pageIndex`, `pageSize`, `statusFilter`, `isLoading`, `loadError`) and existing `TripsApiService.listAdmin` call. Swap presentation polish (hero, chips, status badges) to match screenshots.

## Acceptance

- Desktop + mobile match the screenshots in spirit (tokens, density, status color groups)
- All four themes recolor the page inside the shell
- uk / en / ru use existing admin trips strings
- Empty, loading, and failed states still work
- Status filter + pager + refresh/create/open still call the same APIs / routes
