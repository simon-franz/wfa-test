import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import _Fireworks from '@fireworks-js/react';
import { withOpacity } from '@hrworks/design-system';
import { shouldForwardProp } from '@hrworks/design-system/emotionUtils';

type FireworksProps = {
  $fireworksFinished: boolean;
  $zIndex: number;
};

const Fireworks = styled(_Fireworks, {
  shouldForwardProp,
})<FireworksProps>(({ theme, $fireworksFinished, $zIndex }) => {
  const backgroundColor = withOpacity(theme.marko.colors.palette.neutral[10], '25%');

  const fadeIn = keyframes({
    '0%': {
      backgroundColor: 'transparent',
    },
    '100%': {
      backgroundColor,
    },
  });

  const fadeOut = keyframes({
    '0%': {
      backgroundColor,
    },
    '100%': {
      backgroundColor: 'transparent',
    },
  });

  return {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    position: 'fixed',
    transition: 'background-color 0.5s',
    pointerEvents: 'none',
    animation: `${$fireworksFinished ? fadeOut : fadeIn} 0.5s ease`,
    animationFillMode: 'forwards',
    zIndex: $zIndex,
  };
});

export const S = {
  Fireworks,
} as const;
