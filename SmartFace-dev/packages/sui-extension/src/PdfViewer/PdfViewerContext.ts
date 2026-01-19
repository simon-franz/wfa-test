import { createContext } from 'react';

export type PdfViewerContext = {
  updateActivePageNumber: (pageNumber: number) => void;
  updatePageInfo: (pageNumber: number, width: number, height: number) => void;
  activePageNumber: number;
};

export const PdfViewerContext = createContext<PdfViewerContext>({} as PdfViewerContext);
