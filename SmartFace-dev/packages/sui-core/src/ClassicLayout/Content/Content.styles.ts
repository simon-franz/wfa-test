import styled from '@emotion/styled';
import { mq, shouldForwardProp } from '@hrworks/design-system';

import { Scroller } from '../../Scroller';
import { S as ClassicLayoutStyles } from '../ClassicLayout.styles';

const ContentContainer = styled(Scroller, {
  shouldForwardProp,
})<{
  $isDesktopSidebarVisible: boolean;
}>(({ theme, $isDesktopSidebarVisible }) => ({
  flex: '1 auto',
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '100%',
  backgroundColor: theme.sqwTier2Color.surface.sunken,

  ...($isDesktopSidebarVisible && {
    marginLeft: ClassicLayoutStyles.componentConfig.sidebar.width,
  }),
  [mq.isSmallDevice]: {
    marginLeft: 0,
  },

  [mq.conditionalTransition]: {
    transition: `margin-left ${theme.marko.variables.animationDuration.long}`,
  },
}));

const SubHeader = styled.div({
  padding: ClassicLayoutStyles.componentConfig.layoutPadding,
  paddingBottom: 0,
});

const ContentChildren = styled.div({
  padding: ClassicLayoutStyles.componentConfig.layoutPadding,
  flex: 1,
});

export const S = {
  ContentContainer,
  SubHeader,
  ContentChildren,
} as const;
