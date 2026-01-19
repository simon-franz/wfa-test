import { join } from 'node:path';

/**
 * @param {string} basePath
 * @param {string} [applicationName]
 */
export default (basePath, applicationName) => [
  ...(applicationName && applicationName.length > 0 ? [join(basePath, 'application', applicationName)] : []),
  join(basePath, 'extension'),
  join(basePath, 'core'),
];
