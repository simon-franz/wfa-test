// @ts-check

import getId from '../../../getId.js';
import { smartFaceComponentFactory } from '../../smartFaceComponentFactory.js';

/**
 * @template { import('../../../../src/adapters/application/hrworks-admin/HrworksAdminLayoutAdapter/HrworksAdminLayoutAdapter.types').HrworksAdminLayoutBackendDefinition } HrworksAdminLayoutBackendDefinition
 * @param { HrworksAdminLayoutBackendDefinition['props']} props
 * @param { string } [sfId]
 * @param { string } [dataGuideId]
 * @returns { HrworksAdminLayoutBackendDefinition}
 */
export function hrworksAdminLayoutFactory(props = {}, sfId = getId(), dataGuideId) {
  return smartFaceComponentFactory(
    'HrworksAdminLayout',
    {
      ...props,
    },
    sfId,
    dataGuideId,
  );
}
