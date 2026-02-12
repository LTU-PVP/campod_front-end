# Podcasts

React + TypeScript podcast browser and player built with Vite.

## Screenshots

## Features

- Search podcasts and episodes
- Play episodes with simple player controls
- Authentication (login/signup)

## Tech Stack

- React 19 + TypeScript
- Vite for dev and build
- Zustand for player state
- ESLint for linting

## Prerequisites

- Node.js (recommended: 18+)
- npm (or yarn/pnpm)

## Getting Started

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Build for production (the build step runs `tsc -b` before `vite build` to emit type-checked output):

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

Lint the project:

```bash
npm run lint
```

## Project Structure (important files)

- `src/` — application source
  - `src/api/podcast-service.ts` — API calls for fetching podcasts
  - `src/store/usePlayerStore.ts` — global player state (Zustand)
  - `src/features/` — feature folders
    - `src/features/auth/` — login/signup UI and forms
    - `src/features/dashboard/` — main dashboard and collection views
    - `src/features/podcast/` — podcast detail view
    - `src/features/search/` — search results and UI
  - `src/components/` — shared components (Input, Loading, Logo, Player, ShowCard)
- `public/` — static assets
- `index.html` — app entry
- `vite.config.ts` — Vite configuration

## Acknowledgements

- Built with Vite, React, and community libraries.
