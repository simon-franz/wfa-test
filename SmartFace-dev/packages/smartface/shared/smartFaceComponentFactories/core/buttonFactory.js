// @ts-check

import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @template { import('../../../src/adapters/core/ButtonAdapter/ButtonAdapter.types').ButtonBackendDefinition } ButtonBackendDefinition
 * @param { ButtonBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param {string} [dataGuideId]
 * @returns { ButtonBackendDefinition }
 */
export function buttonFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory(
    'Button',
    {
      text: 'Default',
      ...props,
    },
    sfId,
    dataGuideId,
  );
}
