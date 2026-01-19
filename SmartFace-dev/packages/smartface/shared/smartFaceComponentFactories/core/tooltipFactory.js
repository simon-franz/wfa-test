// @ts-check

import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @template { import('../../../src/adapters/core/TooltipAdapter/TooltipAdapter.types.js').TooltipBackendDefinition } TooltipBackendDefinition
 * @param { TooltipBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param {string} [dataGuideId]
 * @returns { TooltipBackendDefinition }
 */
export function tooltipFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory('Tooltip', { ...props }, sfId, dataGuideId);
}
