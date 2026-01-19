// @ts-check

import getId from '../../getId.js';
import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @template { import('../../../src/adapters/core/GridAdapter/GridAdapter.types').GridBackendDefinition } GridBackendDefinition
 * @param { GridBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param { string } [dataGuideId]
 * @returns { GridBackendDefinition }
 */
export function gridFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory('Grid', { ...props }, sfId, dataGuideId);
}

/**
 * @param { Partial<import('../../../src/adapters/core/GridAdapter/GridItemAdapter/GridItemAdapter.types').GridItemBackendProps> } props
 * @param { string } [sfId]
 * @param { string } [dataGuideId]
 * @returns { import('../../../src/adapters/core/GridAdapter/GridItemAdapter/GridItemAdapter.types').GridItemBackendDefintion }
 */
export function gridItemFactory(props = {}, sfId = getId(), dataGuideId) {
  return {
    sfId,
    props: { ...props },
    dataGuideId,
  };
}
