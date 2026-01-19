import styled from '@emotion/styled';
import { resetListStyles } from '@hrworks/design-system/stylePresets';

import { HrworksUserWhatsNewStyles } from '../../';

const TagList = styled.ul(({ theme }) => [
  resetListStyles,
  HrworksUserWhatsNewStyles.sharedFontStyles,
  {
    textWrap: 'nowrap',
    fontWeight: 700,
    display: 'flex',
    fontSize: 17,
    color: theme.marko.colors.palette.neutral[6],
    overflowX: 'hidden',

    'li:not(:last-child)::after': {
      content: '"-"',
      padding: `0 ${theme.marko.variables.spacing.distance.small}px`,
    },
  },
]);

const ListItem = styled.li<{
  hide?: boolean;
}>(({ hide }) => ({
  ...(hide && {
    visibility: 'hidden',
  }),
}));

export const S = {
  TagList,
  ListItem,
} as const;
