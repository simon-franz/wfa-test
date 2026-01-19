import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import _LoadingAnimation from '../LoadingAnimation';
import type { LoadingOverlayProps } from './LoadingOverlay.types';

const componentConfig = {
  blurIntensity: {
    high: 4,
    medium: 3,
    low: 2,
    off: 0,
  },
  fadingSize: '100%',
  fadeAnimationStartEnd: {
    mediumHigh: 0.5,
    low: 0.4,
    off: 0,
  },
};

const genFadeAnimation = (fadeIntensity: Required<LoadingOverlayProps>['fadeIntensity']) => {
  switch (fadeIntensity) {
    case 'high':
      return keyframes({
        '0%': {
          opacity: componentConfig.fadeAnimationStartEnd.mediumHigh,
        },
        '50%': {
          opacity: 0.85,
        },
        '100%': {
          opacity: componentConfig.fadeAnimationStartEnd.mediumHigh,
        },
      });
    case 'medium':
      return keyframes({
        '0%': {
          opacity: componentConfig.fadeAnimationStartEnd.mediumHigh,
        },
        '50%': {
          opacity: 0.7,
        },
        '100%': {
          opacity: componentConfig.fadeAnimationStartEnd.mediumHigh,
        },
      });
    case 'low':
      return keyframes({
        '0%': {
          opacity: componentConfig.fadeAnimationStartEnd.low,
        },
        '50%': {
          opacity: 0.5,
        },
        '100%': {
          opacity: componentConfig.fadeAnimationStartEnd.low,
        },
      });
  }

  // fadeIntensity-off
  return keyframes({
    '0%': {
      opacity: componentConfig.fadeAnimationStartEnd.off,
    },
    '100%': {
      opacity: componentConfig.fadeAnimationStartEnd.off,
    },
  });
};

const Container = styled.div({
  position: 'relative',
  minHeight: 100,
});
const LoadingAnimation = styled(_LoadingAnimation)({
  position: 'absolute',
  zIndex: 1,
  top: '50%',
  transform: 'translate(-50%, -50%)',
  left: '50%',
});

const ChildrenContainer = styled.div<Pick<Required<LoadingOverlayProps>, 'blurIntensity'>>(({ blurIntensity }) => ({
  userSelect: 'none',
  pointerEvents: 'none',
  filter: `blur(${componentConfig.blurIntensity[blurIntensity]}px)`,
}));

const FadingColor = styled.div<Pick<Required<LoadingOverlayProps>, 'fadeIntensity'>>(({ theme, fadeIntensity }) => ({
  position: 'absolute',
  backgroundColor: theme.sqwTier2Color.surface.sunken,
  height: componentConfig.fadingSize,
  width: componentConfig.fadingSize,
  zIndex: 1,
  animation: `${genFadeAnimation(fadeIntensity)} 2s ease-out 0s infinite normal none`,
}));

export const S = {
  Container,
  LoadingAnimation,
  ChildrenContainer,
  FadingColor,
} as const;
