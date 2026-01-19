import { css, type SerializedStyles } from '@emotion/react';

import type { SmartFaceTheme } from '../types';

type BaseParams = {
  theme: SmartFaceTheme;
  variant?: 'default' | 'light' | 'medium';
  type?: 'box' | 'drop';
};

// Overload signatures
export function generateShadowStyles(params: BaseParams & { returnType: 'shadow-value' }): string;

export function generateShadowStyles(params: BaseParams & { returnType?: 'emotion' }): SerializedStyles;

export function generateShadowStyles({
  theme,
  variant = 'default',
  type = 'box',
  returnType = 'emotion',
}: BaseParams & { returnType?: 'emotion' | 'shadow-value' }) {
  const shadowColor = theme.sqwTier2Color.surface.elevation.shadow;
  const shadowVariants = {
    default: `0 0 7px  ${shadowColor}`,
    light: `0 0 3px  ${shadowColor}`,
    medium: `0 0 25px ${shadowColor}`,
  } as const;

  const shadowValue = shadowVariants[variant];

  if (returnType === 'shadow-value') {
    return type === 'box' ? shadowValue : `drop-shadow(${shadowValue})`;
  }

  return css({
    ...(type === 'box' ? { boxShadow: shadowValue } : { filter: `drop-shadow(${shadowValue})` }),
  });
}
