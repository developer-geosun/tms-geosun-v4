
(function(){
  function t(key){const lang=document.documentElement.getAttribute("lang")||"uk";const dict=(window.GEOSUN_I18N&&(window.GEOSUN_I18N[lang]||window.GEOSUN_I18N.uk))||{};return dict[key]||key;}
  function toast(m){const el=document.getElementById("gsToast");if(!el)return;el.textContent=m;el.hidden=false;clearTimeout(el._t);el._t=setTimeout(()=>el.hidden=true,1600);}
  function bind(){
    document.querySelectorAll("#gsRefresh,#gsSync,#gsLoadNbu,#gsSave,#gsCreate").forEach(b=>b&&b.addEventListener("click",()=>toast(t("proto.toastSaved"))));
    if(new URLSearchParams(location.search).get("hideDemo")==="1"){const b=document.getElementById("demoBar");if(b)b.hidden=true;}
    window.addEventListener("geosun:i18n",()=>{});
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",bind); else bind();
})();
