// Sentry NextJS Documentation: https://docs.sentry.io/platforms/javascript/guides/nextjs/
// Client init: instrumentation-client.ts
// Server init: sentry.server.config.ts
import type { SentryConfig } from './sentry.config.types';

const { NEXT_PUBLIC_REALM, NEXT_PUBLIC_SENTRY_DSN, NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE, NEXT_PUBLIC_SENTRY_DEBUG } =
  process.env;

const getSentryConfig = (): SentryConfig => {
  const baseConfig = {
    environment: NEXT_PUBLIC_REALM,
    dsn: NEXT_PUBLIC_SENTRY_DSN,
    tracesSampleRate: NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE
      ? Number.parseFloat(NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE)
      : undefined,
    debug: NEXT_PUBLIC_SENTRY_DEBUG === 'true',
  };

  // Remove undefined values to keep config clean
  return Object.fromEntries(Object.entries(baseConfig).filter(([_, value]) => value !== undefined)) as SentryConfig;
};

export const sentryConfig = getSentryConfig();
