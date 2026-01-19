import styled from '@emotion/styled';
import _Button from '@hrworks/sui-core/Button';

const Button = styled(_Button)(({ theme }) => ({
  backgroundColor: theme.stellenportal?.buttonStyle?.color || theme.sqwTier2Color.text.default,
  color: theme.stellenportal?.buttonStyle?.fontStyle?.color || theme.sqwTier2Color.background.brand.bold.default,
  '&&:hover': {
    opacity: 0.8,
  },
}));

export const S = {
  Button,
} as const;
