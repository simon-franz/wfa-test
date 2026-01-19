import { promises as fs } from 'node:fs';
import { join } from 'node:path';

import checkFileExistence from '../shared/checkFileExistence.js';
import adapterTypeTemplate from './templates/adapterType.js';
import smartFaceComponentsTypeTemplate from './templates/smartFaceComponentsType.js';
import uiTypeTemplate from './templates/uiType.js';

const IMPORT_FLAG = '/** DO NOT REMOVE: SMART_FACE-CLI-FLAG import */';
const SMART_FACE_COMPONENTS_TYPE_FLAG = '/** DO NOT REMOVE: SMART_FACE-CLI-FLAG ElementsType */';

/**
 * @param { string } componentName
 * @param { string } srcPath
 * @param { object } subpaths
 * @param { string } subpaths.subpath
 * @param { string } uiComponentsPath
 * @param { string } applicationName
 */

export default async function createType(componentName, srcPath, { subpath }, uiComponentsPath, applicationName) {
  const typesPath = join(srcPath, 'types');
  const adapterPath = join(srcPath, 'adapters', subpath, `${componentName}Adapter`);
  const adapterTypeFilePath = join(adapterPath, `${componentName}Adapter.types.ts`);
  const uiTypeFilePath = join(uiComponentsPath, 'src', componentName, `${componentName}.types.ts`);

  await fs.mkdir(join(typesPath, subpath), { recursive: true });
  await fs.mkdir(adapterPath, { recursive: true });
  await fs.writeFile(adapterTypeFilePath, adapterTypeTemplate({ componentName }), 'utf8');
  await fs.writeFile(uiTypeFilePath, uiTypeTemplate({ componentName }), 'utf8');

  const smartFaceComponentsTypePath = join(typesPath, subpath, 'SmartFaceComponentsType.ts');

  if (!(await checkFileExistence(smartFaceComponentsTypePath))) {
    // SmartFaceComponentsType.ts for new application needs to be created
    await fs.writeFile(smartFaceComponentsTypePath, smartFaceComponentsTypeTemplate(), 'utf8');
  }

  let elementsTypeContent = await fs.readFile(smartFaceComponentsTypePath, 'utf8');
  elementsTypeContent = elementsTypeContent.replace(
    IMPORT_FLAG,
    `import type { ${componentName}BackendDefinition } from '@hrworks/smartface/adapters/${applicationName}/${componentName}Adapter/${componentName}Adapter.types';\n${IMPORT_FLAG}`,
  );
  elementsTypeContent = elementsTypeContent.replace(
    `${SMART_FACE_COMPONENTS_TYPE_FLAG}`,
    `${SMART_FACE_COMPONENTS_TYPE_FLAG}\n  | ${componentName}BackendDefinition`,
  );
  await fs.writeFile(smartFaceComponentsTypePath, elementsTypeContent, 'utf8');
}
