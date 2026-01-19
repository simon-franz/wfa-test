import { createServer } from 'vite';

import copyAssets from '../shared/copyAssets.js';
import { getViteConfig } from '../shared/getViteConfig.js';

/**
 * @param { object } config
 * @param { string } config.typePath
 * @param { string } config.uiPath
 * @param { string } config.applicationName
 * @param { object } config.specificUiPaths
 */
export default async function develop({ uiPath, applicationName, specificUiPaths }) {
  await copyAssets();
  const server = await createServer(getViteConfig(uiPath, specificUiPaths, applicationName, ''));
  await server.listen();
}
