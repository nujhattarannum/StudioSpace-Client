<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# StudioSpace

Single-package Next.js 16 App Router app (React 19, TypeScript `strict`). No tests are configured — verification is `npm run lint`, `npx tsc --noEmit` (no typecheck script exists), and `npm run build`.

## Backend dependency

- This repo is the **client** half of a two-part app (see repo name `StudioSpace-Client`); pages talk to a **separate backend server at `http://localhost:8000`, hardcoded** (no env var, no `.env` files): `/all-studios` (fetched in an async server component in `src/app/all-studios/page.tsx`) and `/add-studio`. Those pages fail unless the backend is running; starting backend + frontend together (`npm run dev` here on :3000) is required for end-to-end work.
- Single test/focused verification: none exist (no test runner). Typecheck the whole repo with `npx tsc --noEmit`, or lint a single file with `npx eslint <file>` (npm passes script args only after `--`).

## Toolchain quirks that change how you write code

- **React Compiler is on** (`reactCompiler: true` in `next.config.ts`). Do not hand-memoize with `useMemo`/`useCallback`/`React.memo` for performance; let the compiler handle it. It compiles reusable functions and JSX, so non-idiomatic or mutating patterns can fail the build — follow rules-of-hooks strictly.
- **Turbopack** is the dev bundler. Tailwind CSS is wired through the `turbopack.rules` loader in `next.config.ts`, not webpack/PostCSS config.
- **Tailwind v4 is CSS-first**: there is no `tailwind.config.js`. Theme tokens, plugins (`shadcn/tailwind.css`, `tw-animate-css`), and the dark-mode variant (`@custom-variant dark` toggled by a `.dark` class) are all defined in `src/app/globals.css`. Change styling there, not in a config file.

## shadcn/ui — Base UI, not Radix

- `components.json` uses style `base-nova`: components in `src/components/ui` are generated on **`@base-ui/react`** primitives (`@base-ui/react/dialog`, `useRender`, `mergeProps`...), not Radix. Their props/API differ from the classic Radix-based shadcn docs — read the existing component instead of copying docs patterns.
- Add new components with `npx shadcn add <component>`; they land in `src/components/ui` and import `cn` from `@/lib/utils`.
- No registry overrides are configured (`registries: {}`); custom edits live directly in `src/components/ui` files.

## Conventions

- Toasts use **`react-toastify`** (`toast()` + its CSS import), not any ui-toast component; `ToastContainer` is mounted once in the root `src/app/layout.tsx`, so pages only need `toast(...)` calls.
- Path alias `@/*` → `src/*` (tsconfig `paths`).
- App code lives in `src/app` (`layout.tsx`, `page.tsx`, `globals.css`); hooks in `src/hooks`.
- ESLint (`npm run lint`) runs plain `eslint` over the repo using `eslint-config-next` core-web-vitals + TypeScript presets; `.next/`, `out/`, and `build/` are ignored via `globalIgnores` in `eslint.config.mjs`.
