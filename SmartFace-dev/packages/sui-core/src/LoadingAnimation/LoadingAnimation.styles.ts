import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { getRandomInt } from '@hrworks/sui-shared/functions/getRandomInt';

import type { LoadingAnimationProps } from './LoadingAnimation.types';

const componentConfig = {
  size: 48,
  borderWidth: 3,
};

type WrapperProps = Pick<Required<LoadingAnimationProps>, 'type' | 'minWidth' | 'maxWidth'>;

const Wrapper = styled.div<WrapperProps>(({ type, minWidth, maxWidth }) => ({
  ...(type === 'shimmer' && {
    width: `${getRandomInt(minWidth, maxWidth)}%`,
  }),
}));

const rotateSpinner = keyframes({
  to: {
    transform: 'rotate(360deg)',
  },
});

const Spinner = styled.div(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  '::after': {
    animation: `${rotateSpinner} 1s linear infinite`,
    display: 'flex',
    content: '""',
    opacity: theme.marko.variables.opacity.high,
    borderTop: `${componentConfig.borderWidth}px solid ${theme.marko.colors.text}`,
    borderRight: `${componentConfig.borderWidth}px solid transparent`,
    borderRadius: '50%',
    borderTopWidth: componentConfig.borderWidth,
    borderRightWidth: componentConfig.borderWidth,
    width: componentConfig.size,
    height: componentConfig.size,
  },
}));

const ShimmerContainer = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.marko.variables.spacing.formGap.large,
}));

export const S = {
  Wrapper,
  Spinner,
  ShimmerContainer,
} as const;
