import type { Theme } from '@emotion/react';

export const getWorkflowGraphColorMap = (theme: Theme) => ({
  neutral: theme.sqwTier2Color.surface.raised,
  primary: theme.sqwTier2Color.background.brand.bold.default,
  secondary: theme.sqwTier2Color.background.neutral.subtle.default,
  info: theme.sqwTier2Color.background.info.bold.default,
  success: theme.sqwTier2Color.background.success.bold.default,
  warning: theme.sqwTier2Color.background.warning.bold.default,
  danger: theme.sqwTier2Color.background.error.bold.default,
});
