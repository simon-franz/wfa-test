// @ts-check

import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @param  { Partial<import('../../../src/adapters/core/CheckboxAdapter/CheckboxAdapter.types').CheckboxBackendProps> } props
 * @param  { string } sfId
 * @param {string} [dataGuideId]
 * @returns { import('../../../src/adapters/core/CheckboxAdapter/CheckboxAdapter.types').CheckboxBackendDefinition }
 */
export function checkboxFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory('Checkbox', { title: 'Title', ...props }, sfId, dataGuideId);
}
