import styled from '@emotion/styled';

const IconWrapper = styled.div(({ theme }) => ({
  fontSize: '3rem',
  color: theme.sqwTier2Color.icon.error.default,
}));

export const S = {
  IconWrapper,
} as const;
