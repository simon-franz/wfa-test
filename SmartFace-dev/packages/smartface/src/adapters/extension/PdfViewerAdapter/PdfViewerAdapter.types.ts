import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';

export type PdfViewerBackendProps = {
  url: string;
  fullHeight?: boolean;
  fileName?: string;
};

export type PdfViewerBackendDefinition = SmartFaceBackendComponent<'PdfViewer', PdfViewerBackendProps>;

export type PdfViewerAdapterProps = SmartFaceAdapterPropsType<PdfViewerBackendDefinition>;
