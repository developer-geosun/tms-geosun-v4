# Cursor IDE Agent prompt — port GeoSun AppShell (sidenav + toolbar)

Copy everything below the line into Cursor Agent chat in the GeoSun Angular repo.

---

## Task

Implement the approved **App shell** UI from the HTML prototype (`geosun-app-shell-material-dev/`) into Angular `frontend-angular`:

- Authenticated layout: **permanent sidenav (desktop)** + **temporary drawer (mobile)** + **top toolbar** + **`<router-outlet>`**
- Visual language must match the approved AuthShell / Material 3 themes already used for login/auth pages

Reference: open prototype `index.html` and screenshots:

- `preview-shell-desktop.png` (1280×800, azure-blue, uk)
- `preview-shell-mobile.png` (390×844, drawer closed)
- `preview-shell-mobile-drawer.png` (drawer open)
- `preview-shell-desktop-magenta.png` (dark theme check)

## Hard constraints

1. **Do not invent modules.** Nav items must come from existing `ToolbarComponent.navigationItems` (routes + `labelKey` + `roles`). Icons may be completed where missing (see prototype README table) — keep keys/routes identical.
2. **Keep AuthService role checks** (`hasAnyRole` / `canAccess`) — filter sidenav the same way the toolbar filters today.
3. **Use ngx-translate** with existing keys: `navigation.*`, `pages.routeBuilder.newRoute`, `pages.main.*`, `settings.*`, `auth.logout`, `auth.login`.
4. **Themes** — consume existing `theme-azure-blue` | `theme-rose-red` | `theme-magenta-violet` | `theme-cyan-orange` via `--mat-sys-*`. Theme + language chrome belongs in **app toolbar** (not auth brand panel).
5. **No `::ng-deep`.** Component SCSS + tokens / host classes only.
6. **Do not redesign page bodies** in this task — only shell framing. Main outlet can keep current `MainComponent` content (or minimal cards if already approved).
7. **Do not edit auth pages** as part of this shell task.

## Suggested structure

```
src/app/layout/
  app-shell/          # or rename existing root layout
    app-shell.component.ts|html|scss
  sidenav/            # nav list from navigationItems
  toolbar/            # restyle: title + theme + lang + user menu
  footer/             # decide: keep minimal or fold into user menu (ask if unclear)
```

Routes under `authGuard` should render inside the shell outlet. Guest auth routes stay outside the shell (AuthShell).

## Layout breakpoints

- **≥960px**: permanent expanded sidenav (~280px) + toolbar + content
- **≤959px**: hamburger → MatSidenav `mode="over"` (or equivalent temporary drawer) + scrim

## Toolbar

- Page title (from active route / translate)
- Theme menu (Material.dev-style radio list with previews — same 4 themes)
- Language dropdown (uk / en / ru)
- User menu: avatar initials, email, Profile → `/profile`, Logout

## Acceptance

- Desktop + mobile match screenshots in spirit (tokens, density, sidenav active state)
- All four themes recolor shell surfaces
- Role switch (admin/manager/driver/user) shows/hides the same items as today
- No new routes invented beyond existing `app.routes.ts`
