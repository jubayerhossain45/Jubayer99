// ============================================================
// Portfolio Frontend JavaScript (FIXED VERSION)
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ── Contact Form ──────────────────────────────────────────
  document.getElementById('contactForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = document.getElementById('submitBtn');
    if (!btn) return;

    const originalText = btn.innerHTML;
    btn.innerHTML = '<span class="spinner"></span> Sending...';
    btn.disabled = true;

    const formData = {
      name: document.getElementById('name')?.value.trim(),
      email: document.getElementById('email')?.value.trim(),
      subject: document.getElementById('subject')?.value.trim(),
      message: document.getElementById('message')?.value.trim(),
    };

    try {
      const response = await fetch('https://jubayer99.onrender.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        showToast("✅ Message sent! I'll reply soon.", 'success');
        e.target.reset();
      } else {
        showToast('❌ ' + (data.message || 'Something went wrong.'), 'error');
      }

    } catch (err) {
      showToast('❌ Network error. Please try again.', 'error');
    } finally {
      btn.innerHTML = originalText;
      btn.disabled = false;
    }
  });

  // ── Toast Notifications ───────────────────────────────────
  let toastCount = 0;

  function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const id = `toast-${++toastCount}`;
    const toast = document.createElement('div');

    toast.id = id;
    toast.className = `toast toast--${type} toast--enter`;

    toast.innerHTML = `
      <span class="toast__message">${message}</span>
      <button class="toast__close">×</button>
    `;

    toast.querySelector('.toast__close').onclick = () => dismissToast(id);

    container.appendChild(toast);

    setTimeout(() => dismissToast(id), 4500);
  }

  function dismissToast(id) {
    const toast = document.getElementById(id);
    if (!toast) return;

    toast.classList.add('toast--exit');

    setTimeout(() => toast.remove(), 300);
  }

  // ── Typewriter ───────────────────────────────────────────
  const ROLES = [
    'Full Stack Developer',
    'Problem Solver',
    'Tech Enthusiast',
    'React Specialist',
    'Node.js Engineer',
  ];

  (function initTypewriter() {
    const el = document.getElementById('typewriter');
    if (!el) return;

    let wordIdx = 0;
    let charIdx = 0;
    let deleting = false;

    function tick() {
      const word = ROLES[wordIdx];

      if (!deleting && charIdx < word.length) {
        el.textContent = word.slice(0, ++charIdx);
        setTimeout(tick, 80);

      } else if (!deleting && charIdx === word.length) {
        setTimeout(() => {
          deleting = true;
          tick();
        }, 1500);

      } else if (deleting && charIdx > 0) {
        el.textContent = word.slice(0, --charIdx);
        setTimeout(tick, 40);

      } else {
        deleting = false;
        wordIdx = (wordIdx + 1) % ROLES.length;
        setTimeout(tick, 300);
      }
    }

    tick();
  })();

  // ── Particle Canvas ───────────────────────────────────────
  (function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.2,
    }));

    const DIST = 120;

    function draw() {
      ctx.clearRect(0, 0, W, H);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,224,255,${p.alpha})`;
        ctx.fill();
      });

      requestAnimationFrame(draw);
    }

    draw();

    window.addEventListener('resize', () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    });
  })();

  // ── Smooth Scroll ─────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(el => {
    el.addEventListener('click', (e) => {
      const href = el.getAttribute('href');
      const target = document.querySelector(href);

      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ── Navbar Scroll ─────────────────────────────────────────
  (function initNavbar() {
    const nav = document.getElementById('navbar');
    if (!nav) return;

    const sections = ['home', 'about', 'skills', 'projects', 'contact'];
    let active = 'home';

    window.addEventListener('scroll', () => {
      nav.classList.toggle('navbar--scrolled', window.scrollY > 20);

      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);

        if (el && window.scrollY >= el.offsetTop - 150) {
          if (active !== id) {
            active = id;

            document.querySelectorAll('.navbar__link').forEach(link => {
              link.classList.toggle(
                'navbar__link--active',
                link.getAttribute('href') === `#${id}`
              );
            });
          }
          break;
        }
      }
    }, { passive: true });
  })();

  // ── Hamburger Menu (FIXED CLASS MISMATCH) ────────────────
  (function initHamburger() {
    const btn = document.getElementById('hamburgerBtn');
    const menu = document.getElementById('navMenu');
    const overlay = document.getElementById('navOverlay');

    const toggle = (open) => {
      btn?.classList.toggle('navbar__hamburger--open', open);
      menu?.classList.toggle('navbar__links--open', open);
      overlay && (overlay.style.display = open ? 'block' : 'none');
    };

    btn?.addEventListener('click', () => {
      toggle(!menu?.classList.contains('navbar__links--open'));
    });

    overlay?.addEventListener('click', () => toggle(false));
  })();

  // ── Scroll Animations ────────────────────────────────────
  (function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll')
      .forEach(el => observer.observe(el));
  })();

  // ── Skill Bars ───────────────────────────────────────────
  (function initSkillBars() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.skill-bar__fill').forEach(fill => {
            fill.style.width = fill.dataset.level + '%';
          });
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('.skill-card').forEach(card => observer.observe(card));
  })();

  // ── Back To Top ──────────────────────────────────────────
  (function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      btn.classList.toggle('back-to-top--visible', window.scrollY > 400);
    });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  })();

});