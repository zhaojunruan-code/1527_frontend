# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

UniApp template project (Vue 3 + TypeScript + Vite + UnoCSS + Pinia). The only locally runnable service is the H5 dev server. Other targets (WeChat Mini Program, App) require platform-specific tooling not available in this environment.

### Key commands

All commands are defined in `package.json`. The primary ones:

| Task | Command |
|------|---------|
| Install dependencies | `pnpm install` |
| H5 dev server | `pnpm run dev:h5` (port 9003) |
| H5 production build | `pnpm run build:h5` |
| Type check | `pnpm run type-check` |

### Known issues

- **`pnpm run type-check` fails** due to `vue-tsc@1.8.27` incompatibility with TypeScript 5.5+. The error is `Search string not found: "/supportedTSExtensions = .*(?=;)/"`. This is a known upstream issue and not caused by the cloud environment. Upgrading `vue-tsc` to v2.x would fix it, but that is a codebase change outside the scope of environment setup.

### Gotchas

- The package manager is **pnpm** (specified via `packageManager` field in `package.json`). Do not use npm/yarn.
- `pnpm-lock.yaml` is the lockfile; `package-lock.json` also exists but pnpm is authoritative.
- The dev server binds to port **9003** (configured in `env/.env` as `VITE_APP_PORT`).
- Pages are mostly empty templates — this is expected for a starter/scaffold project.
- No backend API server is included; `VITE_SERVER_BASEURL` in `env/.env` is empty by default.
- No ESLint config exists; code formatting uses Prettier (`prettier` is a dev dependency).
