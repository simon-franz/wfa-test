import FontAwesomeIcon from '@hrworks/sui-core/FontAwesomeIcon';

import { S } from './RotateImageButton.styles';
import type { RotateImageButtonProps } from './RotateImageButton.types';

export const RotateImageButton = ({ direction, onClick, ...otherProps }: RotateImageButtonProps) => {
  return (
    <S.IconButtonWrapper direction={direction} onClick={onClick} variant="subtle" corner="pill" {...otherProps}>
      <FontAwesomeIcon name={`rotate-${direction}`} variant="solid" />
    </S.IconButtonWrapper>
  );
};
