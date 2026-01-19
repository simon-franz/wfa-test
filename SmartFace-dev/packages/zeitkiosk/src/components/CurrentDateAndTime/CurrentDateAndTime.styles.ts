import styled from '@emotion/styled';
import { mq } from '@hrworks/design-system';

const Container = styled.div(({ theme }) => ({
  ...theme.sqwTier2Typography.headingMd,
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  fontVariantNumeric: 'tabular-nums',
  [mq.isSmallDevice]: {
    ...theme.sqwTier2Typography.labelMd,
  },
}));

export const S = {
  Container,
} as const;
