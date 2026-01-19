import type { ERROR_CODES } from '../constants/error_codes';
import type { WARNING_CODES } from '../constants/warning_codes';

export type LogData = {
  severity: 'warning' | 'error';
  code: keyof typeof ERROR_CODES | keyof typeof WARNING_CODES;
  error: Error;
  metaData?:
    | string
    | {
        tags?: string;
        extra?: string;
        user?: string;
      };
};

export type LogParams =
  | {
      type: 'error';
      code: LogData['code'];
      error: Error;
      metaData?: string;
    }
  | {
      type: 'warning';
      code: LogData['code'];
      message?: string;
    };
