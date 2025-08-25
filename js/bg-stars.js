(() => {
  const canvas = document.getElementById('frumo-bg');
  if (!canvas) return;

  const ctx = canvas.getContext('2d', { alpha: true });
  let dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
  let w, h, stars, rafId;
  const STAR_DENSITY = 0.00018;       // tweak density
  const MAX_SPEED    = 0.06;          // base drift speed
  const TWINKLE      = 0.035;         // twinkle amplitude

  function resize() {
    w = canvas.width  = Math.floor(window.innerWidth  * dpr);
    h = canvas.height = Math.floor(window.innerHeight * dpr);
    canvas.style.width  = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';

    const count = Math.floor(window.innerWidth * window.innerHeight * STAR_DENSITY);
    stars = new Array(count).fill().map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: (Math.random() * 1.2 + 0.4) * dpr,
      s: (Math.random() * MAX_SPEED + 0.02) * dpr,
      t: Math.random() * Math.PI * 2,
      a: Math.random() * 0.5 + 0.3
    }));
  }

  function frame() {
    ctx.clearRect(0, 0, w, h);

    // subtle vignette so stars sit in space
    const g = ctx.createRadialGradient(w*0.8, h*0.7, 0, w*0.8, h*0.7, Math.max(w,h));
    g.addColorStop(0, 'rgba(16,60,38,0.10)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    ctx.save();
    ctx.globalCompositeOperation = 'lighter';

    for (const st of stars) {
      st.t += TWINKLE;
      let alpha = st.a + Math.sin(st.t) * 0.12;

      // slight parallax drift to the right
      st.x += st.s;
      if (st.x > w + 50) st.x = -50;

      ctx.beginPath();
      ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(230, 245, 255, ${Math.max(0, Math.min(1, alpha))})`;
      ctx.fill();
    }
    ctx.restore();

    rafId = requestAnimationFrame(frame);
  }

  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  function start() {
    if (mediaQuery.matches) return; // respect reduced motion
    cancelAnimationFrame(rafId);
    resize();
    frame();
  }

  function stop() {
    cancelAnimationFrame(rafId);
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  window.addEventListener('resize', () => {
    // debounce a bit for mobile rotations
    clearTimeout(canvas._rz);
    canvas._rz = setTimeout(start, 120);
  });

  mediaQuery.addEventListener?.('change', e => (e.matches ? stop() : start()));

  start();
})();
