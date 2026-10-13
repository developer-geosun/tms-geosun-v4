(function () {
  const DEMO_POINTS = [
    {
      lat: 49.8397,
      lng: 24.0297,
      address: "Львів, Україна",
      country: "ua",
      isBorder: false,
      operations: ["LOADING", "EXPORT_CUSTOMS"],
      mapX: 62,
      mapY: 58
    },
    {
      lat: 49.7947,
      lng: 22.7747,
      address: "Краківець — Корчова",
      country: "ua",
      isBorder: true,
      operations: [],
      mapX: 48,
      mapY: 46
    },
    {
      lat: 52.2297,
      lng: 21.0122,
      address: "Варшава, Польща",
      country: "pl",
      isBorder: false,
      operations: ["IMPORT_CUSTOMS", "UNLOADING"],
      mapX: 38,
      mapY: 28
    }
  ];

  const DEMO_SEGMENTS_KM = [78.4, 342.1];
  const TOTAL_KM = 420.5;

  const SEARCH_DEMO = {
    uk: [
      "Київ, Україна",
      "Одеса, Україна",
      "Краків, Польща",
      "Люблін, Польща"
    ],
    en: [
      "Kyiv, Ukraine",
      "Odesa, Ukraine",
      "Kraków, Poland",
      "Lublin, Poland"
    ],
    ru: [
      "Киев, Украина",
      "Одесса, Украина",
      "Краков, Польша",
      "Люблин, Польша"
    ]
  };

  const CHECKPOINTS = {
    pl: [
      { uk: "Краківець — Корчова", en: "Krakovets — Korczowa", ru: "Краковец — Корчова" },
      { uk: "Шегині — Медика", en: "Shehyni — Medyka", ru: "Шегини — Медика" }
    ],
    sk: [{ uk: "Ужгород — Вишнє Німецьке", en: "Uzhhorod — Vyšné Nemecké", ru: "Ужгород — Вышнее Немецкое" }],
    hu: [{ uk: "Чоп — Захонь", en: "Chop — Záhony", ru: "Чоп — Захонь" }],
    ro: [{ uk: "Порубне — Сірет", en: "Porubne — Siret", ru: "Порубное — Сирет" }],
    md: [{ uk: "Маяки — Удобне", en: "Mayaky — Udobne", ru: "Маяки — Удобное" }]
  };

  let mode = "create"; // create | edit | view
  let points = DEMO_POINTS.map((p) => ({ ...p, operations: [...p.operations] }));
  let selectedIndex = 0;
  let mobilePanel = "sidebar"; // sidebar | map
  let searchQuery = "";
  let borderCountry = "pl";
  let borderCheckpoint = "0";
  let showSearchResults = false;

  function t(key) {
    if (window.GeoSunAppShell && window.GeoSunAppShell.t) return window.GeoSunAppShell.t(key);
    const lang = document.documentElement.lang || "uk";
    const dict = (window.GEOSUN_I18N && window.GEOSUN_I18N[lang]) || {};
    return dict[key] || key;
  }

  function lang() {
    return document.documentElement.lang || "uk";
  }

  function isView() {
    return mode === "view";
  }
  function isEdit() {
    return mode === "edit";
  }
  function isCreate() {
    return mode === "create";
  }
  function canEdit() {
    return isCreate() || isEdit();
  }

  function modeTitleKey() {
    if (isView()) return "pages.routeBuilder.modeTitleView";
    if (isEdit()) return "pages.routeBuilder.modeTitleEdit";
    return "pages.routeBuilder.modeTitleCreate";
  }

  function pointLabelKey(index, point) {
    if (index === 0) return "pages.freightCalculation.labels.start";
    if (index === points.length - 1) return "pages.freightCalculation.labels.finish";
    if (point.isBorder) return "pages.freightCalculation.labels.border";
    return "pages.freightCalculation.labels.stop";
  }

  function formatCoords(p) {
    return p.lat.toFixed(5) + ", " + p.lng.toFixed(5);
  }

  function totalKm() {
    if (!points.length) return "0.0";
    return TOTAL_KM.toFixed(1);
  }

  function setMode(next) {
    mode = next;
    const params = new URLSearchParams(location.search);
    params.set("mode", next);
    history.replaceState({}, "", location.pathname + "?" + params.toString());
    const sel = document.getElementById("rbModeSelect");
    if (sel && sel.value !== next) sel.value = next;
    render();
  }

  function setMobilePanel(next) {
    mobilePanel = next;
    renderLayoutClass();
    updateToggleFab();
  }

  function renderLayoutClass() {
    const layout = document.getElementById("rbLayout");
    if (!layout) return;
    layout.classList.remove("rb-layout--sidebar", "rb-layout--map");
    if (window.matchMedia("(max-width: 1099.98px)").matches) {
      layout.classList.add(mobilePanel === "map" ? "rb-layout--map" : "rb-layout--sidebar");
    }
  }

  function updateToggleFab() {
    const fab = document.getElementById("rbPanelToggle");
    if (!fab) return;
    const showMap = mobilePanel !== "map";
    fab.setAttribute("data-target", showMap ? "map" : "sidebar");
    fab.setAttribute("aria-label", t(showMap ? "pages.routeBuilder.showMap" : "pages.routeBuilder.showSidebar"));
    fab.title = fab.getAttribute("aria-label");
    fab.innerHTML =
      '<span class="material-symbols-outlined" aria-hidden="true">' +
      (showMap ? "map" : "view_list") +
      "</span>";
  }

  function renderActions() {
    const root = document.getElementById("rbActions");
    if (!root) return;

    const title = t(modeTitleKey());
    let metaHtml = "";
    if (isView() || isEdit()) {
      metaHtml =
        '<div class="rb-meta">' +
        "<small>" +
        t("pages.routeBuilder.routeId") +
        ": #1042</small>" +
        (isView()
          ? "<small>" +
            t("pages.routes.createdAt") +
            ": 12.09.2026 10:14</small><small>" +
            t("pages.routes.savedAt") +
            ": 28.09.2026 16:02</small><small>" +
            t("pages.routes.lastOpenedAt") +
            ": 30.09.2026 09:40</small>"
          : "") +
        "</div>";
    }

    let btns = "";
    if (isView()) {
      btns =
        '<div class="rb-actions__btns rb-actions__btns--view">' +
        '<button type="button" class="rb-mini-fab" data-action="to-routes" title="' +
        t("pages.freightCalculation.myRoutes") +
        '" aria-label="' +
        t("pages.freightCalculation.myRoutes") +
        '"><span class="material-symbols-outlined" aria-hidden="true">route</span></button>' +
        '<button type="button" class="rb-mini-fab" data-action="to-edit" title="' +
        t("pages.routeBuilder.editRoute") +
        '" aria-label="' +
        t("pages.routeBuilder.editRoute") +
        '"><span class="material-symbols-outlined" aria-hidden="true">edit</span></button>' +
        '<button type="button" class="rb-mini-fab" data-action="to-create" title="' +
        t("pages.routeBuilder.newRoute") +
        '" aria-label="' +
        t("pages.routeBuilder.newRoute") +
        '"><span class="material-symbols-outlined" aria-hidden="true">add</span></button>' +
        '<button type="button" class="rb-mini-fab rb-mini-fab--danger" data-action="delete" title="' +
        t("pages.routeBuilder.deleteRoute") +
        '" aria-label="' +
        t("pages.routeBuilder.deleteRoute") +
        '"><span class="material-symbols-outlined" aria-hidden="true">delete</span></button>' +
        '<button type="button" class="rb-btn rb-btn--freight" data-action="freight">' +
        t("pages.freightCalculation.openRequest") +
        "</button></div>";
    } else if (isEdit()) {
      btns =
        '<div class="rb-actions__btns rb-actions__btns--edit">' +
        '<button type="button" class="rb-btn rb-btn--outline" data-action="clear">' +
        t("pages.freightCalculation.clear") +
        "</button>" +
        '<button type="button" class="rb-btn rb-btn--outline" data-action="clear-ops">' +
        t("pages.routeBuilder.clearOperations") +
        "</button>" +
        '<button type="button" class="rb-btn rb-btn--primary" data-action="save">' +
        t("pages.routeBuilder.saveChanges") +
        "</button>" +
        '<button type="button" class="rb-btn rb-btn--tonal" data-action="cancel-edit">' +
        t("pages.routeBuilder.cancelEdit") +
        "</button></div>";
    } else {
      btns =
        '<div class="rb-actions__btns rb-actions__btns--create">' +
        '<button type="button" class="rb-btn rb-btn--outline" data-action="clear">' +
        t("pages.freightCalculation.clear") +
        "</button>" +
        '<button type="button" class="rb-btn rb-btn--outline" data-action="clear-ops">' +
        t("pages.routeBuilder.clearOperations") +
        "</button>" +
        '<button type="button" class="rb-btn rb-btn--primary" data-action="save">' +
        t("pages.routeBuilder.createRoute") +
        "</button></div>";
    }

    let searchHtml = "";
    if (canEdit()) {
      const results = showSearchResults
        ? (SEARCH_DEMO[lang()] || SEARCH_DEMO.uk)
            .map(
              (name, i) =>
                '<button type="button" data-search-pick="' +
                i +
                '"' +
                (i === 0 ? ' class="is-active"' : "") +
                ">" +
                name +
                "</button>"
            )
            .join("")
        : "";
      searchHtml =
        '<div class="rb-search">' +
        '<span class="material-symbols-outlined rb-search-icon" aria-hidden="true">search</span>' +
        '<input class="rb-search-field" id="rbSearchInput" type="search" autocomplete="off" placeholder="' +
        t("pages.freightCalculation.searchPlaceholder") +
        '" value="' +
        searchQuery.replace(/"/g, "&quot;") +
        '" />' +
        (showSearchResults
          ? '<span class="rb-search-note">' + t("pages.routeBuilder.searchDemoHint") + "</span>"
          : "") +
        (results ? '<div class="rb-results">' + results + "</div>" : "") +
        "</div>";
    }

    root.innerHTML =
      '<div class="rb-actions__head">' +
      '<h1 class="rb-actions__title">' +
      title +
      "</h1>" +
      '<span class="rb-distance"><span class="rb-distance__val">' +
      totalKm() +
      "</span><span>" +
      t("pages.freightCalculation.km") +
      "</span></span></div>" +
      metaHtml +
      btns +
      searchHtml;
  }

  function renderPoints() {
    const list = document.getElementById("rbPoints");
    if (!list) return;
    if (!points.length) {
      list.innerHTML =
        '<div class="rb-points-empty">' + t("pages.freightCalculation.pointsListEmpty") + "</div>";
      return;
    }

    let html = "";
    points.forEach((point, index) => {
      const selected = index === selectedIndex ? " is-selected" : "";
      const border = point.isBorder ? " is-border" : "";
      let opsHtml = "";
      if (isView()) {
        opsHtml =
          '<div class="rb-ops">' +
          point.operations
            .map(
              (op) =>
                '<span class="rb-op-chip">' + t("pages.routeBuilder.operations." + op) + "</span>"
            )
            .join("") +
          "</div>";
      } else {
        const allowed = point.isBorder
          ? []
          : ["LOADING", "EXPORT_CUSTOMS", "IMPORT_CUSTOMS", "UNLOADING"];
        opsHtml =
          '<div class="rb-op-checks">' +
          allowed
            .map((op) => {
              const checked = point.operations.includes(op) ? " checked" : "";
              return (
                '<label class="rb-op-check"><input type="checkbox" data-op="' +
                op +
                '" data-point="' +
                index +
                '"' +
                checked +
                " /><span>" +
                t("pages.routeBuilder.operations." + op) +
                "</span></label>"
              );
            })
            .join("") +
          "</div>";
      }

      const removeBtn = canEdit()
        ? '<button type="button" class="rb-point-remove" data-remove="' +
          index +
          '" aria-label="' +
          t("pages.freightCalculation.clear") +
          '"><span class="material-symbols-outlined" aria-hidden="true">close</span></button>'
        : "<span></span>";

      html +=
        '<div class="rb-point' +
        selected +
        border +
        '" data-point-index="' +
        index +
        '" role="button" tabindex="0">' +
        '<div class="rb-point-order">' +
        (index + 1) +
        "</div>" +
        '<div class="rb-point-main"><strong>' +
        t(pointLabelKey(index, point)) +
        '</strong><span class="rb-point-addr">' +
        point.address +
        '</span><button type="button" class="rb-coord-chip" data-copy="' +
        index +
        '" title="' +
        t("pages.routeBuilder.copyCoordinates") +
        '"><span class="material-symbols-outlined" aria-hidden="true">content_copy</span>' +
        formatCoords(point) +
        "</button>" +
        opsHtml +
        "</div>" +
        removeBtn +
        "</div>";

      if (index < points.length - 1) {
        const km = DEMO_SEGMENTS_KM[index];
        if (km != null) {
          html +=
            '<div class="rb-segment"><span>' +
            km.toFixed(1) +
            " " +
            t("pages.freightCalculation.km") +
            "</span></div>";
        }
        // Border picker demo between UA start and next non-border foreign if needed —
        // show when create/edit and there's a pending border between non-border countries
        const next = points[index + 1];
        if (
          canEdit() &&
          point.country &&
          next &&
          next.country &&
          point.country !== next.country &&
          !point.isBorder &&
          !next.isBorder &&
          (point.country === "ua" || next.country === "ua")
        ) {
          html += renderBorderPicker(index);
        }
      }
    });

    // Also show border picker after first point when create has border already —
    // if we don't have a pending case, show picker after point 0→1 when border exists? skip.
    // Demo: when only 2 points UA→PL without border inserted, show picker between them.
    // Our DEMO already has border, so only show if we clear border.
    list.innerHTML = html;
  }

  function renderBorderPicker(segmentIndex) {
    const countries = ["pl", "sk", "hu", "ro", "md"];
    const cps = CHECKPOINTS[borderCountry] || [];
    return (
      '<div class="rb-border-picker" data-segment="' +
      segmentIndex +
      '"><div class="rb-border-picker__title">' +
      t("pages.freightCalculation.selectBorder") +
      '</div><div class="rb-field"><label>' +
      t("pages.freightCalculation.selectCountry") +
      '</label><select data-border-country="' +
      segmentIndex +
      '"><option value="">' +
      t("pages.freightCalculation.notSelected") +
      "</option>" +
      countries
        .map((c) => {
          const sel = c === borderCountry ? " selected" : "";
          return (
            '<option value="' +
            c +
            '"' +
            sel +
            ">" +
            t("pages.freightCalculation.countries." + c) +
            "</option>"
          );
        })
        .join("") +
      '</select></div><div class="rb-field"><label>' +
      t("pages.freightCalculation.selectCheckpoint") +
      '</label><select data-border-cp="' +
      segmentIndex +
      '"' +
      (borderCountry ? "" : " disabled") +
      '><option value="">' +
      t("pages.freightCalculation.notSelected") +
      "</option>" +
      cps
        .map((cp, i) => {
          const name = cp[lang()] || cp.uk;
          const sel = String(i) === borderCheckpoint ? " selected" : "";
          return '<option value="' + i + '"' + sel + ">" + name + "</option>";
        })
        .join("") +
      "</select></div></div>"
    );
  }

  function renderMap() {
    const markersHost = document.getElementById("rbMapMarkers");
    const routeLine = document.getElementById("rbRouteLine");
    if (!markersHost) return;

    markersHost.innerHTML = points
      .map((p, i) => {
        const cls =
          "rb-map-marker" +
          (p.isBorder ? " is-border" : "") +
          (i === selectedIndex ? " is-selected" : "");
        return (
          '<button type="button" class="' +
          cls +
          '" style="left:' +
          p.mapX +
          "%;top:" +
          p.mapY +
          '%" data-map-point="' +
          i +
          '" aria-label="' +
          (i + 1) +
          '">' +
          (i + 1) +
          "</button>"
        );
      })
      .join("");

    if (routeLine && points.length >= 2) {
      const pts = points
        .map((p) => (p.mapX / 100) * 1000 + "," + (p.mapY / 100) * 640)
        .join(" ");
      routeLine.setAttribute("points", pts);
    }

    const hint = document.getElementById("rbMapHintText");
    if (hint) hint.textContent = t("pages.routeBuilder.mapHint");
  }

  function render() {
    renderLayoutClass();
    updateToggleFab();
    renderActions();
    renderPoints();
    renderMap();
  }

  function bind() {
    const layout = document.getElementById("rbLayout");
    if (!layout) return;

    document.getElementById("rbPanelToggle")?.addEventListener("click", () => {
      setMobilePanel(mobilePanel === "map" ? "sidebar" : "map");
    });

    document.getElementById("rbActions")?.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-action]");
      if (!btn) return;
      const action = btn.getAttribute("data-action");
      if (action === "to-edit") setMode("edit");
      else if (action === "to-create") {
        points = DEMO_POINTS.map((p) => ({ ...p, operations: [...p.operations] }));
        selectedIndex = 0;
        setMode("create");
      } else if (action === "to-routes") {
        if (window.GeoSunAppShell) window.GeoSunAppShell.navigateTo("routes");
      } else if (action === "cancel-edit") setMode("view");
      else if (action === "clear") {
        points = [];
        selectedIndex = -1;
        render();
      } else if (action === "clear-ops") {
        points = points.map((p) => ({ ...p, operations: [] }));
        render();
      } else if (action === "save") {
        btn.textContent = "✓ " + t(isEdit() ? "pages.routeBuilder.saveChanges" : "pages.routeBuilder.createRoute");
        setTimeout(() => setMode("view"), 450);
      } else if (action === "delete") {
        if (confirm(t("pages.routeBuilder.deleteRoute") + "?")) {
          points = [];
          render();
        }
      } else if (action === "freight") {
        alert(t("pages.freightCalculation.openRequest") + " (demo)");
      }
    });

    document.getElementById("rbActions")?.addEventListener("input", (e) => {
      if (e.target.id === "rbSearchInput") {
        searchQuery = e.target.value;
        showSearchResults = searchQuery.trim().length > 0;
        renderActions();
        const input = document.getElementById("rbSearchInput");
        if (input) {
          input.focus();
          input.setSelectionRange(searchQuery.length, searchQuery.length);
        }
      }
    });

    document.getElementById("rbActions")?.addEventListener("click", (e) => {
      const pick = e.target.closest("[data-search-pick]");
      if (!pick) return;
      const names = SEARCH_DEMO[lang()] || SEARCH_DEMO.uk;
      const name = names[+pick.getAttribute("data-search-pick")];
      points.push({
        lat: 50 + Math.random(),
        lng: 24 + Math.random(),
        address: name,
        country: "ua",
        isBorder: false,
        operations: [],
        mapX: 30 + Math.random() * 40,
        mapY: 30 + Math.random() * 40
      });
      searchQuery = "";
      showSearchResults = false;
      selectedIndex = points.length - 1;
      render();
    });

    document.getElementById("rbPoints")?.addEventListener("click", (e) => {
      const copy = e.target.closest("[data-copy]");
      if (copy) {
        e.stopPropagation();
        const i = +copy.getAttribute("data-copy");
        const text = formatCoords(points[i]);
        if (navigator.clipboard) navigator.clipboard.writeText(text).catch(() => {});
        copy.title = t("pages.routeBuilder.coordinatesCopied");
        return;
      }
      const remove = e.target.closest("[data-remove]");
      if (remove) {
        e.stopPropagation();
        const i = +remove.getAttribute("data-remove");
        points.splice(i, 1);
        if (selectedIndex >= points.length) selectedIndex = points.length - 1;
        render();
        return;
      }
      const op = e.target.closest("input[data-op]");
      if (op) {
        e.stopPropagation();
        const i = +op.getAttribute("data-point");
        const code = op.getAttribute("data-op");
        const set = new Set(points[i].operations);
        if (op.checked) set.add(code);
        else set.delete(code);
        points[i].operations = Array.from(set);
        return;
      }
      const row = e.target.closest("[data-point-index]");
      if (row) {
        selectedIndex = +row.getAttribute("data-point-index");
        render();
      }
    });

    document.getElementById("rbPoints")?.addEventListener("change", (e) => {
      const countrySel = e.target.closest("[data-border-country]");
      if (countrySel) {
        borderCountry = countrySel.value;
        borderCheckpoint = "";
        renderPoints();
        return;
      }
      const cpSel = e.target.closest("[data-border-cp]");
      if (cpSel) {
        borderCheckpoint = cpSel.value;
      }
    });

    document.getElementById("rbMapMarkers")?.addEventListener("click", (e) => {
      const m = e.target.closest("[data-map-point]");
      if (!m) return;
      selectedIndex = +m.getAttribute("data-map-point");
      render();
    });

    document.getElementById("rbModeSelect")?.addEventListener("change", (e) => {
      setMode(e.target.value);
    });

    window.addEventListener("resize", () => {
      renderLayoutClass();
      updateToggleFab();
    });
    window.addEventListener("geosun:i18n", render);
  }

  function init() {
    const params = new URLSearchParams(location.search);
    const m = params.get("mode");
    if (m === "view" || m === "edit" || m === "create") mode = m;
    if (params.get("panel") === "map") mobilePanel = "map";
    const sel = document.getElementById("rbModeSelect");
    if (sel) sel.value = mode;
    bind();
    render();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();

  window.GeoSunRouteBuilder = {
    setMode,
    setMobilePanel,
    render,
    getMode: () => mode,
    getPanel: () => mobilePanel
  };
})();
