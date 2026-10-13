# GeoSun TMS — `/route-builder` · Material Angular Dev aesthetic

High-fidelity HTML prototype for the **route builder create/edit/view UI** (`/route-builder` · `RouteBuilderComponent`), framed inside the **approved App shell** from `geosun-app-shell-material-dev/` (permanent sidenav + toolbar, 4 M3 themes, uk/en/ru). Sibling to the `/routes` pack (`geosun-routes-material-dev/`).

> **One page only.** Shell chrome is reused; other nav targets stay stub panels. No Angular edits in this pack.

## What production `/route-builder` shows today

Source: `frontend-angular/src/app/pages/route-builder/`

| Element | Production behavior |
|---------|---------------------|
| Layout | `.freight-layout` — **sidebar (~360px) + map**; compact ≤`1099.98px` (`compact-split`) toggles full sidebar **or** full map via FAB (`showMap` / `showSidebar`) |
| Modes | `create` · `edit` · `view` — title via `pages.routeBuilder.modeTitle*` |
| Distance chip | Total km (`pages.freightCalculation.km`) |
| View actions | Mini-FABs: my routes · edit (or duplicate if `lockedByRequest`) · new · delete; primary **Send request** |
| Create/edit actions | Clear all · Clear operations · Save (`createRoute` / `saveChanges`); edit also **Back to view** |
| Search | Outline field + Nominatim-style results (edit/create only) |
| Point list | Ordered cards: label (start/stop/finish/border), address, copyable coords chip, operations (chips in view / checkboxes in edit), remove |
| Segments | Distance between points; **border picker** (country + checkpoint) when UA↔foreign without border |
| Operations | `LOADING` · `EXPORT_CUSTOMS` · `IMPORT_CUSTOMS` · `UNLOADING` with validation errors under `pages.routeBuilder.errors.*` |
| Map | Leaflet host (full remaining viewport) |
| Roles | `user` only (`app.routes.ts`) |

Production is already a map+sidebar builder; this pack **restyles** it to M3 tonal surfaces inside the approved shell (flush content, denser panel, softer cards).

## Design choices (prototype)

1. **Desktop split** — 400px form panel + stylized map canvas (no Leaflet dependency for the HTML pack).
2. **Mobile / compact** — same production pattern: exclusive sidebar **or** map + pulsing FAB toggle (`≤1099.98px`).
3. **Flush shell outlet** — `.app-content--flush` removes page padding so the map fills the content grid cell.
4. **Modes via demo bar / `?mode=`** — create (default screenshots), edit, view with matching action rows.
5. **Stylized map** — land blob + dashed route polyline + numbered markers (blue regular / green border).
6. **Shell unchanged** — same sidenav/toolbar/themes/langs; default role **`user`**.

## How to open

```bash
cd /workspace/geosun-route-builder-material-dev
python3 -m http.server 8774
# → http://localhost:8774/?lang=uk&theme=azure-blue&role=user&mode=create
```

### Query params

| Param | Values | Notes |
|-------|--------|-------|
| `theme` | `azure-blue` · `rose-red` · `magenta-violet` · `cyan-orange` | `localStorage` `geosun-app-theme` |
| `lang` | `uk` · `en` · `ru` | `geosun-app-lang` |
| `role` | `admin` · `manager` · `driver` · `user` | Default `user` |
| `page` | `route-builder` (default) or other nav | Non-builder = stub |
| `mode` | `create` · `edit` · `view` | Builder mode |
| `panel` | `sidebar` · `map` | Compact starting panel |
| `hideDemo` | `1` | Hides role/mode switcher |

## Files

| File | Purpose |
|------|---------|
| `index.html` | App shell + redesigned `/route-builder` body |
| `shell.css` | Approved shell styles (copied) |
| `route-builder.css` | Panel / points / map / compact / flush content |
| `shell.js` | Theme/lang/nav/drawer (defaults: page=`route-builder`, role=`user`) |
| `route-builder.js` | Demo waypoints, modes, compact toggle, map markers |
| `i18n.js` | Real `pages.routeBuilder.*` / `pages.freightCalculation.*` + shell keys |
| `GeoSun_logo_svg.svg` | Brand logo |
| `preview-route-builder-desktop.png` | Desktop 1280×800, azure-blue, uk, create |
| `preview-route-builder-mobile.png` | Mobile 390×844 (sidebar panel) |
| `preview-route-builder-desktop-magenta.png` | Desktop, magenta-violet (optional) |
| `preview-route-builder-mobile-map.png` | Mobile map panel (optional) |
| `README.md` | This file |
| `CURSOR-PROMPT.md` | Angular port prompt |

Zip: `/workspace/geosun-route-builder-material-dev.zip`

## Screenshots

- `preview-route-builder-desktop.png` — 1280×800
- `preview-route-builder-mobile.png` — 390×844
- `preview-route-builder-desktop-magenta.png` — second theme
- `preview-route-builder-mobile-map.png` — mobile map state

## Prototype-only i18n

Keys **not** in production `pages.routeBuilder` yet (hints / demo):

`redesignNote`, `demoMode`, `panelHint`, `mapHint`, `searchDemoHint`, `pointsHeading`, `borderPending`, `segmentLabel`, `stubBody`, `mobileSheetPeek`.
