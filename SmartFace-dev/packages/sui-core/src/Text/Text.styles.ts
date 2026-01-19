import { css, type Theme } from '@emotion/react';
import { generateResponsiveStyles, mq, overflowEllipsis, overflowHyphens } from '@hrworks/design-system';
import type { Color } from '@hrworks/types/shared/UiTypes';
import type { SetRequired } from 'type-fest';

import type { TextProps } from './Text.types';

const componentConfig = {
  fontWeights: {
    thin: 300,
    normal: 400,
    bold: 500,
  },
};

const interactiveTextStyles = (theme: Theme) =>
  css({
    cursor: 'pointer',
    textDecoration: 'underline',
    ':focus-visible': {
      outline: `2px solid ${theme.sqwTier2Color.border.focus}`,
    },
    [mq.supportsHover]: {
      ':not(:disabled):hover': {
        textDecoration: 'none',
      },
    },
  });

const textStyles = ({
  variant,
  hover,
  fullWidth,
  color,
  fontSize,
  fontWeight,
  underlined,
  italic,
  textAlign,
  theme,
  href,
  overflowBehaviour,
}: SetRequired<Omit<TextProps, 'text' | 'html'>, 'fontSize' | 'overflowBehaviour'> & {
  theme: Theme;
}) => {
  const colorMap: Record<Color, string> = {
    primary: theme.sqwTier2Color.text.brand.default,
    secondary: theme.sqwTier2Color.text.subtle,
    warning: theme.sqwTier2Color.text.warning.default,
    success: theme.sqwTier2Color.text.success.default,
    danger: theme.sqwTier2Color.text.error.default,
    info: theme.sqwTier2Color.text.info.default,
  };

  return css([
    href && interactiveTextStyles(theme),
    textAlign &&
      generateResponsiveStyles({
        value: textAlign,
        cssProp: 'textAlign',
      }),
    overflowBehaviour === 'ellipsis' && overflowEllipsis,
    overflowBehaviour === 'break' && overflowHyphens,
    {
      transition: `opacity ${theme.marko.variables.animationDuration.normal}`,
      color: 'currentcolor',
      fontSize: theme.marko.typography.sqwFontSizes[fontSize],

      ...(fullWidth && {
        display: 'block',
        width: '100%',
      }),
      ...(color && {
        color: colorMap[color],
      }),
      ...(italic && {
        fontStyle: 'italic',
      }),
      ...(underlined && {
        textDecoration: 'underline',
      }),
      ...(fontWeight && {
        fontWeight: componentConfig.fontWeights[fontWeight],
      }),
      ...(variant === 'subtle' && {
        opacity: theme.marko.variables.opacity.medium,
      }),
      [mq.supportsHover]: {
        ...(hover && {
          ':hover': {
            opacity: variant === 'subtle' ? theme.marko.variables.opacity.high : theme.marko.variables.opacity.medium,
          },
        }),
      },
    },
  ]);
};

export const S = {
  interactiveTextStyles,
  textStyles,
} as const;
