'use client';

import { captureException, ErrorBoundary as SentryErrorBoundary } from '@sentry/nextjs';

import type { ErrorBoundaryProps } from './ErrorBoundary.types';
import { ErrorFallback } from './ErrorFallback';

export const ErrorBoundary = ({ children, fallback, ...otherProps }: ErrorBoundaryProps) => (
  <SentryErrorBoundary
    fallback={fallback || <ErrorFallback />}
    onError={(error, componentStack) => {
      captureException(error, {
        contexts: {
          react: {
            componentStack,
          },
        },
        tags: {
          component: 'SentryErrorBoundary',
          location: 'login-package',
        },
      });
      console.error('SentryErrorBoundary - Error:', error, componentStack);
    }}
    {...otherProps}
  >
    {children}
  </SentryErrorBoundary>
);
