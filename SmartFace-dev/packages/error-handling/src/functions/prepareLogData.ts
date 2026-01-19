import type { LogData, LogParams } from '../types/Log.types';

export const prepareLogData = (params: LogParams) => {
  const logData: Partial<LogData> = {
    code: params.code,
    severity: params.type,
  };

  if (params.type === 'error') {
    logData.error = params.error;
    logData.metaData = params.metaData;
  } else {
    logData.error = new Error(params.message);
  }

  return logData;
};
