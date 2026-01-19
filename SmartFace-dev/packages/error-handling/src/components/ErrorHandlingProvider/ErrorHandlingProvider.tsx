import { useContext } from 'react';

import { log as sentryLog } from '../../functions/log';
import { ErrorHandlingContext } from './ErrorHandlingContext';
import type { ErrorHandlingProviderProps } from './ErrorHandlingProvider.types';

export const ErrorHandlingProvider = ({ children, log }: ErrorHandlingProviderProps) => {
  const { log: logFromContext } = useContext(ErrorHandlingContext);

  const value: ErrorHandlingContext = { log: log || logFromContext || sentryLog };

  return <ErrorHandlingContext.Provider value={value}>{children}</ErrorHandlingContext.Provider>;
};
