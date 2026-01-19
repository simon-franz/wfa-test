// @ts-check
import { buttonFactory } from '../../../../shared/smartFaceComponentFactories/core/buttonFactory.js';
import { cardFactory } from '../../../../shared/smartFaceComponentFactories/core/cardFactory.js';
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { gridFactory, gridItemFactory } from '../../../../shared/smartFaceComponentFactories/core/gridFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { headerAreaFactory } from '../../../../shared/smartFaceComponentFactories/extension/headerAreaFactory.js';
import { pdfViewerFactory } from '../../../../shared/smartFaceComponentFactories/extension/pdfViewerFactory.js';
import { patchFactory } from '../shared/patchFactory.js';
import { sidebar } from '../shared/sidebar.js';

/**
 * @type { import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType }
 */
export const pdfViewerPage = smartFaceFactory({
  sfComponents: [
    pageFactory({
      document: { head: { title: 'PdfViewer Page' } },
      componentChildren: [
        classicLayoutFactory({
          sidebar: sidebar('pdfViewer', ['component-pages']),
          content: {
            componentChildren: [
              gridFactory({
                items: [
                  // HeaderArea
                  gridItemFactory({
                    size: 12,
                    componentChildren: [
                      cardFactory({
                        bodyChildren: [
                          gridFactory({
                            items: [
                              gridItemFactory({
                                size: 12,
                                componentChildren: [
                                  headerAreaFactory({
                                    title: 'PdfViewer',
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  // PdfViewer
                  gridItemFactory({
                    size: 12,
                    componentChildren: [
                      cardFactory({
                        bodyChildren: [
                          gridFactory({
                            items: [
                              gridItemFactory({
                                size: 12,
                                componentChildren: [
                                  pdfViewerFactory(
                                    {
                                      url: 'https://api.printnode.com/static/test/pdf/multipage.pdf',
                                    },
                                    'pdfViewer-0',
                                    'data-guide-test',
                                  ),
                                ],
                              }),
                            ],
                          }),
                        ],
                        footerChildren: [
                          gridFactory({
                            items: [
                              gridItemFactory({
                                size: 'auto',
                                componentChildren: [
                                  buttonFactory({
                                    text: 'OnePager Pdf',
                                    onClick: [
                                      {
                                        type: 'request',
                                        data: {
                                          action: 'reflect',
                                          reflectedData: patchFactory([
                                            {
                                              operation: 'write',
                                              targetSfId: 'pdfViewer-0',
                                              path: 'props.url',
                                              value: 'https://d9yw7530xbzu.cloudfront.net/assets/HelloWorld.pdf',
                                            },
                                          ]),
                                        },
                                      },
                                    ],
                                  }),
                                ],
                              }),
                              gridItemFactory({
                                size: 'auto',
                                componentChildren: [
                                  buttonFactory({
                                    text: 'MultiPager Pdf',
                                    onClick: [
                                      {
                                        type: 'request',
                                        data: {
                                          action: 'reflect',
                                          reflectedData: patchFactory([
                                            {
                                              operation: 'write',
                                              targetSfId: 'pdfViewer-0',
                                              path: 'props.url',
                                              value: 'https://api.printnode.com/static/test/pdf/multipage.pdf',
                                            },
                                          ]),
                                        },
                                      },
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          },
        }),
      ],
    }),
  ],
});
