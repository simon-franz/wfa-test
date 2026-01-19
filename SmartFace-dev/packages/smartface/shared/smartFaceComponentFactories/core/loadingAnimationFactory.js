// @ts-check

import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @template { import('../../../src/adapters/core/LoadingAnimationAdapter/LoadingAnimationAdapter.types').LoadingAnimationBackendDefinition } LoadingAnimationBackendDefinition
 * @param { LoadingAnimationBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param {string} [dataGuideId]
 * @returns { LoadingAnimationBackendDefinition }
 */
export function loadingAnimationFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory('LoadingAnimation', { ...props }, sfId, dataGuideId);
}
