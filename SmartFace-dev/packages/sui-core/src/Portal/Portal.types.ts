import type { ReactNode } from 'react';

export type PortalProps =
  | {
      container?: never;
      selector?: string;
      children?: ReactNode;
    }
  | {
      container?: Element;
      selector?: never;
      children?: ReactNode;
    };
