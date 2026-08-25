# Repository Guidance

## Overview

- React TypeScript frontend for the private RealWorld (Conduit) demo. Pair it with the ASP.NET Core API in `example-app-backend`.
- The layout is page-scoped rather than a full Feature-Sliced Design tree: `src/app` is the shell, `src/pages` holds route modules, `src/shared` holds API, router helpers, and shared UI.
- Root router: `src/app/browser-router.tsx`. Pages export route objects from `src/pages/*/*.route.ts` and lazy-load UI, loaders, and actions.
- Generated API client and Zod schemas live under `src/shared/api/generated` (gitignored). Produce them from `openapi.yaml` with Orval.

Local services:

- Frontend: `http://localhost:30401`
- Backend API: `http://localhost:5080/api`

## Toolchain

- Node.js 22. Use Yarn with `yarn.lock`; restore with `yarn install --frozen-lockfile`.
- React 19, React Router 7, TanStack React Query 5, Zod 4, Webpack 5.
- ESLint (Airbnb + TypeScript) and Prettier (`singleQuote`, `trailingComma: all`, `printWidth: 120`, 2-space indent). Husky runs lint-staged on commit and `yarn test --no-coverage` on push.
- Orval generates the fetch + React Query client. After generation, `yarn zod:mini` normalizes Zod artifacts.

## Validation

```sh
yarn install
yarn generate
yarn eslint
yarn test --ci --watchAll=false
yarn build:prod
```

CI (`yarn exec eslint src --ext ts,tsx --max-warnings=0`, Jest, production build) always runs `yarn generate` first. Run the same locally after OpenAPI or client-generation changes.

Local development:

```sh
yarn start
```

End-to-end coverage lives in `example-app-e2e`. After merge to `main`, this repo calls that reusable workflow.

## Development Practices

- Keep page files colocated: `*.route.ts`, `*.ui.tsx`, loaders, `*.paths.ts`, and `actions/*.action.ts`.
- Load async page data in React Router loaders backed by React Query. Handle mutations in route actions; validate `formData` with Zod (`validateSchema`) before calling the API.
- Import generated clients and schemas from `src/shared/api/generated`. Do not hand-edit that tree; change `openapi.yaml` or `orval.config.ts` and run `yarn generate`.
- Preserve existing `data-test` attributes used by Playwright. Add new ones only when e2e coverage needs a stable hook.
- Keep controllers of auth in the existing middleware (`loadUserMiddleware`, `requireAuthMiddleware`, `redirectIfAuthenticatedMiddleware`) and `auth-fetch.ts`.
- Do not commit `src/shared/api/generated`, `dist`, coverage, or secrets. Set `HUSKY=0` only in CI installs, not as a way to skip local hooks.
