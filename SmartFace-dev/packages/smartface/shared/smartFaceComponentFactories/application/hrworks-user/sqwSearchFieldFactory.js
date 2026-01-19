// @ts-check

import { smartFaceComponentFactory } from '../../smartFaceComponentFactory.js';

/**
 * @template { import('../../../../src/adapters/application/hrworks-user/SqwSearchFieldAdapter/SqwSearchFieldAdapter.types').SqwSearchFieldBackendDefinition } SqwSearchFieldBackendDefinition
 * @param { SqwSearchFieldBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param { string } [dataGuideId]
 * @returns { SqwSearchFieldBackendDefinition }
 */
export function sqwSearchFieldFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory('SqwSearchField', { ...props }, sfId, dataGuideId);
}
