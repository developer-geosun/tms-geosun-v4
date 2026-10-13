(function () {
  const THEMES = ["azure-blue", "rose-red", "magenta-violet", "cyan-orange"];
  const LANGS = ["uk", "en", "ru"];
  const THEME_KEY = "geosun-auth-theme";
  const LANG_KEY = "geosun-auth-lang";
  const PAGES = ["login", "register", "forgot", "verify", "reset"];
  const HASH_MAP = {
    login: "login",
    register: "register",
    "forgot-password": "forgot",
    forgot: "forgot",
    "verify-email": "verify",
    verify: "verify",
    "reset-password": "reset",
    reset: "reset"
  };
  const HASH_OUT = {
    login: "login",
    register: "register",
    forgot: "forgot-password",
    verify: "verify-email",
    reset: "reset-password"
  };
  const TITLE_KEYS = {
    login: "pages.login.title",
    register: "pages.register.title",
    forgot: "pages.forgotPassword.title",
    verify: "pages.verifyEmail.title",
    reset: "pages.resetPassword.title"
  };
  const VERIFY_STATUSES = ["loading", "success", "invalid", "error"];
  const RESET_STATUSES = ["form", "resolving", "missing", "invalid", "generic", "success"];

  const I18N = window.GEOSUN_I18N || {};
  const root = document.documentElement;
  let currentLang = "uk";
  let currentPage = "login";
  let verifyStatus = "loading";
  let resetStatus = "form";
  const loadingLabels = new Map();

  function t(key) {
    const dict = I18N[currentLang] || I18N.uk || {};
    return dict[key] || (I18N.en && I18N.en[key]) || key;
  }

  function applyI18n() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const loadingKey = el.getAttribute("data-i18n-loading");
      if (loadingKey && loadingLabels.get(el)) {
        el.textContent = t(loadingKey);
        return;
      }
      const key = el.getAttribute("data-i18n");
      if (key) el.textContent = t(key);
    });
    document.title = "GeoSun TMS — " + t(TITLE_KEYS[currentPage] || "pages.login.title") + " · Material Dev Prototype";
    root.setAttribute("lang", currentLang);
  }

  /* ---------- Theme / Lang chrome ---------- */
  const LANG_CODES = { uk: "UK", en: "EN", ru: "RU" };
  const themeMenuBtn = document.getElementById("themeMenuBtn");
  const themeMenu = document.getElementById("themeMenu");
  const langMenuBtn = document.getElementById("langMenuBtn");
  const langMenu = document.getElementById("langMenu");
  const langCodeLabel = document.getElementById("langCodeLabel");

  function closeMenus() {
    [themeMenu, langMenu].forEach((menu) => {
      if (!menu) return;
      menu.classList.remove("is-open");
      menu.hidden = true;
    });
    if (themeMenuBtn) themeMenuBtn.setAttribute("aria-expanded", "false");
    if (langMenuBtn) langMenuBtn.setAttribute("aria-expanded", "false");
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

  themeMenuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    openMenu(themeMenu, themeMenuBtn);
  });
  langMenuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    openMenu(langMenu, langMenuBtn);
  });
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
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".theme-picker") && !e.target.closest(".lang-picker")) closeMenus();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenus();
  });

  /* ---------- Routing ---------- */
  function parseRoute() {
    const params = new URLSearchParams(location.search);
    let page = params.get("page");
    const hash = (location.hash || "").replace(/^#/, "");
    if (!page && hash) page = HASH_MAP[hash] || hash;
    if (!PAGES.includes(page)) page = "login";
    let status = params.get("status");
    if (page === "reset") {
      if (!RESET_STATUSES.includes(status)) status = "form";
    } else {
      if (!status) status = "loading";
      if (!VERIFY_STATUSES.includes(status)) status = "loading";
    }
    return { page, status, params };
  }

  function setVerifyStatus(status) {
    if (!["loading", "success", "invalid", "error"].includes(status)) status = "loading";
    verifyStatus = status;
    document.querySelectorAll(".verify-status").forEach((el) => {
      el.classList.toggle("is-active", el.getAttribute("data-verify-view") === status);
    });
    document.querySelectorAll("#resetStatusTabs [data-reset-status]").forEach((btn) => {
    btn.addEventListener("click", () => {
      setResetStatus(btn.getAttribute("data-reset-status"));
      syncResetUrl();
    });
  });

  document.querySelectorAll("#verifyStatusTabs [data-verify-status]").forEach((btn) => {
      btn.classList.toggle("is-active", btn.getAttribute("data-verify-status") === status);
    });
  }

  function syncResetUrl() {
    const params = new URLSearchParams(location.search);
    params.set("page", "reset");
    if (resetStatus === "form") params.delete("status");
    else params.set("status", resetStatus);
    history.replaceState({ page: "reset", status: resetStatus }, "", location.pathname + "?" + params.toString() + "#reset-password");
  }

  function setResetStatus(status, opts) {
    opts = opts || {};
    if (!RESET_STATUSES.includes(status)) status = "form";
    resetStatus = status;
    document.querySelectorAll(".reset-state").forEach((el) => {
      const view = el.getAttribute("data-reset-view");
      const active = status === "success" ? view === "form" : view === status;
      el.classList.toggle("is-active", active);
    });
    document.querySelectorAll("#resetStatusTabs [data-reset-status]").forEach((btn) => {
      btn.classList.toggle("is-active", btn.getAttribute("data-reset-status") === status);
    });
    if (status === "success") {
      const err = document.getElementById("resetErrorBanner");
      const ok = document.getElementById("resetSuccessBanner");
      if (err) err.classList.remove("is-visible");
      if (ok) ok.classList.add("is-visible");
    } else if (status === "form" && !opts.keepBanners) {
      const err = document.getElementById("resetErrorBanner");
      const ok = document.getElementById("resetSuccessBanner");
      if (err) err.classList.remove("is-visible");
      if (ok) ok.classList.remove("is-visible");
    }
  }

  function showPage(page, opts) {
    opts = opts || {};
    if (!PAGES.includes(page)) page = "login";
    currentPage = page;
    document.querySelectorAll(".page-view").forEach((el) => {
      const active = el.getAttribute("data-page") === page;
      el.classList.toggle("is-active", active);
      el.hidden = !active;
    });
    if (page === "verify") {
      setVerifyStatus(opts.status || verifyStatus || "loading");
    }
    if (page === "reset") {
      setResetStatus(opts.status || resetStatus || "form", { keepBanners: !!opts.keepBanners });
    }
    applyI18n();

    if (!opts.skipHistory) {
      const params = new URLSearchParams(location.search);
      params.set("page", page);
      if (page === "verify") params.set("status", verifyStatus);
      else if (page === "reset" && resetStatus !== "form") params.set("status", resetStatus);
      else params.delete("status");
      const qs = params.toString();
      const url = location.pathname + (qs ? "?" + qs : "") + "#" + HASH_OUT[page];
      history.replaceState({ page, status: verifyStatus }, "", url);
    }
  }

  function navigate(page) {
    showPage(page, { status: page === "verify" ? verifyStatus : undefined });
  }

  document.querySelectorAll("[data-nav]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      navigate(el.getAttribute("data-nav"));
    });
  });

  document.querySelectorAll("#verifyStatusTabs [data-verify-status]").forEach((btn) => {
    btn.addEventListener("click", () => {
      setVerifyStatus(btn.getAttribute("data-verify-status"));
      const params = new URLSearchParams(location.search);
      params.set("page", "verify");
      params.set("status", verifyStatus);
      history.replaceState({ page: "verify", status: verifyStatus }, "", location.pathname + "?" + params.toString() + "#verify-email");
    });
  });

  window.addEventListener("hashchange", () => {
    const { page, status } = parseRoute();
    showPage(page, { status, skipHistory: true });
  });

  /* ---------- Helpers ---------- */
  function isValidEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  function syncValueClass(el) {
    el.classList.toggle("has-value", el.value.trim().length > 0);
  }

  function wireFloating(inputs) {
    inputs.forEach((el) => {
      if (!el) return;
      el.addEventListener("input", () => syncValueClass(el));
      syncValueClass(el);
    });
  }

  function setLoading(btn, on, submitKey, loadingKey) {
    const label = btn.querySelector(".btn-label");
    if (on) {
      loadingLabels.set(label, true);
      btn.classList.add("is-loading");
      btn.disabled = true;
      if (label) label.textContent = t(loadingKey);
    } else {
      loadingLabels.delete(label);
      btn.classList.remove("is-loading");
      btn.disabled = false;
      if (label) label.textContent = t(submitKey);
    }
  }

  function hideBanners(errorEl, successEl) {
    if (errorEl) errorEl.classList.remove("is-visible");
    if (successEl) successEl.classList.remove("is-visible");
  }

  function showError(errorEl, textEl, key) {
    hideBanners(errorEl, errorEl && errorEl.parentElement && errorEl.parentElement.querySelector(".banner--success"));
    const success = document.getElementById(errorEl.id.replace("Error", "Success"));
    if (success) success.classList.remove("is-visible");
    textEl.setAttribute("data-i18n", key);
    textEl.textContent = t(key);
    errorEl.classList.add("is-visible");
  }

  function showSuccess(successEl, errorEl) {
    hideBanners(errorEl, successEl);
    successEl.classList.add("is-visible");
  }

  /* ---------- Login ---------- */
  const loginForm = document.getElementById("loginForm");
  const loginEmail = document.getElementById("loginEmail");
  const loginPassword = document.getElementById("loginPassword");
  const loginEmailField = document.getElementById("loginEmailField");
  const loginPasswordField = document.getElementById("loginPasswordField");
  const loginErrorBanner = document.getElementById("loginErrorBanner");
  const loginSuccessBanner = document.getElementById("loginSuccessBanner");
  const loginErrorText = document.getElementById("loginErrorText");
  const loginSubmit = document.getElementById("loginSubmit");

  wireFloating([loginEmail, loginPassword]);

  document.getElementById("loginTogglePassword").addEventListener("click", () => {
    const show = loginPassword.type === "password";
    loginPassword.type = show ? "text" : "password";
    document.querySelector("#loginTogglePassword .material-symbols-outlined").textContent = show ? "visibility_off" : "visibility";
  });

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    hideBanners(loginErrorBanner, loginSuccessBanner);
    loginEmailField.classList.remove("is-invalid");
    loginPasswordField.classList.remove("is-invalid");
    const email = loginEmail.value.trim();
    const password = loginPassword.value;
    let ok = true;
    if (!isValidEmail(email)) { loginEmailField.classList.add("is-invalid"); ok = false; }
    if (password.length < 8) { loginPasswordField.classList.add("is-invalid"); ok = false; }
    if (!ok) return;
    setLoading(loginSubmit, true, "pages.login.submit", "pages.login.loading");
    setTimeout(() => {
      setLoading(loginSubmit, false, "pages.login.submit", "pages.login.loading");
      if (email.toLowerCase() === "wrong@demo.com") {
        showError(loginErrorBanner, loginErrorText, "pages.login.error401");
        return;
      }
      showSuccess(loginSuccessBanner, loginErrorBanner);
      setTimeout(() => loginSuccessBanner.classList.remove("is-visible"), 2800);
    }, 700);
  });

  /* ---------- Register ---------- */
  const regForm = document.getElementById("registerForm");
  const regEmail = document.getElementById("regEmail");
  const regPassword = document.getElementById("regPassword");
  const regConfirm = document.getElementById("regConfirm");
  const regEmailField = document.getElementById("regEmailField");
  const regPasswordField = document.getElementById("regPasswordField");
  const regConfirmField = document.getElementById("regConfirmField");
  const regPasswordHint = document.getElementById("regPasswordHint");
  const regErrorBanner = document.getElementById("regErrorBanner");
  const regSuccessBanner = document.getElementById("regSuccessBanner");
  const regErrorText = document.getElementById("regErrorText");
  const regSubmit = document.getElementById("regSubmit");
  const regShowPassword = document.getElementById("regShowPassword");

  wireFloating([regEmail, regPassword, regConfirm]);

  regShowPassword.addEventListener("change", () => {
    const type = regShowPassword.checked ? "text" : "password";
    regPassword.type = type;
    regConfirm.type = type;
  });

  function passwordRuleOk(pw) {
    return /[A-Za-zА-Яа-яІіЇїЄєЁё]/.test(pw) && /\d/.test(pw);
  }

  regForm.addEventListener("submit", (e) => {
    e.preventDefault();
    hideBanners(regErrorBanner, regSuccessBanner);
    [regEmailField, regPasswordField, regConfirmField].forEach((f) => f.classList.remove("is-invalid"));
    const email = regEmail.value.trim();
    const password = regPassword.value;
    const confirm = regConfirm.value;
    let ok = true;

    if (!isValidEmail(email)) {
      regEmailField.classList.add("is-invalid");
      ok = false;
    }
    if (!password) {
      regPasswordHint.setAttribute("data-i18n", "pages.register.passwordRequired");
      regPasswordHint.textContent = t("pages.register.passwordRequired");
      regPasswordField.classList.add("is-invalid");
      ok = false;
    } else if (password.length < 8) {
      regPasswordHint.setAttribute("data-i18n", "pages.register.passwordMinLength");
      regPasswordHint.textContent = t("pages.register.passwordMinLength");
      regPasswordField.classList.add("is-invalid");
      ok = false;
    } else if (!passwordRuleOk(password)) {
      regPasswordHint.setAttribute("data-i18n", "pages.register.passwordRule");
      regPasswordHint.textContent = t("pages.register.passwordRule");
      regPasswordField.classList.add("is-invalid");
      ok = false;
    }
    if (password !== confirm) {
      regConfirmField.classList.add("is-invalid");
      ok = false;
    }
    if (!ok) return;

    setLoading(regSubmit, true, "pages.register.submit", "pages.register.loading");
    setTimeout(() => {
      setLoading(regSubmit, false, "pages.register.submit", "pages.register.loading");
      const low = email.toLowerCase();
      if (low === "exists@demo.com") {
        showError(regErrorBanner, regErrorText, "pages.register.error409");
        return;
      }
      if (low === "rate@demo.com") {
        showError(regErrorBanner, regErrorText, "pages.register.error429");
        return;
      }
      showSuccess(regSuccessBanner, regErrorBanner);
    }, 700);
  });

  /* ---------- Forgot ---------- */
  const forgotForm = document.getElementById("forgotForm");
  const forgotEmail = document.getElementById("forgotEmail");
  const forgotEmailField = document.getElementById("forgotEmailField");
  const forgotErrorBanner = document.getElementById("forgotErrorBanner");
  const forgotSuccessBanner = document.getElementById("forgotSuccessBanner");
  const forgotErrorText = document.getElementById("forgotErrorText");
  const forgotSubmit = document.getElementById("forgotSubmit");

  wireFloating([forgotEmail]);

  const FORGOT_DEMO = {
    "rate@demo.com": "pages.forgotPassword.error429",
    "disabled@demo.com": "pages.forgotPassword.errorAccountDisabled",
    "deleted@demo.com": "pages.forgotPassword.errorUserDeleted",
    "unverified@demo.com": "pages.forgotPassword.errorEmailNotVerified"
  };

  forgotForm.addEventListener("submit", (e) => {
    e.preventDefault();
    hideBanners(forgotErrorBanner, forgotSuccessBanner);
    forgotEmailField.classList.remove("is-invalid");
    const email = forgotEmail.value.trim();
    if (!isValidEmail(email)) {
      forgotEmailField.classList.add("is-invalid");
      return;
    }
    setLoading(forgotSubmit, true, "pages.forgotPassword.submit", "pages.forgotPassword.loading");
    setTimeout(() => {
      setLoading(forgotSubmit, false, "pages.forgotPassword.submit", "pages.forgotPassword.loading");
      const key = FORGOT_DEMO[email.toLowerCase()];
      if (key) {
        showError(forgotErrorBanner, forgotErrorText, key);
        return;
      }
      showSuccess(forgotSuccessBanner, forgotErrorBanner);
    }, 700);
  });

  /* ---------- Reset password ---------- */
  const resetForm = document.getElementById("resetForm");
  const resetEmail = document.getElementById("resetEmail");
  const resetPassword = document.getElementById("resetPassword");
  const resetConfirm = document.getElementById("resetConfirm");
  const resetPasswordField = document.getElementById("resetPasswordField");
  const resetConfirmField = document.getElementById("resetConfirmField");
  const resetPasswordHint = document.getElementById("resetPasswordHint");
  const resetErrorBanner = document.getElementById("resetErrorBanner");
  const resetSuccessBanner = document.getElementById("resetSuccessBanner");
  const resetErrorText = document.getElementById("resetErrorText");
  const resetSubmit = document.getElementById("resetSubmit");
  const resetShowPassword = document.getElementById("resetShowPassword");

  wireFloating([resetEmail, resetPassword, resetConfirm]);

  function blockResetEmailEdit(event) {
    if (event instanceof KeyboardEvent) {
      if (event.key === "Tab" || event.key === "Escape" || event.key.startsWith("Arrow") || event.key === "Home" || event.key === "End") return;
      const copyOrSelect = event.key === "c" || event.key === "C" || event.key === "a" || event.key === "A";
      if (copyOrSelect && (event.ctrlKey || event.metaKey)) return;
    }
    event.preventDefault();
  }
  ["beforeinput", "keydown", "paste", "cut", "drop"].forEach((name) => {
    resetEmail.addEventListener(name, blockResetEmailEdit);
  });

  resetShowPassword.addEventListener("change", () => {
    const type = resetShowPassword.checked ? "text" : "password";
    resetPassword.type = type;
    resetConfirm.type = type;
  });

  resetForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (resetStatus !== "form" && resetStatus !== "success") return;
    hideBanners(resetErrorBanner, resetSuccessBanner);
    resetPasswordField.classList.remove("is-invalid");
    resetConfirmField.classList.remove("is-invalid");
    const password = resetPassword.value;
    const confirm = resetConfirm.value;
    let ok = true;
    if (!password) {
      resetPasswordHint.setAttribute("data-i18n", "pages.resetPassword.passwordRequired");
      resetPasswordHint.textContent = t("pages.resetPassword.passwordRequired");
      resetPasswordField.classList.add("is-invalid");
      ok = false;
    } else if (password.length < 8) {
      resetPasswordHint.setAttribute("data-i18n", "pages.resetPassword.passwordMinLength");
      resetPasswordHint.textContent = t("pages.resetPassword.passwordMinLength");
      resetPasswordField.classList.add("is-invalid");
      ok = false;
    } else if (!passwordRuleOk(password)) {
      resetPasswordHint.setAttribute("data-i18n", "pages.resetPassword.passwordRule");
      resetPasswordHint.textContent = t("pages.resetPassword.passwordRule");
      resetPasswordField.classList.add("is-invalid");
      ok = false;
    }
    if (!confirm || password !== confirm) {
      resetConfirmField.classList.add("is-invalid");
      ok = false;
    }
    if (!ok) return;

    setLoading(resetSubmit, true, "pages.resetPassword.submit", "pages.resetPassword.loading");
    setTimeout(() => {
      setLoading(resetSubmit, false, "pages.resetPassword.submit", "pages.resetPassword.loading");
      if (password === "rate1234a") {
        showError(resetErrorBanner, resetErrorText, "pages.resetPassword.error429");
        return;
      }
      if (password === "badlink1a") {
        showError(resetErrorBanner, resetErrorText, "pages.resetPassword.errorInvalid");
        return;
      }
      setResetStatus("success", { keepBanners: true });
      syncResetUrl();
    }, 700);
  });

  /* ---------- Demo buttons ---------- */
  document.querySelectorAll("[data-demo]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const action = btn.getAttribute("data-demo");
      switch (action) {
        case "login-error401":
          showError(loginErrorBanner, loginErrorText, "pages.login.error401");
          break;
        case "login-clear":
          hideBanners(loginErrorBanner, loginSuccessBanner);
          break;
        case "reg-409":
          showError(regErrorBanner, regErrorText, "pages.register.error409");
          break;
        case "reg-429":
          showError(regErrorBanner, regErrorText, "pages.register.error429");
          break;
        case "reg-success":
          showSuccess(regSuccessBanner, regErrorBanner);
          break;
        case "reg-clear":
          hideBanners(regErrorBanner, regSuccessBanner);
          break;
        case "forgot-success":
          showSuccess(forgotSuccessBanner, forgotErrorBanner);
          break;
        case "forgot-429":
          showError(forgotErrorBanner, forgotErrorText, "pages.forgotPassword.error429");
          break;
        case "forgot-disabled":
          showError(forgotErrorBanner, forgotErrorText, "pages.forgotPassword.errorAccountDisabled");
          break;
        case "forgot-deleted":
          showError(forgotErrorBanner, forgotErrorText, "pages.forgotPassword.errorUserDeleted");
          break;
        case "forgot-unverified":
          showError(forgotErrorBanner, forgotErrorText, "pages.forgotPassword.errorEmailNotVerified");
          break;
        case "forgot-clear":
          hideBanners(forgotErrorBanner, forgotSuccessBanner);
          break;
        case "reset-429":
          setResetStatus("form", { keepBanners: true });
          showError(resetErrorBanner, resetErrorText, "pages.resetPassword.error429");
          syncResetUrl();
          break;
        case "reset-invalid-form":
          setResetStatus("form", { keepBanners: true });
          showError(resetErrorBanner, resetErrorText, "pages.resetPassword.errorInvalid");
          syncResetUrl();
          break;
        case "reset-generic-form":
          setResetStatus("form", { keepBanners: true });
          showError(resetErrorBanner, resetErrorText, "pages.resetPassword.errorGeneric");
          syncResetUrl();
          break;
        case "reset-clear":
          setResetStatus("form");
          syncResetUrl();
          break;
      }
    });
  });

  /* ---------- Init ---------- */
  const route = parseRoute();
  let savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === "light") savedTheme = "azure-blue";
  if (savedTheme === "dark") savedTheme = "magenta-violet";
  // Prefer login prototype theme if auth key empty
  if (!savedTheme) {
    const legacy = localStorage.getItem("geosun-login-theme");
    if (legacy === "light") savedTheme = "azure-blue";
    else if (legacy === "dark") savedTheme = "magenta-violet";
    else savedTheme = legacy;
  }
  const qTheme = route.params.get("theme");
  const qLang = route.params.get("lang");
  setTheme(THEMES.includes(qTheme) ? qTheme : (THEMES.includes(savedTheme) ? savedTheme : "azure-blue"));
  const savedLang = localStorage.getItem(LANG_KEY) || localStorage.getItem("geosun-login-lang");
  setLang(LANGS.includes(qLang) ? qLang : (LANGS.includes(savedLang) ? savedLang : "uk"));

  if (route.params.get("hideDemo") === "1") {
    document.querySelectorAll(".demo-hint, .status-tabs").forEach((el) => { el.style.display = "none"; });
  }

  verifyStatus = route.page === "verify" ? route.status : "loading";
  resetStatus = route.page === "reset" ? route.status : "form";
  showPage(route.page, { status: route.status, skipHistory: false, keepBanners: true });

  // Query helpers for register/forgot banners
  const qError = route.params.get("error");
  if (route.page === "register" && qError) {
    const map = { "409": "pages.register.error409", "429": "pages.register.error429", generic: "pages.register.errorGeneric" };
    if (map[qError]) showError(regErrorBanner, regErrorText, map[qError]);
    if (qError === "success") showSuccess(regSuccessBanner, regErrorBanner);
  }
  if (route.page === "forgot" && qError) {
    const map = {
      "429": "pages.forgotPassword.error429",
      account_disabled: "pages.forgotPassword.errorAccountDisabled",
      user_deleted: "pages.forgotPassword.errorUserDeleted",
      email_not_verified: "pages.forgotPassword.errorEmailNotVerified",
      generic: "pages.forgotPassword.errorGeneric",
      success: null
    };
    if (qError === "success") showSuccess(forgotSuccessBanner, forgotErrorBanner);
    else if (map[qError]) showError(forgotErrorBanner, forgotErrorText, map[qError]);
  }
  if (route.page === "reset" && qError && (resetStatus === "form" || resetStatus === "success")) {
    const map = {
      invalid: "pages.resetPassword.errorInvalid",
      "429": "pages.resetPassword.error429",
      generic: "pages.resetPassword.errorGeneric"
    };
    if (qError === "success") {
      setResetStatus("success", { keepBanners: true });
    } else if (map[qError]) {
      setResetStatus("form", { keepBanners: true });
      showError(resetErrorBanner, resetErrorText, map[qError]);
    }
  }
})();
