// @ts-check

import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @template { import('../../../src/adapters/core/SizeHandlerAdapter/SizeHandlerAdapter.types').SizeHandlerBackendDefinition } SizeHandlerBackendDefinition
 * @param { SizeHandlerBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param { string } [dataGuideId]
 * @returns { SizeHandlerBackendDefinition }
 */
export function sizeHandlerFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory('SizeHandler', { ...props }, sfId, dataGuideId);
}
