# Cursor IDE Agent prompt — port GeoSun `/route-builder`

Copy everything below the line into Cursor Agent chat in the GeoSun Angular repo.

---

## Task

Implement the approved **`/route-builder`** UI from the HTML prototype (`geosun-route-builder-material-dev/`) into Angular `frontend-angular` **`RouteBuilderComponent`**, inside the approved **App shell** (sidenav + toolbar).

Reference screenshots:

- `preview-route-builder-desktop.png` (1280×800, azure-blue, uk, create)
- `preview-route-builder-mobile.png` (390×844, sidebar panel)
- `preview-route-builder-desktop-magenta.png` (dark theme check)
- `preview-route-builder-mobile-map.png` (compact map panel)

Open `index.html` with `?role=user&mode=create|edit|view&panel=sidebar|map` to compare states.

## Hard constraints

1. **Do not invent product flows.** Keep create/edit/view modes, save/clear/clear-ops, freight request (view), locked duplicate, border picker, and operation validation as today.
2. **Keep map engine** — continue using the existing Leaflet (or current) map host; the prototype map is a **visual stand-in** only.
3. **Use ngx-translate.** Prefer existing keys under `pages.routeBuilder.*`, `pages.freightCalculation.*` (labels, search, km, clear, openRequest, countries, border selects).
4. **Layout** — desktop: sidebar form panel + map fill; compact ≤`compact-split` (`1099.98px`): exclusive panel with FAB toggle (`showMap` / `showSidebar`) — already in production; restyle to match prototype tokens/density.
5. **Shell flush** — route-builder outlet should be padding-free / full-height so the map fills the content area (prototype `.app-content--flush`).
6. **Themes** — `--mat-sys-*` only; no hard-coded blues except marker conventions (regular `#2563eb`, border `#16a34a`) if already used.
7. **No `::ng-deep`.** Component SCSS + tokens / host classes only.
8. **Do not redesign other pages** in this task (including `/routes` list).

## Suggested structure

```
src/app/pages/route-builder/
  route-builder.component.ts|html|scss
  route-builder.models.ts
  route-point-operations.utils.ts
  # keep existing map wiring; restyle sidebar-actions / point-row / compact FAB
```

Keep signals (`mode`, waypoints, compactRouteLayout, …); swap template/SCSS layout density and shell flush.

## Acceptance

- Desktop + mobile match screenshots in spirit (panel card, point rows, distance chip, map fill, compact FAB)
- Create / edit / view action rows still correct
- Operations checkboxes/chips + border picker + validation snacks preserved
- All four themes recolor surfaces via tokens
- No Angular changes to unrelated feature pages in this task
