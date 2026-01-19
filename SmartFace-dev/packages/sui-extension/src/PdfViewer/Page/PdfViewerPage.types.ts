import type { HTMLAttributes } from 'react';

export type PdfViewerPageProps = {
  pageNumber: number;
  width: number;
} & HTMLAttributes<HTMLDivElement>;
