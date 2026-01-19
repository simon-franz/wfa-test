# Agent Instructions for sui-core

You are working within the `sui-core` package, which is the core component library for the HR WORKS SmartFace ecosystem.

Before making any changes, it is important to understand the context of this package.

- **Read the README.md:** Start by reading the `README.md` file in this directory to understand the technology stack, installation, and basic usage of the components.
- **Component Structure:** When working on a component, familiarize yourself with the existing file structure. Components are typically split into:
  - `[ComponentName].tsx`: The main component file.
  - `[ComponentName].styles.ts`: Styling using emotion with styled-components.
  - `[ComponentName].types.ts`: TypeScript types for the component's props.
  - `[ComponentName].stories.tsx`: Storybook stories for component development and testing.
  - `[ComponentName].cy.tsx`: Cypress component spec with main focus on visual regression testing and some functional tests.
  - `index.ts`: Barrel export file.
- **Design System:** Adhere to the existing HR WORKS design system. Use the provided design tokens for colors, typography, spacing, etc., from the `@hrworks/design-system` package.
- **Conventions:** Follow the established coding conventions, naming patterns, and import order.
