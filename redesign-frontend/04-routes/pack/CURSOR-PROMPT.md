# Cursor IDE Agent prompt — port GeoSun `/routes` list

Copy everything below the line into Cursor Agent chat in the GeoSun Angular repo.

---

## Task

Implement the approved **`/routes` routes list** UI from the HTML prototype (`geosun-routes-material-dev/`) into Angular `frontend-angular` **`RoutesComponent`**, inside the approved **App shell** (sidenav + toolbar).

Reference screenshots:

- `preview-routes-desktop.png` (1280×800, azure-blue, uk, user)
- `preview-routes-mobile.png` (390×844)
- `preview-routes-desktop-magenta.png` (dark theme check)
- `preview-routes-empty-desktop.png` (empty state)

Open `index.html` with `?role=user&state=list|empty|loading` to compare states.

## Hard constraints

1. **Do not redesign other pages** or invent new routes. Open/Edit/Add still navigate to existing `/route-builder` modes; freight still opens `RouteFreightRequestDialogComponent`.
2. **Keep existing data & filters** — same `RoutesApiService.getMyRoutes('all')` cache, `listView` active/all/deleted, sort keys `id|createdAt|updatedAt|distanceKm` + direction, soft-delete / restore, `lockedByRequest` edit lock.
3. **Use ngx-translate.** Prefer existing keys under `pages.routes.*`, `pages.routesHistory.openRoute|deleteRoute`, `pages.freightCalculation.openRequest|km`, `pages.routeBuilder.routeId|operations.*|copyCoordinates`.
4. **Add only missing column/hint keys** listed in the prototype README (or hardcode EN/UK/RU) — do not invent alternate product labels for actions.
5. **Desktop table + mobile cards** — match prototype: MatTable (or CSS table) ≥960px; card list below. Do not ship nested meta-subcard grid as the primary desktop layout.
6. **Filter/sort UX** — desktop inline chips/select; mobile keep MatBottomSheet (`RoutesToolbarBottomSheetComponent`) or equivalent tune sheet.
7. **Themes / shell** — content-only inside outlet; no re-implementation of sidenav/toolbar.
8. **No `::ng-deep`.** Match M3 tokens (`--mat-sys-*`), soft surfaces, tonal hero, pill freight CTA from `routes.css`.

## Suggested structure

```
src/app/pages/routes/
  routes.component.ts|html|scss
  routes-toolbar-bottom-sheet.component.*
  # optional: routes-table / routes-card-list child components
```

Keep signals (`listView`, `sortBy`, `sortDirection`, `isLoading`, …) and mapping logic; swap template layout only.

## Acceptance

- Desktop + mobile match screenshots in spirit (hero, filter bar / sheet, table vs cards, empty/loading)
- Active/all/deleted + sort still work without extra API calls
- Deleted restore, locked edit disable, freight disable on deleted/empty points preserved
- All four themes recolor surfaces via tokens
- No Angular changes to other feature pages in this task
