/* main.js — portfolio interactions */

// ── Scroll reveal ──────────────────────────────────────────────
const revealEls = document.querySelectorAll(
  '.tl-card, .project-card, .skill-group, .stat-card, .cert-item, .contact-link, .contact-card'
);
revealEls.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 60);
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => io.observe(el));

// ── Active nav highlight ───────────────────────────────────────
const sections = document.querySelectorAll('section[id], header[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(a => {
        a.style.color = '';
        if (a.getAttribute('href') === `#${id}`) {
          a.style.color = 'var(--amber)';
        }
      });
    }
  });
}, { rootMargin: '-40% 0px -55%' });

sections.forEach(s => sectionObserver.observe(s));

// ── Hamburger ──────────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinksList = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinksList.classList.toggle('open');
});

navLinksList.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinksList.classList.remove('open'));
});

// ── Flow canvas visualisation ──────────────────────────────────
const canvas = document.getElementById('flowCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let W, H, particles, animId;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    initParticles();
  }

  function rand(a, b) { return a + Math.random() * (b - a); }

  function initParticles() {
    particles = Array.from({ length: 180 }, () => createParticle());
  }

  function createParticle(x) {
    const y = rand(0, H);
    const speed = rand(0.6, 2.2);
    const size  = rand(1, 2.5);
    // Colour palette: amber → dim white
    const hue = rand(30, 50);
    const lightness = rand(40, 75);
    return {
      x: x !== undefined ? x : rand(0, W),
      y,
      vy: rand(-0.15, 0.15),
      vx: speed,
      size,
      life: 1,
      decay: rand(0.003, 0.008),
      color: `hsl(${hue}, 80%, ${lightness}%)`
    };
  }

  // Karman vortex street positions
  const vortices = [
    { x: W * 0.35, y: H * 0.5, r: 60, sign: 1 },
    { x: W * 0.6,  y: H * 0.5, r: 60, sign: -1 },
  ];

  function applyForces(p) {
    vortices.forEach(v => {
      const dx = p.x - v.x;
      const dy = p.y - v.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < v.r && dist > 4) {
        const strength = (v.r - dist) / v.r * 0.25;
        // Perpendicular deflection (vortex rotation)
        p.vx += (-dy / dist) * strength * 0.5 * v.sign;
        p.vy += ( dx / dist) * strength * 0.5 * v.sign;
      }
    });
    // Damping
    p.vx *= 0.995;
    p.vy *= 0.99;
    // Clamp speed
    const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
    if (spd > 3) { p.vx = p.vx / spd * 3; p.vy = p.vy / spd * 3; }
  }

  function drawFrame() {
    ctx.fillStyle = 'rgba(19, 22, 29, 0.25)';
    ctx.fillRect(0, 0, W, H);

    // Draw obstacle (truck body silhouette — simple rect)
    const obstW = 14, obstH = H * 0.45;
    const obstX = W * 0.28, obstY = (H - obstH) / 2;
    ctx.fillStyle = '#1a1e28';
    ctx.strokeStyle = 'rgba(232,160,48,0.35)';
    ctx.lineWidth = 1;
    ctx.fillRect(obstX, obstY, obstW, obstH);
    ctx.strokeRect(obstX, obstY, obstW, obstH);

    // Update & draw particles
    vortices[0].x = W * 0.38;
    vortices[0].y = H * 0.5;
    vortices[1].x = W * 0.65;
    vortices[1].y = H * 0.5;

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      applyForces(p);
      p.x += p.vx;
      p.y += p.vy;
      p.life -= p.decay;

      if (p.life <= 0 || p.x > W + 10) {
        particles[i] = createParticle(0);
        continue;
      }

      ctx.globalAlpha = p.life * 0.8;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // Label overlay: velocity legend strip
    ctx.fillStyle = 'rgba(232,160,48,0.55)';
    const barX = 12, barY = H - 28;
    for (let i = 0; i < 60; i++) {
      const t = i / 60;
      ctx.fillStyle = `hsl(${30 + t * 25}, 80%, ${40 + t * 35}%)`;
      ctx.fillRect(barX + i * 2.5, barY, 2.5, 8);
    }
    ctx.fillStyle = 'rgba(150,140,130,0.6)';
    ctx.font = '9px DM Mono, monospace';
    ctx.fillText('u/U∞  0', barX, barY + 20);
    ctx.fillText('1', barX + 140, barY + 20);

    animId = requestAnimationFrame(drawFrame);
  }

  window.addEventListener('resize', () => {
    cancelAnimationFrame(animId);
    resize();
    drawFrame();
  });

  resize();
  drawFrame();
}

// ── Smooth number counter on stat cards ───────────────────────
function animateCounter(el, target, suffix = '') {
  const duration = 1200;
  const start = performance.now();
  const update = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const value = Math.round(target * progress);
    el.textContent = value + suffix;
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

const statNums = document.querySelectorAll('.stat-num');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const raw = el.textContent.trim();
    if (raw === '5+') animateCounter(el, 5, '+');
    else if (raw === '6') animateCounter(el, 6, '');
    else if (raw === '3') animateCounter(el, 3, '');
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });

statNums.forEach(el => counterObserver.observe(el));
