import styled from '@emotion/styled';

const Divider = styled.hr(({ theme }) => ({
  border: 'none',
  height: 1,
  backgroundColor: theme.sqwTier2Color.border.bold,
}));

export const S = {
  Divider,
} as const;
