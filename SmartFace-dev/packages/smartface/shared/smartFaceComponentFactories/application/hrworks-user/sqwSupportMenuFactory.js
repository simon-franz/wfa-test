// @ts-check

import { smartFaceComponentFactory } from '../../smartFaceComponentFactory.js';

/**
 * @template { import('../../../../src/adapters/application/hrworks-user/SqwSupportMenuAdapter/SqwSupportMenuAdapter.types').SqwSupportMenuBackendDefinition } SqwSupportMenuBackendDefinition
 * @param { SqwSupportMenuBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param { string } [dataGuideId]
 * @returns { SqwSupportMenuBackendDefinition }
 */
export function sqwSupportMenuFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory('SqwSupportMenu', { ...props }, sfId, dataGuideId);
}
