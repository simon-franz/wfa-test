// @ts-check

import { smartFaceComponentFactory } from '../../smartFaceComponentFactory.js';

/**
 * @template { import('../../../../src/adapters/application/hrworks-admin/DataWidgetAdapter/DataWidgetAdapter.types').DataWidgetBackendDefinition } DataWidgetBackendDefinition
 * @param {DataWidgetBackendDefinition['props']} props
 * @param { string } [sfId]
 * @param { string } [dataGuideId]
 * @returns { DataWidgetBackendDefinition }
 */
export function dataWidgetFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory('DataWidget', { ...props }, sfId, dataGuideId);
}
