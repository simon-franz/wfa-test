import styled from '@emotion/styled';
import { resetListStyles } from '@hrworks/design-system/stylePresets';

import type { ListProps } from './List.types';

const List = styled.ul<Pick<Required<ListProps>, 'lineStyle'>>(({ theme, lineStyle }) => [
  resetListStyles,
  {
    backgroundColor: theme.sqwTier2Color.surface.sunken,
    '> :not(:last-child)': {
      borderBottom: `1px solid ${theme.sqwTier2Color.border.bold}`,
      borderBottomStyle: lineStyle,
    },
  },
]);

export const S = {
  List,
} as const;
