import styled from '@emotion/styled';
import { shouldForwardProp } from '@hrworks/design-system/emotionUtils';

import { Scroller as _Scroller } from '../Scroller';

const Scroller = styled(_Scroller, {
  shouldForwardProp,
})<{
  $fullHeight?: boolean;
}>(({ $fullHeight }) => ({
  position: 'relative',
  ...($fullHeight
    ? {
        height: '100%',
      }
    : {
        maxHeight: 500,
      }),
}));

type Table = {
  layout?: 'auto' | 'fixed';
  fullHeight?: boolean;
};

const Table = styled.table<Table>(({ theme, layout, fullHeight }) => ({
  backgroundColor: theme.sqwTier2Color.surface.sunken,
  ...(fullHeight && {
    position: 'absolute',
  }),
  width: '100%',
  borderCollapse: 'collapse',
  ...(layout === 'fixed' && {
    tableLayout: 'fixed',
  }),
}));

export const S = {
  Scroller,
  Table,
} as const;
