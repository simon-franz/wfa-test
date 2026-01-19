// @ts-check

import getId from '../../getId.js';
import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @template { import('../../../src/adapters/extension/PanelGroupAdapter/PanelGroupAdapter.types').PanelGroupBackendDefinition } PanelGroupBackendDefinition
 * @param { PanelGroupBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param { string } [dataGuideId]
 * @returns { PanelGroupBackendDefinition }
 */
export function panelGroupFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory('PanelGroup', { ...props }, sfId, dataGuideId);
}

/**
 * @param { Partial<import('../../../src/adapters/extension/PanelGroupAdapter/PanelGroupItem/PanelGroupItemAdapter.types').PanelGroupItemBackendProps> } props
 * @param { string } sfId
 * @param { string } [dataGuideId]
 * @returns { import('../../../src/adapters/extension/PanelGroupAdapter/PanelGroupItem/PanelGroupItemAdapter.types').PanelGroupItemBackendDefinition }
 */
export function panelGroupItemFactory(props = {}, sfId = getId(), dataGuideId) {
  return {
    sfId,
    sfComponentPart: 'Item',
    props: {
      ...props,
    },
    dataGuideId,
  };
}
