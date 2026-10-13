/**
 * GeoSun /main dashboard — role-aware KPI / quick actions / empty states.
 * Shell chrome lives in shell.js; this module only fills #page-main widgets.
 */
(function () {
  const KPI_BY_ROLE = {
    admin: [
      { route: "admin/route-requests", icon: "inbox", titleKey: "navigation.adminRouteRequests", hintKey: "pages.main.cardQueueHint", stat: "3", trend: "+2", accent: true },
      { route: "admin/trips", icon: "map", titleKey: "navigation.adminTrips", hintKey: "pages.main.cardRoutesHint", stat: "12", trend: "4 live" },
      { route: "admin/vehicles", icon: "directions_car", titleKey: "navigation.adminVehicles", hintKey: "pages.main.cardFleetHint", stat: "28" },
      { route: "admin/users", icon: "group", titleKey: "navigation.adminUsers", hintKey: "pages.main.kpiUsersHint", stat: "64" }
    ],
    manager: [
      { route: "admin/route-requests", icon: "inbox", titleKey: "navigation.adminRouteRequests", hintKey: "pages.main.cardQueueHint", stat: "3", trend: "+2", accent: true },
      { route: "admin/trips", icon: "map", titleKey: "navigation.adminTrips", hintKey: "pages.main.cardRoutesHint", stat: "12", trend: "4 live" },
      { route: "admin/vehicles", icon: "directions_car", titleKey: "navigation.adminVehicles", hintKey: "pages.main.cardFleetHint", stat: "28" },
      { route: "admin/drivers", icon: "badge", titleKey: "navigation.adminDrivers", hintKey: "pages.main.kpiDriversHint", stat: "19" }
    ],
    driver: [
      { route: "my-trips", icon: "explore", titleKey: "navigation.myTrips", hintKey: "pages.main.kpiMyTripsHint", stat: "0", accent: true },
      { route: "profile", icon: "person", titleKey: "navigation.profile", hintKey: "pages.main.kpiProfileHint", stat: "—" }
    ],
    user: [
      { route: "routes", icon: "route", titleKey: "navigation.routes", hintKey: "pages.main.cardRoutesHint", stat: "0", accent: true },
      { route: "my-freight-requests", icon: "local_shipping", titleKey: "navigation.myFreightRequests", hintKey: "pages.main.cardFreightHint", stat: "0" },
      { route: "route-builder", icon: "add", titleKey: "pages.routeBuilder.newRoute", hintKey: "pages.main.kpiNewRouteHint", stat: "+" }
    ]
  };

  const QUICK_BY_ROLE = {
    admin: [
      { route: "admin/route-requests", icon: "inbox", titleKey: "pages.main.adminRouteRequestsLink", hintKey: "pages.main.cardQueueHint" },
      { route: "admin/trips", icon: "map", titleKey: "navigation.adminTrips", hintKey: "pages.main.cardRoutesHint" },
      { route: "admin/vehicles", icon: "directions_car", titleKey: "navigation.adminVehicles", hintKey: "pages.main.cardFleetHint" },
      { route: "admin/drivers", icon: "badge", titleKey: "navigation.adminDrivers", hintKey: "pages.main.kpiDriversHint" },
      { route: "admin/users", icon: "group", titleKey: "navigation.adminUsers", hintKey: "pages.main.kpiUsersHint" },
      { route: "my-trips", icon: "explore", titleKey: "navigation.myTrips", hintKey: "pages.main.kpiMyTripsHint" }
    ],
    manager: [
      { route: "admin/route-requests", icon: "inbox", titleKey: "pages.main.adminRouteRequestsLink", hintKey: "pages.main.cardQueueHint" },
      { route: "admin/trips", icon: "map", titleKey: "navigation.adminTrips", hintKey: "pages.main.cardRoutesHint" },
      { route: "admin/vehicles", icon: "directions_car", titleKey: "navigation.adminVehicles", hintKey: "pages.main.cardFleetHint" },
      { route: "admin/drivers", icon: "badge", titleKey: "navigation.adminDrivers", hintKey: "pages.main.kpiDriversHint" },
      { route: "my-trips", icon: "explore", titleKey: "navigation.myTrips", hintKey: "pages.main.kpiMyTripsHint" },
      { route: "profile", icon: "person", titleKey: "navigation.profile", hintKey: "pages.main.kpiProfileHint" }
    ],
    driver: [
      { route: "my-trips", icon: "explore", titleKey: "navigation.myTrips", hintKey: "pages.main.kpiMyTripsHint" },
      { route: "profile", icon: "person", titleKey: "navigation.profile", hintKey: "pages.main.kpiProfileHint" }
    ],
    user: [
      { route: "route-builder", icon: "add", titleKey: "pages.routeBuilder.newRoute", hintKey: "pages.main.kpiNewRouteHint" },
      { route: "routes", icon: "route", titleKey: "navigation.routes", hintKey: "pages.main.cardRoutesHint" },
      { route: "my-freight-requests", icon: "local_shipping", titleKey: "pages.main.freightCalculationLink", hintKey: "pages.main.cardFreightHint" },
      { route: "profile", icon: "person", titleKey: "navigation.profile", hintKey: "pages.main.kpiProfileHint" }
    ]
  };

  /** Empty-state copy: prefer real module empty keys from i18n */
  const ACTIVITY_BY_ROLE = {
    admin: {
      icon: "inbox",
      titleKey: "pages.adminRouteRequests.empty",
      bodyKey: "pages.main.activityEmptyBody",
      ctaRoute: "admin/route-requests",
      ctaKey: "pages.main.adminRouteRequestsLink"
    },
    manager: {
      icon: "inbox",
      titleKey: "pages.adminRouteRequests.empty",
      bodyKey: "pages.main.activityEmptyBody",
      ctaRoute: "admin/route-requests",
      ctaKey: "pages.main.adminRouteRequestsLink"
    },
    driver: {
      icon: "explore",
      titleKey: "pages.myTrips.empty",
      bodyKey: "pages.main.activityEmptyBodyDriver",
      ctaRoute: "my-trips",
      ctaKey: "navigation.myTrips"
    },
    user: {
      icon: "route",
      titleKey: "pages.routes.empty",
      bodyKey: "pages.main.activityEmptyBodyUser",
      ctaRoute: "route-builder",
      ctaKey: "pages.routeBuilder.newRoute"
    }
  };

  function t(key) {
    const shell = window.GeoSunAppShell;
    if (shell && typeof shell.t === "function") return shell.t(key);
    const lang = document.documentElement.getAttribute("lang") || "uk";
    const dict = (window.GEOSUN_I18N && (window.GEOSUN_I18N[lang] || window.GEOSUN_I18N.uk)) || {};
    return dict[key] || key;
  }

  function navigate(route) {
    if (window.GeoSunAppShell && typeof window.GeoSunAppShell.navigateTo === "function") {
      window.GeoSunAppShell.navigateTo(route);
    }
  }

  function currentRole() {
    if (window.GeoSunAppShell && window.GeoSunAppShell.getRole) return window.GeoSunAppShell.getRole();
    const select = document.getElementById("roleSelect");
    return (select && select.value) || "admin";
  }

  function renderKpis() {
    const grid = document.getElementById("kpiGrid");
    if (!grid) return;
    const role = currentRole();
    const items = KPI_BY_ROLE[role] || KPI_BY_ROLE.user;
    grid.innerHTML = "";
    items.forEach((item) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "kpi-card";
      btn.setAttribute("data-nav", item.route);
      btn.innerHTML =
        '<div class="kpi-card-top">' +
        '<span class="kpi-icon' + (item.accent ? " is-accent" : "") + '"><span class="material-symbols-outlined" aria-hidden="true">' +
        item.icon +
        "</span></span>" +
        (item.trend ? '<span class="kpi-trend">' + item.trend + "</span>" : "") +
        "</div>" +
        '<div class="kpi-stat">' + item.stat + "</div>" +
        '<div class="kpi-title">' + t(item.titleKey) + "</div>" +
        '<div class="kpi-hint">' + t(item.hintKey) + "</div>";
      btn.addEventListener("click", () => navigate(item.route));
      grid.appendChild(btn);
    });
  }

  function renderQuick() {
    const grid = document.getElementById("quickGrid");
    if (!grid) return;
    const role = currentRole();
    const items = QUICK_BY_ROLE[role] || QUICK_BY_ROLE.user;
    grid.innerHTML = "";
    items.forEach((item) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "quick-tile";
      btn.setAttribute("data-nav", item.route);
      btn.innerHTML =
        '<span class="quick-tile-icon"><span class="material-symbols-outlined" aria-hidden="true">' +
        item.icon +
        "</span></span>" +
        '<span class="quick-tile-body"><span class="quick-tile-title">' +
        t(item.titleKey) +
        '</span><span class="quick-tile-hint">' +
        t(item.hintKey) +
        '</span></span><span class="material-symbols-outlined quick-tile-chevron" aria-hidden="true">chevron_right</span>';
      btn.addEventListener("click", () => navigate(item.route));
      grid.appendChild(btn);
    });
  }

  function renderActivity() {
    const role = currentRole();
    const cfg = ACTIVITY_BY_ROLE[role] || ACTIVITY_BY_ROLE.user;
    const iconEl = document.getElementById("activityEmptyIcon");
    const titleEl = document.getElementById("activityEmptyTitle");
    const bodyEl = document.getElementById("activityEmptyBody");
    const cta = document.getElementById("activityCta");
    const ctaLabel = document.getElementById("activityCtaLabel");
    if (iconEl) iconEl.textContent = cfg.icon;
    if (titleEl) {
      titleEl.setAttribute("data-i18n", cfg.titleKey);
      titleEl.textContent = t(cfg.titleKey);
    }
    if (bodyEl) {
      bodyEl.setAttribute("data-i18n", cfg.bodyKey);
      bodyEl.textContent = t(cfg.bodyKey);
    }
    if (cta) {
      cta.setAttribute("data-nav", cfg.ctaRoute);
      cta.onclick = () => navigate(cfg.ctaRoute);
    }
    if (ctaLabel) {
      ctaLabel.setAttribute("data-i18n", cfg.ctaKey);
      ctaLabel.textContent = t(cfg.ctaKey);
    }
  }

  function refreshMain() {
    renderKpis();
    renderQuick();
    renderActivity();
  }

  // Hook into shell role / lang changes
  function patchShell() {
    const shell = window.GeoSunAppShell;
    if (!shell) return;
    const origSetRole = shell.setRole;
    const origSetLang = shell.setLang;
    if (typeof origSetRole === "function") {
      shell.setRole = function (role) {
        origSetRole(role);
        refreshMain();
      };
    }
    if (typeof origSetLang === "function") {
      shell.setLang = function (lang) {
        origSetLang(lang);
        refreshMain();
      };
    }
    // Expose helpers
    if (!shell.getRole) {
      shell.getRole = currentRole;
    }
    if (!shell.t) {
      shell.t = t;
    }
    shell.refreshMain = refreshMain;
  }

  // Role chips already toggled by shell.js via #managerBanner / #adminBanner
  // Ensure they use .is-visible class (shell sets it)

  const cta = document.getElementById("activityCta");
  if (cta) {
    cta.addEventListener("click", () => {
      const route = cta.getAttribute("data-nav");
      if (route) navigate(route);
    });
  }

  // Wait a tick so shell.js init finishes
  function boot() {
    patchShell();
    refreshMain();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => setTimeout(boot, 0));
  } else {
    setTimeout(boot, 0);
  }
})();
