/* Demo admin list for /admin/trips. Shape follows TripContractDto + TripsApiService.listAdmin. */
(function () {
  const STATUSES = ["DRAFT", "PLANNED", "IN_PROGRESS", "COMPLETED", "CANCELLED"];
  const PAGE_SIZES = [5, 10, 25, 50];
  const DESKTOP_PAGE_SIZE = 10;
  const HANDSET_PAGE_SIZE = 5;

  /** Demo rows — fields used by AdminTripsComponent list */
  const TRIPS = [
    {
      id: "t-1008",
      tripNumber: "TRP-2026-1008",
      status: "IN_PROGRESS",
      routeRequestId: 1842,
      title: "Київ — Варшава · тентовий",
      comment: "Два водії",
      originText: "Київ, Магнітогорська 1",
      destinationText: "Warszawa, Jagiellońska 88",
      plannedStartAt: "2026-09-28T00:00:00.000Z",
      plannedEndAt: "2026-09-30T00:00:00.000Z",
      actualStartAt: "2026-09-28T06:20:00.000Z",
      actualEndAt: null,
      driverId: "d-01",
      driverName: "Петренко Іван",
      combinationId: "c-12",
      tractorId: null,
      tractorPlate: "AA1234BB",
      trailerId: null,
      trailerPlate: "AA5678BB",
      expenseReportStatus: "DRAFT",
      deleted: false,
      deletedAt: null,
      createdAt: "2026-09-20T10:00:00.000Z",
      updatedAt: "2026-09-28T06:20:00.000Z"
    },
    {
      id: "t-1007",
      tripNumber: "TRP-2026-1007",
      status: "PLANNED",
      routeRequestId: 1831,
      title: "Одеса — Берлін",
      comment: null,
      originText: "Одеса, Чорноморського козацтва 72",
      destinationText: "Berlin, Westhafen",
      plannedStartAt: "2026-10-05T00:00:00.000Z",
      plannedEndAt: "2026-10-09T00:00:00.000Z",
      actualStartAt: null,
      actualEndAt: null,
      driverId: "d-02",
      driverName: "Коваленко Олена",
      combinationId: "c-08",
      tractorId: null,
      tractorPlate: "KA7788EE",
      trailerId: null,
      trailerPlate: "KA9900EE",
      expenseReportStatus: null,
      deleted: false,
      deletedAt: null,
      createdAt: "2026-09-25T14:12:00.000Z",
      updatedAt: "2026-09-26T09:00:00.000Z"
    },
    {
      id: "t-1006",
      tripNumber: "TRP-2026-1006",
      status: "DRAFT",
      routeRequestId: null,
      title: "Львів — Прага (чернетка)",
      comment: "Очікуємо підтвердження автопоїзда",
      originText: "Львів, Городоцька 174",
      destinationText: "Praha, K Žižkovu 2",
      plannedStartAt: null,
      plannedEndAt: null,
      actualStartAt: null,
      actualEndAt: null,
      driverId: null,
      driverName: null,
      combinationId: null,
      tractorId: null,
      tractorPlate: null,
      trailerId: null,
      trailerPlate: null,
      expenseReportStatus: null,
      deleted: false,
      deletedAt: null,
      createdAt: "2026-09-29T08:40:00.000Z",
      updatedAt: "2026-09-29T08:40:00.000Z"
    },
    {
      id: "t-1005",
      tripNumber: "TRP-2026-1005",
      status: "COMPLETED",
      routeRequestId: 1764,
      title: "Харків — Будапешт",
      comment: null,
      originText: "Харків, Кільцева",
      destinationText: "Budapest, Csepel",
      plannedStartAt: "2026-09-12T00:00:00.000Z",
      plannedEndAt: "2026-09-15T00:00:00.000Z",
      actualStartAt: "2026-09-12T05:10:00.000Z",
      actualEndAt: "2026-09-15T18:40:00.000Z",
      driverId: "d-03",
      driverName: "Мельник Андрій",
      combinationId: null,
      tractorId: "v-t-1",
      tractorPlate: "AX1111CI",
      trailerId: "v-r-1",
      trailerPlate: "AX2222CI",
      expenseReportStatus: "SUBMITTED",
      deleted: false,
      deletedAt: null,
      createdAt: "2026-09-08T11:00:00.000Z",
      updatedAt: "2026-09-15T18:40:00.000Z"
    },
    {
      id: "t-1004",
      tripNumber: "TRP-2026-1004",
      status: "CANCELLED",
      routeRequestId: 1702,
      title: "Дніпро — Вроцлав",
      comment: "Клієнт скасував",
      originText: "Дніпро, Індустріальний",
      destinationText: "Wrocław, Bierutowska",
      plannedStartAt: "2026-09-18T00:00:00.000Z",
      plannedEndAt: "2026-09-21T00:00:00.000Z",
      actualStartAt: null,
      actualEndAt: null,
      driverId: "d-01",
      driverName: "Петренко Іван",
      combinationId: "c-12",
      tractorId: null,
      tractorPlate: "AA1234BB",
      trailerId: null,
      trailerPlate: "AA5678BB",
      expenseReportStatus: null,
      deleted: false,
      deletedAt: null,
      createdAt: "2026-09-05T09:20:00.000Z",
      updatedAt: "2026-09-10T16:00:00.000Z"
    },
    {
      id: "t-1003",
      tripNumber: "TRP-2026-1003",
      status: "PLANNED",
      routeRequestId: null,
      title: "Київ — Констанца",
      comment: null,
      originText: "Київ",
      destinationText: "Constanța Port",
      plannedStartAt: "2026-10-12T00:00:00.000Z",
      plannedEndAt: "2026-10-14T00:00:00.000Z",
      actualStartAt: null,
      actualEndAt: null,
      driverId: "d-04",
      driverName: "Шевченко Марія",
      combinationId: "c-03",
      tractorId: null,
      tractorPlate: "KA3344OO",
      trailerId: null,
      trailerPlate: "KA5566OO",
      expenseReportStatus: null,
      deleted: false,
      deletedAt: null,
      createdAt: "2026-09-27T12:00:00.000Z",
      updatedAt: "2026-09-27T12:00:00.000Z"
    },
    {
      id: "t-1002",
      tripNumber: "TRP-2026-1002",
      status: "IN_PROGRESS",
      routeRequestId: 1798,
      title: "Львів — Краків",
      comment: "Рефрижератор +2°C",
      originText: "Львів",
      destinationText: "Kraków, Al. Pokoju",
      plannedStartAt: "2026-09-27T00:00:00.000Z",
      plannedEndAt: "2026-09-28T00:00:00.000Z",
      actualStartAt: "2026-09-27T07:00:00.000Z",
      actualEndAt: null,
      driverId: "d-02",
      driverName: "Коваленко Олена",
      combinationId: "c-08",
      tractorId: null,
      tractorPlate: "KA7788EE",
      trailerId: null,
      trailerPlate: "KA9900EE",
      expenseReportStatus: "DRAFT",
      deleted: false,
      deletedAt: null,
      createdAt: "2026-09-22T15:30:00.000Z",
      updatedAt: "2026-09-27T07:00:00.000Z"
    },
    {
      id: "t-1001",
      tripNumber: "TRP-2026-1001",
      status: "COMPLETED",
      routeRequestId: null,
      title: "Запоріжжя — Лодзь",
      comment: null,
      originText: "Запоріжжя",
      destinationText: "Łódź",
      plannedStartAt: "2026-09-01T00:00:00.000Z",
      plannedEndAt: "2026-09-04T00:00:00.000Z",
      actualStartAt: "2026-09-01T04:50:00.000Z",
      actualEndAt: "2026-09-04T20:10:00.000Z",
      driverId: "d-03",
      driverName: "Мельник Андрій",
      combinationId: null,
      tractorId: "v-t-2",
      tractorPlate: "AE4500IP",
      trailerId: "v-r-2",
      trailerPlate: "AE4600IP",
      expenseReportStatus: "APPROVED",
      deleted: false,
      deletedAt: null,
      createdAt: "2026-08-28T10:00:00.000Z",
      updatedAt: "2026-09-05T11:00:00.000Z"
    },
    {
      id: "t-1000",
      tripNumber: "TRP-2026-1000",
      status: "DRAFT",
      routeRequestId: null,
      title: null,
      comment: null,
      originText: null,
      destinationText: null,
      plannedStartAt: null,
      plannedEndAt: null,
      actualStartAt: null,
      actualEndAt: null,
      driverId: null,
      driverName: null,
      combinationId: null,
      tractorId: null,
      tractorPlate: null,
      trailerId: null,
      trailerPlate: null,
      expenseReportStatus: null,
      deleted: false,
      deletedAt: null,
      createdAt: "2026-09-30T07:00:00.000Z",
      updatedAt: "2026-09-30T07:00:00.000Z"
    },
    {
      id: "t-0999",
      tripNumber: "TRP-2026-0999",
      status: "PLANNED",
      routeRequestId: 1650,
      title: "Київ — Відень",
      comment: "ADR не потрібен",
      originText: "Київ",
      destinationText: "Wien, Freudenau",
      plannedStartAt: "2026-10-20T00:00:00.000Z",
      plannedEndAt: "2026-10-23T00:00:00.000Z",
      actualStartAt: null,
      actualEndAt: null,
      driverId: "d-04",
      driverName: "Шевченко Марія",
      combinationId: "c-03",
      tractorId: null,
      tractorPlate: "KA3344OO",
      trailerId: null,
      trailerPlate: "KA5566OO",
      expenseReportStatus: null,
      deleted: false,
      deletedAt: null,
      createdAt: "2026-09-19T13:00:00.000Z",
      updatedAt: "2026-09-21T10:00:00.000Z"
    },
    {
      id: "t-0998",
      tripNumber: "TRP-2026-0998",
      status: "CANCELLED",
      routeRequestId: null,
      title: "Тернопіль — Катовіце",
      comment: "Немає вільного тягача",
      originText: "Тернопіль",
      destinationText: "Katowice",
      plannedStartAt: "2026-09-10T00:00:00.000Z",
      plannedEndAt: "2026-09-11T00:00:00.000Z",
      actualStartAt: null,
      actualEndAt: null,
      driverId: null,
      driverName: null,
      combinationId: null,
      tractorId: null,
      tractorPlate: null,
      trailerId: null,
      trailerPlate: null,
      expenseReportStatus: null,
      deleted: false,
      deletedAt: null,
      createdAt: "2026-09-02T09:00:00.000Z",
      updatedAt: "2026-09-03T12:00:00.000Z"
    }
  ];

  const state = {
    status: "",
    pageIndex: 0,
    pageSize: DESKTOP_PAGE_SIZE,
    demoState: "list",
    handset: false
  };

  function t(key) {
    if (window.GeoSunAppShell && typeof window.GeoSunAppShell.t === "function") {
      return window.GeoSunAppShell.t(key);
    }
    const lang = document.documentElement.lang || "uk";
    const dict = (window.GEOSUN_I18N && (window.GEOSUN_I18N[lang] || window.GEOSUN_I18N.uk)) || {};
    return dict[key] || key;
  }

  function dash(v) {
    return v == null || v === "" ? t("pages.adminTrips.notSet") : v;
  }

  function formatDate(iso) {
    if (!iso) return t("pages.adminTrips.notSet");
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString(document.documentElement.lang || "uk");
  }

  function statusLabel(status) {
    return t("pages.adminTrips.status." + status);
  }

  function expenseLabel(status) {
    if (!status) return "";
    return t("pages.adminTrips.expenseStatus." + status);
  }

  function showToast(msg) {
    const el = document.getElementById("atToast");
    if (!el) return;
    el.textContent = msg;
    el.hidden = false;
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(() => {
      el.hidden = true;
    }, 2800);
  }

  function filtered() {
    let rows = TRIPS.slice();
    if (state.status) {
      rows = rows.filter((r) => r.status === state.status);
    }
    // Production listAdmin defaults view=active (exclude deleted) — demo already active-only
    rows.sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
    return rows;
  }

  function pageSlice(rows) {
    const start = state.pageIndex * state.pageSize;
    return rows.slice(start, start + state.pageSize);
  }

  function detectHandset() {
    state.handset = window.matchMedia("(max-width: 959.98px)").matches;
  }

  function syncPageSizeForViewport(forceDefault) {
    detectHandset();
    if (forceDefault) {
      state.pageSize = state.handset ? HANDSET_PAGE_SIZE : DESKTOP_PAGE_SIZE;
      const sel = document.getElementById("atPageSize");
      if (sel) sel.value = String(state.pageSize);
    }
  }

  function renderChips() {
    const host = document.getElementById("atStatusChips");
    if (!host) return;
    const options = [""].concat(STATUSES);
    host.innerHTML = "";
    options.forEach((st) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "at-chip" + (state.status === st ? " is-selected" : "");
      btn.setAttribute("role", "radio");
      btn.setAttribute("aria-checked", state.status === st ? "true" : "false");
      btn.textContent = st ? statusLabel(st) : t("pages.adminTrips.statusFilterAll");
      btn.addEventListener("click", () => {
        state.status = st;
        state.pageIndex = 0;
        render();
      });
      host.appendChild(btn);
    });
  }

  function statusBadge(status) {
    return (
      '<span class="at-status at-status--' +
      status +
      '">' +
      statusLabel(status) +
      "</span>"
    );
  }

  function routeHtml(row) {
    return (
      '<div class="at-route-cell">' +
      '<span class="at-route-line">' +
      dash(row.originText) +
      "</span>" +
      '<span class="at-route-arrow">→</span>' +
      '<span class="at-route-line">' +
      dash(row.destinationText) +
      "</span>" +
      "</div>"
    );
  }

  function openTrip(id) {
    showToast(t("pages.adminTrips.openStub").replace("{id}", id));
  }

  function createTrip() {
    showToast(t("pages.adminTrips.createStub"));
  }

  function renderTable(rows) {
    const wrap = document.getElementById("atTableWrap");
    const body = document.getElementById("atTableBody");
    if (!wrap || !body) return;
    body.innerHTML = "";
    rows.forEach((row) => {
      const tr = document.createElement("tr");
      tr.innerHTML =
        '<td class="at-mono">' +
        row.tripNumber +
        "</td>" +
        "<td>" +
        dash(row.title) +
        (row.expenseReportStatus
          ? '<div class="at-expense-pill">' +
            t("pages.adminTrips.expenseChip") +
            ": " +
            expenseLabel(row.expenseReportStatus) +
            "</div>"
          : "") +
        "</td>" +
        "<td>" +
        statusBadge(row.status) +
        "</td>" +
        "<td>" +
        dash(row.driverName) +
        "</td>" +
        "<td>" +
        routeHtml(row) +
        "</td>" +
        "<td>" +
        formatDate(row.plannedStartAt) +
        "</td>" +
        '<td><button type="button" class="at-icon-btn" data-open="' +
        row.id +
        '" title="' +
        t("pages.adminTrips.open") +
        '" aria-label="' +
        t("pages.adminTrips.open") +
        '"><span class="material-symbols-outlined" aria-hidden="true">open_in_new</span></button></td>';
      body.appendChild(tr);
    });
    body.querySelectorAll("[data-open]").forEach((btn) => {
      btn.addEventListener("click", () => openTrip(btn.getAttribute("data-open")));
    });
  }

  function renderCards(rows) {
    const host = document.getElementById("atCards");
    if (!host) return;
    host.innerHTML = "";
    rows.forEach((row) => {
      const card = document.createElement("article");
      card.className = "at-card";
      card.innerHTML =
        '<div class="at-card-header">' +
        "<div>" +
        '<div class="at-card-number at-mono">' +
        row.tripNumber +
        "</div>" +
        '<div class="at-card-title">' +
        dash(row.title) +
        "</div>" +
        "</div>" +
        statusBadge(row.status) +
        "</div>" +
        '<div class="at-card-body">' +
        '<div class="at-card-field"><span class="at-card-label">' +
        t("pages.adminTrips.driver") +
        "</span><span>" +
        dash(row.driverName) +
        "</span></div>" +
        '<div class="at-card-field"><span class="at-card-label">' +
        t("pages.adminTrips.route") +
        "</span><span>" +
        dash(row.originText) +
        " → " +
        dash(row.destinationText) +
        "</span></div>" +
        '<div class="at-card-field"><span class="at-card-label">' +
        t("pages.adminTrips.plannedStartAt") +
        "</span><span>" +
        formatDate(row.plannedStartAt) +
        "</span></div>" +
        (row.expenseReportStatus
          ? '<div class="at-card-field"><span class="at-card-label">' +
            t("pages.adminTrips.expenseStatusLabel") +
            "</span><span>" +
            expenseLabel(row.expenseReportStatus) +
            "</span></div>"
          : "") +
        "</div>" +
        '<div class="at-card-actions">' +
        '<button type="button" class="at-btn at-btn--stroked" data-open="' +
        row.id +
        '">' +
        t("pages.adminTrips.open") +
        "</button>" +
        "</div>";
      host.appendChild(card);
    });
    host.querySelectorAll("[data-open]").forEach((btn) => {
      btn.addEventListener("click", () => openTrip(btn.getAttribute("data-open")));
    });
  }

  function setVisible(el, on) {
    if (!el) return;
    el.hidden = !on;
  }

  function render() {
    detectHandset();
    renderChips();

    const loading = document.getElementById("atLoading");
    const failed = document.getElementById("atFailed");
    const empty = document.getElementById("atEmpty");
    const tableWrap = document.getElementById("atTableWrap");
    const cards = document.getElementById("atCards");
    const pager = document.getElementById("atPager");
    const count = document.getElementById("atCount");
    const emptyTitle = document.getElementById("atEmptyTitle");
    const emptyBody = document.getElementById("atEmptyBody");

    setVisible(loading, false);
    setVisible(failed, false);
    setVisible(empty, false);
    setVisible(tableWrap, false);
    setVisible(cards, false);
    setVisible(pager, false);

    if (state.demoState === "loading") {
      setVisible(loading, true);
      if (count) count.textContent = "";
      return;
    }
    if (state.demoState === "failed") {
      setVisible(failed, true);
      if (count) count.textContent = "";
      return;
    }

    const all = state.demoState === "empty" ? [] : filtered();
    const total = all.length;
    const pageCount = Math.max(1, Math.ceil(total / state.pageSize) || 1);
    if (state.pageIndex > pageCount - 1) state.pageIndex = Math.max(0, pageCount - 1);
    const rows = pageSlice(all);

    if (total === 0) {
      setVisible(empty, true);
      if (emptyTitle) {
        emptyTitle.textContent = state.status
          ? t("pages.adminTrips.filterEmpty")
          : t("pages.adminTrips.empty");
      }
      if (emptyBody) emptyBody.textContent = t("pages.adminTrips.emptyBody");
      if (count) count.textContent = "";
      return;
    }

    const from = state.pageIndex * state.pageSize + 1;
    const to = Math.min(total, (state.pageIndex + 1) * state.pageSize);
    if (count) {
      count.textContent = t("pages.adminTrips.resultsCount")
        .replace("{from}", String(from))
        .replace("{to}", String(to))
        .replace("{total}", String(total));
    }

    if (state.handset) {
      setVisible(cards, true);
      renderCards(rows);
    } else {
      setVisible(tableWrap, true);
      renderTable(rows);
    }

    setVisible(pager, true);
    const pageLabel = document.getElementById("atPageLabel");
    if (pageLabel) pageLabel.textContent = state.pageIndex + 1 + " / " + pageCount;
    const prev = document.getElementById("atPrevPage");
    const next = document.getElementById("atNextPage");
    if (prev) prev.disabled = state.pageIndex <= 0;
    if (next) next.disabled = state.pageIndex >= pageCount - 1;
  }

  function bind() {
    document.getElementById("atRefresh")?.addEventListener("click", () => {
      const btn = document.getElementById("atRefresh");
      btn?.classList.add("is-busy");
      state.demoState = "list";
      const sel = document.getElementById("stateSelect");
      if (sel) sel.value = "list";
      setTimeout(() => {
        btn?.classList.remove("is-busy");
        render();
        showToast(t("pages.adminTrips.refresh"));
      }, 450);
    });
    document.getElementById("atRetry")?.addEventListener("click", () => {
      state.demoState = "list";
      const sel = document.getElementById("stateSelect");
      if (sel) sel.value = "list";
      render();
    });
    document.getElementById("atCreate")?.addEventListener("click", createTrip);
    document.getElementById("atEmptyCreate")?.addEventListener("click", createTrip);
    document.getElementById("atPrevPage")?.addEventListener("click", () => {
      if (state.pageIndex > 0) {
        state.pageIndex -= 1;
        render();
      }
    });
    document.getElementById("atNextPage")?.addEventListener("click", () => {
      state.pageIndex += 1;
      render();
    });
    document.getElementById("atPageSize")?.addEventListener("change", (e) => {
      const v = Number(e.target.value);
      state.pageSize = PAGE_SIZES.includes(v) ? v : DESKTOP_PAGE_SIZE;
      state.pageIndex = 0;
      render();
    });

    const stateSelect = document.getElementById("stateSelect");
    if (stateSelect) {
      stateSelect.addEventListener("change", () => {
        state.demoState = stateSelect.value;
        state.pageIndex = 0;
        render();
      });
    }

    window.addEventListener("geosun:i18n", () => render());
    window.addEventListener("resize", () => {
      const was = state.handset;
      detectHandset();
      if (was !== state.handset) render();
    });
  }

  function initFromQuery() {
    const params = new URLSearchParams(location.search);
    const st = params.get("status");
    if (st === "all" || st === "") state.status = "";
    else if (st && STATUSES.includes(st)) state.status = st;

    const size = Number(params.get("pageSize"));
    if (PAGE_SIZES.includes(size)) {
      state.pageSize = size;
    } else {
      syncPageSizeForViewport(true);
    }
    const sel = document.getElementById("atPageSize");
    if (sel) sel.value = String(state.pageSize);

    const demo = params.get("state");
    if (demo && ["list", "empty", "loading", "failed"].includes(demo)) {
      state.demoState = demo;
      const stateSelect = document.getElementById("stateSelect");
      if (stateSelect) stateSelect.value = demo;
    }
  }

  bind();
  initFromQuery();
  render();

  window.GeoSunAdminTrips = {
    render,
    setStatus: (s) => {
      state.status = s || "";
      state.pageIndex = 0;
      render();
    },
    setDemoState: (s) => {
      state.demoState = s;
      render();
    },
    getState: () => Object.assign({}, state)
  };
})();
