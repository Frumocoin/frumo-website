// FRUMO minimal client helpers (clean)
(function(){
  const s = window.FRUMO || {};
  const $ = (sel) => document.querySelector(sel);
  const byId = (id)=>document.getElementById(id);

  // Wire outbound links if configured
  const setHref = (id,url)=>{ const el = byId(id); if(el && url) el.href = url; };
  setHref('scanBtn', s.solscanUrl);
  setHref('tgBtn', s.telegramUrl);
  setHref('xBtn', s.twitterUrl);
  setHref('joinTg', s.telegramUrl);
  setHref('followX', s.twitterUrl);
  setHref('raydiumBtn', s.raydiumUrl);
  setHref('chartBtn', s.dexScreenerUrl);

  // Token contract address show + copy
  const addrEl = byId('addr');
  if (addrEl && s.tokenAddress) addrEl.textContent = s.tokenAddress;
  const copyBtn = byId('copyBtn');
  if (copyBtn && s.tokenAddress){
    copyBtn.addEventListener('click', async () => {
      try{
        await navigator.clipboard.writeText(s.tokenAddress);
        const old = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(()=>{ copyBtn.textContent = old; }, 1500);
      }catch(e){ alert('Copy failed'); }
    });
  }

  // Footer year
  const yEl = byId('year');
  if (yEl) yEl.textContent = new Date().getFullYear();
})();

// Tokenomics table: add data-label attributes for stacked mobile layout
(function(){
  const table = document.querySelector('.tokey table, table.tokentable');
  if (!table) return;
  const heads = Array.from(table.querySelectorAll('thead th')).map(th => th.textContent.trim());
  table.querySelectorAll('tbody tr').forEach(tr => {
    Array.from(tr.children).forEach((td, i) => {
      if (!td.getAttribute('data-label') && heads[i]) td.setAttribute('data-label', heads[i]);
    });
  });
})();

// Mobile nav toggle (if markup present)
(function(){
  const nav = document.querySelector('.site-nav');
  const btn = document.querySelector('.nav-toggle');
  if (!nav || !btn) return;
  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
})();

<script>
(() => {
  const table = document.querySelector('.tokey table');
  if (!table) return;
  const headers = Array.from[table.querySelectorAll('thead th')].map(th => th.textContent.trim());
  table.querySelectorAll('tbody tr').forEach(tr => {
    Array.from(tr.children).forEach((td, i) => {
      if (!td.hasAttribute('data-label') && headers[i]) td.setAttribute('data-label', headers[i]);
    });
  });
})();
</script>

