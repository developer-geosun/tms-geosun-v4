# Cursor IDE Agent prompt — port GeoSun `/admin/route-requests`

Copy everything below the line into Cursor Agent chat in the GeoSun Angular repo.

---

## Task

Implement the approved **`/admin/route-requests`** UI from the HTML prototype (`geosun-admin-route-requests-material-dev/`) into Angular `frontend-angular` **`AdminRouteRequestsComponent`**, inside the approved **App shell** (sidenav + toolbar).

Reference screenshots:

- `preview-admin-rr-desktop.png` (1280×800, azure-blue, uk, admin)
- `preview-admin-rr-mobile.png` (390×844)
- `preview-admin-rr-desktop-magenta.png` (dark theme check)
- `preview-admin-rr-empty-desktop.png` (empty state)

Open `index.html` with `?role=admin|manager&state=list|empty|loading|failed` to compare states.

## Hard constraints

1. **Do not redesign other pages.** Keep existing APIs: `getAdminRouteRequests`, `getAdminRouteRequestOwnerEmails`, `getAdminRouteRequestById`, quotes / NBU / country-breakdown endpoints.
2. **Keep production filters and paging.** Dialog (or equivalent) fields: `status`, `createdFrom`, `createdTo`, `ownerEmail`, `routeTitle`, `sort`, `order`. Page sizes 5/10/20/50; desktop default 20, handset default 5. `filtersActive` still drives filled vs stroked Filter button.
3. **Layout change:** replace the master–detail card list with **desktop MatTable (or equivalent) + mobile cards**, matching the prototype. Details / NBU / quote editor can stay as a **side panel / drawer** (or keep the existing right column on large screens) — do not drop NBU, map, or quote flows.
4. **Use ngx-translate.** Existing keys under `pages.adminRouteRequests.*`, `navigation.adminRouteRequests`. Prefer translated status chips via `pages.myFreightRequests.requestStatus.*` (or add admin-specific status keys) instead of raw status strings in the list.
5. **Add only missing column/hint keys** listed in the prototype README, or hardcode column headers temporarily.
6. **Roles** remain **admin** and **manager** via existing `navigationItems` gating.
7. **Owner column** binds `requesterEmail`; filter param stays `ownerEmail`.
8. **Quote amount on list** — keep `cardQuoteAmount` rule (`status === 'quoted'` + finite amount + currency).
9. **Themes / shell** — content only inside the outlet; no sidenav/toolbar reimplementation. No `::ng-deep`. M3 tokens (`--mat-sys-*`).

## Suggested structure

```
src/app/pages/admin-route-requests/
  admin-route-requests.component.ts|html|scss
  filter-route-requests-dialog.*   # keep
  send-proposal-dialog.*           # keep
  # optional: request-table / request-card presenters
```

Keep signals (`requests`, `pageIndex`, `pageSize`, `filtersActive`, `selectedRequestId`, quote/NBU state) and existing dialogs. Swap the list presentation to table + cards.

## Acceptance

- Desktop + mobile match the screenshots in spirit (tokens, density, status color groups)
- All four themes recolor the page inside the shell
- uk / en / ru use existing admin route-request strings
- Empty, loading, and failed states still work
- Filter dialog + pager + quote/NBU/actions still call the same APIs
