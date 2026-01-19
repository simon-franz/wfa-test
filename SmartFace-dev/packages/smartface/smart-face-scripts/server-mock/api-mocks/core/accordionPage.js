// @ts-check

import {
  accordionFactory,
  accordionItemFactory,
} from '../../../../shared/smartFaceComponentFactories/core/accordionFactory.js';
import { badgeFactory } from '../../../../shared/smartFaceComponentFactories/core/badgeFactory.js';
import { buttonFactory } from '../../../../shared/smartFaceComponentFactories/core/buttonFactory.js';
import { cardFactory } from '../../../../shared/smartFaceComponentFactories/core/cardFactory.js';
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { dateRangeFieldFactory } from '../../../../shared/smartFaceComponentFactories/core/dateRangeFieldFactory.js';
import { fontAwesomeIconFactory } from '../../../../shared/smartFaceComponentFactories/core/fontAwesomeIconFactory.js';
import { gridFactory, gridItemFactory } from '../../../../shared/smartFaceComponentFactories/core/gridFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { textFactory } from '../../../../shared/smartFaceComponentFactories/core/textFactory.js';
import { tooltipFactory } from '../../../../shared/smartFaceComponentFactories/core/tooltipFactory.js';
import { waypointFactory } from '../../../../shared/smartFaceComponentFactories/core/waypointFactory.js';
import { footer } from '../shared/footer.js';
import { sidebar } from '../shared/sidebar.js';

/**
 * @type { import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType }
 */
