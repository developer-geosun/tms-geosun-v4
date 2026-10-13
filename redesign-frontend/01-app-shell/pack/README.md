# GeoSun TMS — App shell · Material Angular Dev aesthetic

High-fidelity HTML prototype for the **post-login App shell** (permanent sidenav + top toolbar + content outlet), matching the Material 3 / AuthShell visual language from `geosun-auth-pages-material-dev/`.

> **Note vs production Angular today:** `frontend-angular` currently uses a **top toolbar** with inline/overflow nav buttons + footer — **no sidenav**. This prototype proposes an M3 **navigation drawer** shell for authenticated routes. Menu labels and routes come from the real `ToolbarComponent.navigationItems` + i18n keys.

## How to open

```bash
cd /workspace/geosun-app-shell-material-dev
python3 -m http.server 8771
# → http://localhost:8771/?lang=uk&theme=azure-blue&role=admin
```

### Query params

| Param | Values | Notes |
|-------|--------|-------|
| `theme` | `azure-blue` · `rose-red` · `magenta-violet` · `cyan-orange` | Persists to `localStorage` `geosun-app-theme` |
| `lang` | `uk` · `en` · `ru` | Persists to `geosun-app-lang` |
| `role` | `admin` · `manager` · `driver` · `user` | Filters nav like Angular `canAccess` |
| `page` | route id e.g. `main`, `profile`, `admin/trips` | Active nav + toolbar title |
| `hideDemo` | `1` | Hides prototype role switcher |

## Layout

| Viewport | Behavior |
|----------|----------|
| **Desktop ≥960px** | Permanent expanded sidenav (~280px) + sticky toolbar + scrollable content |
| **Mobile ≤959px** | Top bar with hamburger → temporary drawer + scrim |

### Toolbar chrome (production location)

Theme picker (Material.dev-style menu) + language dropdown + user menu (avatar / email / profile / logout stub) live in the **app toolbar** — same pattern as AuthShell chrome, restyled for surface (not brand panel).

## Menu inventory (from repo)

Source: `frontend-angular/src/app/layout/toolbar/toolbar.component.ts` → `navigationItems`.

| Route | i18n key | Roles | Icon (prototype) |
|-------|----------|-------|------------------|
| `/main` | `navigation.main` | admin, manager, driver, user | `home` |
| `/profile` | `navigation.profile` | all | `person` |
| `/route-builder` | `pages.routeBuilder.newRoute` | user | `add` |
| `/routes` | `navigation.routes` | user | `route` |
| `/my-freight-requests` | `navigation.myFreightRequests` | user | `local_shipping` |
| `/admin/route-requests` | `navigation.adminRouteRequests` | admin, manager | `inbox` |
| `/admin/currencies` | `navigation.adminCurrencies` | admin, manager | `payments` |
| `/admin/country-reference` | `navigation.adminCountryReference` | admin, manager | `public` |
| `/admin/document-types` | `navigation.adminDocumentTypes` | admin | `description` |
| `/admin/freight-numeric-scenarios` | `navigation.adminFreightNumericScenarios` | admin, manager | `analytics` |
| `/admin/toll-tariff-sets` | `navigation.adminTollTariffSets` | admin, manager | `toll` |
| `/admin/vehicles` | `navigation.adminVehicles` | admin, manager | `directions_car` |
| `/admin/drivers` | `navigation.adminDrivers` | admin, manager | `badge` |
| `/admin/vehicle-combinations` | `navigation.adminVehicleCombinations` | admin, manager | `airport_shuttle` |
| `/admin/trips` | `navigation.adminTrips` | admin, manager | `map` |
| `/my-trips` | `navigation.myTrips` | admin, manager, driver | `explore` |
| `/admin/chatbots` | `navigation.adminChatbots` | admin, manager | `smart_toy` |
| `/admin/users` | `navigation.adminUsers` | admin, manager | `group` |
| `/admin/file-storage-test` | `navigation.adminFileStorageTest` | admin | `folder` |

Sidenav sections (prototype grouping only — not in Angular): Overview · User · Operations · References · System.

Authenticated area also has `/stop-service` and `/404` (not in toolbar menu — omitted).

## Files

| File | Purpose |
|------|---------|
| `index.html` | App shell SPA |
| `shell.css` | M3 themes + sidenav / toolbar / drawer / cards |
| `shell.js` | Theme/lang/user chrome, role filter, drawer, routing stub |
| `i18n.js` | uk/en/ru strings from real `navigation.*` / `pages.main.*` / `settings.*` |
| `GeoSun_logo_svg.svg` | Brand logo |
| `preview-shell-desktop.png` | Desktop 1280×800, azure-blue, uk, admin |
| `preview-shell-mobile.png` | Mobile 390×844, drawer closed |
| `preview-shell-mobile-drawer.png` | Mobile, drawer open |
| `preview-shell-desktop-magenta.png` | Desktop, magenta-violet |
| `README.md` | This file |
| `CURSOR-PROMPT.md` | Angular port prompt |

Zip: `/workspace/geosun-app-shell-material-dev.zip`

## Content outlet

Main page shows placeholder **dashboard cards** (Routes / Freight / Fleet / Queue) to demonstrate shell framing only — **not** a dashboard redesign. Other nav targets open a simple stub panel with the translated title.

## Design notes for approval

1. **Sidenav vs current toolbar nav** — intentional redesign proposal; keep Angular role gating and i18n keys.
2. **Brand** — GeoSun logo disc + wordmark + TMS in drawer header (aligned with AuthShell brand row).
3. **Active item** — M3 tonal pill (`secondary-container` / `on-secondary-container`), filled icon.
4. **Icons** — where Angular `navigationItems` had no `icon`, prototype assigns Material Symbols (table above); confirm or drop before port.
5. **Footer** — production footer omitted from shell framing (user/role moved to user menu); call out if footer must stay.
6. **Theme/lang** — in toolbar for authenticated shell (AuthShell chrome stays on guest brand panel only).
