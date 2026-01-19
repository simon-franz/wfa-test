import type { PropsWithChildren, ReactNode } from 'react';

export type ConditionalWrapperProps = PropsWithChildren<{
  condition: boolean;
  wrapper: (children: ReactNode) => ReactNode;
}>;
