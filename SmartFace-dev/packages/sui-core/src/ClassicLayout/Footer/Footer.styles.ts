import styled from '@emotion/styled';
import { mq } from '@hrworks/design-system/mediaQueries';

import { S as ClassicLayoutStyles } from '../ClassicLayout.styles';

const Footer = styled.footer<{
  $isDesktopSidebarVisible: boolean;
}>(({ theme, $isDesktopSidebarVisible }) => ({
  backgroundColor: theme.sqwTier2Color.surface.raised,
  padding: '13px 20px',
  height: 'auto',
  minHeight: 'auto',
  borderTop: `1px solid ${theme.sqwTier2Color.border.subtle}`,

  [mq.conditionalTransition]: {
    transitionProperty: 'margin-left',
    transitionDuration: theme.marko.variables.animationDuration.long,
  },

  ...($isDesktopSidebarVisible && {
    marginLeft: ClassicLayoutStyles.componentConfig.sidebar.width,
  }),

  [mq.isSmallDevice]: {
    marginLeft: 0,
  },
}));

export const S = {
  Footer,
} as const;
