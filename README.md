# Ivy Remee's Portfolio

A static portfolio site built with plain HTML, CSS and vanilla JavaScript (no frameworks, no build step).

## Structure

```
my-portfolio/
├── index.html                 Homepage (hero, about, selected work)
├── README.md
├── .gitignore
├── projects/                  One page per case study
│   ├── wildfire.html
│   ├── starting-salary.html
│   └── nightsip.html
├── css/
│   ├── base.css               Design tokens, reset, buttons, header/nav, footer, crosshair cursor (every page)
│   ├── home.css               Homepage-only styles
│   └── project.css            Case-study page styles
├── js/
│   ├── main.js                Hamburger menu + footer year (every page)
│   ├── cursor.js              Crosshair cursor with x/y readout (every page, mouse only)
│   └── home.js                Scroll-spy nav, project filter, photo slideshow
└── assets/                    All images and PDFs (one flat folder)
```

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy with GitHub Pages

1. Push this folder to a GitHub repository.
2. Repo **Settings → Pages → Build and deployment**: Source = *Deploy from a branch*, Branch = `main` / `(root)`.
3. Your site will be live at `https://ivyremee.github.io/portfolio/`.

## Adding a project

1. Copy `projects/wildfire.html` to `projects/<new-project>.html` and edit the text.
2. Put its images in `assets/` (prefix the file names with the project name) and update the `src` paths.
3. In `index.html`, copy a `.project-card` block, set `data-category` and point its arrow link to the new page.
