// @ts-check

import { buttonFactory } from '../../../../shared/smartFaceComponentFactories/core/buttonFactory.js';
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { gridFactory, gridItemFactory } from '../../../../shared/smartFaceComponentFactories/core/gridFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { sidebar } from '../shared/sidebar.js';

/**
 * @type { import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType }
 */
export const networkErrorPage = smartFaceFactory({
  sfComponents: [
    pageFactory({
      document: { head: { title: 'Network Error Page' } },
      componentChildren: [
        classicLayoutFactory({
          sidebar: sidebar('network-error-page'),
          content: {
            componentChildren: [
              gridFactory({
                items: [
                  gridItemFactory({
                    componentChildren: [
                      gridFactory({
                        rowGap: 'extraSmall',
                        columnGap: 'extraSmall',
                        items: [
                          gridItemFactory({
                            componentChildren: [
                              buttonFactory({
                                text: 'Click for network response',
                                color: 'success',
                                onClick: [{ type: 'request', data: { action: 'return-empty' } }],
                              }),
                            ],
                          }),
                          gridItemFactory({
                            componentChildren: [
                              buttonFactory({
                                text: 'Click for not found',
                                color: 'danger',
                                onClick: [{ type: 'request', data: { action: '404' } }],
                              }),
                            ],
                          }),
                          gridItemFactory({
                            componentChildren: [
                              buttonFactory({
                                text: 'Click for timeout',
                                color: 'warning',
                                onClick: [{ type: 'request', data: { action: 'timeout' } }],
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
