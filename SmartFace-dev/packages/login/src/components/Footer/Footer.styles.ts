import styled from '@emotion/styled';
import { mq } from '@hrworks/design-system';

const FooterContainer = styled.footer({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 4,
  alignItems: 'center',
  justifyContent: 'center',

  [mq.isSmallDevice]: {
    paddingTop: 30,
  },
});

const Separator = styled.span(({ theme }) => ({
  display: 'inline-block',
  width: 5,
  height: 1,
  backgroundColor: theme.sqwTier2Color.background.neutral.bold,
  margin: '0 2px',
}));

export const S = {
  FooterContainer,
  Separator,
} as const;
