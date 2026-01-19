// @ts-check

import { fileURLToPath } from 'bun';
import { existsSync, promises as fs, writeFileSync } from 'node:fs';
import path, { dirname, resolve } from 'node:path';

import getProjectRoot from './getProjectRoot.js';

// ATTENTION:
// This script generates 2 namelists for the FontAwesome-Pro-icon-set - 1 for the 'brands'-variant and 1 for the other variants (e. g. 'solid')
// The script loops through 2 folders containing the icons of each variant
// These 2 folders are supposed to be located / stored in icons/font-awesome-svg/svgs
// These folders are NOT supposed to be committed to the remote repository!! Hence, the path svgs/ is included in .gitignore.

// RETURNS: packages\smartface\src\main\lib\IconSetsController\iconsets\font-awesome-svg\svgs
async function getSvgDirectory() {
  const projectPath = await getProjectRoot();
  const SvgDirectory = resolve(projectPath, 'icons', 'font-awesome-svg', 'svgs');
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

async function generateBackendNameLists() {
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

  // Create 2 lists of Svg-names Backend (brands & other variants)
  const rootDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..', '..');

  async function generateNameListForBackendBrands() {
    const brandsNamesArray = await fs.readdir(allVariantPaths[0]);
    const svgNameFilteredArray = brandsNamesArray
      .filter((iconName) => iconName.includes('svg'))
      .map((iconName) => iconName.replace('.svg', ''));

    let brandsNamesList = '';
    svgNameFilteredArray.map((svgName, index) => {
      return (brandsNamesList +=
        index === svgNameFilteredArray.length - 1 ? `add: '${svgName}'` : `add: '${svgName}';\n`);
    });

    try {
      writeFileSync(resolve(rootDirectory, 'FontAwesomeIconsListForSmalltalkBrands.txt'), brandsNamesList, 'utf8');
    } catch (error) {
      console.log(
        `Error writing file ${path.join(rootDirectory, 'FontAwesomeIconsListForSmalltalkBrands.txt')}`,
        error,
      );
    }
  }

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
      writeFileSync(resolve(rootDirectory, 'FontAwesomeIconsListForSmalltalk.txt'), otherVariantsNamesList, 'utf8');
    } catch (error) {
      console.log(`Error writing file ${path.join(rootDirectory, 'FontAwesomeIconsListForSmalltalk.txt')}`, error);
    }
  }
  generateNameListForBackendBrands();
  generateNameListForBackend();
}

export default generateBackendNameLists;
