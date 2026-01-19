// @ts-check
import getId from '../../../../shared/getId.js';
import { cardFactory } from '../../../../shared/smartFaceComponentFactories/core/cardFactory.js';
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { formTextFactory } from '../../../../shared/smartFaceComponentFactories/core/formTextFactory.js';
import { gridFactory, gridItemFactory } from '../../../../shared/smartFaceComponentFactories/core/gridFactory.js';
import { listFactory, listItemFactory } from '../../../../shared/smartFaceComponentFactories/core/listFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import {
  dataFactory,
  dataRowFactory,
  headerFactory,
  headerRowFactory,
  tableFactory,
} from '../../../../shared/smartFaceComponentFactories/core/tableFactory.js';
import { tabsFactory, tabsItemFactory } from '../../../../shared/smartFaceComponentFactories/core/tabsFactory.js';
import { textFactory } from '../../../../shared/smartFaceComponentFactories/core/textFactory.js';
import { waypointFactory } from '../../../../shared/smartFaceComponentFactories/core/waypointFactory.js';
import { sidebar } from '../shared/sidebar.js';
import { buttonFactory } from './../../../../shared/smartFaceComponentFactories/core/buttonFactory.js';
import times from 'lodash/times.js';

// Helper-Stuff
const dummyText =
  'Aardvark, Alligator, Antelope, Baboon, Bison, Butterfly, Cheetah, Chimpanzee, Cobra, Dolphin, Duck, Dingo, Elephant, Eagle, Eel, Flamingo, Fox, Frog, Giraffe, Gorilla, Goose, Hippopotamus, Hyena, Hedgehog, Iguana, Impala, Ibis, Jaguar, Jellyfish, Jackal, Kangaroo, Koala, Kiwi, Lion, Lemur, Llama, Monkey, Moose, Macaw, Narwhal, Newt, Nightingale, Octopus, Orangutan, Ostrich, Penguin, Panther, Parrot, Quail, Quokka, Quetzal, Rabbit, Raccoon, Rhinoceros, Shark, Squirrel, Seahorse, Tiger, Tortoise, Toucan, Urial, Umbrellabird, Unicornfish, Vulture, Viper, Vicuna, Whale, Walrus, Wombat, Xerus, X-ray Tetra, Xenops, Yak, Yellowjacket, Yabby, Zebra, Zebu, Zorilla';

const longTextSection = () =>
  textFactory(
    {
      htmlTag: 'p',
      color: 'secondary',
      text: dummyText + dummyText + dummyText + dummyText + dummyText + dummyText,
    },
    getId(),
  );

const waypointWithTitle = (wpProps, tProps, customId) => {
  const waypointProps = wpProps || {
    onEnter: [
      {
        type: 'request',
        data: {
          action: 'waypoint-page',
          pageEvent: 'waypoint-notification',
        },
      },
    ],
  };
  const titleProps = tProps || {
    htmlTag: 'p',
    fontSize: 'extraLarge',
    color: 'warning',
    text: 'WAYPOINT - Triggers Notification',
  };

  return [textFactory({ ...titleProps }), waypointFactory({ ...waypointProps }, customId || getId())];
};

const defaultTab = tabsItemFactory(
  {
    title: 'Default',
    componentChildren: [
      textFactory({
        htmlTag: 'p',
        fontSize: 'extraLarge',
        color: 'success',
        text: "Description: Waypoint's fire on each onEnter/onIntersection",
      }),
      ...waypointWithTitle(),
      longTextSection(),
      ...waypointWithTitle(
        { onEnter: undefined },
        {
          htmlTag: 'p',
          fontSize: 'extraLarge',
          color: 'secondary',
          text: 'WAYPOINT - Does nothing',
        },
      ),
      longTextSection(),
      ...waypointWithTitle(
        { onEnter: undefined },
        {
          htmlTag: 'p',
          fontSize: 'extraLarge',
          color: 'secondary',
          text: 'WAYPOINT - Does nothing',
        },
      ),
      longTextSection(),
      ...waypointWithTitle(),
      longTextSection(),
      ...waypointWithTitle(),
      longTextSection(),
      ...waypointWithTitle(),
      longTextSection(),
      ...waypointWithTitle(),
      longTextSection(),
      ...waypointWithTitle(),
    ],
  },
  'tabItem-0',
);

