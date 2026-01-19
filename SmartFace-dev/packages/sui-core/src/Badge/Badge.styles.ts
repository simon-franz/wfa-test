import { keyframes, type Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { mq, overflowEllipsis } from '@hrworks/design-system';
import type { Size } from '@hrworks/types/shared/UiTypes';
import type { SetRequired } from 'type-fest';

import type { BadgeProps as _BadgeProps } from './Badge.types';

const componentConfig = {
  outlineSize: 2,
  paddingY: '0.17em',
  dotSize: {
    extraSmall: 12,
    small: 13,
    medium: 14,
    large: 15,
    extraLarge: 16,
  },
  boxShadowPreSizes: '0px 0px 0px',
  boxShadowBorderSize: 1,
  animationDuration: '2.5s',
  animationFilledOpacity: '30%',
  animationOutlinedOpacity: '17%',
};

const getBadgeColorMap = (theme: Theme) => ({
  primary: {
    filled: {
      color: theme.sqwTier2Color.text.brand.default,
      backgroundColor: theme.sqwTier2Color.background.brand.subtle.hovered,
    },
    outlined: {
      color: theme.sqwTier2Color.text.brand.default,
    },
  },
  secondary: {
    filled: {
      color: theme.sqwTier2Color.text.default,
      backgroundColor: theme.sqwTier2Color.background.neutral.subtle.default,
    },
    outlined: {
      color: theme.sqwTier2Color.text.default,
    },
  },
  info: {
    filled: {
      color: theme.sqwTier2Color.text.info.onSubtle,
      backgroundColor: theme.sqwTier2Color.background.info.subtle,
    },
    outlined: {
      color: theme.sqwTier2Color.text.info.default,
    },
  },
  success: {
    filled: {
      color: theme.sqwTier2Color.text.success.onSubtle,
      backgroundColor: theme.sqwTier2Color.background.success.subtle,
    },
    outlined: {
      color: theme.sqwTier2Color.text.success.default,
    },
  },
  warning: {
    filled: {
      color: theme.sqwTier2Color.text.warning.onSubtle,
      backgroundColor: theme.sqwTier2Color.background.warning.subtle,
    },
    outlined: {
      color: theme.sqwTier2Color.text.warning.default,
    },
  },
  danger: {
    filled: {
      color: theme.sqwTier2Color.text.error.onSubtle,
      backgroundColor: theme.sqwTier2Color.background.error.subtle,
    },
    outlined: {
      color: theme.sqwTier2Color.text.error.default,
    },
  },
});

const Container = styled.div<Pick<_BadgeProps, 'fullWidth'>>(({ fullWidth }) => ({
  position: 'relative',
  display: fullWidth ? 'block' : 'inline-flex',
}));

const animationPulsing = (
  theme: Theme,
  variant: Required<_BadgeProps>['variant'],
  color: Required<_BadgeProps>['color'],
  hasAnchor: _BadgeProps['anchor'],
) => {
  const colorMap = getBadgeColorMap(theme);
  let boxShadowPulsing = `${componentConfig.boxShadowPreSizes} 0.5rem transparent`;
  variant === 'outlined' &&
    (boxShadowPulsing =
      // prepend inset border to boxShadow
      `inset ${componentConfig.boxShadowPreSizes} ${componentConfig.boxShadowBorderSize}px ${colorMap[color].outlined.color}, ` +
      boxShadowPulsing);
  hasAnchor &&
    (boxShadowPulsing += `, ${componentConfig.boxShadowPreSizes} ${componentConfig.outlineSize}px ${theme.sqwTier2Color.surface.raised}`);

  return keyframes({
    '50%, 100%': {
      boxShadow: boxShadowPulsing,
    },
  });
};

const animationBreathingFlashing = (animation: _BadgeProps['animation'], variant: _BadgeProps['variant']) => {
  if (animation === 'flashing') {
    return keyframes({
      '5%': {
        opacity:
          variant === 'outlined' ? componentConfig.animationOutlinedOpacity : componentConfig.animationFilledOpacity,
      },
      '10%': {
        opacity: 0,
      },
    });
  }

  // animation === 'breathing'
  return keyframes({
    '45%, 55%': {
      opacity:
        variant === 'outlined' ? componentConfig.animationOutlinedOpacity : componentConfig.animationFilledOpacity,
    },
  });
};

const animationJumping = keyframes({
  '0%, 20%, 40%': {
    top: 0,
  },
  '10%': {
    top: '-4px',
  },
  '30%': {
    top: '-2px',
  },
});

const TextWrapper = styled.span(({ theme }) => ({
  fontSize: 0,
  opacity: 0,
  [mq.conditionalTransition]: {
    transitionProperty: 'font-size, opacity',
    transitionDuration: theme.marko.variables.animationDuration.normal,
  },
}));

type BadgeProps = SetRequired<_BadgeProps, 'variant' | 'size'> & {
  $color: Required<_BadgeProps>['color'];
};

const Badge = styled.span<BadgeProps>(
  ({ theme, anchor, variant, corner, size, dot, $color, fixedSize, fullWidth, animation }) => {
    const colorMap = getBadgeColorMap(theme);
    const fontSizes: Record<Size, string> = {
      extraSmall: '0.65rem',
      small: '0.7rem',
      medium: theme.sqwTier2Typography.bodySm.fontSize,
      large: '0.8rem',
      extraLarge: '0.85rem',
    };

    return [
      !dot && !anchor && !fixedSize && overflowEllipsis,
      {
        ...theme.sqwTier2Typography.bodySm,
        position: 'relative',
        display: 'inline-block',
        textAlign: 'center',
        textWrap: 'nowrap',

        '> *': {
          verticalAlign: 'middle',
        },

        ...(!anchor && {
          maxWidth: '100%',
        }),

        ...((fixedSize || anchor) && {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }),

        ...(fullWidth &&
          !anchor &&
          !dot && {
            width: '100%',
          }),

        ...(anchor && {
          position: 'absolute',
          transform: 'translateX(50%) translateY(-50%)',
          top: 0,
          right: 0,
          userSelect: 'none',
          zIndex: 1,
          ...(animation !== 'pulsing' && {
            outline: `${componentConfig.outlineSize}px solid ${theme.sqwTier2Color.surface.raised}`,
          }),
          ...(!dot && {
            pointerEvents: 'none',
          }),
        }),
        borderRadius:
          corner === 'pill' ? `calc(1.5em + 2 * ${componentConfig.paddingY})` : corner === 'rounded' ? '0.35em' : 0, // corner === 'square'
        padding: '0.17em 0.67em',
        fontSize: fontSizes[size],

        ...(dot && {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textWrap: 'nowrap',
          minWidth: componentConfig.dotSize[size],
          minHeight: componentConfig.dotSize[size],

          ...(anchor
            ? {
                [mq.conditionalTransition]: {
                  transitionProperty: 'border-radius, font-size, min-width, min-height, padding',
                  transitionDuration: theme.marko.variables.animationDuration.normal,
                },
                ...(fixedSize && {
                  height: 0,
                }),
                ':not(:hover)': {
                  minWidth: componentConfig.dotSize[size],
                  minHeight: componentConfig.dotSize[size],
                  height: componentConfig.dotSize[size],
                  width: componentConfig.dotSize[size],
                  padding: 0,
                  borderRadius: '100%',
                },
                [mq.supportsHover]: {
                  ':hover': {
                    [`${TextWrapper}`]: {
                      fontSize: 'inherit',
                      opacity: 1,
                    },
                    ...(animation && {
                      animation: 0,
                      '::after': {
                        animation: 0,
                      },
                    }),
                  },
                },
              }
            : {
                padding: 0,
                borderRadius: `calc(1.5em + 2 * ${componentConfig.paddingY})`,
                [mq.supportsHover]: {
                  ':hover': {
                    ...(animation && {
                      animation: 0,
                      '::after': {
                        animation: 0,
                      },
                    }),
                  },
                },
              }),
        }),

        ...(fixedSize && {
          height: `calc(1.5em + 2 * ${componentConfig.paddingY})`,
          aspectRatio: '1/1',
          overflow: 'hidden',
        }),
        ...(variant === 'filled' && {
          color: colorMap[$color].filled.color,
          backgroundColor: colorMap[$color].filled.backgroundColor,
        }),
        ...(variant === 'outlined' && {
          color: colorMap[$color].outlined.color,
          boxShadow: `inset ${componentConfig.boxShadowPreSizes} ${componentConfig.boxShadowBorderSize}px ${colorMap[$color].outlined.color}`,
          backgroundColor: theme.sqwTier2Color.surface.raised,
        }),
        ...(animation === 'pulsing' && {
          ...(variant === 'filled' && {
            // if Badge has an achor add a second box-shadow to simulate the outline of the Badge: boxShadow: 'animated pulsing, outline'
            boxShadow: anchor
              ? `${componentConfig.boxShadowPreSizes} 0px ${colorMap[$color].filled.backgroundColor},
              ${componentConfig.boxShadowPreSizes} ${componentConfig.outlineSize}px ${theme.sqwTier2Color.surface.raised}`
              : `${componentConfig.boxShadowPreSizes} 0px ${colorMap[$color].filled.backgroundColor}`,
          }),
          ...(variant === 'outlined' && {
            // Badge variant outlined has two box-shadows: boxShadow: '1px border inside the Badge, animated pulsing'.
            // if Badge has an achor add a third box-shadow to simulate the outline of the Badge: boxShadow: '1px border inside the Badge, animated pulsing, outline'
            boxShadow: anchor
              ? `inset ${componentConfig.boxShadowPreSizes} ${componentConfig.boxShadowBorderSize}px ${colorMap[$color].outlined.color},
              ${componentConfig.boxShadowPreSizes} 0px ${colorMap[$color].outlined.color},
              ${componentConfig.boxShadowPreSizes} ${componentConfig.outlineSize}px ${theme.sqwTier2Color.surface.raised}`
              : `inset ${componentConfig.boxShadowPreSizes} ${componentConfig.boxShadowBorderSize}px ${colorMap[$color].outlined.color},
              ${componentConfig.boxShadowPreSizes} 0px ${colorMap[$color].outlined.color}`,
          }),
          animation: `${animationPulsing(theme, variant, $color, !!anchor)} ${
            componentConfig.animationDuration
          } infinite`,
        }),
        ...((animation === 'breathing' || animation === 'flashing') && {
          overflow: 'hidden',
          ...(!anchor && {
            transform: 'translateX(0%) translateY(0%)',
          }),
          '::after': {
            content: '" "',
            width: '100%',
            height: '100%',
            position: 'absolute',
            inset: 0,
            opacity: 0,
            pointerEvents: 'none',
            ...(variant === 'filled' && {
              backgroundColor: theme.sqwTier2Color.surface.raised,
            }),
            ...(variant === 'outlined' && {
              backgroundColor: 'currentColor',
            }),
            animation: `${animationBreathingFlashing(animation, variant)} ${
              componentConfig.animationDuration
            } infinite`,
          },
        }),
        ...(animation === 'jumping' && {
          willChange: 'top',
          animation: `${animationJumping} ${componentConfig.animationDuration} infinite`,
          ...(!anchor && {
            position: 'relative',
          }),
        }),
      },
    ];
  },
);

export const S = {
  Container,
  TextWrapper,
  Badge,
} as const;
