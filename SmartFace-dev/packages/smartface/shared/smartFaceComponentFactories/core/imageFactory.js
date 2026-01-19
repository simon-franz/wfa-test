// @ts-check

import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @template { import('../../../src/adapters/core/ImageAdapter/ImageAdapter.types').ImageBackendDefinition } ImageBackendDefinition
 * @param { ImageBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param {string} [dataGuideId]
 * @returns { ImageBackendDefinition }
 */
export function imageFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory(
    'Image',
    {
      src: 'ui-assets/pictures/profile.jpg',
      ...props,
    },
    sfId,
    dataGuideId,
  );
}
