# GeoSun TMS — `/profile` · Material Angular Dev aesthetic

High-fidelity HTML prototype for the **user profile** (`/profile` · `ProfileComponent`), framed inside the **approved App shell** from `geosun-app-shell-material-dev/` (permanent sidenav + toolbar, 4 M3 themes, uk/en/ru).

> **One page only.** Shell chrome is reused; other nav targets stay stub panels. No Angular edits in this pack.

## What production `/profile` shows today

Source: `frontend-angular/src/app/pages/profile/` (`profile.component.ts|html|scss` + `telegram-link-dialog.component.*`)

Production layout: **one outlined `mat-card`** with close in the header, **two columns** (identity / person type / channels | phones), sticky card actions Cancel + Save. Handset stacks columns.

| Area | Fields / actions | i18n |
|------|------------------|------|
| Loading / error | Spinner text · Retry | `pages.profile.loading` · `loadFailed` · `retry` |
| Card title + close | Close → `/main` (confirm if dirty) | `title` · `close` · `closeUnsavedConfirm` |
| Identity | `lastName`* · `firstName`* · `patronymic` (max 128, name sanitize) | `sectionIdentity` · field labels |
| Person type | Radio `INDIVIDUAL` · `LEGAL_ENTITY_REPRESENTATIVE` | `sectionPersonType` · `personTypeIndividual` · `personTypeLegal` |
| EDRPOU | Always visible; enabled only for legal; 8/10 digits | `edrpou` · `edrpouHint` · `edrpouDisabledHint` |
| Preferred channels | `EMAIL` (with email) · `PHONE` · `MESSENGERS`; phone/messengers disabled with no phones; admin hint | `sectionChannels` · `channel*` · `adminNotifyChannelsHint` · `channelsRequired` |
| Phones (≤5) | Add / remove (confirm) · number · primary radio · verified pill · Telegram / WhatsApp / Viber checkboxes | `sectionPhones` · `addPhone` · `removePhone*` · `phonesEmpty` · `primaryPhone` · `phoneVerified` / `phoneNotVerified` |
| Telegram | Link / unlink on the Telegram-marked (or primary) phone; dialog with code, copy, open bot, TTL | `pages.profile.telegram.*` |
| Footer | Discard changes · Save (disabled unless dirty) | `cancel` · `save` · `saveSuccess` / `saveFailed` / `errors.*` |

API: `UserProfileApiService.getMine` / `putMine`; Telegram via `ChatbotApiService` (`createLinkCode`, `listMyIdentities`, `unlink`). Roles: all authenticated users; admin-only string is the notify-channels hint.

Unused-in-template but present in i18n (shown in prototype hero / banner): `subtitle`, `incompleteBanner`, `openProfile`, `sectionData`, `telegram.title|hint|phoneVerified`.

## Design choices (prototype)

1. **Hero header** — avatar initials, `title` + `subtitle`, email, role chip, dirty badge, close — replaces the single-card header chrome while keeping close behaviour.
2. **Section cards** — Identity, Person type, Channels, Phones as separate M3 surface cards in a responsive 2-column grid (phones column wider on desktop), instead of nested sections inside one card.
3. **Sticky footer bar** — Cancel / Save + hint; same dirty gating as production.
4. **Telegram dialog** — modal prototype matching `TelegramLinkDialogComponent` strings/actions.
5. **Demo states** — filled · empty phones · legal entity · loading · failed (`?state=`).
6. **Shell unchanged** — sidenav, toolbar theme/lang/user, mobile drawer, role switcher. Default role **admin** (all roles can open `/profile`).

## How to open

```bash
cd /workspace/geosun-profile-material-dev
python3 -m http.server 8775
# → http://localhost:8775/?lang=uk&theme=azure-blue&role=admin
```

### Query params

| Param | Values | Notes |
|-------|--------|-------|
| `theme` | `azure-blue` · `rose-red` · `magenta-violet` · `cyan-orange` | `localStorage` `geosun-app-theme` |
| `lang` | `uk` · `en` · `ru` | `geosun-app-lang` |
| `role` | `admin` · `manager` · `driver` · `user` | Filters nav; admin shows notify-channels hint |
| `page` | `profile` (default) or other nav routes | Active nav; non-profile = stub |
| `state` | `filled` · `emptyPhones` · `legal` · `loading` · `failed` | Demo profile states |
| `hideDemo` | `1` | Hides role/state switcher |

## Files

| File | Purpose |
|------|---------|
| `index.html` | App shell + redesigned `/profile` body |
| `shell.css` | Approved shell styles (copied) |
| `profile.css` | Hero / cards / phones / footer / dialog / states |
| `shell.js` | Theme/lang/nav/drawer (defaults: page=`profile`, role=`admin`) |
| `profile.js` | Demo profile data, form dirty, phones, Telegram dialog |
| `i18n.js` | Real `pages.profile.*` + shell keys + prototype hints |
| `GeoSun_logo_svg.svg` | Brand logo |
| `preview-profile-desktop.png` | Desktop 1280×800, azure-blue, uk, admin |
| `preview-profile-mobile.png` | Mobile 390×844 |
| `preview-profile-desktop-magenta.png` | Desktop, magenta-violet |
| `README.md` | This file |
| `CURSOR-PROMPT.md` | Angular port prompt |

Zip: `/workspace/geosun-profile-material-dev.zip`

## Screenshots

- `preview-profile-desktop.png` — 1280×800
- `preview-profile-mobile.png` — 390×844
- `preview-profile-desktop-magenta.png` — second theme

## Prototype-only i18n

Not in production `pages.profile` (section hints / demo chrome). Prefer adding them or inlining on port:

`heroEyebrow`, `sectionIdentityHint`, `sectionPersonTypeHint`, `sectionChannelsHint`, `sectionPhonesHint`, `messengerTelegram`, `messengerWhatsapp`, `messengerViber`, `footerHint`, `redesignNote`, `demoState`, `stateFilled`, `stateEmptyPhones`, `stateLegal`, `stateLoading`, `stateFailed`, `dirtyBadge`, `roleChip`.

Messenger brand names are hard-coded as “Telegram / WhatsApp / Viber” in the Angular template today; the prototype mirrors that with optional keys.
