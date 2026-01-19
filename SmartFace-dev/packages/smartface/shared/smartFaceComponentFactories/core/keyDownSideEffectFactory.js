// @ts-check

import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @template { import('../../../src/types/core/KeyDownSideEffectType').KeyDownSideEffectBackendType } KeyDownSideEffectBackendType
 * @param { KeyDownSideEffectBackendType['props'] } props
 * @param { string } [sfId]
 * @returns { KeyDownSideEffectBackendType }
 */
export function keyDownSideEffectFactory(props = {}, sfId) {
  return smartFaceComponentFactory('KeyDown', { ...props }, sfId);
}
