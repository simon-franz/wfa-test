// @ts-check

import { cardFactory } from '../../../../shared/smartFaceComponentFactories/core/cardFactory.js';
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { gridFactory, gridItemFactory } from '../../../../shared/smartFaceComponentFactories/core/gridFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { textFactory } from '../../../../shared/smartFaceComponentFactories/core/textFactory.js';
import { headerAreaFactory } from '../../../../shared/smartFaceComponentFactories/extension/headerAreaFactory.js';
import { sidebar } from '../shared/sidebar.js';

/**
 * @type { import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType }
 */
export const textPage = smartFaceFactory({
  sfComponents: [
    pageFactory({
      document: { head: { title: 'Text Page' } },
      componentChildren: [
        classicLayoutFactory({
          sidebar: sidebar('text', ['component-pages']),
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
                                    title: 'Text',
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
                    size: 12,
                    componentChildren: [
                      cardFactory({
                        bodyChildren: [
                          textFactory(
                            {
                              text: 'Text with href',
                              variant: 'default',
                              color: 'danger',
                              href: 'https://www.merkur.de/welt/pfefferminze-verleihnix-nicht-jeder-name-kinder-erlaubt-356463.html',
                              fontWeight: 'normal',
                            },
                            undefined,
                            'data-guide-test',
                          ),
                        ],
                      }),
                    ],
                  }),
                  gridItemFactory({
                    size: 12,
                    componentChildren: [
                      cardFactory({
                        bodyChildren: [
                          gridFactory({
                            items: [
                              gridItemFactory({
                                size: 12,
                                componentChildren: [textFactory({ text: 'Text without href', color: 'danger' })],
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
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
                                  textFactory({
                                    text: 'Text with html <strong>true</strong> ',
                                    color: 'danger',
                                    html: true,
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
