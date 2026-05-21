/* =============================================
   MindDecode — animations.js
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initCounters();
  initParticles();
  initTyping();
  initParallax();
  initOrbitDots();
});

/* ── Scroll Reveal ────────────────────────── */
function initScrollReveal() {
  const selector = '.reveal, .reveal-left, .reveal-right, .stagger-children';
  const targets  = document.querySelectorAll(selector);

  const obs = new IntersectionObserver((entries) => {
    entries.forEach((en, idx) => {
      if (en.isIntersecting) {
        const delay = en.target.classList.contains('stagger-children') ? 0 : idx * 55;
        setTimeout(() => {
          en.target.classList.add('revealed');
          // Re-init lucide in case icons are inside revealed containers
          if (typeof lucide !== 'undefined') lucide.createIcons();
        }, delay);
        obs.unobserve(en.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(t => obs.observe(t));
}

/* ── Animated Counters ────────────────────── */
function initCounters() {
  const els = document.querySelectorAll('[data-count]');
  if (!els.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        animCount(en.target);
        obs.unobserve(en.target);
      }
    });
  }, { threshold: 0.5 });

  els.forEach(el => obs.observe(el));
}

function animCount(el) {
  const target   = parseInt(el.dataset.count, 10);
  const suffix   = el.dataset.suffix || '';
  const steps    = 55;
  const easeOut  = t => 1 - Math.pow(1 - t, 3);
  let frame = 0;

  const tick = () => {
    frame++;
    const progress = Math.min(frame / steps, 1);
    const current  = Math.round(target * easeOut(progress));
    el.textContent = fmtNum(current) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function fmtNum(n) {
  if (n >= 1000) return (n / 1000).toFixed(n % 1000 === 0 ? 0 : 1) + 'K';
  return String(n);
}

/* ── Particles ────────────────────────────── */
function initParticles() {
  const wrap = document.querySelector('.particles-wrap');
  if (!wrap) return;

  const isMobile = window.innerWidth < 768;
  const count    = isMobile ? 16 : 32;
  const colors   = [
    'rgba(255,255,255,0.35)',
    'rgba(245,164,0,0.35)',
    'rgba(26,143,227,0.35)',
  ];

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size  = Math.random() * 5 + 2;
    p.style.cssText = [
      `width:${size}px`,
      `height:${size}px`,
      `left:${Math.random() * 100}%`,
      `bottom:0`,
      `background:${colors[Math.floor(Math.random() * colors.length)]}`,
      `animation-duration:${Math.random() * 12 + 7}s`,
      `animation-delay:${Math.random() * 10}s`,
    ].join(';');
    wrap.appendChild(p);
  }
}

/* ── Typing effect ────────────────────────── */
function initTyping() {
  const el = document.querySelector('.typing-text');
  if (!el) return;

  let words;
  try { words = JSON.parse(el.dataset.words); }
  catch { words = ['Potential', 'Intelligence', 'Strengths', 'Purpose']; }

  let wi = 0, ci = 0, deleting = false;

  function tick() {
    const word = words[wi];
    if (!deleting) {
      el.textContent = word.slice(0, ++ci);
      if (ci === word.length) {
        deleting = true;
        return setTimeout(tick, 1800);
      }
    } else {
      el.textContent = word.slice(0, --ci);
      if (ci === 0) {
        deleting = false;
        wi = (wi + 1) % words.length;
      }
    }
    setTimeout(tick, deleting ? 55 : 85);
  }
  tick();
}

/* ── Mouse parallax on hero blobs ─────────── */
function initParallax() {
  if (window.matchMedia('(hover: none)').matches) return;
  const blobs = document.querySelectorAll('.hero-blob');
  if (!blobs.length) return;

  document.addEventListener('mousemove', e => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;
    blobs.forEach((b, i) => {
      const f = (i + 1) * 10;
      b.style.transform = `translate(${dx * f}px, ${dy * f}px)`;
    });
  });
}

/* ── Orbit dots on hero brain ─────────────── */
function initOrbitDots() {
  const container = document.querySelector('.brain-container');
  if (!container) return;

  const cfgs = [
    { color: '#F57C00', size: 11, radius: 195, speed: 5,  start: 0   },
    { color: '#1A8FE3', size: 7,  radius: 163, speed: 7,  start: 90  },
    { color: '#FFFFFF', size: 9,  radius: 178, speed: 4,  start: 180 },
    { color: '#F57C00', size: 5,  radius: 148, speed: 8,  start: 270 },
  ];

  const dots = cfgs.map(cfg => {
    const el = document.createElement('div');
    el.className = 'orbit-dot';
    el.style.cssText = [
      `width:${cfg.size}px`,
      `height:${cfg.size}px`,
      `background:${cfg.color}`,
      `box-shadow:0 0 ${cfg.size * 2}px ${cfg.color}`,
    ].join(';');
    container.appendChild(el);
    return { el, ...cfg, angle: cfg.start };
  });

  let last = 0;
  const cx = 210, cy = 210; // container center (420 / 2)

  function frame(ts) {
    const dt = Math.min((ts - last) / 1000, 0.05); // cap dt
    last = ts;
    dots.forEach(d => {
      d.angle += d.speed * dt * 30;
      const rad = d.angle * Math.PI / 180;
      d.el.style.left = (cx + d.radius * Math.cos(rad) - d.el.offsetWidth  / 2) + 'px';
      d.el.style.top  = (cy + d.radius * Math.sin(rad) - d.el.offsetHeight / 2) + 'px';
    });
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
