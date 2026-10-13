(function(){
  function t(key){
    const lang=document.documentElement.getAttribute("lang")||"uk";
    const dict=(window.GEOSUN_I18N&&(window.GEOSUN_I18N[lang]||window.GEOSUN_I18N.uk))||{};
    return dict[key]||key;
  }
  function toast(m){
    const el=document.getElementById("gsToast");
    if(!el) return;
    el.textContent=m;
    el.hidden=false;
    clearTimeout(el._t);
    el._t=setTimeout(()=>el.hidden=true,1800);
  }
  function bind(){
    const btn=document.getElementById("ssRefreshBtn");
    const icon=document.getElementById("ssRefreshIcon");
    const spin=document.getElementById("ssRefreshSpin");
    if(btn){
      btn.addEventListener("click",()=>{
        if(btn.disabled) return;
        btn.disabled=true;
        if(icon) icon.hidden=true;
        if(spin) spin.hidden=false;
        // Prototype: simulate AuthAvailabilityService.checkOnStartup — still unavailable
        setTimeout(()=>{
          btn.disabled=false;
          if(icon) icon.hidden=false;
          if(spin) spin.hidden=true;
          toast(t("pages.stopService.tryLater"));
        }, 1200);
      });
    }
    if(new URLSearchParams(location.search).get("hideDemo")==="1"){
      const b=document.getElementById("demoBar"); if(b) b.hidden=true;
    }
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",bind); else bind();
})();
