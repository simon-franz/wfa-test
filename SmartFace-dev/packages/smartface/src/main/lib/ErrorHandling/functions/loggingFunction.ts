import { log as sentryLog } from '@hrworks/error-handling';

import { getSmartFaceBackendConfigProperty } from '../../getSmartFaceBackendConfigProperty';
import { log as smartFaceLog } from './log';

export const loggingFunction =
  getSmartFaceBackendConfigProperty('sfErrorHandler')?.name === 'sentry' ? sentryLog : smartFaceLog;
