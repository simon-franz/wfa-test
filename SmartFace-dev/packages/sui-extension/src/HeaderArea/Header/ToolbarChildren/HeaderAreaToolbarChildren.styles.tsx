import styled from '@emotion/styled';
import { resetListStyles } from '@hrworks/design-system';

const ToolbarChildren = styled.ul([
  resetListStyles,
  {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
]);

export const S = {
  ToolbarChildren,
} as const;
