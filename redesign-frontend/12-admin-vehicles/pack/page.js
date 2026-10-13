
(function () {
  const ROWS = [
  {
    "id": 1,
    "plateNumber": "AA1234BB",
    "makeModel": "Volvo FH16",
    "vin": "YV2AS02C5EB123456",
    "manufactureYear": 2019,
    "vehicleType": "TRACTOR",
    "owner": "GeoSun Fleet",
    "compliance": "OK",
    "status": "ACTIVE"
  },
  {
    "id": 2,
    "plateNumber": "BC5678CE",
    "makeModel": "Scania R450",
    "vin": "YS2R4X20005312345",
    "manufactureYear": 2021,
    "vehicleType": "TRACTOR",
    "owner": "GeoSun Fleet",
    "compliance": "ATTENTION",
    "status": "ACTIVE"
  },
  {
    "id": 3,
    "plateNumber": "KA9012AB",
    "makeModel": "Schmitz Cargobull",
    "vin": "WSM00000001234567",
    "manufactureYear": 2018,
    "vehicleType": "TRAILER",
    "owner": "LeaseCo",
    "compliance": "PROBLEM",
    "status": "ACTIVE"
  },
  {
    "id": 4,
    "plateNumber": "AI3456BI",
    "makeModel": "MAN TGX",
    "vin": "WMA06XZZ5KM123456",
    "manufactureYear": 2020,
    "vehicleType": "TRACTOR",
    "owner": "GeoSun Fleet",
    "compliance": "OK",
    "status": "ACTIVE"
  },
  {
    "id": 5,
    "plateNumber": "AX7788AX",
    "makeModel": "Krone Cool Liner",
    "vin": "WKR00000009876543",
    "manufactureYear": 2022,
    "vehicleType": "TRAILER",
    "owner": "GeoSun Fleet",
    "compliance": "OK",
    "status": "DELETED"
  }
];
  const COLUMNS = [{"id": "plateNumber", "key": "pages.adminVehicles.plateNumber", "label": "Номер"}, {"id": "makeModel", "key": "pages.adminVehicles.makeModel", "label": "Марка / модель"}, {"id": "vin", "key": "pages.adminVehicles.vin", "label": "VIN"}, {"id": "manufactureYear", "key": "pages.adminVehicles.manufactureYear", "label": "Рік"}, {"id": "vehicleType", "key": "pages.adminVehicles.vehicleType", "label": "Тип"}, {"id": "owner", "key": "pages.adminVehicles.owner", "label": "Власник"}, {"id": "compliance", "key": "pages.adminVehicles.documents", "label": "Документи", "type": "status", "statusKeyPrefix": "pages.adminVehicles.compliance."}, {"id": "status", "key": "pages.adminVehicles.status", "label": "Статус", "type": "status", "statusKeyPrefix": "pages.adminVehicles.status"}, {"id": "_a", "key": "proto.actions", "label": "Дії", "type": "actions"}];
  const FILTERS = [{"value": "", "labelKey": "pages.adminVehicles.documentsFilterAll", "label": "Усі"}, {"value": "OK", "labelKey": "pages.adminVehicles.documentsFilterOk", "label": "OK"}, {"value": "ATTENTION", "labelKey": "pages.adminVehicles.documentsFilterAttention", "label": "Attention"}, {"value": "PROBLEM", "labelKey": "pages.adminVehicles.documentsFilterProblem", "label": "Problem"}];
  const statusField = "compliance";
  const chipField = "compliance";
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
