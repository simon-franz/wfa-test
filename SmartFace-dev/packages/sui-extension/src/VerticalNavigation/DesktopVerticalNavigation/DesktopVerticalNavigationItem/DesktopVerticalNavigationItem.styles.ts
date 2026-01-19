import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { mq, shouldForwardProp, withOpacity } from '@hrworks/design-system';
import Button from '@hrworks/sui-core/Button';
import Icon from '@hrworks/sui-core/Icon';
import { Scroller as _Scroller } from '@hrworks/sui-core/Scroller';

import { OnboardingSidebarStyles, type VerticalSlideDirection } from '../../../OnboardingController';

const fixSidebarAppearing = keyframes({
  '0%,99%': {
    overflow: 'hidden',
  },
  '100%': {
    overflow: 'auto',
  },
});

const Scroller = styled(_Scroller, {
  shouldForwardProp,
})<{
  $hide?: boolean;
}>(({ $hide }) => ({
  gridColumn: 2,
  flex: 1,
  height: '100%',
  animation: `${fixSidebarAppearing} 0.5s`,
  ...($hide && {
    display: 'none',
  }),
}));

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100%',
});

const ArrowWrapper = styled.div<{
  top?: boolean;
}>(({ theme, top }) => ({
  position: 'sticky',
  width: '100%',
  overflow: 'hidden',
  color: theme.sqwTier2Color.icon.brand.default,
  zIndex: 3,
  pointerEvents: 'none',
  ...(top
    ? {
        top: 0,
        marginBottom: theme.marko.variables.spacing.distance.extraSmall,
      }
    : {
        bottom: 0,
        marginTop: theme.marko.variables.spacing.distance.extraSmall,
      }),
}));

const ArrowContainer = styled.div<{
  top?: boolean;
}>(({ theme, top }) => ({
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  alignItems: 'center',
  margin: `0 ${-theme.marko.variables.spacing.distance.extraLarge}px`,
  padding: `${theme.marko.variables.spacing.distance.extraLarge * 2}px 0`,
  '::after': {
    content: '""',
    zIndex: -1,
    mask: top
      ? `linear-gradient(${theme.sqwTier2Color.surface.sunken},${theme.sqwTier2Color.surface.sunken} 50%, transparent)`
      : `linear-gradient(transparent, ${theme.sqwTier2Color.surface.sunken} 50%, ${theme.sqwTier2Color.surface.sunken})`,
    backdropFilter: 'blur(2px)',
    backgroundColor: withOpacity(theme.sqwTier2Color.surface.sunken, '50%'),
    position: 'absolute',
    inset: 0,
  },
}));

const ArrowButton = styled(Button, {
  shouldForwardProp,
})<{
  $filled?: boolean;
  $top?: boolean;
}>(({ theme, $filled, $top }) => {
  const arrowColor = theme.sqwTier2Color.icon.brand.default;

  return {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: arrowColor,
    fontSize: '1.25rem',
    outlineOffset: -2,
    width: 80,
    height: 40,
    margin: `${theme.marko.variables.spacing.distance.extraSmall}px 0`,
    borderRadius: 25,
    pointerEvents: 'all',
    ...($filled && {
      border: `2px solid ${arrowColor}`,
    }),
    [mq.supportsHover]: {
      ':hover': {
        ...($filled && {
          color: theme.sqwTier2Color.icon.inverse,
          backgroundColor: arrowColor,
        }),
        [`${ArrowIcon}`]: {
          transform: `translateY(${$top ? -6 : 6}px)`,
        },
      },
    },
  };
});

const ArrowIcon = styled(Icon)(({ theme }) => ({
  [mq.conditionalTransition]: {
    transition: `all ${theme.marko.variables.animationDuration.long} ease-in-out`,
  },
}));

type ArrowBackdropPointerEventsBlockerProps = {
  hasDescription?: boolean;
  top?: boolean;
};

const ArrowBackdropPointerEventsBlocker = styled.div<ArrowBackdropPointerEventsBlockerProps>(
  ({ hasDescription, top }) => ({
    position: 'absolute',
    height: 50,
    width: '100%',
    top: 80,
    pointerEvents: 'all',
    ...(hasDescription && {
      height: 45,
      top: 110,
    }),
    ...(top && {
      top: 'auto',
      bottom: hasDescription ? 110 : 80,
    }),
  }),
);

type ContentProps = {
  menuHidden: boolean;
  animation: VerticalSlideDirection;
};

const Content = styled.div<ContentProps>(({ theme, menuHidden, animation }) => ({
  width: '100%',
  overflowY: 'visible',
  flexGrow: 1,
  padding: theme.marko.variables.spacing.distance.extraSmall,
  [mq.conditionalTransition]: {
    animation: `${OnboardingSidebarStyles.componentConfig.animations[animation]} 0.5s ease-in-out`,
  },
  ...(menuHidden && {
    display: 'flex',
    alignItems: 'center',
    padding: '0 20%',
  }),
}));

export const S = {
  Scroller,
  Wrapper,
  ArrowWrapper,
  Content,
  ArrowContainer,
  ArrowButton,
  ArrowIcon,
  ArrowBackdropPointerEventsBlocker,
} as const;
