# GeoSun TMS — `/main` home dashboard · Material Angular Dev aesthetic

High-fidelity HTML prototype for the **post-login home / dashboard** (`/main` · `MainComponent`), framed inside the **approved App shell** from `geosun-app-shell-material-dev/` (permanent sidenav + toolbar, 4 M3 themes, uk/en/ru).

> **One page only.** Shell chrome is reused unchanged in spirit; other nav targets stay stub panels. No Angular edits in this pack.

## What production `/main` shows today

Source: `frontend-angular/src/app/pages/main/`

| Element | i18n / logic |
|---------|----------------|
| Page title | `pages.main.title` |
| Welcome line | `pages.main.welcome` |
| Signed-in email | `pages.main.signedInAs` + `AuthService.user.email` |
| Manager banner | `pages.main.managerSection` if `hasAnyRole(['admin','manager'])` |
| Admin banner | `pages.main.adminSection` if `hasAnyRole(['admin'])` |

No KPI widgets, no quick links, no empty-state panel in the live template. SCSS is only a `.main-content` width + `h1` size.

**Unused but present in i18n** (wired into prototype quick actions):

- `pages.main.freightCalculationLink`
- `pages.main.freightCalculationHereLink`
- `pages.main.adminRouteRequestsLink`

Empty-state strings for related modules (`pages.adminRouteRequests.empty`, `pages.myTrips.empty`, `pages.routes.empty`) are reused for the activity panel.

## Design choices (prototype)

1. **Welcome hero** — soft tonal surface; maps 1:1 to MainComponent copy + role chips.
2. **Role-aware KPI strip** — demo numbers; cards navigate to real routes the role can open (admin queue/trips/fleet/users · manager similar · driver my-trips · user routes/freight/new-route).
3. **Quick actions** — tiles labeled with real `navigation.*` / `pages.main.*Link` keys.
4. **Activity empty state** — soft empty panel with module empty copy + CTA into the primary role destination.
5. **Shell unchanged** — same sidenav sections, toolbar theme/lang/user, mobile drawer, demo role switcher.

## How to open

```bash
cd /workspace/geosun-main-material-dev
python3 -m http.server 8772
# → http://localhost:8772/?lang=uk&theme=azure-blue&role=admin
```

### Query params

| Param | Values | Notes |
|-------|--------|-------|
| `theme` | `azure-blue` · `rose-red` · `magenta-violet` · `cyan-orange` | `localStorage` `geosun-app-theme` |
| `lang` | `uk` · `en` · `ru` | `geosun-app-lang` |
| `role` | `admin` · `manager` · `driver` · `user` | Filters nav + main widgets |
| `page` | `main` (default) or other nav routes | Active nav; non-main = stub |
| `hideDemo` | `1` | Hides role switcher |

## Files

| File | Purpose |
|------|---------|
| `index.html` | App shell + redesigned `/main` body |
| `shell.css` | Approved shell styles (copied) |
| `main.css` | Dashboard hero / KPI / quick / empty |
| `shell.js` | Theme/lang/nav/drawer (+ `getRole` / `t`) |
| `main.js` | Role-aware KPI, quick actions, activity |
| `i18n.js` | Real keys + prototype `pages.main.*` headings |
| `GeoSun_logo_svg.svg` | Brand logo |
| `preview-main-desktop.png` | Desktop 1280×800, azure-blue, uk, admin |
| `preview-main-mobile.png` | Mobile 390×844 |
| `preview-main-desktop-magenta.png` | Desktop, magenta-violet (optional theme check) |
| `README.md` | This file |
| `CURSOR-PROMPT.md` | Angular port prompt |

Zip: `/workspace/geosun-main-material-dev.zip`

## Screenshots

- `preview-main-desktop.png` — 1280×800
- `preview-main-mobile.png` — 390×844
- `preview-main-desktop-magenta.png` — second theme

## Prototype-only i18n

These keys are **not** in production `pages.main` yet (headings / hints / notes). Prefer adding them or inlining on port:

`overviewHeading`, `overviewHint`, `quickActionsHeading`, `quickActionsHint`, `activityHeading`, `activityHint`, `activityEmptyBody`, `activityEmptyBodyDriver`, `activityEmptyBodyUser`, `kpiUsersHint`, `kpiDriversHint`, `kpiMyTripsHint`, `kpiProfileHint`, `kpiNewRouteHint`, `redesignNote`, plus existing shell card hints (`cardRoutesHint`, …).
