# Repository Guidelines

## Project Structure & Module Organization
This monorepo is managed with npm workspaces and Turborepo. Run workspace-aware commands from the repository root unless you need a `--filter`. The Next.js app lives in `apps/web` (`src` for features and hooks, `pages` for thin route wrappers, `__tests__` for colocated Jest specs). Shared UI primitives sit in `packages/ui`, and cross-domain types plus helpers reside in `packages/shared`. End-to-end and regulatory journeys are under `tests`, operational scripts under `scripts`, and database bootstrap SQL in `database/setup.sql`.

## Build, Test, and Development Commands
Use `npm run dev` to launch the local stack (Next.js on `http://localhost:3000`). `npm run build` executes the Turbo production pipeline; keep it green before hand-off. Quality gates include `npm run lint`, `npm run type-check`, and `npm run format` (format staged files prior to commit). `npm run test` runs Jest unit suites, while `npm run test:e2e` executes Playwright flows—set `NODE_ENV=test` when mocks are required. Database workflows (`packages/database`) rely on `npm run db:generate`, `npm run db:push`, and `npm run db:reset`.

## Coding Style & Naming Conventions
The codebase is TypeScript-first with 2-space indentation and Prettier formatting. React components use PascalCase, hooks and utilities use camelCase, and constants follow `UPPER_SNAKE_CASE`. Favor named exports in shared modules. ESLint extends `@mental-wellness/eslint-config` plus security plugins—fix or document warnings before review.

## Testing Guidelines
Author Jest specs beside features as `*.test.ts` or `*.test.tsx` within `apps/web/src/__tests__`. Refresh fixtures, snapshots, and recorded responses whenever business rules change. For Playwright journeys, group longer flows in descriptive folders under `tests`. Document mocked services and verify coverage for HIPAA-critical paths.

## Commit & Pull Request Guidelines
Write imperative commit subjects ≤72 characters (e.g., `Improve session renewal logging`). Pull requests must link their driving issue, describe risk and mitigation, and include relevant CLI output or UI captures. List validation commands (build, lint, tests) before requesting review and keep changes scoped to a single concern.

## Security & Configuration Tips
Duplicate `.env.production.template` when provisioning secrets—never commit live credentials or PHI. Review `SECURITY.md` before modifying auth, crisis response, or HIPAA-sensitive logic, and strip sensitive values from logs, tests, fixtures, and Playwright traces.
