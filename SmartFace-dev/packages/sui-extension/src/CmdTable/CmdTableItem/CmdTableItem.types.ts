import type { HTMLAttributes } from 'react';

export type CmdTableItemProps = {
  title: string;
  url: string;
  confirmed?: boolean;
  signingUrl?: string;
} & Pick<HTMLAttributes<HTMLButtonElement>, 'onClick'> &
  HTMLAttributes<HTMLDivElement>;
