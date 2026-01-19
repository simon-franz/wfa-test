import { SentryErrorBoundary } from '@hrworks/error-handling';
import { observer } from 'mobx-react';

import { getSmartFaceBackendConfigProperty } from '../getSmartFaceBackendConfigProperty';
import type { ErrorBoundaryProps } from './ErrorBoundary.types';
import { SmartFaceErrorBoundary } from './SmartFaceErrorBoundary/SmartFaceErrorBoundary';

export const ErrorBoundary = observer((props: ErrorBoundaryProps) => {
  const errorHandler = getSmartFaceBackendConfigProperty('sfErrorHandler');

  return errorHandler?.name === 'sentry' ? (
    <SentryErrorBoundary {...errorHandler.config} {...props} />
  ) : (
    <SmartFaceErrorBoundary {...errorHandler?.config} {...props} />
  );
});
