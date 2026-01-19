import { type LogData, type LogParams, prepareLogData, stringifyError } from '@hrworks/error-handling';

import type { SmartFaceErrorHandlingConfig } from '../../../../types/shared/SmartFaceBackendConfig';
import { getSmartFaceBackendConfigProperty } from '../../getSmartFaceBackendConfigProperty';
import { sfAxios } from '../../sfAxios';

export const log = (params: LogParams) => {
  const smartFaceErrorHandlingConfig = getSmartFaceBackendConfigProperty('sfErrorHandler')
    ?.config as SmartFaceErrorHandlingConfig;

  const isDevelopment = process.env.NODE_ENV === 'development';

  if (!smartFaceErrorHandlingConfig?.url) {
    if (isDevelopment) {
      console.error(params);
    }

    return;
  }

  const { code, error, metaData, severity } = prepareLogData(params);

  sfAxios
    .post<{ message?: string; newData?: LogData }>(smartFaceErrorHandlingConfig?.url, {
      data: {
        data: smartFaceErrorHandlingConfig.data,
        logs: [
          {
            code,
            severity,
            error: error && stringifyError(error),
            stack: error?.stack || null,
            metaData,
          },
        ],
      },
    })
    .then((res) => {
      if (res.type !== 'success') return;
      const { message, newData } = res.data;
      message && console.log(message);

      const smartFaceErrorHandlerConfig = getSmartFaceBackendConfigProperty('sfErrorHandler')
        ?.config as SmartFaceErrorHandlingConfig;

      if (newData != null && smartFaceErrorHandlerConfig) {
        smartFaceErrorHandlerConfig.data = newData;
      }
    });
};
