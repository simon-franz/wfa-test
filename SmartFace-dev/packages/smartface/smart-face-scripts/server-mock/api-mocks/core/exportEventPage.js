// @ts-check
import { buttonFactory } from '../../../../shared/smartFaceComponentFactories/core/buttonFactory.js';
import { cardFactory } from '../../../../shared/smartFaceComponentFactories/core/cardFactory.js';
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { gridFactory, gridItemFactory } from '../../../../shared/smartFaceComponentFactories/core/gridFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { footer } from '../shared/footer.js';
import { sidebar } from '../shared/sidebar.js';

const host = 'localhost';
// const host = '192.168.6.24';
const port = '4000';

// const host = '172.29.47.249';
// const port = '3000';

/**
 * @type { import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType.js').SmartFaceBackendDataType }
 */
export const exportEventPage = smartFaceFactory({
  sfComponents: [
    pageFactory({
      document: { head: { title: 'Export Event Page' } },
      componentChildren: [
        classicLayoutFactory({
          sidebar: sidebar('component-page', ['sidebarParent']),
          content: {
            componentChildren: [
              gridFactory({
                items: [
                  gridItemFactory({
                    size: { sm: 12, lg: 6 },
                    componentChildren: [
                      cardFactory({
                        title: 'mode: download - Internal Files',
                        bodyChildren: [
                          gridFactory({
                            items: [
                              gridItemFactory({
                                size: 'grow',
                                componentChildren: [
                                  buttonFactory({
                                    text: 'Internal-Download: jpg',
                                    onClick: [
                                      {
                                        type: 'file-export',
                                        url: `http://${host}:${port}/api/file-export`,
                                        mode: 'download',
                                        data: { type: 'internal', fileType: 'jpg' },
                                      },
                                    ],
                                  }),
                                ],
                              }),
                              gridItemFactory({
                                size: 'grow',
                                componentChildren: [
                                  buttonFactory({
                                    text: 'Internal-Download: jpeg',
                                    onClick: [
                                      {
                                        type: 'file-export',
                                        url: `http://${host}:${port}/api/file-export`,
                                        mode: 'download',
                                        data: { type: 'internal', fileType: 'jpeg' },
                                      },
                                    ],
                                  }),
                                ],
                              }),
                              gridItemFactory({
                                size: 'grow',
                                componentChildren: [
                                  buttonFactory({
                                    text: 'Internal-Download: png',
                                    onClick: [
                                      {
                                        type: 'file-export',
                                        url: `http://${host}:${port}/api/file-export`,
                                        mode: 'download',
                                        data: { type: 'internal', fileType: 'png' },
                                      },
                                    ],
                                  }),
                                ],
                              }),
                              gridItemFactory({
                                size: 'grow',
                                componentChildren: [
                                  buttonFactory({
                                    text: 'Internal-Download: svg',
                                    onClick: [
                                      {
                                        type: 'file-export',
                                        url: `http://${host}:${port}/api/file-export`,
                                        mode: 'download',
                                        data: { type: 'internal', fileType: 'svg' },
                                      },
                                    ],
                                  }),
                                ],
                              }),
                              gridItemFactory({
                                size: 'grow',
                                componentChildren: [
                                  buttonFactory({
                                    text: 'Internal-Download: pdf',
                                    onClick: [
                                      {
                                        type: 'file-export',
                                        url: `http://${host}:${port}/api/file-export`,
                                        mode: 'download',
                                        data: { type: 'internal', fileType: 'pdf' },
                                      },
                                    ],
                                  }),
                                ],
                              }),
                              gridItemFactory({
                                size: 'grow',
                                componentChildren: [
                                  buttonFactory({
                                    text: 'Internal-Download: gif',
                                    onClick: [
                                      {
                                        type: 'file-export',
                                        url: `http://${host}:${port}/api/file-export`,
                                        mode: 'download',
                                        data: { type: 'internal', fileType: 'gif' },
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
                  gridItemFactory({
                    size: { sm: 12, lg: 6 },
                    componentChildren: [
                      cardFactory({
                        title: 'mode: download - External Files',
                        bodyChildren: [
                          gridFactory({
                            items: [
                              gridItemFactory({
                                size: 'grow',
                                componentChildren: [
                                  buttonFactory({
                                    text: 'External-Download: jpg',
                                    onClick: [
                                      {
                                        type: 'file-export',
                                        url: `http://${host}:${port}/api/file-export`,
                                        mode: 'download',
                                        data: { type: 'external', fileType: 'jpg' },
                                      },
                                    ],
                                  }),
                                ],
                              }),
                              gridItemFactory({
                                size: 'grow',
                                componentChildren: [
                                  buttonFactory({
                                    text: 'External-Download: jpeg',
                                    onClick: [
                                      {
                                        type: 'file-export',
                                        url: `http://${host}:${port}/api/file-export`,
                                        mode: 'download',
                                        data: { type: 'external', fileType: 'jpeg' },
                                      },
                                    ],
                                  }),
                                ],
                              }),
                              gridItemFactory({
                                size: 'grow',
                                componentChildren: [
                                  buttonFactory({
                                    text: 'External-Download: png',
                                    onClick: [
                                      {
                                        type: 'file-export',
                                        url: `http://${host}:${port}/api/file-export`,
                                        mode: 'download',
                                        data: { type: 'external', fileType: 'png' },
                                      },
                                    ],
                                  }),
                                ],
                              }),
                              gridItemFactory({
                                size: 'grow',
                                componentChildren: [
                                  buttonFactory({
                                    text: 'External-Download: svg',
                                    onClick: [
                                      {
                                        type: 'file-export',
                                        url: `http://${host}:${port}/api/file-export`,
                                        mode: 'download',
                                        data: { type: 'external', fileType: 'svg' },
                                      },
                                    ],
                                  }),
                                ],
                              }),
                              gridItemFactory({
                                size: 'grow',
                                componentChildren: [
                                  buttonFactory({
                                    text: 'External-Download: pdf',
                                    onClick: [
                                      {
                                        type: 'file-export',
                                        url: `http://${host}:${port}/api/file-export`,
                                        mode: 'download',
                                        data: { type: 'external', fileType: 'pdf' },
                                      },
                                    ],
                                  }),
                                ],
                              }),
                              gridItemFactory({
                                size: 'grow',
                                componentChildren: [
                                  buttonFactory({
                                    text: 'External-Download: gif',
                                    onClick: [
                                      {
                                        type: 'file-export',
                                        url: `http://${host}:${port}/api/file-export`,
                                        mode: 'download',
                                        data: { type: 'external', fileType: 'gif' },
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
                  gridItemFactory({
                    size: { sm: 12, lg: 6 },
                    componentChildren: [
                      cardFactory({
                        title: 'mode: print - Internal Files - test',
                        bodyChildren: [
                          gridFactory({
                            items: [
                              gridItemFactory({
                                size: 'grow',
                                componentChildren: [
                                  buttonFactory({
                                    text: 'Internal-Print: jpg',
                                    onClick: [
                                      {
                                        type: 'file-export',
                                        url: `http://${host}:${port}/api/file-export`,
                                        mode: 'print',
                                        data: { type: 'internal', fileType: 'jpg' },
                                      },
                                    ],
                                  }),
                                ],
                              }),
                              gridItemFactory({
                                size: 'grow',
                                componentChildren: [
                                  buttonFactory({
                                    text: 'Internal-Print: jpeg',
                                    onClick: [
                                      {
                                        type: 'file-export',
                                        url: `http://${host}:${port}/api/file-export`,
                                        mode: 'print',
                                        data: { type: 'internal', fileType: 'jpeg' },
                                      },
                                    ],
                                  }),
                                ],
                              }),
                              gridItemFactory({
                                size: 'grow',
                                componentChildren: [
                                  buttonFactory({
                                    text: 'Internal-Print: png',
                                    onClick: [
                                      {
                                        type: 'file-export',
                                        url: `http://${host}:${port}/api/file-export`,
                                        mode: 'print',
                                        data: { type: 'internal', fileType: 'png' },
                                      },
                                    ],
                                  }),
                                ],
                              }),
                              gridItemFactory({
                                size: 'grow',
                                componentChildren: [
                                  buttonFactory({
                                    text: 'Internal-Print: svg',
                                    onClick: [
                                      {
                                        type: 'file-export',
                                        url: `http://${host}:${port}/api/file-export`,
                                        mode: 'print',
                                        data: { type: 'internal', fileType: 'svg' },
                                      },
                                    ],
                                  }),
                                ],
                              }),
                              gridItemFactory({
                                size: 'grow',
                                componentChildren: [
                                  buttonFactory({
                                    text: 'Internal-Print: pdf',
                                    onClick: [
                                      {
                                        type: 'file-export',
                                        url: `http://${host}:${port}/api/file-export`,
                                        mode: 'print',
                                        data: { type: 'internal', fileType: 'pdf' },
                                      },
                                    ],
                                  }),
                                ],
                              }),
                              gridItemFactory({
                                size: 'grow',
                                componentChildren: [
                                  buttonFactory({
                                    text: 'Internal-Print: gif',
                                    onClick: [
                                      {
                                        type: 'file-export',
                                        url: `http://${host}:${port}/api/file-export`,
                                        mode: 'print',
                                        data: { type: 'internal', fileType: 'gif' },
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
                  gridItemFactory({
                    size: { sm: 12, lg: 6 },
                    componentChildren: [
                      cardFactory({
                        title: 'mode: print - External Files',
                        bodyChildren: [
                          gridFactory({
                            items: [
                              gridItemFactory({
                                size: 'grow',
                                componentChildren: [
                                  buttonFactory({
                                    text: 'External-Print: jpg',
                                    onClick: [
                                      {
                                        type: 'file-export',
                                        url: `http://${host}:${port}/api/file-export`,
                                        mode: 'print',
                                        data: { type: 'external', fileType: 'jpg' },
                                      },
                                    ],
                                  }),
                                ],
                              }),
                              gridItemFactory({
                                size: 'grow',
                                componentChildren: [
                                  buttonFactory({
                                    text: 'External-Print: jpeg',
                                    onClick: [
                                      {
                                        type: 'file-export',
                                        url: `http://${host}:${port}/api/file-export`,
                                        mode: 'print',
                                        data: { type: 'external', fileType: 'jpeg' },
                                      },
                                    ],
                                  }),
                                ],
                              }),
                              gridItemFactory({
                                size: 'grow',
                                componentChildren: [
                                  buttonFactory({
                                    text: 'External-Print: png',
                                    onClick: [
                                      {
                                        type: 'file-export',
                                        url: `http://${host}:${port}/api/file-export`,
                                        mode: 'print',
                                        data: { type: 'external', fileType: 'png' },
                                      },
                                    ],
                                  }),
                                ],
                              }),
                              gridItemFactory({
                                size: 'grow',
                                componentChildren: [
                                  buttonFactory({
                                    text: 'External-Print: svg',
                                    onClick: [
                                      {
                                        type: 'file-export',
                                        url: `http://${host}:${port}/api/file-export`,
                                        mode: 'print',
                                        data: { type: 'external', fileType: 'svg' },
                                      },
                                    ],
                                  }),
                                ],
                              }),
                              gridItemFactory({
                                size: 'grow',
                                componentChildren: [
                                  buttonFactory({
                                    text: 'External-Print: pdf',
                                    onClick: [
                                      {
                                        type: 'file-export',
                                        url: `http://${host}:${port}/api/file-export`,
                                        mode: 'print',
                                        data: { type: 'external', fileType: 'pdf' },
                                      },
                                    ],
                                  }),
                                ],
                              }),
                              gridItemFactory({
                                size: 'grow',
                                componentChildren: [
                                  buttonFactory({
                                    text: 'External-Print: gif',
                                    onClick: [
                                      {
                                        type: 'file-export',
                                        url: `http://${host}:${port}/api/file-export`,
                                        mode: 'print',
                                        data: { type: 'external', fileType: 'gif' },
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
          footer,
        }),
      ],
    }),
  ],
});
