import { observer } from 'mobx-react';
import { useCallback, useContext } from 'react';
import { Page } from 'react-pdf';

import { PdfViewerContext } from '../PdfViewerContext';
import type { PdfViewerPageProps } from './PdfViewerPage.types';

export const PdfViewerPage = observer(({ pageNumber, width, ...otherProps }: PdfViewerPageProps) => {
  const { updatePageInfo } = useContext(PdfViewerContext);

  const onLoadSuccess = useCallback(
    ({ width: pageWidth, height }: { width: number; height: number }) => {
      updatePageInfo(pageNumber, pageWidth, height);
    },
    [pageNumber, updatePageInfo],
  );

  return (
    <div data-pdf-page={pageNumber} {...otherProps}>
      <Page pageNumber={pageNumber} width={width} onLoadSuccess={onLoadSuccess} />
    </div>
  );
});
