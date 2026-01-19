import type { HTMLAttributes } from 'react';

export type PdfViewerProps = {
  url: string;
  fullHeight?: boolean;
  fileName?: string;
} & HTMLAttributes<HTMLDivElement>;