export const accordionPage = smartFaceFactory({
  sfComponents: [
    pageFactory({
      document: { head: { title: 'Accordion Page' } },
      componentChildren: [
        classicLayoutFactory({
          sidebar: sidebar('accordion-page', ['component-pages']),
          content: {
            componentChildren: [
              gridFactory({
                items: [
                  // HRanalytics / Error message ISSUE
                  gridItemFactory({
                    size: 12,
                    componentChildren: [
                      cardFactory(
                        {
                          title: 'FailedFloatingValidation-test-area',
                          bodyChildren: [
                            accordionFactory(
                              {
                                expandedItemSfIds: ['accordion-7-item-1', 'accordion-7-item-2'],
                                items: [
                                  accordionItemFactory(
                                    {
                                      componentChildren: [
                                        dateRangeFieldFactory({
                                          value: { from: '1900-03-25', to: '2100-03-25' },
                                          label: 'Max-Value invalid',
                                          name: 'dateRangeField-20',
                                          // maxValue: 'ridiculous',
                                        }),
                                        dateRangeFieldFactory({
                                          value: { from: '1900-03-25', to: '2100-03-25' },
                                          label: 'Max-Value invalid',
                                          name: 'dateRangeField-20',
                                          // maxValue: 'ridiculous',
                                        }),
                                      ],
                                      title: 'Accordion item with 2 dateRangeFields',
                                    },
                                    'accordion-7-item-1',
                                    'data-guide-test',
                                  ),
                                  accordionItemFactory(
                                    {
                                      title: 'This item follows the first one',
                                    },
                                    'accordion-7-item-2',
                                  ),
                                ],
                              },
                              undefined,
                              'data-guide-test',
                            ),
                          ],
                        },
                        undefined,
                        'data-guide-test',
                      ),
                    ],
                  }),
                  gridItemFactory({
                    size: 12,
                    componentChildren: [
                      cardFactory({
                        title: 'Open accordion item programmatically',
                        icon: fontAwesomeIconFactory(),
                        bodyChildren: [
                          accordionFactory(
                            {
                              itemSpacing: true,
                              expandedItemSfIds: ['accordion-1-item-2'],
                              items: [
                                accordionItemFactory(
                                  {
                                    componentChildren: [
                                      textFactory({
                                        htmlTag: 'p',
                                        fontSize: 'extraLarge',
                                        color: 'warning',
                                        text: 'WAYPOINT - Notification Triggert',
                                      }),
                                      waypointFactory(
                                        {
                                          onEnter: [
                                            {
                                              type: 'request',
                                              data: {
                                                customString: '>>> Waypoint Inside Accordion <<<',
                                                action: 'accordion-page',
                                                pageEvent: 'waypoint-notification',
                                              },
                                            },
                                          ],
                                        },
                                        'waypoint-0',
                                      ),
                                    ],
                                  },
                                  'accordion-1-item-1',
                                ),
                                accordionItemFactory({}, 'accordion-1-item-2'),
                                accordionItemFactory(
                                  { preventExpand: true, componentChildren: [buttonFactory()] },
                                  'accordion-1-item-3',
                                ),
                              ],
                            },
                            'accordion-1',
                          ),
                        ],
                        footerChildren: [
                          gridFactory({
                            rowGap: 'extraSmall',
                            columnGap: 'extraSmall',
                            items: [
                              gridItemFactory({
                                componentChildren: [
                                  buttonFactory({
                                    text: 'Open first accordion item',
                                    onClick: [
                                      {
                                        type: 'request',
                                        data: { action: 'accordion-page', targetId: '11', pageEvent: 'open' },
                                      },
                                    ],
                                  }),
                                ],
                              }),
                              gridItemFactory({
                                componentChildren: [
                                  buttonFactory({
                                    text: 'Open second accordion item',
                                    onClick: [
                                      {
                                        type: 'request',
                                        data: { action: 'accordion-page', targetId: '12', pageEvent: 'open' },
                                      },
                                    ],
                                  }),
                                ],
                              }),
                              gridItemFactory({
                                componentChildren: [
                                  buttonFactory({
                                    text: 'Open third accordion item',
                                    onClick: [
                                      {
                                        type: 'request',
                                        data: { action: 'accordion-page', targetId: '13', pageEvent: 'open' },
                                      },
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                        toolbarChildren: [
                          gridFactory({
                            columnGap: 'small',
                            items: [
                              gridItemFactory({
                                componentChildren: [
                                  tooltipFactory({
                                    text: 'Image is Bro/ken',
                                    componentChildren: [badgeFactory({ text: 'Image Status', color: 'success' })],
                                  }),
                                ],
                              }),
                              gridItemFactory({
                                componentChildren: [badgeFactory({ text: 'Health Checker', color: 'success' })],
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
                        title: 'Add accordion items',
                        bodyChildren: [
                          accordionFactory(
                            {
                              items: [accordionItemFactory()],
                            },
                            'accordion-2',
                          ),
                        ],
                        footerChildren: [
                          gridFactory({
                            rowGap: 'extraSmall',
                            columnGap: 'extraSmall',
                            items: [
                              gridItemFactory({
                                componentChildren: [
                                  buttonFactory({
                                    text: 'Add accordion item',
                                    onClick: [
                                      {
                                        type: 'request',
                                        data: { action: 'accordion-page', targetId: '20', pageEvent: 'append-single' },
                                      },
                                    ],
                                  }),
                                ],
                              }),

                              gridItemFactory({
                                componentChildren: [
                                  buttonFactory({
                                    text: 'Add multiple expanded accordion items (only the last item should be open)',
                                    onClick: [
                                      {
                                        type: 'request',
                                        data: {
                                          action: 'accordion-page',
                                          targetId: '20',
                                          pageEvent: 'append-multiple',
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
                  gridItemFactory({
                    size: 12,
                    componentChildren: [
                      cardFactory({
                        title:
                          'Events (both items are programmatically opened at start, only the last item should be open)',
                        bodyChildren: [
                          accordionFactory({
                            expandedItemSfIds: ['accordion-3-item-1', 'accordion-3-item-2'],
                            items: [
                              accordionItemFactory(
                                {
                                  onCollapse: [
                                    {
                                      type: 'request',
                                      data: { action: 'accordion-page', targetId: '31', pageEvent: 'collapse' },
                                    },
                                  ],
                                  onAfterExpand: [
                                    {
                                      type: 'request',
                                      data: { action: 'accordion-page', targetId: '31', pageEvent: 'expand' },
                                    },
                                  ],
                                  onAfterInitialExpand: [
                                    {
                                      type: 'request',
                                      data: { action: 'accordion-page', targetId: '31', pageEvent: 'initial-expand' },
                                    },
                                  ],
                                  title: 'Accordion item',
                                },
                                'accordion-3-item-1',
                              ),
                              accordionItemFactory(
                                {
                                  onCollapse: [
                                    {
                                      type: 'request',
                                      data: { action: 'accordion-page', targetId: '32', pageEvent: 'collapse' },
                                    },
                                  ],
                                  onAfterExpand: [
                                    {
                                      type: 'request',
                                      data: { action: 'accordion-page', targetId: '32', pageEvent: 'expand' },
                                    },
                                  ],
                                  onAfterInitialExpand: [
                                    {
                                      type: 'request',
                                      data: { action: 'accordion-page', targetId: '32', pageEvent: 'initial-expand' },
                                    },
                                  ],
                                  title:
                                    'This item is opened at start. The above item should be closed and labeled "Accordion item"',
                                },
                                'accordion-3-item-2',
                              ),
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
                        title: 'Programmatically open an item with expand event',
                        bodyChildren: [
                          accordionFactory(
                            {
                              items: [
                                accordionItemFactory(
                                  {
                                    title: 'Opening this open while being open should not fire an expand event again',
                                    onCollapse: [
                                      {
                                        type: 'request',
                                        data: { action: 'accordion-page', targetId: '41', pageEvent: 'collapse' },
                                      },
                                    ],
                                    onAfterExpand: [
                                      {
                                        type: 'request',
                                        data: { action: 'accordion-page', targetId: '41', pageEvent: 'counted-expand' },
                                      },
                                    ],
                                    onAfterInitialExpand: [
                                      {
                                        type: 'request',
                                        data: {
                                          action: 'accordion-page',
                                          targetId: '41',
                                          pageEvent: 'counted-initial-expand',
                                        },
                                      },
                                    ],
                                  },
                                  'accordion-4-item-1',
                                ),
                                accordionItemFactory(),
                              ],
                            },
                            'accordion-4',
                          ),
                        ],
                        footerChildren: [
                          gridFactory({
                            rowGap: 'extraSmall',
                            columnGap: 'extraSmall',
                            items: [
                              gridItemFactory({
                                componentChildren: [
                                  buttonFactory({
                                    text: 'Open first accordion item',
                                    onClick: [
                                      {
                                        type: 'request',
                                        data: { action: 'accordion-page', targetId: '41', pageEvent: 'open' },
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
                    size: 12,
                    componentChildren: [
                      cardFactory({
                        title: 'Change multiple mode',
                        bodyChildren: [
                          accordionFactory(
                            {
                              items: [accordionItemFactory(), accordionItemFactory()],
                            },
                            'accordion-5',
                          ),
                        ],
                        footerChildren: [
                          gridFactory({
                            rowGap: 'extraSmall',
                            columnGap: 'extraSmall',
                            items: [
                              gridItemFactory({
                                componentChildren: [
                                  buttonFactory(
                                    {
                                      text: 'Change multiple mode to true',
                                      onClick: [
                                        {
                                          type: 'request',
                                          data: {
                                            action: 'accordion-page',
                                            targetId: '51',
                                            pageEvent: 'toggle-multiple',
                                          },
                                        },
                                      ],
                                    },
                                    'accordion-5-button-1',
                                  ),
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
                        title: 'Event Testing',
                        bodyChildren: [
                          accordionFactory(
                            {
                              // expandedItemSfIds: ['accordion-6-item-1'],
                              items: [
                                accordionItemFactory(
                                  {
                                    title: 'BeforeInitial / AfterInitial && Before / After Event Item',
                                    preventInitialExpand: false,
                                    preventExpand: false,
                                    onBeforeInitialExpand: [
                                      {
                                        type: 'request',
                                        data: {
                                          action: 'reflect',
                                          reflectedData: {
                                            sideEffects: [
                                              {
                                                type: 'javaScriptExecutor',
                                                javaScript: `function() { console.log("BEFORE INITAL EVENT") }`,
                                              },
                                            ],
                                          },
                                        },
                                      },
                                    ],
                                    onBeforeExpand: [
                                      {
                                        type: 'request',
                                        data: {
                                          action: 'reflect',
                                          reflectedData: {
                                            sideEffects: [
                                              {
                                                type: 'javaScriptExecutor',
                                                javaScript: `function() { console.log("BEFORE EVENT") }`,
                                              },
                                            ],
                                          },
                                        },
                                      },
                                    ],
                                    onAfterInitialExpand: [
                                      {
                                        type: 'request',
                                        data: {
                                          action: 'reflect',
                                          reflectedData: {
                                            sideEffects: [
                                              {
                                                type: 'javaScriptExecutor',
                                                javaScript: `function() { console.log("AFTER INITIAL EVENT") }`,
                                              },
                                            ],
                                          },
                                        },
                                      },
                                    ],
                                    onAfterExpand: [
                                      {
                                        type: 'request',
                                        data: {
                                          action: 'reflect',
                                          reflectedData: {
                                            sideEffects: [
                                              {
                                                type: 'javaScriptExecutor',
                                                javaScript: `function() { console.log("AFTER EVENT") }`,
                                              },
                                            ],
                                          },
                                        },
                                      },
                                    ],
                                    onCollapse: [
                                      {
                                        type: 'request',
                                        data: {
                                          action: 'reflect',
                                          reflectedData: {
                                            sideEffects: [
                                              {
                                                type: 'javaScriptExecutor',
                                                javaScript: `function() { console.log("COLLAPSE EVENT") }`,
                                              },
                                            ],
                                          },
                                        },
                                      },
                                    ],
                                  },
                                  'accordion-6-item-1',
                                ),
                                accordionItemFactory(
                                  {
                                    title: 'Accordion: only Collapse Events',
                                    onCollapse: [
                                      {
                                        type: 'request',
                                        data: {
                                          action: 'reflect',
                                          reflectedData: {
                                            sideEffects: [
                                              {
                                                type: 'javaScriptExecutor',
                                                javaScript: `function() { console.log("COLLAPSE EVENT") }`,
                                              },
                                            ],
                                          },
                                        },
                                      },
                                    ],
                                  },
                                  'accordion-6-item-2',
                                ),
                                accordionItemFactory(
                                  {
                                    title: 'Accordion: only Collapse Events',
                                    onCollapse: [
                                      {
                                        type: 'request',
                                        data: {
                                          action: 'reflect',
                                          reflectedData: {
                                            sideEffects: [
                                              {
                                                type: 'javaScriptExecutor',
                                                javaScript: `function() { console.log("COLLAPSE EVENT") }`,
                                              },
                                            ],
                                          },
                                        },
                                      },
                                    ],
                                  },
                                  'accordion-6-item-3',
                                ),
                              ],
                            },
                            'accordion-6',
                          ),
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
