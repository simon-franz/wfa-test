// @ts-check

import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @template { import('../../../src/adapters/extension/DataGridAdapter/DataGridAdapter.types').DataGridBackendDefinition } DataGridBackendDefinition
 * @param { DataGridBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param {string} [dataGuideId]
 * @returns { DataGridBackendDefinition }
 */
export function dataGridFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory('DataGrid', { ...props }, sfId, dataGuideId);
}
