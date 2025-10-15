# Contributing

Thanks for your interest in contributing! This document outlines the conventions and workflow used in this repository so changes remain consistent and easy to review.

## Development Setup

- Preferred package manager: `bun`
  - Install deps: `bun install`
  - Dev server: `bun dev`
  - Build: `bun run build`
  - Lint: `bun run lint`
  - Preview: `bun preview`
- Fallback with npm (if you don’t use Bun): `npm install`, `npm run dev`, etc.

Before opening a PR:

- Ensure `bun run lint` passes.
- Ensure `bun run build` succeeds.

## Branch Naming

- Format: `<issue-number>-<kebab-case-summary>`
- Examples:
  - `1-initial-setup`
  - `12-locale-switcher`

Create branches off `main` and keep changes focused on a single issue where possible.

## Commit Messages

Use Conventional Commits with the linked issue number in parentheses.

- Format: `<type>(#<issue-number>)[optional: !][optional: scope]: <short summary>`
- Examples:
  - `feat(#12): add locale switcher UI`
  - `fix(#7): correct PDF page footer rendering`
  - `chore(#1): add sample data, update README`
  - `docs(#3): add usage notes for mobile`

Common types: `feat`, `fix`, `chore`, `docs`, `refactor`, `perf`, `style`, `test`, `build`, `ci`.
Tips:

- Use the imperative mood in summaries ("add", "fix", "update").
- Keep the first line under ~72 chars; add details in the body if needed.

## Code Style & Conventions

- Language: TypeScript (strict). Avoid `any`; prefer explicit types.
- Framework: React 19 + Vite. Use function components and hooks.
- Imports: Use the `@` alias for paths under `src`.
- Linting/formatting: ESLint + Prettier. Tailwind class order is handled by `prettier-plugin-tailwindcss`.
- UI (web): Tailwind CSS v4 + shadcn-style primitives under `src/components/ui`.
- PDF: Rendered via `@react-pdf/renderer`. Use inline styles and the helpers in `src/components/templates/default/styles.ts`; don’t rely on Tailwind classes inside PDF components.
- Structure:
  - Components: `src/components/**` (PascalCase for React components)
  - PDF template sections: `src/components/templates/default/**`
  - Utilities: `src/lib/**`
  - i18n: `src/i18n/en.json`, `src/i18n/de.json`
- Comments: Prefer self-explanatory code and clear naming over comments.

## Internationalization

- Messages live in `src/i18n/`. Keep keys mirrored between `en.json` and `de.json`.
- The current default PDF messages and default locale are exported from `src/config.ts`.
- If you add new UI strings, update all locales in the same change.

## Data & Validation

- Resume data must conform to JSON Resume schema v1.2.1 (`@jsonresume/schema`).
- Validation is done with AJV. If you extend fields, ensure schema compatibility or discuss before changing validation.

## Assets

- For static assets that should be copied as-is to `dist/`, place them under `public/` (e.g., `public/avatar.png`).
- If you import assets from code, Vite will emit them to `dist/assets/` with content hashes.

## Testing

- This project currently has no test suite. If you add tests, prefer `vitest` and colocate tests as `*.test.ts(x)`.

## Pull Requests

- One focused topic per PR; link the related issue in the description.
- Ensure CI-like steps locally: lint and build succeed.
- Title your PR using the same Conventional Commit format as commits (e.g., `feat(#12): add locale switcher UI`).

## Licensing & Credits

- License: MIT (see `package.json`).
- JSON Resume schema: https://github.com/jsonresume/resume-schema/

Thank you for contributing!
