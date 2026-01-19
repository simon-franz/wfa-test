// @ts-check

import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @template { import('../../../src/adapters/core/SelectAdapter/SelectAdapter.types.js').SelectBackendDefinition }  SelectBackendDefinition
 * @param { SelectBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param {string} [dataGuideId]
 * @returns { SelectBackendDefinition }
 */
export function selectFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory('SelectBox', { ...props }, sfId, dataGuideId);
}
