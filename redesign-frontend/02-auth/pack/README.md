# GeoSun TMS — Auth pages · Material Angular Dev aesthetic

High-fidelity HTML prototype for **Register**, **Forgot password**, **Verify email**, and **Reset password** (plus navigable **Login**), reusing the approved **AuthShell** from `geosun-login-material-dev`.

Visual language matches the approved login prototype:

- **4 Material 3 themes** (`azure-blue`, `rose-red`, `magenta-violet`, `cyan-orange`)
- **uk / en / ru** i18n (exact keys from `tms-geosun-v3` `frontend-angular/src/assets/i18n/*.json`)
- Soft tonal banners (not solid error fills)
- Desktop split ≥960 · mobile brand strip + rounded sheet ≤959

## How to open

```bash
cd /workspace/geosun-auth-pages-material-dev
python3 -m http.server 8770
# → http://localhost:8770/?page=register&lang=uk&theme=azure-blue
```

Or open `index.html` via `file://` (hash routing still works).

### Routing

| URL | Angular route analogue |
|-----|------------------------|
| `?page=login` / `#login` | `/login` |
| `?page=register` / `#register` | `/register` |
| `?page=forgot` / `#forgot-password` | `/forgot-password` |
| `?page=verify` / `#verify-email` | `/verify-email` |
| `?page=verify&status=loading\|success\|invalid\|error` | verify status views |
| `?page=reset` / `#reset-password` | `/reset-password` |
| `?page=reset&status=form\|resolving\|missing\|invalid\|generic\|success` | reset token / result views |

Also: `?theme=…`, `?lang=uk|en|ru`, `?hideDemo=1`, `?error=409|429|success|…` (page-specific).

Persistence: `localStorage` `geosun-auth-theme`, `geosun-auth-lang` (falls back to login prototype keys).

## Files

| File | Purpose |
|------|---------|
| `index.html` | SPA AuthShell + login / register / forgot / verify / reset |
| `shell.css` | Shared M3 shell styles (copied/adapted from login prototype) |
| `shell.js` | Theme/lang chrome, hash/query routing, form demos |
| `i18n.js` | Embedded uk/en/ru strings for pages.* + auth.* |
| `GeoSun_logo_svg.svg` | Brand logo |
| `preview-register-desktop.png` | Desktop 1280×800 register, azure-blue, uk |
| `preview-forgot-desktop.png` | Desktop forgot, azure-blue, uk |
| `preview-verify-success-desktop.png` | Desktop verify success |
| `preview-verify-loading-desktop.png` | Desktop verify loading |
| `preview-register-mobile.png` | Mobile 390×844 register |
| `preview-forgot-mobile.png` | Mobile forgot |
| `preview-verify-success-mobile.png` | Mobile verify success |
| `preview-register-desktop-magenta.png` | Desktop register, magenta-violet |
| `preview-reset-desktop.png` | Desktop 1280×800 reset form, azure-blue, uk |
| `preview-reset-mobile.png` | Mobile 390×844 reset form |
| `preview-reset-invalid-desktop.png` | Desktop invalid/expired token |
| `preview-reset-success-desktop.png` | Desktop success banner on the form |
| `README.md` | This file |
| `CURSOR-PROMPT.md` | Angular port prompt for Cursor Agent |

Zip: `/workspace/geosun-auth-pages-material-dev.zip`

## Pages

### Register (`pages.register.*`)

- Fields: email, password, confirmPassword, showPassword checkbox
- CTA submit; footer `haveAccount` + `auth.login`
- Soft banners: success, error409, error429, errorGeneric
- Demo emails: `exists@demo.com` → 409, `rate@demo.com` → 429

### Forgot password (`pages.forgotPassword.*`)

- Email + submit + `backToLogin`
- Banners: success, 429, account_disabled, user_deleted, email_not_verified, generic
- Demo emails: `rate@` / `disabled@` / `deleted@` / `unverified@demo.com`

### Verify email (`pages.verifyEmail.*`)

- Status views: loading (spinner + mail icon), success / invalid / error (soft banners)
- Always CTA `toLogin`
- Prototype status tabs (hidden with `?hideDemo=1`)

### Login (included for shell navigation)

Same visual language as the approved login-only prototype; links to register / forgot.

### Reset password (`pages.resetPassword.*`)

Route analogue: `/reset-password` (`guestGuard` + `authAvailabilityGuard`). Token comes from `?token=` in Angular; this prototype simulates the resolved states.

- **form** (default): locked account email (Angular keeps the field editable-looking but blocks input so Chrome can store the username), new password, confirm password, **showPassword checkbox**, submit, `backToLogin` → login
- Client hints: `passwordRequired`, `passwordMinLength`, `passwordRule`, `passwordMismatch`
- Soft banners on the form: `success`, `errorInvalid` (HTTP 400 while email is known), `error429`, `errorGeneric`
- **resolving**: spinner + `resolvingAccount` while `getPasswordResetInfo` runs
- **missing**: no token — `missingToken` + `requestAgain` → forgot-password
- **invalid**: token rejected before email is known — `errorInvalid` + `requestAgain`
- **generic** (no email): lookup failed — `errorGeneric` + `backToLogin`
- Demo password `rate1234a` → 429; `badlink1a` → invalid on the form; other valid pair → success banner
- Angular calls `router.navigate(['/login'])` immediately after a successful reset. The prototype **keeps** the success banner so the state can be reviewed (`?status=success` or `?error=success`)

## Themes ↔ Angular

| Prototype `data-theme` | Angular class |
|------------------------|---------------|
| `azure-blue` | `.theme-azure-blue` |
| `rose-red` | `.theme-rose-red` |
| `magenta-violet` | `.theme-magenta-violet` |
| `cyan-orange` | `.theme-cyan-orange` |

Demo chrome (theme menu + lang dropdown) sits on the **colored brand panel** (desktop: top-right of the left panel; mobile: top-right of the brand strip, beside the logo) — not on the white form sheet. For the static prototype only; production auth pages should consume app `ThemeService` / ngx-translate and may omit these pickers.

Preview screenshots include `preview-login-desktop-chrome.png`, `preview-login-mobile-chrome.png`, and `preview-chrome-theme-menu-desktop.png` (theme menu open).

## Soft banners

```scss
.banner--error {
  background: var(--mat-sys-error-container);
  color: var(--mat-sys-on-error-container);
}
.banner--success {
  background: var(--mat-sys-primary-container);
  color: var(--mat-sys-on-primary-container);
}
```

## Angular port

See **`CURSOR-PROMPT.md`** — port AuthShell + these pages (including reset-password) into `frontend-angular`, keep AuthService logic, TranslateModule, soft banners, no `::ng-deep`, theme classes `theme-*`.
