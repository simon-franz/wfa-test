// @ts-check
import {
  accordionFactory,
  accordionItemFactory,
} from '../../../../shared/smartFaceComponentFactories/core/accordionFactory.js';
import { buttonFactory } from '../../../../shared/smartFaceComponentFactories/core/buttonFactory.js';
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { gridFactory, gridItemFactory } from '../../../../shared/smartFaceComponentFactories/core/gridFactory.js';
import { imageFactory } from '../../../../shared/smartFaceComponentFactories/core/imageFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { textFactory } from '../../../../shared/smartFaceComponentFactories/core/textFactory.js';
import {
  nestedChecklistEntryFactory,
  nestedChecklistFactory,
} from '../../../../shared/smartFaceComponentFactories/extension/nestedChecklistFactory.js';
import { profileMenuFactory } from '../../../../shared/smartFaceComponentFactories/extension/profileMenuFactory.js';
import { footer } from '../shared/footer.js';
import { patchFactory } from '../shared/patchFactory.js';
import { sidebar } from '../shared/sidebar.js';

const stdExample = nestedChecklistFactory(
  {
    entries: [
      nestedChecklistEntryFactory(
        {
          label: 'Alle Organisations Einheiten',
          checked: true,
          expanded: true,
          entries: [
            nestedChecklistEntryFactory({
              label: 'Load this',
              checked: false,
              expanded: false,
              onFetchEntries: [
                {
                  type: 'request',
                  blockUi: false,
                  data: { action: 'nested-checklist', pageEvent: 'fetchEntries' },
                },
              ],
            }),
            nestedChecklistEntryFactory({
              label: 'Entwicklung',
              checked: false,
              expanded: false,
              entries: [
                nestedChecklistEntryFactory({
                  label: 'Frontend',
                  checked: false,
                  expanded: false,
                }),
                nestedChecklistEntryFactory({
                  label: 'Backend',
                  checked: false,
                  expanded: false,
                }),
                nestedChecklistEntryFactory({
                  label: 'DevOps: ',
                  checked: false,
                  expanded: false,
                }),
              ],
              onFetchEntries: [
                {
                  type: 'request',
                  blockUi: false,
                  data: { action: 'nested-checklist', pageEvent: 'fetchEntries' },
                },
              ],
            }),
          ],
        },
        undefined,
        'data-guide-test',
      ),
    ],
  },
  'std-example',
);

const stdExampleButtons = [
  // BUTTON size extraSmall
  gridItemFactory({
    componentChildren: [
      buttonFactory({
        text: 'size extraSmall',
        onClick: [
          {
            type: 'request',
            data: {
              action: 'reflect',
              reflectedData: patchFactory([
                {
                  targetSfId: 'std-example',
                  operation: 'write',
                  path: 'props.size',
                  value: 'extraSmall',
                },
              ]),
            },
          },
        ],
      }),
    ],
  }),
  // BUTTON size small
  gridItemFactory({
    componentChildren: [
      buttonFactory({
        text: 'size small',
        onClick: [
          {
            type: 'request',
            data: {
              action: 'reflect',
              reflectedData: patchFactory([
                {
                  targetSfId: 'std-example',
                  operation: 'write',
                  path: 'props.size',
                  value: 'small',
                },
              ]),
            },
          },
        ],
      }),
    ],
  }),
  // BUTTON size medium
  gridItemFactory({
    componentChildren: [
      buttonFactory({
        text: 'size medium',
        onClick: [
          {
            type: 'request',
            data: {
              action: 'reflect',
              reflectedData: patchFactory([
                {
                  targetSfId: 'std-example',
                  operation: 'write',
                  path: 'props.size',
                  value: 'medium',
                },
              ]),
            },
          },
        ],
      }),
    ],
  }),
  // BUTTON size large
  gridItemFactory({
    componentChildren: [
      buttonFactory({
        text: 'size large',
        onClick: [
          {
            type: 'request',
            data: {
              action: 'reflect',
              reflectedData: patchFactory([
                {
                  targetSfId: 'std-example',
                  operation: 'write',
                  path: 'props.size',
                  value: 'large',
                },
              ]),
            },
          },
        ],
      }),
    ],
  }),
  // BUTTON size extraLarge
  gridItemFactory({
    componentChildren: [
      buttonFactory({
        text: 'size extraLarge',
        onClick: [
          {
            type: 'request',
            data: {
              action: 'reflect',
              reflectedData: patchFactory([
                {
                  targetSfId: 'std-example',
                  operation: 'write',
                  path: 'props.size',
                  value: 'extraLarge',
                },
              ]),
            },
          },
        ],
      }),
    ],
  }),
];

const onlyRootLevel = nestedChecklistFactory(
  {
    entries: [
      nestedChecklistEntryFactory({
        label: 'ROOT => A',
        checked: true,
        expanded: true,
      }),
      nestedChecklistEntryFactory({
        label: 'ROOT => B',
        checked: true,
        expanded: true,
      }),
      nestedChecklistEntryFactory({
        label: 'ROOT => C',
        checked: true,
        expanded: true,
      }),
      nestedChecklistEntryFactory({
        label: 'ROOT => D',
        checked: true,
        expanded: true,
      }),
      nestedChecklistEntryFactory({
        label: 'ROOT => E',
        checked: true,
        expanded: true,
      }),
      nestedChecklistEntryFactory({
        label: 'ROOT => F',
        checked: true,
        expanded: true,
      }),
      nestedChecklistEntryFactory({
        label: 'ROOT => G',
        checked: true,
        expanded: true,
      }),
    ],
  },
  'root-example',
);

