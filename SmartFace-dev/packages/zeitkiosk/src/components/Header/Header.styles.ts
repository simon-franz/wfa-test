import styled from '@emotion/styled';
import { mq } from '@hrworks/design-system';

import { Title as _Title } from '../Typography/Title';

const Container = styled.header(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '2rem',
  width: '100%',
  padding: '1rem 2rem',
  [mq.isSmallDevice]: {
    gap: '1rem',
    padding: '0.5rem 1rem',
  },
  borderBottom: `1px solid ${theme.sqwTier2Color.border.bold}`,
}));

const LogoWrapper = styled.div({
  flex: 1,
});

const Logo = styled.img({
  maxHeight: 28,
  maxWidth: 154,
});

const TitleWrapper = styled.div({
  flex: 1,
});

const Title = styled(_Title)({
  display: 'flex',
  justifyContent: 'flex-end',
});

export const S = {
  Container,
  LogoWrapper,
  Logo,
  TitleWrapper,
  Title,
} as const;
