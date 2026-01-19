// @ts-check
import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';
/**
 * @template { import('../../../src/adapters/core/TextFieldAdapter/TextFieldAdapter.types').TextFieldBackendDefinition } TextFieldBackendDefinition
 * @param { TextFieldBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param {string} [dataGuideId]
 * @returns { TextFieldBackendDefinition }
 */
export function textFieldFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory('TextField', { ...props }, sfId, dataGuideId);
}
