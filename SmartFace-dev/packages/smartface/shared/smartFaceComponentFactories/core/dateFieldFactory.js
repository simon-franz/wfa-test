// @ts-check

import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @template { import('../../../src/adapters/core/DateFieldAdapter/DateFieldAdapter.types').DateFieldBackendDefinition } DateFieldBackendDefinition
 * @param { DateFieldBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param {string} [dataGuideId]
 * @returns { DateFieldBackendDefinition }
 */
export function dateFieldFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory('DateField', { ...props }, sfId, dataGuideId);
}
