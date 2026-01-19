// @ts-check

import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @template { import('../../../src/adapters/core/IframeAdapter/IframeAdapter.types').IframeBackendDefinition } IframeBackendDefinition
 * @param { IframeBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param {string} [dataGuideId]
 * @returns { IframeBackendDefinition }
 */
export function iframeFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory('Iframe', { ...props }, sfId, dataGuideId);
}
