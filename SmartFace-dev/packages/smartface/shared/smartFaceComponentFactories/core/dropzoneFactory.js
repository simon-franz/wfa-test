// @ts-check

import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @template { import('../../../src/adapters/core/DropzoneAdapter/DropzoneAdapter.types').DropzoneBackendDefinition } DropzoneBackendDefinition
 * @param { DropzoneBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param {string} [dataGuideId]
 * @returns { DropzoneBackendDefinition }
 */
export function dropzoneFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory('Dropzone', { ...props }, sfId, dataGuideId);
}
