# CLAUDE.md — Development Guide

## Project Overview

Personal portfolio website for Guido Alloatti. Built with **Vite + React 18**, React Router, D3.js v7, and react-i18next. Single-page layout with smooth scroll, animated skill charts, and English/Spanish localization.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Build | Vite 8 |
| UI | React 18 + JSX |
| Routing | React Router v6 |
| i18n | react-i18next + i18next |
| Visualization | D3.js v7 |
| Styling | Vanilla CSS (`src/styles/index.css`) |

## Project Structure

```
src/
  components/
    Header.jsx       # Fixed nav: shrinks on scroll, language toggle, smooth-scroll links
    Intro.jsx        # Hero section with background image
    About.jsx        # Personal intro and profile photo
    Background.jsx   # 3-column career summary
    Experience.jsx   # Job history with show-more toggle (JOBS / MORE_JOBS arrays)
    Skills.jsx       # Section wrapper → renders Skillset
    Skillset.jsx     # D3 v7 circular bar charts (3 categories, data inline)
    Contact.jsx      # Form with validation → opens mailto link
    Visualizer.jsx   # Manual carousel over 5 tech slides (SLIDES array)
    Footer.jsx       # Social links
    SectionHeader.jsx # Reusable: title + hr + diamond ornament
  pages/
    Home.jsx         # Assembles all sections
  locales/
    en.json          # Navigation labels (English)
    es.json          # Navigation labels (Spanish)
  i18n.js            # i18next init, default lang: English
  main.jsx           # Entry point — BrowserRouter + App
  App.jsx            # Routes: / → Home
  styles/
    index.css        # All styles, organized by section
public/
  images/            # Static images served at /images/*
```

## Conventions

- **Data lives in the component file** — experience jobs in `Experience.jsx`, chart data in `Skillset.jsx`, carousel slides in `Visualizer.jsx`. No separate data layer needed for a portfolio.
- **SectionHeader** is the single source of truth for the section title block. Do not duplicate it.
- **CSS** is split into named sections with `/* ===== SECTION ===== */` comments. Add styles to the matching section, not at the bottom.
- **i18n** only covers nav labels. Body content is hardcoded in English. To add more keys, update both `en.json` and `es.json`.
- **D3** runs inside `useEffect` with a `useRef` — do not try to use D3 reactively; the chart renders once on mount.
- **Contact form** opens a `mailto:` link — no backend required. If a backend is added later, replace the `window.location.href` line in `Contact.jsx`.

## Running Locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
```
