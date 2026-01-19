import { promises as fs } from 'node:fs';
import { join } from 'node:path';

import checkFileExistence from '../shared/checkFileExistence.js';
import adapterTemplate from './templates/adapter/adapter.js';
import indexTemplate from './templates/adapter/index.js';
import componentMapTemplate from './templates/map.js';

const IMPORT_FLAG = '/** DO NOT REMOVE: SMART_FACE-CLI-FLAG import */';
const COMPONENTS_MAP_FLAG = '/** DO NOT REMOVE: SMART_FACE-CLI-FLAG componentMap */';

/**
 * @param { string } componentName
 * @param { string } srcPath
 * @param { object } applicationSubpaths
 * @param { string } applicationSubpaths.subpath
 * @param { string } applicationSubpaths.normalizedSubpath
 */

export default async function createAdapter(componentName, applicationName, srcPath, { subpath }) {
  const componentPath = join(srcPath, 'adapters', subpath);
  const adapterPath = join(componentPath, `${componentName}Adapter`);
  await fs.mkdir(adapterPath, { recursive: true });
  await fs.writeFile(join(adapterPath, 'index.ts'), indexTemplate({ componentName }), 'utf8');
  await fs.writeFile(
    join(adapterPath, `${componentName}Adapter.tsx`),
    adapterTemplate({ componentName, applicationName }),
    'utf8',
  );

  const componentMapPath = join(componentPath, 'componentMap.ts');
  if (!(await checkFileExistence(componentMapPath))) {
    await fs.writeFile(componentMapPath, componentMapTemplate({ applicationName }), 'utf8');
  }
  let componentMapContent = await fs.readFile(componentMapPath, 'utf8');
  componentMapContent = componentMapContent.replace(
    IMPORT_FLAG,
    `import { ${componentName}Adapter } from './${componentName}Adapter';\n${IMPORT_FLAG}`,
  );
  componentMapContent = componentMapContent.replace(
    COMPONENTS_MAP_FLAG,
    `${componentName}: ${componentName}Adapter,\n  ${COMPONENTS_MAP_FLAG}`,
  );
  await fs.writeFile(componentMapPath, componentMapContent, 'utf8');
}
