import type { ReactNode } from 'react';

import type { ErrorHandlingContext } from './ErrorHandlingContext';

export type ErrorHandlingProviderProps = Partial<ErrorHandlingContext> & {
  children?: ReactNode;
};
