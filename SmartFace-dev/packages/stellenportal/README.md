# @hrworks/stellenportal

This is a [Next.js](https://nextjs.org) project that serves our customers as custom Job-Portals. Our customers can create their own Job-Portals with Job-Postings / Offerings and application forms. These are synced with our HR WORKS software through our API which is not a part of this package.

## Getting Started

To start the app with the actual API you need the API_SIGNATURE env variable. You can still start the nextjs app but you will get an error when navigating to a specific job portal that requires data from the API.

```bash
// Start the Next.js Dev-Server (Will run on port 1337)
bun run --bun dev

// Build the apps Docker-Image
bun run docker-build

// Run the created Docker-Image (Will run on port 3000)
bun run docker-start

// Stop the created Docker-Image
bun run docker-stop

// Log the running Docker-Image
bun run docker-logs

```

This package is part of the HR WORKS - Frontend monorepo
