import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { generateShadowStyles, resetListStyles, withOpacity } from '@hrworks/design-system';
import Button from '@hrworks/sui-core/Button';
import { motion } from 'motion/react';

import type { VerticalNavigationItemProps } from '../VerticalNavigation.types';

const Container = styled.div({
  height: '100%',
  overflow: 'hidden',
  position: 'relative',
});

const menuAnimation = keyframes({
  '0%': {
    bottom: -200,
  },
  '100%': {
    bottom: 0,
  },
});

const MenuWrapper = styled.nav(({ theme }) => [
  generateShadowStyles({
    theme,
    variant: 'default',
  }),
  {
    position: 'absolute',
    animation: `${menuAnimation} cubic-bezier(1,1.27,.56,.99) .7s forwards`,
    right: 0,
    left: 0,
    margin: theme.marko.variables.spacing.distance.large,
    backdropFilter: 'blur(8px)',
    backgroundColor: withOpacity(theme.sqwTier2Color.surface.raised, '75%'),
    borderRadius: theme.marko.variables.borderRadius.medium,
  },
]);

const Menu = styled.ul(({ theme }) => [
  resetListStyles,
  {
    zIndex: 4,
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0 auto',
    padding: `${theme.marko.variables.spacing.distance.extraSmall}px ${theme.marko.variables.spacing.distance.extraSmall}px 0 ${theme.marko.variables.spacing.distance.extraSmall}px`,
    overflow: 'auto',
    maxWidth: 700,
  },
]);

const NavigationButton = styled(Button)({
  paddingBottom: 0,
});

type NavigationIconProps = {
  isActive: boolean;
} & Pick<VerticalNavigationItemProps, 'hasError'>;

const NavigationIcon = styled.span<NavigationIconProps>(({ theme, isActive, hasError }) => ({
  color: hasError ? theme.sqwTier2Color.text.error.default : theme.sqwTier2Color.text.subtle,
  fontSize: 24,
  ...(isActive && {
    color: hasError ? theme.sqwTier2Color.text.error.default : theme.sqwTier2Color.text.selected,
  }),
}));

const IndicatorWrapper = styled(motion.div)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: theme.marko.variables.spacing.distance.medium,
  paddingBottom: theme.marko.variables.spacing.distance.small,
}));

const IndicatorDot = styled.div<Pick<VerticalNavigationItemProps, 'hasError'>>(({ theme, hasError }) => ({
  width: 6,
  height: 6,
  borderRadius: '50%',
  backgroundColor: hasError ? theme.sqwTier2Color.text.error.default : theme.sqwTier2Color.text.selected,
}));

export const S = {
  Container,
  MenuWrapper,
  Menu,
  NavigationButton,
  NavigationIcon,
  IndicatorWrapper,
  IndicatorDot,
} as const;
