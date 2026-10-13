# GeoSun TMS — `/admin/drivers` · Material Angular Dev aesthetic

High-fidelity HTML prototype framed inside the **approved App shell** from `geosun-app-shell-material-dev/` (permanent sidenav + toolbar, 4 M3 themes, uk/en/ru).

> Shell chrome is reused; other nav targets stay stub panels. No Angular edits in this pack.

## What production shows

Source: `frontend-angular/src/app/pages/` · repo `developer-geosun/tms-geosun-v4`.

**Design note:** Drivers list: full name, phone, license + categories/expiry, linked user email, document compliance.

Roles: `admin`.

## How to open

```bash
cd /workspace/geosun-admin-drivers-material-dev
python3 -m http.server 8780
# → http://localhost:8780/?lang=uk&theme=azure-blue&role=admin&hideDemo=1
```

### Query params

| Param | Values |
|-------|--------|
| `theme` | azure-blue · rose-red · magenta-violet · cyan-orange |
| `lang` | uk · en · ru |
| `role` | admin · manager · driver · user |
| `state` | list · empty · loading · failed (where applicable) |
| `mode` | create · edit (trip detail only) |
| `hideDemo` | `1` |

## Files

| File | Purpose |
|------|---------|
| `index.html` | App shell + page body |
| `shell.css` / `shell.js` | Approved shell |
| `page-kit.css` | Shared M3 list/form kit |
| `page.css` / `page.js` | Page-specific |
| `i18n.js` | Production keys + shell/proto |
| `preview-*-desktop.png` | 1280×800 azure-blue uk |
| `preview-*-mobile.png` | 390×844 |
| `CURSOR-PROMPT.md` | Angular port prompt |

Zip: `/workspace/geosun-admin-drivers-material-dev.zip`
