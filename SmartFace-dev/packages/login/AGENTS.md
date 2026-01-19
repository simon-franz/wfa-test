# Login Package

## Package Overview

The login package is a critical component of the SmartFace ecosystem, responsible for user authentication and session management. It provides a secure and streamlined login experience for users, leveraging modern authentication protocols and technologies. The package is designed to be easily configurable and extensible, allowing for integration with various identity providers and authentication methods. It also includes features such as password recovery, and multi-factor authentication to enhance security and usability. The package is built using Next.js and is deployed as a standalone service. It communicates with the backend services through a dedicated API to validate user credentials and manage user sessions. The package is also responsible for handling user-related data, such as user profiles and preferences, and ensuring that this data is handled securely and in compliance with data protection regulations.

## Technologies

- **Framework:** Next.js
- **UI Library:** React
- **Styling:** Emotion (React & Styled)
- **Error Tracking:** Sentry
- **Cloud Services:** AWS SDK
- **Data Caching:** ioredis (Redis client)
- **Authentication:** jsonwebtoken (JWT)
- **Internationalization:** next-intl
- **Utilities:** cookies-next
- **Internal Libraries:** `@hrworks/design-system`, `@hrworks/error-handling`, `@hrworks/sui-core`, `@hrworks/sui-shared`

## Package Structure

- **`src/`**: Main application source code.
  - **`app/`**: Next.js App Router, contains pages and layouts.
  - **`components/`**: Reusable React components.
  - **`emails/`**: Email templates.
  - **`i18n/`**: Internationalization configuration.
  - **`types/`**: TypeScript type definitions.
  - **`utils/`**: Utility functions.
  - **`middleware.ts`**: Next.js middleware for handling requests.
- **`public/`**: Static assets (images, fonts, etc.).
- **`scripts/`**: Node.js scripts for development tasks.
- **`messages/`**: Language files for internationalization.
- **`next.config.mjs`**: Next.js configuration file.
- **`package.json`**: Project dependencies and scripts.
- **`.env.*`**: Environment variable files.
- **`sentry.*.config.ts`**: Sentry error tracking configuration.
- **`Dockerfile`**: Defines the Docker image for deployment.
- **`docker-compose.dev.yml`**: Docker Compose configuration for local development.
