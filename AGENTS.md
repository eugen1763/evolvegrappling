# Repository Guidelines

## Project Structure & Module Organization

This repository contains a SvelteKit 5 static website. Route-level pages and layouts live in `src/routes/`; reusable UI belongs in `src/lib/components/`, shared data in `src/lib/data/`, and browser helpers in `src/lib/utils/`. Global styling and the HTML shell are in `src/app.css` and `src/app.html`. Put directly served files in `static/`, including optimized WebP images under `static/optimized/`. Original photography is retained in `_originals/`; regenerate optimized variants with `node scripts/optimize-images.cjs` rather than editing generated images manually. Production output is written to `build/`.

## Build, Test, and Development Commands

- `npm ci` installs the exact dependency versions from `package-lock.json`.
- `npm run dev` starts Vite's local development server; add `-- --open` to launch a browser.
- `npm run check` runs Svelte and TypeScript diagnostics with the strict project configuration.
- `npm run lint` checks Prettier formatting and ESLint rules.
- `npm run format` applies Prettier formatting across the repository.
- `npm run build` creates the static production site; `npm run preview` serves that build locally.

Before opening a pull request, run `npm run check`, `npm run lint`, and `npm run build`.

## Coding Style & Naming Conventions

Use TypeScript for application logic and Svelte components for UI. Prettier is authoritative for whitespace, indentation, attribute layout, and Tailwind class ordering; do not hand-format against it. ESLint uses the recommended JavaScript, TypeScript, and Svelte configurations. Name components in PascalCase (`TrainingSchedule.svelte`), utilities and data modules in lowercase kebab-case or snake_case consistent with the surrounding directory, and SvelteKit routes with framework names such as `+page.svelte`. Keep shared imports on the `$lib` alias and preserve strict typing.

## Testing Guidelines

No unit or end-to-end framework is currently configured. Treat `npm run check`, `npm run lint`, and a successful production build as the automated baseline. Manually verify changed routes at desktop and mobile widths, especially navigation, animations, external links, and German legal pages. If tests are introduced, colocate them with the feature using `*.test.ts` and add the runner command to `package.json`.

## Commit & Pull Request Guidelines

Recent history favors concise, imperative subjects, often with Conventional Commit-style prefixes such as `fix:` and `perf:`. Keep each commit focused and explain the user-visible outcome. Pull requests should include a short summary, validation commands run, linked issue when applicable, and before/after screenshots for visual changes. Call out content, privacy, deployment, or asset-size impacts explicitly.
