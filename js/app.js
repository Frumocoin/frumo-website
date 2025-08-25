// frumo.app.js — clean, robust, no inline <script> blocks

(() => {
  const cfg = window.FRUMO || {};
  const $  = (sel) => document.querySelector(sel);
  const by = (id)  => document.getElementById(id);

  // ---- Outbound links (only if values exist) ----
  const setHref = (id, url) => { const el = by(id); if (el && url) el.href = url; };
  setHref('scanBtn',    cfg.solscanUrl);
  setHref('tgBtn',      cfg.telegramUrl);
  setHref('xBtn',       cfg.twitterUrl);
  setHref('joinTg',     cfg.telegramUrl);
  setHref('followX',    cfg.twitterUrl);
  setHref('raydiumBtn', cfg.raydiumUrl);
  setHref('chartBtn',   cfg.dexScreenerUrl);

  // ---- Token address display ----
  const addrEl = by('addr');
  if (addrEl && cfg.tokenAddress) addrEl.textContent = cfg.tokenAddress;

  // ---- Copy Address (with fallback) ----
  const copyBtn = by('copyBtn');
  const copy = async (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      // fallback: temporary textarea
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.focus(); ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
  };
  if (copyBtn && addrEl) {
    copyBtn.addEventListener('click', async () => {
      const address = addrEl.textContent.trim();
      try {
        await copy(address);
        const prev = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => (copyBtn.textContent = prev), 1500);
      } catch (e) {
        console.error('Copy failed:', e);
        alert('Failed to copy. Please copy manually.');
      }
    });
  }

  // ---- Footer year (optional #year span) ----
  const year = by('year');
  if (year) year.textContent = String(new Date().getFullYear());

  // ---- Tokenomics table data-labels for mobile ----
  const table = document.querySelector('.tokey table, table.tokentable');
  if (table) {
    const headers = Array.from(table.querySelectorAll('thead th')).map(th => th.textContent.trim());
    table.querySelectorAll('tbody tr').forEach(tr => {
      Array.from(tr.children).forEach((td, i) => {
        if (!td.hasAttribute('data-label') && headers[i]) {
          td.setAttribute('data-label', headers[i]);
        }
      });
    });
  }

  // ---- Mobile nav toggle (if present) ----
  const navBtn = $('.nav-toggle');
  const nav    = $('.site-nav');
  if (navBtn && nav) {
    navBtn.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      navBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
})();
