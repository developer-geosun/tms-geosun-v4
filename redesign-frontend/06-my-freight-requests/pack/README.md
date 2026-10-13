# GeoSun TMS — `/my-freight-requests` · Material Angular Dev aesthetic

High-fidelity HTML prototype for **my freight calculation requests** (`/my-freight-requests` · `MyFreightRequestsComponent`), framed inside the **approved App shell** from `geosun-app-shell-material-dev/` (permanent sidenav + toolbar, 4 M3 themes, uk/en/ru).

> **One page only.** Shell chrome is reused; other nav targets stay stub panels. No Angular edits in this pack.

## What production `/my-freight-requests` shows today

Source: `frontend-angular/src/app/pages/my-freight-requests/`
API: `RouteRequestsApiService.getMyRouteRequests()` → `RouteRequestContractDto[]` (no paging, no query filters). Client sort: `createdAt` descending.

| Element | Production behavior |
|---------|---------------------|
| Page heading | `pages.myFreightRequests.title` |
| Toolbar nav label | `navigation.myFreightRequests` (shorter than the page title) |
| Header action | Stroked **Refresh** (`pages.myFreightRequests.refresh`) — reloads the list |
| Loading | Spinner + `pages.myFreightRequests.loading` |
| Load failed | `pages.myFreightRequests.loadFailed` |
| Empty | `pages.myFreightRequests.empty` |
| Card header | Request ID + status chip |
| Request status | `new` · `in_review` · `quoted` · `accepted` · `rejected` · `cancelled` · `expired` (`requestStatus.*`) |
| Meta | Submitted at, last update, preferred start date (or `notSet`), comment (or `noComment`) |
| Quote | Current quote **or** `noQuote`. Quote fields: status (`draft/sent/superseded/accepted/rejected/expired`), amount + currency, transit days min—max, valid until, public note |
| Route | Route ID, distance by country (along-route order), route title + km, **Open route** → `/route-builder?routeId&mode=view`, expandable route points (address, country, border) |
| Filters | **None** on this page. Status / date / owner / title filters exist only on admin `/admin/route-requests` |
| Layout | Single column of outlined `mat-card`s. **No data table** |

Chip tones in production SCSS: `new` / `in_review` primary mix; `quoted` / `accepted` tertiary mix; `rejected` / `cancelled` / `expired` error mix. This shell pack has no `--mat-sys-tertiary` token, so quoted/accepted use `primary-container` instead.

## Design choices (prototype)

1. **Desktop M3 table** — scan columns: request ID, status, route title + route id, distance, preferred start, quote amount + quote status, submitted at, actions. Row expand keeps every production field (comment, updated at, quote block, country distances, points, open route).
2. **Mobile cards** — closer to production cards: id + status, route, meta, full quote / no-quote copy, open route, expandable country list + points.
3. **Client status chips** (prototype-only) — All + the 7 request statuses. Production does not filter; chips only narrow the same in-memory list. Empty filter uses a prototype string, not the “you have not sent any” empty copy.
4. **Sort stays production** — newest `createdAt` first. No sort control (admin sort keys are not wired on the user endpoint).
5. **Refresh** — stroked pill like production; demo returns to the list state.
6. **Empty / loading / failed** — soft state panels (`?state=` or the demo bar). Empty CTA jumps to `/routes` (where a freight request is actually sent).
7. **Shell unchanged** — same sidenav, toolbar theme/lang/user, mobile drawer. Default role **`user`** (only role with this route).

## How to open

```bash
cd /workspace/geosun-freight-requests-material-dev
python3 -m http.server 8774
# → http://localhost:8774/?lang=uk&theme=azure-blue&role=user
```

### Query params

| Param | Values | Notes |
|-------|--------|-------|
| `theme` | `azure-blue` · `rose-red` · `magenta-violet` · `cyan-orange` | `localStorage` `geosun-app-theme` |
| `lang` | `uk` · `en` · `ru` | `geosun-app-lang` |
| `role` | `admin` · `manager` · `driver` · `user` | Default `user`. Other roles do not have this nav item and fall back to the first allowed route |
| `page` | `my-freight-requests` (default) or other nav routes | Active nav; non-freight = stub |
| `state` | `list` · `empty` · `loading` · `failed` | Demo list states |
| `status` | `all` or a request status | Initial client status chip |
| `hideDemo` | `1` | Hides role/state switcher |

## Files

| File | Purpose |
|------|---------|
| `index.html` | App shell + redesigned `/my-freight-requests` body |
| `shell.css` | Approved shell styles (copied) |
| `freight.css` | Hero / status chips / table / cards / states |
| `shell.js` | Theme/lang/nav/drawer (defaults: page=`my-freight-requests`, role=`user`) |
| `freight.js` | Demo `RouteRequestContractDto` rows, filter, table + cards |
| `i18n.js` | Real `pages.myFreightRequests.*` / shell keys + prototype column headings |
| `GeoSun_logo_svg.svg` | Brand logo |
| `preview-freight-desktop.png` | Desktop 1280×800, azure-blue, uk, user |
| `preview-freight-mobile.png` | Mobile 390×844 |
| `preview-freight-desktop-magenta.png` | Desktop, magenta-violet |
| `preview-freight-empty-desktop.png` | Empty state |
| `README.md` | This file |
| `CURSOR-PROMPT.md` | Angular port prompt |

Zip: `/workspace/geosun-freight-requests-material-dev.zip`

## Screenshots

- `preview-freight-desktop.png` — 1280×800
- `preview-freight-mobile.png` — 390×844
- `preview-freight-desktop-magenta.png` — dark theme
- `preview-freight-empty-desktop.png` — empty list

## Prototype-only i18n

Not in production `pages.myFreightRequests` (column headers / hints). Add them or inline on port:

`colRoute`, `colDistance`, `colQuote`, `colActions`, `filterHint`, `redesignNote`, `demoState`, `loadingHint`, `emptyBody`, `goToRoutes`, `expandDetails`, `collapseDetails`, `filterEmpty`, `resultsCount`, `openRouteStub`.

Borrowed real keys for the status chip “All”, the word “Status”, and “Request details”: `pages.adminRouteRequests.filterAll`, `pages.adminRouteRequests.status`, `pages.adminRouteRequests.details`. Distance unit and border label: `pages.freightCalculation.km`, `pages.freightCalculation.labels.border`.

Production has **no** string at `pages.myFreightRequests.quoteStatus` itself — that key is an object of quote statuses. The status row label in this prototype uses `pages.adminRouteRequests.status`.
