# GeoSun TMS — `/admin/route-requests` · Material Angular Dev aesthetic

High-fidelity HTML prototype for the **admin freight / route requests queue** (`/admin/route-requests` · `AdminRouteRequestsComponent`), framed inside the **approved App shell** from `geosun-app-shell-material-dev/` (permanent sidenav + toolbar, 4 M3 themes, uk/en/ru).

> **One page only.** Shell chrome is reused; other nav targets stay stub panels. No Angular edits in this pack.

## What production `/admin/route-requests` shows today

Source: `frontend-angular/src/app/pages/admin-route-requests/`
API: `RouteRequestsApiService.getAdminRouteRequests(AdminRouteRequestListParams)` → paged `RouteRequestContractDto[]`.

| Element | Production behavior |
|---------|---------------------|
| Roles | **admin**, **manager** (`navigation.adminRouteRequests`) |
| Page heading | `pages.adminRouteRequests.title` |
| Header actions | Stroked **Refresh**, **Filter** (filled when filters active), **Back to main** |
| Layout | Master–detail: left **request cards** + paginator; right **details** panel |
| List card | Route title (or routeId), raw `status` string, `createdAt`, quote amount when `status === 'quoted'` (`cardQuoteAmount`) |
| Paging | `pageSize` 5 / 10 / 20 / 50; desktop default **20**, handset default **5** |
| Filters (dialog) | `status`, `createdFrom`, `createdTo`, `ownerEmail` (autocomplete from `/owner-emails`), `routeTitle`, `sort` (`createdAt` / `status` / `preferredStartDate`), `order` (`desc` / `asc`) |
| Details | ID, status, preferred start, comment; **NBU cost preview** form + summary; quote **side drawer**; route points + Leaflet map + country distances |
| Quote | Draft form + history; send draft; send proposal dialog (recipient email + message) |
| Empty / error | `pages.adminRouteRequests.empty`, `loadFailed` |
| Owner field on DTO | `requesterEmail` (filter query param still named `ownerEmail`) |

Status options: `new` · `in_review` · `quoted` · `accepted` · `rejected` · `cancelled` · `expired`.

## Design choices (prototype)

1. **Desktop M3 table** — columns: ID, status (translated chip), route title + km, owner email, preferred start, quote amount + quote status, created at, actions (details / quote / open route).
2. **Mobile cards** — closer to production list cards: title + status, id / owner / created / quote amount, quick actions.
3. **Filters from production** — same dialog fields and defaults (`sort=createdAt`, `order=desc`). Status **chips** mirror the filter status for one-tap narrowing (still client-side on the demo set).
4. **Details drawer** — ID, status, route, owner, dates, comment, quote block, shortened NBU stub + Send proposal, route points + country distance table. Full NBU map/cost UI stays out of scope for this queue redesign.
5. **Pager** — same size options as production; demo filters/sorts/pages the in-memory list.
6. **Shell** — unchanged approved chrome. Default role **`admin`** (also valid for **manager**).
7. **States** — list / empty / loading / failed via demo bar or `?state=`.

## How to open

```bash
cd /workspace/geosun-admin-route-requests-material-dev
python3 -m http.server 8775
# → http://localhost:8775/?lang=uk&theme=azure-blue&role=admin
```

### Query params

| Param | Values | Notes |
|-------|--------|-------|
| `theme` | `azure-blue` · `rose-red` · `magenta-violet` · `cyan-orange` | `localStorage` `geosun-app-theme` |
| `lang` | `uk` · `en` · `ru` | `geosun-app-lang` |
| `role` | `admin` · `manager` · `driver` · `user` | Default `admin`. Other roles without this nav item fall back to the first allowed route |
| `page` | `admin/route-requests` (default) or other nav routes | Active nav; non-queue = stub |
| `state` | `list` · `empty` · `loading` · `failed` | Demo list states |
| `status` | `all` or a request status | Initial status chip / filter |
| `pageSize` | `5` · `10` · `20` · `50` | Initial page size |
| `hideDemo` | `1` | Hides role/state switcher |

## Files

| File | Purpose |
|------|---------|
| `index.html` | App shell + redesigned `/admin/route-requests` body + filter dialog + details drawer |
| `shell.css` | Approved shell styles (copied) |
| `admin-rr.css` | Hero / chips / table / cards / dialog / drawer / pager |
| `shell.js` | Theme/lang/nav/drawer (defaults: page=`admin/route-requests`, role=`admin`) |
| `admin-rr.js` | Demo `RouteRequestContractDto` rows, filters, table + cards, details |
| `i18n.js` | Real `pages.adminRouteRequests.*` / shell keys + prototype column headings |
| `GeoSun_logo_svg.svg` | Brand logo |
| `preview-admin-rr-desktop.png` | Desktop 1280×800, azure-blue, uk, admin |
| `preview-admin-rr-mobile.png` | Mobile 390×844 |
| `preview-admin-rr-desktop-magenta.png` | Desktop, magenta-violet (optional) |
| `preview-admin-rr-empty-desktop.png` | Empty state (optional) |
| `README.md` | This file |
| `CURSOR-PROMPT.md` | Angular port prompt |

Zip: `/workspace/geosun-admin-route-requests-material-dev.zip`

## Screenshots

- `preview-admin-rr-desktop.png` — 1280×800
- `preview-admin-rr-mobile.png` — 390×844
- `preview-admin-rr-desktop-magenta.png` — dark theme check
- `preview-admin-rr-empty-desktop.png` — empty list

## Prototype-only i18n

Not in production `pages.adminRouteRequests` (column headers / hints). Add them or inline on port:

`filterHint`, `redesignNote`, `demoState`, `colId`, `colRoute`, `colOwner`, `colQuote`, `colCreated`, `colActions`, `colPreferred`, `resultsCount`, `filterEmpty`, `emptyBody`, `openDetails`, `closeDetails`, `openRoute`, `openRouteStub`, `loadingHint`, `pageSize`, `prevPage`, `nextPage`, `noQuote`, `notSet`, `noComment`, `nbuStub`, `quotePanelStub`.

Status chip labels reuse `pages.myFreightRequests.requestStatus.*` / `quoteStatus.*` (production list currently shows raw status strings). Distance unit: `pages.freightCalculation.km`.
