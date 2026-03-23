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
    tools: ['STAR-CCM+', 'Python', 'RANS', 'DES', 'Lagrangian particle tracking', 'Gaussian plume model'],
    description: `Tire-generated water spray creates a critical visibility hazard for following vehicles — a growing concern as autonomous systems must reliably detect objects through dense spray clouds in wet conditions. As part of the <strong>SEVVOS</strong> initiative at Chalmers, this project uses high-fidelity CFD with Lagrangian particle tracking to characterise droplet dispersion in the turbulent wake of heavy trucks, then develops a fast <strong>Gaussian plume surrogate model</strong> that reproduces the CFD concentration fields at a fraction of the computational cost.`,
    methodology: `RANS steady-state simulations established the mean flow field around a full-scale truck geometry, resolving recirculation zones and shear layers in the near wake. Lagrangian particle tracking injected droplets at all four rear tyre contact patches, following each parcel through the turbulent wake and capturing the characteristic dual-plume structure from the two axles immediately behind the truck.<br><br>The resulting concentration fields were sampled on cross-sectional planes normal to the streamwise direction at X = 1 m and X = 10 m behind the truck. At X = 1 m, two distinct symmetric peaks corresponding to the left and right tyres are clearly resolved; by X = 10 m the plumes have merged into a single broader distribution. A Gaussian mixture model was fitted to these profiles — the Z-profiles (transverse, horizontal) captured the lateral spread, while Y-profiles (vertical) captured height-wise decay. The surrogate matches the CFD data well in the far field, providing a fast predictive tool for concentration across varying vehicle speeds and headway distances.`,
    results: [
      { value: 'DES/RANS',  label: 'Turbulence approach' },
      { value: '4 tyres',   label: 'Lagrangian injection sites' },
      { value: 'X = 1–10 m', label: 'Wake sampling range' },
      { value: 'Gaussian',  label: 'Surrogate model type' },
    ],
    images: [
      { type: 'video', src: 'water_spray/deposition_animation.mp4', caption: 'Particle deposition animation — Lagrangian droplets injected at tyre contact patches dispersing through the turbulent truck wake' },
      { file: 'cfd1.png', caption: 'CFD result — velocity field and spray cloud in the near-wake; turbulent recirculation region visible immediately behind the trailer' },
      { file: 'cfd2.png', caption: 'Lagrangian particle trajectories — droplets coloured by size, ejected from the rear tyre patches and dispersed by the wake vortex system' },
      { file: 'plot1.png', caption: 'Transverse (Z) concentration profile at X = 1 m — two distinct peaks from left and right tyres; Gaussian mixture model (orange) vs. CFD (dashed blue)' },
      { file: 'plot2.png', caption: 'Transverse (Z) concentration profile at X = 10 m — plumes merged into a single distribution; surrogate model captures overall spread' },
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
    kicker: 'URANS · PD Control · Overset Mesh · Apr – Jun 2024',
    period: 'Apr – Jun 2024',
    type: 'CFD / Closed-Loop Control',
    institution: 'Chalmers University of Technology · Division of Marine Technology',
    tools: ['STAR-CCM+', 'Implicit Unsteady RANS', 'SST k–ω', 'Overset mesh', 'Java macro', 'Python', 'PD Control'],
    description: `Hydrofoil craft lift a vessel clear of the water to drastically cut drag and energy consumption — but in rough seas, an oscillating inflow makes maintaining a stable lift force genuinely hard. This project built and validated a <strong>real-time PD controller</strong> embedded directly inside a STAR-CCM+ CFD simulation via a Java macro, actively rotating a NACA 0012 hydrofoil to track a 5,000 N lift setpoint as a sinusoidal wave velocity field sweeps past it.<br><br>The controller logic runs <em>inside</em> the solver at every time step: reading the instantaneous lift, computing the error against the setpoint, and commanding a new angle of attack — all while the flow physics continue to evolve around the moving foil.`,
    methodology: `<strong>Mesh &amp; domain:</strong> A 6×6 m 2D domain was built around a NACA 0012 hydrofoil (Re ≈ 2.2×10⁶). An overset (chimera) region surrounds the foil and rotates freely without remeshing. The background mesh includes wake refinement toward the outlet. Fifteen prism layers resolve the boundary layer to y+ ≤ 1 (near-wall thickness 2.5×10⁻⁶ m), giving 89,036 total cells. Implicit Unsteady RANS with SST k–ω and All y+ wall treatment was used throughout.<br><br><strong>Controller implementation:</strong> The PD controller is coded as a Java macro that runs inside the STAR-CCM+ solver. At every time step it: (1) reads the instantaneous lift force, averaged over 5 consecutive steps to suppress numerical noise; (2) computes the error e(t) = L_target − L_ref; (3) applies the PD law to command a new angle of attack. A hard limiter of 2.5° per time step prevents physically unrealistic actuation. Gain values (K_p ~ 10⁻⁵, K_d ~ 10⁻⁷) were first swept analytically in a Python script across hundreds of combinations, narrowing the feasible space before embedding the best candidates into the macro for full CFD validation.<br><br><strong>Inflow conditions:</strong> V(t) = 10 + 2 sin(2πnt) m/s was applied at the inlet, with frequencies n = 0.5, 1, and 2 Hz tested. The stable gain set (K_p = 2.5×10⁻⁵, K_d = 1.0×10⁻⁷) tracked the 5,000 N setpoint under 1 Hz sinusoidal inflow; an unstable set confirmed the sensitivity of embedded real-time control to gain selection.`,
    results: [
      { value: 'NACA 0012',  label: 'Hydrofoil profile' },
      { value: '5,000 N',    label: 'Lift setpoint tracked' },
      { value: '89,036',     label: 'Mesh cell count' },
      { value: '≤1 Hz',      label: 'Stable wave frequency range' },
    ],
    report: 'foiling-craft/AI_Hydrofoil_Project_Report.pdf',
    images: [
      { type: 'video', src: 'foiling-craft/varying_velocity1Hz.mp4', caption: 'CFD simulation — NACA 0012 hydrofoil tracking 5,000 N lift under 1 Hz sinusoidal inflow; PD controller actuates angle of attack in real time' },
      { file: 'mesh.png',    caption: 'Computational mesh — NACA 0012 overset region with 15 prism layers and wake refinement (89,036 cells total)' },
      { file: 'domain.png',  caption: 'Computational domain — 6×6 m with velocity inlet, pressure outlet, and slip-wall boundaries; overset foil at domain centre' },
      { file: 'plot1.png',   caption: 'Core result — lift force tracking under 1 Hz sinusoidal inlet velocity: stable gain set (K_p=2.5×10⁻⁵, K_d=1.0×10⁻⁷) follows the 5,000 N setpoint' },
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
    title: 'CFD Simulation of Fruit Fly Wing Beat Motion',
    kicker: 'Unsteady Aerodynamics · Fluid-Structure Interaction · Nov 2023 – Jan 2024',
    period: 'Nov 2023 – Jan 2024',
    type: 'CFD / Bio-inspired Unsteady Aerodynamics',
    institution: 'Chalmers University of Technology · University of Gothenburg',
    tools: ['STAR-CCM+', 'Overset mesh', 'Implicit Unsteady RANS', 'k-ω SST', 'AMR', 'MATLAB'],
    description: `A fruit fly (<em>Drosophila melanogaster</em>) beats its wings 218 times per second, generating lift through mechanisms so complex that whether each degree of freedom is driven by muscle or emerges passively from fluid-structure interaction remains an open question in biomechanics.<br><br>This project simulated eight complete wing beat cycles of a rigid <em>Drosophila</em> wing in hovering flight using STAR-CCM+, with Fourier-series kinematics from literature driving all three degrees of freedom simultaneously. The core goal: use aerodynamic moment hysteresis loops to determine which motions are <strong>active</strong> (muscle-driven) and which are <strong>passive</strong> (aerodynamically induced).`,
    methodology: `Wing geometry (Perl et al.) was scaled to a 2.5 mm span. Kinematics were derived from Fourier series of the three Euler angles — stroke, pitch, elevation — at 218 Hz, discretised into 1,000 time steps per cycle. Root XYZ trajectory and all three angles were pre-computed in MATLAB and loaded as tabulated time-series into STAR-CCM+ via nested coordinate systems (Laboratory -> Trajectory -> Yaw -> Pitch -> Roll), driving overset region translation and superimposed rotations simultaneously.<br><br>The domain used a spherical overset region (boolean-subtracted wing) inside a background cube 8x the wing span, with stagnation inlet. Implicit Unsteady RANS with k-omega SST and AMR at the overset-background interface (Re ~100) was used. Eight cycles were run on a cluster; cycles 4-7 were analysed after flow stabilised. Pitching and stroke moments were monitored every time step and plotted as hysteresis loops — loop area and sign directly indicate energy exchange and hence active vs. passive nature of each DOF.`,
    results: [
      { value: '5.76 uN', label: 'Mean lift per wing (L/W ~ 1)' },
      { value: '-2.56 nJ', label: 'Pitch moment loop (passive)' },
      { value: '+11.4 nJ', label: 'Stroke moment loop (active)' },
      { value: '8 cycles', label: 'Wing beats simulated' },
    ],
    report: 'fruit-fly/CFD_Simulation_Fruit_Fly_Wing_Beat.pdf',
    images: [
      { file: 'cover.png',  caption: 'Velocity field — Drosophila wing at mid-stroke hover (STAR-CCM+)' },
      { file: 'cfd1.png',   caption: 'Overset computational mesh — background region with wing sub-domain and AMR interface' },
      { file: 'cfd2.png',   caption: 'Velocity contours at four key instants — stroke extremes, mid-strokes, pitch reversal' },
      { file: 'plot1.png',  caption: 'Wing beat kinematics — stroke, pitch and elevation angles across one full cycle (from Dataset.csv)' },
      { file: 'plot2.png',  caption: 'Kinematic phase space — stroke vs. elevation and stroke vs. pitch coloured by time and pitch angle' },
      { file: 'plot3.png',  caption: 'Moment hysteresis — pitch loop (-2.56 nJ, passive) vs. stroke loop (+11.4 nJ, active)' },
    ],
  },

  'master-thesis': {
    title: 'Dynamic Control of HVAC Attributes',
    kicker: 'Master\'s Thesis · CFD · FNO · Reinforcement Learning · Jan – Nov 2025',
    period: 'Jan – Nov 2025',
    type: 'Master\'s Thesis / CFD & Machine Learning',
    institution: 'Chalmers University of Technology · AFRY',
    tools: ['STAR-CCM+', 'ANSA', 'Python', 'PyTorch', 'Fourier Neural Operator (FNO)', 'Soft Actor-Critic (SAC)', 'Reinforcement Learning'],
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
    `<li><span class="pr-label">${r.label}:</span> <span class="pr-value">${r.value}</span></li>`
  ).join('');

  const galleryHTML = p.images.map(img => {
    if (img.type === 'video') {
      return `
        <figure class="po-gallery-item po-gallery-item--video" data-video-src="${img.src}" data-caption="${img.caption}">
          <video src="${img.src}" muted loop playsinline preload="metadata"></video>
          <div class="po-gallery-play">▶</div>
          <figcaption>${img.caption}</figcaption>
        </figure>`;
    }
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

  // Determine cover image — skip video entries, use first image file
  const firstImg = p.images.find(i => i.type !== 'video');
  const coverSrc = firstImg ? `images/${id}/${firstImg.file}` : `images/${id}/cover.jpg`;

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
      <h2>${p.title}</h2>
      <div class="po-meta-strip">
        <span class="pm-item"><span class="pm-label">Period</span><span class="pm-value">${p.period}</span></span>
        <span class="po-meta-sep">·</span>
        <span class="pm-item"><span class="pm-label">Type</span><span class="pm-value">${p.type}</span></span>
        <span class="po-meta-sep">·</span>
        <span class="pm-item"><span class="pm-label">Institution</span><span class="pm-value">${p.institution}</span></span>
      </div>
      <p class="po-description">${p.description}</p>
      <div class="po-meta-tools-row">${toolsHTML}</div>
      ${reportHTML}
    </div>
    <p class="po-section-title">Key results</p>
    <ul class="po-results">${resultsHTML}</ul>
    <p class="po-section-title">Methodology</p>
    <p class="po-body-text">${p.methodology}</p>
    <p class="po-gallery-label">Figures — geometry · mesh · results</p>
    <div class="po-gallery">${galleryHTML}</div>
  `;

  // Lock body scroll
  savedScrollY = window.scrollY;
  document.body.style.cssText = `overflow:hidden;position:fixed;top:-${savedScrollY}px;width:100%`;

  overlay.setAttribute('aria-hidden', 'false');
  overlay.classList.add('open');
  overlay.scrollTop = 0;

  // Gallery lightbox — images
  overlay.querySelectorAll('.po-gallery-item:not(.img-placeholder):not(.po-gallery-item--video)').forEach(fig => {
    fig.addEventListener('click', () => openLightbox(fig.dataset.src, fig.dataset.caption, fig.dataset.caption));
  });

  // Gallery — video items: hover to play, click to open in lightbox
  overlay.querySelectorAll('.po-gallery-item--video').forEach(fig => {
    const vid = fig.querySelector('video');
    fig.addEventListener('mouseenter', () => vid && vid.play().catch(() => {}));
    fig.addEventListener('mouseleave', () => { if (vid) { vid.pause(); vid.currentTime = 0; } });
    fig.addEventListener('click', () => openVideoLightbox(fig.dataset.videoSrc, fig.dataset.caption));
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
const lightbox       = document.getElementById('lightbox');
const lightboxImg    = document.getElementById('lightbox-img');
const lightboxVideo  = document.getElementById('lightbox-video');
const lightboxCap    = document.getElementById('lightbox-caption');
const lightboxClose  = document.getElementById('lightbox-close');

const openLightbox = (src, alt, caption) => {
  lightboxImg.src = src;
  lightboxImg.alt = alt || '';
  lightboxImg.style.display = '';
  lightboxVideo.style.display = 'none';
  lightboxVideo.pause();
  lightboxCap.textContent = caption || '';
  lightbox.classList.add('open');
};

const openVideoLightbox = (src, caption) => {
  lightboxVideo.src = src;
  lightboxVideo.style.display = 'block';
  lightboxImg.style.display = 'none';
  lightboxImg.src = '';
  lightboxCap.textContent = caption || '';
  lightbox.classList.add('open');
  lightboxVideo.play().catch(() => {});
};

const closeLightbox = () => {
  lightbox.classList.remove('open');
  lightboxImg.src = '';
  lightboxImg.style.display = '';
  lightboxVideo.pause();
  lightboxVideo.removeAttribute('src');
  lightboxVideo.style.display = 'none';
  lightboxCap.textContent = '';
};

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (lightbox.classList.contains('open')) closeLightbox();
    else if (overlay.classList.contains('open')) closeProject();
  }
});

// ── Project card video hover ────────────────────────────────────
document.querySelectorAll('.proj-card-img--video').forEach(cardImg => {
  const video = cardImg.querySelector('.proj-card-video');
  if (!video) return;
  const card  = cardImg.closest('.proj-card');
  card.addEventListener('mouseenter', () => { video.play().catch(() => {}); });
  card.addEventListener('mouseleave', () => { video.pause(); video.currentTime = 0; });
});
