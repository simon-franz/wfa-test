// @ts-check

import getId from '../../getId.js';
import { imageFactory } from '../core/imageFactory.js';
import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @template { import('../../../src/adapters/extension/PortrayedListAdapter/PortrayedListAdapter.types').PortrayedListBackendDefinition } PortrayedListBackendDefinition
 * @param { PortrayedListBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param {string} [dataGuideId]
 * @returns { PortrayedListBackendDefinition }
 */
export function portrayedListFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory('PortrayedList', { ...props }, sfId, dataGuideId);
}

/**
 * @param  { Partial<import('../../../src/adapters/extension/PortrayedListAdapter/ListItem/PortrayedListItemAdapter.types').PortrayedListItemBackendProps> } props
 * @param  { string } sfId
 * @param {string} [dataGuideId]
 * @returns { import('../../../src/adapters/extension/PortrayedListAdapter/ListItem/PortrayedListItemAdapter.types').PortrayedListItemBackendDefinition }
 */
export function portrayedListItemFactory(props = {}, sfId = getId(), dataGuideId) {
  return {
    sfId,
    props: {
      title: 'Title',
      subtitle: 'Subtitle',
      media: imageFactory(),
      ...props,
    },
    dataGuideId,
  };
}
