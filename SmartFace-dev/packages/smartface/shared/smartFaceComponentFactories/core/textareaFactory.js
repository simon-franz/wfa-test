// @ts-check

import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @template { import('../../../src/adapters/core/TextareaAdapter/TextareaAdapter.types').TextareaBackendDefinition } TextareaBackendDefinition
 * @param { TextareaBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param {string} [dataGuideId]
 * @returns { TextareaBackendDefinition }
 */
export function textareaFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory('Textarea', { label: 'Label', ...props }, sfId, dataGuideId);
}
