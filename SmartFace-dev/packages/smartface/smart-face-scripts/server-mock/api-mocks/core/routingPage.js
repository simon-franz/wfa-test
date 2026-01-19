// @ts-check

import { buttonFactory } from '../../../../shared/smartFaceComponentFactories/core/buttonFactory.js';
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { gridFactory, gridItemFactory } from '../../../../shared/smartFaceComponentFactories/core/gridFactory.js';
import { modalFactory, pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { footer } from '../shared/footer.js';
import { patchFactory } from '../shared/patchFactory.js';
import { sidebar } from '../shared/sidebar.js';

/**
 * @type { import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType }
 */
export const routingPage = smartFaceFactory({
  sfComponents: [
    pageFactory(
      {
        document: { head: { title: 'Routing Page' } },
        componentChildren: [
          classicLayoutFactory({
            sidebar: sidebar('routing-page', ['side-effect-pages']),
            content: {
              componentChildren: [
                gridFactory({
                  items: [
                    gridItemFactory({
                      componentChildren: [
                        buttonFactory({
                          text: 'Push State',
                          color: 'secondary',
                          onClick: [
                            {
                              type: 'request',
                              data: {
                                action: 'reflect',
                                reflectedData: patchFactory(
                                  [
                                    {
                                      targetSfId: 'page-0',
                                      operation: 'append',
                                      path: 'props.modals',
                                      value: modalFactory({
                                        title: 'New Modal from Server',
                                      }),
                                    },
                                  ],
                                  [{ type: 'pushHistoryState', title: 'Modal open (Push)', url: '/modal-open-push' }],
                                ),
                              },
                            },
                          ],
                        }),
                      ],
                    }),

                    gridItemFactory({ size: 12 }),
                    gridItemFactory({
                      componentChildren: [
                        buttonFactory({
                          text: 'Replace State',
                          color: 'secondary',
                          onClick: [
                            {
                              type: 'request',
                              data: {
                                action: 'reflect',
                                reflectedData: patchFactory(
                                  [
                                    {
                                      targetSfId: 'page-0',
                                      operation: 'append',
                                      path: 'props.modals',
                                      value: modalFactory({
                                        title: 'New Modal from Server',
                                      }),
                                    },
                                  ],
                                  [
                                    {
                                      type: 'replaceHistoryState',
                                      title: 'Modal open (Replace)',
                                      url: '/modal-open-replace',
                                    },
                                  ],
                                ),
                              },
                            },
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
      },
      'page-0',
    ),
  ],
});
