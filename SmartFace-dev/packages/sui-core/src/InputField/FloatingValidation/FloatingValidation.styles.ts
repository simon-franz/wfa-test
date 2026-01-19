import styled from '@emotion/styled';
import { overflowBreakWord } from '@hrworks/design-system';
import { motion } from 'motion/react';

const FloatingValidation = styled(motion.div)(({ theme }) => ({
  overflow: 'hidden',
  borderRadius: theme.marko.variables.borderRadius.small,
}));

const ValidationMessage = styled.div(({ theme }) => [
  overflowBreakWord,
  {
    ...theme.sqwTier2Typography.bodySm,
    color: theme.sqwTier2Color.text.error.onSubtle,
    backgroundColor: theme.sqwTier2Color.background.error.subtle,
    padding: 6,
  },
]);

export const S = {
  FloatingValidation,
  ValidationMessage,
} as const;
