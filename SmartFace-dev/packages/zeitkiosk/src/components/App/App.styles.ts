import styled from '@emotion/styled';
import { Scroller as _Scroller } from '@hrworks/sui-core/Scroller';

const Scroller = styled(_Scroller)({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  flex: 1,
});

export const S = {
  Scroller,
} as const;
