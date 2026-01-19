import path from 'node:path';

export const getComponentPathsFiltered = (componentListPaths: string[], componentList?: string[]): string[] => {
  if (componentList === undefined || componentList.length === 0) {
    return componentListPaths;
  }

  return componentListPaths.filter((componentPath) => {
    const pathParts = componentPath.split(path.sep);
    const fileName = pathParts.at(-1) || '';
    const componentDirName = pathParts.at(-2) || '';

    const componentNameFromFile = fileName.replace('.cy.tsx', '');

    const matchesDirName = componentList.includes(componentDirName);
    const matchesFileName = componentList.includes(componentNameFromFile);

    return matchesDirName || matchesFileName;
  });
};
