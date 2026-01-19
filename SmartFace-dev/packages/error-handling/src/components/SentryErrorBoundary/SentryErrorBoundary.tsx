import { browserTracingIntegration, captureException, ErrorBoundary, getClient, init } from '@sentry/react';

import { ErrorHandlingProvider } from '../ErrorHandlingProvider';
import { Fallback } from '../Fallback/Fallback';
import type { SentryErrorBoundaryProps } from './SentryErrorBoundary.types';

export const SentryErrorBoundary = ({
  dsn,
  debugMode,
  environment,
  integrations,
  release,
  ...otherProps
}: SentryErrorBoundaryProps) => {
  const integrationMapping: { [key: string]: () => any } = {
    BrowserTracing: () => browserTracingIntegration(),
  };

  const mappedIntegrations = integrations
    ? integrations.map((intName) => integrationMapping[intName]).filter((integration) => integration !== undefined)
    : undefined;

  // Only initialize Sentry if it hasn't been initialized already - otherwise there will be an Error
  if (!getClient()) {
    init({
      // General
      dsn,
      environment,
      release,
      integrations: mappedIntegrations,

      // Debugging
      debug: debugMode,
      attachStacktrace: true,

      // MISC
      maxBreadcrumbs: 50,
      normalizeDepth: 3,
    });
  }

  return (
    <ErrorHandlingProvider>
      <ErrorBoundary
        fallback={() => <Fallback />}
        onError={(error, componentStack) => {
          captureException(error, {
            contexts: {
              componentStackInfo: { stack: componentStack },
              extra: {
                additionalData: "Caught by Sentry's global ErrorBoundary",
              },
            },
          });
        }}
        {...otherProps}
      />
    </ErrorHandlingProvider>
  );
};
