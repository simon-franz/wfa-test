import { captureException } from '@sentry/react';

import type { LogParams } from '../types/Log.types';
import { prepareLogData } from './prepareLogData';
import { stringifyError } from './stringifyError';

export const log = (params: LogParams) => {
  const { code, error, metaData, severity } = prepareLogData(params);

  error?.stack && console[`${severity === 'warning' ? 'warn' : 'error'}`](error.stack);

  captureException(error, {
    extra: {
      debugInfo: 'Additional debug information',
      logs: [
        {
          code,
          severity,
          error: error && stringifyError(error),
          stack: error?.stack,
          metaData,
        },
      ],
    },
  });
};
