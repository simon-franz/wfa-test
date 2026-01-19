import styled from '@emotion/styled';
import { mq } from '@hrworks/design-system';

import { Logo as _Logo, LogoStyles } from '../../../Logo';
import { S as ClassicLayoutStyles } from '../../ClassicLayout.styles';

type ContainerProps = {
  hasSidebar: boolean;
  isDesktopSidebarExpanded: boolean;
};

const Container = styled.div<ContainerProps>(({ theme, hasSidebar, isDesktopSidebarExpanded }) => ({
  display: 'flex',
  height: ClassicLayoutStyles.componentConfig.header.height,
  padding: `${theme.marko.variables.spacing.distance.medium}px ${ClassicLayoutStyles.componentConfig.layoutPadding}px`,
  alignItems: 'center',
  width: ClassicLayoutStyles.componentConfig.sidebar.width,
  gap: theme.marko.variables.spacing.distance.medium,
  position: 'relative',

  [mq.isLargeDevice]: {
    '::before': {
      content: '""',
      position: 'absolute',
      left: hasSidebar && isDesktopSidebarExpanded ? 0 : -ClassicLayoutStyles.componentConfig.sidebarWidth,
      width: ClassicLayoutStyles.componentConfig.sidebarWidth,
      height: '100%',
      backgroundColor: theme.sqwTier2Color.background.nav.default,
      zIndex: -1,
      transition: `left ${theme.marko.variables.animationDuration.long}`,

      ...(isDesktopSidebarExpanded && {
        borderRight: `1px solid ${theme.sqwTier2Color.border.nav.subtle}`,
      }),
    },
  },
}));

const Logo = styled(_Logo)({
  flexGrow: 1,
  [`${LogoStyles.Logo}`]: {
    maxWidth: ClassicLayoutStyles.componentConfig.header.logoWidth,
  },
});

export const S = {
  Container,
  Logo,
};
