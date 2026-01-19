import styled from '@emotion/styled';
import { mq, resetListStyles } from '@hrworks/design-system';
import TitleComponent from '@hrworks/sui-core/Title';

import { Card as _Card } from '../Card';

const Card = styled(_Card)(({ theme }) => ({
  [mq.conditionalTransition]: {
    transition: `transform ${theme.marko.variables.animationDuration.long}`,
  },
  willChange: 'transform',
  ':hover': {
    transform: 'scale(1.01)',
    cursor: 'pointer',
  },
}));

const Title = styled(TitleComponent)(({ theme }) => theme.sqwTier2Typography.headingMd);

const Content = styled.div(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 250px',
  gap: 80,
  [mq.isSmallDevice]: {
    gridTemplateColumns: '1fr',
    gap: theme.marko.variables.spacing.distance.small,
  },
}));

const Main = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: theme.marko.variables.spacing.distance.small,
}));

const Description = styled.div({
  margin: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  ul: [resetListStyles],
});

const Sidebar = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.marko.variables.spacing.distance.extraSmall,
  [mq.isSmallDevice]: {
    flexDirection: 'row',
  },
}));

// TODO: Remove if there will be no styles applied in the future
const SidebarElement = styled.div({});

export const S = {
  Card,
  Title,
  Content,
  Main,
  Description,
  Sidebar,
  SidebarElement,
} as const;
