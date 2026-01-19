// @ts-check

import {
  accordionFactory,
  accordionItemFactory,
} from '../../../../shared/smartFaceComponentFactories/core/accordionFactory.js';
import { buttonFactory } from '../../../../shared/smartFaceComponentFactories/core/buttonFactory.js';
import { cardFactory } from '../../../../shared/smartFaceComponentFactories/core/cardFactory.js';
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { gridFactory, gridItemFactory } from '../../../../shared/smartFaceComponentFactories/core/gridFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { footer } from '../shared/footer.js';
import { sidebar } from '../shared/sidebar.js';

/**
 * @type { import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType }
 */
export const eventTest = smartFaceFactory({
  sfComponents: [
    pageFactory({
      document: { head: { title: 'Event Test Page' } },
      componentChildren: [
        classicLayoutFactory({
          sidebar: sidebar('event-test-page', []),
          content: {
            componentChildren: [
              gridFactory({
                items: [
                  gridItemFactory({
                    size: 12,
                    componentChildren: [
                      cardFactory(
                        {
                          title: 'Events are delayed by 2 seconds',
                          toolbarChildren: [
                            buttonFactory({
                              text: 'Fire Event',
                              onClick: [
                                {
                                  // type: 'request', // as comment to test default behaviour.
                                  url: 'event-test-backend',
                                  data: { sfId: 'card-0', text: 'This took two seconds' },
                                },
                              ],
                            }),
                          ],
                          bodyChildren: [],
                        },
                        'card-0',
                      ),
                    ],
                  }),
                  gridItemFactory({
                    size: 12,
                    componentChildren: [
                      cardFactory(
                        {
                          title: 'Parallel events are executed at the same time',
                          toolbarChildren: [
                            buttonFactory({
                              text: 'Fire Event',
                              onClick: [
                                {
                                  type: 'request',
                                  url: 'event-test-backend',
                                  data: { sfId: 'card-1', text: 'This took two seconds' },
                                },
                                {
                                  type: 'request',
                                  url: 'event-test-backend',
                                  data: { sfId: 'card-1', text: 'This took two seconds' },
                                },
                                {
                                  type: 'request',
                                  url: 'event-test-backend',
                                  data: { sfId: 'card-1', text: 'This took two seconds' },
                                },
                              ],
                            }),
                          ],
                          bodyChildren: [],
                        },
                        'card-1',
                      ),
                    ],
                  }),
                  gridItemFactory({
                    size: 12,
                    componentChildren: [
                      cardFactory(
                        {
                          title: 'Chained events are executed consecutively',
                          toolbarChildren: [
                            buttonFactory({
                              text: 'Fire Event',
                              onClick: [
                                {
                                  type: 'request',
                                  url: 'event-test-backend',
                                  blockUi: false,
                                  data: { sfId: 'card-2', text: 'This took two seconds' },
                                  childEvents: [
                                    {
                                      type: 'request',
                                      url: 'event-test-backend',
                                      sendBackendPatches: false,
                                      blockUi: false,
                                      data: { sfId: 'card-2', text: 'This took four seconds' },
                                      childEvents: [
                                        {
                                          type: 'request',
                                          url: 'event-test-backend',
                                          data: { sfId: 'card-2', text: 'This took eight seconds', duration: 4000 },
                                        },
                                      ],
                                    },
                                    {
                                      type: 'request',
                                      url: 'event-test-backend',
                                      blockUi: false,
                                      data: { sfId: 'card-2', text: 'This took six seconds', duration: 4000 },
                                    },
                                  ],
                                },
                              ],
                            }),
                          ],
                          bodyChildren: [],
                        },
                        'card-2',
                      ),
                    ],
                  }),
                  gridItemFactory({
                    size: 12,
                    componentChildren: [accordionFactory({ items: [accordionItemFactory(), accordionItemFactory()] })],
                  }),
                  gridItemFactory({
                    size: 12,
                    componentChildren: [accordionFactory({ items: [accordionItemFactory(), accordionItemFactory()] })],
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
