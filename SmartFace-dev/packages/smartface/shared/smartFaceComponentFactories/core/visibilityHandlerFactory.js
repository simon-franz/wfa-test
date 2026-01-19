// @ts-check

import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @template { import('../../../src/adapters/core/VisibilityHandlerAdapter/VisibilityHandlerAdapter.types').VisibilityHandlerBackendDefinition } VisibilityHandlerBackendDefinition
 * @param { VisibilityHandlerBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param {string} [dataGuideId]
 * @returns { VisibilityHandlerBackendDefinition }
 */
export function visibilityHandlerFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory('VisibilityHandler', { ...props }, sfId, dataGuideId);
}
