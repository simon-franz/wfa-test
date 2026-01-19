// @ts-check

import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @template { import('../../../src/adapters/core/FileManagerAdapter/FileManagerAdapter.types').FileManagerBackendDefinition } FileManagerBackendDefinition
 * @param { FileManagerBackendDefinition['props'] } props
 * @param { string } [sfId]
 @param {string} [dataGuideId]
 * @returns { FileManagerBackendDefinition }
 */
export function fileManagerFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory('FileManager', { ...props }, sfId, dataGuideId);
}
