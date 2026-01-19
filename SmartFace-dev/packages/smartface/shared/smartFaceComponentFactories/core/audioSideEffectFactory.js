// @ts-check

import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @template { import('../../../src/types/core/AudioSideEffectType').AudioSideEffectBackendType } AudioSideEffectBackendType
 * @param { AudioSideEffectBackendType['props'] } props
 * @param { string } [sfId]
 * @returns { AudioSideEffectBackendType }
 */
export function audioSideEffectFactory(props = {}, sfId) {
  return smartFaceComponentFactory('Audio', { ...props }, sfId);
}
