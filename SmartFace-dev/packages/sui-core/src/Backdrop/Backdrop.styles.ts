import styled from '@emotion/styled';
import { withOpacity } from '@hrworks/design-system';
import { motion } from 'motion/react';

const Backdrop = styled(motion.div)(({ theme }) => ({
  position: 'fixed',
  inset: 0,
  backgroundColor: withOpacity(theme.marko.colors.palette.neutral[10], '50%'),
  zIndex: theme.marko.variables.zIndex.modal,
}));

export const S = {
  Backdrop,
} as const;
