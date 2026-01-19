// @ts-check

import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @template { import('../../../src/adapters/core/FormAdapter/FormAdapter.types').FormBackendDefinition } FormBackendDefinition
 * @param { FormBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param {string} [dataGuideId]
 * @returns { FormBackendDefinition }
 */
export function formFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory('Form', { ...props }, sfId, dataGuideId);
}
