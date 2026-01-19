import styled from '@emotion/styled';
import { mq } from '@hrworks/design-system';

import TitleComponent from '../../Title';
import type { HeroTitleProps } from './HeroTitle.types';

const TitleContainer = styled.div<Pick<HeroTitleProps, 'alignTitle'>>(({ alignTitle }) => ({
  width: '70%',
  display: 'flex',
  flexDirection: 'column',
  alignSelf: alignTitle,
  [mq.isSmallDevice]: {
    width: '100%',
  },
}));

const Title = styled(TitleComponent)(({ theme }) => ({
  ...theme.sqwTier2Typography.headingMdSemibold,
  fontWeight: 900,
  fontSize: 96,

  [mq.isSmallDevice]: {
    fontSize: 28,
  },
}));

const Subtitle = styled(TitleComponent)(({ theme }) => ({
  ...theme.sqwTier2Typography.headingMdSemibold,
  fontSize: 24,

  [mq.isSmallDevice]: {
    fontSize: 14,
  },
}));

export const S = {
  TitleContainer,
  Title,
  Subtitle,
} as const;
