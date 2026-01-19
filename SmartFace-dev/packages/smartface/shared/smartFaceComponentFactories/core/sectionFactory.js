// @ts-check

import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @template { import('../../../src/adapters/core/SectionAdapter/SectionAdapter.types').SectionBackendDefinition } SectionBackendDefinition
 * @param { SectionBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param {string} [dataGuideId]
 * @returns { SectionBackendDefinition }
 */
export function sectionFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory('Section', { ...props }, sfId, dataGuideId);
}
