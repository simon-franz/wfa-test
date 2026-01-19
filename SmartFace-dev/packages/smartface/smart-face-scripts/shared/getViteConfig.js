// @ts-check

import path from 'node:path';

import getConfigPaths from './getConfigPaths.js';

/**
 * Get vite config for various operations
 * @param {string} uiPath
 * @param {object} specificUiPaths
 * @param {string} applicationName
 * @param {string} base
 * @returns
 */
export function getViteConfig(uiPath, specificUiPaths, applicationName, base) {
  return {
    base,
    resolve: {
      alias: [
        { find: '@ui/styles', replacement: path.resolve(getConfigPaths(uiPath, applicationName)[0], 'styles') },
        ...Object.entries(specificUiPaths).map(([uiName, specificUiPath]) => ({
          find: `@${uiName}/styles`,
          replacement: path.resolve(getConfigPaths(specificUiPath, applicationName)[0], 'styles'),
        })),
      ],
    },
  };
}
