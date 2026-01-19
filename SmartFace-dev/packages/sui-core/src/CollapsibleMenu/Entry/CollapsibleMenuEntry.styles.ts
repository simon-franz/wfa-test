import styled from '@emotion/styled';
import { mq, resetListStyles } from '@hrworks/design-system';
import { motion } from 'motion/react';

const componentConfig = {
  indicatorWidth: 1,
};

const IconContainer = styled.span(({ theme }) => ({
  display: 'inline-flex',
  alignSelf: 'stretch',
  alignItems: 'center',
  padding: `${theme.marko.variables.spacing.distance.small}px 0 ${theme.marko.variables.spacing.distance.small}px ${theme.marko.variables.spacing.distance.small}px`,
}));

const IconWrapper = styled.span<{
  expanded: boolean;
}>(({ theme, expanded }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  [mq.conditionalTransition]: {
    transition: `transform ${theme.marko.variables.animationDuration.normal}`,
  },
  ...(!expanded && {
    transform: 'rotate(-90deg)',
  }),
}));

const Submenu = styled(motion.div)({
  overflow: 'hidden',
  '[data-showcollapsiblemenudepthindicator=true] &': {
    position: 'relative',
    '::before': {
      content: '""',
      position: 'absolute',
      left: 'var(--line-position-depth-indicator)',
      top: 0,
      bottom: 0,
      width: componentConfig.indicatorWidth,
      zIndex: 1,
      backgroundColor: 'var(--collapsible-menu-depth-indicator-color)',
      pointerEvents: 'none',
    },
  },
});

const SubmenuList = styled.ul([resetListStyles]);

export const S = {
  componentConfig,
  IconContainer,
  IconWrapper,
  Submenu,
  SubmenuList,
} as const;
