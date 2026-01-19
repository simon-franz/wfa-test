// @ts-check

import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @template { import('../../../src/adapters/core/AlertAdapter/AlertAdapter.types').AlertBackendDefinition } AlertBackendDefinition
 * @param { AlertBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param {string} [dataGuideId]
 * @returns { AlertBackendDefinition }
 */
export function alertFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory('Alert', { ...props }, sfId, dataGuideId);
}
