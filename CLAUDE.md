# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Metsavennad.ee is an Estonian historical website about "forest brothers" (metsavennad) - Estonian resistance fighters against Soviet occupation. The site covers three regional areas: Misso, Rouge, and Sangaste.

## Commands

- `npm start` - Start production server (port 4000)
- `npm run dev` - Start development server with nodemon auto-reload
- `npm run gulp` - Run default gulp build (compiles LESS, minifies CSS/JS, copies vendor files)

## Architecture

### Server

- Express.js server (`server.js`) with Handlebars templating
- Routes organized by region (misso, rouge, sangaste) with consistent patterns
- Each region has its own layout template

### Database

- SQLite database at `db/metsavennad.sqlite`
- Schema defined in `db/people.sql`
- Database module at `js/db.js` provides `getPeople(location)` and `getPersonById(id_name)`

### Build System (Gulp)

- `less/` - LESS source files, compiled to `public/css/`
- `js/global.js` - Source JS, minified to `public/js/`
- Vendor libraries copied from node_modules to `public/vendor/`

### Directory Structure

```
views/
  layouts/         # Handlebars layouts (misso-layout.hbs, rouge-layout.hbs, sangaste-layout.hbs)
  misso/           # Misso region templates
  rouge/           # Rouge region templates
  sangaste/        # Sangaste region templates
  index.hbs        # Homepage (no layout)
public/
  css/             # Compiled CSS
  js/              # Minified JS
  images/          # Static images
  vendor/          # Bootstrap, jQuery, Magnific Popup
```

### URL Pattern

Routes follow pattern `/:region/:page` where region is `misso`, `rouge`, or `sangaste`. Person detail pages use `/:region/isik/:id_name`.
