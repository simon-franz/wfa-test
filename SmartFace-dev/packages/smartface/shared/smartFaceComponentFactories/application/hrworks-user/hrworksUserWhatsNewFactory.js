// @ts-check

import getId from '../../../getId.js';
import { smartFaceComponentFactory } from '../../smartFaceComponentFactory.js';

/**
 * @template { import('../../../../src/adapters/application/hrworks-user/HrworksUserWhatsNewAdapter/HrworksUserWhatsNewAdapter.types').HrworksUserWhatsNewBackendDefinition } HrworksUserWhatsNewBackendDefinition
 * @param { HrworksUserWhatsNewBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param { string } [dataGuideId]
 * @returns { HrworksUserWhatsNewBackendDefinition }
 */
export function hrworksUserWhatsNewFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory('HrworksUserWhatsNew', { ...props }, sfId, dataGuideId);
}

/**
 * @param { import('../../../../src/adapters/application/hrworks-user/HrworksUserWhatsNewAdapter/PreviousNewsItemAdapter/PreviousNewsItemAdapter.types').PreviousNewsItemBackendDefinition['props'] } props
 * @param { string } sfId
 * @param { string } [dataGuideId]
 * @returns { import('../../../../src/adapters/application/hrworks-user/HrworksUserWhatsNewAdapter/PreviousNewsItemAdapter/PreviousNewsItemAdapter.types').PreviousNewsItemBackendDefinition }
 */
export function previousNewsItemFactory(props = {}, sfId = getId(), dataGuideId) {
  return {
    sfId,
    props: {
      ...props,
    },
    dataGuideId,
  };
}
