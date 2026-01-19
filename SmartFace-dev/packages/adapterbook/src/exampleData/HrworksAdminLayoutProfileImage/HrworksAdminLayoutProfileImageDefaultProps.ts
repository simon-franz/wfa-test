import { generateLoremWords } from '@hrworks/sui-shared/functions/stringGenerator';

import { preset } from '../../utils/preset';
import type { HrworksAdminLayoutProfileImageBackendProps } from '@hrworks/smartface/adapters/application/hrworks-admin/HrworksAdminLayoutProfileImageAdapter/HrworksAdminLayoutProfileImageAdapter.types';

export const hrworksAdminLayoutProfileImageDefaultProps: HrworksAdminLayoutProfileImageBackendProps = {
  src: preset.getImageUrl(),
  alt: generateLoremWords(),
};