const triggerOnce = tabsItemFactory(
  {
    title: 'Trigger once',
    componentChildren: [
      textFactory({
        htmlTag: 'p',
        fontSize: 'extraLarge',
        color: 'success',
        text: "Description: Waypoint's fire only once onEnter/onIntersection",
      }),
      // Once & toggelable
      ...waypointWithTitle(
        {
          repeatOnEnter: false,
          onEnter: [
            {
              type: 'request',
              blockUi: false,
              data: {
                backendLoad: 1000,
                customString: '>> onEnter <<',
                action: 'waypoint-page',
                pageEvent: 'waypoint-notification',
              },
            },
          ],
        },
        {
          htmlTag: 'p',
          fontSize: 'extraLarge',
          color: 'warning',
          text: 'WAYPOINT - Toggle repeatOnEnter via Buttons below',
        },
        'wp-repeat-0',
      ),
      buttonFactory({
        text: 'repeatOnEnter: true',
        color: 'success',
        onClick: [
          {
            type: 'request',
            data: {
              action: 'reflect',
              reflectedData: {
                sideEffects: [
                  {
                    type: 'patch',
                    updates: [
                      {
                        operation: 'write',
                        targetSfId: 'wp-repeat-0',
                        path: 'props.repeatOnEnter',
                        value: true,
                      },
                    ],
                  },
                ],
              },
            },
          },
        ],
      }),
      buttonFactory({
        text: 'repeatOnEnter: false',
        color: 'danger',
        onClick: [
          {
            type: 'request',
            data: {
              action: 'reflect',
              reflectedData: {
                sideEffects: [
                  {
                    type: 'patch',
                    updates: [
                      {
                        operation: 'write',
                        targetSfId: 'wp-repeat-0',
                        path: 'props.repeatOnEnter',
                        value: false,
                      },
                    ],
                  },
                ],
              },
            },
          },
        ],
      }),

      // Only once
      longTextSection(),
      ...waypointWithTitle(
        {
          repeatOnEnter: false,
          onEnter: [
            {
              type: 'request',
              blockUi: false,
              data: {
                backendLoad: 1000,
                customString: '>>> Waypoint - Reached once <<<',
                action: 'waypoint-page',
                pageEvent: 'waypoint-notification',
              },
            },
          ],
        },
        {
          htmlTag: 'p',
          fontSize: 'extraLarge',
          color: 'warning',
          text: 'WAYPOINT - Triggers Notification once',
        },
      ),
      longTextSection(),
      ...waypointWithTitle(
        {
          repeatOnEnter: false,
          onEnter: [
            {
              type: 'request',
              blockUi: false,
              data: {
                backendLoad: 1000,
                customString: '>>> Waypoint - Reached once <<<',
                action: 'waypoint-page',
                pageEvent: 'waypoint-notification',
              },
            },
          ],
        },
        {
          htmlTag: 'p',
          fontSize: 'extraLarge',
          color: 'warning',
          text: 'WAYPOINT - Triggers Notification once',
        },
      ),
      longTextSection(),
      ...waypointWithTitle(
        {
          repeatOnEnter: false,
          onEnter: [
            {
              type: 'request',
              blockUi: false,
              data: {
                backendLoad: 1000,
                customString: '>>> Waypoint - Reached once <<<',
                action: 'waypoint-page',
                pageEvent: 'waypoint-notification',
              },
            },
          ],
        },
        {
          htmlTag: 'p',
          fontSize: 'extraLarge',
          color: 'warning',
          text: 'WAYPOINT - Triggers Notification once',
        },
      ),
    ],
  },
  'tabItem-1',
);
const rootMarginNeg = tabsItemFactory(
  {
    title: 'rootMargin -300px',
    componentChildren: [
      textFactory({
        htmlTag: 'p',
        fontSize: 'extraLarge',
        color: 'success',
        text: "Description: Waypoint's fire 300px after reaching rootContainer/viewport",
      }),
      listFactory(
        {
          lineStyle: 'dashed',
          items: [
            ...times(18, (num) =>
              listItemFactory(
                {
                  title: 'href + blank + onClick = Notification + new Tab',
                  href: '/waypoint',
                  target: '_blank',
                  onClick: [
                    {
                      type: 'request',
                      data: {
                        action: 'reflect',
                        reflectedData: {
                          sideEffects: [
                            {
                              type: 'addNotification',
                              id: 'notification-1',
                              message: 'onClick Triggert!',
                              color: 'danger',
                            },
                          ],
                        },
                      },
                    },
                  ],
                  componentChildren: [
                    formTextFactory({
                      label: `List Item Label - ${num + 1} Formtext Label - href + _blank + onClick `,
                      value: `List Item Value - ${num + 1} Formtext Value - href + _blank + onClick `,
                    }),
                  ],
                },
                `href-test-${getId()}`,
              ),
            ),
            listItemFactory({
              componentChildren: [
                ...waypointWithTitle(
                  {
                    rootMargin: '-300px',
                    onEnter: [
                      {
                        type: 'request',
                        data: {
                          action: 'waypoint-page',
                          pageEvent: 'waypoint-notification',
                        },
                      },
                    ],
                  },
                  {
                    htmlTag: 'p',
                    fontSize: 'extraLarge',
                    color: 'warning',
                    text: ' WAYPOINT - Triggers Notification',
                  },
                ),
              ],
            }),
            ...times(18, (num) =>
              listItemFactory({
                componentChildren: [
                  formTextFactory({
                    label: `List Item Label - ${num + 1} Formtext Label`,
                    value: `List Item Value - ${num + 1} Formtext Value`,
                  }),
                ],
              }),
            ),
            listItemFactory({
              componentChildren: [
                ...waypointWithTitle(
                  {
                    rootMargin: '-300px',
                    onEnter: [
                      {
                        type: 'request',
                        data: {
                          action: 'waypoint-page',
                          pageEvent: 'waypoint-notification',
                        },
                      },
                    ],
                  },
                  {
                    htmlTag: 'p',
                    fontSize: 'extraLarge',
                    color: 'warning',
                    text: ' WAYPOINT - Triggers Notification',
                  },
                ),
              ],
            }),
            ...times(18, (num) =>
              listItemFactory({
                componentChildren: [
                  formTextFactory({
                    label: `List Item Label - ${num + 1} Formtext Label`,
                    value: `List Item Value - ${num + 1} Formtext Value`,
                  }),
                ],
              }),
            ),
            listItemFactory({
              componentChildren: [
                ...waypointWithTitle(
                  {
                    rootMargin: '-300px',
                    onEnter: [
                      {
                        type: 'request',
                        data: {
                          action: 'waypoint-page',
                          pageEvent: 'waypoint-notification',
                        },
                      },
                    ],
                  },
                  {
                    htmlTag: 'p',
                    fontSize: 'extraLarge',
                    color: 'neutral',
                    text: ' WAYPOINT - Probably not triggert (because of -300px rootMargin)',
                  },
                ),
              ],
            }),
          ],
        },
        'wp-list-0',
        'data-guide-waypoint-sfid',
      ),
    ],
  },
  'tabItem-2',
);
const rootMarginPos = tabsItemFactory(
  {
    title: 'rootMargin 200px (Lazy Loading)',
    componentChildren: [
      textFactory({
        htmlTag: 'p',
        fontSize: 'extraLarge',
        color: 'success',
        text: "Description: Waypoint's fire 300px before reaching rootContainer/viewport (LazyLoading)",
      }),
      listFactory(
        {
          lineStyle: 'dashed',
          items: [
            ...times(18, (num) =>
              listItemFactory({
                componentChildren: [
                  formTextFactory({
                    label: `List Item Label - ${num + 1} Formtext Label`,
                    value: `List Item Value - ${num + 1} Formtext Value`,
                  }),
                ],
              }),
            ),
            listItemFactory({
              componentChildren: [
                ...waypointWithTitle(
                  {
                    rootMargin: '200px',
                    onEnter: [
                      {
                        type: 'request',
                        data: {
                          action: 'waypoint-page',
                          targetId: '0',
                          pageEvent: 'append-next-list-items',
                        },
                      },
                    ],
                  },
                  {
                    htmlTag: 'p',
                    fontSize: 'extraLarge',
                    color: 'warning',
                    text: ' WAYPOINT - Next List Items Lazy Loaded',
                  },
                ),
              ],
            }),
            ...times(18, (num) =>
              listItemFactory({
                componentChildren: [
                  formTextFactory({
                    label: `List Item Label - ${num + 1} Formtext Label`,
                    value: `List Item Value - ${num + 1} Formtext Value`,
                  }),
                ],
              }),
            ),
            listItemFactory({
              componentChildren: [
                ...waypointWithTitle(
                  {
                    rootMargin: '200px',
                    onEnter: [
                      {
                        type: 'request',
                        data: {
                          action: 'waypoint-page',
                          targetId: '0',
                          pageEvent: 'append-next-list-items',
                        },
                      },
                    ],
                  },
                  {
                    htmlTag: 'p',
                    fontSize: 'extraLarge',
                    color: 'warning',
                    text: ' WAYPOINT - Next List Items Lazy Loaded',
                  },
                ),
              ],
            }),
            ...times(18, (num) =>
              listItemFactory({
                componentChildren: [
                  formTextFactory({
                    label: `List Item Label - ${num + 1} Formtext Label`,
                    value: `List Item Value - ${num + 1} Formtext Value`,
                  }),
                ],
              }),
            ),
            listItemFactory({
              componentChildren: [
                ...waypointWithTitle(
                  {
                    rootMargin: '200px',
                    onEnter: [
                      {
                        type: 'request',
                        data: {
                          action: 'waypoint-page',
                          targetId: '0',
                          pageEvent: 'append-next-list-items',
                        },
                      },
                    ],
                  },
                  {
                    htmlTag: 'p',
                    fontSize: 'extraLarge',
                    color: 'warning',
                    text: ' WAYPOINT - Next List Items Lazy Loaded',
                  },
                ),
              ],
            }),
          ],
        },
        'wp-list-0',
      ),
    ],
  },
  'tabItem-3',
);

