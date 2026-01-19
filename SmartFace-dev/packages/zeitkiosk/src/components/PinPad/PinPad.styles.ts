import styled from '@emotion/styled';
import { mq } from '@hrworks/design-system';
import _Button from '@hrworks/sui-core/Button';

import { Card } from '../Card';

const PinPadContainer = styled(Card)({
  alignItems: 'center',
  gap: '3rem',
  [mq.isSmallDevice]: {
    gap: '1.5rem',
  },
  paddingTop: 0,
});

const ButtonContainer = styled.div({
  display: 'flex',
  gap: '2rem',
});

const Button = styled(_Button)(({ theme }) => ({
  ...theme.sqwTier2Typography.headingMd,
  padding: '0.625rem 0.75rem',
  borderRadius: 6,
  [mq.isSmallDevice]: {
    ...theme.sqwTier2Typography.labelMd,
  },
}));

export const S = {
  PinPadContainer,
  ButtonContainer,
  Button,
} as const;
