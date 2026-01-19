// @ts-check

import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @template { import('../../../src/adapters/extension/PieChartAdapter/PieChartAdapter.types.js').PieChartBackendDefinition } PieChartBackendDefinition
 * @param { PieChartBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param { string } [dataGuideId]
 * @returns { PieChartBackendDefinition }
 */
export function pieChartFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory('PieChart', { ...props }, sfId, dataGuideId);
}
