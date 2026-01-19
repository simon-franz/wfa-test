import styled from '@emotion/styled';

import type { IframeProps } from './Iframe.types';

const Iframe = styled.iframe<Pick<IframeProps, 'fullHeight'>>(({ fullHeight }) => ({
  display: 'block',
  width: '100%',
  border: 0,
  height: fullHeight ? '100%' : 500,
}));

export const S = {
  Iframe,
} as const;
