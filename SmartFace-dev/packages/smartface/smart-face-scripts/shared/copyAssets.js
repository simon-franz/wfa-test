import { copy, emptyDir } from 'fs-extra';
import { resolve as _resolve } from 'node:path';

import getProjectRoot from './getProjectRoot.js';

async function copyUiAssetsFolder(uiAssetsPath, publicUiAssetsPath, retries) {
  try {
    await copy(uiAssetsPath, publicUiAssetsPath, { recursive: true });
  } catch (error) {
    if (retries > 0 && error.code === 'EPERM') {
      await new Promise((resolve) => setTimeout(resolve, 100)); // Wait to prevent Windows EPERM-Issues caused by a too early copy
      copyUiAssetsFolder(uiAssetsPath, publicUiAssetsPath, --retries);
    } else {
      throw error;
    }
  }
}

export default async function copyAssets() {
  const rootPath = await getProjectRoot();
  const publicUiAssetsPath = _resolve(rootPath, 'public', 'ui-assets');
  await emptyDir(publicUiAssetsPath);
  await copyUiAssetsFolder(_resolve('src', 'assets'), publicUiAssetsPath, 5);
}
