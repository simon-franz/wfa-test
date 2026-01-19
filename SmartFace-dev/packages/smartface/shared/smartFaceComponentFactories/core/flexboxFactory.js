// @ts-check

import getId from '../../getId.js';
import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @template { import('../../../src/adapters/core/FlexboxAdapter/FlexboxAdapter.types').FlexboxBackendDefinition } FlexboxBackendDefinition
 * @param { FlexboxBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param {string} [dataGuideId]
 * @returns { FlexboxBackendDefinition }
 */
export function flexboxFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory('Flexbox', { ...props }, sfId, dataGuideId);
}

/**
 * @param { Partial<import('../../../src/adapters/core/FlexboxAdapter/Item/FlexboxItemAdapter.types').FlexboxItemBackendProps> } props
 * @param { string } [sfId]
 * @param {string} [dataGuideId]
 * @returns { import('../../../src/adapters/core/FlexboxAdapter/Item/FlexboxItemAdapter.types').FlexboxItemBackendDefinition }
 */
export function flexboxItemFactory(props = {}, sfId = getId(), dataGuideId) {
  return {
    sfId,
    props: {
      ...props,
    },
    dataGuideId,
  };
}
