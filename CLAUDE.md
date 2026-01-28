# CLAUDE.md

## Project Overview

Estonian historical website about "forest brothers" (metsavennad) - resistance fighters against Soviet occupation. Covers three regions: Misso, Rouge, and Sangaste.

## Commands

- `npm run dev` - Development server with hot reload
- `npm run build` - Full production build
- `npm run format` - Format code with Prettier

## Architecture

- **Eleventy (11ty)** static site generator with Liquid templates
- **Tailwind CSS v4** with PostCSS
- **Alpine.js** for interactivity
- **LightGallery** for image galleries

## Directory Structure

```
src/
  _data/           # Data files (people.yaml, regions.js)
  _includes/
    layouts/       # Layout templates (misso-layout.liquid, rouge-layout.liquid, sangaste-layout.liquid)
  misso/           # Misso region pages
  rouge/           # Rouge region pages
  sangaste/        # Sangaste region pages
  index.liquid     # Homepage
  isik.liquid      # Person page template
  isikud.liquid    # People list template
css/
  styles.css       # Tailwind source
js/
  region-map.js    # Interactive map
public/
  css/             # Compiled CSS
  js/              # Bundled JS
  images/          # Static images
_site/             # Build output (generated)
```

## URL Pattern

- `/:region/` - Region introduction
- `/:region/isikud/` - People list
- `/:region/isik/:id_name/` - Individual person page
