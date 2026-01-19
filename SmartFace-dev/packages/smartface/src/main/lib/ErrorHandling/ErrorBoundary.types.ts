import type { ReactNode } from 'react';

import type { SmartFaceBackendConfig } from '../../../types/shared/SmartFaceBackendConfig';

export type ErrorBoundaryProps = NonNullable<SmartFaceBackendConfig['sfErrorHandler']>['config'] & {
  children: ReactNode;
};
