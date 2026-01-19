import styled from '@emotion/styled';
import { IconButton } from '@hrworks/sui-core/IconButton/IconButton';

const NavigationButton = styled(IconButton)<{
  direction: 'prev' | 'next';
}>(({ direction, disabled, theme }) => ({
  transform: `translateY(-50%) rotate(${direction === 'prev' ? '90deg' : '-90deg'})`,
  '&&': {
    position: 'absolute',
  },
  zIndex: 10,
  top: '50%',
  visibility: disabled ? 'hidden' : 'visible',
  color: theme.sqwTier2Color.icon.brand.default,
  ...(direction === 'prev'
    ? {
        left: '1.75rem',
      }
    : {
        right: '1.75rem',
      }),
}));

export const S = {
  NavigationButton,
} as const;
