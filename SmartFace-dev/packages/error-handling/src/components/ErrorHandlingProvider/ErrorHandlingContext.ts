import { createContext } from 'react';

import type { LogParams } from '../../types/Log.types';

export type ErrorHandlingContext = {
  log: (params: LogParams) => void;
};

export const ErrorHandlingContext = createContext({} as ErrorHandlingContext);
