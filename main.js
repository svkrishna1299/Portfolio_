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
  'heat-sink': {
    title: 'Conjugate Heat Transfer of a Natural-Convection Heat Sink',
    kicker: 'Buoyant CHT in OpenFOAM · 2026',
    period: '2026',
    type: 'CFD / Conjugate Heat Transfer',
    institution: 'Independent project · replication of da Silva et al. (2019)',
    tools: ['OpenFOAM v2606', 'chtMultiRegionFoam', 'blockMesh', 'Python', 'ParaView / pvpython'],
    description: `A plate-fin heat sink cooled only by buoyancy: no fan, just warm air rising out of the fin channels. The aim was to reproduce a published natural-convection study end to end in <strong>OpenFOAM</strong> — da Silva et al. (2019), who both simulated and measured the same heat sink — and to build a fully scripted workflow around it.<br><br>Case D was chosen: a 7-fin aluminium heat sink with the base at 348.3 K in a 297.2 K room (Rayleigh number 4.2 × 10⁵). The targets are the average Nusselt number and the fin-tip temperature, compared with the paper's simulation (Nu 12.41) and experiment (Nu 11.93).`,
    methodology: `<strong>Geometry &amp; mesh:</strong> Seven aluminium 6063-T5 fins, 2 mm thick, 14 mm high and 100 mm long, on a 4 mm base, centred on the floor of a closed 600 mm air box. The base is recessed into the insulated floor, as in the test rig. One Python script turns six parameters (fin spacing, thickness, height, length, base thickness, fin count) into both the STL and the blockMesh dictionary, so every fin face lies on a grid line: a pure hexahedral mesh with zero non-orthogonality, 0.51 M cells — 12× fewer than the paper's 5.9 M.<br><br><strong>Physics:</strong> chtMultiRegionFoam solves the air and the aluminium together, coupled through the interface temperature and heat flux. At Ra = 4.2 × 10⁵ the flow is laminar, so no turbulence model is used. Air is a perfect gas with gravity, so the density difference drives the flow. The base bottom is held at the measured 348.32 K, the box walls at room temperature, and the floor is adiabatic; fixedFluxPressure with a 1 bar reference closes the pressure in the sealed box.<br><br><strong>Numerics:</strong> Implicit Euler with PIMPLE, adaptive time step at Co ≤ 1 (10⁻⁴ s growing to 7.9 × 10⁻³ s), 25 s of physical time in 2,882 steps on 4 cores (78 min). The Nusselt number is steady after about 5 s and drifts by only 0.05 % over the last 5 s.<br><br><strong>Post-processing:</strong> wallHeatFlux over the fin surfaces gives Q = 10.35 W, matching the heat entering the base, so the energy balance closes. Probes at the paper's thermocouple positions give h and Nu exactly as the paper defines them; Python and pvpython scripts produce every table, plot and animation.`,
    results: [
      { value: 'Nu 12.92',  label: 'vs 12.41 in the paper (+4 %)' },
      { value: '0.51 M',    label: 'Hex cells, 12× fewer than the paper' },
      { value: '10.35 W',   label: 'Heat flow, energy balance closed' },
      { value: '1 command', label: 'Geometry → mesh → solve → plots' },
    ],
    images: [
      { file: 'cover.png',            caption: 'Streamlines through the heat sink coloured by air temperature: cold air enters from the open ends and sides and leaves upward as one plume' },
      { type: 'video', src: 'heat-sink/temperature_plume.mp4', caption: 'Air temperature on a plane across the fins, 0 to 25 s: thermals rise from the fin channels and merge into one plume' },
      { file: 'geometry.png',         caption: 'CAD of the 7-fin heat sink, 100 × 100 mm footprint, generated from the Python parameters' },
      { file: 'mesh.png',             caption: 'Block-structured hexahedral mesh, section across the fins: air in blue, aluminium in orange' },
      { file: 'density.png',          caption: 'Air density around the fins at t = 5 s: the lighter, warmer air rises' },
      { file: 'temperature.png',      caption: 'Temperature in the box at t = 10 s' },
      { file: 'nusselt_history.png',  caption: 'Average Nusselt number and fin temperatures over the 25 s run' },
      { file: 'nusselt_local.png',    caption: 'Local Nusselt number on the fin surfaces: highest at the fin ends and tips, lowest deep in the channels' },
      { type: 'video', src: 'heat-sink/velocity_plume.mp4', caption: 'Air speed on the same plane across the fins' },
    ],
  },

  'brake-disc': {
    title: 'CFD and ML-Based Design Optimisation of a Ventilated Brake Disc',
    kicker: 'MRF RANS + FNO surrogate · 2026',
    period: '2026',
    type: 'CFD / Thermal Design Optimisation',
    institution: 'Independent project · test data from Galindo-Lopez (Cranfield, 2009)',
    tools: ['STAR-CCM+', 'Java macros', 'Python', 'PyTorch', 'Fourier Neural Operator', 'Soft Actor-Critic'],
    description: `A ventilated brake disc cools itself: the vanes between the two friction rings act as a centrifugal pump, so the vane design sets how much heat the disc sheds. The goal was to find the vane count, angle and width that maximise the convective cooling.<br><br>One CFD run costs about an hour on 16 cores, so the search cannot run on CFD directly. The workflow is a <strong>validated CFD model</strong> → an <strong>automated 275-design sweep</strong> → a <strong>neural-operator surrogate</strong> that reproduces the CFD field in milliseconds → a reinforcement-learning optimiser that searches thousands of designs on the surrogate.`,
    methodology: `<strong>Geometry &amp; domain:</strong> The base disc from Galindo-Lopez (PhD, Cranfield 2009): hat, two friction rings and 30 tapered radial vanes between R = 118 and 213 mm. A 96° sector of the surrounding air with rotationally periodic sides replaces the full 360°. The CAD is parametric inside STAR-CCM+, so vane count, angle and width are global parameters.<br><br><strong>Mesh &amp; physics:</strong> 1.98 M trimmed cells with prism layers on every wall, refined in the vane passages. Steady RANS with the coupled solver, k–ω SST with All y+ wall treatment, and a moving reference frame on the rotating region at 800 rpm, so no mesh motion is needed. Air is an ideal gas; disc surfaces are held at 100 °C. A stagnation inlet lets the disc draw as much air as its vanes pump.<br><br><strong>Validation:</strong> The disc-average heat transfer coefficient at 800 rpm is 44.1 W/m²K in CFD against 44.7 W/m²K measured on the spin rig — within 2 %.<br><br><strong>Design sweep:</strong> A Java macro updates the CAD, remeshes, solves and exports for each design: 275 runs over vane count 20–40, angle 5–30° and width 8.9–20.9 mm. Air temperature and radial velocity at vane mid-height are exported on a 101 × 101 grid.<br><br><strong>Surrogate &amp; optimisation:</strong> A 2D Fourier Neural Operator (3 layers, 16 × 16 modes, width 32 — cut down from 24 modes and width 64, which over-fitted) maps the vane geometry to the temperature and velocity fields; trained with AdamW, early stopping and an MSE + gradient loss. A Soft Actor-Critic agent then searched 6,000 designs, rewarding cooling and heat transfer and penalising pumping torque.`,
    results: [
      { value: 'Within 2 %', label: 'CFD vs spin-rig h at 800 rpm' },
      { value: '275',        label: 'Automated CFD designs' },
      { value: '7.5 ms',     label: 'Per surrogate prediction (0.4 % mean T error)' },
      { value: '93.8 W/m²K', label: 'Best predicted design (22 vanes, 30°, 20.7 mm); CFD check next' },
    ],
    images: [
      { file: 'cover.png',        caption: 'Base design, 30 radial vanes at 800 rpm: disc temperature and the outward air jets leaving each vane passage' },
      { type: 'video', src: 'brake-disc/cover.mp4', caption: 'Ventilated brake disc: rotating vanes pumping air through the disc' },
      { file: 'domain.png',       caption: 'Computational domain: 96° sector with hat, friction rings and vanes inside the air domain' },
      { file: 'mesh.png',         caption: 'Trimmed mesh, section at vane mid-height' },
      { file: 'prism_layers.png', caption: 'Thin prism-cell layers along every vane wall resolve the thermal boundary layer' },
      { file: 'mrf.png',          caption: 'Rotating region around the disc, solved in a moving reference frame' },
      { file: 'boundaries.png',   caption: 'Air sector: periodic sides, inlet and outlet boundaries' },
      { file: 'fields.png',       caption: 'Base design: air temperature and outward air speed at vane mid-height — the fields the surrogate learns' },
      { file: 'surrogate.png',    caption: 'CFD vs surrogate for an unseen design (28 vanes, 20.6°, 16.4 mm)' },
    ],
  },

  'truck-spray': {
    title: 'Tyre Water Spray Dispersion Behind Heavy Trucks',
    kicker: 'DES + Lagrangian spray · Research Assistant · 2024 – Present',
    period: '2024 – Present',
    type: 'CFD / Multiphase Flow',
    institution: 'Chalmers University of Technology · SEVVOS project',
    tools: ['STAR-CCM+', 'DES', 'URANS k–ω SST', 'Lagrangian particle tracking', 'Python', 'Gaussian plume model'],
    description: `Water thrown up by truck tyres forms a spray cloud that blinds the cameras and lidars of following vehicles. Within the <strong>SEVVOS</strong> project at Chalmers, this work simulates the spray behind a heavy truck and condenses the droplet cloud into a <strong>two-source Gaussian plume model</strong> that runs without CFD — a physically correct cloud for sensor and optics simulations and for reproducing spray on a test rig.`,
    methodology: `<strong>Domain &amp; mesh:</strong> A generic 5-axle semi-trailer truck, 15.8 m long, in an 86 m domain with almost 50 m of wake. Trimmed hexahedral mesh, 0.7 m base size, 10 prism layers on the truck and road, refined to 0.01 m around the wheels and 0.35 m in the wake box: 13.8 M cells.<br><br><strong>Flow:</strong> Coupled solver, first URANS with k–ω SST, then DES with Realizable k–ε to resolve the large wake structures that carry the spray. Δt = 1 ms over 10 s. 25 m/s inflow, moving road and rotating wheels; a 2 m/s crosswind case was also run.<br><br><strong>Spray:</strong> 26 point injectors per rear wheel following Kabanovs' wheel-spray model, log-normal droplets of 0.07–0.5 mm thrown off tangentially at tyre speed, 0.12 kg/s of water per wheel. Drag, pressure gradient and gravity, one-way coupled; droplets that hit the road are removed.<br><br><strong>Plume statistics &amp; model:</strong> 1.64 M parcels exported at t = 6.9 s; after removing the road film and droplets under the truck, 209,000 parcels are mass-weighted and assigned to the nearer wheel. Centre and spread are computed at 100 stations up to 15 m and fitted as degree-4 polynomials. The source strength is multiplied by the measured airborne fraction, which decays with a deposition length of 4.1 m, and an image source below the road keeps mass from leaking through the ground.`,
    results: [
      { value: '13.8 M',   label: 'Cells, DES of the full truck wake' },
      { value: '2 %',      label: 'Mean lateral spread error vs CFD (2.4–13.9 m)' },
      { value: '0.95',     label: 'Mean model / CFD mass ratio' },
      { value: '4.1 m',    label: 'Spray deposition length' },
    ],
    images: [
      { type: 'video', src: 'water_spray/deposition_animation.mp4', caption: 'Droplets thrown off the rear wheels, settling on the road behind the truck' },
      { file: 'deck_domain.png',        caption: 'Full-scale truck in a wind-tunnel-style domain' },
      { file: 'mesh.png',               caption: 'Mesh section: refinement around the truck body, wheels and wake' },
      { file: 'deck_wake.png',          caption: 'Streamwise velocity in the wake with the spray cloud' },
      { file: 'deck_droplet_sizes.png', caption: 'Droplet sizes released at each injector' },
      { file: 'deck_trajectories.png',  caption: 'Droplet trajectories from the rear tyres: one plume per side close to the truck, merging further downstream' },
      { file: 'deck_plume_stats.png',   caption: 'Mass-weighted plume statistics (dots) and their polynomial fits (lines)' },
      { file: 'deck_plume_model.png',   caption: 'Two-source Gaussian plume model with deposition factor and ground reflection' },
      { file: 'deck_profiles.png',      caption: 'Concentration across the wake and over the height at 3 m and 7 m: model vs CFD' },
      { file: 'deck_accuracy.png',      caption: 'Model accuracy along the wake: lateral spread and centre, mass, vertical spread and centre' },
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
    report: 'hydrogen-bwb/Aircraft_Design_Report__1_.pdf',
    images: [
      { file: 'Horizon_2035.png', caption: 'Horizon 2035 — rendered isometric view of the final BWB configuration with rear-mounted hydrogen turbofan engines and blended fuselage-wing body' },
      { file: 'cfd1.png',     caption: 'Top-view three-view drawing — planform geometry and wing layout' },
      { file: 'flaps_ailerons.png', caption: 'Final iteration — top-view geometry with flap and aileron surfaces defined; control surface positions and sizing determined through analytical sizing calculations' },
      { file: 'cfd2.png',     caption: 'Drag polar with maximum L/D tangent — C_D0 = 0.0155, max L/D = 16.6' },
      { file: 'plot1.png',    caption: 'Constraint diagram — T/W vs. W/S across climb, cruise, and take-off' },
      { file: 'plot2.png',    caption: 'MTOW convergence — graphical intersection at 3,028 kg (Dash 1)' },
      { file: 'plot3.png',    caption: 'Engine SFC trend — kerosene historical data and hydrogen 2035 projection' },
    ],
  },

  'foiling-craft': {
    title: 'AI Control System for Foiling Craft',
    kicker: 'Overset URANS + PD control · Apr – Jun 2024',
    period: 'Apr – Jun 2024',
    type: 'CFD / Closed-Loop Control',
    institution: 'Chalmers University of Technology · Division of Marine Technology',
    tools: ['STAR-CCM+', 'Implicit Unsteady RANS', 'SST k–ω', 'Overset mesh', 'Java macro', 'Python', 'PD Control'],
    description: `Hydrofoil craft lift a vessel clear of the water to drastically cut drag and energy consumption — but in rough seas, an oscillating inflow makes maintaining a stable lift force genuinely hard. This project built and validated a <strong>real-time PD controller</strong> embedded directly inside a STAR-CCM+ CFD simulation via a Java macro, actively rotating a NACA 0012 hydrofoil to track a 5,000 N lift setpoint as a sinusoidal wave velocity field sweeps past it.<br><br>The controller logic runs <em>inside</em> the solver at every time step: reading the instantaneous lift, computing the error against the setpoint, and commanding a new angle of attack — all while the flow physics continue to evolve around the moving foil.`,
    methodology: `<strong>Mesh &amp; domain:</strong> A 6×6 m 2D domain was built around a NACA 0012 hydrofoil (Re ≈ 2.2×10⁶). An overset (chimera) region surrounds the foil and rotates freely without remeshing. The background mesh includes wake refinement toward the outlet. Fifteen prism layers resolve the boundary layer to y+ ≤ 1 (near-wall thickness 2.5×10⁻⁶ m), giving 89,036 total cells. Implicit Unsteady RANS with SST k–ω and All y+ wall treatment was used throughout.<br><br><strong>Controller implementation:</strong> The PD controller is coded as a Java macro that runs inside the STAR-CCM+ solver. At every time step it: (1) reads the instantaneous lift force, averaged over 5 consecutive steps to suppress numerical noise; (2) computes the error e(t) = L_target − L_ref; (3) applies the PD law to command a new angle of attack. The angle change is capped at 0.25° per time step and the angle at 7°, so the simulation does not diverge. Gain values (K_p ~ 10⁻⁵, K_d ~ 10⁻⁷) were first screened in a Python model of the loop, then the best candidates were tested in the full CFD loop.<br><br><strong>Validation:</strong> Before adding the controller, the static lift curve was checked against the experiments of Houghton et al. over 0–10°.<br><br><strong>Results:</strong> At constant 10 m/s the foil follows a step from 2,500 N to 5,000 N, settling at about 2.3° and 4.7°. Only 2 of the 5 gain sets from the Python model were stable in CFD. With V(t) = 10 + 2 sin(2πnt) m/s at n = 0.5, 1 and 2 Hz, the mean lift holds the 5,000 N target, but the lift oscillation grows with wave frequency: fixed PD gains are not enough, and higher gains demand angle swings beyond the allowed range. Next steps are automatic gain tuning (e.g. a genetic algorithm over several wave conditions) and moving to 3D with a free surface.`,
    results: [
      { value: 'NACA 0012',  label: 'Hydrofoil profile' },
      { value: '5,000 N',    label: 'Lift setpoint tracked' },
      { value: '89,036',     label: 'Mesh cell count' },
      { value: '2.3° → 4.7°', label: 'Angle for the 2,500 → 5,000 N step' },
    ],
    cover: 'foiling-craft/Coversample.png',
    report: 'foiling-craft/AI_Hydrofoil_Project_Report.pdf',
    images: [
      { type: 'video', src: 'foiling-craft/varying_velocity1Hz.mp4', caption: 'CFD simulation — NACA 0012 hydrofoil tracking 5,000 N lift under 1 Hz sinusoidal inflow; PD controller actuates angle of attack in real time' },
      { file: 'mesh.png',    caption: 'Computational mesh — NACA 0012 overset region with 15 prism layers and wake refinement (89,036 cells total)' },
      { file: 'domain.png',  caption: 'Computational domain — 6×6 m with velocity inlet, pressure outlet, and slip-wall boundaries; overset foil at domain centre' },
      { file: 'validation.png', caption: 'Validation — lift coefficient vs angle of attack: STAR-CCM+ vs experiment (Houghton et al.)' },
      { file: 'controller.jpg', caption: 'Feedback loop — the lift error sets the angle-of-attack change (PD, no integral term)' },
      { file: 'wave_response.png', caption: 'Lift and angle-of-attack response to 1 Hz sinusoidal inflow (K_p = 2.5×10⁻⁵, K_d = 1.0×10⁻⁷)' },
      { file: 'frequency.png', caption: 'Frequency sensitivity — lift for 0.5, 1 and 2 Hz inflow with the same gains' },
    ],
  },

  'boxprop': {
    title: 'Low-Noise Boxprop Propeller Analysis',
    kicker: 'Sliding-mesh URANS + FW-H · Jan – May 2024',
    period: 'Jan – May 2024',
    type: 'CFD / Aero-acoustics',
    institution: 'Chalmers University of Technology',
    tools: ['STAR-CCM+', 'OptoProp / BBcode', 'CATIA V5', 'Python', 'k–ω SST', 'FW-H acoustic analogy', 'MRF steady RANS', 'Sliding-mesh URANS'],
    description: `Small UAV propellers are highly efficient at low speeds, but they generate substantial noise — a growing concern in urban and research environments. This project investigates the <strong>Boxprop</strong>, a novel tip-joined blade concept developed at Chalmers, which connects two blades at the tip to eliminate free tip vortices and reduce tonal noise. The study designed and compared a two-bladed Boxprop against a four-bladed conventional reference propeller at equivalent operating conditions, using CFD for aerodynamic assessment and aero-acoustic simulation for noise evaluation.`,
    methodology: `Both propellers were designed from scratch to meet shared requirements: 152 mm diameter, 9,500 RPM, 30 m/s flight speed, and a minimum thrust of 1.5 N. The conventional propeller was generated using OptoProp (Chalmers in-house code) and the Boxprop using BBcode, with blade geometry imported into CATIA V5 via VBA scripting. An iterative CFD loop in STAR-CCM+ refined each design until target performance was achieved. The aerodynamic simulations employed the k–ω SST turbulence model with Moving Reference Frame (MRF) steady-state approach. The mesh was refined until the efficiency changed by less than 1 %, with a mean y+ of 0.51 on the blade surface.<br><br><strong>Aero-acoustics:</strong> The noise run uses <strong>URANS with a sliding mesh</strong> on the full 360° domain with all four blades: the rotating region turns with the blades every time step (rigid body motion) across an internal interface. k–ω SST with a low-y+ wall treatment, Δt = 4.375 × 10⁻⁵ s (2.5° of rotation per step) over 5 rotations. The Ffowcs Williams–Hawkings (FW-H) analogy propagates thickness and loading noise from the blade surface to a far-field receiver. The acoustic chain was first validated on the tandem-cylinder benchmark: 136.9 dB/Hz at 165 Hz against 140 dB/Hz at 181 Hz in the experiment.<br><br><strong>Results:</strong> The Boxprop reached 70 % efficiency and 1.6 N against 76.2 % and 1.86 N for the conventional propeller; the loss comes from the two blades interacting near the tip. On the conventional blade the noise spectrum peaks exactly at the 633 Hz blade passing frequency (123 dB). The Boxprop wake is weaker towards the tip, pointing to less tip-vortex noise; its own acoustic run did not fit in the course time and is the main open step.`,
    results: [
      { value: '76.2%',   label: 'Reference prop efficiency' },
      { value: '70%',     label: 'Boxprop efficiency' },
      { value: '1.86 N',  label: 'Reference thrust' },
      { value: '633 Hz',  label: 'Noise peak at the blade passing frequency' },
    ],
    report: 'boxprop/Analysis_of_a_low_noise_Boxprop_propeller_report.pdf',
    cover: 'images/boxprop/qcriterion_poster.jpg',
    images: [
      { type: 'video', src: 'boxprop/qcriterion.mp4', caption: 'Sliding-mesh URANS of the conventional 4-blade propeller — tip vortices and wake visualised by the Q-criterion' },
      { file: 'cover.png',    caption: 'Boxprop CAD render — final blade design' },
      { file: 'geometry.png', caption: 'Blade geometry — span-wise cross-sections' },
      { file: 'mesh.png',     caption: 'CFD computational domain — rotating & static regions' },
      { file: 'cfd1.png',     caption: 'Pressure distribution — Boxprop at 50% tip radius, 9500 RPM' },
      { file: 'cfd2.png',     caption: 'Pressure distribution — Boxprop at 95% tip radius, showing tip interference' },
      { file: 'plot1.png',    caption: 'Wake velocity field — Boxprop downstream' },
      { file: 'plot2.png',    caption: 'Velocity field — Boxprop blade section at 50% radius' },
      { file: 'wake_conventional.png', caption: 'Wake of the conventional propeller — stronger, from its higher thrust' },
      { file: 'wake_boxprop.png',      caption: 'Wake of the Boxprop — strongest near the hub, weaker towards the tip' },
      { file: 'acoustic_validation.png', caption: 'Acoustic validation — PSD at the downstream cylinder of the tandem-cylinder benchmark' },
      { file: 'noise_spectrum.png',    caption: 'Conventional propeller — SPL on the blade surface and at the receiver; peak at the 633 Hz blade passing frequency' },
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
    report: null,
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
    kicker: 'Master\'s Thesis · Buoyant RANS + RL control · Jan – Nov 2025',
    period: 'Jan – Nov 2025',
    type: 'Master\'s Thesis / CFD & Machine Learning',
    institution: 'Chalmers University of Technology · AFRY',
    tools: ['STAR-CCM+', 'ANSA', 'Python', 'PyTorch', 'Fourier Neural Operator (FNO)', 'Soft Actor-Critic (SAC)', 'Reinforcement Learning'],
    description: `HVAC systems account for 20–40% of total building energy consumption, yet most still rely on simple rule-based PID controllers that cannot adapt to changing occupancy, weather, or user preferences. This Master's thesis — carried out in collaboration with <strong>AFRY</strong> — develops a complete physics-informed control framework that replaces repeated CFD solves with a fast neural surrogate, then trains a reinforcement learning agent to optimise the HVAC system in real time.<br><br>The result: a Soft Actor-Critic (SAC) controller that cuts annual energy consumption by <strong>35%</strong> compared to a PID baseline (4,836 vs 7,460 kWh). The saving is a trade-off, not free: PID holds the 21 °C setpoint more tightly (median error 0.27 °C vs 0.49 °C for SAC), but SAC was more than 2.5 °C off the setpoint in only 2.3% of control steps.`,
    methodology: `A hospital room geometry provided by AFRY was simplified in ANSA and meshed in STAR-CCM+ with 1.8 million trimmed cells and adaptive mesh refinement (AMR) at critical gradient regions. 973 steady-state CFD simulations — covering summer, autumn, and winter boundary conditions with varying inlet temperature, mass-flow rate, radiator setpoint, and outdoor weather — were automated via a Java macro and run with the Realizable k–ε turbulence model. Each run extracted a 2,400-point spatial grid of temperature and velocity fields, creating a comprehensive training dataset.<br><br>A 3D Fourier Neural Operator (FNO) was trained on this dataset using PyTorch and the neuralop library — 128 hidden channels, 4 spectral layers, trained for 200 epochs on an NVIDIA H100 GPU. The modes were set to 20 per direction, but the 20 × 6 × 20 sampling grid only resolves 20 × 6 × 11 frequencies (real FFT), so every frequency is kept and there is no spectral truncation. On unseen cases over 90% of predictions are within 5% of CFD; in absolute terms the temperature error stays within ±0.5 °C (median 0.017 °C), and at most 0.6 °C in the plane shown below. The FNO predicts the temperature and velocity fields from boundary conditions in milliseconds, replacing the CFD solver in the control loop.<br><br>A Soft Actor-Critic (SAC) controller was coupled with the FNO surrogate. The actor and critic networks each use two hidden layers of 512 nodes. The reward function balances energy cost, temperature deviation from the 21°C setpoint, control oscillation, and occupant-zone comfort (thermal stratification, zone mean deviation, zone variance). The controller operates on a 20-minute step aligned with the room's thermal settling time, benchmarked against a PID controller with the same 21 °C setpoint over a full year of Swedish weather data.`,
    results: [
      { value: '35%',      label: 'Energy saving vs. PID' },
      { value: '4,836 kWh', label: 'SAC annual consumption (PID 7,460)' },
      { value: '±0.5 °C',  label: 'FNO temperature error on unseen cases' },
      { value: '973',      label: 'CFD training simulations' },
    ],
    report: 'master-thesis/Master_Thesis_Repor.pdf',
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
  const coverSrc = p.cover || (firstImg ? `images/${id}/${firstImg.file}` : `images/${id}/cover.jpg`);

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
