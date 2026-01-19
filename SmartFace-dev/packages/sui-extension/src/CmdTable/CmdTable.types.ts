import type { HTMLAttributes } from 'react';

export type CmdTableProps = {
  documentsCount: number;
  confirmedDocumentsCount: number;
} & HTMLAttributes<HTMLDivElement>;
