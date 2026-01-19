import styled from '@emotion/styled';

import { Scroller as _Scroller } from '../../Scroller';

const TabList = styled(_Scroller)(({ theme }) => ({
  backgroundColor: 'transparent',
  display: 'flex',
  whiteSpace: 'nowrap',
  gap: theme.marko.variables.spacing.distance.extraLarge,
  height: 'auto',
  borderBottom: `1px solid ${theme.sqwTier2Color.border.bold}`,
  flexShrink: 0,
}));

export const S = {
  TabList,
} as const;
