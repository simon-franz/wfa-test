// @ts-check

import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @template { import('../../../src/adapters/extension/PdfViewerAdapter/PdfViewerAdapter.types').PdfViewerBackendDefinition } PdfViewerBackendDefinition
 * @param { PdfViewerBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param {string} [dataGuideId]
 * @returns { PdfViewerBackendDefinition }
 */
export function pdfViewerFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory('PdfViewer', { ...props }, sfId, dataGuideId);
}
