import type { IframeHTMLAttributes } from 'react';

export type IframeProps = {
  title?: string;
  src?: string;
  fullHeight?: boolean;
} & IframeHTMLAttributes<HTMLIFrameElement>;
