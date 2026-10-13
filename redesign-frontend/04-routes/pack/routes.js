/**
 * GeoSun /routes list redesign — filter/sort/empty/loading + desktop table / mobile cards.
 * Shell chrome lives in shell.js; this module fills #page-routes.
 */
(function () {
  const DEMO_ROUTES = [
    {
      id: "1042",
      title: "Київ → Варшава",
      distanceKm: 842.6,
      createdAt: "2026-09-12T09:14:22Z",
      updatedAt: "2026-09-28T16:41:05Z",
      lastOpenedAt: "2026-09-29T08:12:40Z",
      lockedByRequest: false,
      deleted: false,
      points: [
        { order: 1, address: "Київ, вул. Бориспільська 1", lat: 50.4105, lng: 30.6695, isBorder: false, operations: ["LOADING"] },
        { order: 2, address: "КПП «Ягодин»", lat: 51.2167, lng: 23.9167, isBorder: true, operations: ["EXPORT_CUSTOMS"] },
        { order: 3, address: "Dorohusk border", lat: 51.15, lng: 23.8, isBorder: true, operations: ["IMPORT_CUSTOMS"] },
        { order: 4, address: "Warszawa, Al. Jerozolimskie 98", lat: 52.2275, lng: 20.9962, isBorder: false, operations: ["UNLOADING"] }
      ]
    },
    {
      id: "1038",
      title: "Одеса → Бухарест",
      distanceKm: 612.3,
      createdAt: "2026-09-05T11:02:10Z",
      updatedAt: "2026-09-25T13:20:00Z",
      lastOpenedAt: "2026-09-26T10:05:11Z",
      lockedByRequest: true,
      deleted: false,
      points: [
        { order: 1, address: "Одеса, порт", lat: 46.4825, lng: 30.7233, isBorder: false, operations: ["LOADING"] },
        { order: 2, address: "КПП «Рені»", lat: 45.4572, lng: 28.2742, isBorder: true, operations: ["EXPORT_CUSTOMS", "IMPORT_CUSTOMS"] },
        { order: 3, address: "București, DN1", lat: 44.4268, lng: 26.1025, isBorder: false, operations: ["UNLOADING"] }
      ]
    },
    {
      id: "1021",
      title: "Львів → Краків",
      distanceKm: 318.4,
      createdAt: "2026-08-21T07:45:00Z",
      updatedAt: "2026-09-18T19:11:33Z",
      lastOpenedAt: null,
      lockedByRequest: false,
      deleted: false,
      points: [
        { order: 1, address: "Львів, вул. Городоцька 174", lat: 49.8235, lng: 23.9578, isBorder: false, operations: ["LOADING"] },
        { order: 2, address: "КПП «Краківець»", lat: 49.95, lng: 23.15, isBorder: true, operations: ["EXPORT_CUSTOMS"] },
        { order: 3, address: "Kraków, ul. Nowohucka", lat: 50.0647, lng: 19.945, isBorder: false, operations: ["UNLOADING"] }
      ]
    },
    {
      id: "1004",
      title: "Харків → Київ (архів)",
      distanceKm: 478.0,
      createdAt: "2026-07-02T15:30:00Z",
      updatedAt: "2026-08-14T12:00:00Z",
      lastOpenedAt: "2026-08-10T09:00:00Z",
      lockedByRequest: false,
      deleted: true,
      points: [
        { order: 1, address: "Харків, вул. Полтавський Шлях", lat: 49.9808, lng: 36.2527, isBorder: false, operations: ["LOADING"] },
        { order: 2, address: "Київ, ТЕРМІНАЛ", lat: 50.45, lng: 30.5233, isBorder: false, operations: ["UNLOADING"] }
      ]
    }
  ];

  const state = {
    listView: "active",
    sortBy: "updatedAt",
    sortDirection: "desc",
    demoState: "list", // list | empty | loading | failed
    allRoutes: DEMO_ROUTES.slice()
  };

  function t(key) {
    return (window.GeoSunAppShell && window.GeoSunAppShell.t)
      ? window.GeoSunAppShell.t(key)
      : key;
  }

  function formatDate(iso) {
    if (!iso) return "—";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    const lang = (window.GeoSunAppShell && window.GeoSunAppShell.getLang()) || "uk";
    return new Intl.DateTimeFormat(lang, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    }).format(d);
  }

  function headingKey() {
    switch (state.listView) {
      case "all": return "pages.routes.listViewHeadingAll";
      case "deleted": return "pages.routes.listViewHeadingDeleted";
      default: return "pages.routes.listViewHeadingActive";
    }
  }

  function filterRoutes() {
    let list = state.allRoutes.slice();
    if (state.listView === "active") list = list.filter((r) => !r.deleted);
    else if (state.listView === "deleted") list = list.filter((r) => r.deleted);
    return sortRoutes(list);
  }

  function sortRoutes(cards) {
    const key = state.sortBy;
    const dir = state.sortDirection === "asc" ? 1 : -1;
    const next = cards.slice();
    next.sort((a, b) => {
      if (key === "id") {
        return dir * (parseInt(a.id, 10) - parseInt(b.id, 10));
      }
      if (key === "distanceKm") {
        const na = a.distanceKm == null;
        const nb = b.distanceKm == null;
        if (na && nb) return 0;
        if (na) return 1;
        if (nb) return -1;
        return dir * (a.distanceKm - b.distanceKm);
      }
      const ta = new Date(a[key] || 0).getTime() || 0;
      const tb = new Date(b[key] || 0).getTime() || 0;
      return dir * (ta - tb);
    });
    return next;
  }

  function pathLabel(route) {
    if (!route.points.length) return t("pages.routes.pointsUnavailable");
    const first = route.points[0].address;
    const last = route.points[route.points.length - 1].address;
    return first + " → " + last;
  }

  function pointsCountLabel(n) {
    return t("pages.routes.pointsCount").replace("{n}", String(n));
  }

  function statusHtml(route) {
    if (route.deleted) {
      return '<span class="rt-status rt-status--deleted">' + escapeHtml(t("pages.routes.deletedChip")) + "</span>";
    }
    if (route.lockedByRequest) {
      return '<span class="rt-status rt-status--locked">' + escapeHtml(t("pages.routes.statusLocked")) + "</span>";
    }
    return '<span class="rt-status rt-status--active">' + escapeHtml(t("pages.routes.statusActive")) + "</span>";
  }

  function opsChips(point) {
    const chips = [];
    if (point.isBorder) {
      chips.push('<span class="rt-op-chip rt-op-chip--border">' + escapeHtml(t("pages.routes.viaBorder")) + "</span>");
    }
    (point.operations || []).forEach((op) => {
      chips.push('<span class="rt-op-chip">' + escapeHtml(t("pages.routeBuilder.operations." + op)) + "</span>");
    });
    return chips.join("");
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function actionsHtml(route) {
    const locked = route.lockedByRequest;
    const deleted = route.deleted;
    let left = "";
    if (deleted) {
      left += '<button type="button" class="rt-icon-btn" data-action="restore" data-id="' + route.id + '" title="' + escapeHtml(t("pages.routes.restoreRoute")) + '" aria-label="' + escapeHtml(t("pages.routes.restoreRoute")) + '"><span class="material-symbols-outlined">restore</span></button>';
    } else {
      left += '<button type="button" class="rt-icon-btn rt-icon-btn--danger" data-action="delete" data-id="' + route.id + '" title="' + escapeHtml(t("pages.routesHistory.deleteRoute")) + '" aria-label="' + escapeHtml(t("pages.routesHistory.deleteRoute")) + '"><span class="material-symbols-outlined">delete</span></button>';
      left += '<button type="button" class="rt-icon-btn" data-action="edit" data-id="' + route.id + '" ' + (locked ? "disabled " : "") + 'title="' + escapeHtml(locked ? t("pages.routes.lockedByRequest") : t("pages.routes.editRoute")) + '" aria-label="' + escapeHtml(t("pages.routes.editRoute")) + '"><span class="material-symbols-outlined">edit</span></button>';
    }
    left += '<button type="button" class="rt-icon-btn" data-action="open" data-id="' + route.id + '" title="' + escapeHtml(t("pages.routesHistory.openRoute")) + '" aria-label="' + escapeHtml(t("pages.routesHistory.openRoute")) + '"><span class="material-symbols-outlined">open_in_new</span></button>';
    const freightDisabled = deleted || !route.points.length;
    left += '<button type="button" class="rt-freight-btn" data-action="freight" data-id="' + route.id + '" ' + (freightDisabled ? "disabled " : "") + 'title="' + escapeHtml(deleted ? t("pages.routes.freightRequestDisabled") : t("pages.freightCalculation.openRequest")) + '">' + escapeHtml(t("pages.freightCalculation.openRequest")) + "</button>";
    return '<div class="rt-actions">' + left + "</div>";
  }

  function pointsCell(route) {
    const hasBorder = route.points.some((p) => p.isBorder);
    let html = '<div class="rt-points">';
    html += '<div class="rt-points-path">' + escapeHtml(pathLabel(route)) + "</div>";
    html += '<div class="rt-points-meta">' + escapeHtml(pointsCountLabel(route.points.length));
    if (hasBorder) html += " · " + escapeHtml(t("pages.routes.viaBorder"));
    html += "</div>";
    html += '<div class="rt-ops">';
    route.points.forEach((p) => {
      (p.operations || []).forEach((op) => {
        html += '<span class="rt-op-chip">' + escapeHtml(t("pages.routeBuilder.operations." + op)) + "</span>";
      });
    });
    html += "</div></div>";
    return html;
  }

  function renderTable(routes) {
    const tbody = document.getElementById("routesTableBody");
    if (!tbody) return;
    tbody.innerHTML = routes.map((route) => {
      return (
        "<tr>" +
        '<td><span class="rt-id">#' + escapeHtml(route.id) + "</span></td>" +
        "<td>" + pointsCell(route) + "</td>" +
        '<td><span class="rt-distance">' + (route.distanceKm != null ? route.distanceKm.toFixed(1) : "0.0") + " " + escapeHtml(t("pages.freightCalculation.km")) + "</span></td>" +
        '<td><span class="rt-date">' + escapeHtml(formatDate(route.createdAt)) + "</span></td>" +
        '<td><span class="rt-date">' + escapeHtml(formatDate(route.updatedAt)) + "</span></td>" +
        '<td><span class="rt-date">' + escapeHtml(formatDate(route.lastOpenedAt)) + "</span></td>" +
        "<td>" + statusHtml(route) + "</td>" +
        "<td>" + actionsHtml(route) + "</td>" +
        "</tr>"
      );
    }).join("");
  }

  function renderCards(routes) {
    const host = document.getElementById("routesCards");
    if (!host) return;
    host.innerHTML = routes.map((route) => {
      const points = route.points.map((p) => {
        return (
          '<div class="route-mpoint">' +
          '<span class="route-mpoint__order' + (p.isBorder ? " route-mpoint__order--border" : "") + '">' + p.order + "</span>" +
          '<div><p class="route-mpoint__addr">' + escapeHtml(p.address) + "</p>" +
          '<div class="route-mpoint__ops">' + opsChips(p) + "</div></div></div>"
        );
      }).join("");
      return (
        '<article class="route-mcard" data-id="' + route.id + '">' +
        '<div class="route-mcard__top">' +
        '<div><div class="route-mcard__id">#' + escapeHtml(route.id) + "</div>" +
        '<div class="route-mcard__path">' + escapeHtml(pathLabel(route)) + "</div></div>" +
        '<div style="text-align:right">' +
        '<div class="route-mcard__distance">' + (route.distanceKm != null ? route.distanceKm.toFixed(1) : "0.0") + " " + escapeHtml(t("pages.freightCalculation.km")) + "</div>" +
        statusHtml(route) +
        "</div></div>" +
        '<div class="route-mcard__meta">' +
        "<div><span>" + escapeHtml(t("pages.routes.createdAt")) + '</span><strong>' + escapeHtml(formatDate(route.createdAt)) + "</strong></div>" +
        "<div><span>" + escapeHtml(t("pages.routes.savedAt")) + '</span><strong>' + escapeHtml(formatDate(route.updatedAt)) + "</strong></div>" +
        "<div><span>" + escapeHtml(t("pages.routes.lastOpenedAt")) + '</span><strong>' + escapeHtml(formatDate(route.lastOpenedAt)) + "</strong></div>" +
        "<div><span>" + escapeHtml(t("pages.routes.colPoints")) + '</span><strong>' + escapeHtml(pointsCountLabel(route.points.length)) + "</strong></div>" +
        "</div>" +
        '<div class="route-mcard__points">' + points + "</div>" +
        '<div class="route-mcard__footer">' + actionsHtml(route) + "</div>" +
        "</article>"
      );
    }).join("");
  }

  function setVisible(el, visible) {
    if (!el) return;
    el.hidden = !visible;
  }

  function syncChrome() {
    const heading = document.getElementById("routesHeading");
    if (heading) {
      heading.setAttribute("data-i18n", headingKey());
      heading.textContent = t(headingKey());
    }

    document.querySelectorAll("[data-list-view]").forEach((btn) => {
      const on = btn.getAttribute("data-list-view") === state.listView;
      btn.classList.toggle("chip--selected", on);
      btn.setAttribute("aria-checked", on ? "true" : "false");
    });

    const sortSelect = document.getElementById("sortBySelect");
    if (sortSelect) sortSelect.value = state.sortBy;

    document.querySelectorAll(".sort-dir-btn[data-dir]").forEach((btn) => {
      btn.classList.toggle("is-active", btn.getAttribute("data-dir") === state.sortDirection);
    });
    document.querySelectorAll(".sort-dir-btn[data-sheet-dir]").forEach((btn) => {
      btn.classList.toggle("is-active", btn.getAttribute("data-sheet-dir") === state.sortDirection);
    });

    document.querySelectorAll('input[name="sheetView"]').forEach((inp) => {
      inp.checked = inp.value === state.listView;
    });
    document.querySelectorAll('input[name="sheetSort"]').forEach((inp) => {
      inp.checked = inp.value === state.sortBy;
    });

    // Re-apply option labels
    if (sortSelect) {
      Array.from(sortSelect.options).forEach((opt) => {
        const key = opt.getAttribute("data-i18n");
        if (key) opt.textContent = t(key);
      });
    }

    const stateSelect = document.getElementById("stateSelect");
    if (stateSelect) stateSelect.value = state.demoState;
  }

  function render() {
    syncChrome();

    const loading = document.getElementById("routesLoading");
    const failed = document.getElementById("routesFailed");
    const empty = document.getElementById("routesEmpty");
    const tableWrap = document.getElementById("routesTableWrap");
    const cards = document.getElementById("routesCards");

    if (state.demoState === "loading") {
      setVisible(loading, true);
      setVisible(failed, false);
      setVisible(empty, false);
      setVisible(tableWrap, false);
      setVisible(cards, false);
      return;
    }
    if (state.demoState === "failed") {
      setVisible(loading, false);
      setVisible(failed, true);
      setVisible(empty, false);
      setVisible(tableWrap, false);
      setVisible(cards, false);
      return;
    }

    setVisible(loading, false);
    setVisible(failed, false);

    let routes = filterRoutes();
    if (state.demoState === "empty") routes = [];

    if (routes.length === 0) {
      const emptyTitle = document.getElementById("routesEmptyTitle");
      if (emptyTitle) {
        const key = state.listView === "deleted" ? "pages.routes.emptyDeleted" : "pages.routes.empty";
        emptyTitle.setAttribute("data-i18n", key);
        emptyTitle.textContent = t(key);
      }
      setVisible(empty, true);
      setVisible(tableWrap, false);
      setVisible(cards, false);
      return;
    }

    setVisible(empty, false);
    setVisible(tableWrap, true);
    setVisible(cards, true);
    renderTable(routes);
    renderCards(routes);
  }

  function setListView(view) {
    state.listView = view;
    render();
  }

  function setSortBy(key) {
    state.sortBy = key;
    render();
  }

  function setSortDir(dir) {
    state.sortDirection = dir;
    render();
  }

  function setDemoState(s) {
    state.demoState = s;
    const params = new URLSearchParams(location.search);
    params.set("state", s);
    history.replaceState({}, "", location.pathname + "?" + params.toString() + location.hash);
    render();
  }

  function openSheet() {
    const sheet = document.getElementById("routesSheet");
    const scrim = document.getElementById("sheetScrim");
    if (sheet) {
      sheet.hidden = false;
    }
    if (scrim) scrim.hidden = false;
  }

  function closeSheet() {
    const sheet = document.getElementById("routesSheet");
    const scrim = document.getElementById("sheetScrim");
    if (sheet) sheet.hidden = true;
    if (scrim) scrim.hidden = true;
  }

  function onActionClick(e) {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;
    const action = btn.getAttribute("data-action");
    const id = btn.getAttribute("data-id");
    if (action === "delete") {
      state.allRoutes = state.allRoutes.map((r) => (r.id === id ? { ...r, deleted: true } : r));
      render();
    } else if (action === "restore") {
      state.allRoutes = state.allRoutes.map((r) => (r.id === id ? { ...r, deleted: false } : r));
      render();
    } else if (action === "edit" || action === "open" || action === "freight") {
      // Prototype: no navigation into builder/dialogs
      btn.classList.add("is-pulse");
      setTimeout(() => btn.classList.remove("is-pulse"), 300);
    }
  }

  function wire() {
    document.querySelectorAll("[data-list-view]").forEach((btn) => {
      btn.addEventListener("click", () => setListView(btn.getAttribute("data-list-view")));
    });

    const sortSelect = document.getElementById("sortBySelect");
    if (sortSelect) {
      sortSelect.addEventListener("change", () => setSortBy(sortSelect.value));
    }

    document.querySelectorAll(".sort-dir-btn[data-dir]").forEach((btn) => {
      btn.addEventListener("click", () => setSortDir(btn.getAttribute("data-dir")));
    });
    document.querySelectorAll(".sort-dir-btn[data-sheet-dir]").forEach((btn) => {
      btn.addEventListener("click", () => setSortDir(btn.getAttribute("data-sheet-dir")));
    });

    document.querySelectorAll('input[name="sheetView"]').forEach((inp) => {
      inp.addEventListener("change", () => {
        if (inp.checked) setListView(inp.value);
      });
    });
    document.querySelectorAll('input[name="sheetSort"]').forEach((inp) => {
      inp.addEventListener("change", () => {
        if (inp.checked) setSortBy(inp.value);
      });
    });

    const filterBtn = document.getElementById("routesFilterBtn");
    if (filterBtn) filterBtn.addEventListener("click", openSheet);
    const sheetDone = document.getElementById("sheetDoneBtn");
    if (sheetDone) sheetDone.addEventListener("click", closeSheet);
    const sheetScrim = document.getElementById("sheetScrim");
    if (sheetScrim) sheetScrim.addEventListener("click", closeSheet);

    const addBtn = document.getElementById("routesAddBtn");
    const emptyCta = document.getElementById("routesEmptyCta");
    [addBtn, emptyCta].forEach((btn) => {
      if (btn) btn.addEventListener("click", () => {
        if (window.GeoSunAppShell) window.GeoSunAppShell.navigateTo("route-builder");
      });
    });

    const page = document.getElementById("page-routes");
    if (page) page.addEventListener("click", onActionClick);

    const stateSelect = document.getElementById("stateSelect");
    if (stateSelect) {
      stateSelect.addEventListener("change", () => setDemoState(stateSelect.value));
    }

    window.addEventListener("geosun:i18n", render);
  }

  function initFromQuery() {
    const params = new URLSearchParams(location.search);
    const s = params.get("state");
    if (s && ["list", "empty", "loading", "failed"].includes(s)) {
      state.demoState = s;
    }
    const view = params.get("view");
    if (view && ["active", "all", "deleted"].includes(view)) {
      state.listView = view;
    }
  }

  initFromQuery();
  wire();
  render();

  window.GeoSunRoutes = {
    render,
    setListView,
    setSortBy,
    setSortDir,
    setDemoState,
    state
  };
})();
