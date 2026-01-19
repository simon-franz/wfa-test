// @ts-check

import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @template { import('../../../src/adapters/core/UiHandlerAdapter/UiHandlerAdapter.types').UiHandlerBackendDefinition } UiHandlerBackendDefinition
 * @param { UiHandlerBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @returns { UiHandlerBackendDefinition }
 */
export function uiHandlerFactory(props = {}, sfId) {
  return smartFaceComponentFactory('UiHandler', { ...props }, sfId);
}
