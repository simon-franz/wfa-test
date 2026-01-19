import type { ReactNode } from 'react';

export type SentryErrorBoundaryProps = SentryConfig & {
  children?: ReactNode;
};

export type SentryConfig = {
  dsn?: string;
  environment?: string;
  release?: string;
  integrations?: 'BrowserTracing'[];
  debugMode?: boolean;
};
