# Repository Guidelines

## Project Structure & Module Organization
- Monorepo uses npm workspaces with Turborepo; run commands from the repository root unless you need a `--filter`.
- `apps/web` hosts the Next.js client (`src` for features/hooks, `pages` for routes, `__tests__` for colocated Jest specs).
- Shared UI primitives live in `packages/ui`, and domain types plus helpers sit in `packages/shared`.
- End-to-end and regulatory journeys live in `tests`; operational scripts reside in `scripts`; database bootstrap SQL is at `database/setup.sql`.

## Build, Test, and Development Commands
- `npm run dev` launches workspace dev servers (Next.js at `http://localhost:3000`).
- `npm run build` executes the Turbo production pipeline; run it before hand-off or release.
- Quality gates: `npm run lint`, `npm run type-check`, and `npm run format` (format staged files before committing).
- `npm run test` runs Jest unit suites; `npm run test:e2e` triggers Playwright flows (set `NODE_ENV=test` when mocks are required).
- Database workflows (`packages/database`): `npm run db:generate`, `npm run db:push`, and `npm run db:reset`.

## Coding Style & Naming Conventions
- TypeScript-first codebase with 2-space indentation and Prettier formatting (`npm run format`).
- React components use PascalCase, hooks/utilities use camelCase, and constants follow UPPER_SNAKE_CASE.
- Favor named exports in shared modules and keep Next.js page defaults thin wrappers over feature modules.
- ESLint extends `@mental-wellness/eslint-config` plus security plugins—resolve or document any warning prior to review.

## Testing Guidelines
- Place Jest specs beside features as `*.test.ts` or `*.test.tsx` within `apps/web/src/__tests__`.
- Author Playwright journeys in `tests`, grouping longer flows under descriptive folders (e.g., `tests/clinical-validation/`).
- Refresh fixtures, snapshots, and recorded responses whenever business rules change.
- Document mocked services in pull request notes and verify coverage for HIPAA or clinical-critical paths.

## Commit & Pull Request Guidelines
- Write imperative commit subjects ≤72 characters (e.g., `Improve session renewal logging`) with optional context bodies.
- Pull requests must link the driving issue, summarize risk and mitigation, and include relevant CLI output or UI captures.
- List every validation command executed before requesting review.
- Keep PRs scoped to a single concern; open follow-up PRs for unrelated refactors or chores.

## Security & Configuration Tips
- Duplicate `.env.production.template` when provisioning secrets; never commit live credentials or PHI.
- Review `SECURITY.md` before altering auth, crisis response, or HIPAA-sensitive logic.
- Strip sensitive values from logs, tests, fixtures, and recorded Playwright traces.
