# Raj Gopala Krishna S.V — Portfolio

Personal portfolio website with animated project cards and full-page detail views.

## Deploying to GitHub Pages

1. Create a repo (e.g. `raj-cfd.github.io` or any repo name)
2. Push all files to the repo root
3. Go to **Settings → Pages → Deploy from branch → main → / (root) → Save**
4. Live at `https://your-username.github.io` within a minute

---

## File & folder structure

```
/
├── index.html
├── style.css
├── main.js
├── Resume_120326.pdf
├── README.md
└── images/
    ├── truck-spray/
    │   ├── cover.jpg        ← card thumbnail + detail hero
    │   ├── geometry.jpg
    │   ├── mesh.jpg
    │   ├── cfd1.jpg
    │   ├── cfd2.jpg
    │   ├── plot1.jpg
    │   └── plot2.jpg
    ├── hydrogen-bwb/        ← same 7 filenames
    ├── foiling-craft/
    ├── boxprop/
    └── fruit-fly/
```

---

## Adding your images

Each project expects 7 images with these exact filenames:

| Filename       | Used for                          |
|----------------|-----------------------------------|
| cover.jpg      | Card thumbnail + detail page hero |
| geometry.jpg   | Geometry / CAD figure             |
| mesh.jpg       | Mesh visualisation                |
| cfd1.jpg       | First CFD result (e.g. velocity)  |
| cfd2.jpg       | Second CFD result (e.g. pressure) |
| plot1.jpg      | First plot / graph                |
| plot2.jpg      | Second plot / graph               |

Notes:
- .png files work too — update the `file:` values in the PROJECTS object in main.js
- Missing images show a striped placeholder automatically, no errors
- Recommended cover size: 1200 x 675 px (16:9)
- Gallery images look best at 1200 x 900 px (4:3)
- Compress images to under 300 KB for fast loading (squoosh.app)

---

## Customising project text

All project text lives in the PROJECTS object at the top of main.js. Each entry has:
title, kicker, period, type, institution, tools, description, methodology, results, images.

---

## Changing the accent colour

The amber accent (#e8a030) is defined as --amber in :root in style.css.

## Contact info

Search for svkrishna1299@gmail.com and +46 761 96 75 12 in index.html to update.

---

## Boxprop project folder

The `boxprop/` folder holds all assets for the Boxprop propeller project:

```
boxprop/
├── Analysis_of_a_low_noise_Boxprop_propeller_report.pdf   ← place your compiled PDF here
└── images/
    ├── cover.png       ← card thumbnail + detail hero (boxprop render)
    ├── geometry.png    ← blade cross-section geometry
    ├── mesh.png        ← CFD computational domain
    ├── cfd1.png        ← pressure distribution at 50% tip radius
    ├── cfd2.png        ← pressure distribution at 95% tip radius (tip interference)
    ├── plot1.png       ← wake velocity field downstream
    └── plot2.png       ← velocity field at blade section
```

The website also mirrors these images at `images/boxprop/` (used by the project card thumbnail).
When you add a new project, place its PDF at `<project_id>/<report_filename>.pdf` and set
the `report` field in the PROJECTS object in `main.js` to that path.
