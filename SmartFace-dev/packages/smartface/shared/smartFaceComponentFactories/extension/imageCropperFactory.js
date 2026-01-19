// @ts-check

import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @template { import('../../../src/adapters/extension/ImageCropperAdapter/ImageCropperAdapter.types').ImageCropperBackendDefinition } ImageCropperBackendDefinition
 * @param { ImageCropperBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param {string} [dataGuideId]
 * @returns { ImageCropperBackendDefinition }
 */
export function imageCropperFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory('ImageCropper', { ...props }, sfId, dataGuideId);
}
