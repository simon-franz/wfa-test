import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { mq } from '@hrworks/design-system/mediaQueries';
import _Title from '@hrworks/sui-core/Title';

import type { OnboardingSidebarProps } from './OnboardingSidebar.types';

const componentConfig = {
  animations: {
    slideUp: keyframes({
      '0%': {
        transform: 'translateY(100%)',
      },
      '100%': {
        transform: 'translateY(0)',
      },
    }),
    slideDown: keyframes({
      '0%': {
        transform: 'translateY(-100%)',
      },
      '100%': {
        transform: 'translateY(0)',
      },
    }),
  },
};

type ExpandSidebarProps = {
  expandSidebar?: boolean;
};

type ContainerProps = Pick<OnboardingSidebarProps, 'animation'> & ExpandSidebarProps;

const Container = styled.div<ContainerProps>(({ theme, expandSidebar, animation }) => ({
  width: '100%',
  height: '100%',
  display: 'grid',
  gridTemplateRows: '1fr 1fr 1fr',
  color: theme.sqwTier2Color.text.selected,
  alignItems: 'center',
  gap: 24,
  animation: `0.5s ease-in-out ${componentConfig.animations[animation]}`,
  ...(expandSidebar && {
    display: 'flex',
    flexDirection: 'column',
    [mq.isTouchOrSmallDevice]: {
      gridTemplateRows: 'auto',
      color: theme.sqwTier2Color.text.default,
      backgroundColor: theme.sqwTier2Color.surface.sunken,
      animation: 'none',
      padding: '0 30px',
      rowGap: 0,
    },
  }),
}));

const Header = styled.div<ExpandSidebarProps>(({ theme, expandSidebar }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  textAlign: 'center',
  height: '100%',
  width: '90%',
  gap: theme.marko.variables.spacing.distance.small,
  margin: 'auto',
  ...(expandSidebar && {
    height: 'auto',
    padding: `${theme.marko.variables.spacing.distance.extraLarge}px 0`,
    gap: 0,
    [mq.isTouchOrSmallDevice]: {
      display: 'block',
      alignSelf: 'flex-start',
      margin: 0,
    },
  }),
}));

const Title = styled(_Title)<ExpandSidebarProps>(({ expandSidebar }) => ({ theme }) => ({
  ...theme.sqwTier2Typography.title,
  textWrap: 'balance',

  ...(expandSidebar && {
    [mq.isTouchOrSmallDevice]: {
      display: 'none',
    },
  }),
}));

const Description = styled.p<ExpandSidebarProps>(({ theme, expandSidebar }) => ({
  maxWidth: 450,
  margin: `${theme.marko.variables.spacing.distance.medium}px 0 0 0`,
  ...(expandSidebar && {
    fontSize: '1.8em',
    maxWidth: '100%',
    [mq.isTouchOrSmallDevice]: {
      textAlign: 'left',
      lineHeight: '1em',
    },
  }),
}));

const ImageWrapper = styled.div<ExpandSidebarProps>(({ theme, expandSidebar }) => ({
  height: '70%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  width: '100%',
  [mq.isTouchOrSmallDevice]: {
    height: 'auto',
  },
  '> *': {
    height: '100%',
    width: '100%',
    [mq.isTouchOrSmallDevice]: {
      color: theme.sqwTier2Color.text.default,
    },
  },
  ...(expandSidebar && {
    flex: 1,
    '> svg': {
      overflow: 'visible',
      maxWidth: 300,
    },
  }),
}));

export const S = {
  componentConfig,
  Container,
  Header,
  Title,
  Description,
  ImageWrapper,
} as const;
