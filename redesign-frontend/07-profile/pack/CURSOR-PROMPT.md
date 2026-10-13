# Cursor IDE Agent prompt — port GeoSun `/profile`

Copy everything below the line into Cursor Agent chat in the GeoSun Angular repo.

---

## Task

Implement the approved **`/profile`** UI from the HTML prototype (`geosun-profile-material-dev/`) into Angular `frontend-angular` **`ProfileComponent`** (and keep `TelegramLinkDialogComponent`), inside the approved **App shell** (sidenav + toolbar).

Reference screenshots:

- `preview-profile-desktop.png` (1280×800, azure-blue, uk, admin)
- `preview-profile-mobile.png` (390×844)
- `preview-profile-desktop-magenta.png` (theme check)

Open `index.html` with `?role=admin|manager|driver|user&state=filled|emptyPhones|legal|loading|failed`.

## Hard constraints

1. **Do not redesign other pages** or invent routes. Close still navigates to `/main` with unsaved confirm.
2. **Keep existing APIs and form model.** `UserProfileApiService.getMine` / `putMine`, `ChatbotApiService` link/unlink, same validators, `phones` FormArray (max 5), person-type EDRPOU enable/disable, phone-dependent channel enable/disable, dirty gating on Cancel/Save.
3. **Use ngx-translate.** Prefer existing `pages.profile.*` keys (including `telegram.*` and `errors.*`). Toolbar label stays `navigation.profile`.
4. **Add only missing heading/hint keys** listed in the prototype README (hero eyebrow, section hints, footer hint) — or hardcode via translate JSON. Do not rename production field labels.
5. **Layout change only (content):** tonal hero + section cards grid + sticky footer. Do **not** drop fields, Telegram actions, verified pills, or admin channels hint.
6. **Themes / shell** — content-only inside the outlet; do not re-implement sidenav/toolbar here.
7. **No `::ng-deep`.** Match M3 tokens (`--mat-sys-*`), soft surfaces, tonal hero, pill buttons from `profile.css`.
8. **Telegram dialog** — keep `TelegramLinkDialogComponent`; restyle to match dialog tokens if needed, same keys/actions.

## Suggested structure

```
src/app/pages/profile/
  profile.component.ts|html|scss
  telegram-link-dialog.component.ts|html|scss
```

Keep signals (`isLoading`, `isSaving`, `isDirty`, `loadError`, `telegramIdentity`, `phoneVerifiedById`) and methods (`save`, `reload`, `addPhone`, `removePhone`, `setPrimary`, `startTelegramLink`, `unlinkTelegram`, `close`). Swap the template/SCSS layout to hero + cards.

## Acceptance

- Desktop + mobile match screenshots in spirit (hero, section cards, phones column, sticky actions)
- All four themes recolor via tokens; uk / en / ru use existing profile strings
- Loading / loadFailed / Retry still work
- Dirty Cancel/Save, EDRPOU + channel enable rules, Telegram link/unlink unchanged in behaviour
- No Angular changes to other feature pages in this task
