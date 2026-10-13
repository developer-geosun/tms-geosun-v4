/* Demo list for /my-freight-requests. Shape follows RouteRequestContractDto. */
(function () {
  const STATUSES = ["new", "in_review", "quoted", "accepted", "rejected", "cancelled", "expired"];

  const REQUESTS = [
    {
      id: 1842,
      routeId: "7c1e0a44-9b21-4d0e-a11c-kyiv-waw",
      status: "quoted",
      preferredStartDate: "2026-10-06",
      comment: "Тент, завантаження з рампи. Документи на експорт готові.",
      createdAt: "2026-09-22T08:14:11Z",
      updatedAt: "2026-09-24T11:02:40Z",
      countryDistances: [
        { countryCode: "UA", distanceMeters: 312100, alongRouteOrder: 0 },
        { countryCode: "PL", distanceMeters: 430300, alongRouteOrder: 1 }
      ],
      route: {
        id: "7c1e0a44-9b21-4d0e-a11c-kyiv-waw",
        title: "Київ — Варшава",
        distanceKm: 742.4,
        points: [
          { order: 1, address: "Київ, вул. Магнітогорська, 1", country: "UA", isBorder: false },
          { order: 2, address: "Корчова / Краківець", country: "PL", isBorder: true },
          { order: 3, address: "Warszawa, ul. Jagiellońska 88", country: "PL", isBorder: false }
        ]
      },
      currentQuote: {
        status: "sent",
        totalAmount: 1860,
        currency: "EUR",
        transitDaysMin: 2,
        transitDaysMax: 3,
        validUntil: "2026-10-02",
        publicNote: "Включає платні дороги PL. Завантаження в робочий день."
      }
    },
    {
      id: 1831,
      routeId: "a90b12de-44c1-4f77-odesa-ber",
      status: "new",
      preferredStartDate: "2026-10-12",
      comment: null,
      createdAt: "2026-09-28T16:40:02Z",
      updatedAt: "2026-09-28T16:40:02Z",
      countryDistances: [
        { countryCode: "UA", distanceMeters: 548200, alongRouteOrder: 0 },
        { countryCode: "PL", distanceMeters: 671400, alongRouteOrder: 1 },
        { countryCode: "DE", distanceMeters: 468600, alongRouteOrder: 2 }
      ],
      route: {
        id: "a90b12de-44c1-4f77-odesa-ber",
        title: "Одеса — Берлін",
        distanceKm: 1688.2,
        points: [
          { order: 1, address: "Одеса, вул. Чорноморського козацтва, 72", country: "UA", isBorder: false },
          { order: 2, address: "Ягодин / Dorohusk", country: "PL", isBorder: true },
          { order: 3, address: "Berlin, Westhafen", country: "DE", isBorder: false }
        ]
      },
      currentQuote: null
    },
    {
      id: 1798,
      routeId: "bb31aa09-lviv-prg-01",
      status: "in_review",
      preferredStartDate: null,
      comment: "Рефрижератор +2°C, без нічних вікон на розвантаженні.",
      createdAt: "2026-09-18T09:05:33Z",
      updatedAt: "2026-09-26T14:18:00Z",
      countryDistances: [
        { countryCode: "UA", distanceMeters: 78000, alongRouteOrder: 0 },
        { countryCode: "PL", distanceMeters: 412500, alongRouteOrder: 1 },
        { countryCode: "CZ", distanceMeters: 399500, alongRouteOrder: 2 }
      ],
      route: {
        id: "bb31aa09-lviv-prg-01",
        title: "Львів — Прага",
        distanceKm: 890.0,
        points: [
          { order: 1, address: "Львів, вул. Городоцька, 367", country: "UA", isBorder: false },
          { order: 2, address: "Краківець / Korczowa", country: "PL", isBorder: true },
          { order: 3, address: "Praha, Nádraží Holešovice", country: "CZ", isBorder: false }
        ]
      },
      currentQuote: null
    },
    {
      id: 1760,
      routeId: "c4d8-dnipro-bud-22",
      status: "accepted",
      preferredStartDate: "2026-09-20",
      comment: "Повний тент, 22 палети.",
      createdAt: "2026-09-05T07:22:18Z",
      updatedAt: "2026-09-12T10:41:55Z",
      countryDistances: [
        { countryCode: "UA", distanceMeters: 612000, alongRouteOrder: 0 },
        { countryCode: "HU", distanceMeters: 498400, alongRouteOrder: 1 }
      ],
      route: {
        id: "c4d8-dnipro-bud-22",
        title: "Дніпро — Будапешт",
        distanceKm: 1110.4,
        points: [
          { order: 1, address: "Дніпро, вул. Робоча, 152", country: "UA", isBorder: false },
          { order: 2, address: "Чоп / Záhony", country: "HU", isBorder: true },
          { order: 3, address: "Budapest, Csepel Freeport", country: "HU", isBorder: false }
        ]
      },
      currentQuote: {
        status: "accepted",
        totalAmount: 2140,
        currency: "EUR",
        transitDaysMin: 3,
        transitDaysMax: 4,
        validUntil: "2026-09-18",
        publicNote: "Ставка підтверджена. Водій зв’яжеться за добу."
      }
    },
    {
      id: 1712,
      routeId: "e81f-kharkiv-vilnius",
      status: "rejected",
      preferredStartDate: "2026-09-08",
      comment: "Негабарит, висота 3.4 м.",
      createdAt: "2026-08-29T12:11:44Z",
      updatedAt: "2026-09-02T08:30:12Z",
      countryDistances: [
        { countryCode: "UA", distanceMeters: 690200, alongRouteOrder: 0 },
        { countryCode: "PL", distanceMeters: 280400, alongRouteOrder: 1 },
        { countryCode: "LT", distanceMeters: 412800, alongRouteOrder: 2 }
      ],
      route: {
        id: "e81f-kharkiv-vilnius",
        title: "Харків — Вільнюс",
        distanceKm: 1103.0,
        points: [
          { order: 1, address: "Харків, пр. Героїв Харкова, 221", country: "UA", isBorder: false },
          { order: 2, address: "Нові Яриловичі", country: "UA", isBorder: true },
          { order: 3, address: "Vilnius, Savanorių pr. 178", country: "LT", isBorder: false }
        ]
      },
      currentQuote: {
        status: "rejected",
        totalAmount: 2490,
        currency: "EUR",
        transitDaysMin: 3,
        transitDaysMax: 5,
        validUntil: "2026-09-06",
        publicNote: "Негабарит не проходить обраним коридором."
      }
    },
    {
      id: 1688,
      routeId: "f02a-mykolaiv-gdansk",
      status: "cancelled",
      preferredStartDate: "2026-08-28",
      comment: null,
      createdAt: "2026-08-20T15:48:09Z",
      updatedAt: "2026-08-21T09:12:30Z",
      countryDistances: [
        { countryCode: "UA", distanceMeters: 801000, alongRouteOrder: 0 },
        { countryCode: "PL", distanceMeters: 540000, alongRouteOrder: 1 }
      ],
      route: {
        id: "f02a-mykolaiv-gdansk",
        title: "Миколаїв — Гданськ",
        distanceKm: 1341.0,
        points: [
          { order: 1, address: "Миколаїв, вул. Лазурна, 1", country: "UA", isBorder: false },
          { order: 2, address: "Ягодин / Dorohusk", country: "PL", isBorder: true },
          { order: 3, address: "Gdańsk Port", country: "PL", isBorder: false }
        ]
      },
      currentQuote: null
    },
    {
      id: 1655,
      routeId: "91ab-uzhhorod-vienna",
      status: "expired",
      preferredStartDate: "2026-08-10",
      comment: "Часткове завантаження, 8 палет.",
      createdAt: "2026-07-30T10:02:27Z",
      updatedAt: "2026-08-15T18:00:00Z",
      countryDistances: [
        { countryCode: "UA", distanceMeters: 42000, alongRouteOrder: 0 },
        { countryCode: "SK", distanceMeters: 389000, alongRouteOrder: 1 },
        { countryCode: "AT", distanceMeters: 80000, alongRouteOrder: 2 }
      ],
      route: {
        id: "91ab-uzhhorod-vienna",
        title: "Ужгород — Відень",
        distanceKm: 511.0,
        points: [
          { order: 1, address: "Ужгород, вул. Собранецька, 145", country: "UA", isBorder: false },
          { order: 2, address: "Ужгород / Vyšné Nemecké", country: "SK", isBorder: true },
          { order: 3, address: "Wien, Freudenauer Hafen", country: "AT", isBorder: false }
        ]
      },
      currentQuote: {
        status: "expired",
        totalAmount: 980,
        currency: "EUR",
        transitDaysMin: 1,
        transitDaysMax: 2,
        validUntil: "2026-08-08",
        publicNote: null
      }
    }
  ];

  let uiState = "list";
  let statusFilter = "all";
  const expanded = new Set();
  let toastTimer = null;

  function shell() {
    return window.GeoSunAppShell;
  }
  function t(key) {
    return shell().t(key);
  }
  function locale() {
    const lang = shell().getLang();
    if (lang === "en") return "en-GB";
    if (lang === "ru") return "ru-RU";
    return "uk-UA";
  }
  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function formatDateTime(iso) {
    if (!iso) return "";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return new Intl.DateTimeFormat(locale(), {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    }).format(d);
  }
  function formatDate(value) {
    if (!value) return "";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    return new Intl.DateTimeFormat(locale(), {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).format(d);
  }
  function kmLabel(n) {
    const num = Number(n);
    const text = Number.isFinite(num) ? num.toFixed(1) : "0.0";
    return text + " " + t("pages.freightCalculation.km");
  }
  function requestStatusLabel(status) {
    return t("pages.myFreightRequests.requestStatus." + status);
  }
  function quoteStatusLabel(status) {
    return t("pages.myFreightRequests.quoteStatus." + status);
  }
  function visible() {
    return REQUESTS
      .slice()
      .sort(function (a, b) { return new Date(b.createdAt) - new Date(a.createdAt); })
      .filter(function (row) { return statusFilter === "all" || row.status === statusFilter; });
  }
  function stepNumber(entry, index) {
    const o = entry.alongRouteOrder;
    return o != null && typeof o === "number" && !Number.isNaN(o) ? o + 1 : index + 1;
  }
  function countriesHtml(req) {
    if (!req.countryDistances || !req.countryDistances.length) return "";
    const items = req.countryDistances.map(function (c, i) {
      return "<li><span>" + stepNumber(c, i) + ".</span> " + esc(c.countryCode) +
        " — " + (c.distanceMeters / 1000).toFixed(1) + " " + esc(t("pages.freightCalculation.km")) + "</li>";
    }).join("");
    return (
      "<h3>" + esc(t("pages.myFreightRequests.countryDistances")) + "</h3>" +
      "<p class=\"fr-hint\">" + esc(t("pages.myFreightRequests.countryDistancesAlongRouteHint")) + "</p>" +
      "<ul class=\"fr-countries\">" + items + "</ul>"
    );
  }
  function pointsHtml(req) {
    const points = (req.route && req.route.points ? req.route.points : []).slice().sort(function (a, b) {
      return a.order - b.order;
    });
    if (!points.length) return "";
    const items = points.map(function (p) {
      const border = p.isBorder
        ? " · " + esc(t("pages.freightCalculation.labels.border"))
        : "";
      return (
        "<li class=\"fr-point\">" +
          "<span class=\"fr-point-order\">" + esc(p.order) + "</span>" +
          "<span><span class=\"fr-point-addr\">" + esc(p.address) + "</span>" +
          "<span class=\"fr-point-meta\">" + esc(p.country) + border + "</span></span>" +
        "</li>"
      );
    }).join("");
    return "<h3>" + esc(t("pages.myFreightRequests.routePoints")) + "</h3><ul class=\"fr-points\">" + items + "</ul>";
  }
  function quoteBlock(req) {
    const q = req.currentQuote;
    if (!q) {
      return "<p class=\"fr-quote-none\">" + esc(t("pages.myFreightRequests.noQuote")) + "</p>";
    }
    const transit = (q.transitDaysMin != null || q.transitDaysMax != null)
      ? "<div><dt>" + esc(t("pages.myFreightRequests.quoteTransit")) + "</dt><dd>" +
        esc(q.transitDaysMin == null ? "—" : q.transitDaysMin) + " — " +
        esc(q.transitDaysMax == null ? "—" : q.transitDaysMax) + "</dd></div>"
      : "";
    const note = q.publicNote && String(q.publicNote).trim()
      ? "<div><dt>" + esc(t("pages.myFreightRequests.quotePublicNote")) + "</dt><dd>" + esc(q.publicNote) + "</dd></div>"
      : "";
    return (
      "<h3>" + esc(t("pages.myFreightRequests.quoteSection")) + "</h3>" +
      "<dl class=\"fr-meta\">" +
        "<div><dt>" + esc(t("pages.adminRouteRequests.status")) + "</dt><dd><span class=\"fr-status fr-status--" + esc(q.status) + "\">" + esc(quoteStatusLabel(q.status)) + "</span></dd></div>" +
        "<div><dt>" + esc(t("pages.myFreightRequests.quoteAmount")) + "</dt><dd>" + esc(q.totalAmount) + " " + esc(q.currency) + "</dd></div>" +
        transit +
        "<div><dt>" + esc(t("pages.myFreightRequests.quoteValidUntil")) + "</dt><dd>" + esc(formatDate(q.validUntil) || t("pages.myFreightRequests.notSet")) + "</dd></div>" +
        note +
      "</dl>"
    );
  }
  function detailHtml(req) {
    const comment = req.comment && String(req.comment).trim()
      ? req.comment
      : t("pages.myFreightRequests.noComment");
    const preferred = formatDate(req.preferredStartDate) || t("pages.myFreightRequests.notSet");
    return (
      "<div class=\"fr-detail-grid\">" +
        "<div>" +
          "<h3>" + esc(t("pages.adminRouteRequests.details")) + "</h3>" +
          "<dl class=\"fr-meta\">" +
            "<div><dt>" + esc(t("pages.myFreightRequests.createdAt")) + "</dt><dd>" + esc(formatDateTime(req.createdAt)) + "</dd></div>" +
            "<div><dt>" + esc(t("pages.myFreightRequests.updatedAt")) + "</dt><dd>" + esc(formatDateTime(req.updatedAt)) + "</dd></div>" +
            "<div><dt>" + esc(t("pages.myFreightRequests.preferredStartDate")) + "</dt><dd>" + esc(preferred) + "</dd></div>" +
            "<div><dt>" + esc(t("pages.myFreightRequests.comment")) + "</dt><dd>" + esc(comment) + "</dd></div>" +
            "<div><dt>" + esc(t("pages.myFreightRequests.routeId")) + "</dt><dd>" + esc(req.routeId) + "</dd></div>" +
          "</dl>" +
          "<button type=\"button\" class=\"fr-refresh fr-open\" data-open=\"" + esc(req.route ? req.route.id : req.routeId) + "\">" +
            "<span class=\"material-symbols-outlined\" aria-hidden=\"true\">open_in_new</span>" +
            esc(t("pages.myFreightRequests.openRoute")) +
          "</button>" +
        "</div>" +
        "<div>" + quoteBlock(req) + countriesHtml(req) + pointsHtml(req) + "</div>" +
      "</div>"
    );
  }
  function quoteCell(req) {
    if (!req.currentQuote) {
      return "<span class=\"fr-quote-none\">—</span>";
    }
    const q = req.currentQuote;
    return (
      "<div class=\"fr-quote-amt\">" + esc(q.totalAmount) + " " + esc(q.currency) + "</div>" +
      "<div class=\"fr-muted\">" + esc(quoteStatusLabel(q.status)) + "</div>"
    );
  }
  function renderChips() {
    const host = document.getElementById("frStatusChips");
    if (!host) return;
    const options = ["all"].concat(STATUSES);
    host.innerHTML = options.map(function (key) {
      const label = key === "all"
        ? t("pages.adminRouteRequests.filterAll")
        : requestStatusLabel(key);
      const selected = key === statusFilter;
      return (
        "<button type=\"button\" class=\"fr-chip" + (selected ? " is-selected" : "") + "\" role=\"radio\" aria-checked=\"" +
        (selected ? "true" : "false") + "\" data-status=\"" + key + "\">" + esc(label) + "</button>"
      );
    }).join("");
  }
  function renderTable(rows) {
    const body = document.getElementById("frTableBody");
    if (!body) return;
    body.innerHTML = rows.map(function (req) {
      const open = expanded.has(req.id);
      const title = req.route ? req.route.title : "—";
      const dist = req.route ? kmLabel(req.route.distanceKm) : "—";
      return (
        "<tr class=\"fr-row\">" +
          "<td class=\"fr-id\">" + esc(req.id) + "</td>" +
          "<td><span class=\"fr-status fr-status--" + esc(req.status) + "\">" + esc(requestStatusLabel(req.status)) + "</span></td>" +
          "<td><p class=\"fr-route-title\">" + esc(title) + "</p><p class=\"fr-route-id\">" + esc(req.routeId) + "</p></td>" +
          "<td>" + esc(dist) + "</td>" +
          "<td class=\"fr-date\">" + esc(formatDate(req.preferredStartDate) || t("pages.myFreightRequests.notSet")) + "</td>" +
          "<td>" + quoteCell(req) + "</td>" +
          "<td class=\"fr-date\">" + esc(formatDateTime(req.createdAt)) + "</td>" +
          "<td><div class=\"fr-actions\">" +
            "<button type=\"button\" class=\"fr-icon-btn\" data-open=\"" + esc(req.route ? req.route.id : req.routeId) + "\" aria-label=\"" + esc(t("pages.myFreightRequests.openRoute")) + "\" title=\"" + esc(t("pages.myFreightRequests.openRoute")) + "\">" +
              "<span class=\"material-symbols-outlined\" aria-hidden=\"true\">open_in_new</span></button>" +
            "<button type=\"button\" class=\"fr-icon-btn\" data-expand=\"" + esc(req.id) + "\" aria-expanded=\"" + (open ? "true" : "false") + "\" aria-label=\"" + esc(t(open ? "pages.myFreightRequests.collapseDetails" : "pages.myFreightRequests.expandDetails")) + "\">" +
              "<span class=\"material-symbols-outlined\" aria-hidden=\"true\">" + (open ? "expand_less" : "expand_more") + "</span></button>" +
          "</div></td>" +
        "</tr>" +
        (open ? "<tr class=\"fr-detail\"><td colspan=\"8\">" + detailHtml(req) + "</td></tr>" : "")
      );
    }).join("");
  }
  function renderCards(rows) {
    const host = document.getElementById("frCards");
    if (!host) return;
    host.innerHTML = rows.map(function (req) {
      const open = expanded.has(req.id);
      const title = req.route ? req.route.title : "—";
      const dist = req.route ? kmLabel(req.route.distanceKm) : "—";
      return (
        "<article class=\"fr-card\">" +
          "<div class=\"fr-card-top\">" +
            "<p class=\"fr-id\"><span class=\"fr-muted\">" + esc(t("pages.myFreightRequests.requestId")) + "</span> " + esc(req.id) + "</p>" +
            "<span class=\"fr-status fr-status--" + esc(req.status) + "\">" + esc(requestStatusLabel(req.status)) + "</span>" +
          "</div>" +
          "<h2 class=\"fr-card-route\">" + esc(title) + "</h2>" +
          "<p class=\"fr-card-dist\">" + esc(dist) + "</p>" +
          "<dl class=\"fr-meta\">" +
            "<div><dt>" + esc(t("pages.myFreightRequests.createdAt")) + "</dt><dd>" + esc(formatDateTime(req.createdAt)) + "</dd></div>" +
            "<div><dt>" + esc(t("pages.myFreightRequests.preferredStartDate")) + "</dt><dd>" + esc(formatDate(req.preferredStartDate) || t("pages.myFreightRequests.notSet")) + "</dd></div>" +
            "<div><dt>" + esc(t("pages.myFreightRequests.comment")) + "</dt><dd>" + esc(req.comment && req.comment.trim() ? req.comment : t("pages.myFreightRequests.noComment")) + "</dd></div>" +
          "</dl>" +
          "<div style=\"margin-top:0.65rem\">" + quoteBlock(req) + "</div>" +
          "<div class=\"fr-card-actions\">" +
            "<button type=\"button\" class=\"fr-refresh\" data-open=\"" + esc(req.route ? req.route.id : req.routeId) + "\">" +
              "<span class=\"material-symbols-outlined\" aria-hidden=\"true\">open_in_new</span>" + esc(t("pages.myFreightRequests.openRoute")) +
            "</button>" +
            "<button type=\"button\" class=\"fr-refresh\" data-expand=\"" + esc(req.id) + "\" aria-expanded=\"" + (open ? "true" : "false") + "\">" +
              "<span class=\"material-symbols-outlined\" aria-hidden=\"true\">" + (open ? "expand_less" : "route") + "</span>" +
              esc(t(open ? "pages.myFreightRequests.collapseDetails" : "pages.myFreightRequests.routeSection")) +
            "</button>" +
          "</div>" +
          (open ? "<div style=\"margin-top:0.75rem\">" + countriesHtml(req) + pointsHtml(req) +
            "<p class=\"fr-route-id\">" + esc(t("pages.myFreightRequests.routeId")) + " " + esc(req.routeId) + "</p>" +
            "<p class=\"fr-muted\">" + esc(t("pages.myFreightRequests.updatedAt")) + " · " + esc(formatDateTime(req.updatedAt)) + "</p></div>" : "") +
        "</article>"
      );
    }).join("");
  }
  function showToast(text) {
    const el = document.getElementById("frToast");
    if (!el) return;
    el.hidden = false;
    el.textContent = text;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.hidden = true; }, 3200);
  }
  function render() {
    if (!shell()) return;
    renderChips();
    const rows = visible();
    const loading = document.getElementById("frLoading");
    const failed = document.getElementById("frFailed");
    const empty = document.getElementById("frEmpty");
    const table = document.getElementById("frTableWrap");
    const cards = document.getElementById("frCards");
    const count = document.getElementById("frCount");
    const refresh = document.getElementById("frRefresh");
    const emptyTitle = document.getElementById("frEmptyTitle");
    const emptyBody = document.getElementById("frEmptyBody");
    const emptyCta = document.getElementById("frEmptyCta");

    if (loading) loading.hidden = uiState !== "loading";
    if (failed) failed.hidden = uiState !== "failed";
    const filterEmpty = uiState === "list" && rows.length === 0;
    const showEmpty = uiState === "empty" || filterEmpty;
    if (empty) empty.hidden = !showEmpty;
    if (emptyTitle) {
      emptyTitle.textContent = filterEmpty
        ? t("pages.myFreightRequests.filterEmpty")
        : t("pages.myFreightRequests.empty");
    }
    if (emptyBody) emptyBody.hidden = filterEmpty;
    if (emptyCta) emptyCta.hidden = filterEmpty;
    const showList = uiState === "list" && rows.length > 0;
    if (table) table.hidden = !showList;
    if (cards) cards.hidden = !showList;
    if (count) {
      count.textContent = uiState === "list"
        ? t("pages.myFreightRequests.resultsCount").replace("{n}", String(rows.length))
        : "";
    }
    if (refresh) refresh.disabled = uiState === "loading";
    if (showList) {
      renderTable(rows);
      renderCards(rows);
    }
    const stateSelect = document.getElementById("stateSelect");
    if (stateSelect && stateSelect.value !== uiState) stateSelect.value = uiState;
  }
  function setFilter(status) {
    statusFilter = status;
    render();
  }
  function setState(state) {
    uiState = state;
    render();
  }
  function onClick(event) {
    const expand = event.target.closest("[data-expand]");
    if (expand) {
      const id = Number(expand.getAttribute("data-expand"));
      if (expanded.has(id)) expanded.delete(id);
      else expanded.add(id);
      render();
      return;
    }
    const open = event.target.closest("[data-open]");
    if (open) {
      const routeId = open.getAttribute("data-open");
      showToast(t("pages.myFreightRequests.openRouteStub") + "&routeId=" + routeId);
      return;
    }
    const chip = event.target.closest("[data-status]");
    if (chip && chip.closest("#frStatusChips")) {
      setFilter(chip.getAttribute("data-status"));
    }
  }

  document.getElementById("page-freight").addEventListener("click", onClick);
  document.getElementById("frRefresh").addEventListener("click", function () {
    const btn = document.getElementById("frRefresh");
    btn.classList.add("is-busy");
    btn.disabled = true;
    setTimeout(function () {
      btn.classList.remove("is-busy");
      setState("list");
    }, 500);
  });
  document.getElementById("frRetry").addEventListener("click", function () {
    setState("list");
  });
  document.getElementById("frEmptyCta").addEventListener("click", function () {
    shell().navigateTo("routes");
  });
  const stateSelect = document.getElementById("stateSelect");
  if (stateSelect) {
    stateSelect.addEventListener("change", function () {
      setState(stateSelect.value);
    });
  }
  window.addEventListener("geosun:i18n", render);

  const params = new URLSearchParams(location.search);
  const initialState = params.get("state");
  if (initialState === "empty" || initialState === "loading" || initialState === "failed" || initialState === "list") {
    uiState = initialState;
  }
  const initialStatus = params.get("status");
  if (initialStatus === "all" || STATUSES.indexOf(initialStatus) !== -1) {
    statusFilter = initialStatus;
  }
  render();

  window.GeoSunFreight = { setState: setState, setFilter: setFilter, render: render };
})();
