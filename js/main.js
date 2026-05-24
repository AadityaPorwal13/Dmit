/* =============================================
   MindDecode — main.js
   ============================================= */

/* ── Init after DOM ready ─────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initMobileMenu();
  initActiveLink();
  initSlider();
  initFAQ();
  initServiceExpand();
  initTimeSlots();
  initPaymentMethods();
  initBlogCats();
  initBookingForm();
  initContactForm();
  initNewsletters();
  initIntelBars();
  initLucide();
});

/* ── Lucide icons ─────────────────────────── */
function initLucide() {
  function tryInit() {
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    } else {
      setTimeout(tryInit, 80);
    }
  }
  tryInit();
}

/* ── Navbar scroll ────────────────────────── */
function initNav() {
  const nav = document.querySelector('.navbar');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ── Active nav link ──────────────────────── */
function initActiveLink() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html') || (page === 'index.html' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
}

/* ── Mobile hamburger menu ────────────────── */
function initMobileMenu() {
  const btn     = document.getElementById('hamburger');
  const menu    = document.getElementById('mobileMenu');
  const overlay = document.getElementById('mobileOverlay');
  if (!btn || !menu) return;

  function openMenu() {
    menu.classList.add('open');
    btn.classList.add('active');
    overlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    menu.classList.remove('open');
    btn.classList.remove('active');
    overlay?.classList.remove('open');
    document.body.style.overflow = '';
  }

  btn.addEventListener('click', () => {
    menu.classList.contains('open') ? closeMenu() : openMenu();
  });

  // Close on link click
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  // Close on overlay tap
  overlay?.addEventListener('click', closeMenu);

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu.classList.contains('open')) closeMenu();
  });
}

/* ── Testimonial slider ───────────────────── */
function initSlider() {
  const track    = document.querySelector('.testimonial-track');
  const dotsWrap = document.querySelector('.slider-dots');
  const prevBtn  = document.querySelector('.slider-prev');
  const nextBtn  = document.querySelector('.slider-next');
  if (!track) return;

  const cards = track.querySelectorAll('.testimonial-card');
  let current = 0;
  let autoTimer;

  /* Build dots */
  if (dotsWrap) {
    cards.forEach((_, i) => {
      const d = document.createElement('div');
      d.className = 'slider-dot' + (i === 0 ? ' active' : '');
      d.addEventListener('click', () => go(i));
      dotsWrap.appendChild(d);
    });
  }

  function isMobile() { return window.innerWidth <= 768; }

  function getCardWidth() {
    if (!cards[0]) return 0;
    const style = window.getComputedStyle(track);
    const gap   = parseFloat(style.gap || style.columnGap || '24');
    return cards[0].getBoundingClientRect().width + gap;
  }

  function go(idx) {
    current = Math.max(0, Math.min(idx, cards.length - 1));

    if (isMobile()) {
      // Use native scroll on mobile
      track.scrollTo({ left: current * getCardWidth(), behavior: 'smooth' });
    } else {
      track.style.transform = `translateX(-${current * getCardWidth()}px)`;
    }

    document.querySelectorAll('.slider-dot').forEach((d, i) =>
      d.classList.toggle('active', i === current)
    );
  }

  function next() { go((current + 1) % cards.length); }
  function prev() { go((current - 1 + cards.length) % cards.length); }

  prevBtn?.addEventListener('click', prev);
  nextBtn?.addEventListener('click', next);

  function startAuto() {
    if (isMobile()) return; // no auto on mobile, user scrolls
    autoTimer = setInterval(next, 4500);
  }
  function stopAuto() { clearInterval(autoTimer); }

  startAuto();
  track.parentElement?.addEventListener('mouseenter', stopAuto);
  track.parentElement?.addEventListener('mouseleave', startAuto);

  /* Swipe / touch on desktop (mobile uses native) */
  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    if (isMobile()) return; // native scroll handles mobile
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { diff > 0 ? next() : prev(); }
  }, { passive: true });

  /* Sync dots on native scroll (mobile) */
  track.addEventListener('scroll', () => {
    if (!isMobile()) return;
    const cw = getCardWidth();
    if (cw > 0) {
      const idx = Math.round(track.scrollLeft / cw);
      if (idx !== current) {
        current = idx;
        document.querySelectorAll('.slider-dot').forEach((d, i) =>
          d.classList.toggle('active', i === current)
        );
      }
    }
  }, { passive: true });

  /* Recalc on resize */
  window.addEventListener('resize', () => go(current), { passive: true });
}

/* ── FAQ accordion ────────────────────────── */
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item    = q.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });
}

/* ── Service card expand ──────────────────── */
function initServiceExpand() {
  document.querySelectorAll('.expand-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.service-card');
      const open = card.classList.toggle('expanded');
      const icon = btn.querySelector('.expand-icon');
      if (icon) icon.textContent = open ? '▲' : '▼';
    });
  });
}

