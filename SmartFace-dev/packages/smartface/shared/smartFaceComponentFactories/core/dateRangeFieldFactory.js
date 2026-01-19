// @ts-check

import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @template { import('../../../src/adapters/core/DateRangeFieldAdapter/DateRangeFieldAdapter.types').DateRangeFieldBackendDefinition } DateRangeFieldBackendDefinition
 * @param { DateRangeFieldBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param {string} [dataGuideId]
 * @returns { DateRangeFieldBackendDefinition }
 */
export function dateRangeFieldFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory('DateRangeField', { ...props }, sfId, dataGuideId);
}
