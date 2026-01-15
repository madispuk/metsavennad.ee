# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Metsavennad.ee is an Estonian historical website about "forest brothers" (metsavennad) - Estonian resistance fighters against Soviet occupation. The site covers three regional areas: Misso, Rouge, and Sangaste.

## Commands

- `npm start` - Start production server (port 4000)
- `npm run dev` - Start development server with nodemon + CSS/JS watch
- `npm run build` - Full build (vendor files, CSS, JS)
- `npm run watch` - Watch mode for CSS and JS changes
- `npm run format` - Format code with Prettier

## Architecture

### Server

- Express.js server (`server.js`) with Handlebars templating
- Routes defined via `regionPages` config object - add new pages there
- Each region has its own layout template

### Data

- People data stored in `db/people.yaml` (YAML format)
- `js/db.js` loads and queries the YAML data
- Each person has: `id_name`, `first_name`, `last_name`, `location`, and other fields

### Build System (npm scripts)

- Tailwind CSS v4 with PostCSS (`css/styles.css` → `public/css/styles.css`)
- CSS minified with lightningcss to `public/css/styles.min.css`
- LightGallery JS bundled to `public/js/lightgallery.bundle.min.js`
- Alpine.js and LightGallery assets copied to `public/`

### Directory Structure

```
views/
  layouts/         # Handlebars layouts (misso-layout.hbs, rouge-layout.hbs, sangaste-layout.hbs)
  common/          # Shared templates (isik.hbs, isikud.hbs)
  misso/           # Misso region templates
  rouge/           # Rouge region templates
  sangaste/        # Sangaste region templates
  index.hbs        # Homepage (no layout)
db/
  people.yaml      # People database
js/
  db.js            # Database access module
  lightgallery-init.js  # LightGallery initialization
  misso-map.js     # Misso interactive map
css/
  styles.css       # Tailwind CSS source
public/
  css/             # Compiled CSS
  js/              # Bundled JS (alpine.min.js, lightgallery.bundle.min.js)
  images/          # Static images
  vendor/          # LightGallery assets (CSS, images, fonts)
```

### URL Pattern

Routes follow pattern `/:region/:page` where region is `misso`, `rouge`, or `sangaste`.

- `/:region` - Redirects to sissejuhatus (introduction)
- `/:region/isikud` - People list for the region
- `/:region/isik/:id_name` - Individual person page
