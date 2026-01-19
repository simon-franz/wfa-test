// @ts-check

import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @template { import('../../../src/adapters/core/RadioGroupAdapter/RadioGroupAdapter.types').RadioGroupBackendDefinition } RadioGroupBackendDefinition
 * @param { RadioGroupBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param {string} [dataGuideId]
 * @returns { RadioGroupBackendDefinition }
 */
export function radioGroupFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory('RadioGroup', { ...props }, sfId, dataGuideId);
}
