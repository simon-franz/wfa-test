// @ts-check

import { cardFactory } from '#shared/smartFaceComponentFactories/core/cardFactory';
import { formFactory } from '#shared/smartFaceComponentFactories/core/formFactory';
import { gridFactory, gridItemFactory } from '#shared/smartFaceComponentFactories/core/gridFactory';
import { textareaFactory } from '#shared/smartFaceComponentFactories/core/textareaFactory';

import { badgeFactory } from '../../../../shared/smartFaceComponentFactories/core/badgeFactory.js';
import { buttonFactory } from '../../../../shared/smartFaceComponentFactories/core/buttonFactory.js';
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import {
  collapsibleMenuFactory,
  entryFactory,
  sectionFactory,
} from '../../../../shared/smartFaceComponentFactories/core/collapsibleMenuFactory.js';
import { fontAwesomeIconFactory } from '../../../../shared/smartFaceComponentFactories/core/fontAwesomeIconFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { streamlineIconFactory } from '../../../../shared/smartFaceComponentFactories/core/streamlineIconFactory.js';
import { footer } from '../shared/footer.js';
import { patchFactory } from '../shared/patchFactory.js';

/** @type {import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType} */
export const sidebarPage = smartFaceFactory({
  sfComponents: [
    pageFactory({
      document: { head: { title: 'Sidebar Page' } },
      componentChildren: [
        classicLayoutFactory(
          {
            footer,
            header: {
              componentChildren: [
                buttonFactory({
                  text: 'Multiple: false',
                  onClick: [
                    {
                      type: 'request',
                      data: {
                        action: 'reflect',
                        reflectedData: patchFactory([
                          {
                            operation: 'write',
                            targetSfId: 'collapsible-1',
                            path: 'props.multiple',
                            value: false,
                          },
                        ]),
                      },
                    },
                  ],
                }),
                buttonFactory({
                  text: 'Multiple true',
                  onClick: [
                    {
                      type: 'request',
                      data: {
                        action: 'reflect',
                        reflectedData: patchFactory([
                          {
                            targetSfId: 'collapsible-1',
                            operation: 'write',
                            path: 'props.multiple',
                            value: true,
                          },
                        ]),
                      },
                    },
                  ],
                }),
                buttonFactory({
                  text: 'Replace View',
                  onClick: [
                    {
                      type: 'request',
                      data: {
                        action: 'reflect',
                        reflectedData: patchFactory([
                          {
                            operation: 'write',
                            targetSfId: 'page',
                            path: 'props.sidebar.componentChildren',
                            value: [
                              collapsibleMenuFactory({
                                activeEntrySfId: 'active',
                                expandedEntrySfIds: ['zeitwirtschaft', 'open-me'],
                                componentParts: [
                                  sectionFactory({
                                    title: 'Basic Example',
                                    componentParts: [
                                      entryFactory({
                                        text: 'Font-Awesome Icon',
                                        href: '/',
                                        icon: fontAwesomeIconFactory({ name: 'home' }),
                                      }),
                                      entryFactory({
                                        text: 'Streamline Icon',
                                        href: '/',
                                        icon: streamlineIconFactory({ name: 'time-clock-circle' }),
                                        componentParts: [entryFactory()],
                                      }),
                                      entryFactory(
                                        {
                                          text: 'Zeitwirtschaft',

                                          componentParts: [
                                            entryFactory(
                                              {
                                                text: 'Open Me!',
                                                componentParts: [
                                                  entryFactory(
                                                    {
                                                      text: 'I am active',
                                                      icon: fontAwesomeIconFactory({ name: 'clock' }),
                                                    },
                                                    'active',
                                                  ),
                                                  entryFactory(),
                                                  entryFactory(),
                                                  entryFactory(),
                                                ],
                                              },
                                              'open-me',
                                            ),
                                            entryFactory({
                                              badge: badgeFactory({
                                                dot: true,
                                                color: 'danger',
                                                animation: 'pulsing',
                                                text: 'Hallo, I bims! Der Badge! Aber jetzt bims i 1 Tooltip! Achja, I han 1 extrah lamgen Text',
                                              }),
                                              componentParts: [entryFactory(), entryFactory()],
                                            }),
                                            entryFactory(),
                                            entryFactory(),
                                            entryFactory(),
                                            entryFactory(),
                                            entryFactory(),
                                            entryFactory(),
                                            entryFactory(),
                                            entryFactory(),
                                            entryFactory(),
                                            entryFactory(),
                                          ],
                                        },
                                        'zeitwirtschaft',
                                      ),
                                    ],
                                  }),
                                  sectionFactory({
                                    title: 'Extreme Example',
                                    componentParts: [
                                      entryFactory({
                                        text: 'Layer 0',
                                        icon: fontAwesomeIconFactory({ name: 'clock' }),
                                        componentParts: [
                                          entryFactory({
                                            text: 'Layer 1',
                                            componentParts: [
                                              entryFactory({
                                                text: 'Layer 2',
                                                componentParts: [
                                                  entryFactory({
                                                    text: 'Layer 3',
                                                    componentParts: [
                                                      entryFactory({
                                                        text: 'Layer 4',
                                                        componentParts: [
                                                          entryFactory({
                                                            text: 'Layer 5',
                                                            icon: fontAwesomeIconFactory({ name: 'clock' }),
                                                            componentParts: [
                                                              entryFactory({
                                                                text: 'Layer 6',
                                                                componentParts: [
                                                                  entryFactory({
                                                                    text: 'Layer 7',
                                                                    componentParts: [
                                                                      entryFactory({
                                                                        text: 'Layer 8',
                                                                        componentParts: [
                                                                          entryFactory({ text: 'You found me :)' }),
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
                        ]),
                      },
                    },
                  ],
                }),
                buttonFactory({
                  text: 'Sidebar-Toggler-Mode ON',
                  onClick: [
                    {
                      type: 'request',
                      data: {
                        action: 'reflect',
                        reflectedData: patchFactory([
                          {
                            operation: 'write',
                            targetSfId: 'page',
                            path: 'props.desktopSidebarTogglerMode',
                            value: 'fully-collapse',
                          },
                        ]),
                      },
                    },
                  ],
                }),
                buttonFactory({
                  text: 'Sidebar-Toggler-Mode OFF',
                  onClick: [
                    {
                      type: 'request',
                      data: {
                        action: 'reflect',
                        reflectedData: patchFactory([
                          {
                            operation: 'write',
                            targetSfId: 'page',
                            path: 'props.desktopSidebarTogglerMode',
                            value: 'none',
                          },
                        ]),
                      },
                    },
                  ],
                }),
              ],
            },
            sidebar: {
              componentChildren: [
                collapsibleMenuFactory(
                  {
                    activeEntrySfId: 'active',
                    expandedEntrySfIds: ['zeitwirtschaft', 'open-me'],
                    componentParts: [
                      sectionFactory(
                        {
                          title: 'Basic Example',
                          componentParts: [
                            entryFactory({
                              text: 'Font-Awesome Icon',
                              href: '/',
                              icon: fontAwesomeIconFactory({ name: 'home' }),
                            }),
                            entryFactory({
                              text: 'Streamline Icon',
                              href: '/',
                              icon: streamlineIconFactory({ name: 'time-clock-circle' }),
                              componentParts: [entryFactory()],
                            }),
                            entryFactory(
                              {
                                text: 'Zeitwirtschaft',

                                componentParts: [
                                  sectionFactory({
                                    title: 'Subview-Section',
                                    componentParts: [
                                      entryFactory(
                                        {
                                          text: 'Open Me!',
                                          componentParts: [
                                            entryFactory(
                                              {
                                                text: 'I am active',
                                                icon: fontAwesomeIconFactory({ name: 'clock' }),
                                              },
                                              'active',
                                            ),
                                            entryFactory(),
                                            entryFactory(),
                                            entryFactory(),
                                          ],
                                        },
                                        'open-me',
                                      ),
                                      entryFactory({
                                        href: '/',
                                        onClick: [
                                          {
                                            type: 'request',
                                            data: {
                                              action: 'reflect',
                                              reflectedData: {
                                                sideEffects: [
                                                  {
                                                    type: 'addNotification',
                                                    message: 'Ayy',
                                                  },
                                                ],
                                              },
                                            },
                                          },
                                        ],
                                        text: 'Element',
                                        badge: badgeFactory({ text: 'Im not a dot', color: 'danger' }),
                                        componentParts: [entryFactory(), entryFactory()],
                                      }),
                                      entryFactory({
                                        href: '/',
                                        onClick: [
                                          {
                                            type: 'request',
                                            data: {
                                              action: 'reflect',
                                              reflectedData: {
                                                sideEffects: [
                                                  {
                                                    type: 'addNotification',
                                                    message: 'Ayy',
                                                  },
                                                ],
                                              },
                                            },
                                          },
                                        ],
                                        text: 'Element',
                                        badge: badgeFactory({ text: '12345', dot: true, color: 'danger' }),
                                        componentParts: [entryFactory(), entryFactory()],
                                      }),
                                      entryFactory(),
                                      entryFactory(),
                                      entryFactory(),
                                      entryFactory(),
                                      entryFactory(),
                                      entryFactory(),
                                      entryFactory(),
                                      entryFactory(),
                                      entryFactory(),
                                    ],
                                  }),
                                ],
                              },
                              'zeitwirtschaft',
                            ),
                          ],
                        },
                        undefined,
                        'data-guide-test',
                      ),
                      sectionFactory({
                        title: 'Extreme Example',
                        componentParts: [
                          entryFactory(
                            {
                              text: 'Layer 0',
                              icon: fontAwesomeIconFactory({ name: 'clock' }),
                              componentParts: [
                                entryFactory({
                                  text: 'Layer 1',
                                  componentParts: [
                                    entryFactory({
                                      text: 'Layer 2',
                                      componentParts: [
                                        entryFactory({
                                          text: 'Layer 3',
                                          componentParts: [
                                            entryFactory({
                                              text: 'Layer 4',
                                              componentParts: [
                                                entryFactory({
                                                  text: 'Layer 5',
                                                  icon: fontAwesomeIconFactory({ name: 'clock' }),
                                                  componentParts: [
                                                    entryFactory({
                                                      text: 'Layer 6',
                                                      componentParts: [
                                                        entryFactory({
                                                          text: 'Layer 7',
                                                          componentParts: [
                                                            entryFactory({
                                                              text: 'Layer 8',
                                                              componentParts: [
                                                                entryFactory({ text: 'You found me :)' }),
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
                                    }),
                                  ],
                                }),
                              ],
                            },
                            undefined,
                            'data-guide-test',
                          ),
                        ],
                      }),
                      sectionFactory({
                        title: 'Extreme Example - Section',
                        componentParts: [
                          entryFactory(
                            {
                              text: 'Layer 0',
                              icon: fontAwesomeIconFactory({ name: 'clock' }),
                              componentParts: [
                                entryFactory({
                                  text: 'Layer 1',
                                  componentParts: [
                                    sectionFactory({
                                      title: 'Layer 2-Section',
                                      componentParts: [
                                        entryFactory({
                                          text: 'Layer 3',
                                          componentParts: [
                                            entryFactory({
                                              text: 'Layer 4',
                                              componentParts: [
                                                entryFactory({
                                                  text: 'Layer 5',
                                                  icon: fontAwesomeIconFactory({ name: 'clock' }),
                                                  componentParts: [
                                                    sectionFactory({
                                                      title: 'Layer 6-Section',
                                                      componentParts: [
                                                        entryFactory({
                                                          text: 'Layer 7',
                                                          componentParts: [
                                                            entryFactory({
                                                              text: 'Layer 8',
                                                              componentParts: [
                                                                entryFactory({ text: 'You found me :)' }),
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
                                    }),
                                  ],
                                }),
                              ],
                            },
                            undefined,
                            'data-guide-test',
                          ),
                        ],
                      }),
                    ],
                  },
                  'collapsible-1',
                  'data-guide-test',
                ),
              ],
            },
            content: {
              componentChildren: [
                gridFactory({
                  items: [
                    gridItemFactory({
                      size: { sm: 12, lg: 12 },
                      componentChildren: [
                        cardFactory({
                          title: 'Content',
                          subtitle: 'as example',
                          bodyChildren: [
                            formFactory(
                              {
                                componentChildren: [
                                  gridFactory({
                                    items: [
                                      gridItemFactory({
                                        componentChildren: [
                                          textareaFactory(
                                            {
                                              name: 'textarea-resize-0',
                                              label: 'Label - vertical',
                                              resize: 'vertical',
                                            },
                                            'textarea-resize-0',
                                            'data-guide-test',
                                          ),
                                        ],
                                      }),
                                      gridItemFactory({
                                        componentChildren: [
                                          textareaFactory(
                                            {
                                              name: 'textarea-resize-1',
                                              label: 'Label - horizontal',
                                              resize: 'horizontal',
                                            },
                                            'textarea-resize-1',
                                          ),
                                        ],
                                      }),
                                      gridItemFactory({
                                        componentChildren: [
                                          textareaFactory(
                                            {
                                              name: 'textarea-resize-2',
                                              label: 'Label - both',
                                              resize: 'both',
                                            },
                                            'textarea-resize-2',
                                          ),
                                        ],
                                      }),
                                      gridItemFactory({
                                        componentChildren: [
                                          textareaFactory(
                                            {
                                              name: 'textarea-resize-3',
                                              label: 'Label - none',
                                              resize: 'none',
                                            },
                                            'textarea-resize-3',
                                          ),
                                        ],
                                      }),
                                    ],
                                  }),
                                ],
                              },
                              'form-0',
                            ),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            },
          },
          'page',
        ),
      ],
    }),
  ],
});
