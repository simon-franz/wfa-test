// @ts-check

import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @param  { Partial<import('../../../src/adapters/extension/AfterEffectsMediaAdapter/AfterEffectsMediaAdapter.types').AfterEffectsMediaBackendProps> } props
 * @param  { string } sfId
 * @param {string} [dataGuideId]
 * @returns { import('../../../src/adapters/extension/AfterEffectsMediaAdapter/AfterEffectsMediaAdapter.types').AfterEffectsMediaBackendDefinition }
 */
export function afterEffectsMediaFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory(
    'AfterEffectsMedia',
    {
      ...props,
    },
    sfId,
    dataGuideId,
  );
}
