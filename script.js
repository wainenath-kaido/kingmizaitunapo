/* ============================================================
   KINGMI ZAITUN - JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ── Navigation SPA ──
  const navLinks    = document.querySelectorAll('.nav-link[data-page]');
  const allSections = document.querySelectorAll('.page-section');

  function showPage(pageId) {
    allSections.forEach(s => s.classList.remove('active'));
    navLinks.forEach(l => l.classList.remove('active-menu'));

    const target = document.getElementById(pageId);
    if (target) {
      target.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    navLinks.forEach(l => {
      if (l.dataset.page === pageId) l.classList.add('active-menu');
    });

    // Close mobile menu
    const navCollapse = document.getElementById('navbarNav');
    if (navCollapse && navCollapse.classList.contains('show')) {
      const toggler = document.querySelector('.navbar-toggler');
      if (toggler) toggler.click();
    }
  }

  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      showPage(this.dataset.page);
    });
  });

  // Footer links
  document.querySelectorAll('[data-goto]').forEach(el => {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      showPage(this.dataset.goto);
    });
  });

  // Hero CTA buttons
  document.querySelectorAll('[data-goto]').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      showPage(this.dataset.goto);
    });
  });

  // Show beranda on load
  showPage('beranda');

  // ── Scroll to top ──
  const scrollBtn = document.getElementById('scrollTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) scrollBtn.classList.add('show');
    else scrollBtn.classList.remove('show');
  });
  scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // ── Counter Animation ──
  function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current).toLocaleString() + suffix;
    }, 16);
  }

  const counters = document.querySelectorAll('.stat-number[data-target]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));

  // ── Kontak Form ──
  const kontakForm = document.getElementById('kontakForm');
  if (kontakForm) {
    kontakForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const nama    = document.getElementById('nama').value.trim();
      const pesan   = document.getElementById('pesan').value.trim();
      if (!nama || !pesan) {
        showAlert('Harap isi semua kolom yang wajib.', 'warning');
        return;
      }
      showAlert('Pesan Anda telah berhasil dikirim! Kami akan segera menghubungi Anda.', 'success');
      kontakForm.reset();
    });
  }

  function showAlert(msg, type) {
    const alertBox = document.getElementById('alertBox');
    if (!alertBox) return;
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle';
    const color = type === 'success' ? '#2e7d32' : '#e65100';
    alertBox.innerHTML = `
      <div style="background:#fff;border-left:5px solid ${color};padding:1rem 1.5rem;border-radius:4px;
        box-shadow:0 4px 16px rgba(0,0,0,0.1);display:flex;gap:12px;align-items:center;margin-bottom:1.5rem;">
        <i class="fas ${icon}" style="color:${color};font-size:1.3rem;"></i>
        <span style="font-size:0.9rem;color:#333;">${msg}</span>
      </div>`;
    alertBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => { alertBox.innerHTML = ''; }, 5000);
  }

  // ── Jadwal Tab ──
  document.querySelectorAll('.jadwal-tab').forEach(tab => {
    tab.addEventListener('click', function () {
      document.querySelectorAll('.jadwal-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.jadwal-content').forEach(c => c.style.display = 'none');
      this.classList.add('active');
      const target = document.getElementById(this.dataset.target);
      if (target) target.style.display = 'block';
    });
  });

  // ── Accordion visi misi ──
  document.querySelectorAll('.vm-toggle').forEach(btn => {
    btn.addEventListener('click', function () {
      const content = this.nextElementSibling;
      const icon    = this.querySelector('i.toggle-icon');
      const isOpen  = content.style.display === 'block';
      content.style.display = isOpen ? 'none' : 'block';
      if (icon) icon.classList.toggle('fa-chevron-down', isOpen);
      if (icon) icon.classList.toggle('fa-chevron-up', !isOpen);
    });
  });

});
