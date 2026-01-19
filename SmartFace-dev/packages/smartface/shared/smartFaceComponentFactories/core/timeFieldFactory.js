// @ts-check

import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @template { import('../../../src/adapters/core/TimeFieldAdapter/TimeFieldAdapter.types').TimeFieldBackendDefinition } TimeFieldBackendDefinition
 * @param { TimeFieldBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param {string} [dataGuideId]
 * @returns { TimeFieldBackendDefinition }
 */
export function timeFieldFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory('TimeField', { label: 'Label', ...props }, sfId, dataGuideId);
}
