(function(){
  function bind(){
    const btn=document.getElementById("nfHomeBtn");
    if(btn){
      btn.addEventListener("click",()=>{
        // Prototype: navigate shell to main stub (same as sidenav)
        const evt=new CustomEvent("geosun:navigate",{detail:{route:"main"}});
        // Prefer shell's data-nav handler — click a synthetic nav if present
        const nav=document.querySelector('[data-nav="main"]');
        if(nav && nav!==btn){ nav.click(); }
        else { window.dispatchEvent(evt); }
      });
    }
    if(new URLSearchParams(location.search).get("hideDemo")==="1"){
      const b=document.getElementById("demoBar"); if(b) b.hidden=true;
    }
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",bind); else bind();
})();
