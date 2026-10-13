
(function(){
  function t(key){const lang=document.documentElement.getAttribute("lang")||"uk";const dict=(window.GEOSUN_I18N&&(window.GEOSUN_I18N[lang]||window.GEOSUN_I18N.uk))||{};return dict[key]||key;}
  function toast(m){const el=document.getElementById("gsToast");if(!el)return;el.textContent=m;el.hidden=false;clearTimeout(el._t);el._t=setTimeout(()=>el.hidden=true,1600);}
  function applyMode(){
    const params=new URLSearchParams(location.search);
    const mode=params.get("mode")||"edit";
    const title=document.getElementById("gsModeTitle");
    const no=document.getElementById("gsTripNo");
    if(mode==="create"){ if(title) title.setAttribute("data-i18n","pages.adminTrips.createTitle"); if(no) no.textContent=""; }
    else { if(title) title.setAttribute("data-i18n","pages.adminTrips.editTitle"); if(no) no.textContent="T-2026-014"; }
    window.dispatchEvent(new CustomEvent("geosun:i18n"));
  }
  function bind(){
    document.getElementById("gsSave")?.addEventListener("click",()=>toast(t("proto.toastSaved")));
    document.getElementById("gsBack")?.addEventListener("click",()=>toast("/admin/trips"));
    document.getElementById("gsStatusActions")?.addEventListener("click",(e)=>{
      const b=e.target.closest("[data-st]"); if(!b)return;
      document.querySelectorAll("#gsStatusActions .gs-chip").forEach(x=>x.classList.remove("is-active"));
      b.classList.add("is-active");
      const chip=document.getElementById("gsStatusChip"); if(chip) chip.textContent=t("pages.adminTrips.status."+b.getAttribute("data-st"));
      toast(t("proto.toastSaved"));
    });
    if(new URLSearchParams(location.search).get("hideDemo")==="1"){const b=document.getElementById("demoBar");if(b)b.hidden=true;}
    // demo bar mode via stateSelect: create uses empty-ish, list=edit
    const sel=document.getElementById("stateSelect");
    if(sel){ sel.innerHTML='<option value="edit" selected>edit</option><option value="create">create</option>'; sel.addEventListener("change",(e)=>{
      const u=new URL(location.href); u.searchParams.set("mode", e.target.value==="create"?"create":"edit"); history.replaceState({},"",u); applyMode();
    });}
    applyMode();
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",bind); else bind();
})();