const shimmer = nestedChecklistFactory(
  {
    entries: [
      nestedChecklistEntryFactory({
        label: 'Entwicklung',
        checked: false,
        expanded: true,
        entries: [
          nestedChecklistEntryFactory({
            label: 'Frontend',
            checked: true,
            expanded: false,
            onFetchEntries: [
              {
                type: 'request',
                blockUi: false,
                data: {
                  action: 'nested-checklist',
                  backendLoad: 1000,
                  pageEvent: 'slowFetchEntries',
                },
              },
            ],
          }),
          nestedChecklistEntryFactory({
            label: 'Backend',
            checked: true,
            expanded: false,
            onFetchEntries: [
              {
                type: 'request',
                blockUi: false,
                data: {
                  action: 'nested-checklist',
                  backendLoad: 1000,
                  pageEvent: 'slowFetchEntries',
                },
              },
            ],
          }),
          nestedChecklistEntryFactory({
            label: 'DevOps: ',
            checked: true,
            expanded: false,
            onFetchEntries: [
              {
                type: 'request',
                blockUi: false,
                data: {
                  action: 'nested-checklist',
                  backendLoad: 1000,
                  pageEvent: 'slowFetchEntries',
                },
              },
            ],
          }),
        ],
      }),
    ],
    onFetchEntries: [
      {
        type: 'request',
        blockUi: false,
        data: {
          action: 'nested-checklist',
          backendLoad: 1000,
          pageEvent: 'slowFetchEntries',
        },
      },
    ],
  },
  'shimmer-example',
);

/**
 * @type { import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType }
 */

export const nestedChecklistPage = smartFaceFactory({
  sfComponents: [
    pageFactory(
      {
        componentChildren: [
          classicLayoutFactory({
            sidebar: sidebar('component-pages', ['component-pages']),
            content: {
              header: {
                fixed: 'never',
                componentChildren: [
                  gridFactory({
                    items: [
                      gridItemFactory({
                        componentChildren: [
                          textFactory({
                            text: 'Nested Checklist Page',
                            fontSize: 'extraLarge',
                            fontWeight: 'bold',
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              },
              componentChildren: [
                gridFactory({
                  items: [
                    // NESTED-CHECKLIST - Normal
                    gridItemFactory({
                      componentChildren: [
                        accordionFactory({
                          expandedItemSfIds: ['a1'],
                          items: [
                            accordionItemFactory(
                              {
                                icon: undefined,
                                title: 'Nested Checklist: Orga',
                                componentChildren: [stdExample],
                              },
                              'a1',
                            ),
                          ],
                        }),
                      ],
                    }),
                    // NESTED-CHECKLIST - Normal
                    gridItemFactory({
                      componentChildren: [
                        accordionFactory({
                          expandedItemSfIds: ['b1'],
                          items: [
                            accordionItemFactory(
                              {
                                icon: undefined,
                                title: 'Nested Checklist: Orga - Size Buttons',
                                componentChildren: [
                                  gridFactory({
                                    items: [...stdExampleButtons],
                                  }),
                                ],
                              },
                              'b1',
                            ),
                          ],
                        }),
                      ],
                    }),

                    // NESTED-CHECKLIST - RootLevel Only
                    gridItemFactory({
                      componentChildren: [
                        accordionFactory({
                          expandedItemSfIds: ['a2'],
                          items: [
                            accordionItemFactory(
                              {
                                icon: undefined,
                                title: 'Nested Checklist: RootLevel Only',
                                componentChildren: [onlyRootLevel],
                              },
                              'a2',
                            ),
                          ],
                        }),
                      ],
                    }),

                    // NESTED-CHECKLIST - Shimmer
                    gridItemFactory({
                      componentChildren: [
                        accordionFactory({
                          expandedItemSfIds: ['a3'],
                          items: [
                            accordionItemFactory(
                              {
                                icon: undefined,
                                title: 'Nested Checklist: Shimmer',
                                componentChildren: [shimmer],
                              },
                              'a3',
                            ),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            },
            header: {
              componentChildren: [
                profileMenuFactory({
                  portrait: { src: 'ui-assets/pictures/profile.jpg' },
                  title: 'John Doe',
                  subtitle: 'A very anonymous',
                  headerChildren: [buttonFactory()],
                  bodyChildren: [buttonFactory()],
                }),
              ],
            },
            footer,
          }),
        ],
        document: {
          head: {
            title: 'Nested Checklist Page',
            fields: {
              javasript: {
                tag: 'script',
                attributes: {},
                innerText: 'console.log("Hello from the Server")',
              },
              style: {
                tag: 'style',
                attributes: {},
                innerText:
                  'body.lightGreen { background-color: lightgreen; } .redBackground body { background-color: red; }',
              },
            },
          },
          // html: {
          //   attributes: { lang: 'de' },
          // },
        },
      },
      'page-0',
    ),
  ],

  sideEffects: [
    {
      type: 'javaScriptExecutor',
      javaScript: 'function (context) { console.log(context); }',
    },
    {
      type: 'consoleMessage',
      message: 'Hello World',
    },
  ],
});
