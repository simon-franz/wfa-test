// @ts-check

import { smartFaceComponentFactory } from '../../smartFaceComponentFactory.js';

/**
 * @template { import('../../../../src/adapters/application/hrworks-user/SqwClockInButtonAdapter/SqwClockInButtonAdapter.types').SqwClockInButtonBackendDefinition } SqwClockInButtonBackendDefinition
 * @param { SqwClockInButtonBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param { string } [dataGuideId]
 * @returns { SqwClockInButtonBackendDefinition }
 */
export function sqwClockInButtonFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory('SqwClockInButton', { ...props }, sfId, dataGuideId);
}
