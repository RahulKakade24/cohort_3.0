# EaseUi 

This version fixes the application architecture and matches the supplied EaseUi reference layout more closely.

## Main fixes

- React Router is now actually mounted from `main.tsx`.
- Global header is shared across all routes.
- Component sidebar is nested correctly under the global header.
- `/components` redirects to `/components/button`.
- All component sidebar links are real router links.
- Header component search navigates to matching component pages.
- About and Templates navigation works.
- Light/dark mode is synchronized between Redux, the `<html>` element and localStorage.
- Mobile navigation and component drawer work.
- Button GSAP reference/import issue is fixed.
- Card hover/entrance animation behavior is cleaned up.
- Card description class typo is fixed.
- Modal overlay, Escape key, body scroll locking and close behavior are fixed.
- Props table and code preview styling are made theme-aware.
- Vercel SPA rewrites are included.
- `node_modules` and `.git` are intentionally not included.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Vercel

Use the repository root as the project root.

Build command:
`npm run build`

Output directory:
`dist`
