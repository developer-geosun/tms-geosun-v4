# GeoSun TMS — `/admin/trips` · Material Angular Dev aesthetic

High-fidelity HTML prototype for the **admin trips list** (`/admin/trips` · `AdminTripsComponent`), framed inside the **approved App shell** from `geosun-app-shell-material-dev/` (permanent sidenav + toolbar, 4 M3 themes, uk/en/ru).

> **One page only.** Shell chrome is reused; other nav targets stay stub panels. Trip **detail / create** (`/admin/trips/:id`, `/admin/trips/new`) stay out of scope. No Angular edits in this pack.

## What production `/admin/trips` shows today

Source: `frontend-angular/src/app/pages/admin-trips/`
API: `TripsApiService.listAdmin({ view, status, driverId?, plannedFrom?, plannedTo?, page, size })` → paged `TripContractDto[]`.

| Element | Production behavior |
|---------|---------------------|
| Roles | **admin**, **manager** (`navigation.adminTrips`) |
| Page heading | `pages.adminTrips.title` |
| Header actions | Status **button-toggle** filter, stroked **Refresh** (icon), filled **Create** → `/admin/trips/new` (icon) |
| Layout | Desktop **MatTable**; handset **MatCard** list |
| Columns / card fields | `tripNumber`, `title`, `status`, `driverName`, route (`originText` → `destinationText`), `plannedStartAt`, actions (**Open** → `/admin/trips/:id`) |
| Paging | `pageSize` **5 / 10 / 25 / 50**; desktop default **10**, handset default **5** |
| List query | `view: 'active'` always; optional `status` from toggle (`''` = all) |
| Status options | `DRAFT` · `PLANNED` · `IN_PROGRESS` · `COMPLETED` · `CANCELLED` (+ “All”) |
| Empty / error | `pages.adminTrips.empty`, `loadFailed` |
| Labels | `pages.adminTrips.status.*` via `statusLabelKey` |

API also accepts `driverId` / `plannedFrom` / `plannedTo`, but the **list UI does not expose them** today (status-only filter).

## Design choices (prototype)

1. **Desktop M3 table** — same columns as production; status as **colored chips**; optional expense-report pill under title when `expenseReportStatus` is set (extra context, not a new column).
2. **Mobile cards** — trip number + title + status badge; driver / route / planned start; Open action — mirrors production cards.
3. **Status chips** — replace MatButtonToggleGroup visually; same semantics (`''` + five statuses).
4. **Create / Open** — toast stubs to `/admin/trips/new` and `/admin/trips/:id` (detail pack is separate).
5. **Pager** — production sizes 5/10/25/50; demo filters/pages the in-memory list.
6. **Shell** — unchanged approved chrome. Default role **`admin`** (also valid for **manager**).
7. **States** — list / empty / loading / failed via demo bar or `?state=`.

## How to open

```bash
cd /workspace/geosun-admin-trips-material-dev
python3 -m http.server 8776
# → http://localhost:8776/?lang=uk&theme=azure-blue&role=admin
```

### Query params

| Param | Values | Notes |
|-------|--------|-------|
| `theme` | `azure-blue` · `rose-red` · `magenta-violet` · `cyan-orange` | `localStorage` `geosun-app-theme` |
| `lang` | `uk` · `en` · `ru` | `geosun-app-lang` |
| `role` | `admin` · `manager` · `driver` · `user` | Default `admin`. Other roles without this nav item fall back to the first allowed route |
| `page` | `admin/trips` (default) or other nav routes | Active nav; non-list = stub |
| `state` | `list` · `empty` · `loading` · `failed` | Demo list states |
| `status` | `all` or `DRAFT` / `PLANNED` / `IN_PROGRESS` / `COMPLETED` / `CANCELLED` | Initial status chip |
| `pageSize` | `5` · `10` · `25` · `50` | Initial page size |
| `hideDemo` | `1` | Hides role/state switcher |

## Files

| File | Purpose |
|------|---------|
| `index.html` | App shell + redesigned `/admin/trips` body |
| `shell.css` | Approved shell styles (copied) |
| `admin-trips.css` | Hero / chips / table / cards / pager / status tones |
| `shell.js` | Theme/lang/nav/drawer (defaults: page=`admin/trips`, role=`admin`) |
| `admin-trips.js` | Demo `TripContractDto` rows, status filter, table + cards |
| `i18n.js` | Real `pages.adminTrips.*` / shell keys + prototype hints |
| `GeoSun_logo_svg.svg` | Brand logo |
| `preview-admin-trips-desktop.png` | Desktop 1280×800, azure-blue, uk, admin |
| `preview-admin-trips-mobile.png` | Mobile 390×844 |
| `preview-admin-trips-desktop-magenta.png` | Desktop, magenta-violet (optional) |
| `preview-admin-trips-empty-desktop.png` | Empty state (optional) |
| `README.md` | This file |
| `CURSOR-PROMPT.md` | Angular port prompt |

Zip: `/workspace/geosun-admin-trips-material-dev.zip`

## Screenshots

- `preview-admin-trips-desktop.png` — 1280×800
- `preview-admin-trips-mobile.png` — 390×844
- `preview-admin-trips-desktop-magenta.png` — dark theme check
- `preview-admin-trips-empty-desktop.png` — empty list

## Prototype-only i18n

Not in production `pages.adminTrips` (hints / pager / stubs). Add them or inline on port:

`filterHint`, `redesignNote`, `demoState`, `resultsCount`, `filterEmpty`, `emptyBody`, `loadingHint`, `pageSize`, `prevPage`, `nextPage`, `openStub`, `createStub`, `notSet`, `expenseChip`.
