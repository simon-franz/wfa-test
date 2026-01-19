// @ts-check

import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @template { import('../../../src/adapters/extension/ProfileMenuAdapter/ProfileMenuAdapter.types').ProfileMenuBackendDefinition } ProfileMenuBackendDefinition
 * @param { ProfileMenuBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param {string} [dataGuideId]
 * @returns { ProfileMenuBackendDefinition }
 */
export function profileMenuFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory('ProfileMenu', { ...props }, sfId, dataGuideId);
}
