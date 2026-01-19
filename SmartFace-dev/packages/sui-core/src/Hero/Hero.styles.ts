import styled from '@emotion/styled';
import { withOpacity } from '@hrworks/design-system';
import { mq } from '@hrworks/design-system/mediaQueries';

import type { HeroProps } from './Hero.types';

const Container = styled.div<HeroProps>(({ theme, src }) => ({
  position: 'relative',
  display: 'flex',
  flexShrink: 0,
  flexDirection: 'column',
  padding: 40,

  [mq.isSmallDevice]: {
    padding: theme.marko.variables.spacing.distance.extraLarge,
  },

  ...(src && {
    backgroundImage: `url(${src})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  }),

  '::after': {
    content: '""',
    inset: 0,
    position: 'absolute',
    background: `linear-gradient(185deg, ${withOpacity('black', '10%')} 18%, ${withOpacity('black', '80%')} 100%)`,
  },
}));

const ChildrenWrapper = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.marko.variables.spacing.distance.extraLarge,
  zIndex: 1,
}));

export const S = {
  Container,
  ChildrenWrapper,
} as const;
