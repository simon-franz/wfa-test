import { generateLoremWords } from '@hrworks/sui-shared/functions/stringGenerator';

import { preset } from '../../utils/preset';
import type { PdfViewerBackendProps } from '@hrworks/smartface/adapters/extension/PdfViewerAdapter/PdfViewerAdapter.types';

export const pdfViewerDefaultProps: PdfViewerBackendProps = {
  url: preset.pdfUrl,
  fileName: generateLoremWords(),
  fullHeight: false,
};
