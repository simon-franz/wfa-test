// @ts-check

import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @template { import('../../../src/adapters/core/LoadingOverlayAdapter/LoadingOverlayAdapter.types').LoadingOverlayBackendDefinition } LoadingOverlayBackendDefinition
 * @param { LoadingOverlayBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param {string} [dataGuideId]
 * @returns { LoadingOverlayBackendDefinition }
 */
export function loadingOverlayFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory('LoadingOverlay', { ...props }, sfId, dataGuideId);
}
