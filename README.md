# Guido Alloatti — Personal Page

Personal portfolio website built with React + Vite. Single-page, smooth-scroll layout with interactive skill visualizations and English/Spanish localization.

## Sections

| Section | Description |
|---------|-------------|
| About Me | Personal intro, profile photo, location |
| Background | Career summary — roles, methodologies |
| Experience | Job history with expandable older entries |
| Skills | D3.js animated circular bar charts |
| Contact | Form that opens a mailto link |
| Visualizer | Manual carousel of tech logos by category |

## Tech Stack

- [React 18](https://react.dev/) + [Vite 8](https://vite.dev/)
- [React Router v6](https://reactrouter.com/)
- [D3.js v7](https://d3js.org/) — skill charts
- [react-i18next](https://react.i18next.com/) — EN/ES nav labels
- Vanilla CSS

## Getting Started

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

## Build

```bash
npm run build    # outputs to dist/
```

## Project Structure

```
src/
  components/   # One file per section + SectionHeader (shared)
  pages/        # Home.jsx assembles all sections
  locales/      # en.json, es.json (navigation labels)
  styles/       # index.css — all styles in one file, split by section
public/
  images/       # Static assets (logos, photos, backgrounds)
```

## License

MIT
