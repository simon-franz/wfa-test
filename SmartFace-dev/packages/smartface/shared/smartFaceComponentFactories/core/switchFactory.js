// @ts-check

import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @template { import('../../../src/adapters/core/SwitchAdapter/SwitchAdapter.types').SwitchBackendDefinition } SwitchBackendDefinition
 * @param { SwitchBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param {string} [dataGuideId]
 * @returns { SwitchBackendDefinition }
 */
export function switchFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory('Switch', { ...props }, sfId, dataGuideId);
}
