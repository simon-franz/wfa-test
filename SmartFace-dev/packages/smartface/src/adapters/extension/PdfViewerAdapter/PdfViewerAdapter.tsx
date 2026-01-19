import { PdfViewer } from '@hrworks/sui-extension/PdfViewer/PdfViewer';
import { observer } from 'mobx-react';

import type { PdfViewerAdapterProps } from './PdfViewerAdapter.types';

export const PdfViewerAdapter = observer(({ url = '', ...otherProps }: PdfViewerAdapterProps) => (
  <PdfViewer url={url} {...otherProps} />
));
