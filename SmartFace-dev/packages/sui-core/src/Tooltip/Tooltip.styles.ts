import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { generateShadowStyles, mq, overflowBreakWord } from '@hrworks/design-system';

import type { TooltipProps } from './Tooltip.types';

const tooltipAnimation = keyframes({
  '0%': {
    opacity: 0,
    scale: 0.7,
    visibility: 'hidden',
  },
  '100%': {
    opacity: 1,
    scale: 1,
    visibility: 'visible',
  },
});

type TriggerProps = Pick<TooltipProps, 'fullWidth' | 'unstyledTrigger'>;

const Trigger = styled.div<TriggerProps>(({ fullWidth, unstyledTrigger }) => ({
  ...(!unstyledTrigger && {
    display: 'block',
    ...(!fullWidth && {
      display: 'flex',
      alignItems: 'center',
      width: 'fit-content',
    }),
  }),
  [mq.isTouchDevice]: {
    '*': {
      userSelect: 'none',
    },
  },
}));

type TooltipContainerProps = {
  playAnimation?: boolean;
  isCustom?: boolean;
} & Pick<Required<TooltipProps>, 'placement'>;

const TooltipContainer = styled.div<TooltipContainerProps>(({ theme, playAnimation, placement, isCustom }) => {
  const transformOriginDirection = {
    top: 'bottom',
    left: 'right',
    right: 'left',
    bottom: 'top',
  };

  return [
    overflowBreakWord,
    !isCustom &&
      generateShadowStyles({
        theme,
        variant: 'default',
      }),
    {
      maxWidth: 300,
      display: 'flex',
      flexDirection: 'column',
      width: 'max-content',
      padding: theme.marko.variables.spacing.distance.medium,
      willChange: 'transform',
      transformOrigin: transformOriginDirection[placement.split('-')[0] as keyof typeof transformOriginDirection],
      pointerEvents: 'none',
      backgroundColor: 'transparent',
      ...(playAnimation && {
        animation: `${tooltipAnimation} cubic-bezier(0.4, 0, 0.2, 1) ${theme.marko.variables.animationDuration.normal} forwards`,
      }),
      ...(!isCustom && {
        borderRadius: theme.marko.variables.borderRadius.medium,
        backgroundColor: theme.sqwTier2Color.background.neutral.bold,
        color: theme.sqwTier2Color.text.inverse,
        gap: theme.marko.variables.spacing.distance.small,
      }),
    },
  ];
});

export const S = {
  Trigger,
  TooltipContainer,
} as const;
