# Cursor IDE Agent prompt — port GeoSun AuthShell + Register / Forgot / Verify / Reset password

Copy everything below the line into Cursor Agent chat in the GeoSun Angular repo.

---

## Task

Implement the approved **AuthShell** plus **Register**, **Forgot password**, **Verify email**, and **Reset password** UI from the HTML prototype (`geosun-auth-pages-material-dev/`) into Angular:

`frontend-angular/src/app/pages/` (or `frontend/` — use the repo’s real path)

Pages to update/create:

- `register/` (or existing register component)
- `forgot-password/` (or `forgotPassword`)
- `verify-email/` (or `verifyEmail`)
- `reset-password/` (existing `ResetPasswordComponent` — restyle, do not rewrite AuthService)
- Shared `AuthShellComponent` (recommended) used also by login

Reference: open prototype `index.html` with `?page=register|forgot|verify` and screenshots:

- `preview-register-desktop.png` / `preview-register-mobile.png`
- `preview-forgot-desktop.png` / `preview-forgot-mobile.png`
- `preview-verify-success-desktop.png` / `preview-verify-success-mobile.png`
- `preview-reset-desktop.png` / `preview-reset-mobile.png`
- `preview-reset-invalid-desktop.png` (expired/invalid token, no form)
- `preview-register-desktop-magenta.png` (dark theme check)

Login shell was already approved in `geosun-login-material-dev` — **do not redesign** the split layout.

## Hard constraints

1. **Keep AuthService / existing form logic** (ReactiveForms, register / forgot / verify API calls, error codes, loading, success). Do not invent a new auth flow.
2. **Use ngx-translate** with existing keys from `src/assets/i18n/{uk,en,ru}.json`:
   - `pages.register.*` (title, subtitle, email, password, confirmPassword, showPassword, passwordRequired, passwordMinLength, passwordRule, passwordMismatch, submit, loading, success, error409, error429, errorGeneric, haveAccount)
   - `pages.forgotPassword.*` (title, subtitle, email, submit, loading, success, error429, errorAccountDisabled, errorUserDeleted, errorEmailNotVerified, errorGeneric, backToLogin)
   - `pages.verifyEmail.*` (title, subtitle, loading, success, invalid, error, toLogin)
   - `pages.resetPassword.*` (title, subtitle, resolvingAccount, email, password, confirmPassword, showPassword, passwordRequired, passwordMinLength, passwordRule, passwordMismatch, submit, loading, success, missingToken, requestAgain, errorInvalid, error429, errorGeneric, backToLogin)
   - `auth.login`, `auth.register`
   - Login keys if shell wraps login too
3. **Themes** — consume existing body/html classes:
   - `theme-azure-blue`, `theme-rose-red`, `theme-magenta-violet`, `theme-cyan-orange`
   - Source: `src/styles/_theme.scss` + `ThemeService`
   - UI must recolor via `--mat-sys-*` (brand panel, sheet, banners, CTA)
4. **No `::ng-deep`.** Component SCSS + CSS variables / Material tokens / host classes only.
5. **Layout (approved — do not break):**
   - Desktop **≥960px**: brand left (~42%) + form right (~58%)
   - Mobile **≤959px**: compact brand strip + rounded form sheet (`surface-container-lowest`, top radius ~18–20px)
6. **Soft banners** — `error-container` / `on-error-container` and `primary-container` / `on-primary-container` — not solid fills.
7. **Do not ship** prototype theme/lang pickers on production auth pages (theme + language live in app chrome). Demo chrome is prototype-only.

## Suggested structure

```
src/app/shared/auth-shell/   # or auth/
  auth-shell.component.ts|html|scss   # brand + form column + <router-outlet> or ng-content
src/app/pages/login/
src/app/pages/register/
src/app/pages/forgot-password/
src/app/pages/verify-email/
src/app/pages/reset-password/
```

Routes should stay: `/login`, `/register`, `/forgot-password`, `/verify-email`, `/reset-password`.

## Page specifics

### Register

- Fields: email, password, confirmPassword, **showPassword checkbox** (as in current Angular — not only eye toggle)
- Client validation messages from `pages.register.password*` keys
- Map API errors to soft banners: 409 → `error409`, 429 → `error429`, else `errorGeneric`; success → `success`
- Footer: `haveAccount` + link `auth.login` → `/login`

### Forgot password

- Email + submit; link `backToLogin` → `/login`
- Map errors: 429, `account_disabled`, `user_deleted`, `email_not_verified`, generic; success banner uses multi-line `success` string (preserve `\n` / white-space)

### Verify email

- Status from route/query token resolution (existing component logic):
  - loading/idle: spinner + `loading` + subtitle; icon `mail`
  - success: soft success banner + icon `mark_email_read`
  - invalid / error: soft error banners
- Always show CTA `toLogin` → `/login`

### Reset password

Keep existing `ResetPasswordComponent` behaviour (`AuthService.getPasswordResetInfo` + `resetPassword`, query `token`):

- No token → `missingToken` + link `requestAgain` → `/forgot-password` (no form)
- While resolving → spinner + `resolvingAccount`
- HTTP 400 before email is known → `errorInvalid` + `requestAgain` (no form)
- Other lookup failure before email is known → `errorGeneric` + `backToLogin` (no form)
- Otherwise form:
  - Email field filled from reset info, **not user-editable** (keep the Angular trick: not `readonly` if that breaks Chrome username save — block edit events as the component already does)
  - password + confirmPassword, pattern `PASSWORD_PATTERN`, min length 8
  - **showPassword checkbox** toggles both inputs via the `type` property (do not bind `[type]`)
  - Soft banners: 400 → `errorInvalid`, 429 → `error429`, else `errorGeneric`; success → `success`
  - On success the component already navigates to `/login` — keep that
- Footer on the form: `backToLogin` → `/login`

## Brand panel

Same as login prototype: GeoSun logo + wordmark, desktop tagline + 3 value cards (`route`, `payments`, `local_shipping`). Prototype keys `pages.login.brand.*` may still be missing in JSON — add to all 3 locale files or hardcode with TODO.

## Styling

- Inter, M3 radii 12/16, Inter already app font
- Mobile: `100dvh`, `env(safe-area-inset-*)`, input 16px, touch ≥44px
- Prefer `mat-form-field appearance="outline"` where Angular already uses Material form fields

## Out of scope

- Do not clone this HTML into the Angular build as static assets for production UI
- Do not copy demo emails (`exists@demo.com`, etc.) into production
- Do not rewrite ThemeService / TranslateModule setup
- Do not edit GitHub unless asked — local workspace only

## Acceptance checklist

- [ ] Desktop register/forgot/verify match corresponding `preview-*-desktop.png`
- [ ] Mobile register/forgot/verify-success match `preview-*-mobile.png`
- [ ] Magenta (or any dark theme) updates brand + form + banners
- [ ] uk/en/ru via TranslateModule on all new strings
- [ ] AuthService error mapping unchanged in meaning
- [ ] Zero `::ng-deep`
- [ ] Cross-links `/login` ↔ `/register` ↔ `/forgot-password` work; verify CTA to login; reset `requestAgain` → forgot, `backToLogin` → login
- [ ] Reset desktop/mobile match `preview-reset-desktop.png` / `preview-reset-mobile.png`; invalid token matches `preview-reset-invalid-desktop.png`
