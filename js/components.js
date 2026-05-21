/* =============================================
   MindDecode — Shared Components
   Uses Lucide icons (loaded via CDN in each page)
   ============================================= */

const NAV_HTML = `
<nav class="navbar" id="navbar">
  <div class="container">
    <a href="index.html" class="nav-logo">
      <img src="assets/images/logo.jpeg" alt="MindDecode" class="logo-img">
      <span class="logo-text">Mind<span>Decode</span></span>
    </a>
    <div class="nav-links">
      <a href="index.html"><i data-lucide="home" class="nav-icon"></i>Home</a>
      <a href="about.html"><i data-lucide="users" class="nav-icon"></i>About</a>
      <a href="dmit-test.html"><i data-lucide="dna" class="nav-icon"></i>DMIT Test</a>
      <a href="services.html"><i data-lucide="layout-grid" class="nav-icon"></i>Services</a>
      <a href="blog.html"><i data-lucide="newspaper" class="nav-icon"></i>Blog</a>
      <a href="contact.html"><i data-lucide="phone" class="nav-icon"></i>Contact</a>
    </div>
    <div class="nav-cta">
      <a href="contact.html" class="btn btn-outline btn-sm">Free Consult</a>
      <a href="booking.html" class="btn btn-primary btn-sm">
        <i data-lucide="calendar-check" class="btn-icon"></i>Book Test
      </a>
    </div>
    <button class="hamburger" id="hamburger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>
<div class="mobile-menu" id="mobileMenu">
  <a href="index.html"><i data-lucide="home" class="mm-icon"></i>Home</a>
  <a href="about.html"><i data-lucide="users" class="mm-icon"></i>About Us</a>
  <a href="dmit-test.html"><i data-lucide="dna" class="mm-icon"></i>DMIT Test</a>
  <a href="services.html"><i data-lucide="layout-grid" class="mm-icon"></i>Services</a>
  <a href="blog.html"><i data-lucide="newspaper" class="mm-icon"></i>Blog</a>
  <a href="contact.html"><i data-lucide="phone" class="mm-icon"></i>Contact</a>
  <a href="booking.html" class="btn btn-primary mm-book">
    <i data-lucide="calendar-check" class="btn-icon"></i>Book Your Test
  </a>
</div>`;

const FOOTER_HTML = `
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="index.html" class="nav-logo" style="margin-bottom:16px;display:inline-flex">
          <img src="assets/images/logo.jpeg" alt="MindDecode" class="logo-img">
          <span class="logo-text">Mind<span>Decode</span></span>
        </a>
        <p>Unlock your child's true potential with scientifically proven DMIT testing. We help families discover unique strengths, learning styles, and career paths.</p>
        <div class="footer-social">
          <a href="#" class="social-link" aria-label="Facebook"><i data-lucide="facebook"></i></a>
          <a href="#" class="social-link" aria-label="Instagram"><i data-lucide="instagram"></i></a>
          <a href="#" class="social-link" aria-label="YouTube"><i data-lucide="youtube"></i></a>
          <a href="#" class="social-link" aria-label="LinkedIn"><i data-lucide="linkedin"></i></a>
          <a href="#" class="social-link" aria-label="Twitter"><i data-lucide="twitter"></i></a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Quick Links</h4>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html">About Us</a></li>
          <li><a href="dmit-test.html">DMIT Test</a></li>
          <li><a href="services.html">Services</a></li>
          <li><a href="booking.html">Book Now</a></li>
          <li><a href="blog.html">Blog</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Services</h4>
        <ul>
          <li><a href="services.html">DMIT for Kids</a></li>
          <li><a href="services.html">Career Counseling</a></li>
          <li><a href="services.html">Parenting Guidance</a></li>
          <li><a href="services.html">Brain Dominance</a></li>
          <li><a href="services.html">Learning Styles</a></li>
          <li><a href="contact.html">Free Consultation</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Stay Updated</h4>
        <p style="font-size:.85rem;color:rgba(255,255,255,.5);margin-bottom:12px">Get intelligence insights weekly.</p>
        <form class="newsletter-form" onsubmit="return false">
          <input type="email" placeholder="Your email" required>
          <button type="submit" class="btn btn-primary"><i data-lucide="send" style="width:14px;height:14px"></i></button>
        </form>
        <div class="footer-contact-list">
          <a href="tel:+919876543210" class="footer-contact-item">
            <i data-lucide="phone" class="fc-icon"></i>+91 98765 43210
          </a>
          <a href="mailto:hello@minddecode.in" class="footer-contact-item">
            <i data-lucide="mail" class="fc-icon"></i>hello@minddecode.in
          </a>
          <div class="footer-contact-item">
            <i data-lucide="map-pin" class="fc-icon"></i>Mumbai, Maharashtra
          </div>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2025 MindDecode. All rights reserved. Built for brighter futures.</p>
      <div class="footer-certs">
        <span class="cert-badge"><i data-lucide="shield-check" class="cert-icon"></i>ISO Certified</span>
        <span class="cert-badge"><i data-lucide="award" class="cert-icon"></i>DMIT Accredited</span>
        <span class="cert-badge"><i data-lucide="lock" class="cert-icon"></i>Privacy Safe</span>
      </div>
    </div>
  </div>
</footer>`;

const WA_FLOAT = `
<a href="https://wa.me/919876543210" class="wa-float" target="_blank" rel="noopener" aria-label="WhatsApp">
  <svg viewBox="0 0 24 24" width="26" height="26" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
  <span class="wa-tooltip">Chat on WhatsApp</span>
</a>`;

// Inject into page
document.getElementById('nav-placeholder')?.insertAdjacentHTML('afterbegin', NAV_HTML);
document.getElementById('footer-placeholder')?.insertAdjacentHTML('afterbegin', FOOTER_HTML);
document.body.insertAdjacentHTML('beforeend', WA_FLOAT);

// Init Lucide icons after injection - retry pattern for async load
function tryLucide() {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  } else {
    setTimeout(tryLucide, 100);
  }
}
tryLucide();
