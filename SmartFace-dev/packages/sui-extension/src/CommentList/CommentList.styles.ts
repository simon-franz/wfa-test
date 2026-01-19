import styled from '@emotion/styled';
import { resetListStyles } from '@hrworks/design-system/stylePresets';

const CommentList = styled.ul(({ theme }) => [
  resetListStyles,
  {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.marko.variables.spacing.distance.extraLarge,
  },
]);

export const S = {
  CommentList,
} as const;
