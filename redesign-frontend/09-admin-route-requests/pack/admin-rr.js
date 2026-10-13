/* Demo admin queue for /admin/route-requests. Shape follows RouteRequestContractDto + AdminRouteRequestListParams. */
(function () {
  const STATUSES = ["new", "in_review", "quoted", "accepted", "rejected", "cancelled", "expired"];

  const REQUESTS = [
    {
      id: 1842,
      routeId: "7c1e0a44-9b21-4d0e-a11c-kyiv-waw",
      status: "quoted",
      preferredStartDate: "2026-10-06",
      comment: "Тент, завантаження з рампи. Документи на експорт готові.",
      requesterEmail: "user@logistics.ua",
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
        id: "q-1842-2",
        status: "sent",
        totalAmount: 1860,
        currency: "EUR",
        transitDaysMin: 2,
        transitDaysMax: 3,
        validUntil: "2026-10-02",
        publicNote: "Включає платні дороги PL.",
        createdAt: "2026-09-24T10:00:00Z",
        sentAt: "2026-09-24T11:00:00Z"
      }
    },
    {
      id: 1831,
      routeId: "a90b12de-44c1-4f77-odesa-ber",
      status: "new",
      preferredStartDate: "2026-10-12",
      comment: null,
      requesterEmail: "ops@blacksea.freight",
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
      requesterEmail: "fleet@carpathia.eu",
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
          { order: 1, address: "Львів, вул. Городоцька 174", country: "UA", isBorder: false },
          { order: 2, address: "Shehyni / Medyka", country: "PL", isBorder: true },
          { order: 3, address: "Praha, Ul. K Žižkovu 2", country: "CZ", isBorder: false }
        ]
      },
      currentQuote: null
    },
    {
      id: 1764,
      routeId: "cc88-kharkiv-budapest",
      status: "accepted",
      preferredStartDate: "2026-09-30",
      comment: "Два водії, ADR не потрібен.",
      requesterEmail: "user@logistics.ua",
      createdAt: "2026-09-10T12:22:00Z",
      updatedAt: "2026-09-20T09:11:00Z",
      countryDistances: [
        { countryCode: "UA", distanceMeters: 620000, alongRouteOrder: 0 },
        { countryCode: "HU", distanceMeters: 310000, alongRouteOrder: 1 }
      ],
      route: {
        id: "cc88-kharkiv-budapest",
        title: "Харків — Будапешт",
        distanceKm: 930.5,
        points: [
          { order: 1, address: "Харків, Кільцева", country: "UA", isBorder: false },
          { order: 2, address: "Chop / Záhony", country: "HU", isBorder: true },
          { order: 3, address: "Budapest, Csepel", country: "HU", isBorder: false }
        ]
      },
      currentQuote: {
        id: "q-1764-1",
        status: "accepted",
        totalAmount: 2100,
        currency: "EUR",
        transitDaysMin: 3,
        transitDaysMax: 4,
        validUntil: "2026-09-28",
        publicNote: null,
        createdAt: "2026-09-15T08:00:00Z",
        sentAt: "2026-09-15T09:00:00Z"
      }
    },
    {
      id: 1702,
      routeId: "dd11-dnipro-wroclaw",
      status: "rejected",
      preferredStartDate: "2026-09-20",
      comment: "Термін занадто короткий.",
      requesterEmail: "desk@steppe.cargo",
      createdAt: "2026-09-05T07:40:00Z",
      updatedAt: "2026-09-08T18:00:00Z",
      countryDistances: [
        { countryCode: "UA", distanceMeters: 880000, alongRouteOrder: 0 },
        { countryCode: "PL", distanceMeters: 420000, alongRouteOrder: 1 }
      ],
      route: {
        id: "dd11-dnipro-wroclaw",
        title: "Дніпро — Вроцлав",
        distanceKm: 1300.0,
        points: [
          { order: 1, address: "Дніпро, Індустріальний", country: "UA", isBorder: false },
          { order: 2, address: "Krakovets", country: "PL", isBorder: true },
          { order: 3, address: "Wrocław, Bierutowska", country: "PL", isBorder: false }
        ]
      },
      currentQuote: null
    },
    {
      id: 1688,
      routeId: "ee22-kyiv-vilnius",
      status: "cancelled",
      preferredStartDate: "2026-09-15",
      comment: "Клієнт скасував.",
      requesterEmail: "ops@blacksea.freight",
      createdAt: "2026-09-01T10:00:00Z",
      updatedAt: "2026-09-03T12:00:00Z",
      countryDistances: [
        { countryCode: "UA", distanceMeters: 420000, alongRouteOrder: 0 },
        { countryCode: "BY", distanceMeters: 180000, alongRouteOrder: 1 },
        { countryCode: "LT", distanceMeters: 210000, alongRouteOrder: 2 }
      ],
      route: {
        id: "ee22-kyiv-vilnius",
        title: "Київ — Вільнюс",
        distanceKm: 810.0,
        points: [
          { order: 1, address: "Київ", country: "UA", isBorder: false },
          { order: 2, address: "Vilnius, Savanorių", country: "LT", isBorder: false }
        ]
      },
      currentQuote: null
    },
    {
      id: 1650,
      routeId: "ff33-odesa-constanta",
      status: "expired",
      preferredStartDate: "2026-08-20",
      comment: null,
      requesterEmail: "fleet@carpathia.eu",
      createdAt: "2026-08-10T09:30:00Z",
      updatedAt: "2026-08-25T00:00:00Z",
      countryDistances: [
        { countryCode: "UA", distanceMeters: 210000, alongRouteOrder: 0 },
        { countryCode: "MD", distanceMeters: 90000, alongRouteOrder: 1 },
        { countryCode: "RO", distanceMeters: 180000, alongRouteOrder: 2 }
      ],
      route: {
        id: "ff33-odesa-constanta",
        title: "Одеса — Констанца",
        distanceKm: 480.0,
        points: [
          { order: 1, address: "Одеса", country: "UA", isBorder: false },
          { order: 2, address: "Constanța Port", country: "RO", isBorder: false }
        ]
      },
      currentQuote: {
        id: "q-1650-1",
        status: "expired",
        totalAmount: 920,
        currency: "EUR",
        transitDaysMin: 1,
        transitDaysMax: 2,
        validUntil: "2026-08-18",
        publicNote: null,
        createdAt: "2026-08-12T10:00:00Z",
        sentAt: "2026-08-12T11:00:00Z"
      }
    },
    {
      id: 1901,
      routeId: "gg44-lviv-krakow",
      status: "quoted",
      preferredStartDate: "2026-10-18",
      comment: "Палети EUR, 22 т.",
      requesterEmail: "desk@steppe.cargo",
      createdAt: "2026-09-29T08:00:00Z",
      updatedAt: "2026-09-29T15:20:00Z",
      countryDistances: [
        { countryCode: "UA", distanceMeters: 85000, alongRouteOrder: 0 },
        { countryCode: "PL", distanceMeters: 240000, alongRouteOrder: 1 }
      ],
      route: {
        id: "gg44-lviv-krakow",
        title: "Львів — Краків",
        distanceKm: 325.0,
        points: [
          { order: 1, address: "Львів", country: "UA", isBorder: false },
          { order: 2, address: "Kraków, Ruczaj", country: "PL", isBorder: false }
        ]
      },
      currentQuote: {
        id: "q-1901-1",
        status: "sent",
        totalAmount: 780,
        currency: "EUR",
        transitDaysMin: 1,
        transitDaysMax: 1,
        validUntil: "2026-10-10",
        publicNote: "Швидкий слот на кордоні.",
        createdAt: "2026-09-29T14:00:00Z",
        sentAt: "2026-09-29T15:00:00Z"
      }
    }
  ];

  const OWNER_EMAILS = [...new Set(REQUESTS.map((r) => r.requesterEmail).filter(Boolean))].sort();

  const DEFAULT_FILTERS = {
    status: "",
    createdFrom: "",
    createdTo: "",
    ownerEmail: "",
    routeTitle: "",
    sort: "createdAt",
    order: "desc"
  };

  let filters = { ...DEFAULT_FILTERS };
  let pageIndex = 0;
  let pageSize = 20;
  let selectedId = null;
  let demoState = "list";
  let draftFilters = null;

  function t(key) {
    if (window.GeoSunAppShell && typeof window.GeoSunAppShell.t === "function") {
      return window.GeoSunAppShell.t(key);
    }
    const lang = document.documentElement.lang || "uk";
    const dict = (window.GEOSUN_I18N && (window.GEOSUN_I18N[lang] || window.GEOSUN_I18N.uk)) || {};
    return dict[key] || key;
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function requestStatusLabel(status) {
    return t("pages.myFreightRequests.requestStatus." + status);
  }

  function quoteStatusLabel(status) {
    return t("pages.myFreightRequests.quoteStatus." + status);
  }

  function formatDate(iso) {
    if (!iso) return "—";
    try {
      const d = new Date(iso);
      return new Intl.DateTimeFormat(document.documentElement.lang || "uk", {
        dateStyle: "short",
        timeStyle: "short"
      }).format(d);
    } catch (_) {
      return iso;
    }
  }

  function formatDay(iso) {
    if (!iso) return t("pages.adminRouteRequests.notSet");
    return iso;
  }

  function cardQuoteAmount(req) {
    if (String(req.status).toLowerCase() !== "quoted") return null;
    const q = req.currentQuote;
    if (!q || !Number.isFinite(q.totalAmount) || !q.currency) return null;
    return formatMoney(q.totalAmount, q.currency);
  }

  function formatMoney(amount, currency) {
    try {
      return new Intl.NumberFormat(document.documentElement.lang || "uk", {
        style: "currency",
        currency: currency || "EUR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(amount);
    } catch (_) {
      return amount + " " + (currency || "");
    }
  }

  function km(meters) {
    return (meters / 1000).toFixed(1);
  }

  function hasActiveFilters() {
    return (
      !!filters.status ||
      !!filters.createdFrom ||
      !!filters.createdTo ||
      !!filters.ownerEmail.trim() ||
      !!filters.routeTitle.trim() ||
      filters.sort !== "createdAt" ||
      filters.order !== "desc"
    );
  }

  function applyClientFilters(rows) {
    let out = rows.slice();
    if (filters.status) out = out.filter((r) => r.status === filters.status);
    if (filters.ownerEmail.trim()) {
      const q = filters.ownerEmail.trim().toLowerCase();
      out = out.filter((r) => (r.requesterEmail || "").toLowerCase().includes(q));
    }
    if (filters.routeTitle.trim()) {
      const q = filters.routeTitle.trim().toLowerCase();
      out = out.filter((r) => ((r.route && r.route.title) || r.routeId || "").toLowerCase().includes(q));
    }
    if (filters.createdFrom) {
      const from = filters.createdFrom;
      out = out.filter((r) => (r.createdAt || "").slice(0, 10) >= from);
    }
    if (filters.createdTo) {
      const to = filters.createdTo;
      out = out.filter((r) => (r.createdAt || "").slice(0, 10) <= to);
    }
    const dir = filters.order === "asc" ? 1 : -1;
    const sortKey = filters.sort || "createdAt";
    out.sort((a, b) => {
      let av;
      let bv;
      if (sortKey === "status") {
        av = a.status;
        bv = b.status;
      } else if (sortKey === "preferredStartDate") {
        av = a.preferredStartDate || "";
        bv = b.preferredStartDate || "";
      } else {
        av = a.createdAt || "";
        bv = b.createdAt || "";
      }
      if (av < bv) return -1 * dir;
      if (av > bv) return 1 * dir;
      return (b.id - a.id) * dir;
    });
    return out;
  }

  function toast(msg) {
    const el = document.getElementById("arrToast");
    if (!el) return;
    el.textContent = msg;
    el.hidden = false;
    clearTimeout(toast._t);
    toast._t = setTimeout(() => {
      el.hidden = true;
    }, 2200);
  }

  function renderStatusChips() {
    const host = document.getElementById("arrStatusChips");
    if (!host) return;
    const keys = ["", ...STATUSES];
    host.innerHTML = keys
      .map((key) => {
        const label = key ? requestStatusLabel(key) : t("pages.adminRouteRequests.filterAll");
        const selected = filters.status === key;
        return (
          '<button type="button" class="arr-chip' +
          (selected ? " is-selected" : "") +
          '" role="radio" aria-checked="' +
          selected +
          '" data-status="' +
          esc(key) +
          '">' +
          esc(label) +
          "</button>"
        );
      })
      .join("");
  }

  function fillFilterStatusOptions() {
    const sel = document.getElementById("fStatus");
    if (!sel) return;
    const current = sel.value;
    sel.innerHTML =
      '<option value="">' +
      esc(t("pages.adminRouteRequests.filterAll")) +
      "</option>" +
      STATUSES.map((s) => '<option value="' + esc(s) + '">' + esc(requestStatusLabel(s)) + "</option>").join("");
    sel.value = current;
  }

  function fillOwnerDatalist() {
    const dl = document.getElementById("fOwnerEmailList");
    if (!dl) return;
    dl.innerHTML = OWNER_EMAILS.map((e) => '<option value="' + esc(e) + '"></option>').join("");
  }

  function updateFilterBtn() {
    const btn = document.getElementById("arrFilterBtn");
    if (!btn) return;
    btn.classList.toggle("is-active", hasActiveFilters());
    btn.classList.toggle("arr-btn--filled", hasActiveFilters());
    btn.classList.toggle("arr-btn--stroked", !hasActiveFilters());
  }

  function renderList() {
    const loading = document.getElementById("arrLoading");
    const failed = document.getElementById("arrFailed");
    const empty = document.getElementById("arrEmpty");
    const tableWrap = document.getElementById("arrTableWrap");
    const cards = document.getElementById("arrCards");
    const pager = document.getElementById("arrPager");
    const countEl = document.getElementById("arrCount");

    [loading, failed, empty, tableWrap, cards, pager].forEach((el) => {
      if (el) el.hidden = true;
    });

    if (demoState === "loading") {
      if (loading) loading.hidden = false;
      if (countEl) countEl.textContent = "";
      return;
    }
    if (demoState === "failed") {
      if (failed) failed.hidden = false;
      if (countEl) countEl.textContent = "";
      return;
    }

    const source = demoState === "empty" ? [] : REQUESTS;
    const filtered = applyClientFilters(source);
    const total = filtered.length;
    const pageCount = Math.max(1, Math.ceil(total / pageSize) || 1);
    if (pageIndex >= pageCount) pageIndex = pageCount - 1;
    if (pageIndex < 0) pageIndex = 0;
    const start = pageIndex * pageSize;
    const pageRows = filtered.slice(start, start + pageSize);

    if (countEl) {
      countEl.textContent = t("pages.adminRouteRequests.resultsCount")
        .replace("{shown}", String(pageRows.length))
        .replace("{total}", String(total));
    }

    if (!total) {
      if (empty) empty.hidden = false;
      const title = document.getElementById("arrEmptyTitle");
      const body = document.getElementById("arrEmptyBody");
      if (title) {
        title.textContent = hasActiveFilters()
          ? t("pages.adminRouteRequests.filterEmpty")
          : t("pages.adminRouteRequests.empty");
      }
      if (body) {
        body.hidden = hasActiveFilters();
        body.textContent = t("pages.adminRouteRequests.emptyBody");
      }
      return;
    }

    if (tableWrap) {
      tableWrap.hidden = false;
      renderTable(pageRows);
    }
    if (cards) {
      cards.hidden = false;
      renderCards(pageRows);
    }
    if (pager) {
      pager.hidden = false;
      const label = document.getElementById("arrPageLabel");
      if (label) label.textContent = pageIndex + 1 + " / " + pageCount;
      const prev = document.getElementById("arrPrevPage");
      const next = document.getElementById("arrNextPage");
      if (prev) prev.disabled = pageIndex <= 0;
      if (next) next.disabled = pageIndex >= pageCount - 1;
      const sizeSel = document.getElementById("arrPageSize");
      if (sizeSel && String(pageSize) !== sizeSel.value) sizeSel.value = String(pageSize);
    }
  }

  function renderTable(rows) {
    const tbody = document.getElementById("arrTableBody");
    if (!tbody) return;
    tbody.innerHTML = rows
      .map((req) => {
        const title = (req.route && req.route.title) || req.routeId;
        const dist =
          req.route && req.route.distanceKm != null
            ? req.route.distanceKm.toFixed(1) + " " + t("pages.freightCalculation.km")
            : "—";
        const quote = cardQuoteAmount(req);
        const quoteHtml = quote
          ? "<div>" +
            esc(quote) +
            '</div><div class="arr-muted">' +
            esc(quoteStatusLabel(req.currentQuote.status)) +
            "</div>"
          : '<span class="arr-muted">' + esc(t("pages.adminRouteRequests.noQuote")) + "</span>";
        const selected = req.id === selectedId ? " is-selected" : "";
        return (
          '<tr class="' +
          selected.trim() +
          '" data-id="' +
          req.id +
          '">' +
          "<td>" +
          req.id +
          "</td>" +
          '<td><span class="arr-status arr-status--' +
          esc(req.status) +
          '">' +
          esc(requestStatusLabel(req.status)) +
          "</span></td>" +
          '<td class="arr-route-cell"><strong>' +
          esc(title) +
          '</strong><div class="arr-muted">' +
          esc(dist) +
          "</div></td>" +
          "<td>" +
          esc(req.requesterEmail || "—") +
          "</td>" +
          "<td>" +
          esc(formatDay(req.preferredStartDate)) +
          "</td>" +
          "<td>" +
          quoteHtml +
          "</td>" +
          "<td>" +
          esc(formatDate(req.createdAt)) +
          "</td>" +
          '<td><div class="arr-actions">' +
          '<button type="button" class="arr-icon-btn" data-action="details" data-id="' +
          req.id +
          '" title="' +
          esc(t("pages.adminRouteRequests.openDetails")) +
          '"><span class="material-symbols-outlined" aria-hidden="true">visibility</span></button>' +
          '<button type="button" class="arr-icon-btn" data-action="quote" data-id="' +
          req.id +
          '" title="' +
          esc(t("pages.adminRouteRequests.openQuotePanel")) +
          '"><span class="material-symbols-outlined" aria-hidden="true">request_quote</span></button>' +
          '<button type="button" class="arr-icon-btn" data-action="route" data-id="' +
          req.id +
          '" title="' +
          esc(t("pages.adminRouteRequests.openRoute")) +
          '"><span class="material-symbols-outlined" aria-hidden="true">route</span></button>' +
          "</div></td></tr>"
        );
      })
      .join("");
  }

  function renderCards(rows) {
    const host = document.getElementById("arrCards");
    if (!host) return;
    host.innerHTML = rows
      .map((req) => {
        const title = (req.route && req.route.title) || req.routeId;
        const quote = cardQuoteAmount(req);
        const selected = req.id === selectedId ? " is-selected" : "";
        return (
          '<button type="button" class="arr-card' +
          selected +
          '" data-id="' +
          req.id +
          '">' +
          '<div class="arr-card-top"><strong>' +
          esc(title) +
          '</strong><span class="arr-status arr-status--' +
          esc(req.status) +
          '">' +
          esc(requestStatusLabel(req.status)) +
          "</span></div>" +
          '<div class="arr-card-meta">' +
          "<span>#" +
          req.id +
          "</span>" +
          "<span>" +
          esc(req.requesterEmail || "—") +
          "</span>" +
          "<span>" +
          esc(formatDate(req.createdAt)) +
          "</span>" +
          (quote ? '<span class="arr-amount">' + esc(quote) + "</span>" : "") +
          "</div>" +
          '<div class="arr-card-actions">' +
          '<span class="arr-btn arr-btn--stroked" data-action="details" data-id="' +
          req.id +
          '"><span class="material-symbols-outlined" aria-hidden="true">visibility</span><span>' +
          esc(t("pages.adminRouteRequests.openDetails")) +
          "</span></span>" +
          '<span class="arr-btn arr-btn--stroked" data-action="quote" data-id="' +
          req.id +
          '"><span class="material-symbols-outlined" aria-hidden="true">request_quote</span><span>' +
          esc(t("pages.adminRouteRequests.openQuotePanel")) +
          "</span></span>" +
          "</div></button>"
        );
      })
      .join("");
  }

  function openDetails(id) {
    const req = REQUESTS.find((r) => r.id === id);
    if (!req) return;
    selectedId = id;
    const body = document.getElementById("arrDetailBody");
    const panel = document.getElementById("arrDetail");
    const scrim = document.getElementById("arrDetailScrim");
    if (!body || !panel) return;

    const title = (req.route && req.route.title) || req.routeId;
    const q = req.currentQuote;
    const points = ((req.route && req.route.points) || []).slice().sort((a, b) => a.order - b.order);
    const distances = req.countryDistances || [];
    const totalKm = distances.reduce((s, d) => s + (d.distanceMeters || 0), 0);

    body.innerHTML =
      '<dl class="arr-detail-dl">' +
      "<div><dt>ID</dt><dd>" +
      req.id +
      "</dd></div>" +
      "<div><dt>" +
      esc(t("pages.adminRouteRequests.status")) +
      '</dt><dd><span class="arr-status arr-status--' +
      esc(req.status) +
      '">' +
      esc(requestStatusLabel(req.status)) +
      "</span></dd></div>" +
      "<div><dt>" +
      esc(t("pages.adminRouteRequests.colRoute")) +
      "</dt><dd>" +
      esc(title) +
      "</dd></div>" +
      "<div><dt>" +
      esc(t("pages.adminRouteRequests.colOwner")) +
      "</dt><dd>" +
      esc(req.requesterEmail || "—") +
      "</dd></div>" +
      "<div><dt>" +
      esc(t("pages.adminRouteRequests.preferredStartDate")) +
      "</dt><dd>" +
      esc(formatDay(req.preferredStartDate)) +
      "</dd></div>" +
      "<div><dt>" +
      esc(t("pages.adminRouteRequests.comment")) +
      "</dt><dd>" +
      esc(req.comment || t("pages.adminRouteRequests.noComment")) +
      "</dd></div>" +
      "<div><dt>" +
      esc(t("pages.adminRouteRequests.colCreated")) +
      "</dt><dd>" +
      esc(formatDate(req.createdAt)) +
      "</dd></div>" +
      "</dl>" +
      '<div class="arr-detail-section"><h3>' +
      esc(t("pages.adminRouteRequests.colQuote")) +
      "</h3>" +
      (q
        ? '<dl class="arr-detail-dl"><div><dt>' +
          esc(t("pages.adminRouteRequests.status")) +
          '</dt><dd><span class="arr-status arr-status--' +
          esc(q.status) +
          '">' +
          esc(quoteStatusLabel(q.status)) +
          "</span></dd></div><div><dt>" +
          esc(t("pages.adminRouteRequests.quoteAmount")) +
          "</dt><dd>" +
          esc(formatMoney(q.totalAmount, q.currency)) +
          "</dd></div></dl>"
        : "<p>" + esc(t("pages.adminRouteRequests.noQuote")) + "</p>") +
      "</div>" +
      '<div class="arr-detail-section"><h3>' +
      esc(t("pages.adminRouteRequests.nbuCalculation")) +
      "</h3><p>" +
      esc(t("pages.adminRouteRequests.nbuStub")) +
      '</p><div class="arr-detail-actions" style="margin-top:0.55rem">' +
      '<button type="button" class="arr-btn arr-btn--stroked" data-detail-action="nbu">' +
      esc(t("pages.adminRouteRequests.nbuPreviewButton")) +
      "</button>" +
      '<button type="button" class="arr-btn arr-btn--filled" data-detail-action="send">' +
      esc(t("pages.adminRouteRequests.sendProposal")) +
      "</button></div></div>" +
      '<div class="arr-detail-section"><h3>' +
      esc(t("pages.adminRouteRequests.routePoints")) +
      "</h3>" +
      (points.length
        ? '<ul class="arr-points">' +
          points
            .map(
              (p) =>
                "<li>" +
                p.order +
                ". " +
                esc(p.address) +
                (p.isBorder ? " · border" : "") +
                "</li>"
            )
            .join("") +
          "</ul>"
        : "<p>" + esc(t("pages.adminRouteRequests.noRoutePoints")) + "</p>") +
      (distances.length
        ? "<p style=\"margin-top:0.65rem\"><strong>" +
          esc(t("pages.adminRouteRequests.countryDistanceTotal")) +
          ":</strong> " +
          esc(km(totalKm)) +
          " " +
          esc(t("pages.freightCalculation.km")) +
          '</p><table class="arr-mini-table"><thead><tr><th>' +
          esc(t("pages.adminRouteRequests.countryCode")) +
          "</th><th>" +
          esc(t("pages.adminRouteRequests.distanceMeters")) +
          "</th><th>" +
          esc(t("pages.adminRouteRequests.alongRouteOrder")) +
          "</th></tr></thead><tbody>" +
          distances
            .map(
              (d) =>
                "<tr><td>" +
                esc(d.countryCode) +
                "</td><td>" +
                esc(km(d.distanceMeters)) +
                "</td><td>" +
                (d.alongRouteOrder != null ? d.alongRouteOrder : "—") +
                "</td></tr>"
            )
            .join("") +
          "</tbody></table>"
        : "<p>" + esc(t("pages.adminRouteRequests.countryDistancesEmpty")) + "</p>") +
      '</div><div class="arr-detail-actions">' +
      '<button type="button" class="arr-btn arr-btn--stroked" data-detail-action="quote">' +
      '<span class="material-symbols-outlined" aria-hidden="true">request_quote</span>' +
      esc(t("pages.adminRouteRequests.openQuotePanel")) +
      "</button>" +
      '<button type="button" class="arr-btn arr-btn--stroked" data-detail-action="route">' +
      '<span class="material-symbols-outlined" aria-hidden="true">route</span>' +
      esc(t("pages.adminRouteRequests.openRoute")) +
      "</button></div>";

    panel.hidden = false;
    panel.setAttribute("aria-hidden", "false");
    requestAnimationFrame(() => panel.classList.add("is-open"));
    if (scrim) scrim.hidden = false;
    document.body.classList.add("arr-modal-open");
    renderList();
  }

  function closeDetails() {
    const panel = document.getElementById("arrDetail");
    const scrim = document.getElementById("arrDetailScrim");
    if (panel) {
      panel.classList.remove("is-open");
      panel.setAttribute("aria-hidden", "true");
      setTimeout(() => {
        if (!panel.classList.contains("is-open")) panel.hidden = true;
      }, 220);
    }
    if (scrim) scrim.hidden = true;
    document.body.classList.remove("arr-modal-open");
  }

  function openFilterDialog() {
    draftFilters = { ...filters };
    document.getElementById("fStatus").value = filters.status;
    document.getElementById("fCreatedFrom").value = filters.createdFrom;
    document.getElementById("fCreatedTo").value = filters.createdTo;
    document.getElementById("fOwnerEmail").value = filters.ownerEmail;
    document.getElementById("fRouteTitle").value = filters.routeTitle;
    document.getElementById("fSort").value = filters.sort;
    document.getElementById("fOrder").value = filters.order;
    fillFilterStatusOptions();
    document.getElementById("fStatus").value = filters.status;
    const dlg = document.getElementById("arrFilterDialog");
    const scrim = document.getElementById("arrFilterScrim");
    if (dlg) dlg.hidden = false;
    if (scrim) scrim.hidden = false;
    document.body.classList.add("arr-modal-open");
  }

  function closeFilterDialog() {
    const dlg = document.getElementById("arrFilterDialog");
    const scrim = document.getElementById("arrFilterScrim");
    if (dlg) dlg.hidden = true;
    if (scrim) scrim.hidden = true;
    if (!document.getElementById("arrDetail") || document.getElementById("arrDetail").hidden) {
      document.body.classList.remove("arr-modal-open");
    }
  }

  function readFilterForm() {
    return {
      status: document.getElementById("fStatus").value || "",
      createdFrom: document.getElementById("fCreatedFrom").value || "",
      createdTo: document.getElementById("fCreatedTo").value || "",
      ownerEmail: document.getElementById("fOwnerEmail").value || "",
      routeTitle: document.getElementById("fRouteTitle").value || "",
      sort: document.getElementById("fSort").value || "createdAt",
      order: document.getElementById("fOrder").value || "desc"
    };
  }

  function handleAction(action, id) {
    const req = REQUESTS.find((r) => r.id === id);
    if (!req) return;
    if (action === "details") {
      openDetails(id);
      return;
    }
    if (action === "quote") {
      openDetails(id);
      toast(t("pages.adminRouteRequests.quotePanelStub"));
      return;
    }
    if (action === "route") {
      toast(t("pages.adminRouteRequests.openRouteStub") + " · " + ((req.route && req.route.title) || req.routeId));
    }
  }

  function bind() {
    document.getElementById("arrStatusChips")?.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-status]");
      if (!btn) return;
      filters.status = btn.getAttribute("data-status") || "";
      pageIndex = 0;
      renderStatusChips();
      updateFilterBtn();
      renderList();
    });

    document.getElementById("arrTableBody")?.addEventListener("click", (e) => {
      const actionBtn = e.target.closest("[data-action]");
      if (actionBtn) {
        e.stopPropagation();
        handleAction(actionBtn.getAttribute("data-action"), Number(actionBtn.getAttribute("data-id")));
        return;
      }
      const row = e.target.closest("tr[data-id]");
      if (row) openDetails(Number(row.getAttribute("data-id")));
    });

    document.getElementById("arrCards")?.addEventListener("click", (e) => {
      const actionEl = e.target.closest("[data-action]");
      if (actionEl) {
        e.preventDefault();
        e.stopPropagation();
        handleAction(actionEl.getAttribute("data-action"), Number(actionEl.getAttribute("data-id")));
        return;
      }
      const card = e.target.closest(".arr-card[data-id]");
      if (card) openDetails(Number(card.getAttribute("data-id")));
    });

    document.getElementById("arrDetailBody")?.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-detail-action]");
      if (!btn || selectedId == null) return;
      const act = btn.getAttribute("data-detail-action");
      if (act === "quote") toast(t("pages.adminRouteRequests.quotePanelStub"));
      else if (act === "route") handleAction("route", selectedId);
      else if (act === "nbu") toast(t("pages.adminRouteRequests.nbuPreviewButton") + " · #" + selectedId);
      else if (act === "send") toast(t("pages.adminRouteRequests.sendProposal") + " · #" + selectedId);
    });

    document.getElementById("arrDetailClose")?.addEventListener("click", closeDetails);
    document.getElementById("arrDetailScrim")?.addEventListener("click", closeDetails);

    document.getElementById("arrFilterBtn")?.addEventListener("click", openFilterDialog);
    document.getElementById("arrFilterCancel")?.addEventListener("click", closeFilterDialog);
    document.getElementById("arrFilterScrim")?.addEventListener("click", closeFilterDialog);
    document.getElementById("arrFilterReset")?.addEventListener("click", () => {
      filters = { ...DEFAULT_FILTERS };
      pageIndex = 0;
      closeFilterDialog();
      renderStatusChips();
      updateFilterBtn();
      renderList();
    });
    document.getElementById("arrFilterForm")?.addEventListener("submit", (e) => {
      e.preventDefault();
      filters = readFilterForm();
      pageIndex = 0;
      closeFilterDialog();
      renderStatusChips();
      updateFilterBtn();
      renderList();
    });

    const refresh = () => {
      const btn = document.getElementById("arrRefresh");
      if (btn) btn.classList.add("is-busy");
      demoState = "loading";
      renderList();
      setTimeout(() => {
        demoState = "list";
        if (btn) btn.classList.remove("is-busy");
        const stateSel = document.getElementById("stateSelect");
        if (stateSel) stateSel.value = "list";
        renderList();
      }, 450);
    };
    document.getElementById("arrRefresh")?.addEventListener("click", refresh);
    document.getElementById("arrRetry")?.addEventListener("click", refresh);

    document.getElementById("arrHomeBtn")?.addEventListener("click", () => {
      if (window.GeoSunAppShell) window.GeoSunAppShell.navigateTo("main");
    });

    document.getElementById("arrPrevPage")?.addEventListener("click", () => {
      pageIndex -= 1;
      renderList();
    });
    document.getElementById("arrNextPage")?.addEventListener("click", () => {
      pageIndex += 1;
      renderList();
    });
    document.getElementById("arrPageSize")?.addEventListener("change", (e) => {
      pageSize = Number(e.target.value) || 20;
      pageIndex = 0;
      renderList();
    });

    const stateSelect = document.getElementById("stateSelect");
    if (stateSelect) {
      stateSelect.addEventListener("change", () => {
        demoState = stateSelect.value;
        pageIndex = 0;
        renderList();
      });
    }

    window.addEventListener("geosun:i18n", () => {
      fillFilterStatusOptions();
      renderStatusChips();
      updateFilterBtn();
      renderList();
    });
  }

  function initFromUrl() {
    const params = new URLSearchParams(location.search);
    if (params.get("state")) demoState = params.get("state");
    if (params.get("status")) filters.status = params.get("status") === "all" ? "" : params.get("status");
    if (params.get("pageSize")) pageSize = Number(params.get("pageSize")) || pageSize;
    const stateSelect = document.getElementById("stateSelect");
    if (stateSelect) stateSelect.value = demoState;
    const sizeSel = document.getElementById("arrPageSize");
    if (sizeSel) sizeSel.value = String(pageSize);
  }

  function init() {
    initFromUrl();
    fillOwnerDatalist();
    fillFilterStatusOptions();
    renderStatusChips();
    updateFilterBtn();
    bind();
    renderList();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
