// @ts-check

import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @template { import('../../../src/adapters/core/FormTextAdapter/FormTextAdapter.types.js').FormTextBackendDefinition } FormTextBackendDefinition
 * @param { FormTextBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param {string} [dataGuideId]
 * @returns { FormTextBackendDefinition }
 */
export function formTextFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory('FormText', { label: 'Label', value: 'Value', ...props }, sfId, dataGuideId);
}
