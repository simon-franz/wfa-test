// @ts-check

import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @template { import('../../../src/adapters/extension/HeaderAreaAdapter/HeaderAreaAdapter.types').HeaderAreaBackendDefinition } HeaderAreaBackendDefinition
 * @param { HeaderAreaBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param {string} [dataGuideId]
 * @returns { HeaderAreaBackendDefinition }
 */
export function headerAreaFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory('HeaderArea', { ...props }, sfId, dataGuideId);
}
