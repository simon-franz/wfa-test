// @ts-check

import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @template { import('../../../src/adapters/core/DecimalFieldAdapter/DecimalFieldAdapter.types').DecimalFieldBackendDefinition }DecimalFieldBackendDefinition
 * @param { DecimalFieldBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param {string} [dataGuideId]
 * @returns { DecimalFieldBackendDefinition }
 */
export function decimalFieldFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory(
    'DecimalField',
    { label: 'Label', name: 'DecimalField', ...props },
    sfId,
    dataGuideId,
  );
}
