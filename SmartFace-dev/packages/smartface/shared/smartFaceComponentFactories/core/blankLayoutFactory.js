// @ts-check

import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @template { import('../../../src/adapters/core/BlankLayoutAdapter/BlankLayoutAdapter.types.js').BlankLayoutBackendDefinition } BlankLayoutBackendDefinition
 * @param { BlankLayoutBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param {string} [dataGuideId]
 * @returns { BlankLayoutBackendDefinition }
 */
export function blankLayoutFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory('BlankLayout', { ...props }, sfId, dataGuideId);
}
