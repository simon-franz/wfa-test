import { observer } from 'mobx-react';

import { S } from './HrworksAdminLayoutProfileImage.styles';
import type { HrworksAdminLayoutProfileImageProps } from './HrworksAdminLayoutProfileImage.types';

export const HrworksAdminLayoutProfileImage = observer(
  ({ src, alt, ...otherProps }: HrworksAdminLayoutProfileImageProps) => (
    <S.ImageContainer {...otherProps}>
      <S.Image src={src} alt={alt} />
    </S.ImageContainer>
  ),
);
