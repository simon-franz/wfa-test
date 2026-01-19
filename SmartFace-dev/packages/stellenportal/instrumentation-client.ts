import * as Sentry from '@sentry/nextjs';

if (typeof window !== 'undefined') {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    debug: true,
    tracesSampleRate: 1,
    sendDefaultPii: false,
    beforeSend(event) {
      console.log('📤 Sentry event being sent:', event);

      return event;
    },
  });
}
