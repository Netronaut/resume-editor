# Resume Editor

This is a JSON Resume editor with live schema validation and PDF generation. Upload a `resume.json`, edit it with real‑time validation, preview it, and export to PDF.

This project uses the JSON Resume schema: https://github.com/jsonresume/resume-schema/

**Highlights**

- Live validation against JSON Resume v1.2.1 (AJV)
- JSON editing with CodeMirror
- PDF preview (desktop) and PDF download everywhere (with [React-PDF](https://react-pdf.org/))
- Opinionated PDF template (Header, Contact, Languages, Education, Certificates, Skills, Work, Projects)
- i18n‑ready (en/de); PDF currently renders with English messages by default

**Tech Stack**

- `React 19`, `TypeScript`, `Vite 7`
- `@react-pdf/renderer`, `@jsonresume/schema`, `ajv` + `ajv-formats`
- `next-intl` for i18n
- `Tailwind CSS v4`, Radix primitives, shadcn‑style UI components, lucide icons

**Design Choices**

- PDF rendering is done via `@react-pdf/renderer`, which has its own styling model distinct from the browser. Tailwind utility classes are used for the web UI; the PDF uses inline styles suited to React PDF. This is intentional.
- The app is fully client‑side and does not include server‑side persistence by design.

## Quick Start

- Install dependencies ([bun preferred](https://bun.com/)): `bun install`
- Dev server: `bun dev`
- Build: `bun run build`
- Lint: `bun run lint`
- Preview: `bun preview`

Use the sample dataset at `public/sample.en.json` as a starting point.

Open the app, upload your `resume.json`, and start editing. The editor validates changes in real time; when valid, you can preview or download a PDF.

Note: JSON must follow the JSON Resume schema v1.2.1. See the official schema: https://github.com/jsonresume/resume-schema/

## Contributing & Roadmap

You are very welcome to contribute to this project! Make sure to read [CONTRIBUTING.md](./CONTRIBUTING.md) for further details.

[Planned roadmap](https://github.com/Netronaut/resume-editor/issues/1) is a great place to start. It includes:

- a user‑visible locale switcher
- mobile version
- several other extensions and bug fixes

## Credits

- JSON Resume schema: https://github.com/jsonresume/resume-schema/
- Sample image: https://unsplash.com/de/fotos/mann-macht-selfie-tidSLv-UaNs

## License

MIT
