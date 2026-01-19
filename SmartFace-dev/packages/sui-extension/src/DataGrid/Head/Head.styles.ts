import styled from '@emotion/styled';

const Head = styled.div(({ theme }) => ({
  ...theme.sqwTier2Typography.labelMdSemibold,
  position: 'sticky',
  zIndex: 1,
  top: 0,
  display: 'grid',
}));

export const S = {
  Head,
} as const;
