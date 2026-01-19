// @ts-check

import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @template { import('../../../src/types/core/BackendRequestSideEffectType').BackendRequestSideEffectBackendType } BackendRequestSideEffectType
 * @param { BackendRequestSideEffectType['props'] } props
 * @param { string } [sfId]
 * @returns { BackendRequestSideEffectType }
 */
export function backendRequestSideEffectFactory(props = {}, sfId) {
  return smartFaceComponentFactory('BackendRequest', { ...props }, sfId);
}
