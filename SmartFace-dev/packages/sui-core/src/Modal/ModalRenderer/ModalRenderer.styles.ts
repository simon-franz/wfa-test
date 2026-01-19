import type { Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { generateShadowStyles, shouldForwardProp } from '@hrworks/design-system';
import extractNumbersFromString from '@hrworks/sui-shared/functions/extractNumbersFromString';
import type { Size } from '@hrworks/types/shared/UiTypes';
import { motion } from 'motion/react';

import { entryAnimationCollection, exitAnimationCollection } from '../Animations';
import type { ModalAnimationDirections } from '../Modal.types';

const componentConfig = {
  sizes: {
    extraSmall: 300,
    small: 650,
    medium: 1000,
    large: 1350,
    extraLarge: 1700,
    auto: 'max-content',
  },
  viewportPadding: 25,
  contentPadding: 24,
};

const generateAnimationStyles = (
  theme: Theme,
  entryAnimation: ModalAnimationDirections,
  exitAnimation: ModalAnimationDirections,
) => ({
  initial: {
    ...entryAnimationCollection[entryAnimation],
  },
  animate: {
    top: '50%',
    left: '50%',
    translateX: '-50%',
    translateY: '-50%',
    scale: 1,
    opacity: 1,
  },
  exit: {
    ...exitAnimationCollection[exitAnimation],
  },
  transition: {
    duration: Number(extractNumbersFromString(theme.marko.variables.animationDuration.long)),
  },
});

type ModalProps = {
  $size: Size | 'auto';
  $fullHeight?: boolean;
  $fullWidth?: boolean;
  $fullScreen?: boolean;
};

const Modal = styled(motion.div, {
  shouldForwardProp,
})<ModalProps>(({ theme, $size, $fullHeight, $fullWidth, $fullScreen }) => [
  !$fullScreen &&
    generateShadowStyles({
      theme,
      variant: 'default',
    }),
  {
    position: 'fixed',
    zIndex: theme.marko.variables.zIndex.modal,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.sqwTier2Color.surface.raised,
    backgroundClip: 'padding-box',
    pointerEvents: 'auto',
    outline: 'none',
    ...($fullScreen
      ? {
          width: '100%',
          height: '100%',
        }
      : {
          borderRadius: theme.marko.variables.borderRadius.small,
          border: `1px solid ${theme.sqwTier2Color.border.bold}`,
          maxWidth: `calc(100svw - ${componentConfig.viewportPadding}px)`,
          maxHeight: `calc(100svh - ${componentConfig.viewportPadding}px)`,
          marginBottom: 'env(safe-area-inset-bottom)',
          width: $fullWidth ? '100%' : componentConfig.sizes[$size],
          ...($fullHeight && {
            height: '100%',
          }),
        }),
  },
]);

const ScrollerContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
  outline: 'none',
  overflowY: 'hidden',
});

export const S = {
  componentConfig,
  generateAnimationStyles,
  Modal,
  ScrollerContainer,
} as const;
