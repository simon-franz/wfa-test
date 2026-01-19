import styled from '@emotion/styled';
import { generateShadowStyles, mq, overflowHyphens, resetListStyles } from '@hrworks/design-system';

const IconContainer = styled.span({
  pointerEvents: 'none',
});

const IconWrapper = styled.span<{
  open: boolean;
}>(({ theme, open }) => ({
  display: 'inline-flex',
  [mq.conditionalTransition]: {
    transition: `transform ${theme.marko.variables.animationDuration.normal}`,
  },
  ...(open && {
    transform: 'rotateX(180deg)',
  }),
}));

const ListWrapper = styled.div(({ theme }) => [
  overflowHyphens,
  generateShadowStyles({
    theme,
    variant: 'default',
  }),
  {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.sqwTier2Color.background.input,
    border: `1px solid ${theme.sqwTier2Color.border.bold}`,
    paddingTop: theme.marko.variables.spacing.distance.extraSmall,
    paddingBottom: theme.marko.variables.spacing.distance.extraSmall,
    borderRadius: 6,
  },
]);

const List = styled.ul([resetListStyles]);

export const S = {
  IconContainer,
  IconWrapper,
  ListWrapper,
  List,
} as const;
