/* main.js — portfolio interactions v2 */

// ── Project data ───────────────────────────────────────────────
// Images live in:  images/<id>/cover.jpg  (card thumbnail)
//                  images/<id>/geometry.jpg
//                  images/<id>/mesh.jpg
//                  images/<id>/cfd1.jpg
//                  images/<id>/cfd2.jpg
//                  images/<id>/plot1.jpg
//                  images/<id>/plot2.jpg
// Any .png files work too — just update the extensions in the images arrays below.

const PROJECTS = {
  'truck-spray': {
    title: 'Water Spray Behind Heavy Trucks',
    kicker: 'Multiphase CFD · 2024 – Present',
    period: '2024 – Present',
    type: 'CFD / Multiphase Flow',
    institution: 'Chalmers University of Technology',
    tools: ['STAR-CCM+', 'Python', 'RANS', 'DES', 'Lagrangian particle tracking', 'Gaussian surrogate models'],
    description: `Tire-generated water spray is a major visibility hazard for autonomous driving in wet conditions. This project, part of the SEVVOS initiative at Chalmers, uses high-fidelity CFD to characterise droplet dispersion in the turbulent wake of heavy trucks.`,
    methodology: `RANS steady-state simulations established the mean flow field around a full-scale truck geometry, capturing recirculation zones and shear layers in the near wake. Detached Eddy Simulation (DES) resolved large-scale turbulent structures responsible for droplet transport. Lagrangian particle tracking injected droplets at tyre contact patches, tracking size-distribution evolution, coalescence, and evaporation through the wake. Gaussian plume and Gaussian-mixture surrogate models were fitted to CFD results to create fast predictive tools for concentration fields, enabling parametric studies across vehicle speeds, headway distances, and rainfall intensities. Post-processing was automated in Python, computing plume widths, centreline drift, and trajectory visualisations.`,
    results: [
      { value: 'DES',      label: 'Turbulence method' },
      { value: '~10M',     label: 'Cell count' },
      { value: 'Gaussian', label: 'Surrogate model' },
      { value: 'SEVVOS',   label: 'Project affiliation' },
    ],
    images: [
      { file: 'geometry.jpg', caption: 'Truck geometry & computational domain' },
      { file: 'mesh.jpg',     caption: 'Surface & volume mesh detail' },
      { file: 'cfd1.jpg',     caption: 'Velocity magnitude — longitudinal plane' },
      { file: 'cfd2.jpg',     caption: 'Droplet concentration field — rear view' },
      { file: 'plot1.jpg',    caption: 'Plume width vs. downstream distance' },
      { file: 'plot2.jpg',    caption: 'Particle size distribution at 10 m' },
    ],
  },

  'hydrogen-bwb': {
    title: 'Hydrogen-Powered Blended-Wing Business Jet',
    kicker: 'Conceptual Aircraft Design · Sep – Oct 2024',
    period: 'Sep – Oct 2024',
    type: 'Conceptual Design / Aerodynamics',
    institution: 'Chalmers University of Technology',
    tools: ['OpenVSP', 'MATLAB', 'STAR-CCM+', 'Class-shape transformation', 'Mission analysis'],
    description: `Conceptual design of a six-passenger blended-wing-body (BWB) business jet powered by liquid hydrogen, demonstrating the aerodynamic and mission-performance advantages of integrating H₂ propulsion with a non-conventional airframe.`,
    methodology: `The aircraft was sized using class-shape transformation (CST) parametrisation in OpenVSP, iterating on planform geometry to achieve target lift-to-drag ratio and structural wing loading. Hydrogen fuel mass was estimated accounting for lower volumetric energy density, requiring revised tank sizing within the blended centerbody. HF120 turbofan engines were adapted for hydrogen combustion. Mission analysis over a 1,200 NM profile validated range, block fuel, and reserve requirements. CFD in STAR-CCM+ on the final outer-mold-line verified L/D and confirmed absence of premature flow separation at cruise.`,
    results: [
      { value: '≃17',      label: 'Cruise L/D' },
      { value: '74 kg/m²', label: 'Wing loading' },
      { value: '1,200 NM', label: 'Validated range' },
      { value: '−27%',     label: 'Fuel burn vs. baseline' },
    ],
    images: [
      { file: 'geometry.jpg', caption: 'BWB outer-mold-line — OpenVSP' },
      { file: 'mesh.jpg',     caption: 'CFD surface mesh' },
      { file: 'cfd1.jpg',     caption: 'Pressure coefficient — cruise AoA' },
      { file: 'cfd2.jpg',     caption: 'Streamlines over upper surface' },
      { file: 'plot1.jpg',    caption: 'Drag polar — CFD vs. reference' },
      { file: 'plot2.jpg',    caption: 'Mission fuel burn breakdown' },
    ],
  },

  'foiling-craft': {
    title: 'AI Control System for Foiling Craft',
    kicker: 'URANS · Closed-Loop Control · Apr – Jun 2024',
    period: 'Apr – Jun 2024',
    type: 'CFD / Closed-Loop Control',
    institution: 'Chalmers University of Technology',
    tools: ['STAR-CCM+', 'URANS', 'k–ω SST', 'Python', 'PD controller', 'Overset mesh'],
    description: `Hydrofoil craft require active pitch control to maintain stable flight at varying speeds and wave conditions. This project implemented and validated a PD controller directly within STAR-CCM+ using Java macros, simulating coupled fluid–structure interaction under realistic unsteady inflow.`,
    methodology: `The hydrofoil geometry was meshed with an overset (chimera) approach to allow rigid-body pitch rotation without remeshing. Unsteady RANS simulations used the k–ω SST turbulence model. A PD controller was implemented via STAR-CCM+ field functions and Java macros, reading instantaneous lift force and computing a corrective pitch angle at each time step. Gains were tuned iteratively, testing stability margins under step-change inflow disturbances simulating wave encounters. Phase-plane analysis in Python confirmed stable limit cycles and acceptable overshoot.`,
    results: [
      { value: 'k–ω SST', label: 'Turbulence model' },
      { value: 'Overset',  label: 'Mesh motion' },
      { value: 'PD',       label: 'Controller type' },
      { value: 'Stable',   label: 'Closed-loop result' },
    ],
    images: [
      { file: 'geometry.jpg', caption: 'Hydrofoil geometry & strut arrangement' },
      { file: 'mesh.jpg',     caption: 'Overset mesh — foil region' },
      { file: 'cfd1.jpg',     caption: 'Pressure contours — baseline pitch' },
      { file: 'cfd2.jpg',     caption: 'Pressure contours — controller active' },
      { file: 'plot1.jpg',    caption: 'Pitch angle vs. time — step disturbance' },
      { file: 'plot2.jpg',    caption: 'Phase-plane diagram' },
    ],
  },

  'boxprop': {
    title: 'Low-Noise Boxprop Propeller Analysis',
    kicker: 'CFD · Aero-acoustics · Jan – May 2024',
    period: 'Jan – May 2024',
    type: 'CFD / Aero-acoustics',
    institution: 'Chalmers University of Technology',
    tools: ['STAR-CCM+', 'OptoProp', 'MATLAB', 'MRF / Sliding mesh', 'FW-H acoustic analogy'],
    description: `The Boxprop — a tip-joined contra-rotating propeller concept — aims to reduce noise by eliminating free blade tips, the primary source of high-frequency tonal noise. This study compared aerodynamic efficiency and acoustic signature against a conventional propeller at equivalent thrust.`,
    methodology: `Boxprop geometry was parametrically designed in OptoProp and MATLAB, optimising blade twist and chord distribution. CFD in STAR-CCM+ used multiple-reference-frame (MRF) steady approach for initial aerodynamic assessment, followed by time-accurate sliding mesh computations. Noise was estimated via the Ffowcs Williams–Hawkings (FW-H) acoustic analogy, integrating surface pressure fluctuations on permeable control surfaces. Acoustic directivity patterns and SPL were compared against the conventional propeller at identical thrust and advance ratio.`,
    results: [
      { value: 'Quieter', label: 'vs. conventional prop' },
      { value: '−6%',     label: 'Efficiency penalty' },
      { value: 'FW-H',    label: 'Acoustic method' },
      { value: 'MRF+SM',  label: 'Simulation strategy' },
    ],
    images: [
      { file: 'geometry.jpg', caption: 'Boxprop blade geometry — OptoProp' },
      { file: 'mesh.jpg',     caption: 'Rotating domain mesh' },
      { file: 'cfd1.jpg',     caption: 'Pressure isosurfaces — blade loading' },
      { file: 'cfd2.jpg',     caption: 'Vorticity — tip vs. Boxprop junction' },
      { file: 'plot1.jpg',    caption: 'Thrust & torque coefficients vs. J' },
      { file: 'plot2.jpg',    caption: 'Acoustic directivity — SPL comparison' },
    ],
  },

  'fruit-fly': {
    title: 'Fruit Fly Wing Beat CFD',
    kicker: 'Unsteady Aerodynamics · Nov 2023 – Jan 2024',
    period: 'Nov 2023 – Jan 2024',
    type: 'CFD / Bio-inspired Aerodynamics',
    institution: 'Chalmers University of Technology',
    tools: ['STAR-CCM+', 'Overset mesh', 'AMR', 'URANS', 'Python', 'User-defined motion'],
    description: `Insect flight exploits unsteady mechanisms — leading-edge vortices, wake capture, and rotational lift — that conventional blade-element theory cannot capture. This project simulated a complete flapping cycle of a Drosophila wing to quantify these force contributions.`,
    methodology: `The fruit fly wing was reconstructed from published morphological data and meshed with an overset approach for large-amplitude flapping motion (>120° stroke). Adaptive mesh refinement (AMR) dynamically resolved the leading-edge vortex as it formed and shed. User-defined motion profiles prescribed realistic wing kinematics — stroke, deviation, and feathering angles — from high-speed video data. URANS resolved one full wingbeat (T ≈ 5 ms). Forces were decomposed into translational, rotational, and wake-capture phases, compared against published experimental measurements.`,
    results: [
      { value: 'LEV',   label: 'Dominant lift mechanism' },
      { value: '120°+', label: 'Stroke amplitude' },
      { value: '~5 ms', label: 'Wingbeat period' },
      { value: 'AMR',   label: 'Mesh adaptation' },
    ],
    images: [
      { file: 'geometry.jpg', caption: 'Drosophila wing geometry reconstruction' },
      { file: 'mesh.jpg',     caption: 'Overset mesh with AMR — mid-stroke' },
      { file: 'cfd1.jpg',     caption: 'Leading-edge vortex — Q-criterion iso-surface' },
      { file: 'cfd2.jpg',     caption: 'Pressure field — pronation phase' },
      { file: 'plot1.jpg',    caption: 'Lift & drag coefficients over one cycle' },
      { file: 'plot2.jpg',    caption: 'Force decomposition — phase contributions' },
    ],
  },
};

