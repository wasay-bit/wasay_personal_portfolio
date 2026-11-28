# Wasay Omair — Portfolio

A personal portfolio site with a security-console look: an access-badge hero, experience,
case-study project cards, skills, involvement, recommendations and a small terminal.

It is plain HTML, CSS and JavaScript. No server or build step is needed. GitHub Pages serves it
from the `main` branch.

## Editing

- **Text and facts:** `data.js` (profile, experience, skills, certifications, involvement, recommendations).
- **Projects:** `projects.js`.
- **Layout and styles:** `sections.js`, `hero.js`, `styles.js` and `styles2.js`.
- **Photos and résumé:** replace the files in `assets/` with the same file names, or update the names in `app.js`.

After a change, commit and push to `main`. The site updates about a minute later.

## Files

- `index.html` the page shell. `app.js` starts the site and points it at the files in `assets/`.
- `site.js` page assembly, navigation, light and dark theme, motion.
- `data.js` the site's text. `projects.js` project data, filters and case-study cards.
- `sections.js` section builders. `hero.js` the top of the page and the résumé buttons.
- `shell.js` the terminal. `background.js` the decorative network background.
- `logos.js` company and school logos. `diagrams.js` flow diagrams.
- `kit.js` shared helpers. `dom.js` small helpers for building elements.
- `styles.js` and `styles2.js` the styles.
- `assets/` photos, event images and the résumé PDF.
