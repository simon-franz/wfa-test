import type { Theme } from '@emotion/react';
import { withOpacity } from '@hrworks/design-system';
import type { CSSProperties } from 'react';
import type { SetRequired } from 'type-fest';

import type { AccordionItemProps } from './AccordionItem.types';

export const getAccordionColorMap = (
  theme: Theme,
): Record<
  NonNullable<AccordionItemProps['color']>,
  SetRequired<Pick<CSSProperties, 'color' | 'backgroundColor' | 'border'>, 'backgroundColor'>
> => {
  const opacityModifiers = {
    primary: '55%' as const,
    subtle: '30%' as const,
  };

  return {
    primary: {
      color: theme.sqwTier2Color.text.brand.default,
      backgroundColor: theme.sqwTier2Color.background.brand.subtle.hovered,
      border: withOpacity(theme.sqwTier2Color.border.brand.default, opacityModifiers.primary),
    },
    secondary: {
      color: theme.sqwTier2Color.text.default,
      backgroundColor: theme.sqwTier2Color.background.neutral.subtle.default,
      border: theme.sqwTier2Color.border.bold,
    },
    info: {
      color: theme.sqwTier2Color.text.info.default,
      backgroundColor: theme.sqwTier2Color.background.info.subtle,
      border: withOpacity(theme.sqwTier2Color.border.info, opacityModifiers.subtle),
    },
    success: {
      color: theme.sqwTier2Color.text.success.default,
      backgroundColor: theme.sqwTier2Color.background.success.subtle,
      border: withOpacity(theme.sqwTier2Color.border.success, opacityModifiers.subtle),
    },
    warning: {
      color: theme.sqwTier2Color.text.warning.default,
      backgroundColor: theme.sqwTier2Color.background.warning.subtle,
      border: withOpacity(theme.sqwTier2Color.border.warning, opacityModifiers.subtle),
    },
    danger: {
      color: theme.sqwTier2Color.text.error.default,
      backgroundColor: theme.sqwTier2Color.background.error.subtle,
      border: withOpacity(theme.sqwTier2Color.border.error, opacityModifiers.subtle),
    },
  };
};
