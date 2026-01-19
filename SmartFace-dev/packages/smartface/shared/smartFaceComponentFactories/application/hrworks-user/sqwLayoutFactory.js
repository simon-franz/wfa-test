// @ts-check

import { smartFaceComponentFactory } from '../../smartFaceComponentFactory.js';

/**
 * @template { import('../../../../src/adapters/application/hrworks-user/SqwLayoutAdapter/SqwLayoutAdapter.types').SqwLayoutBackendDefinition } SqwLayoutBackendDefinition
 * @param { SqwLayoutBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param { string } [dataGuideId]
 * @returns { SqwLayoutBackendDefinition }
 */
export function sqwLayoutFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory('SqwLayout', { ...props }, sfId, dataGuideId);
}
