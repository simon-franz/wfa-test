'use client';

import styled from '@emotion/styled';
import Link from 'next/link';

import { generateButtonStyles } from '@hrworks/sui-core/Button/Button.styles';
import type { ButtonProps } from '@hrworks/sui-core/Button/Button.types';

const BaseButton = styled(Link)<ButtonProps>(({ theme, corner, fullWidth, size, color, variant, textAlign }) =>
  generateButtonStyles({ theme, corner, fullWidth, size, color, variant, textAlign }),
);

export const LinkButton = styled(BaseButton)(({ theme }) => ({
  backgroundColor: theme.stellenportal?.buttonStyle?.color || theme.sqwTier2Color.text.default,
  color: theme.stellenportal?.buttonStyle?.fontStyle?.color || theme.sqwTier2Color.background.brand.bold.default,
  '&&:hover': {
    opacity: 0.8,
  },
}));
