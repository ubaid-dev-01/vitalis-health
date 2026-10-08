<div align="center">

# Vitalis Health

**Clinic and admin surface — appointments, patients, billing**

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)

[Repository](https://github.com/ubaid-dev-01/vitalis-health) · [Author](https://github.com/ubaid-dev-01) · [Portfolio](https://ubaid-dev-01.vercel.app)

</div>

---

## Overview

Vitalis Health is a clinic-facing web product: public booking/marketing pages and an admin dashboard for appointments, patients, staff, billing, and settings.

## Features

- Public clinic site + booking
- Appointments board
- Patients and staff modules
- Billing overview
- Settings shell

## Architecture

SPA with separated public and dashboard route groups. Context + query hooks isolate server state for future API integration.

## Tech stack

- React
- Vite
- TypeScript
- TanStack Query
- Tailwind + shadcn/ui
- GSAP

## Project structure

```text
vitalis-health/
├── src/pages/
├── src/components/ context/
└── docs/
```

## Getting started

```bash
npm install
npm run dev
```

## Environment

Local UI needs no secrets. Add API base URL env vars when integrating.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` / `build` / `test` | Vite lifecycle |

## Documentation

| Doc | Purpose |
| --- | --- |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | System shape, data flow, boundaries |
| [docs/SETUP.md](docs/SETUP.md) | Local install, env, runbook |
| [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) | Branching, commits, PR checklist |


## Author

**M Ubaid Javaid** — Software Engineer (MERN / Next.js)

- GitHub: [https://github.com/ubaid-dev-01](https://github.com/ubaid-dev-01)
- Portfolio: [https://ubaid-dev-01.vercel.app](https://ubaid-dev-01.vercel.app)
- Email: mubaidjavaid97@gmail.com

## License

Source is published for portfolio and engineering review. Client product ownership is not implied unless stated in a case study.

