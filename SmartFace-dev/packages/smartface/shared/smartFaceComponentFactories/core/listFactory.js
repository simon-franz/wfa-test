// @ts-check

import getId from '../../getId.js';
import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';
/**
 * @param  { Partial<import('../../../src/adapters/core/ListAdapter/ListAdapter.types').ListBackendProps> } props
 * @param  { string } sfId
 * @param {string} [dataGuideId]
 * @returns { import('../../../src/adapters/core/ListAdapter/ListAdapter.types').ListBackendDefinition }
 */
function listFactory(props = {}, sfId = getId(), dataGuideId) {
  return smartFaceComponentFactory('List', { ...props }, sfId, dataGuideId);
}

/**
 * @param  { Partial<import('../../../src/adapters/core/ListAdapter/Item/ListItemAdapter.types').ListItemBackendProps> } props
 * @param  { string } sfId
 * @param {string} [dataGuideId]
 * @returns { import('../../../src/adapters/core/ListAdapter/Item/ListItemAdapter.types').ListItemBackendDefinition }
 */
function listItemFactory(props = {}, sfId = getId(), dataGuideId) {
  return {
    sfComponentPart: 'ListItem',
    sfId,
    props: { ...props },
    dataGuideId,
  };
}

export { listFactory, listItemFactory };
