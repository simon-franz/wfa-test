// @ts-check

import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @template { import('../../../src/types/core/ContainerType').ContainerBackendType } ContainerBackendType
 * @param { ContainerBackendType['props'] } props
 * @param { string } [sfId]
 * @returns { ContainerBackendType }
 */
export function containerFactory(props = {}, sfId) {
  return smartFaceComponentFactory('Container', { ...props }, sfId);
}
