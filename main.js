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
    title: 'Horizon 2035 — Hydrogen BWB Business Jet',
    kicker: 'Conceptual Aircraft Design · Sep – Oct 2024',
    period: 'Sep – Oct 2024',
    type: 'Conceptual Aircraft Design',
    institution: 'Chalmers University of Technology · GKN Aerospace',
    tools: ['OpenVSP', 'MATLAB', 'Raymer sizing methods', 'Breguet range equation', 'Constraint diagram analysis'],
    description: `A conceptual design study commissioned by <strong>GKN Aerospace</strong> for a very-light business jet targeting 2035 entry into service — the <em>Horizon 2035</em>. The aircraft accommodates six occupants, cruises at 360 knots at 35,000 ft over a 1,200 NM range, and is powered entirely by <strong>liquid hydrogen combustion turbofans</strong>. A Blended Wing Body (BWB) configuration was selected for its aerodynamic efficiency, quieter engine integration, and structural synergies with hydrogen cryo-tank packaging — offering a 15% reduction in takeoff weight and 27% lower fuel burn per seat-mile compared to conventional tube-and-wing aircraft of equivalent capacity.`,
    methodology: `The design progressed through two iterations — Dash 1 and Dash 2. Initial sizing followed Raymer's weight-fraction method across all seven mission segments (warm-up, climb, cruise at 1,200 NM, diversion cruise at 200 NM, 30-minute loiter, and landing). Hydrogen SFC for 2035 was projected by fitting a power-law curve to historical kerosene SFC data and scaling by the hydrogen-to-kerosene specific energy ratio (120 MJ/kg vs. 43 MJ/kg), yielding an estimated SFC of 6.26 × 10⁻⁶ kg/Ns. Cryogenic tank weight was estimated using a 50% gravimetric index for spherical LH₂ tanks. MTOW was solved graphically at the intersection of guessed and calculated weight curves, converging at 3,028 kg (Dash 1) and 3,313 kg (Dash 2). A constraint diagram was built across climb, cruise, and takeoff T/W curves to locate the design point at W/S = 200 kg/m². Aerodynamic analysis in OpenVSP provided parasitic drag (C_D0 = 0.0128) for the drag polar; stability was assessed via trim analysis and a CG envelope across five fuel and landing-gear loading combinations.`,
    results: [
      { value: '3,313 kg', label: 'Final MTOW (Dash 2)' },
      { value: '16.6',     label: 'Max L/D (drag polar)' },
      { value: '200 kg/m²', label: 'Design wing loading' },
      { value: '1,200 NM', label: 'Mission range' },
    ],
    report: 'hydrogen-bwb/Horizon_2035_Aircraft_Design_Report.pdf',
    images: [
      { file: 'cover.png',    caption: 'Horizon 2035 — isometric view of final BWB configuration (Dash 2)' },
      { file: 'cfd1.png',     caption: 'Top-view three-view drawing — planform geometry and wing layout' },
      { file: 'cfd2.png',     caption: 'Drag polar with maximum L/D tangent — C_D0 = 0.0155, max L/D = 16.6' },
      { file: 'plot1.png',    caption: 'Constraint diagram — T/W vs. W/S across climb, cruise, and take-off' },
      { file: 'plot2.png',    caption: 'MTOW convergence — graphical intersection at 3,028 kg (Dash 1)' },
      { file: 'plot3.png',    caption: 'Engine SFC trend — kerosene historical data and hydrogen 2035 projection' },
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
    tools: ['STAR-CCM+', 'OptoProp / BBcode', 'CATIA V5', 'Python', 'k–ω SST', 'FW-H acoustic analogy', 'MRF steady-state', 'Unsteady RANS'],
    description: `Small UAV propellers are highly efficient at low speeds, but they generate substantial noise — a growing concern in urban and research environments. This project investigates the <strong>Boxprop</strong>, a novel tip-joined blade concept developed at Chalmers, which connects two blades at the tip to eliminate free tip vortices and reduce tonal noise. The study designed and compared a two-bladed Boxprop against a four-bladed conventional reference propeller at equivalent operating conditions, using CFD for aerodynamic assessment and aero-acoustic simulation for noise evaluation.`,
    methodology: `Both propellers were designed from scratch to meet shared requirements: 152 mm diameter, 9,500 RPM, 30 m/s flight speed, and a minimum thrust of 1.5 N. The conventional propeller was generated using OptoProp (Chalmers in-house code) and the Boxprop using BBcode, with blade geometry imported into CATIA V5 via VBA scripting. An iterative CFD loop in STAR-CCM+ refined each design until target performance was achieved. The aerodynamic simulations employed the k–ω SST turbulence model with Moving Reference Frame (MRF) steady-state approach. A mesh convergence study ensured numerical accuracy, achieving a mean y+ of 0.51 on the blade surface. For aero-acoustics, Unsteady RANS was run across 5 full rotor rotations, with far-field noise computed using the Ffowcs Williams–Hawkings (FW-H) analogy. The acoustic simulation methodology was first validated against experimental tandem cylinder data before being applied to the propeller.`,
    results: [
      { value: '76.2%',   label: 'Reference prop efficiency' },
      { value: '70%',     label: 'Boxprop efficiency' },
      { value: '1.86 N',  label: 'Reference thrust' },
      { value: 'FW-H',    label: 'Acoustic method' },
    ],
    report: 'boxprop/Analysis_of_a_low_noise_Boxprop_propeller_report.pdf',
    images: [
      { file: 'cover.png',    caption: 'Boxprop CAD render — final blade design' },
      { file: 'geometry.png', caption: 'Blade geometry — span-wise cross-sections' },
      { file: 'mesh.png',     caption: 'CFD computational domain — rotating & static regions' },
      { file: 'cfd1.png',     caption: 'Pressure distribution — Boxprop at 50% tip radius, 9500 RPM' },
      { file: 'cfd2.png',     caption: 'Pressure distribution — Boxprop at 95% tip radius, showing tip interference' },
      { file: 'plot1.png',    caption: 'Wake velocity field — Boxprop downstream' },
      { file: 'plot2.png',    caption: 'Velocity field — Boxprop blade section at 50% radius' },
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

  'master-thesis': {
    title: 'Dynamic Control of HVAC Attributes',
    kicker: 'Master\'s Thesis · CFD · FNO · Reinforcement Learning · Jan – Nov 2025',
    period: 'Jan – Nov 2025',
    type: 'Master\'s Thesis / CFD & Machine Learning',
    institution: 'Chalmers University of Technology · AFRY',
    tools: ['STAR-CCM+', 'ANSA', 'Python', 'PyTorch', 'Fourier Neural Operator (FNO)', 'Soft Actor-Critic (SAC)', 'neuralop', 'NVIDIA H100 GPU'],
    description: `HVAC systems account for 20–40% of total building energy consumption, yet most still rely on simple rule-based PID controllers that cannot adapt to changing occupancy, weather, or user preferences. This Master's thesis — carried out in collaboration with <strong>AFRY</strong> — develops a complete physics-informed control framework that replaces repeated CFD solves with a fast neural surrogate, then trains a reinforcement learning agent to optimise the HVAC system in real time.<br><br>The result: a Soft Actor-Critic (SAC) controller that cuts annual energy consumption by <strong>35%</strong> compared to a PID baseline, while keeping thermal comfort violations below 2.3% of operating hours — all running at the speed needed for live closed-loop deployment.`,
    methodology: `A hospital room geometry provided by AFRY was simplified in ANSA and meshed in STAR-CCM+ with 1.8 million trimmed cells and adaptive mesh refinement (AMR) at critical gradient regions. 973 steady-state CFD simulations — covering summer, autumn, and winter boundary conditions with varying inlet temperature, mass-flow rate, radiator setpoint, and outdoor weather — were automated via a Java macro and run with the Realizable k–ε turbulence model. Each run extracted a 2,400-point spatial grid of temperature and velocity fields, creating a comprehensive training dataset.<br><br>A 3D Fourier Neural Operator (FNO) was trained on this dataset using PyTorch and the neuralop library — 256 hidden channels, 4 spectral layers, 20 Fourier modes per dimension, trained for 200 epochs on an NVIDIA H100 GPU. The FNO predicts full 3D temperature and velocity fields from boundary conditions in milliseconds, replacing the CFD solver in the control loop.<br><br>A Soft Actor-Critic (SAC) controller was coupled with the FNO surrogate. The actor and critic networks each use two hidden layers of 512 nodes. The reward function balances energy cost, temperature deviation from the 21°C setpoint, control oscillation, and occupant-zone comfort (thermal stratification, zone mean deviation, zone variance). The controller operates on a 20-minute step aligned with the room's thermal settling time, benchmarked against a PI controller over a full year of Swedish weather data.`,
    results: [
      { value: '35%',      label: 'Energy saving vs. PID' },
      { value: '4,836 kWh', label: 'SAC annual consumption' },
      { value: '>90%',     label: 'FNO predictions within 5% error' },
      { value: '973',      label: 'CFD training simulations' },
    ],
    report: 'master-thesis/Dynamic_Control_of_HVAC_Attributes_Master_Thesis.pdf',
    images: [
      { file: 'cover.png',  caption: 'Volume rendering of velocity flow field inside ventilated hospital room' },
      { file: 'cfd1.png',   caption: 'CFD steady-state temperature contour — buoyancy-driven stratification and radiator plume' },
      { file: 'cfd2.png',   caption: 'FNO prediction vs. CFD ground truth — temperature field at Y = 200 mm cross-section' },
      { file: 'plot1.png',  caption: 'SAC vs. PID cumulative energy — 35% annual savings (4,836 vs 7,459 kWh)' },
      { file: 'plot2.png',  caption: 'FNO prediction accuracy — temperature and velocity error distributions across 2,400 test points' },
      { file: 'plot3.png',  caption: 'SAC room temperature tracking vs. outdoor conditions over 1 full year' },
      { file: 'plot4.png',  caption: 'SAC critic network training loss convergence (log scale)' },
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

  // Determine cover image (use first image file if defined, else fallback)
  const coverSrc = p.images[0] ? `images/${id}/${p.images[0].file}` : `images/${id}/cover.jpg`;

  const reportHTML = p.report
    ? `<a class="po-report-link" href="${p.report}" target="_blank" rel="noopener">
         <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
           <path d="M9 2H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V6L9 2z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>
           <path d="M9 2v4h4" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>
           <path d="M6 9h4M6 11.5h2.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
         </svg>
         Read Full Report
       </a>`
    : '';

  poContent.innerHTML = `
    <img class="po-hero-img" src="${coverSrc}" alt="${p.title}"
         onerror="this.style.display='none'" />
    <div class="po-header">
      <div class="po-title-block">
        <div class="po-kicker">${p.kicker}</div>
        <h2>${p.title}</h2>
        <p class="po-description">${p.description}</p>
        ${reportHTML}
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
