(function () {
  const THEMES = ["azure-blue", "rose-red", "magenta-violet", "cyan-orange"];
  const LANGS = ["uk", "en", "ru"];
  const THEME_KEY = "geosun-app-theme";
  const LANG_KEY = "geosun-app-lang";
  const ROLE_KEY = "geosun-app-role";
  const LANG_CODES = { uk: "UK", en: "EN", ru: "RU" };

  /** From toolbar.component.ts navigationItems — icons filled where Angular had none */
  const NAV_ITEMS = [
    { route: "main", labelKey: "navigation.main", icon: "home", roles: ["admin", "manager", "driver", "user"], section: "overview" },
    { route: "profile", labelKey: "navigation.profile", icon: "person", roles: ["admin", "manager", "driver", "user"], section: "overview" },
    { route: "my-trips", labelKey: "navigation.myTrips", icon: "explore", roles: ["admin", "manager", "driver"], section: "overview" },
    { route: "route-builder", labelKey: "pages.routeBuilder.newRoute", icon: "add", roles: ["user"], section: "user" },
    { route: "routes", labelKey: "navigation.routes", icon: "route", roles: ["user"], section: "user" },
    { route: "my-freight-requests", labelKey: "navigation.myFreightRequests", icon: "local_shipping", roles: ["user"], section: "user" },
    { route: "admin/route-requests", labelKey: "navigation.adminRouteRequests", icon: "inbox", roles: ["admin", "manager"], section: "ops" },
    { route: "admin/trips", labelKey: "navigation.adminTrips", icon: "map", roles: ["admin", "manager"], section: "ops" },
    { route: "admin/vehicles", labelKey: "navigation.adminVehicles", icon: "directions_car", roles: ["admin", "manager"], section: "ops" },
    { route: "admin/drivers", labelKey: "navigation.adminDrivers", icon: "badge", roles: ["admin", "manager"], section: "ops" },
    { route: "admin/vehicle-combinations", labelKey: "navigation.adminVehicleCombinations", icon: "airport_shuttle", roles: ["admin", "manager"], section: "ops" },
    { route: "admin/currencies", labelKey: "navigation.adminCurrencies", icon: "payments", roles: ["admin", "manager"], section: "refs" },
    { route: "admin/country-reference", labelKey: "navigation.adminCountryReference", icon: "public", roles: ["admin", "manager"], section: "refs" },
    { route: "admin/freight-numeric-scenarios", labelKey: "navigation.adminFreightNumericScenarios", icon: "analytics", roles: ["admin", "manager"], section: "refs" },
    { route: "admin/toll-tariff-sets", labelKey: "navigation.adminTollTariffSets", icon: "toll", roles: ["admin", "manager"], section: "refs" },
    { route: "admin/document-types", labelKey: "navigation.adminDocumentTypes", icon: "description", roles: ["admin"], section: "refs" },
    { route: "admin/chatbots", labelKey: "navigation.adminChatbots", icon: "smart_toy", roles: ["admin", "manager"], section: "system" },
    { route: "admin/users", labelKey: "navigation.adminUsers", icon: "group", roles: ["admin", "manager"], section: "system" },
    { route: "admin/file-storage-test", labelKey: "navigation.adminFileStorageTest", icon: "folder", roles: ["admin"], section: "system" }
  ];

  const SECTION_KEYS = {
    overview: "shell.sectionOverview",
    user: "shell.sectionUser",
    ops: "shell.sectionOps",
    refs: "shell.sectionRefs",
    system: "shell.sectionSystem"
  };

  const DEMO_USERS = {
    admin: { email: "admin@geosun.demo", initials: "АД", name: "Admin GeoSun" },
    manager: { email: "manager@geosun.demo", initials: "МН", name: "Manager GeoSun" },
    driver: { email: "driver@geosun.demo", initials: "ВД", name: "Driver GeoSun" },
    user: { email: "user@geosun.demo", initials: "КР", name: "User GeoSun" }
  };

  const I18N = window.GEOSUN_I18N || {};
  const root = document.documentElement;
  let currentLang = "uk";
  let currentRole = "admin";
  let currentRoute = "admin/file-storage-test";
  let drawerOpen = false;

  function t(key) {
    const dict = I18N[currentLang] || I18N.uk || {};
    return dict[key] || (I18N.en && I18N.en[key]) || key;
  }

  function applyI18n() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (key) el.textContent = t(key);
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const key = el.getAttribute("data-i18n-aria");
      if (key) el.setAttribute("aria-label", t(key));
    });
    root.setAttribute("lang", currentLang);
    updatePageTitle();
    renderNav();
    window.dispatchEvent(new CustomEvent("geosun:i18n"));
  }

  function updatePageTitle() {
    const item = NAV_ITEMS.find((n) => n.route === currentRoute);
    const title = item ? t(item.labelKey) : t("pages.main.title");
    const titleEl = document.getElementById("pageTitle");
    if (titleEl) titleEl.textContent = title;
    document.title = "GeoSun TMS — " + title + " · Material Dev Prototype";
  }

  function canAccess(roles) {
    return roles.includes(currentRole);
  }

  function renderNavInto(container) {
    if (!container) return;
    container.innerHTML = "";
    const visible = NAV_ITEMS.filter((item) => canAccess(item.roles));
    let lastSection = null;
    visible.forEach((item) => {
      if (item.section !== lastSection) {
        lastSection = item.section;
        const section = document.createElement("div");
        section.className = "nav-section";
        const label = document.createElement("div");
        label.className = "nav-section-label";
        label.textContent = t(SECTION_KEYS[item.section] || item.section);
        section.appendChild(label);
        container.appendChild(section);
      }
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "nav-item" + (item.route === currentRoute ? " is-active" : "");
      btn.setAttribute("data-nav", item.route);
      if (item.route === currentRoute) btn.setAttribute("aria-current", "page");
      btn.innerHTML =
        '<span class="material-symbols-outlined" aria-hidden="true">' +
        item.icon +
        '</span><span class="nav-item-label">' +
        t(item.labelKey) +
        "</span>";
      btn.addEventListener("click", () => navigateTo(item.route));
      const parent = container.lastElementChild && container.lastElementChild.classList.contains("nav-section")
        ? container.lastElementChild
        : container;
      parent.appendChild(btn);
    });
  }

  function renderNav() {
    renderNavInto(document.getElementById("desktopNav"));
    renderNavInto(document.getElementById("mobileNav"));
  }

  function navigateTo(route) {
    currentRoute = route;
    const params = new URLSearchParams(location.search);
    params.set("page", route);
    const qs = params.toString();
    history.replaceState({ page: route }, "", location.pathname + (qs ? "?" + qs : "") + (route === "admin/file-storage-test" ? "" : "#" + route));

    const mainPage = document.getElementById("page-admin-file-storage-test");
    const stubPage = document.getElementById("page-stub");
    if (route === "admin/file-storage-test") {
      if (mainPage) {
        mainPage.hidden = false;
        mainPage.classList.add("is-active");
      }
      if (stubPage) {
        stubPage.hidden = true;
        stubPage.classList.remove("is-active");
      }
    } else {
      if (mainPage) {
        mainPage.hidden = true;
        mainPage.classList.remove("is-active");
      }
      if (stubPage) {
        stubPage.hidden = false;
        stubPage.classList.add("is-active");
        const item = NAV_ITEMS.find((n) => n.route === route);
        const stubTitle = document.getElementById("stubTitle");
        if (stubTitle) stubTitle.textContent = item ? t(item.labelKey) : route;
      }
    }
    updatePageTitle();
    renderNav();
    closeDrawer();
    closeMenus();
  }

  /* ---------- Theme / Lang / User menus ---------- */
  const themeMenuBtn = document.getElementById("themeMenuBtn");
  const themeMenu = document.getElementById("themeMenu");
  const langMenuBtn = document.getElementById("langMenuBtn");
  const langMenu = document.getElementById("langMenu");
  const langCodeLabel = document.getElementById("langCodeLabel");
  const userMenuBtn = document.getElementById("userMenuBtn");
  const userMenu = document.getElementById("userMenu");

  function closeMenus() {
    [themeMenu, langMenu, userMenu].forEach((menu) => {
      if (!menu) return;
      menu.classList.remove("is-open");
      menu.hidden = true;
    });
    if (themeMenuBtn) themeMenuBtn.setAttribute("aria-expanded", "false");
    if (langMenuBtn) langMenuBtn.setAttribute("aria-expanded", "false");
    if (userMenuBtn) userMenuBtn.setAttribute("aria-expanded", "false");
  }

  function openMenu(menu, btn) {
    const willOpen = menu.hidden || !menu.classList.contains("is-open");
    closeMenus();
    if (!willOpen) return;
    menu.hidden = false;
    menu.classList.add("is-open");
    btn.setAttribute("aria-expanded", "true");
  }

  function setLang(lang) {
    if (!LANGS.includes(lang)) lang = "uk";
    currentLang = lang;
    localStorage.setItem(LANG_KEY, lang);
    if (langCodeLabel) langCodeLabel.textContent = LANG_CODES[lang] || lang.toUpperCase();
    document.querySelectorAll("#langMenu [data-lang]").forEach((btn) => {
      btn.setAttribute("aria-checked", btn.getAttribute("data-lang") === lang ? "true" : "false");
    });
    applyI18n();
  }

  function setTheme(theme) {
    if (!THEMES.includes(theme)) theme = "azure-blue";
    root.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
    document.querySelectorAll("#themeMenu [data-theme-id]").forEach((btn) => {
      btn.setAttribute("aria-checked", btn.getAttribute("data-theme-id") === theme ? "true" : "false");
    });
  }

  function setRole(role) {
    if (!DEMO_USERS[role]) role = "user";
    currentRole = role;
    localStorage.setItem(ROLE_KEY, role);
    const user = DEMO_USERS[role];
    const avatar = document.getElementById("userAvatar");
    const name = document.getElementById("userName");
    const email = document.getElementById("userMenuEmail");
    const roleEl = document.getElementById("userMenuRole");
    const signedIn = document.getElementById("signedInEmail");
    if (avatar) avatar.textContent = user.initials;
    if (name) name.textContent = user.email;
    if (email) email.textContent = user.email;
    if (roleEl) roleEl.textContent = role;
    if (signedIn) signedIn.textContent = user.email;

    const managerBanner = document.getElementById("managerBanner");
    const adminBanner = document.getElementById("adminBanner");
    if (managerBanner) managerBanner.classList.toggle("is-visible", role === "admin" || role === "manager");
    if (adminBanner) adminBanner.classList.toggle("is-visible", role === "admin");

    const roleSelect = document.getElementById("roleSelect");
    if (roleSelect && roleSelect.value !== role) roleSelect.value = role;

    if (!canAccess((NAV_ITEMS.find((n) => n.route === currentRoute) || {}).roles || ["admin"])) {
      const fallback = NAV_ITEMS.find((n) => canAccess(n.roles));
      navigateTo(fallback ? fallback.route : "main");
    } else {
      renderNav();
    }
  }

  if (themeMenuBtn) {
    themeMenuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      openMenu(themeMenu, themeMenuBtn);
    });
  }
  if (langMenuBtn) {
    langMenuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      openMenu(langMenu, langMenuBtn);
    });
  }
  if (userMenuBtn) {
    userMenuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      openMenu(userMenu, userMenuBtn);
    });
  }

  document.querySelectorAll("#langMenu [data-lang]").forEach((btn) => {
    btn.addEventListener("click", () => {
      setLang(btn.getAttribute("data-lang"));
      closeMenus();
    });
  });
  document.querySelectorAll("#themeMenu [data-theme-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      setTheme(btn.getAttribute("data-theme-id"));
      closeMenus();
    });
  });

  if (userMenu) {
    userMenu.querySelectorAll("[data-nav]").forEach((btn) => {
      btn.addEventListener("click", () => {
        navigateTo(btn.getAttribute("data-nav"));
      });
    });
  }
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      closeMenus();
      alert(t("auth.logout") + " → /login (stub)");
    });
  }

  document.addEventListener("click", (e) => {
    if (
      !e.target.closest(".theme-picker") &&
      !e.target.closest(".lang-picker") &&
      !e.target.closest(".user-picker")
    ) {
      closeMenus();
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMenus();
      closeDrawer();
    }
  });

  /* ---------- Drawer ---------- */
  const menuBtn = document.getElementById("menuBtn");
  const drawer = document.getElementById("mobileDrawer");
  const scrim = document.getElementById("drawerScrim");
  const drawerCloseBtn = document.getElementById("drawerCloseBtn");

  function openDrawer() {
    drawerOpen = true;
    if (drawer) {
      drawer.classList.add("is-open");
      drawer.setAttribute("aria-hidden", "false");
    }
    if (scrim) {
      scrim.hidden = false;
      requestAnimationFrame(() => scrim.classList.add("is-open"));
    }
    if (menuBtn) menuBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    drawerOpen = false;
    if (drawer) {
      drawer.classList.remove("is-open");
      drawer.setAttribute("aria-hidden", "true");
    }
    if (scrim) {
      scrim.classList.remove("is-open");
      setTimeout(() => {
        if (!drawerOpen) scrim.hidden = true;
      }, 220);
    }
    if (menuBtn) menuBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  if (menuBtn) menuBtn.addEventListener("click", () => (drawerOpen ? closeDrawer() : openDrawer()));
  if (drawerCloseBtn) drawerCloseBtn.addEventListener("click", closeDrawer);
  if (scrim) scrim.addEventListener("click", closeDrawer);

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 960 && drawerOpen) closeDrawer();
  });

  /* ---------- Role demo ---------- */
  const roleSelect = document.getElementById("roleSelect");
  if (roleSelect) {
    roleSelect.addEventListener("change", () => setRole(roleSelect.value));
  }

  const params = new URLSearchParams(location.search);
  if (params.get("hideDemo") === "1") {
    const demoBar = document.getElementById("demoBar");
    if (demoBar) demoBar.hidden = true;
  }

  /* ---------- Init ---------- */
  const savedTheme = params.get("theme") || localStorage.getItem(THEME_KEY) || "azure-blue";
  const savedLang = params.get("lang") || localStorage.getItem(LANG_KEY) || "uk";
  const savedRole = params.get("role") || localStorage.getItem(ROLE_KEY) || "admin";
  let page = params.get("page") || (location.hash || "").replace(/^#/, "") || "admin/file-storage-test";
  if (!NAV_ITEMS.some((n) => n.route === page)) page = "admin/file-storage-test";

  setTheme(savedTheme);
  setLang(savedLang);
  setRole(savedRole);
  navigateTo(page);

  // Expose for screenshots / debugging
  window.GeoSunAppShell = {
    openDrawer,
    closeDrawer,
    setTheme,
    setLang,
    setRole,
    navigateTo,
    NAV_ITEMS,
    getRole: () => currentRole,
    getLang: () => currentLang,
    t
  };
})();
