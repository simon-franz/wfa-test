// @ts-check

import { smartFaceComponentFactory } from '../../smartFaceComponentFactory.js';

/**
 * @template { import('../../../../src/adapters/application/hrworks-admin/HrworksAdminLayoutProfileImageAdapter/HrworksAdminLayoutProfileImageAdapter.types').HrworksAdminLayoutProfileImageBackendDefinition } HrworksAdminLayoutProfileImageBackendDefinition
 * @param { HrworksAdminLayoutProfileImageBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param { string } [dataGuideId]
 * @returns { HrworksAdminLayoutProfileImageBackendDefinition }
 */
export function hrworksAdminLayoutProfileImageFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory(
    'HrworksAdminLayoutProfileImage',
    { src: 'ui-assets/pictures/profile.jpg', alt: 'profile image', ...props },
    sfId,
    dataGuideId,
  );
}
