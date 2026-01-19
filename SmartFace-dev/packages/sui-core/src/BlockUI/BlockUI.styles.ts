import styled from '@emotion/styled';
import { motion } from 'motion/react';

import { S as LoadingAnimationStyles } from '../LoadingAnimation/LoadingAnimation.styles';

const MotionDiv = styled(motion.div)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: theme.marko.variables.zIndex.blockUi,
  position: 'fixed',
  inset: 0,
  backgroundColor: theme.sqwTier2Color.surface.elevation.blanket,
}));

const StyledSpinner = styled(LoadingAnimationStyles.Spinner)({
  ':focus-visible': {
    outline: 0,
  },
});

export const S = {
  MotionDiv,
  StyledSpinner,
} as const;
