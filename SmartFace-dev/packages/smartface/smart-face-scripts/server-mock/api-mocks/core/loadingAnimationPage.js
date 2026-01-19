import { buttonFactory } from '../../../../shared/smartFaceComponentFactories/core/buttonFactory.js';
import { cardFactory } from '../../../../shared/smartFaceComponentFactories/core/cardFactory.js';
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { gridFactory, gridItemFactory } from '../../../../shared/smartFaceComponentFactories/core/gridFactory.js';
import { loadingAnimationFactory } from '../../../../shared/smartFaceComponentFactories/core/loadingAnimationFactory.js';
import { loadingOverlayFactory } from '../../../../shared/smartFaceComponentFactories/core/loadingOverlayFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import {
  dataFactory,
  dataRowFactory,
  headerFactory,
  headerRowFactory,
  tableFactory,
} from '../../../../shared/smartFaceComponentFactories/core/tableFactory.js';
import { textFactory } from '../../../../shared/smartFaceComponentFactories/core/textFactory.js';
import { sidebar } from '../shared/sidebar.js';

/**
 * @type { import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType }
 */
export const loadingAnimationPage = smartFaceFactory({
  sfComponents: [
    pageFactory({
      document: { head: { title: 'Loading Animations Page' } },
      componentChildren: [
        classicLayoutFactory({
          sidebar: sidebar('loading-animation-page', ['component-pages']),
          content: {
            componentChildren: [
              gridFactory({
                items: [
                  gridItemFactory({
                    size: '12',
                    componentChildren: [
                      buttonFactory(
                        {
                          text: 'Stop Loading',
                          size: 'small',
                          color: 'danger',
                          onClick: [
                            {
                              type: 'request',
                              data: {
                                action: 'loading-animation-page',
                                pageEvent: 'buttonPressed',
                              },
                            },
                          ],
                        },
                        'loadingButton',
                      ),
                    ],
                  }),
                  gridItemFactory({
                    size: '6',
                    componentChildren: [
                      cardFactory(
                        {
                          title: 'Shimmer Animation',
                          subtitle: 'default',
                          bodyChildren: [loadingAnimationFactory({}, 'animation1', 'data-guide-test')],
                        },
                        'card1',
                      ),
                    ],
                  }),
                  gridItemFactory({
                    size: '3',
                    componentChildren: [
                      cardFactory(
                        {
                          title: 'Shimmer Animation',
                          subtitle: 'Custom Shimmer Count',
                          bodyChildren: [loadingAnimationFactory({ count: 1 }, 'animation2')],
                        },
                        'card2',
                      ),
                    ],
                  }),
                  gridItemFactory({
                    size: '3',
                    componentChildren: [
                      cardFactory(
                        {
                          title: 'Spinner Animation',
                          bodyChildren: [loadingAnimationFactory({ type: 'spinner' }, 'animation3')],
                        },
                        'card3',
                      ),
                    ],
                  }),
                  gridItemFactory({
                    size: '6',
                    componentChildren: [
                      cardFactory({
                        title: 'Loading Overlay',
                        bodyChildren: [
                          loadingOverlayFactory(
                            {
                              componentChildren: [
                                tableFactory({
                                  headerRows: [
                                    headerRowFactory({
                                      cells: [
                                        headerFactory({
                                          componentChildren: [textFactory({ text: 'Last Christmas' })],
                                        }),
                                        headerFactory({
                                          componentChildren: [textFactory({ text: 'I gave you my heart' })],
                                        }),
                                        headerFactory({
                                          componentChildren: [textFactory({ text: 'But the very next day' })],
                                        }),
                                      ],
                                    }),
                                  ],
                                  dataRows: [
                                    dataRowFactory({
                                      cells: [
                                        dataFactory({
                                          componentChildren: [textFactory({ text: 'you gave it away' })],
                                        }),
                                        dataFactory({
                                          componentChildren: [textFactory({ text: 'This year,' })],
                                        }),
                                        dataFactory({
                                          componentChildren: [textFactory({ text: 'to save me from tears' })],
                                        }),
                                      ],
                                    }),
                                    dataRowFactory({
                                      cells: [
                                        dataFactory({
                                          componentChildren: [textFactory({ text: 'I`ll give it' })],
                                        }),
                                        dataFactory({
                                          componentChildren: [textFactory({ text: 'to someone' })],
                                        }),
                                        dataFactory({
                                          componentChildren: [textFactory({ text: 'special' })],
                                        }),
                                      ],
                                    }),
                                    dataRowFactory({
                                      cells: [
                                        dataFactory({
                                          componentChildren: [textFactory({ text: 'special' })],
                                        }),
                                        dataFactory({
                                          componentChildren: [textFactory({ text: 'special' })],
                                        }),
                                        dataFactory({
                                          componentChildren: [textFactory({ text: 'special' })],
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            },
                            'overlay1',
                            'data-guide-test',
                          ),
                        ],
                      }),
                    ],
                  }),
                  gridItemFactory({
                    size: '6',
                    componentChildren: [
                      loadingOverlayFactory(
                        {
                          componentChildren: [
                            cardFactory({
                              title: 'Loading Overlay',
                              bodyChildren: [
                                tableFactory({
                                  headerRows: [
                                    headerRowFactory({
                                      cells: [
                                        headerFactory({
                                          componentChildren: [textFactory({ text: 'Last Christmas' })],
                                        }),
                                        headerFactory({
                                          componentChildren: [textFactory({ text: 'I gave you my heart' })],
                                        }),
                                        headerFactory({
                                          componentChildren: [textFactory({ text: 'But the very next day' })],
                                        }),
                                      ],
                                    }),
                                  ],
                                  dataRows: [
                                    dataRowFactory({
                                      cells: [
                                        dataFactory({
                                          componentChildren: [textFactory({ text: 'you gave it away' })],
                                        }),
                                        dataFactory({
                                          componentChildren: [textFactory({ text: 'This year,' })],
                                        }),
                                        dataFactory({
                                          componentChildren: [textFactory({ text: 'to save me from tears' })],
                                        }),
                                      ],
                                    }),
                                    dataRowFactory({
                                      cells: [
                                        dataFactory({
                                          componentChildren: [textFactory({ text: 'I`ll give it' })],
                                        }),
                                        dataFactory({
                                          componentChildren: [textFactory({ text: 'to someone' })],
                                        }),
                                        dataFactory({
                                          componentChildren: [textFactory({ text: 'special' })],
                                        }),
                                      ],
                                    }),
                                    dataRowFactory({
                                      cells: [
                                        dataFactory({
                                          componentChildren: [textFactory({ text: 'special' })],
                                        }),
                                        dataFactory({
                                          componentChildren: [textFactory({ text: 'special' })],
                                        }),
                                        dataFactory({
                                          componentChildren: [textFactory({ text: 'special' })],
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        },
                        'overlay2',
                      ),
                    ],
                  }),
                  gridItemFactory({ componentChildren: [loadingOverlayFactory({}, 'overlay3')] }),
                ],
              }),
            ],
          },
        }),
      ],
    }),
  ],
});
