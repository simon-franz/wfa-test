import styled from '@emotion/styled';
import _Title from '@hrworks/sui-core/Title';

const Title = styled(_Title)(({ theme }) => ({
  ...theme.sqwTier2Typography.headingMdSemibold,
  fontSize: 'clamp(0.875rem, 1rem, 3vw)',
  color: theme.sqwTier2Color.text.brand.default,
}));

export const S = {
  Title,
} as const;