const tableAsRootContainer = tabsItemFactory(
  {
    title: 'Table as rootContainer',
    componentChildren: [
      textFactory({
        htmlTag: 'p',
        fontSize: 'extraLarge',
        color: 'success',
        text: "Description: Waypoint's fire after reaching rootContainer === Table",
      }),
      tableFactory(
        {
          columnDefinitions: [
            { columnIndex: 1, minWidth: '200px' },
            { columnIndex: 2, minWidth: '200px' },
          ],
          headerRows: [
            headerRowFactory({
              cells: [
                headerFactory({
                  componentChildren: [textFactory({ text: 'Title' })],
                }),
                headerFactory({
                  componentChildren: [textFactory({ text: 'Waypoint Comp ?' })],
                }),
              ],
            }),
          ],
          dataRows: [
            ...times(15, () =>
              dataRowFactory({
                cells: [
                  dataFactory({
                    componentChildren: [
                      textFactory({
                        text: ' ~~~~~~~~~~~~~~   ',
                      }),
                    ],
                  }),
                  dataFactory({
                    componentChildren: [textFactory({ text: 'False' })],
                  }),
                ],
              }),
            ),
            dataRowFactory({
              cells: [
                dataFactory({
                  componentChildren: [
                    textFactory({
                      text: ' ---------------   1st Waypoint',
                    }),
                  ],
                }),
                dataFactory({
                  componentChildren: [
                    textFactory({ text: 'True' }),
                    waypointFactory(
                      {
                        rootMargin: '-100px',
                        onEnter: [
                          {
                            type: 'request',
                            data: {
                              action: 'waypoint-page',
                              pageEvent: 'waypoint-notification',
                            },
                          },
                        ],
                      },
                      'waypoint-sfid',
                    ),
                  ],
                }),
              ],
            }),
            ...times(15, () =>
              dataRowFactory({
                cells: [
                  dataFactory({
                    componentChildren: [
                      textFactory({
                        text: ' ~~~~~~~~~~~~~~   ',
                      }),
                    ],
                  }),
                  dataFactory({
                    componentChildren: [textFactory({ text: 'False' })],
                  }),
                ],
              }),
            ),
            dataRowFactory({
              cells: [
                dataFactory({
                  componentChildren: [
                    textFactory({
                      text: ' ---------------   2nd Waypoint',
                    }),
                  ],
                }),
                dataFactory({
                  componentChildren: [
                    textFactory({ text: 'True' }),
                    waypointFactory(
                      {
                        onEnter: [
                          {
                            type: 'request',
                            data: {
                              action: 'waypoint-page',
                              pageEvent: 'waypoint-notification',
                            },
                          },
                        ],
                      },
                      'waypoint-sfid',
                    ),
                  ],
                }),
              ],
            }),
            ...times(8, () =>
              dataRowFactory({
                cells: [
                  dataFactory({
                    componentChildren: [
                      textFactory({
                        text: ' ~~~~~~~~~~~~~~   ',
                      }),
                    ],
                  }),
                  dataFactory({
                    componentChildren: [textFactory({ text: 'False' })],
                  }),
                ],
              }),
            ),
            dataRowFactory({
              cells: [
                dataFactory({
                  componentChildren: [
                    textFactory({
                      text: ' ---------------   3rd Waypoint',
                    }),
                  ],
                }),
                dataFactory({
                  componentChildren: [
                    textFactory({ text: 'True' }),
                    waypointFactory(
                      {
                        onEnter: [
                          {
                            type: 'request',
                            data: {
                              action: 'waypoint-page',
                              pageEvent: 'waypoint-notification',
                            },
                          },
                        ],
                      },
                      'waypoint-sfid',
                    ),
                  ],
                }),
              ],
            }),
          ],
        },
        'table-waypoint-sfid',
      ),
    ],
  },
  'tabItem-4',
);
const onIntersectionOnEnter = tabsItemFactory(
  {
    title: 'onIntersection & onEnter',
    componentChildren: [
      textFactory({
        htmlTag: 'p',
        fontSize: 'extraLarge',
        color: 'secondary',
        text: '>> onIntersection <<',
      }),
      buttonFactory({
        text: 'Add',
        color: 'success',
        onClick: [
          {
            type: 'request',
            data: {
              action: 'reflect',
              reflectedData: {
                sideEffects: [
                  {
                    type: 'patch',
                    updates: [
                      {
                        operation: 'write',
                        targetSfId: 'wp-intersection-0',
                        path: 'props.onIntersection',
                        value: [
                          {
                            type: 'request',
                            blockUi: false,
                            data: {
                              customString: 'onIntersection: Triggert',
                              action: 'waypoint-page',
                              pageEvent: 'waypoint-notification',
                            },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            },
          },
        ],
      }),
      buttonFactory({
        text: 'Remove',
        color: 'danger',
        onClick: [
          {
            type: 'request',
            data: {
              action: 'reflect',
              reflectedData: {
                sideEffects: [
                  {
                    type: 'patch',
                    updates: [
                      {
                        operation: 'delete',
                        targetSfId: 'wp-intersection-0',
                        path: 'props.onIntersection',
                      },
                    ],
                  },
                ],
              },
            },
          },
        ],
      }),
      textFactory({
        htmlTag: 'p',
        fontSize: 'extraLarge',
        color: 'warning',
        text: ' ',
      }),
      textFactory({
        htmlTag: 'p',
        fontSize: 'extraLarge',
        color: 'secondary',
        text: '>> onEnter <<',
      }),
      buttonFactory({
        text: 'Add',
        color: 'success',
        onClick: [
          {
            type: 'request',
            data: {
              action: 'reflect',
              reflectedData: {
                sideEffects: [
                  {
                    type: 'patch',
                    updates: [
                      {
                        operation: 'write',
                        targetSfId: 'wp-intersection-0',
                        path: 'props.onEnter',
                        value: [
                          {
                            type: 'request',
                            data: {
                              customString: 'onEnter: Triggert',
                              action: 'waypoint-page',
                              pageEvent: 'waypoint-notification',
                            },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            },
          },
        ],
      }),
      buttonFactory({
        text: 'Remove',
        color: 'danger',
        onClick: [
          {
            type: 'request',
            data: {
              action: 'reflect',
              reflectedData: {
                sideEffects: [
                  {
                    type: 'patch',
                    updates: [
                      {
                        operation: 'delete',
                        targetSfId: 'wp-intersection-0',
                        path: 'props.onEnter',
                      },
                    ],
                  },
                ],
              },
            },
          },
        ],
      }),
      textFactory({
        htmlTag: 'p',
        fontSize: 'extraLarge',
        color: 'warning',
        text: ' ',
      }),
      ...times(2, () =>
        textFactory({
          htmlTag: 'p',
          text: dummyText,
        }),
      ),
      textFactory({
        htmlTag: 'p',
        fontSize: 'extraLarge',
        color: 'danger',
        text: '>> WAYPOINT <<',
      }),
      waypointFactory(
        {
          onEnter: [
            {
              type: 'request',
              blockUi: false,
              data: {
                backendLoad: 1000,
                customString: '>> onEnter <<',
                action: 'waypoint-page',
                pageEvent: 'waypoint-notification',
              },
            },
          ],
          onIntersection: [
            {
              type: 'request',
              blockUi: false,
              data: {
                backendLoad: 2000,
                customString: '>> onIntersection <<',
                action: 'waypoint-page',
                pageEvent: 'waypoint-notification',
              },
            },
          ],
        },
        'wp-intersection-0',
      ),
    ],
  },
  'tabItem-5',
);
const onExit = tabsItemFactory(
  {
    title: 'onExit',
    componentChildren: [
      textFactory({
        htmlTag: 'p',
        text: dummyText,
      }),
      textFactory({
        htmlTag: 'p',
        fontSize: 'extraLarge',
        color: 'warning',
        text: 'WAYPOINT - Fires on exit',
      }),
      waypointFactory(
        {
          onExit: [
            {
              type: 'request',
              data: {
                customString: 'onExit: Have a nice Day !',
                action: 'waypoint-page',
                pageEvent: 'waypoint-notification',
              },
            },
          ],
        },
        'waypoint-sfid',
      ),
      ...times(10, () =>
        textFactory({
          htmlTag: 'p',
          text: dummyText,
        }),
      ),
    ],
  },
  'tabItem-6',
);

/** @type {import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType}  */
export const waypointPage = smartFaceFactory({
  sfComponents: [
    pageFactory(
      {
        document: { head: { title: 'Waypoint Page' } },
        componentChildren: [
          classicLayoutFactory({
            sidebar: sidebar('waypoint-page', ['component-pages']),
            content: {
              componentChildren: [
                gridFactory(
                  {
                    items: [
                      gridItemFactory(
                        {
                          size: 12,
                          componentChildren: [
                            cardFactory(
                              {
                                title: 'Waypoint Page',
                                bodyChildren: [
                                  tabsFactory(
                                    {
                                      items: [
                                        defaultTab,
                                        triggerOnce,
                                        rootMarginNeg,
                                        rootMarginPos,
                                        tableAsRootContainer,
                                        onIntersectionOnEnter,
                                        onExit,
                                      ],
                                      selectedItemSfId: 'tabItem-0',
                                    },
                                    'waypoint-0',
                                  ),
                                ],
                              },
                              'card-card',
                            ),
                          ],
                        },
                        'item-b',
                      ),
                    ],
                  },
                  'grid-0',
                ),
              ],
            },
          }),
        ],
      },
      'page-0',
    ),
  ],
});
