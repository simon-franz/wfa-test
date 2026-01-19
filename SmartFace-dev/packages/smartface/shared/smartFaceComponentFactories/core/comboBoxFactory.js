// @ts-check

import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @template { import('../../../src/adapters/core/ComboBoxAdapter/ComboBoxAdapter.types').ComboBoxBackendDefinition } ComboBoxBackendDefinition
 * @param { ComboBoxBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param {string} [dataGuideId]
 * @returns { ComboBoxBackendDefinition }
 */
export function comboBoxFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory('ComboBox', { ...props }, sfId, dataGuideId);
}
