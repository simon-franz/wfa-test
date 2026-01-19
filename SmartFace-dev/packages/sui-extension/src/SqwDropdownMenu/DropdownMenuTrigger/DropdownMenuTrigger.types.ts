import type { HTMLAttributes, ReactNode } from 'react';

export type DropdownMenuTriggerProps = {
  // eslint-disable-next-line @stylistic/ts/object-curly-newline
  children: ReactNode | ((renderProps: { open: boolean }) => ReactNode);
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;