// ── Scroll reveal ──────────────────────────────────────────────
const revealEls = document.querySelectorAll(
  '.tl-card, .proj-card, .skill-group, .stat-card, .cert-item, .contact-link, .contact-card'
);
revealEls.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 70);
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });
revealEls.forEach(el => io.observe(el));

// ── Active nav ─────────────────────────────────────────────────
const sections   = document.querySelectorAll('section[id], header[id]');
const navLinks   = document.querySelectorAll('.nav-links a');

const sectionObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(a => {
        a.style.color = '';
        if (a.getAttribute('href') === `#${id}`) a.style.color = 'var(--amber)';
      });
    }
  });
}, { rootMargin: '-40% 0px -55%' });
sections.forEach(s => sectionObs.observe(s));

// ── Hamburger ──────────────────────────────────────────────────
const hamburger    = document.getElementById('hamburger');
const navLinksList = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => navLinksList.classList.toggle('open'));
navLinksList.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinksList.classList.remove('open'))
);

// ── Stat counters ──────────────────────────────────────────────
function animateCounter(el, target, suffix) {
  const duration = 1200, start = performance.now();
  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = Math.round(target * progress) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el  = entry.target;
    const raw = el.textContent.trim();
    if (raw === '5+') animateCounter(el, 5, '+');
    else if (raw === '6') animateCounter(el, 6, '');
    else if (raw === '3') animateCounter(el, 3, '');
    counterObs.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-num').forEach(el => counterObs.observe(el));

// ── Flow canvas ────────────────────────────────────────────────
const canvas = document.getElementById('flowCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let W, H, particles, animId;
  const rand = (a, b) => a + Math.random() * (b - a);

  const mkParticle = (x) => ({
    x: x !== undefined ? x : rand(0, W), y: rand(0, H),
    vx: rand(0.6, 2.2), vy: rand(-0.15, 0.15),
    size: rand(1, 2.5), life: 1, decay: rand(0.003, 0.008),
    color: `hsl(${rand(30,50)},80%,${rand(40,75)}%)`
  });

  const resize = () => {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    particles = Array.from({ length: 180 }, () => mkParticle());
  };

  const draw = () => {
    ctx.fillStyle = 'rgba(19,22,29,0.25)';
    ctx.fillRect(0, 0, W, H);
    const oH = H * 0.45, oX = W * 0.28, oY = (H - oH) / 2;
    ctx.fillStyle = '#1a1e28';
    ctx.strokeStyle = 'rgba(232,160,48,0.35)';
    ctx.lineWidth = 1;
    ctx.fillRect(oX, oY, 14, oH);
    ctx.strokeRect(oX, oY, 14, oH);

    const vorts = [
      { x: W*0.38, y: H*0.5, r: 60, s: 1 },
      { x: W*0.65, y: H*0.5, r: 60, s: -1 },
    ];

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      vorts.forEach(v => {
        const dx = p.x - v.x, dy = p.y - v.y, d = Math.hypot(dx, dy);
        if (d < v.r && d > 4) {
          const f = (v.r - d) / v.r * 0.25;
          p.vx += (-dy/d) * f * 0.5 * v.s;
          p.vy += ( dx/d) * f * 0.5 * v.s;
        }
      });
      p.vx *= 0.995; p.vy *= 0.99;
      const sp = Math.hypot(p.vx, p.vy);
      if (sp > 3) { p.vx = p.vx/sp*3; p.vy = p.vy/sp*3; }
      p.x += p.vx; p.y += p.vy; p.life -= p.decay;
      if (p.life <= 0 || p.x > W + 10) { particles[i] = mkParticle(0); continue; }
      ctx.globalAlpha = p.life * 0.8;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI*2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    const bx = 12, by = H - 28;
    for (let i = 0; i < 60; i++) {
      const t = i/60;
      ctx.fillStyle = `hsl(${30+t*25},80%,${40+t*35}%)`;
      ctx.fillRect(bx + i*2.5, by, 2.5, 8);
    }
    ctx.fillStyle = 'rgba(150,140,130,0.6)';
    ctx.font = '9px DM Mono,monospace';
    ctx.fillText('u/U∞  0', bx, by+20);
    ctx.fillText('1', bx+140, by+20);
    animId = requestAnimationFrame(draw);
  };

  window.addEventListener('resize', () => { cancelAnimationFrame(animId); resize(); draw(); });
  resize(); draw();
}

// ── Project overlay ────────────────────────────────────────────
const overlay   = document.getElementById('proj-overlay');
const poContent = document.getElementById('po-content');
const poBack    = document.getElementById('po-back');
let savedScrollY = 0;

function openProject(id) {
  const p = PROJECTS[id];
  if (!p) return;

  const resultsHTML = p.results.map(r =>
    `<div class="po-result-item"><div class="pr-value">${r.value}</div><div class="pr-label">${r.label}</div></div>`
  ).join('');

  const galleryHTML = p.images.map(img => {
    const src = `images/${id}/${img.file}`;
    return `
      <figure class="po-gallery-item" data-src="${src}" data-caption="${img.caption}">
        <img src="${src}" alt="${img.caption}"
             onerror="this.closest('figure').classList.add('img-placeholder')" />
        <div class="ph-filename">${img.file}</div>
        <div class="ph-label">${img.caption.split('—')[0].trim()}</div>
        <figcaption>${img.caption}</figcaption>
      </figure>`;
  }).join('');

  const toolsHTML = p.tools.map(t => `<span class="tag">${t}</span>`).join('');

  poContent.innerHTML = `
    <img class="po-hero-img" src="images/${id}/cover.jpg" alt="${p.title}"
         onerror="this.style.display='none'" />
    <div class="po-header">
      <div class="po-title-block">
        <div class="po-kicker">${p.kicker}</div>
        <h2>${p.title}</h2>
        <p class="po-description">${p.description}</p>
      </div>
      <div class="po-meta-block">
        <div class="po-meta-row"><span class="pm-label">Period</span><span class="pm-value">${p.period}</span></div>
        <div class="po-meta-row"><span class="pm-label">Type</span><span class="pm-value">${p.type}</span></div>
        <div class="po-meta-row"><span class="pm-label">Institution</span><span class="pm-value">${p.institution}</span></div>
      </div>
    </div>
    <div class="po-results">${resultsHTML}</div>
    <p class="po-section-title">Methodology</p>
    <p class="po-body-text">${p.methodology}</p>
    <p class="po-gallery-label">Figures — geometry · mesh · results</p>
    <div class="po-gallery">${galleryHTML}</div>
    <p class="po-section-title">Tools &amp; methods</p>
    <div class="po-tools">${toolsHTML}</div>
  `;

  // Lock body scroll
  savedScrollY = window.scrollY;
  document.body.style.cssText = `overflow:hidden;position:fixed;top:-${savedScrollY}px;width:100%`;

  overlay.setAttribute('aria-hidden', 'false');
  overlay.classList.add('open');
  overlay.scrollTop = 0;

  // Gallery lightbox
  overlay.querySelectorAll('.po-gallery-item:not(.img-placeholder)').forEach(fig => {
    fig.addEventListener('click', () => openLightbox(fig.dataset.src, fig.dataset.caption));
  });
}

function closeProject() {
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.cssText = '';
  window.scrollTo(0, savedScrollY);
}

poBack.addEventListener('click', closeProject);

document.querySelectorAll('.proj-card[data-project]').forEach(card => {
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');
  card.addEventListener('click', () => openProject(card.dataset.project));
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') openProject(card.dataset.project);
  });
});

// ── Lightbox ───────────────────────────────────────────────────
const lightbox      = document.getElementById('lightbox');
const lightboxImg   = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

const openLightbox = (src, alt) => {
  lightboxImg.src = src;
  lightboxImg.alt = alt || '';
  lightbox.classList.add('open');
};
const closeLightbox = () => { lightbox.classList.remove('open'); lightboxImg.src = ''; };

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (lightbox.classList.contains('open')) closeLightbox();
    else if (overlay.classList.contains('open')) closeProject();
  }
});
