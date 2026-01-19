import styled from '@emotion/styled';
import { mq, shouldForwardProp } from '@hrworks/design-system';

import { SqwLayoutStyles } from '../';
import { Sidebar } from '../Sidebar';

const DesktopSidebar = styled(Sidebar)({
  top: SqwLayoutStyles.componentConfig.header.height,
  [mq.isSmallDevice]: {
    display: 'none',
  },
});

const MobileSidebar = styled(Sidebar, {
  shouldForwardProp,
})<{
  isExpanded?: boolean;
}>(({ theme, isExpanded }) => {
  const sidebarAnimationParam = `left cubic-bezier(.34,.92,.48,.96) ${theme.marko.variables.animationDuration.long}`;

  return {
    left: -SqwLayoutStyles.componentConfig.sidebar.width,
    transition: `visibility ${theme.marko.variables.animationDuration.long}, ${sidebarAnimationParam}`,
    display: 'none',

    [mq.isSmallDevice]: {
      display: 'block',
      visibility: 'hidden',

      ...(isExpanded && {
        left: 0,
        visibility: 'visible',
        transition: `visibility 0s, ${sidebarAnimationParam}`,
      }),
    },
  };
});

export const S = {
  DesktopSidebar,
  MobileSidebar,
};
