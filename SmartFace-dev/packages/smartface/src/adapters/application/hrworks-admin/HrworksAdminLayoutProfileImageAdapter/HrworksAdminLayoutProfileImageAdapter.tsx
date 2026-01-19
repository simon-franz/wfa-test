import { HrworksAdminLayoutProfileImage } from '@hrworks/sui-extension/HrworksAdminLayoutProfileImage';
import { observer } from 'mobx-react';

import type { HrworksAdminLayoutProfileImageAdapterProps } from './HrworksAdminLayoutProfileImageAdapter.types';

export const HrworksAdminLayoutProfileImageAdapter = observer(
  ({ src = '', ...otherProps }: HrworksAdminLayoutProfileImageAdapterProps) => (
    <HrworksAdminLayoutProfileImage src={src} {...otherProps} />
  ),
);
