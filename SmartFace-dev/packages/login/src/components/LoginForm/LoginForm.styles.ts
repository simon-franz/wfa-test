import styled from '@emotion/styled';
import { mq } from '@hrworks/design-system';
import Grid from '@hrworks/sui-core/Grid';
import { Title as _Title } from '@hrworks/sui-core/Title/Title';

// TODO: Remove Styling when Title Tokens are implemented https://hrworks.atlassian.net/browse/FE-3258
const Title = styled(_Title)(({ theme }) => ({
  ...theme.sqwTier2Typography.title,
  color: theme.sqwTier2Color.text.subtle,
  [mq.isSmallDevice]: {
    ...theme.sqwTier2Typography.headingLg,
  },
}));

const AnimatedGrid = styled(Grid)<{ isVisible: boolean }>(({ theme, isVisible }) => ({
  transitionProperty: 'opacity, transform, visibility',
  transitionDuration: theme.marko.variables.animationDuration.normal,
  ...(!isVisible && {
    visibility: 'hidden',
    transform: 'translateY(-10px)',
    opacity: 0,
  }),
}));

export const S = {
  Title,
  AnimatedGrid,
} as const;
