(function () {
  const shell = () => window.GeoSunAppShell || {};
  const t = (key) => (shell().t ? shell().t(key) : key);

  const TG_SVG =
    '<svg class="messenger-icon messenger-icon--telegram" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/></svg>';
  const WA_SVG =
    '<svg class="messenger-icon messenger-icon--whatsapp" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>';
  const VB_SVG =
    '<svg class="messenger-icon messenger-icon--viber" viewBox="0 0 24 24" aria-hidden="true"><path d="M11.4 0C9.405.028 5.334.344 3.017 2.626 1.062 4.63.016 7.44 0 11.4v.024c0 .54.012 3.9 2.268 6.444l.048.06-.96 3.564c-.072.276 0 .54.216.72a.68.68 0 0 0 .42.156c.072 0 .156-.012.24-.036l3.672-1.32.084.048C7.848 22.056 9.564 22.8 11.4 22.8h.024c3.936-.012 6.744-1.068 8.724-3.024 2.292-2.328 2.604-6.408 2.628-8.376V11.4c-.024-3.96-1.068-6.768-3.024-8.748C17.784 1.056 14.364.012 11.424 0h-.024z"/></svg>';

  const DEMO = {
    filled: {
      lastName: "Коваленко",
      firstName: "Олена",
      patronymic: "Іванівна",
      personType: "INDIVIDUAL",
      legalEntityEdrpou: "",
      channelEmail: true,
      channelPhone: true,
      channelMessengers: true,
      telegramLinked: true,
      phones: [
        { id: "p1", phone: "+380501112233", primary: true, telegram: true, whatsapp: true, viber: false, verified: true },
        { id: "p2", phone: "+380671234567", primary: false, telegram: false, whatsapp: false, viber: true, verified: false }
      ]
    },
    emptyPhones: {
      lastName: "Петренко",
      firstName: "Андрій",
      patronymic: "",
      personType: "INDIVIDUAL",
      legalEntityEdrpou: "",
      channelEmail: true,
      channelPhone: false,
      channelMessengers: false,
      telegramLinked: false,
      phones: []
    },
    legal: {
      lastName: "Сидоренко",
      firstName: "Марія",
      patronymic: "Олегівна",
      personType: "LEGAL_ENTITY_REPRESENTATIVE",
      legalEntityEdrpou: "12345678",
      channelEmail: true,
      channelPhone: true,
      channelMessengers: true,
      telegramLinked: false,
      phones: [
        { id: "p3", phone: "+380931112233", primary: true, telegram: true, whatsapp: false, viber: false, verified: false }
      ]
    }
  };

  let state = "filled";
  let phones = [];
  let telegramLinked = false;
  let dirty = false;
  let baseline = null;

  const els = {
    loading: document.getElementById("profileLoading"),
    failed: document.getElementById("profileFailed"),
    ready: document.getElementById("profileReady"),
    form: document.getElementById("profileForm"),
    phonesList: document.getElementById("phonesList"),
    phonesEmpty: document.getElementById("phonesEmpty"),
    addPhoneBtn: document.getElementById("addPhoneBtn"),
    cancelBtn: document.getElementById("cancelBtn"),
    saveBtn: document.getElementById("saveBtn"),
    dirtyBadge: document.getElementById("dirtyBadge"),
    incompleteBanner: document.getElementById("incompleteBanner"),
    adminHint: document.getElementById("adminChannelsHint"),
    edrpou: document.getElementById("legalEntityEdrpou"),
    edrpouHint: document.getElementById("edrpouHint"),
    channelEmail: document.getElementById("channelEmail"),
    channelPhone: document.getElementById("channelPhone"),
    channelMessengers: document.getElementById("channelMessengers"),
    channelEmailLabel: document.getElementById("channelEmailLabel"),
    profileEmail: document.getElementById("profileEmail"),
    profileAvatar: document.getElementById("profileAvatar"),
    profileRoleChip: document.getElementById("profileRoleChip"),
    stateSelect: document.getElementById("stateSelect"),
    tgScrim: document.getElementById("tgDialogScrim"),
    tgExpires: document.getElementById("tgExpires")
  };

  function currentEmail() {
    return document.getElementById("userName")?.textContent || "admin@geosun.demo";
  }

  function currentRole() {
    return shell().getRole ? shell().getRole() : "admin";
  }

  function setDirty(v) {
    dirty = v;
    if (els.dirtyBadge) els.dirtyBadge.hidden = !v;
    if (els.cancelBtn) els.cancelBtn.disabled = !v;
    if (els.saveBtn) els.saveBtn.disabled = !v;
  }

  function syncEdrpou() {
    const legal = document.querySelector('input[name="personType"]:checked')?.value === "LEGAL_ENTITY_REPRESENTATIVE";
    if (els.edrpou) els.edrpou.disabled = !legal;
    if (els.edrpouHint) {
      els.edrpouHint.setAttribute("data-i18n", legal ? "pages.profile.edrpouHint" : "pages.profile.edrpouDisabledHint");
      els.edrpouHint.textContent = t(legal ? "pages.profile.edrpouHint" : "pages.profile.edrpouDisabledHint");
    }
    if (!legal && els.edrpou) els.edrpou.value = "";
  }

  function syncPhoneChannels() {
    const hasPhones = phones.length > 0;
    [els.channelPhone, els.channelMessengers].forEach((el) => {
      if (!el) return;
      el.disabled = !hasPhones;
      if (!hasPhones) el.checked = false;
    });
  }

  function telegramActionIndex() {
    if (!phones.length) return -1;
    const withTg = phones.findIndex((p) => p.telegram);
    if (withTg >= 0) return withTg;
    const primary = phones.findIndex((p) => p.primary);
    return primary >= 0 ? primary : 0;
  }

  function renderPhones() {
    if (!els.phonesList) return;
    els.phonesList.innerHTML = "";
    if (els.phonesEmpty) els.phonesEmpty.hidden = phones.length > 0;
    if (els.addPhoneBtn) els.addPhoneBtn.disabled = phones.length >= 5;

    const tgIdx = telegramActionIndex();

    phones.forEach((phone, i) => {
      const card = document.createElement("div");
      card.className = "phone-card";
      card.dataset.index = String(i);

      const verifiedPill = phone.verified
        ? `<span class="status-pill status-pill--ok">${t("pages.profile.phoneVerified")}</span>`
        : `<span class="status-pill">${t("pages.profile.phoneNotVerified")}</span>`;

      let tgActions = "";
      if (i === tgIdx) {
        if (telegramLinked) {
          tgActions = `
            <div class="telegram-actions">
              <span class="status-pill status-pill--ok">${t("pages.profile.telegram.statusLinked")}</span>
              ${!phone.verified ? `<span class="telegram-hint-inline">${t("pages.profile.telegram.phoneNotVerified")}</span>` : ""}
              <button type="button" class="btn-warn" data-action="unlink-tg">${t("pages.profile.telegram.unlink")}</button>
            </div>`;
        } else {
          tgActions = `
            <div class="telegram-actions">
              <span class="status-pill">${t("pages.profile.telegram.statusNotLinked")}</span>
              <button type="button" class="btn-tg" data-action="link-tg">${t("pages.profile.telegram.verify")}</button>
            </div>`;
        }
      }

      card.innerHTML = `
        <div class="phone-top">
          <label class="field">
            <span class="field-label">${t("pages.profile.phone")}</span>
            <input class="field-input" type="tel" maxlength="32" placeholder="+380..." value="${escapeAttr(phone.phone)}" data-field="phone" />
          </label>
          <div class="phone-meta">
            <label class="phone-primary">
              <input type="radio" name="primaryPhone" ${phone.primary ? "checked" : ""} data-action="primary" />
              <span>${t("pages.profile.primaryPhone")}</span>
            </label>
            ${verifiedPill}
          </div>
          <button type="button" class="btn-icon-ghost" data-action="remove" aria-label="${t("pages.profile.removePhone")}" title="${t("pages.profile.removePhone")}">
            <span class="material-symbols-outlined" aria-hidden="true">delete</span>
          </button>
        </div>
        <div class="messenger-stack">
          <div class="messenger-row">
            <label class="messenger-check">
              <input type="checkbox" data-field="telegram" ${phone.telegram ? "checked" : ""} />
              ${TG_SVG}
              <span>${t("pages.profile.messengerTelegram")}</span>
            </label>
            ${tgActions}
          </div>
          <div class="messenger-row">
            <label class="messenger-check">
              <input type="checkbox" data-field="whatsapp" ${phone.whatsapp ? "checked" : ""} />
              ${WA_SVG}
              <span>${t("pages.profile.messengerWhatsapp")}</span>
            </label>
          </div>
          <div class="messenger-row">
            <label class="messenger-check">
              <input type="checkbox" data-field="viber" ${phone.viber ? "checked" : ""} />
              ${VB_SVG}
              <span>${t("pages.profile.messengerViber")}</span>
            </label>
          </div>
        </div>`;

      els.phonesList.appendChild(card);
    });

    syncPhoneChannels();
  }

  function escapeAttr(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;");
  }

  function applySnapshot(snap) {
    document.getElementById("lastName").value = snap.lastName;
    document.getElementById("firstName").value = snap.firstName;
    document.getElementById("patronymic").value = snap.patronymic;
    const pt = snap.personType || "INDIVIDUAL";
    document.querySelectorAll('input[name="personType"]').forEach((r) => {
      r.checked = r.value === pt;
    });
    els.edrpou.value = snap.legalEntityEdrpou || "";
    els.channelEmail.checked = !!snap.channelEmail;
    els.channelPhone.checked = !!snap.channelPhone;
    els.channelMessengers.checked = !!snap.channelMessengers;
    phones = (snap.phones || []).map((p) => ({ ...p }));
    telegramLinked = !!snap.telegramLinked;
    baseline = JSON.parse(JSON.stringify({ ...snap, phones, telegramLinked }));
    syncEdrpou();
    renderPhones();
    setDirty(false);
    updateChrome();
    updateIncomplete();
  }

  function updateIncomplete() {
    const incomplete = !document.getElementById("lastName").value.trim() || !document.getElementById("firstName").value.trim() || phones.length === 0;
    if (els.incompleteBanner) els.incompleteBanner.hidden = !incomplete;
  }

  function updateChrome() {
    const email = currentEmail();
    const role = currentRole();
    if (els.profileEmail) els.profileEmail.textContent = email;
    if (els.profileRoleChip) els.profileRoleChip.textContent = role;
    if (els.profileAvatar) {
      const av = document.getElementById("userAvatar");
      els.profileAvatar.textContent = av ? av.textContent : "GS";
    }
    if (els.channelEmailLabel) {
      els.channelEmailLabel.textContent = t("pages.profile.channelEmail").replace("{{email}}", email);
    }
    if (els.adminHint) els.adminHint.hidden = role !== "admin";
  }

  function showUiMode(mode) {
    const loading = mode === "loading";
    const failed = mode === "failed";
    if (els.loading) els.loading.hidden = !loading;
    if (els.failed) els.failed.hidden = !failed;
    if (els.ready) els.ready.hidden = loading || failed;
  }

  function loadState(name) {
    state = name;
    const params = new URLSearchParams(location.search);
    params.set("state", name);
    history.replaceState({}, "", location.pathname + "?" + params.toString() + (location.hash || ""));

    if (name === "loading") {
      showUiMode("loading");
      return;
    }
    if (name === "failed") {
      showUiMode("failed");
      return;
    }
    showUiMode("ready");
    const key = name === "legal" ? "legal" : name === "emptyPhones" ? "emptyPhones" : "filled";
    applySnapshot(DEMO[key]);
  }

  function markDirty() {
    setDirty(true);
    updateIncomplete();
  }

  // Events
  els.form?.addEventListener("input", (e) => {
    const target = e.target;
    if (target.matches("[data-field]")) {
      const card = target.closest(".phone-card");
      if (card) {
        const idx = Number(card.dataset.index);
        const field = target.getAttribute("data-field");
        if (field === "phone") phones[idx].phone = target.value;
        else phones[idx][field] = target.checked;
        if (field === "telegram") renderPhones();
      }
    }
    markDirty();
  });

  els.form?.addEventListener("change", (e) => {
    const target = e.target;
    if (target.name === "personType") {
      syncEdrpou();
      markDirty();
    }
    if (target.getAttribute("data-action") === "primary") {
      const card = target.closest(".phone-card");
      const idx = Number(card.dataset.index);
      phones.forEach((p, i) => (p.primary = i === idx));
      markDirty();
    }
  });

  els.phonesList?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;
    const action = btn.getAttribute("data-action");
    const card = btn.closest(".phone-card");
    const idx = card ? Number(card.dataset.index) : -1;

    if (action === "remove" && idx >= 0) {
      if (!confirm(t("pages.profile.removePhoneConfirm"))) return;
      phones.splice(idx, 1);
      if (phones.length && !phones.some((p) => p.primary)) phones[0].primary = true;
      renderPhones();
      markDirty();
    }
    if (action === "link-tg") openTgDialog();
    if (action === "unlink-tg") {
      if (!confirm(t("pages.profile.telegram.unlinkConfirm"))) return;
      telegramLinked = false;
      renderPhones();
      markDirty();
    }
  });

  els.addPhoneBtn?.addEventListener("click", () => {
    if (phones.length >= 5) return;
    const isFirst = phones.length === 0;
    phones.push({ id: "", phone: "", primary: isFirst, telegram: false, whatsapp: false, viber: false, verified: false });
    if (isFirst && els.channelPhone) els.channelPhone.checked = true;
    renderPhones();
    markDirty();
  });

  els.cancelBtn?.addEventListener("click", () => {
    if (baseline) applySnapshot(baseline);
  });

  els.form?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!dirty) return;
    // Prototype: treat save as new baseline
    baseline = {
      lastName: document.getElementById("lastName").value,
      firstName: document.getElementById("firstName").value,
      patronymic: document.getElementById("patronymic").value,
      personType: document.querySelector('input[name="personType"]:checked')?.value || "INDIVIDUAL",
      legalEntityEdrpou: els.edrpou.value,
      channelEmail: els.channelEmail.checked,
      channelPhone: els.channelPhone.checked,
      channelMessengers: els.channelMessengers.checked,
      telegramLinked,
      phones: phones.map((p) => ({ ...p }))
    };
    setDirty(false);
    updateIncomplete();
  });

  document.getElementById("retryBtn")?.addEventListener("click", () => {
    if (els.stateSelect) els.stateSelect.value = "filled";
    loadState("filled");
  });

  document.getElementById("closeProfileBtn")?.addEventListener("click", () => {
    if (dirty && !confirm(t("pages.profile.closeUnsavedConfirm"))) return;
    if (shell().navigateTo) shell().navigateTo("main");
  });

  function openTgDialog() {
    if (els.tgExpires) {
      const at = new Date(Date.now() + 15 * 60 * 1000);
      els.tgExpires.textContent = t("pages.profile.telegram.expiresAt").replace("{{at}}", at.toLocaleString());
    }
    if (els.tgScrim) els.tgScrim.hidden = false;
  }

  function closeTgDialog(linked) {
    if (els.tgScrim) els.tgScrim.hidden = true;
    if (linked) {
      telegramLinked = true;
      renderPhones();
      markDirty();
    }
  }

  document.getElementById("tgCloseBtn")?.addEventListener("click", () => closeTgDialog(false));
  document.getElementById("tgOpenBtn")?.addEventListener("click", () => closeTgDialog(true));
  document.getElementById("tgCopyBtn")?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(document.getElementById("tgCode")?.textContent || "");
      const span = document.querySelector("#tgCopyBtn [data-i18n], #tgCopyBtn span:last-child");
      if (span) span.textContent = t("pages.profile.telegram.copied");
    } catch (_) {}
  });
  els.tgScrim?.addEventListener("click", (e) => {
    if (e.target === els.tgScrim) closeTgDialog(false);
  });

  // Re-apply i18n-sensitive bits when shell language changes: poll via MutationObserver on html lang
  const langObserver = new MutationObserver(() => {
    updateChrome();
    renderPhones();
    syncEdrpou();
    // refresh state select labels
    if (els.stateSelect) {
      [...els.stateSelect.options].forEach((opt) => {
        const map = {
          filled: "pages.profile.stateFilled",
          emptyPhones: "pages.profile.stateEmptyPhones",
          legal: "pages.profile.stateLegal",
          loading: "pages.profile.stateLoading",
          failed: "pages.profile.stateFailed"
        };
        if (map[opt.value]) opt.textContent = t(map[opt.value]);
      });
    }
  });
  langObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });

  // Role changes update admin hint / email
  const roleSelect = document.getElementById("roleSelect");
  roleSelect?.addEventListener("change", () => {
    setTimeout(updateChrome, 0);
  });

  els.stateSelect?.addEventListener("change", () => loadState(els.stateSelect.value));

  // Init from query
  const params = new URLSearchParams(location.search);
  const initial = params.get("state") || "filled";
  if (els.stateSelect) els.stateSelect.value = ["filled", "emptyPhones", "legal", "loading", "failed"].includes(initial) ? initial : "filled";
  loadState(els.stateSelect?.value || "filled");

  // Keep chrome in sync after shell init
  setTimeout(updateChrome, 50);

  window.GeoSunProfile = { loadState, renderPhones, updateChrome };
})();
