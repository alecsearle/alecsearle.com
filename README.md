# alecsearle.com

Personal FPV landing page and content hub | Live at [alecsearle.com](https://alecsearle.com)

## Overview

A mobile-first link hub for my FPV drone content. Features a live YouTube feed, social links, and curated affiliate gear recommendations.

## Features

- **YouTube carousel** — latest videos via the YouTube Data API v3, fetched by a cached Vercel function (`api/videos.js`)
- **10K giveaway page** — `/giveaway`, embedded Google Form, driven by `src/config/site.js` (see `docs/giveaway-runbook.md`)
- **Affiliate gear section** — curated beginner FPV setup with BetaFPV affiliate links
- **Mobile-first** — designed for thumb-scrolling, scales cleanly to desktop
- **Component-driven** — each section is its own isolated component for easy maintenance

## Tech Stack

- [React 19](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/) for icons
- YouTube Data API v3

## Environment Variables

```
YOUTUBE_API_KEY=your_key_here
```

Server-side only (read by `api/videos.js`). The old `VITE_YOUTUBE_API_KEY` name is still accepted as a fallback.

Requires a [Google Cloud](https://console.cloud.google.com/) project with the **YouTube Data API v3** enabled.

## Development

```bash
npm install
npm run dev      # site only; the video carousel shows a fallback link
npx vercel dev   # site + /api/videos
```

## Pages

Each page is its own HTML entry (so link previews work per page). To add one, create `<page>/index.html` + a `src/<page>.jsx` entry and register it in `vite.config.js`.

| Route | Entry |
|---|---|
| `/` | `index.html` → `src/main.jsx` |
| `/giveaway` | `giveaway/index.html` → `src/giveaway.jsx` |

## Deployment

Deployed on [Vercel](https://vercel.com) with automatic production deploys on push to `main`.
