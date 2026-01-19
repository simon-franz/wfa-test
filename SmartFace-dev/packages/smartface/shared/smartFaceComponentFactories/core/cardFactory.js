// @ts-check

import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @template { import('../../../src/adapters/core/CardAdapter/CardAdapter.types').CardBackendDefinition } CardBackendDefinition
 * @param { CardBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param {string} [dataGuideId]
 * @returns { CardBackendDefinition }
 */
export function cardFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory(
    'Card',
    {
      title: '',
      ...props,
    },
    sfId,
    dataGuideId,
  );
}
