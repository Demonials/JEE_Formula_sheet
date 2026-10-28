# FORMION — Your JEE Command Centre

FORMION turns the original JEE formula reference into a light, responsive study workspace for desktop and mobile.

## Brand assets

- `assets/formion-logo.jpg` is the primary FORMION logo used by the splash screen, sidebar mark, browser favicon, and Apple touch icon.
- `manifest.json` exposes the same brand asset as the app icon for installable-browser experiences.

## Workspace

- **Overview** — subject shortcuts, revision progress, quick formula recall and a daily checklist.
- **Formula library** — search, filter by subject/class/chapter, copy formulas and bookmark entries.
- **Flashcards** — active-recall practice using the formula bank.
- **Revision tracker** — mark chapters reviewed and filter pending revision.
- **Study planner** — create dated study sessions with a subject and time estimate.
- **Focus room** — built-in focus/break timer and a saved session intention.
- **Quick notes** — keep doubts and tricky concepts in browser storage.
- **Syllabus audit** — compare mapped chapter coverage and open official exam sites.

The interface uses a light, low-clutter palette, responsive navigation, keyboard search (Ctrl/⌘ + K), reduced-motion support, and browser-local persistence. No account or backend is required.

## Run locally

Serve this folder with a local HTTP server:

```bash
python -m http.server 8000
```

Then open http://localhost:8000.

## Important formula-accuracy note

The original database contained **1,184 entries**, including repeated formula expressions within the same subject/class/chapter. The bundled `data.js` and `data.json` have now been deduplicated to **1,054 entries** using normalized expression matching within each subject and class, across chapters.

This is a data-cleanup step—not proof that the database contains every formula, special case, identity, derivation, or exam-relevant relation. The Syllabus Audit is a chapter-level warning system, not a mathematical certification. A true “every formula” claim requires a chapter-by-chapter comparison against the current official JEE Main and JEE Advanced syllabi, expert review of formula conditions and notation, and tests for omitted relations.

Official starting points:
- JEE Main: https://jeemain.nta.nic.in/
- JEE Advanced: https://jeeadv.ac.in/

## Data and privacy

Bookmarks, revision state, planner entries, notes, daily checklist and focus settings are stored in the current browser using localStorage. They are not synced between devices. Clearing browser data can remove them.

## Main files

- `index.html` — app structure and page views
- `style.css` — responsive light design system and animations
- `app.js` — navigation, formula filters, study tools and local persistence
- `data.js` — bundled formula/chapter database
- `data.json` — matching JSON data source
