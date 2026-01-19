// @ts-check

import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @template { import('../../../src/adapters/extension/SliderAdapter/SliderAdapter.types').SliderBackendDefinition } SliderBackendDefinition
 * @param { SliderBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param {string} [dataGuideId]
 * @returns { SliderBackendDefinition }
 */
export function sliderFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory('Slider', { ...props }, sfId, dataGuideId);
}
