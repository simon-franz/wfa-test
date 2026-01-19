import { join } from 'node:path';

/**
 * @param { string } applicationName
 * @returns { object } subpaths
 * @returns { string } subpaths.subpath
 * @returns { string } subpaths.normalizedSubpath
 */
export default function getSubpaths(applicationName) {
  switch (applicationName) {
    case undefined:
      return { subpath: 'core', normalizedSubpath: 'core' };
    case 'core':
      return { subpath: 'core', normalizedSubpath: 'core' };
    case 'extension':
      return { subpath: 'extension', normalizedSubpath: 'extension' };
    default:
      // TODO
      // Herausfinden warum hier unter windows/WSL der selbe output für subpath && normalizedSubpath rauskommt
      // Hat vllt. was mit \ und / unter verschiedenen OS's zu tun.
      return {
        subpath: join('application', applicationName),
        normalizedSubpath: `application/${applicationName}`,
      };
  }
}
