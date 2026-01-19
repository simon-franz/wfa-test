import { promises as fs } from 'node:fs';
import { join } from 'node:path';

import factoryTemplate from './templates/factories/factory.js';
// TODO Remove unused applicationSubpaths
/**
 * @param { string } componentName
 * @param { string } srcPath
 * @param { object } applicationSubpaths
 * @param { string } applicationSubpaths.subpath
 * @param { string } applicationSubpaths.normalizedSubpath
 */
export default async function createComponentFactory(componentName, srcPath, { subpath, normalizedSubpath }) {
  const factoriesPath = join(srcPath, subpath);
  const factoriesFilePath = join(
    factoriesPath,
    `${componentName[0].toLocaleLowerCase() + componentName.slice(1)}Factory.js`,
  );
  await fs.mkdir(factoriesPath, { recursive: true });
  await fs.writeFile(factoriesFilePath, factoryTemplate({ componentName, normalizedSubpath }), 'utf8');
}
