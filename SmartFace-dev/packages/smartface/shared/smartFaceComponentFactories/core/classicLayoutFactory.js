// @ts-check

import { logo } from '../shared/logo.js';
import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @template { import('../../../src/adapters/core/ClassicLayoutAdapter/ClassicLayoutAdapter.types.ts').ClassicLayoutBackendDefinition } ClassicLayoutBackendDefinition
 * @param { ClassicLayoutBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param {string} [dataGuideId]
 * @returns { ClassicLayoutBackendDefinition }
 */
export function classicLayoutFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory('ClassicLayout', { logo, ...props }, sfId, dataGuideId);
}
