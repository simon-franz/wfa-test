// @ts-check

import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';
import { fontAwesomeIconFactory } from './fontAwesomeIconFactory.js';

/**
 * @template { import('../../../src/adapters/core/IconButtonAdapter/IconButtonAdapter.types').IconButtonBackendDefinition } IconButtonBackendDefinition
 * @param { IconButtonBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param {string} [dataGuideId]
 * @returns { IconButtonBackendDefinition }
 */
export function iconButtonFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory('IconButton', { icon: fontAwesomeIconFactory(), ...props }, sfId, dataGuideId);
}
