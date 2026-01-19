import { join } from 'node:path';

import getProjectRoot from '../shared/getProjectRoot.js';
import createAdapter from './createAdapter.js';
import createComponent from './createComponent.js';
import createComponentFactory from './createComponentFactory.js';
import createType from './createType.js';
import getSubpaths from './getSubpaths.js';

/**
 * @param { string } componentName
 * @param { string } applicationName
 */
export default async function newComponent(componentName, applicationName = 'core') {
  // TODO move all isolated application specific generations to this Level / add better logic
  const root = await getProjectRoot();
  const srcPath = await join(root, 'src');
  const factoriesPath = await join(root, 'shared', 'smartFaceComponentFactories');
  const subpaths = await getSubpaths(applicationName);
  const uiComponentsPath = await join(root, '..', 'sui-' + applicationName);

  await createComponent(componentName, uiComponentsPath, subpaths, srcPath, applicationName);
  await createAdapter(componentName, applicationName, srcPath, subpaths);
  await createType(componentName, srcPath, subpaths, uiComponentsPath, applicationName);
  await createComponentFactory(componentName, factoriesPath, subpaths);
}
