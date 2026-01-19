// @ts-check

import { existsSync, promises as fs } from 'node:fs';
import { resolve } from 'node:path';

import getProjectRoot from './getProjectRoot.js';

async function getSvgDirectories() {
  const projectPath = await getProjectRoot();
  const styles = ['filled', 'outlined', 'round', 'sharp', 'two-tone'];
  const SvgDirectories = styles.map((style) => resolve(projectPath, 'icons', 'material-design-svg', 'svgs', style));

  SvgDirectories.forEach((directory) => {
    if (!existsSync(directory)) {
      throw new Error(`Couldn't resolve ${directory}`);
    }
  });

  return SvgDirectories;
}

async function removeWidthAndHeight() {
  const directories = await getSvgDirectories();

  for (const directory of directories) {
    console.log(directory);

    const svgFiles = await fs.readdir(directory);

    for (const svgFile of svgFiles) {
      const filePath = `${directory}/${svgFile}`;
      try {
        const fileContent = await fs.readFile(filePath, 'utf8');

        const updatedContent = fileContent.replaceAll(/\s*height="24"/g, '').replaceAll(/\s*width="24"/g, '');

        await fs.writeFile(filePath, updatedContent, 'utf8');
      } catch (error) {
        console.error(`Error reading file ${filePath}:`, error);
      }
    }
  }
}

export default removeWidthAndHeight;
