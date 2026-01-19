import type { Theme } from '@emotion/react';
import { withOpacity } from '@hrworks/design-system';
import type { CSSProperties } from 'react';
import type { ButtonProps } from 'react-day-picker';

export const getButtonColorMap = (
  theme: Theme,
): Record<
  NonNullable<Exclude<ButtonProps['variant'], 'unstyled' | 'text' | 'link'>>,
  Record<
    NonNullable<ButtonProps['color']>,
    Record<keyof Theme['sqwTier2Color']['background']['brand']['bold'], string> & Pick<CSSProperties, 'color'>
  >
> => {
  const subtleOpacityModifier = '19%';

  return {
    filled: {
      primary: {
        color: theme.sqwTier2Color.text.inverse,
        default: theme.sqwTier2Color.background.brand.bold.default,
        hovered: theme.sqwTier2Color.background.brand.bold.hovered,
        pressed: theme.sqwTier2Color.background.brand.bold.pressed,
      },
      secondary: {
        color: theme.sqwTier2Color.text.default,
        default: theme.sqwTier2Color.background.neutral.subtle.default,
        hovered: theme.sqwTier2Color.background.neutral.subtle.hovered,
        pressed: theme.sqwTier2Color.background.neutral.subtle.selected,
      },
      warning: {
        color: theme.sqwTier2Color.text.inverse,
        default: theme.sqwTier2Color.background.warning.bold.default,
        hovered: theme.sqwTier2Color.background.warning.bold.hovered,
        pressed: theme.sqwTier2Color.background.warning.bold.pressed,
      },
      danger: {
        color: theme.sqwTier2Color.text.inverse,
        default: theme.sqwTier2Color.background.error.bold.default,
        hovered: theme.sqwTier2Color.background.error.bold.hovered,
        pressed: theme.sqwTier2Color.background.error.bold.pressed,
      },
      info: {
        color: theme.sqwTier2Color.text.inverse,
        default: theme.sqwTier2Color.background.info.bold.default,
        hovered: theme.sqwTier2Color.background.info.bold.hovered,
        pressed: theme.sqwTier2Color.background.info.bold.pressed,
      },
      success: {
        color: theme.sqwTier2Color.text.inverse,
        default: theme.sqwTier2Color.background.success.bold.default,
        hovered: theme.sqwTier2Color.background.success.bold.hovered,
        pressed: theme.sqwTier2Color.background.success.bold.pressed,
      },
    },
    subtle: {
      primary: {
        color: theme.sqwTier2Color.text.brand.default,
        default: theme.sqwTier2Color.background.brand.subtle.default,
        hovered: theme.sqwTier2Color.background.brand.subtle.hovered,
        pressed: theme.sqwTier2Color.background.brand.subtle.pressed,
      },
      secondary: {
        color: theme.sqwTier2Color.text.default,
        default: theme.sqwTier2Color.background.brand.subtle.default,
        hovered: theme.sqwTier2Color.background.neutral.subtle.default,
        pressed: theme.sqwTier2Color.background.neutral.subtle.hovered,
      },
      warning: {
        color: theme.sqwTier2Color.background.warning.bold.default,
        default: theme.sqwTier2Color.background.brand.subtle.default,
        hovered: withOpacity(theme.sqwTier2Color.background.warning.bold.default, subtleOpacityModifier),
        pressed: withOpacity(theme.sqwTier2Color.background.warning.bold.pressed, subtleOpacityModifier),
      },
      danger: {
        color: theme.sqwTier2Color.background.error.bold.default,
        default: theme.sqwTier2Color.background.brand.subtle.default,
        hovered: withOpacity(theme.sqwTier2Color.background.error.bold.default, subtleOpacityModifier),
        pressed: withOpacity(theme.sqwTier2Color.background.error.bold.pressed, subtleOpacityModifier),
      },
      info: {
        color: theme.sqwTier2Color.background.info.bold.default,
        default: theme.sqwTier2Color.background.brand.subtle.default,
        hovered: withOpacity(theme.sqwTier2Color.background.info.bold.default, subtleOpacityModifier),
        pressed: withOpacity(theme.sqwTier2Color.background.info.bold.pressed, subtleOpacityModifier),
      },
      success: {
        color: theme.sqwTier2Color.background.success.bold.default,
        default: theme.sqwTier2Color.background.brand.subtle.default,
        hovered: withOpacity(theme.sqwTier2Color.background.success.bold.default, subtleOpacityModifier),
        pressed: withOpacity(theme.sqwTier2Color.background.success.bold.pressed, subtleOpacityModifier),
      },
    },
    ghost: {
      primary: {
        color: theme.sqwTier2Color.text.brand.default,
        default: theme.sqwTier2Color.background.brand.subtle.default,
        hovered: theme.sqwTier2Color.background.brand.subtle.hovered,
        pressed: theme.sqwTier2Color.background.brand.subtle.pressed,
      },
      secondary: {
        color: theme.sqwTier2Color.text.default,
        default: theme.sqwTier2Color.background.brand.subtle.default,
        hovered: theme.sqwTier2Color.background.neutral.subtle.default,
        pressed: theme.sqwTier2Color.background.neutral.subtle.hovered,
      },
      warning: {
        color: theme.sqwTier2Color.background.warning.bold.default,
        default: theme.sqwTier2Color.background.brand.subtle.default,
        hovered: withOpacity(theme.sqwTier2Color.background.warning.bold.default, subtleOpacityModifier),
        pressed: withOpacity(theme.sqwTier2Color.background.warning.bold.pressed, subtleOpacityModifier),
      },
      danger: {
        color: theme.sqwTier2Color.background.error.bold.default,
        default: theme.sqwTier2Color.background.brand.subtle.default,
        hovered: withOpacity(theme.sqwTier2Color.background.error.bold.default, subtleOpacityModifier),
        pressed: withOpacity(theme.sqwTier2Color.background.error.bold.pressed, subtleOpacityModifier),
      },
      info: {
        color: theme.sqwTier2Color.background.info.bold.default,
        default: theme.sqwTier2Color.background.brand.subtle.default,
        hovered: withOpacity(theme.sqwTier2Color.background.info.bold.default, subtleOpacityModifier),
        pressed: withOpacity(theme.sqwTier2Color.background.info.bold.pressed, subtleOpacityModifier),
      },
      success: {
        color: theme.sqwTier2Color.background.success.bold.default,
        default: theme.sqwTier2Color.background.brand.subtle.default,
        hovered: withOpacity(theme.sqwTier2Color.background.success.bold.default, subtleOpacityModifier),
        pressed: withOpacity(theme.sqwTier2Color.background.success.bold.pressed, subtleOpacityModifier),
      },
    },
  };
};
