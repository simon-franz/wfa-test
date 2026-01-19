import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import type { ShimmerAnimationProps } from './ShimmerAnimation.types';

const gradient = keyframes({
  '0%': {
    transform: 'translateX(-100%)',
  },
  '100%': {
    transform: 'translateX(25%)',
  },
});

const ShimmerAnimation = styled.div<Pick<ShimmerAnimationProps, 'height'>>(({ height = '1em', theme }) => ({
  borderRadius: theme.marko.variables.borderRadius.small,
  position: 'relative',
  height,
  backgroundColor: theme.marko.colors.palette.neutral[4],
  overflow: 'hidden',

  ':after': {
    position: 'absolute',
    content: '""',
    inset: 0,
    transform: 'translateX(-100%)',
    width: '400%',
    background: `linear-gradient(to right,
    ${theme.marko.colors.palette.neutral[4]},
    ${theme.marko.colors.palette.neutral[2]},
    ${theme.marko.colors.palette.neutral[4]})`,
    animation: `${gradient} linear 2s infinite `,
  },
}));

export const S = {
  ShimmerAnimation,
} as const;
