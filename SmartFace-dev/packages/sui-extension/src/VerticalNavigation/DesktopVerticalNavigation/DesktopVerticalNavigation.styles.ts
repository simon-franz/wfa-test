import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { mq, overflowEllipsis, resetListStyles, shouldForwardProp } from '@hrworks/design-system';
import Button from '@hrworks/sui-core/Button';
import { motion } from 'motion/react';

import type { VerticalNavigationItemProps } from '../VerticalNavigation.types';
import { DesktopVerticalNavigationItem as _DesktopVerticalNavigationItem } from './DesktopVerticalNavigationItem';

const slideInFromLeft = keyframes({
  '0%': {
    transform: 'translate3d(-100%, 0, 0)',
  },
  '100%': {
    transform: 'translate3d(0, 0, 0)',
  },
});

const Container = styled.div<{
  menuHidden: boolean;
}>(({ menuHidden }) => ({
  display: 'grid',
  gridTemplateColumns: `${menuHidden ? '20%' : '25%'} 1fr`,
  width: '100%',
  height: '100%',
  position: 'relative',
  overflowY: 'hidden',
  ...(menuHidden && {
    display: 'block',
  }),
}));

const MenuWrapper = styled.div<{
  menuHidden: boolean;
}>(({ menuHidden }) => ({
  display: 'flex',
  alignItems: 'center',
  paddingLeft: 25,
  width: '100%',
  animation: `${slideInFromLeft} 0.5s ease-in-out`,
  ...(menuHidden && {
    display: 'none',
  }),
}));

const titleTypographyStyles = css({
  whiteSpace: 'normal',
  textWrap: 'balance',
  span: {
    whiteSpace: 'normal',
  },
});

const Menu = styled.ul(({ theme }) => {
  const interactionStyles = css([
    titleTypographyStyles,
    {
      opacity: 1,
    },
  ]);

  return [
    resetListStyles,
    {
      padding: `0 ${theme.marko.variables.spacing.distance.medium}px 0 0`,
      width: '100%',
      [mq.supportsHover]: {
        [`:hover ${NavigationTitle}`]: interactionStyles,
      },
      [`:focus-within ${NavigationTitle}`]: interactionStyles,
    },
  ];
});

const NavigationButton = styled(Button, {
  shouldForwardProp,
})<{
  $hasError: VerticalNavigationItemProps['hasError'];
}>(({ theme, $hasError }) => {
  const interactionStyles = css({
    '::before': {
      height: 70,
      backgroundColor: $hasError
        ? theme.sqwTier2Color.background.error.bold.default
        : theme.sqwTier2Color.background.brand.bold.default,
      margin: '0 10px 0 0',
    },
    [`${NavigationTitle}`]: [
      titleTypographyStyles,
      {
        ...theme.sqwTier2Typography.labelMdSemibold,
        opacity: 1,
        color: $hasError ? theme.sqwTier2Color.text.error.default : theme.sqwTier2Color.text.selected,
      },
    ],
  });

  return {
    display: 'flex',
    textAlign: 'left',
    width: '100%',
    padding: `${theme.marko.variables.spacing.distance.small}px ${theme.marko.variables.spacing.distance.large}px`,
    '::before': {
      content: "''",
      marginRight: theme.marko.variables.spacing.distance.medium,
      width: 6,
      height: 30,
      borderRadius: theme.marko.variables.borderRadius.medium,
      flexShrink: 0,
      backgroundColor: $hasError
        ? theme.sqwTier2Color.text.error.default
        : theme.sqwTier2Color.background.neutral.subtle.default,
    },
    [`&, &::before, ${NavigationTitle}`]: {
      [mq.conditionalTransition]: {
        transition: `all ${theme.marko.variables.animationDuration.long}`,
      },
    },
    [mq.supportsHover]: {
      ':hover': interactionStyles,
    },
    ':focus-visible, &[data-isactive=true]': interactionStyles,
    [`${NavigationTitle}`]: {
      color: $hasError ? theme.sqwTier2Color.text.error.default : theme.sqwTier2Color.text.subtlest,
      opacity: 0,
    },
  };
});

const NavigationTitle = styled(motion.span)(({ theme }) => [
  overflowEllipsis,
  {
    ...theme.sqwTier2Typography.labelMd,
    hyphens: 'auto',
  },
]);

const DesktopVerticalNavigationItem = styled(_DesktopVerticalNavigationItem, {
  shouldForwardProp,
})<{
  $menuWidth?: number;
}>(({ $menuWidth }) => ({
  paddingRight: $menuWidth,
}));

export const S = {
  Container,
  MenuWrapper,
  Menu,
  NavigationButton,
  NavigationTitle,
  DesktopVerticalNavigationItem,
} as const;
