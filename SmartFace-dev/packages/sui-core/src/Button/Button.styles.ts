import { css, type Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { withOpacity } from '@hrworks/design-system';
import { mq } from '@hrworks/design-system/mediaQueries';
import type { SetRequired } from 'type-fest';

import { S as TextStyles } from '../Text/Text.styles';
import { getButtonColorMap } from './Button.colors.ts';
import type { ButtonProps as _ButtonProps } from './Button.types.ts';

const generateInteractiveButtonStyles = (theme: Theme) =>
  css({
    '&&': {
      outline: '2px solid transparent',
    },
    outlineOffset: 2,
    ':focus-visible': {
      outlineColor: theme.sqwTier2Color.border.focus,
      position: 'relative',
    },
  });

type ButtonProps = SetRequired<_ButtonProps, 'size'> & {
  $color: Required<_ButtonProps>['color'];
};

export const generateButtonStyles = ({
  theme,
  corner,
  fullWidth,
  size = 'medium',
  $color = 'primary',
  variant,
  textAlign,
}: Partial<ButtonProps> & { theme: Theme }) => {
  const buttonColorMap = getButtonColorMap(theme);

  return css([
    {
      ...(variant !== 'unstyled' && theme.sqwTier2Typography.labelMdSemibold),
      transitionProperty: 'background-color, color, outline-color, opacity',
      transitionDuration: theme.marko.variables.animationDuration.normal,
      appearance: 'none',
      textAlign,
      textDecoration: 'none',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      border: 'none',
      gap: '0.571em',
      padding: '0.571em 0.857em',
      color: theme.sqwTier2Color.text.default,
      borderRadius: corner === 'rounded' ? theme.marko.variables.borderRadius.small : corner === 'pill' ? '5rem' : 0,
      fontSize: theme.marko.typography.sqwFontSizes[size],

      ...(fullWidth && {
        display: 'flex',
        width: '100%',
        justifyContent: textAlign || 'center',
      }),

      ...(variant === 'filled' && {
        backgroundColor: buttonColorMap.filled[$color].default,
        color: buttonColorMap.filled[$color].color,

        ':not(:disabled)': {
          [mq.supportsHover]: {
            ':hover': {
              backgroundColor: buttonColorMap.filled[$color].hovered,
            },
          },

          ':active': {
            backgroundColor: buttonColorMap.filled[$color].pressed,
          },
        },
      }),

      ...(variant === 'ghost' && {
        backgroundColor: buttonColorMap.ghost[$color].default,
        color: buttonColorMap.ghost[$color].color,
        boxShadow: `inset 0px 0px 0px 2px ${buttonColorMap.ghost[$color].color}`,

        ':not(:disabled)': {
          [mq.supportsHover]: {
            ':hover': {
              backgroundColor: buttonColorMap.ghost[$color].hovered,
              ...($color === 'primary' && {
                color: theme.sqwTier2Color.text.brand.hovered,
              }),
            },
          },

          ':active': {
            backgroundColor: buttonColorMap.ghost[$color].pressed,
          },
        },
      }),

      ...((variant === 'text' || variant === 'link') && {
        color: $color === 'secondary' ? theme.sqwTier2Color.text.default : buttonColorMap.filled[$color].default,
        background: 'none',
        padding: 0,

        [mq.supportsHover]: {
          ':not(:disabled):hover': {
            color:
              $color === 'secondary'
                ? withOpacity(theme.sqwTier2Color.text.default, '75%')
                : buttonColorMap.filled[$color].hovered,
          },
        },
      }),

      ...(variant === 'subtle' && {
        backgroundColor: buttonColorMap.subtle[$color].default,
        color: buttonColorMap.subtle[$color].color,

        ':hover:not([disabled])': {
          [mq.supportsHover]: {
            backgroundColor: buttonColorMap.subtle[$color].hovered,
            ...($color === 'primary' && {
              color: theme.sqwTier2Color.text.brand.hovered,
            }),
          },

          ':active': {
            backgroundColor: buttonColorMap.subtle[$color].pressed,
            ...($color === 'primary' && {
              color: theme.sqwTier2Color.text.brand.pressed,
            }),
          },
        },
      }),

      ':disabled': {
        opacity: theme.marko.variables.opacity.disabled,
        cursor: 'not-allowed',
      },
    },
    generateInteractiveButtonStyles(theme),
    variant === 'link' && TextStyles.interactiveTextStyles(theme),
  ]);
};

const Button = styled.button<ButtonProps>(({ theme, corner, fullWidth, size, $color, variant, textAlign }) =>
  generateButtonStyles({ theme, corner, fullWidth, size, $color, variant, textAlign }),
);

const Icon = styled.span({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '0.875rem',
  width: '1rem',
  height: '1rem',
  pointerEvents: 'none',
});

export const S = {
  generateInteractiveButtonStyles,
  generateButtonStyles,
  Button,
  Icon,
} as const;
