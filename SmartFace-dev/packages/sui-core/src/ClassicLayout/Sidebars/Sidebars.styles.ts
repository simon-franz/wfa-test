import styled from '@emotion/styled';
import { mq, shouldForwardProp } from '@hrworks/design-system';

import { S as ClassicLayoutStyles } from '../ClassicLayout.styles';
import { Sidebar } from './Sidebar/Sidebar';

const MobileSidebar = styled(Sidebar, {
  shouldForwardProp,
})<{
  $isExpanded?: boolean;
}>(({ theme, $isExpanded }) => {
  const sidebarAnimationParam = `left ${theme.marko.variables.animationDuration.long}`;

  return {
    zIndex: theme.marko.variables.zIndex.sidebar,
    left: -ClassicLayoutStyles.componentConfig.sidebarWidth,
    transition: `visibility ${theme.marko.variables.animationDuration.long}, ${sidebarAnimationParam}`,
    display: 'none',

    [mq.isSmallDevice]: {
      display: 'block',
      visibility: 'hidden',

      ...($isExpanded && {
        left: 0,
        visibility: 'visible',
        transition: `visibility 0s, ${sidebarAnimationParam}`,
      }),
    },
  };
});

const DesktopSidebar = styled(MobileSidebar, {
  shouldForwardProp,
})<{
  $isExpanded?: boolean;
}>(({ theme, $isExpanded }) => ({
  top: ClassicLayoutStyles.componentConfig.header.height,
  zIndex: theme.marko.variables.zIndex.header + 1,
  display: 'block',
  visibility: 'hidden',
  borderRight: `1px solid ${theme.sqwTier2Color.border.nav.subtle}`,

  ...($isExpanded && {
    visibility: 'visible',
    left: 0,
  }),

  [mq.isSmallDevice]: {
    display: 'none',
  },
}));

export const S = {
  DesktopSidebar,
  MobileSidebar,
};
