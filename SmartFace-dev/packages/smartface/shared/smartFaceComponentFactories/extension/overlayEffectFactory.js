// @ts-check

import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @template { import('../../../src/adapters/extension/OverlayEffectAdapter/OverlayEffectAdapter.types').OverlayEffectBackendDefinition } OverlayEffectBackendDefinition
 * @param { OverlayEffectBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @returns { OverlayEffectBackendDefinition }
 */
export function overlayEffectFactory(props = {}, sfId) {
  return smartFaceComponentFactory('OverlayEffect', { ...props }, sfId);
}
