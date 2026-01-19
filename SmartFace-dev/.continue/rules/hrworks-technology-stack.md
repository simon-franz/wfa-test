---
alwaysApply: true
---

# HR WORKS Frontend Monorepo

You are working on the HR WORKS project, a comprehensive HR management system built with modern web technologies inside the Frontend-Teams monorepo.

**Important:** When referencing library versions or checking dependencies, always consult the `package.json` files in the repository root and relevant package directories (`packages/*/package.json`).

**Key dependencies** (refer to package.json for exact versions):

- React 19.2.x with TypeScript
- Vite (build system)
- Emotion (CSS-in-JS)
- MobX (state management)
- Next.js 16.x.x (for standalone apps)
- Bun (runtime & package manager)

Here's the complete technology stack and architectural patterns to follow:

## Architecture & Patterns

**Monorepo Structure**: Multi-package workspace with shared dependencies
**Component Architecture**: Adapter pattern for UI components with SmartFace system
**State Management**: MobX with mobx-react for reactive state (only relevant for adapter)
**Component Composition**: React Context API for app-level state
**Design System**: Custom design system with theme provider pattern

## Styling & UI

**CSS-in-JS**: Emotion (`@emotion/react`, `@emotion/styled`) with styled-components (object-styles) pattern
**Design System**: Custom `@hrworks/design-system` with theme tokens
**Component Organization**: .styles.ts, .types.ts, .tsx file separation
**Responsive Design**: Mobile-first approach with breakpoint system
**Animation**: Motion library for smooth animations

## Next.js Applications

**Framework**: Next.js 16.x.x with App Router
**Internationalization**: next-intl for localization
**Development**: Custom dev servers with HTTPS support
**Styling Integration**: Emotion compiler integration

## Development Tools & Quality

**Linting**: ESLint
**Code Formatting**: Prettier with lint-staged pre-commit hooks
**Git Hooks**: Husky for automated quality checks
**TypeScript**: Strict configuration with path mapping
**Testing**: Cypress for E2E testing
**Storybook**: Component documentation and testing

## Component Patterns

**File Structure**: Each component has .tsx, .types.ts, .styles.ts, and index.ts
**Styling**: Use const S = { ComponentName } as const pattern for styled components
**Props**: Define TypeScript interfaces in .types.ts files
**Exports**: Barrel exports via index.ts files
**Context**: Use React Context for component trees (e.g., AppContext)

## Key Libraries & Utilities

**HTTP Client**: Axios for API communication
**Date Handling**: date-fns for date manipulations
**Utilities**: Lodash (with import-scope ESLint rule)
**Validation**: Zod for schema validation
**Floating UI**: `@floating-ui/react` for tooltips, dropdowns
**Focus Management**: focus-trap-react for accessibility
**Charts**: Highcharts with React wrapper
**File Handling**: Custom dropzone and file manager components

## Naming Conventions

**Components**: PascalCase (e.g., ClockInMethodSelector)
**Files**: Component names match directory names
**Packages**: `@hrworks` namespace with kebab-case
**Styled Components**: Use S.ComponentName pattern
**Hooks**: Start with use prefix (e.g., useAppNavigation)

## Import Organization (ESLint simple-import-sort)

1. Side effect imports
2. Third-party imports
3. `@hrworks` workspace imports
4. Relative imports (.)
5. CSS imports (last)

## Package Structure

**sui-core**: Core UI components and providers
**design-system**: Theme, tokens, and base styling
**smartface**: Main application with adapter pattern
**zeitkiosk**: Time tracking kiosk application (Next.js)
**localization**: i18n utilities and providers
**types**: Shared TypeScript definitions
**typescript-config**: Shared TS configurations

## Styling Approach

Emotion with TypeScript
Theme-based design tokens
Responsive design with breakpoint utilities
Component-scoped styling with .styles.ts files
CSS custom properties for theming

## Build & Deployment

Turborepo for orchestrating builds across packages
Vite for fast development builds
Next.js for production applications
Docker containerization (inferred from .devcontainer)
Environment-specific configurations

Follow these patterns consistently when working on any part of the HRWorks ecosystem. Always use the established file structure, naming conventions, and architectural patterns.
