'use client';

import { ServerStatus } from '@hrworks/error-handling';
import SuiNextJsProvider from '@hrworks/sui-core/SuiNextJsProvider';

export const ErrorFallback = () => {
  return (
    <SuiNextJsProvider>
      <ServerStatus
        statusCode="Error"
        title="Something went wrong"
        subtitle="An unexpected error occurred. Our team has been notified and is working to fix this issue."
      />
    </SuiNextJsProvider>
  );
};
