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

// Copy Address → "Copied!" feedback (safe)
(() => {
  const btn = document.getElementById('copyBtn');
  const code = document.getElementById('addr');
  if (!btn || !code) return;
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(code.textContent.trim());
      const prev = btn.textContent;
      btn.textContent = 'Copied!';
      setTimeout(() => (btn.textContent = prev), 900);
    } catch {}
  });
})();


// Highlight nav link for the section that's in view
(() => {
  const links = [...document.querySelectorAll('.nav-links a[href^="#"]')];
  if (!links.length) return;
  const targets = links
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  const setActive = (id) => {
    links.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === `#${id}`));
  };

  const io = new IntersectionObserver((ents) => {
    const visible = ents
      .filter(e => e.isIntersecting)
      .sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible && visible.target.id) setActive(visible.target.id);
  }, { rootMargin: "-30% 0px -60% 0px", threshold:[0, .2, .5, .7] });

  targets.forEach(t => io.observe(t));
})();


// Reveal sections/cards as they appear
(() => {
  const els = document.querySelectorAll('.section, .card.panel, .step, .roadmap .card, .tokey table');
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-in'); });
  }, { threshold: .12 });
  els.forEach(el => { el.classList.add('reveal'); io.observe(el); });
})();


// Auto-add data-labels to <td> elements in Tokenomics table
(() => {
  const table = document.querySelector('.tokey table');
  if (!table) return;

  const headers = [...table.querySelectorAll('thead th')].map(th => th.textContent.trim());
  const rows = table.querySelectorAll('tbody tr');

  rows.forEach(row => {
    [...row.children].forEach((td, idx) => {
      if (!td.hasAttribute('data-label') && headers[idx]) {
        td.setAttribute('data-label', headers[idx]);
      }
    });
  });
})();


// Add data-labels to tokenomics <td> (for stacked mobile view)
(() => {
  const table = document.querySelector('.tokey table');
  if (!table) return;
  const headers = [...table.querySelectorAll('thead th')].map(th => th.textContent.trim());
  table.querySelectorAll('tbody tr').forEach(row => {
    [...row.children].forEach((td, i) => {
      if (!td.hasAttribute('data-label') && headers[i]) td.setAttribute('data-label', headers[i]);
    });
  });
})();


(() => {
  const table = document.querySelector('.tokey table');
  if (!table) return;
  const headers = [...table.querySelectorAll('thead th')].map(th => th.textContent.trim());
  table.querySelectorAll('tbody tr').forEach(tr => {
    [...tr.children].forEach((td, i) => {
      if (!td.hasAttribute('data-label') && headers[i]) td.setAttribute('data-label', headers[i]);
    });
  });
})();



// Mobile burger toggle
(() => {
  const nav = document.querySelector('.site-nav');
  const btn = document.querySelector('.nav-toggle');
  if (!nav || !btn) return;
  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
})();


