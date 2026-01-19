import fs from 'node:fs';
import path from 'node:path';

export const getComponentPaths = (packageDirectories: string[]): string[] => {
  const fileList: string[] = [];

  const cypressRoot = process.cwd();

  const findTestFilesRecursively = (dir: string) => {
    if (!fs.existsSync(dir)) {
      console.warn(`⚠️ Directory not found: ${dir}`);

      return;
    }

    try {
      const items = fs.readdirSync(dir);

      items.forEach((item) => {
        const itemPath = path.join(dir, item);
        const stat = fs.statSync(itemPath);

        if (stat.isDirectory()) {
          findTestFilesRecursively(itemPath);
        } else if (item.endsWith('.cy.tsx')) {
          fileList.push(itemPath);
        }
      });
    } catch (error) {
      console.warn(`⚠️ Error reading directory ${dir}:`, error);
    }
  };

  packageDirectories.forEach((packageDir) => {
    const baseDir = path.resolve(cypressRoot, '..', packageDir);
    findTestFilesRecursively(baseDir);
  });

  return fileList;
};