/* ── Time slot picker ─────────────────────── */
function initTimeSlots() {
  document.querySelectorAll('.time-slot:not(.unavailable)').forEach(slot => {
    slot.addEventListener('click', () => {
      document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
      slot.classList.add('selected');
      const el = document.getElementById('summaryTime');
      if (el) el.textContent = slot.textContent.trim();
    });
  });
}

/* ── Payment method tabs ──────────────────── */
function initPaymentMethods() {
  document.querySelectorAll('.pay-method').forEach(m => {
    m.addEventListener('click', () => {
      document.querySelectorAll('.pay-method').forEach(x => x.classList.remove('selected'));
      m.classList.add('selected');
    });
  });
}

/* ── Blog category filter ─────────────────── */
function initBlogCats() {
  document.querySelectorAll('.blog-cat').forEach(cat => {
    cat.addEventListener('click', () => {
      document.querySelectorAll('.blog-cat').forEach(c => c.classList.remove('active'));
      cat.classList.add('active');
    });
  });
}

/* ── Booking form ─────────────────────────── */
function initBookingForm() {
  const form = document.getElementById('bookingForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (validateForm(form)) showPopup();
  });
}

/* ── Contact form ─────────────────────────── */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type=submit]');
    if (!btn) return;
    const orig = btn.innerHTML;
    btn.innerHTML = '<i data-lucide="check" style="width:16px;height:16px"></i> Message Sent!';
    btn.style.background = 'linear-gradient(135deg,#059669,#10B981)';
    if (typeof lucide !== 'undefined') lucide.createIcons();
    setTimeout(() => {
      btn.innerHTML = orig;
      btn.style.background = '';
      if (typeof lucide !== 'undefined') lucide.createIcons();
    }, 3000);
  });
}

/* ── Newsletters ──────────────────────────── */
function initNewsletters() {
  document.querySelectorAll('form').forEach(form => {
    if (form.id === 'bookingForm' || form.id === 'contactForm') return;
    const emailInput = form.querySelector('input[type=email]');
    if (!emailInput) return;

    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button[type=submit]');
      if (!btn || !emailInput.value) return;
      const orig = btn.innerHTML;
      btn.innerHTML = 'Subscribed!';
      btn.style.background = 'linear-gradient(135deg,#059669,#10B981)';
      emailInput.value = '';
      setTimeout(() => {
        btn.innerHTML = orig;
        btn.style.background = '';
        if (typeof lucide !== 'undefined') lucide.createIcons();
      }, 3000);
    });
  });
}

/* ── Intel bars (report section) ─────────── */
function initIntelBars() {
  const bars = document.querySelectorAll('.intel-bar[data-pct]');
  if (!bars.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        const pct = en.target.dataset.pct || '70';
        setTimeout(() => { en.target.style.height = pct + '%'; }, 200);
        obs.unobserve(en.target);
      }
    });
  }, { threshold: 0.4 });

  bars.forEach(b => obs.observe(b));
}

/* ── Form validation ──────────────────────── */
function validateForm(form) {
  let valid = true;
  form.querySelectorAll('[required]').forEach(el => {
    el.style.borderColor = '';
    if (!el.value.trim()) {
      el.style.borderColor = '#EF4444';
      el.style.boxShadow   = '0 0 0 3px rgba(239,68,68,0.12)';
      valid = false;
      el.addEventListener('input', () => {
        el.style.borderColor = '';
        el.style.boxShadow   = '';
      }, { once: true });
    }
  });
  return valid;
}

/* ── Booking popup ────────────────────────── */
function showPopup() {
  const refEl = document.getElementById('refId');
  if (refEl) refEl.textContent = Math.floor(Math.random() * 90000 + 10000);
  const popup = document.getElementById('confirmPopup');
  if (!popup) return;
  popup.classList.add('open');
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

/* ── Popup close ──────────────────────────── */
document.addEventListener('click', e => {
  if (e.target.classList.contains('popup-overlay')) {
    e.target.classList.remove('open');
  }
});

/* ── Smooth scroll ────────────────────────── */
document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const target = document.querySelector(a.getAttribute('href'));
  if (target) {
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

/* ── Service price update (booking page) ─── */
function updateServicePrice(sel) {
  const opt   = sel.options[sel.selectedIndex];
  const price = parseInt(opt?.dataset?.price || '0');
  const el    = document.getElementById('summaryPrice');
  if (el) el.textContent = price === 0 ? 'FREE' : '₹' + price.toLocaleString('en-IN');
  const typeEl = document.getElementById('summaryType');
  if (typeEl) typeEl.textContent = sel.value || '—';
}
