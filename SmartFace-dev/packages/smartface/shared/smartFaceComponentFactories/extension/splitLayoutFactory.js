// @ts-check

import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @template { import('../../../src/adapters/extension/SplitLayoutAdapter/SplitLayoutAdapter.types').SplitLayoutBackendDefinition } SplitLayoutBackendDefinition
 * @param { SplitLayoutBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param {string} [dataGuideId]
 * @returns { SplitLayoutBackendDefinition }
 */
export function splitLayoutFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory('SplitLayout', { ...props }, sfId, dataGuideId);
}
