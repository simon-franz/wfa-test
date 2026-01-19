import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { generateShadowStyles } from '@hrworks/design-system';
import { mq } from '@hrworks/design-system/mediaQueries';

import type { DataWidgetCardProps } from './DataWidgetCard.types';

const flipAnimation = keyframes({
  from: {
    transform: 'perspective(400px) rotate3d(1, 0, 0, 90deg)',
    animationTimingFunction: 'ease-in',
    opacity: 0,
  },
  '40%': {
    transform: 'perspective(400px) rotate3d(1, 0, 0, -20deg)',
  },
  '60%': {
    transform: 'perspective(400px) rotate3d(1, 0, 0, 10deg)',
    opacity: 1,
  },
  '80': {
    transform: 'perspective(400px) rotate3d(1, 0, 0, -5deg)',
  },
  to: {
    transform: 'perspective(400px)',
  },
});

const Card = styled.div<Pick<DataWidgetCardProps, 'initialRender'>>(({ theme, initialRender }) => [
  generateShadowStyles({
    theme,
    variant: 'light',
  }),
  {
    backgroundColor: theme.sqwTier2Color.surface.raised,
    display: 'flex',
    flexDirection: 'column',
    height: 132,
    width: 'min(100%, 335px)',
    padding: theme.marko.variables.spacing.distance.medium,
    gap: 8,

    '&[data-show-value=true]': {
      gap: 24,
    },
    borderRadius: theme.marko.variables.borderRadius.small,
    [mq.conditionalTransition]: {
      transition: `all ${theme.marko.variables.animationDuration.long}`,
    },
    ...(!initialRender && {
      animationName: flipAnimation,
      animationDuration: theme.marko.variables.animationDuration.long,
    }),
  },
]);

const Header = styled.div({
  display: 'flex',
  flex: 0,
  justifyContent: 'space-between',
  alignItems: 'center',
});

const Label = styled.div(({ theme }) => ({
  ...theme.sqwTier2Typography.labelMd,
  color: theme.sqwTier2Color.text.subtle,
}));

const IconContainer = styled.div(({ theme }) => ({
  color: theme.sqwTier2Color.icon.brand.default,
}));

export const S = {
  Card,
  Header,
  Label,
  IconContainer,
} as const;
