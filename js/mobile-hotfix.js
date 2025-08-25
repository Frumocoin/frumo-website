
// ===== FRUMO MOBILE RESCUE JS (load last) =====
(function(){
  function removeDots(root){
    if(!root) return;
    [...root.childNodes].forEach(n=>{
      if(n.nodeType===3 && (/^\.{3,}$|^…+$/.test((n.nodeValue||'').trim()))) n.remove();
    });
    [...root.querySelectorAll('*')].forEach(el=>{
      if(el.children.length===0){
        let t=(el.textContent||'').trim();
        if(/^\.{3,}$|^…+$/.test(t)) el.remove();
      }
    });
  }
  removeDots(document.body);
  new MutationObserver(()=>removeDots(document.body)).observe(document.body,{childList:true,subtree:true});

  const table=document.querySelector('.tokey table');
  if(table){
    const heads=[...table.querySelectorAll('thead th')].map(th=>th.textContent.trim());
    table.querySelectorAll('tbody tr').forEach(tr=>{
      [...tr.children].forEach((td,i)=>{
        if(!td.hasAttribute('data-label') && heads[i]) td.setAttribute('data-label', heads[i]);
      });
    });
  }
  document.body.setAttribute('data-mobile-rescue','on');
})();
