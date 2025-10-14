# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Resume/CV generation application built with React, TypeScript, and React PDF. It renders resumes based on JSON Resume schema files and outputs them as PDFs using @react-pdf/renderer.

## Development Commands

- **Development server**: `bun dev` or `npm run dev`
- **Build**: `bun run build` or `npm run build` (runs TypeScript compilation followed by Vite build)
- **Linting**: `bun lint` or `npm run lint`
- **Preview**: `bun preview` or `npm run preview`
- **Resume validation**: `bun validate:resume` (validates all resume JSON files against JSON Resume schema)

## Architecture

### Core Structure

- `src/App.tsx` - Main application entry point, sets up PDF viewer with internationalization
- `src/components/ResumeDocument.tsx` - Main PDF document component that orchestrates all resume sections
- `src/lib/resume.ts` - Resume validation and loading utilities using AJV and JSON Resume schema
- Resume data files are stored in the root directory as JSON files (e.g., `jhohlfeld.de.json`, `fnagel.de.json`)

### Component Architecture

The application uses a section-based component architecture where each part of the resume is its own component:

- `HeaderInfo.tsx` - Header with basic info
- `ContactSection.tsx` - Contact information
- `WorkSection.tsx` - Work experience
- `SkillsSection.tsx` - Skills and technologies
- `EducationSection.tsx` - Education history
- `ProjectsSection.tsx` - Projects showcase
- `CertificateSection.tsx` - Certifications
- `LanguagesSection.tsx` - Language proficiencies

### Styling System

- Uses Tailwind CSS v4 with custom styling utilities in `src/components/styles.ts`
- Color utilities in `src/lib/util.ts` for converting Tailwind colors to hex for PDF rendering
- PDF-specific styling constraints apply (limited CSS support in @react-pdf/renderer)

### Internationalization

- Uses `next-intl` for i18n support
- Translation files in `src/i18n/` (currently supports German and English)
- Locale-specific resume data can be loaded dynamically

### Data Validation

- Resume JSON files must conform to JSON Resume schema v1.2.1
- Validation is handled by AJV with format validation
- Invalid resumes will log validation errors and not render

## Key Dependencies

- **@react-pdf/renderer**: PDF generation from React components
- **@jsonresume/schema**: Resume data validation
- **next-intl**: Internationalization
- **tailwindcss**: Styling (v4 with Vite plugin)
- **ajv + ajv-formats**: JSON schema validation
- **culori**: Color manipulation utilities

## Resume Data Structure

Resume files follow the JSON Resume standard and should include a `$schema` reference pointing to the JSON Resume schema. The application expects resume files to be in the root directory with `.json` extension.

## Development Notes

- The app renders resumes as PDFs in a full-screen viewer
- Currently hardcoded to use German locale and `fnagel.de.json` resume file
- PDF rendering has different constraints than web rendering - not all CSS properties are supported
- TypeScript is configured with strict settings and project references

## Code Style Preferences

- **No code comments** - Code should be self-documenting
- Write clean, readable code without explanatory comments
