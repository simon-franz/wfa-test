# SmartFace

This is a monorepo from the Frontend-Team of HR WORKS

## Technology Stack

- **Frontend Framework**: React 19 with TypeScript 5.8.2
- **Build System**: Vite 6+ for fast development and builds
- **Package Manager**: Bun's built-in Package Manager with workspace support
- **Monorepo Management**: Turborepo for task orchestration
- **Bun**: Version 1.3.3
- **Styling**: Emotion with styled-components pattern
- **State Management**: MobX for reactive state in adapters, React Context for app-level state
- **Next.js Applications**: Next.js 16.0.10 with App Router and `next-intl` for localization
- **Linting and Formatting**: ESLint, Prettier, and Husky for code quality

## Packages

This monorepo contains the following packages:

| Package              | Description                                    |
| -------------------- | ---------------------------------------------- |
| `smartface`          | Main SmartFace App with adapter pattern        |
| `storybook`          | UI-Components Overview                         |
| `sui-core`           | Core UI components                             |
| `sui-extension`      | UI-Components                                  |
| `sui-shared`         | UI-Components                                  |
| -                    | -                                              |
| `adapterbook`        | UI-Components Overview for SmartFace Adapters  |
| `api-client`         | API client for the HR WORKS API                |
| `api-schema`         | OpenAPI schema and generated types for our API |
| `cypress`            | Cypress tests for UI-Component testing         |
| `design-system`      | Theme, tokens, and base styling                |
| `error-handling`     | Error handling utilities                       |
| `export-server-next` | Export App (Next.js)                           |
| `icons`              | Package for managing icons                     |
| `localization`       | i18n utilities and providers                   |
| `login`              | login App (Next.js)                            |
| `mock-internal-api`  | A mock internal API for development            |
| `stellenportal`      | Stellenportal App (Next.js)                    |
| `types`              | Shared TypeScript definitions                  |
| `typescript-config`  | Shared TS configurations                       |
| `zeitkiosk`          | Time tracking kiosk application (Next.js)      |

## Getting Started

### Installation

Install all dependencies using `bun`:

```bash
bun install
```

### Running the Applications

You can run the applications using the following commands:

| Package              | Command                                         |
| -------------------- | ----------------------------------------------- |
| `storybook`          | `bun run --cwd packages/storybook dev`          |
| -                    | -                                               |
| `smartface`          | `bun run --cwd packages/smartface dev`          |
|                      | `bun run --cwd packages/smartface mock-api`     |
| -                    | -                                               |
| `login`              | `bun run --cwd packages/login dev`              |
| `stellenportal`      | `bun run --cwd packages/stellenportal dev`      |
| `zeitkiosk`          | `bun run --cwd packages/zeitkiosk dev`          |
| `mock-internal-api`  | `bun run --cwd packages/mock-internal-api dev`  |
| -                    | -                                               |
| `adapterbook`        | `bun run --cwd packages/adapterbook dev`        |
| `export-server-next` | `bun run --cwd packages/export-server-next dev` |

### Mocking

Some packages need mocking to run correclty locally. To start `smartface`, you need to also start the SmallTalk Mock API. For the secondaries apps (`login`, `stellenportal` & `zeitkiosk`), the mock-internal-api is necessary for local execution.
