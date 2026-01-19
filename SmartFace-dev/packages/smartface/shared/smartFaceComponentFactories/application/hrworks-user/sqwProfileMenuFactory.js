// @ts-check

import { smartFaceComponentFactory } from '../../smartFaceComponentFactory.js';

/**
 * @template { import('../../../../src/adapters/application/hrworks-user/SqwProfileMenuAdapter/SqwProfileMenuAdapter.types.js').SqwProfileMenuBackendDefinition } SqwProfileMenuBackendDefinition
 * @param { SqwProfileMenuBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param { string } [dataGuideId]
 * @returns { SqwProfileMenuBackendDefinition }
 */
export function sqwProfileMenuFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory('SqwProfileMenu', { ...props }, sfId, dataGuideId);
}
