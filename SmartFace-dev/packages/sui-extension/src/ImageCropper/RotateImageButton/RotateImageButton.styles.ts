import styled from '@emotion/styled';
import { IconButton } from '@hrworks/sui-core/IconButton/IconButton';

const IconButtonWrapper = styled(IconButton)<{
  direction: 'left' | 'right';
}>(({ direction }) => ({
  position: 'absolute',
  [direction]: '-20%',
  top: '50%',
  transform: 'translateY(-50%)',
}));

export const S = {
  IconButtonWrapper,
} as const;
