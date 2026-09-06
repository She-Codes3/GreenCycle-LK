# GreenCycle LK — Frontend

React + TypeScript + Vite progressive web app for the GreenCycle LK platform.

## Stack

- React 18 + TypeScript
- Vite (PWA-ready build)
- Tailwind CSS
- Axios (REST) + Socket.IO/STOMP client (live tracking)

## Getting started

1. Copy `.env.example` to `.env` and set `VITE_API_BASE_URL` to the backend URL.
2. Install dependencies and start the dev server:

   ```bash
   npm install
   npm run dev
   ```

3. The app runs at `http://localhost:5173` by default.

## Project layout

- `src/app/` — routing, providers, and route guards.
- `src/shared/` — cross-feature building blocks: API clients, UI components, hooks, and the shared `types/` contracts (`api.ts`, `user.ts`, `common.ts`) that mirror the backend's `ApiResponse`/`PageResponse` shapes.
- `src/features/` — one folder per feature, owned per the team split noted in each folder.

## Scripts

```bash
npm run dev       # start dev server
npm run build     # production build
npm run lint      # eslint
```
