import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

import Icon from '@hrworks/sui-core/Icon';
import axios from 'axios';
import debounce from 'lodash/debounce';
import times from 'lodash/times';
import { observer } from 'mobx-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { type DocumentProps, pdfjs } from 'react-pdf';

import { PdfViewerPage } from './Page/PdfViewerPage';
import { S } from './PdfViewer.styles';
import type { PdfViewerProps } from './PdfViewer.types';
import { PdfViewerContext } from './PdfViewerContext';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.mjs`;

type PdfViewerState = {
  numPages: number;
  activePageNumber: number;
  width: number;
  pageInfo: { width: number; height: number }[];
};

export const PdfViewer = observer(({ url, fileName, ...otherProps }: PdfViewerProps) => {
  const [{ numPages, activePageNumber, width, pageInfo }, setPdfViewerState] = useState<PdfViewerState>({
    numPages: 0,
    activePageNumber: 1,
    width: 0,
    pageInfo: [],
  });

  const pdfViewerRef = useRef<HTMLDivElement>(null);
  const scrollableElementRef = useRef<HTMLDivElement>(null);

  const onDocumentLoadSuccess = (doc: Parameters<Required<DocumentProps>['onLoadSuccess']>[0]) => {
    setPdfViewerState((prevState) => ({
      ...prevState,
      numPages: doc.numPages,
      pageInfo: Array.from({ length: doc.numPages }, () => ({ width: 0, height: 0 })),
    }));
  };

  const updatePageInfo = useCallback((pageNumber: number, width: number, height: number) => {
    setPdfViewerState((prevState) => {
      const newPageInfo = [...prevState.pageInfo];
      newPageInfo[pageNumber - 1] = { width, height };

      return { ...prevState, pageInfo: newPageInfo };
    });
  }, []);

  const updateActivePageNumber = useCallback((pageNumber: number) => {
    setPdfViewerState((prevState) => ({
      ...prevState,
      activePageNumber: pageNumber,
    }));
  }, []);

  const handleDownload = useCallback(() => {
    axios.get(url, { responseType: 'blob' }).then((res) => {
      const href = URL.createObjectURL(res.data);
      const link = document.createElement('a');
      link.href = href;
      link.download = fileName || url.slice(url.lastIndexOf('/'));
      link.click();
      URL.revokeObjectURL(href);
    });
  }, [fileName, url]);

  const updateViewerSize = useCallback(() => {
    const doc = pdfViewerRef.current;
    if (doc) {
      const newWidth = doc.clientWidth > 1000 ? 1000 : doc.clientWidth;
      setPdfViewerState((prevState) => ({
        ...prevState,
        width: newWidth,
      }));
    }
  }, []);

  const updatePageOnScroll = useCallback(() => {
    if (!scrollableElementRef.current || pageInfo.some((info) => info.height === 0)) return;

    const { scrollTop, clientHeight } = scrollableElementRef.current;
    let accumulatedHeight = 0;
    let page = 1;

    for (const [index, info] of pageInfo.entries()) {
      const scaleFactor = width / info.width;
      const scaledHeight = info.height * scaleFactor;

      if (accumulatedHeight + scaledHeight > scrollTop + clientHeight / 2) {
        page = index + 1;
        break;
      }
      accumulatedHeight += scaledHeight;
    }

    updateActivePageNumber(page);
  }, [pageInfo, width, updateActivePageNumber]);

  useEffect(() => {
    updateViewerSize();
    const debouncedOnResize = debounce(updateViewerSize, 500);
    window.addEventListener('resize', debouncedOnResize);

    return () => {
      window.removeEventListener('resize', debouncedOnResize);
    };
  }, [updateViewerSize]);

  useEffect(() => {
    const scroller = scrollableElementRef.current;
    if (scroller) {
      const debouncedOnScroll = debounce(updatePageOnScroll, 50);
      scroller.addEventListener('scroll', debouncedOnScroll);

      return () => scroller.removeEventListener('scroll', debouncedOnScroll);
    }
  }, [updatePageOnScroll]);

  return (
    <PdfViewerContext.Provider value={{ updateActivePageNumber, activePageNumber: activePageNumber, updatePageInfo }}>
      <S.PdfViewerWrapper ref={pdfViewerRef} {...otherProps}>
        <S.ToolBar>
          <S.DownloadButton size="large" variant="filled" color="secondary" onClick={handleDownload}>
            <Icon name="pdf-download" />
          </S.DownloadButton>
          <S.PageCount>{`${activePageNumber} / ${numPages}`}</S.PageCount>
        </S.ToolBar>
        <S.OuterDiv ref={scrollableElementRef}>
          <S.StyledDocument file={url} onLoadSuccess={onDocumentLoadSuccess}>
            {numPages &&
              times(numPages, (pageNumber) => (
                <S.Page key={`page-${pageNumber}`}>
                  <PdfViewerPage pageNumber={pageNumber + 1} width={width} />
                </S.Page>
              ))}
          </S.StyledDocument>
        </S.OuterDiv>
      </S.PdfViewerWrapper>
    </PdfViewerContext.Provider>
  );
});
