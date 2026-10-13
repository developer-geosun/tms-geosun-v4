
(function () {
  const TRIPS = [
    { id: 11, tripNumber: "T-2026-014", title: "Київ → Варшава", status: "IN_PROGRESS", originText: "Київ", destinationText: "Варшава", plannedStartAt: "2026-09-28", plannedEndAt: "2026-09-30", comment: "Терміновий",
      expense: { status: "DRAFT", lines: [
        { category: "FUEL", amount: 4200, currency: "UAH", expenseDate: "2026-09-28", description: "АЗС OKKO" },
        { category: "TOLL", amount: 85, currency: "EUR", expenseDate: "2026-09-29", description: "A2 PL" }
      ]}},
    { id: 12, tripNumber: "T-2026-011", title: "Львів → Берлін", status: "PLANNED", originText: "Львів", destinationText: "Берлін", plannedStartAt: "2026-10-05", plannedEndAt: "2026-10-07", comment: "",
      expense: { status: "DRAFT", lines: [] }},
    { id: 13, tripNumber: "T-2026-008", title: "Одеса → Бухарест", status: "COMPLETED", originText: "Одеса", destinationText: "Бухарест", plannedStartAt: "2026-09-10", plannedEndAt: "2026-09-12", comment: "",
      expense: { status: "SUBMITTED", lines: [
        { category: "PER_DIEM", amount: 60, currency: "EUR", expenseDate: "2026-09-11", description: "Добові" }
      ]}}
  ];
  let state = "list";
  let openId = 11;
  function t(key) {
    const lang = document.documentElement.getAttribute("lang") || "uk";
    const dict = (window.GEOSUN_I18N && (window.GEOSUN_I18N[lang] || window.GEOSUN_I18N.uk)) || {};
    return dict[key] || key;
  }
  function toast(msg){ const el=document.getElementById("gsToast"); if(!el)return; el.textContent=msg; el.hidden=false; clearTimeout(el._t); el._t=setTimeout(()=>el.hidden=true,1600); }
  function statusChip(s){ return `<span class="gs-status is-${s==="IN_PROGRESS"?"progress":s==="COMPLETED"?"done":s==="CANCELLED"?"cancel":s==="PLANNED"?"planned":"draft"}">${t("pages.myTrips.status."+s)}</span>`; }
  function render(){
    const loading=document.getElementById("gsLoading"), failed=document.getElementById("gsFailed"), empty=document.getElementById("gsEmpty"), acc=document.getElementById("gsAcc");
    [loading,failed,empty].forEach(e=>e.hidden=true); acc.innerHTML="";
    if(state==="loading"){loading.hidden=false;return;}
    if(state==="failed"){failed.hidden=false;return;}
    if(state==="empty"){empty.hidden=false;return;}
    acc.innerHTML = TRIPS.map(tr=>{
      const open = openId===tr.id;
      const lines = (tr.expense.lines||[]).map(l=>`<tr><td>${t("pages.myTrips.expenseCategory."+l.category)}</td><td>${l.amount}</td><td>${l.currency}</td><td>${l.expenseDate}</td><td>${l.description||"—"}</td></tr>`).join("") || `<tr><td colspan="5">—</td></tr>`;
      return `<article class="gs-acc${open?" is-open":""}" data-id="${tr.id}">
        <button type="button" class="gs-acc-head" data-toggle="${tr.id}"><strong>${tr.tripNumber}</strong><span class="title">${tr.title}</span>${statusChip(tr.status)}</button>
        <div class="gs-acc-body">
          <div class="gs-meta-grid">
            <div><span data-i18n-skip>${t("pages.myTrips.route")}</span><strong>${tr.originText} → ${tr.destinationText}</strong></div>
            <div><span>${t("pages.myTrips.plannedStartAt")}</span><strong>${tr.plannedStartAt}</strong></div>
            <div><span>${t("pages.myTrips.plannedEndAt")}</span><strong>${tr.plannedEndAt}</strong></div>
            <div><span>${t("pages.myTrips.comment")}</span><strong>${tr.comment||"—"}</strong></div>
          </div>
          <div class="gs-panel">
            <h2>${t("pages.myTrips.expenseReport")} · ${t("pages.myTrips.expenseStatus."+tr.expense.status)}</h2>
            <div class="gs-hero-actions" style="margin-bottom:.6rem">
              <button type="button" class="gs-btn gs-btn--stroked gs-btn--sm" data-act="add">${t("pages.myTrips.addExpenseLine")}</button>
              <button type="button" class="gs-btn gs-btn--filled gs-btn--sm" data-act="save">${t("pages.myTrips.saveExpenseLines")}</button>
              <button type="button" class="gs-btn gs-btn--stroked gs-btn--sm" data-act="submit">${t("pages.myTrips.submitExpense")}</button>
            </div>
            <div class="gs-table-wrap" style="display:block">
              <table class="gs-table"><thead><tr>
                <th>${t("pages.myTrips.expenseCategoryLabel")}</th><th>${t("pages.myTrips.amount")}</th><th>${t("pages.myTrips.currency")}</th><th>${t("pages.myTrips.expenseDate")}</th><th>${t("pages.myTrips.description")}</th>
              </tr></thead><tbody>${lines}</tbody></table>
            </div>
          </div>
        </div>
      </article>`;
    }).join("");
  }
  function bind(){
    document.getElementById("gsRefresh")?.addEventListener("click",()=>toast(t("proto.toastRefresh")));
    document.getElementById("gsAcc")?.addEventListener("click",(e)=>{
      const tog=e.target.closest("[data-toggle]"); if(tog){ openId = +tog.getAttribute("data-toggle"); render(); return; }
      if(e.target.closest("[data-act]")) toast(t("proto.toastSaved"));
    });
    document.getElementById("stateSelect")?.addEventListener("change",(e)=>{state=e.target.value;render();});
    window.addEventListener("geosun:i18n", render);
    const params=new URLSearchParams(location.search); if(params.get("state")) state=params.get("state");
    if(params.get("hideDemo")==="1"){ const b=document.getElementById("demoBar"); if(b)b.hidden=true; }
    render();
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", bind); else bind();
})();
