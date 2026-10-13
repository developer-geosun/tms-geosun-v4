# GeoSun TMS — `/routes` routes list · Material Angular Dev aesthetic

High-fidelity HTML prototype for the **my routes list** (`/routes` · `RoutesComponent`), framed inside the **approved App shell** from `geosun-app-shell-material-dev/` (permanent sidenav + toolbar, 4 M3 themes, uk/en/ru).

> **One page only.** Shell chrome is reused unchanged in spirit; other nav targets stay stub panels. No Angular edits in this pack.

## What production `/routes` shows today

Source: `frontend-angular/src/app/pages/routes/`

| Element | Production behavior |
|---------|---------------------|
| Page heading | Dynamic via `listViewPageHeadingKey()` → `pages.routes.listViewHeadingActive\|All\|Deleted` |
| Header FABs | `add` → create (`pages.routes.addNewRoute`); `settings` → MatBottomSheet filters/sort |
| List filter | `active` (default) · `all` · `deleted` — local filter on `GET view=all` cache |
| Sort | `updatedAt` (default desc) · `createdAt` · `id` · `distanceKm` + asc/desc |
| Loading | `pages.routes.loading` |
| Load failed | `pages.routes.loadFailed` |
| Empty | `pages.routes.empty` / `pages.routes.emptyDeleted` |
| Card meta | Route ID, Created, Last change (`savedAt`), Last opened, distance km |
| Points | Ordered point cards: address, coords chip, operation chips, border order badge |
| Status | `deleted` chip; edit disabled + tooltip when `lockedByRequest` |
| Actions | Delete / Restore · Edit · Open (route-builder) · Send freight request |

Production layout is a **responsive card grid** of nested outlined `mat-card`s (meta subcard + point cards + footer FABs). There is **no data table** in production.

## Design choices (prototype)

1. **Desktop M3 data table** — flattens nested cards into readable columns (ID, points path, distance, created, updated, opened, status, actions) while keeping the same fields and actions.
2. **Mobile card list** — compact route cards with meta grid, expandable-feeling point rows, and the same action set (closer to production cards, cleaned for M3 tonal surfaces).
3. **Inline filter/sort toolbar (desktop)** — list-view chips + sort select + direction; mirrors bottom-sheet controls without requiring a sheet on wide viewports.
4. **Tune FAB + bottom sheet (mobile)** — same show/sort controls as `RoutesToolbarBottomSheetComponent`.
5. **Empty / loading / failed** — soft state panels (demo via `?state=` or the demo bar).
6. **Shell unchanged** — same sidenav sections, toolbar theme/lang/user, mobile drawer; default role **`user`** (only role with `/routes` in production nav).

## How to open

```bash
cd /workspace/geosun-routes-material-dev
python3 -m http.server 8773
# → http://localhost:8773/?lang=uk&theme=azure-blue&role=user
```

### Query params

| Param | Values | Notes |
|-------|--------|-------|
| `theme` | `azure-blue` · `rose-red` · `magenta-violet` · `cyan-orange` | `localStorage` `geosun-app-theme` |
| `lang` | `uk` · `en` · `ru` | `geosun-app-lang` |
| `role` | `admin` · `manager` · `driver` · `user` | Default `user` for this pack |
| `page` | `routes` (default) or other nav routes | Active nav; non-routes = stub |
| `state` | `list` · `empty` · `loading` · `failed` | Demo list states |
| `view` | `active` · `all` · `deleted` | Initial list filter |
| `hideDemo` | `1` | Hides role/state switcher |

## Files

| File | Purpose |
|------|---------|
| `index.html` | App shell + redesigned `/routes` body |
| `shell.css` | Approved shell styles (copied) |
| `routes.css` | Hero / toolbar / table / cards / sheet / states |
| `shell.js` | Theme/lang/nav/drawer (defaults: page=`routes`, role=`user`) |
| `routes.js` | Demo data, filter/sort, table + cards render |
| `i18n.js` | Real `pages.routes.*` / shell keys + prototype headings |
| `GeoSun_logo_svg.svg` | Brand logo |
| `preview-routes-desktop.png` | Desktop 1280×800, azure-blue, uk, user |
| `preview-routes-mobile.png` | Mobile 390×844 |
| `preview-routes-desktop-magenta.png` | Desktop, magenta-violet (optional) |
| `preview-routes-empty-desktop.png` | Empty state (optional) |
| `README.md` | This file |
| `CURSOR-PROMPT.md` | Angular port prompt |

Zip: `/workspace/geosun-routes-material-dev.zip`

## Screenshots

- `preview-routes-desktop.png` — 1280×800
- `preview-routes-mobile.png` — 390×844
- `preview-routes-desktop-magenta.png` — second theme
- `preview-routes-empty-desktop.png` — empty list

## Prototype-only i18n

These keys are **not** in production `pages.routes` yet (column headers / hints). Prefer adding them or inlining on port:

`colId`, `colCreated`, `colUpdated`, `colOpened`, `colDistance`, `colPoints`, `colStatus`, `colActions`, `statusActive`, `statusDeleted`, `statusLocked`, `pointsCount`, `viaBorder`, `emptyBody`, `loadingHint`, `filterHint`, `openFilters`, `redesignNote`, `demoState`.
