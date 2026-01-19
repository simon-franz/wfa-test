// @ts-check

import { fileURLToPath } from 'bun';
import { existsSync, promises as fs, writeFileSync } from 'node:fs';
import path, { dirname, resolve } from 'node:path';

import getProjectRoot from './getProjectRoot.js';

// ATTENTION:
// This script generates 1 namelist for the MaterialDesign-icon-set
// The script loops through the folders containing the icons of each variant
// These folders are supposed to be located / stored in icons/material-design-svg/svgs
// These folders are NOT supposed to be committed to the remote repository!! Hence, the path svgs/ is included in .gitignore.

// RETURNS: packages\smartface\src\main\lib\IconSetsController\iconsets\material-design\svgs
async function getSvgDirectory() {
  const projectPath = await getProjectRoot();
  const SvgDirectory = resolve(projectPath, 'icons', 'material-design-svg', 'svgs');
  if (!existsSync(SvgDirectory)) {
    throw new Error(`Couldn't resolve ${SvgDirectory}`);
  }

  return SvgDirectory;
}

async function getSvgFileNamesWithoutExtension(path) {
  return (await fs.readdir(path, { withFileTypes: true }))
    .filter((entry) => entry.isFile() && entry.name.endsWith('.svg'))
    .map((entry) => String(entry.name.replace('.svg', '')));
}

async function generateBackendNameList() {
  const directory = await getSvgDirectory();
  const allVariants = await fs.readdir(directory);

  // Populate Arrays Svg-Names & the Path to each Variant-Folder
  const svgNameArrays = [];
  const allVariantPaths = [];
  await Promise.all(
    allVariants.map(async (singleVariant) => {
      const variantPath = path.join(directory, singleVariant);
      const svgNames = await getSvgFileNamesWithoutExtension(variantPath);

      svgNameArrays.push(svgNames);
      allVariantPaths.push(variantPath);
    }),
  );

  // Create 1 list of Svg-names Backend (all 5 variants)
  const rootDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..', '..');

  async function generateNameListForBackend() {
    const otherVariantsNamesArray = await fs.readdir(allVariantPaths[1]);

    const svgNameFilteredArray = otherVariantsNamesArray
      .filter((iconName) => iconName.includes('svg'))
      .map((iconName) => iconName.replace('.svg', ''));

    let otherVariantsNamesList = '';
    svgNameFilteredArray.map((svgName, index) => {
      return (otherVariantsNamesList +=
        index === svgNameFilteredArray.length - 1 ? `add: '${svgName}'` : `add: '${svgName}';\n`);
    });

    try {
      writeFileSync(resolve(rootDirectory, 'MaterialDesignIconsListForSmalltalk.txt'), otherVariantsNamesList, 'utf8');
    } catch (error) {
      console.log(`Error writing file ${path.join(rootDirectory, 'MaterialDesignIconsListForSmalltalk.txt')}`, error);
    }
  }
  generateNameListForBackend();
}

export default generateBackendNameList;
