import styled from '@emotion/styled';
import { withOpacity } from '@hrworks/design-system';
import { mq } from '@hrworks/design-system/mediaQueries';

const Backdrop = styled.div<{
  isVisible: boolean;
}>(({ theme, isVisible }) => ({
  position: 'fixed',
  backgroundColor: 'transparent',
  inset: 0,
  zIndex: theme.marko.variables.zIndex.header + 1,
  pointerEvents: 'none',

  [mq.conditionalTransition]: {
    transition: `background-color ${theme.marko.variables.animationDuration.long}`,
  },

  [mq.isSmallDevice]: {
    ...(isVisible && {
      backgroundColor: withOpacity(theme.marko.colors.palette.neutral[10], '50%'),
      pointerEvents: 'all',
    }),
  },
}));

export const S = {
  Backdrop,
};
