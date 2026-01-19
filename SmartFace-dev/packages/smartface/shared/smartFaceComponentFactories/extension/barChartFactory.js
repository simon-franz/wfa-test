// @ts-check

import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @template { import('../../../src/adapters/extension/BarChartAdapter/BarChartAdapter.types.js').BarChartBackendDefinition } BarChartBackendDefinition
 * @param { BarChartBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param { string } [dataGuideId]
 * @returns { BarChartBackendDefinition }
 */
export function barChartFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory('BarChart', { ...props }, sfId, dataGuideId);
}
