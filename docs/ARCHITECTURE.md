# Architecture — Vitalis Health

## Intent

Vitalis Health is a clinic-facing web product: public booking/marketing pages and an admin dashboard for appointments, patients, staff, billing, and settings.

## System shape

SPA with separated public and dashboard route groups. Context + query hooks isolate server state for future API integration.

## Stack decisions

- React
- Vite
- TypeScript
- TanStack Query
- Tailwind + shadcn/ui
- GSAP

## Boundaries

- Secrets stay in environment variables / secret managers — never in git.
- Client bundles only receive public configuration (`NEXT_PUBLIC_*` / `VITE_*`).
- Tenant or role checks belong in middleware / server layers, not UI-only gates.
- Heavy or long-running work should not run inside short-lived serverless handlers unless designed for it.

## Quality bar

- Prefer typed contracts at API and domain boundaries.
- Ship a vertical slice (auth → persisted outcome) before a broad feature surface.
- Document trade-offs in PRs when changing data models or auth.

