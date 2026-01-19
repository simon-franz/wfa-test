// @ts-check

import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @param { import('../../../src/adapters/core/CheckboxGroupAdapter/CheckboxGroupAdapter.types').CheckboxGroupBackendProps } props
 * @param { string } [sfId]
 * @param {string} [dataGuideId]
 * @returns { import('../../../src/adapters/core/CheckboxGroupAdapter/CheckboxGroupAdapter.types').CheckboxGroupBackendDefinition }
 */

export function checkboxGroupFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory('CheckboxGroup', { title: 'Title', ...props }, sfId, dataGuideId);
}
