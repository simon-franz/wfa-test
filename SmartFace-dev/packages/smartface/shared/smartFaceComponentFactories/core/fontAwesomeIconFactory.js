// @ts-check

import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @template { import('../../../src/adapters/core/FontAwesomeIconAdapter/FontAwesomeIconAdapter.types').FontAwesomeIconBackendDefinition } FontAwesomeIconBackendDefinition
 * @param { FontAwesomeIconBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param {string} [dataGuideId]
 * @returns { FontAwesomeIconBackendDefinition }
 */
export function fontAwesomeIconFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory('FontAwesomeIcon', { name: 'bug', ...props }, sfId, dataGuideId);
}
