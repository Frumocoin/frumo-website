// Wire links and small helpers
(function(){
  const s = window.FRUMO || {};
  const byId = (id)=>document.getElementById(id);
  const setHref = (id,url)=>{ const el = byId(id); if(el && url) el.href = url; };
  setHref('scanBtn', s.solscanUrl);
  setHref('tgBtn', s.telegramUrl);
  setHref('xBtn', s.twitterUrl);
  setHref('joinTg', s.telegramUrl);
  setHref('followX', s.twitterUrl);
  const addrEl = document.getElementById('addr');
  if(addrEl && s.tokenAddress) addrEl.textContent = s.tokenAddress;
  const copyBtn = document.getElementById('copyBtn');
  if(copyBtn && s.tokenAddress){
    copyBtn.addEventListener('click', async ()=>{
      try{ await navigator.clipboard.writeText(s.tokenAddress); copyBtn.textContent='Copied!'; setTimeout(()=>copyBtn.textContent='Copy Address',1500);}catch(e){ alert('Copy failed'); }
    });
  }
  const ray = document.getElementById('raydiumBtn'); if(ray) setHref('raydiumBtn', s.raydiumUrl);
  const chart = document.getElementById('chartBtn'); if(chart) setHref('chartBtn', s.dexScreenerUrl);
  const y = new Date().getFullYear(); const yEl = document.getElementById('year'); if(yEl) yEl.textContent = y;
})();