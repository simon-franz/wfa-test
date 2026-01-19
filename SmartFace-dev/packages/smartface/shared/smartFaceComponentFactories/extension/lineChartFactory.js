// @ts-check

import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @template { import('../../../src/adapters/extension/LineChartAdapter/LineChartAdapter.types.js').LineChartBackendDefinition } LineChartBackendDefinition
 * @param { LineChartBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param { string } [dataGuideId]
 * @returns { LineChartBackendDefinition }
 */
export function lineChartFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory('LineChart', { ...props }, sfId, dataGuideId);
}
