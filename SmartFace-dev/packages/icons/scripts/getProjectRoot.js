import { fileURLToPath } from 'bun';
import { dirname, resolve } from 'node:path';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');

export default async function getProjectRoot() {
  return projectRoot;
}
