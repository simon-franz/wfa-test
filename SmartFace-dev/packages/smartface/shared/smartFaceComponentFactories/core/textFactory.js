// @ts-check

import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @template { import('../../../src/adapters/core/TextAdapter/TextAdapter.types').TextBackendDefinition } TextBackendDefinition
 * @param { TextBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param {string} [dataGuideId]
 * @returns { TextBackendDefinition }
 */
export function textFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory(
    'Text',
    {
      text: 'Text',
      ...props,
    },
    sfId,
    dataGuideId,
  );
}
