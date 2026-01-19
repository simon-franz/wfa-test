// @ts-check
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { footer } from '../shared/footer.js';
import { getDataGrid } from '../shared/getDataGrid.js';
import { sidebar } from '../shared/sidebar.js';

/** @type {import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType}  */
export const dataGridFullHeightPage = smartFaceFactory({
  sfComponents: [
    pageFactory({
      document: { head: { title: 'Data Grid Full Height Page' } },
      componentChildren: [
        classicLayoutFactory({
          sidebar: sidebar('data-grid-full-height-page', ['data-grid-page', 'component-pages']),
          content: {
            componentChildren: [getDataGrid({ fullHeight: true })],
          },
          footer,
        }),
      ],
    }),
  ],
});
