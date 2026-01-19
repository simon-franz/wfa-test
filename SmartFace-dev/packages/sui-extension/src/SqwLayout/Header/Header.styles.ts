import styled from '@emotion/styled';
import { mq } from '@hrworks/design-system/mediaQueries';

import { SqwLayoutStyles } from '../';

const Header = styled.div(({ theme }) => ({
  position: 'fixed',
  display: 'flex',
  height: SqwLayoutStyles.componentConfig.header.height,
  width: '100%',
  zIndex: theme.marko.variables.zIndex.header,
  backgroundColor: theme.marko.colors.palette.neutral[1],
  borderBottom: '2px solid #eff2ff',

  [mq.isSmallDevice]: {
    borderBottom: 'none',
    boxShadow: theme.marko.hrworksUser.presets.boxShadow.default,
    backgroundColor: theme.marko.hrworksUser.colors.brand,
  },
}));

const HeaderContent = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: `calc(100% - ${SqwLayoutStyles.componentConfig.sidebar.width}px)`,
  padding: `${theme.marko.variables.spacing.distance.medium}px ${SqwLayoutStyles.componentConfig.content.desktopPadding}px`,
  gap: theme.marko.variables.spacing.distance.small,

  [mq.isSmallDevice]: {
    padding: `${theme.marko.variables.spacing.distance.medium}px ${SqwLayoutStyles.componentConfig.content.mobilePadding}px`,
  },

  [mq.conditionalTransition]: {
    transition: `padding ${theme.marko.variables.animationDuration.long}`,
  },
}));

const LeftContainer = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.marko.variables.spacing.distance.large,

  [mq.isSmallDevice]: {
    display: 'none',
  },
}));

const RightContainer = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: theme.marko.variables.spacing.distance.large,
  flex: 1,
  minWidth: 0,
}));

export const S = {
  Header,
  HeaderContent,
  LeftContainer,
  RightContainer,
} as const;
