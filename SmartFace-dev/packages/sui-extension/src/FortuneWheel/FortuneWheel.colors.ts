import type { Theme } from '@emotion/react';

export const getFortuneWheelColorMap = (theme: Theme) =>
  ({
    primary: {
      color: theme.sqwTier2Color.text.brand.default,
      backgroundColor: theme.sqwTier2Color.background.brand.subtle.hovered,
      borderColor: theme.sqwTier2Color.border.brand.default,
    },
    secondary: {
      color: theme.sqwTier2Color.text.subtle,
      backgroundColor: theme.sqwTier2Color.background.neutral.subtle.default,
      borderColor: theme.sqwTier2Color.border.input,
    },
    info: {
      color: theme.sqwTier2Color.text.info.default,
      backgroundColor: theme.sqwTier2Color.background.info.subtle,
      borderColor: theme.sqwTier2Color.border.info,
    },
    success: {
      color: theme.sqwTier2Color.text.success.default,
      backgroundColor: theme.sqwTier2Color.background.success.subtle,
      borderColor: theme.sqwTier2Color.border.success,
    },
    warning: {
      color: theme.sqwTier2Color.text.warning.default,
      backgroundColor: theme.sqwTier2Color.background.warning.subtle,
      borderColor: theme.sqwTier2Color.border.warning,
    },
    danger: {
      color: theme.sqwTier2Color.text.error.default,
      backgroundColor: theme.sqwTier2Color.background.error.subtle,
      borderColor: theme.sqwTier2Color.border.error,
    },
    alternating: {
      color: theme.sqwTier2Color.text.brand.pressed,
      backgroundColor: theme.sqwTier2Color.background.brand.subtle.pressed,
      borderColor: theme.sqwTier2Color.border.brand.default,
    },
  }) as const;
