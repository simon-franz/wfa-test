import { existsSync, promises as fs } from 'node:fs';
import { join } from 'node:path';
import { exit } from 'node:process';

import componentTemplate from './templates/uiComponent/component.js';
import indexTemplate from './templates/uiComponent/index.js';
import storiesTemplate from './templates/uiComponent/stories.js';

/**
 * @param { string } componentName
 * @param { string } uiComponentsPath
 * @param { object } subpaths
 * @param { string } subpaths.subpath
 * @param { string } subpaths.normalizedSubpath
 * @param { string } srcPath
 * @param { string } applicationName
 */
export default async function createComponent(componentName, uiComponentsPath, applicationName) {
  const indexFileContent = indexTemplate({ componentName });
  const componentFileContent = componentTemplate({ componentName });
  const componentDirectory = join(uiComponentsPath, 'src', componentName);
  if (existsSync(componentDirectory)) {
    console.error(`\nERROR: Component "${componentName}" already exists. \nExiting.\n`);
    exit(0);
  } else {
    await fs.mkdir(componentDirectory, { recursive: true });
    await fs.writeFile(join(componentDirectory, 'index.ts'), indexFileContent, 'utf8');
    await fs.writeFile(join(componentDirectory, `${componentName}.tsx`), componentFileContent, 'utf8');

    await fs.writeFile(
      join(componentDirectory, `${componentName}.stories.tsx`),
      storiesTemplate({ componentName, applicationName }),
      'utf8',
    );
  }
}
