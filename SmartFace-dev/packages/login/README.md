# @hrworks/login

This package contains the login application for HR WORKS. It is a Next.js application that handles user authentication.

## Getting Started

To run the application in a development environment, use the following command:

```bash
bun run --bun dev
```

The application will be available at `http://localhost:4242`.

## Features

- User login with companyId, userId and password
- Two-factor authentication (2FA)
  - Authenticator
  - E-Mail
  - YubiKey
- Single sign-on (SSO)
- Password reset functionality
- "Stay logged in" and "Save login data" options
- Language detection via User-Agent

## Technology Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **UI**: [React](https://reactjs.org/) with [Emotion](https://emotion.sh/) for styling
- **Internationalization**: [next-intl](https://next-intl-docs.vercel.app/)
- **Error Reporting**: [Sentry](https://sentry.io/)
- **TypeScript**: For static typing
