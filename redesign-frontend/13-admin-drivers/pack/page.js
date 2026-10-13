
(function () {
  const ROWS = [
  {
    "id": 1,
    "fullName": "Іван Петренко",
    "phone": "+380501112233",
    "licenseNumber": "ААА123456",
    "licenseCategories": "C, CE",
    "licenseExpiresOn": "2027-06-15",
    "userEmail": "driver@geosun.demo",
    "docs": "OK",
    "status": "ACTIVE"
  },
  {
    "id": 2,
    "fullName": "Олег Коваль",
    "phone": "+380671234567",
    "licenseNumber": "ВВВ654321",
    "licenseCategories": "C",
    "licenseExpiresOn": "2026-11-01",
    "userEmail": "okoval@geosun.demo",
    "docs": "ATTENTION",
    "status": "ACTIVE"
  },
  {
    "id": 3,
    "fullName": "Сергій Мельник",
    "phone": "+380931112233",
    "licenseNumber": "ССС111222",
    "licenseCategories": "C, CE, D",
    "licenseExpiresOn": "2025-12-20",
    "userEmail": "—",
    "docs": "PROBLEM",
    "status": "ACTIVE"
  },
  {
    "id": 4,
    "fullName": "Андрій Шевчук",
    "phone": "+380441112233",
    "licenseNumber": "DDD333444",
    "licenseCategories": "CE",
    "licenseExpiresOn": "2028-03-10",
    "userEmail": "ashevchuk@geosun.demo",
    "docs": "OK",
    "status": "DELETED"
  }
];
  const COLUMNS = [{"id": "fullName", "key": "pages.adminDrivers.fullName", "label": "ПІБ"}, {"id": "phone", "key": "pages.adminDrivers.phone", "label": "Телефон"}, {"id": "licenseNumber", "key": "pages.adminDrivers.licenseNumber", "label": "Посвідчення"}, {"id": "licenseCategories", "key": "pages.adminDrivers.licenseCategories", "label": "Категорії"}, {"id": "licenseExpiresOn", "key": "pages.adminDrivers.licenseExpiresOn", "label": "Діє до"}, {"id": "userEmail", "key": "pages.adminDrivers.userEmail", "label": "Користувач"}, {"id": "docs", "key": "pages.adminDrivers.documents", "label": "Документи", "type": "status", "statusKeyPrefix": "pages.adminVehicles.compliance."}, {"id": "status", "key": "pages.adminDrivers.status", "label": "Статус", "type": "status", "statusKeyPrefix": "pages.adminDrivers.status"}, {"id": "_a", "key": "proto.actions", "label": "Дії", "type": "actions"}];
  const FILTERS = [{"value": "", "labelKey": "pages.adminDrivers.documentsFilterAll", "label": "Усі"}, {"value": "OK", "labelKey": "pages.adminDrivers.documentsFilterOk", "label": "OK"}, {"value": "ATTENTION", "labelKey": "pages.adminDrivers.documentsFilterAttention", "label": "Attention"}, {"value": "PROBLEM", "labelKey": "pages.adminDrivers.documentsFilterProblem", "label": "Problem"}];
  const statusField = "docs";
  const chipField = "docs";
  let filterVal = "";
  let pageIndex = 0;
  let pageSize = 10;
  let state = "list";

  function t(key) {
    const lang = document.documentElement.getAttribute("lang") || "uk";
    const dict = (window.GEOSUN_I18N && (window.GEOSUN_I18N[lang] || window.GEOSUN_I18N.uk)) || {};
    return dict[key] || key;
  }
  function toast(msg) {
    const el = document.getElementById("gsToast");
    if (!el) return;
    el.textContent = msg;
    el.hidden = false;
    clearTimeout(el._t);
    el._t = setTimeout(() => { el.hidden = true; }, 1800);
  }
  function filtered() {
    let list = ROWS.slice();
    if (filterVal) {
      list = list.filter((r) => String(r[chipField] || "") === filterVal);
    }
    return list;
  }
  function renderChips() {
    const box = document.getElementById("gsChips");
    if (!box || !FILTERS.length) { if (box) box.innerHTML = ""; return; }
    box.innerHTML = FILTERS.map((f) => {
      const active = (f.value === filterVal) || (!filterVal && f.value === "");
      return `<button type="button" class="gs-chip${active ? " is-active" : ""}" data-val="${f.value}" role="radio" aria-checked="${active}">${t(f.labelKey) || f.label}</button>`;
    }).join("");
    box.querySelectorAll(".gs-chip").forEach((btn) => btn.addEventListener("click", () => {
      filterVal = btn.getAttribute("data-val") || "";
      pageIndex = 0;
      render();
    }));
  }
  function statusClass(s) {
    const m = { DRAFT:"is-draft", PLANNED:"is-planned", IN_PROGRESS:"is-progress", COMPLETED:"is-done", CANCELLED:"is-cancel",
      ACTIVE:"is-done", DELETED:"is-cancel", OK:"is-done", ATTENTION:"is-planned", PROBLEM:"is-cancel",
      VALID:"is-done", EXPIRED:"is-cancel", EXPIRING_SOON:"is-planned", MISSING:"is-cancel",
      true:"is-done", false:"is-cancel", SUBMITTED:"is-planned", APPROVED:"is-done", REJECTED:"is-cancel" };
    return m[s] || "is-draft";
  }
  function cellHtml(col, row) {
    const v = row[col.id];
    if (col.type === "status") {
      let key = null;
      if (col.statusKeyPrefix) {
        if (v === "ACTIVE" || v === "DELETED") {
          const base = col.statusKeyPrefix.replace(/\.$/, "").replace(/\.status$/, "");
          // pages.adminDrivers.status + ACTIVE -> pages.adminDrivers.statusActive
          const root = col.statusKeyPrefix.endsWith("status") ? col.statusKeyPrefix : (col.statusKeyPrefix + "status");
          key = root + (v === "ACTIVE" ? "Active" : "Deleted");
        } else {
          key = col.statusKeyPrefix + v;
        }
      }
      const label = key ? (t(key) !== key ? t(key) : String(v ?? "—")) : (v === true ? t("pages.adminUsers.yes") : v === false ? t("pages.adminUsers.no") : String(v ?? "—"));
      return `<span class="gs-status ${statusClass(v)}">${label}</span>`;
    }
    if (col.type === "badge") return `<span class="gs-status ${statusClass(v)}">${v ?? "—"}</span>`;
    if (col.type === "actions") {
      return `<button type="button" class="gs-btn gs-btn--stroked gs-btn--sm" data-act="open" data-id="${row.id}"><span class="material-symbols-outlined" aria-hidden="true">open_in_new</span><span data-i18n-skip>${t("proto.open")}</span></button>`;
    }
    if (v == null || v === "") return "—";
    return String(v);
  }
  function renderTable(pageRows) {
    const tb = document.getElementById("gsTableBody");
    tb.innerHTML = pageRows.map((row) => {
      const tds = COLUMNS.map((c) => `<td>${cellHtml(c, row)}</td>`).join("");
      return `<tr>${tds}</tr>`;
    }).join("");
  }
  function renderCards(pageRows) {
    const box = document.getElementById("gsCards");
    const titleCol = COLUMNS[0];
    const subCols = COLUMNS.slice(1, 5).filter((c) => c.type !== "actions");
    box.innerHTML = pageRows.map((row) => {
      const meta = subCols.map((c) => `<div class="gs-card-meta"><span>${t(c.key)}</span><strong>${cellHtml(c, row)}</strong></div>`).join("");
      return `<article class="gs-card">
        <div class="gs-card-top"><strong>${cellHtml(titleCol, row)}</strong>${statusField ? cellHtml({type:"status", statusKeyPrefix: COLUMNS.find(c=>c.id===statusField)?.statusKeyPrefix, id:statusField}, row) : ""}</div>
        ${meta}
        <div class="gs-card-actions"><button type="button" class="gs-btn gs-btn--filled gs-btn--sm" data-act="open" data-id="${row.id}">${t("proto.open")}</button></div>
      </article>`;
    }).join("");
  }
  function render() {
    renderChips();
    const loading = document.getElementById("gsLoading");
    const failed = document.getElementById("gsFailed");
    const empty = document.getElementById("gsEmpty");
    const table = document.getElementById("gsTableWrap");
    const cards = document.getElementById("gsCards");
    const pager = document.getElementById("gsPager");
    [loading, failed, empty, table, cards, pager].forEach((el) => { if (el) el.hidden = true; });
    if (state === "loading") { loading.hidden = false; return; }
    if (state === "failed") { failed.hidden = false; return; }
    const all = state === "empty" ? [] : filtered();
    const pages = Math.max(1, Math.ceil(all.length / pageSize) || 1);
    if (pageIndex >= pages) pageIndex = pages - 1;
    const slice = all.slice(pageIndex * pageSize, pageIndex * pageSize + pageSize);
    document.getElementById("gsCount").textContent = t("proto.count").replace("{n}", String(all.length));
    if (!all.length) { empty.hidden = false; return; }
    table.hidden = false;
    cards.hidden = false;
    pager.hidden = false;
    renderTable(slice);
    renderCards(slice);
    document.getElementById("gsPageLabel").textContent = (pageIndex + 1) + " / " + pages;
  }
  function bind() {
    document.getElementById("gsRefresh")?.addEventListener("click", () => toast(t("proto.toastRefresh")));
    document.getElementById("gsRetry")?.addEventListener("click", () => { state = "list"; render(); });
    document.getElementById("gsCreate")?.addEventListener("click", () => toast(t("proto.toastCreate")));
    document.getElementById("gsPrevPage")?.addEventListener("click", () => { if (pageIndex > 0) { pageIndex--; render(); } });
    document.getElementById("gsNextPage")?.addEventListener("click", () => { pageIndex++; render(); });
    document.getElementById("gsPageSize")?.addEventListener("change", (e) => { pageSize = +e.target.value; pageIndex = 0; render(); });
    document.getElementById("mainContent")?.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-act=open]");
      if (btn) toast(t("proto.toastOpen") + " #" + btn.getAttribute("data-id"));
    });
    document.getElementById("stateSelect")?.addEventListener("change", (e) => { state = e.target.value; pageIndex = 0; render(); });
    window.addEventListener("geosun:i18n", render);
    const params = new URLSearchParams(location.search);
    if (params.get("state")) state = params.get("state");
    if (params.get("hideDemo") === "1") {
      const bar = document.getElementById("demoBar");
      if (bar) bar.hidden = true;
    }
    render();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bind);
  else bind();
})();
