import styled from '@emotion/styled';
import { mq, shouldForwardProp } from '@hrworks/design-system';

import { S as ClassicLayoutStyles } from '../ClassicLayout.styles';
import type { ClassicLayoutProps } from '../ClassicLayout.types';
import { Branding as _Branding } from './Branding/Branding';
import _SidebarToggle from './Branding/SidebarToggle';

const Header = styled.header(({ theme }) => ({
  height: 70,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: theme.sqwTier2Color.surface.raised,
  zIndex: theme.marko.variables.zIndex.header,
  transition: `background-color ${theme.marko.variables.animationDuration.long}`,
  borderBottom: `1px solid ${theme.sqwTier2Color.border.subtle}`,
}));

const Branding = styled(_Branding)({
  [mq.isSmallDevice]: {
    width: 'auto',
  },
});

const SidebarToggle = styled(_SidebarToggle, {
  shouldForwardProp,
})<{
  $desktopSidebarTogglerMode: ClassicLayoutProps['desktopSidebarTogglerMode'];
}>(({ $desktopSidebarTogglerMode }) => ({
  ...($desktopSidebarTogglerMode === 'none' && {
    display: 'none',
  }),

  [mq.isSmallDevice]: {
    display: 'inline-flex',
  },
}));

const HeaderContent = styled.div(({ theme }) => ({
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  width: `calc(100% - ${ClassicLayoutStyles.componentConfig.sidebar.width}px)`,
  padding: `${theme.marko.variables.spacing.distance.medium}px ${ClassicLayoutStyles.componentConfig.layoutPadding}px`,
  gap: theme.marko.variables.spacing.distance.small,

  [mq.isSmallDevice]: {
    flexGrow: 1,
  },
}));

const FlexChildren = styled.div({
  flexGrow: 1,
});

const RightItems = styled.div(({ theme }) => ({
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: theme.marko.variables.spacing.distance.large,
}));

export const S = {
  Header,
  Branding,
  SidebarToggle,
  HeaderContent,
  FlexChildren,
  RightItems,
} as const;
