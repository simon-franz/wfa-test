// @ts-check

import getId from '#shared/getId';

import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @template { import('../../../src/adapters/core/IntegerFieldAdapter/IntegerFieldAdapter.types').IntegerFieldBackendDefinition } IntegerFieldBackendDefinition
 * @param { IntegerFieldBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param {string} [dataGuideId]
 * @returns { IntegerFieldBackendDefinition }
 */
export function integerFieldFactory(props = {}, sfId = getId(), dataGuideId) {
  return smartFaceComponentFactory(
    'IntegerField',
    { label: 'Label', name: 'IntegerField', ...props },
    sfId,
    dataGuideId,
  );
}
