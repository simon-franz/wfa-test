// @ts-check

import { buttonFactory } from '../../../../shared/smartFaceComponentFactories/core/buttonFactory.js';
import { cardFactory } from '../../../../shared/smartFaceComponentFactories/core/cardFactory.js';
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { sectionFactory } from '../../../../shared/smartFaceComponentFactories/core/collapsibleMenuFactory.js';
import {
  dropdownMenuDividerFactory,
  dropdownMenuEntryFactory,
  dropdownMenuFactory,
  dropdownMenuSectionFactory,
} from '../../../../shared/smartFaceComponentFactories/core/dropdownMenuFactory.js';
import { fontAwesomeIconFactory } from '../../../../shared/smartFaceComponentFactories/core/fontAwesomeIconFactory.js';
import { gridFactory, gridItemFactory } from '../../../../shared/smartFaceComponentFactories/core/gridFactory.js';
import { iconButtonFactory } from '../../../../shared/smartFaceComponentFactories/core/iconButtonFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { streamlineIconFactory } from '../../../../shared/smartFaceComponentFactories/core/streamlineIconFactory.js';
import { switchFactory } from '../../../../shared/smartFaceComponentFactories/core/switchFactory.js';
import {
  dataFactory,
  dataRowFactory,
  headerFactory,
  headerRowFactory,
  tableFactory,
} from '../../../../shared/smartFaceComponentFactories/core/tableFactory.js';
import { textFactory } from '../../../../shared/smartFaceComponentFactories/core/textFactory.js';
import { tooltipFactory } from '../../../../shared/smartFaceComponentFactories/core/tooltipFactory.js';
import { generateLoremSentences } from '../../../../src/main/lib/stringGenerator/stringGenerator.js';
import { footer } from '../shared/footer.js';
import { patchFactory } from '../shared/patchFactory.js';
import { sidebar } from '../shared/sidebar.js';
import times from 'lodash/times.js';

const getRows = (amount = 50) =>
  times(amount, (index) =>
    dataRowFactory({
      onClick: [
        {
          type: 'request',
          data: {
            action: 'reflect',
            reflectedData: {
              sideEffects: [
                {
                  type: 'addNotification',
                  message: 'Row clicked!',
                },
              ],
            },
          },
        },
      ],
      cells: [
        dataFactory({
          componentChildren: [textFactory({ text: 'Id' })],
        }),
        dataFactory({
          componentChildren: [textFactory({ text: 'Very very very very very very long Description' })],
        }),
        dataFactory({
          componentChildren: [
            buttonFactory({
              variant: 'link',
              text: 'Link',
              onClick: [
                {
                  type: 'request',
                  data: {
                    action: 'reflect',
                    reflectedData: {
                      sideEffects: [{ type: 'consoleMessage', message: 'Clicked' }],
                    },
                  },
                },
              ],
            }),
          ],
        }),
        dataFactory({
          componentChildren: [switchFactory({ label: 'Other data' })],
        }),
        dataFactory({
          componentChildren: [textFactory({ text: 'Other data' })],
        }),
        dataFactory({
          componentChildren: [
            iconButtonFactory({
              onClick: [
                {
                  type: 'request',
                  data: {
                    action: 'reflect',
                    reflectedData: {
                      sideEffects: [{ type: 'consoleMessage', message: 'Clicked' }],
                    },
                  },
                },
              ],
            }),
          ],
        }),
        dataFactory({
          componentChildren: [
            index === 0
              ? dropdownMenuFactory({
                  trigger: buttonFactory({ text: 'DropdownMenu' }, 'dropdown-button-0'),
                  componentParts: [
                    dropdownMenuSectionFactory(
                      {
                        componentParts: [
                          dropdownMenuEntryFactory(
                            {
                              text: 'I am a very long text and apparently im bugging around',
                              href: 'https://www.hrworks.de/',
                            },
                            undefined,
                            'data-guide-test',
                          ),
                          dropdownMenuEntryFactory({
                            text: 'Link Entry with onClick',
                            href: 'https://www.hrworks.de/',
                            onClick: [
                              {
                                type: 'request',
                                data: {
                                  action: 'reflect',
                                  reflectedData: patchFactory([
                                    {
                                      operation: 'write',
                                      targetSfId: 'dropdown-button-0',
                                      path: 'props.color',
                                      value: 'secondary',
                                    },
                                  ]),
                                },
                              },
                            ],
                          }),
                          dropdownMenuEntryFactory({ icon: streamlineIconFactory() }),
                          dropdownMenuEntryFactory({ icon: fontAwesomeIconFactory() }),
                        ],
                      },
                      undefined,
                      'data-guide-test',
                    ),
                    dropdownMenuDividerFactory({}, undefined, 'data-guide-test'),
                    dropdownMenuSectionFactory({
                      componentParts: [
                        dropdownMenuEntryFactory(),
                        dropdownMenuEntryFactory({
                          componentParts: [
                            sectionFactory({
                              title: 'Subview-Section',
                              componentParts: [
                                dropdownMenuEntryFactory({ text: 'Entry (Layer 2)' }),
                                dropdownMenuEntryFactory({ text: 'Entry (Layer 2)' }),
                                dropdownMenuEntryFactory({ text: 'Entry (Layer 2)' }),
                                dropdownMenuEntryFactory({
                                  componentParts: [
                                    dropdownMenuEntryFactory({ text: 'Entry (Layer 3)' }),
                                    dropdownMenuEntryFactory({
                                      text: 'Entry (Layer 3)',
                                      componentParts: [
                                        dropdownMenuEntryFactory({ text: 'Empty href (Layer 4) ', href: '' }),
                                        dropdownMenuEntryFactory({ text: 'Entry (Layer 4)' }),
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
                    dropdownMenuEntryFactory({
                      text: 'Simulate maintenance for 10 seconds',
                      componentParts: [dropdownMenuEntryFactory()],
                    }),
                  ],
                })
              : fontAwesomeIconFactory(),
          ],
        }),
      ],
    }),
  );

/**
 * @type { import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType }
 */
export const tablePage = smartFaceFactory({
  sfComponents: [
    pageFactory({
      document: { head: { title: 'Table Page' } },
      componentChildren: [
        classicLayoutFactory({
          sidebar: sidebar('table-page', ['component-pages']),
          content: {
            componentChildren: [
              gridFactory({
                items: [
                  gridItemFactory({
                    componentChildren: [
                      cardFactory({
                        bodyChildren: [
                          tableFactory(
                            {
                              alternatingColors: false,
                              hoverable: false,
                              stickyHead: true,
                              headerRows: [
                                headerRowFactory({
                                  cells: [
                                    headerFactory({
                                      componentChildren: [textFactory({ text: 'Big' })],
                                    }),
                                    headerFactory({
                                      componentChildren: [textFactory({ text: 'Data' })],
                                    }),
                                    headerFactory({
                                      componentChildren: [textFactory({ text: 'Test' })],
                                    }),
                                    headerFactory({
                                      componentChildren: [textFactory({ text: 'With' })],
                                    }),
                                    headerFactory({
                                      componentChildren: [textFactory({ text: 'Many' })],
                                    }),
                                    headerFactory({
                                      componentChildren: [textFactory({ text: 'Many' })],
                                    }),
                                    headerFactory({
                                      componentChildren: [textFactory({ text: 'Data' })],
                                    }),
                                  ],
                                }),
                              ],
                              dataRows: getRows(),
                            },
                            'big-data-table',
                          ),
                        ],
                        footerChildren: [
                          buttonFactory({
                            text: 'Add items',
                            onClick: [
                              {
                                type: 'request',
                                data: {
                                  action: 'reflect',
                                  reflectedData: patchFactory([
                                    {
                                      operation: 'append',
                                      targetSfId: 'big-data-table',
                                      path: 'props.dataRows',
                                      value: getRows(),
                                    },
                                  ]),
                                },
                              },
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  gridItemFactory({
                    componentChildren: [
                      cardFactory({
                        title: 'Default Example',
                        bodyChildren: [
                          tableFactory(
                            {
                              columnDefinitions: [
                                { columnIndex: 1, maxWidth: 300 },
                                { columnIndex: 2, minWidth: '400px' },
                              ],
                              headerRows: [
                                headerRowFactory({
                                  cells: [
                                    headerFactory({
                                      componentChildren: [
                                        tooltipFactory({
                                          componentChildren: [
                                            textFactory({ text: `Max-Width: 300px, ${generateLoremSentences(1)}` }),
                                          ],
                                          title: 'Tooltip',
                                        }),
                                      ],
                                    }),
                                    headerFactory({
                                      componentChildren: [textFactory({ text: 'Min-Width: 400px' })],
                                    }),
                                    headerFactory({
                                      componentChildren: [textFactory({ text: 'Unset Width' })],
                                    }),
                                  ],
                                }),
                              ],
                              dataRows: [
                                dataRowFactory({
                                  // onClick: [{ type: 'redirect', url: 'tables' }],
                                  onClick: [
                                    {
                                      type: 'request',
                                      data: {
                                        action: 'reflect',
                                        reflectedData: patchFactory([
                                          // { operation: 'delete', path: null, targetSfId: 'id-0101' },
                                          // { operation: 'delete', path: null, targetSfId: 'id-0102' },
                                          {
                                            operation: 'prepend',
                                            path: 'props.dataRows',
                                            targetSfId: 'table-0',
                                            value: [
                                              dataRowFactory({
                                                cells: [
                                                  dataFactory({
                                                    componentChildren: [textFactory({ text: 'gonna' })],
                                                  }),
                                                  dataFactory({ componentChildren: [textFactory({ text: 'let' })] }),
                                                  dataFactory({ componentChildren: [textFactory({ text: 'you' })] }),
                                                ],
                                              }),
                                            ],
                                          },
                                          {
                                            operation: 'prepend',
                                            path: 'props.dataRows',
                                            targetSfId: 'table-0',
                                            value: [
                                              dataRowFactory({
                                                cells: [
                                                  dataFactory({
                                                    componentChildren: [textFactory({ text: 'gonna' })],
                                                  }),
                                                  dataFactory({ componentChildren: [textFactory({ text: 'let' })] }),
                                                  dataFactory({ componentChildren: [textFactory({ text: 'you' })] }),
                                                ],
                                              }),
                                            ],
                                          },
                                        ]),
                                      },
                                    },
                                  ],
                                  cells: [
                                    dataFactory({
                                      componentChildren: [textFactory({ text: 'On' })],
                                    }),
                                    dataFactory({
                                      componentChildren: [textFactory({ text: 'Row' })],
                                    }),
                                    dataFactory({ componentChildren: [textFactory({ text: 'Click' })] }),
                                  ],
                                }),
                                dataRowFactory({
                                  cells: [
                                    dataFactory({
                                      componentChildren: [textFactory({ text: 'onClick' })],
                                      onClick: [
                                        {
                                          type: 'request',
                                          data: {
                                            action: 'reflect',
                                            reflectedData: patchFactory([
                                              {
                                                targetSfId: 'table-0',
                                                operation: 'write',
                                                path: 'props.alternatingColors',
                                                value: false,
                                              },
                                            ]),
                                          },
                                        },
                                      ],
                                    }),
                                    dataFactory(),
                                    dataFactory(),
                                  ],
                                }),
                                dataRowFactory(
                                  {
                                    cells: [
                                      dataFactory({ componentChildren: [textFactory({ text: 'Never' })] }),
                                      dataFactory({ componentChildren: [textFactory({ text: 'gonna' })] }),
                                      dataFactory({ componentChildren: [textFactory({ text: 'give' })] }),
                                    ],
                                  },
                                  'id-0101',
                                ),
                                dataRowFactory(
                                  {
                                    cells: [
                                      dataFactory({ componentChildren: [textFactory({ text: 'you' })] }),
                                      dataFactory({ componentChildren: [textFactory({ text: 'up' })] }),
                                      dataFactory({ componentChildren: [textFactory({ text: 'never' })] }),
                                    ],
                                  },
                                  'id-0102',
                                ),
                                dataRowFactory(
                                  {
                                    cells: [
                                      dataFactory({ componentChildren: [textFactory({ text: 'gonna' })] }),
                                      dataFactory({ componentChildren: [textFactory({ text: 'let' })] }),
                                      dataFactory({ componentChildren: [textFactory({ text: 'you' })] }),
                                    ],
                                  },
                                  'id-0103',
                                ),
                                dataRowFactory({
                                  cells: [
                                    dataFactory({ componentChildren: [textFactory({ text: 'down' })] }),
                                    dataFactory(),
                                    dataFactory({
                                      componentChildren: [
                                        buttonFactory({
                                          corner: 'pill',
                                          text: 'Button',
                                          onClick: [
                                            {
                                              type: 'request',
                                              data: {
                                                action: 'reflect',
                                                reflectedData: patchFactory([
                                                  {
                                                    targetSfId: 'table-0',
                                                    operation: 'write',
                                                    path: 'props.alternatingColors',
                                                    value: false,
                                                  },
                                                ]),
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
                            'table-0',
                          ),
                        ],
                      }),
                    ],
                  }),
                  gridItemFactory({
                    componentChildren: [
                      cardFactory({
                        title: 'Table Sizing',
                        bodyChildren: [
                          tableFactory(
                            {
                              columnDefinitions: [
                                { columnIndex: 1, width: 'fit-content' },
                                { columnIndex: 2, minWidth: '200px', maxWidth: '400px' },
                                { columnIndex: 3, width: '250px' },
                              ],
                              headerRows: [
                                headerRowFactory(
                                  {
                                    cells: [
                                      headerFactory({
                                        componentChildren: [
                                          textFactory({ text: 'Fit-Content' }, undefined, 'data-guide-test'),
                                        ],
                                      }),
                                      headerFactory({
                                        componentChildren: [textFactory({ text: 'MinWidth 200px MaxWidth 400px' })],
                                      }),
                                      headerFactory({
                                        componentChildren: [textFactory({ text: 'Width 250px' })],
                                      }),
                                    ],
                                  },
                                  undefined,
                                  'data-guide-test',
                                ),
                              ],
                              dataRows: [
                                dataRowFactory(
                                  {
                                    cells: [
                                      dataFactory({
                                        componentChildren: [
                                          textFactory({
                                            text: generateLoremSentences(3),
                                          }),
                                        ],
                                      }),
                                      dataFactory(
                                        { componentChildren: [textFactory({ text: 'Center-Data' })] },
                                        undefined,
                                        'data-guide-test',
                                      ),
                                      dataFactory({ componentChildren: [textFactory({ text: 'End-Data' })] }),
                                    ],
                                  },
                                  undefined,
                                  'data-guide-test',
                                ),
                                dataRowFactory({
                                  cells: [
                                    dataFactory({
                                      componentChildren: [
                                        textFactory({
                                          text: generateLoremSentences(3),
                                        }),
                                      ],
                                    }),
                                    dataFactory({ componentChildren: [textFactory({ text: 'Center-Data' })] }),
                                    dataFactory({ componentChildren: [textFactory({ text: 'End-Data' })] }),
                                  ],
                                }),
                                dataRowFactory({
                                  cells: [
                                    dataFactory({
                                      componentChildren: [
                                        textFactory({
                                          text: generateLoremSentences(3),
                                        }),
                                      ],
                                    }),
                                    dataFactory({ componentChildren: [textFactory({ text: 'Center-Data' })] }),
                                    dataFactory({ componentChildren: [textFactory({ text: 'End-Data' })] }),
                                  ],
                                }),
                                dataRowFactory({
                                  cells: [
                                    dataFactory({
                                      componentChildren: [
                                        textFactory({
                                          text: generateLoremSentences(3),
                                        }),
                                      ],
                                    }),
                                    dataFactory({ componentChildren: [textFactory({ text: 'Center-Data' })] }),
                                    dataFactory({ componentChildren: [textFactory({ text: 'End-Data' })] }),
                                  ],
                                }),
                                dataRowFactory({
                                  cells: [
                                    dataFactory({
                                      componentChildren: [
                                        textFactory({
                                          text: generateLoremSentences(3),
                                        }),
                                      ],
                                    }),
                                    dataFactory({ componentChildren: [textFactory({ text: 'Center-Data' })] }),
                                    dataFactory({ componentChildren: [textFactory({ text: 'End-Data' })] }),
                                  ],
                                }),
                                dataRowFactory({
                                  cells: [
                                    dataFactory({
                                      componentChildren: [
                                        textFactory({
                                          text: generateLoremSentences(3),
                                        }),
                                      ],
                                    }),
                                    dataFactory({ componentChildren: [textFactory({ text: 'Center-Data' })] }),
                                    dataFactory({ componentChildren: [textFactory({ text: 'End-Data' })] }),
                                  ],
                                }),
                                dataRowFactory({
                                  cells: [
                                    dataFactory({
                                      componentChildren: [
                                        textFactory({
                                          text: generateLoremSentences(3),
                                        }),
                                      ],
                                    }),
                                    dataFactory({ componentChildren: [textFactory({ text: 'Center-Data' })] }),
                                    dataFactory({ componentChildren: [textFactory({ text: 'End-Data' })] }),
                                  ],
                                }),
                                dataRowFactory({
                                  cells: [
                                    dataFactory({
                                      componentChildren: [
                                        textFactory({
                                          text: generateLoremSentences(3),
                                        }),
                                      ],
                                    }),
                                    dataFactory({ componentChildren: [textFactory({ text: 'Center-Data' })] }),
                                    dataFactory({ componentChildren: [textFactory({ text: 'End-Data' })] }),
                                  ],
                                }),
                                dataRowFactory({
                                  cells: [
                                    dataFactory({
                                      componentChildren: [
                                        textFactory({
                                          text: generateLoremSentences(3),
                                        }),
                                      ],
                                    }),
                                    dataFactory({ componentChildren: [textFactory({ text: 'Center-Data' })] }),
                                    dataFactory({ componentChildren: [textFactory({ text: 'End-Data' })] }),
                                  ],
                                }),
                                dataRowFactory({
                                  cells: [
                                    dataFactory({
                                      componentChildren: [
                                        textFactory({
                                          text: generateLoremSentences(3),
                                        }),
                                      ],
                                    }),
                                    dataFactory({ componentChildren: [textFactory({ text: 'Center-Data' })] }),
                                    dataFactory({ componentChildren: [textFactory({ text: 'End-Data' })] }),
                                  ],
                                }),
                                dataRowFactory({
                                  cells: [
                                    dataFactory({
                                      componentChildren: [
                                        textFactory({
                                          text: generateLoremSentences(3),
                                        }),
                                      ],
                                    }),
                                    dataFactory({ componentChildren: [textFactory({ text: 'Center-Data' })] }),
                                    dataFactory({ componentChildren: [textFactory({ text: 'End-Data' })] }),
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
                  }),
                  gridItemFactory({
                    componentChildren: [
                      cardFactory({
                        title: 'Table Alignments',
                        subtitle: 'Vertical: Top - Baseline - Middle - Bottom',
                        bodyChildren: [
                          tableFactory(
                            {
                              columnDefinitions: [
                                {
                                  columnIndex: 2,
                                  width: '150px',
                                  horizontalAlignment: 'end',
                                  verticalAlignment: 'top',
                                  // @ts-expect-error no factory available for table column
                                  sfId: 'columnDefinitions-2',
                                },
                                {
                                  columnIndex: 3,
                                  width: '150px',
                                  horizontalAlignment: 'center',
                                  verticalAlignment: 'baseline',
                                },
                                {
                                  columnIndex: 4,
                                  width: '150px',
                                  horizontalAlignment: 'center',
                                  verticalAlignment: 'middle',
                                },
                                {
                                  columnIndex: 5,
                                  width: '150px',
                                  horizontalAlignment: 'center',
                                  verticalAlignment: 'bottom',
                                },
                              ],
                              headerRows: [
                                headerRowFactory(
                                  {
                                    cells: [
                                      headerFactory(
                                        {
                                          componentChildren: [textFactory({ text: 'Header' })],
                                        },
                                        'header',
                                      ),
                                      headerFactory({
                                        componentChildren: [textFactory({ text: 'Header' })],
                                      }),
                                      headerFactory({
                                        componentChildren: [textFactory({ text: 'Header' })],
                                      }),
                                      headerFactory({
                                        componentChildren: [textFactory({ text: 'Header' })],
                                      }),
                                      headerFactory({
                                        componentChildren: [textFactory({ text: 'Header' })],
                                      }),
                                    ],
                                  },
                                  'headerRow',
                                ),
                              ],
                              dataRows: [
                                dataRowFactory(
                                  {
                                    cells: [
                                      dataFactory({
                                        componentChildren: [
                                          textFactory({
                                            text: generateLoremSentences(3),
                                          }),
                                        ],
                                      }),
                                      dataFactory({ componentChildren: [textFactory({ text: 'Top' })] }),
                                      dataFactory({ componentChildren: [textFactory({ text: 'Baseline' })] }),
                                      dataFactory({ componentChildren: [textFactory({ text: 'Middle' })] }, 'data'),
                                      dataFactory({ componentChildren: [textFactory({ text: 'Bottom' })] }),
                                    ],
                                  },
                                  'dataRow',
                                ),
                              ],
                            },
                            'columnDefinitions',
                          ),
                        ],
                        footerChildren: [
                          gridFactory({
                            items: [
                              gridItemFactory({
                                componentChildren: [
                                  buttonFactory({
                                    text: '2. Column: "horizontalAlignment: start"',
                                    onClick: [
                                      {
                                        type: 'request',
                                        data: {
                                          action: 'reflect',
                                          reflectedData: patchFactory([
                                            {
                                              targetSfId: 'columnDefinitions-2',
                                              operation: 'write',
                                              path: 'horizontalAlignment',
                                              value: 'start',
                                            },
                                          ]),
                                        },
                                      },
                                    ],
                                  }),
                                ],
                              }),
                              gridItemFactory({
                                componentChildren: [
                                  buttonFactory({
                                    text: '2. Column: "horizontalAlignment: center"',
                                    onClick: [
                                      {
                                        type: 'request',
                                        data: {
                                          action: 'reflect',
                                          reflectedData: patchFactory([
                                            {
                                              targetSfId: 'columnDefinitions-2',
                                              operation: 'write',
                                              path: 'horizontalAlignment',
                                              value: 'center',
                                            },
                                          ]),
                                        },
                                      },
                                    ],
                                  }),
                                ],
                              }),
                              gridItemFactory({
                                componentChildren: [
                                  buttonFactory({
                                    text: '2. Column: "verticalAlignment: top"',
                                    onClick: [
                                      {
                                        type: 'request',
                                        data: {
                                          action: 'reflect',
                                          reflectedData: patchFactory([
                                            {
                                              targetSfId: 'columnDefinitions-2',
                                              operation: 'write',
                                              path: 'verticalAlignment',
                                              value: 'top',
                                            },
                                          ]),
                                        },
                                      },
                                    ],
                                  }),
                                ],
                              }),
                              gridItemFactory({
                                componentChildren: [
                                  buttonFactory({
                                    text: '2. Column: "verticalAlignment: middle"',
                                    onClick: [
                                      {
                                        type: 'request',
                                        data: {
                                          action: 'reflect',
                                          reflectedData: patchFactory([
                                            {
                                              targetSfId: 'columnDefinitions-2',
                                              operation: 'write',
                                              path: 'verticalAlignment',
                                              value: 'middle',
                                            },
                                          ]),
                                        },
                                      },
                                    ],
                                  }),
                                ],
                              }),
                              // headerRow-Button: horizontalAlignment center
                              gridItemFactory({
                                componentChildren: [
                                  buttonFactory({
                                    text: 'headerRow: horizontalAlignment: center',
                                    onClick: [
                                      {
                                        type: 'request',
                                        data: {
                                          action: 'reflect',
                                          reflectedData: patchFactory([
                                            {
                                              targetSfId: 'headerRow',
                                              operation: 'write',
                                              path: 'props.horizontalAlignment',
                                              value: 'center',
                                            },
                                          ]),
                                        },
                                      },
                                    ],
                                  }),
                                ],
                              }),
                              // headerRow-Button: horizontalAlignment start
                              gridItemFactory({
                                componentChildren: [
                                  buttonFactory({
                                    text: 'headerRow: horizontalAlignment: start',
                                    onClick: [
                                      {
                                        type: 'request',
                                        data: {
                                          action: 'reflect',
                                          reflectedData: patchFactory([
                                            {
                                              targetSfId: 'headerRow',
                                              operation: 'write',
                                              path: 'props.horizontalAlignment',
                                              value: 'start',
                                            },
                                          ]),
                                        },
                                      },
                                    ],
                                  }),
                                ],
                              }),
                              // header-Button: horizontalAlignment center
                              gridItemFactory({
                                componentChildren: [
                                  buttonFactory({
                                    text: 'header: horizontalAlignment: center',
                                    onClick: [
                                      {
                                        type: 'request',
                                        data: {
                                          action: 'reflect',
                                          reflectedData: patchFactory([
                                            {
                                              targetSfId: 'header',
                                              operation: 'write',
                                              path: 'props.horizontalAlignment',
                                              value: 'center',
                                            },
                                          ]),
                                        },
                                      },
                                    ],
                                  }),
                                ],
                              }),
                              // header-Button: horizontalAlignment start
                              gridItemFactory({
                                componentChildren: [
                                  buttonFactory({
                                    text: 'header: horizontalAlignment: start',
                                    onClick: [
                                      {
                                        type: 'request',
                                        data: {
                                          action: 'reflect',
                                          reflectedData: patchFactory([
                                            {
                                              targetSfId: 'header',
                                              operation: 'write',
                                              path: 'props.horizontalAlignment',
                                              value: 'start',
                                            },
                                          ]),
                                        },
                                      },
                                    ],
                                  }),
                                ],
                              }),
                              // dataRow-Button: horizontalAlignment center
                              gridItemFactory({
                                componentChildren: [
                                  buttonFactory({
                                    text: 'dataRow: horizontalAlignment: center',
                                    onClick: [
                                      {
                                        type: 'request',
                                        data: {
                                          action: 'reflect',
                                          reflectedData: patchFactory([
                                            {
                                              targetSfId: 'dataRow',
                                              operation: 'write',
                                              path: 'props.horizontalAlignment',
                                              value: 'center',
                                            },
                                          ]),
                                        },
                                      },
                                    ],
                                  }),
                                ],
                              }),
                              // dataRow-Button: horizontalAlignment start
                              gridItemFactory({
                                componentChildren: [
                                  buttonFactory({
                                    text: 'dataRow: horizontalAlignment: start',
                                    onClick: [
                                      {
                                        type: 'request',
                                        data: {
                                          action: 'reflect',
                                          reflectedData: patchFactory([
                                            {
                                              targetSfId: 'dataRow',
                                              operation: 'write',
                                              path: 'props.horizontalAlignment',
                                              value: 'start',
                                            },
                                          ]),
                                        },
                                      },
                                    ],
                                  }),
                                ],
                              }),
                              // data-Button: horizontalAlignment center
                              gridItemFactory({
                                componentChildren: [
                                  buttonFactory({
                                    text: 'data: horizontalAlignment: center',
                                    onClick: [
                                      {
                                        type: 'request',
                                        data: {
                                          action: 'reflect',
                                          reflectedData: patchFactory([
                                            {
                                              targetSfId: 'data',
                                              operation: 'write',
                                              path: 'props.horizontalAlignment',
                                              value: 'center',
                                            },
                                          ]),
                                        },
                                      },
                                    ],
                                  }),
                                ],
                              }),
                              // data-Button: horizontalAlignment start
                              gridItemFactory({
                                componentChildren: [
                                  buttonFactory({
                                    text: 'data: horizontalAlignment: start',
                                    onClick: [
                                      {
                                        type: 'request',
                                        data: {
                                          action: 'reflect',
                                          reflectedData: patchFactory([
                                            {
                                              targetSfId: 'data',
                                              operation: 'write',
                                              path: 'props.horizontalAlignment',
                                              value: 'start',
                                            },
                                          ]),
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
                    componentChildren: [
                      cardFactory({
                        title: 'Table Alignments',
                        subtitle: 'Horizontal: Start - Center - End',
                        bodyChildren: [
                          tableFactory({
                            columnDefinitions: [
                              { columnIndex: 1, horizontalAlignment: 'start' },
                              { columnIndex: 2, horizontalAlignment: 'center' },
                              { columnIndex: 3, horizontalAlignment: 'end' },
                            ],
                            headerRows: [
                              headerRowFactory({
                                cells: [
                                  headerFactory({
                                    componentChildren: [textFactory({ text: 'Start Aligned' })],
                                  }),
                                  headerFactory({
                                    componentChildren: [textFactory({ text: 'Center Aligned' })],
                                  }),
                                  headerFactory({
                                    componentChildren: [textFactory({ text: 'End Aligned' })],
                                  }),
                                ],
                              }),
                            ],
                            dataRows: [
                              dataRowFactory({
                                cells: [
                                  dataFactory({ componentChildren: [textFactory({ text: 'Start-Data' })] }),
                                  dataFactory({ componentChildren: [textFactory({ text: 'Center-Data' })] }),
                                  dataFactory({ componentChildren: [textFactory({ text: 'End-Data' })] }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  gridItemFactory({
                    componentChildren: [
                      cardFactory({
                        title: 'Table: Colliding Alignments',
                        subtitle: 'Alignment-Priority: Cell > Row > ColumnDefinition',
                        bodyChildren: [
                          tableFactory({
                            layout: 'fixed',
                            columnDefinitions: [
                              { columnIndex: 1, width: '300px' },
                              { columnIndex: 3, horizontalAlignment: 'center', verticalAlignment: 'middle' },
                            ],
                            headerRows: [
                              headerRowFactory({
                                horizontalAlignment: 'start',
                                cells: [
                                  headerFactory({
                                    componentChildren: [
                                      textFactory({
                                        text: `<strong>Row-align: start</strong> | ${generateLoremSentences(3)}`,
                                        fontWeight: 'normal',
                                        html: true,
                                      }),
                                    ],
                                  }),
                                  headerFactory({
                                    componentChildren: [textFactory({ text: 'Column-align: none' })],
                                  }),
                                  headerFactory({
                                    verticalAlignment: 'bottom',
                                    componentChildren: [textFactory({ text: 'Column-align: center, self: bottom' })],
                                  }),
                                ],
                              }),
                            ],
                            dataRows: [
                              dataRowFactory({
                                cells: [
                                  dataFactory({
                                    componentChildren: [
                                      textFactory({
                                        text: `<strong>Row-align: none</strong> | ${generateLoremSentences(3)}`,
                                        html: true,
                                      }),
                                    ],
                                  }),
                                  dataFactory({ componentChildren: [textFactory({ text: 'Align: none' })] }),
                                  dataFactory({ componentChildren: [textFactory({ text: 'Align: none' })] }),
                                ],
                              }),
                              dataRowFactory({
                                cells: [
                                  dataFactory({
                                    componentChildren: [
                                      textFactory({
                                        text: `<strong>Row-align: bottom-end</strong> | ${generateLoremSentences(3)}`,
                                        html: true,
                                      }),
                                    ],
                                  }),
                                  dataFactory({ componentChildren: [textFactory({ text: 'Align: none' })] }),
                                  dataFactory({ componentChildren: [textFactory({ text: 'Align: none' })] }),
                                ],
                                horizontalAlignment: 'end',
                                verticalAlignment: 'bottom',
                              }),
                              dataRowFactory({
                                cells: [
                                  dataFactory({
                                    horizontalAlignment: 'justify',
                                    componentChildren: [
                                      textFactory({
                                        text: `<strong>Row-align: bottom-end, self: justify</strong> | ${generateLoremSentences(
                                          3,
                                        )}`,
                                        html: true,
                                      }),
                                    ],
                                  }),
                                  dataFactory({
                                    componentChildren: [textFactory({ text: 'Align: top-start' })],
                                    horizontalAlignment: 'start',
                                    verticalAlignment: 'top',
                                  }),
                                  dataFactory({
                                    componentChildren: [textFactory({ text: 'Align: top-start' })],
                                    horizontalAlignment: 'start',
                                    verticalAlignment: 'top',
                                  }),
                                ],
                                horizontalAlignment: 'end',
                                verticalAlignment: 'bottom',
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  gridItemFactory({
                    componentChildren: [
                      cardFactory({
                        bodyChildren: [
                          tableFactory({
                            headerRows: [
                              headerRowFactory({
                                cells: [
                                  headerFactory({
                                    componentChildren: [textFactory({ text: 'Header' })],
                                  }),
                                  headerFactory({
                                    componentChildren: [textFactory({ text: 'Only' })],
                                  }),
                                  headerFactory({
                                    componentChildren: [textFactory({ text: 'Table' })],
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
                    componentChildren: [
                      cardFactory({
                        bodyChildren: [
                          tableFactory({
                            dataRows: [
                              dataRowFactory({
                                cells: [
                                  dataFactory({
                                    componentChildren: [textFactory({ text: 'Data' })],
                                  }),
                                  dataFactory({
                                    componentChildren: [textFactory({ text: 'Only' })],
                                  }),
                                  dataFactory({
                                    componentChildren: [textFactory({ text: 'Table' })],
                                  }),
                                ],
                              }),
                              dataRowFactory({
                                cells: [
                                  dataFactory({
                                    componentChildren: [textFactory({ text: 'Data' })],
                                  }),
                                  dataFactory({
                                    componentChildren: [textFactory({ text: 'Only' })],
                                  }),
                                  dataFactory({
                                    componentChildren: [textFactory({ text: 'Table' })],
                                  }),
                                ],
                              }),
                              dataRowFactory({
                                cells: [
                                  dataFactory({
                                    componentChildren: [textFactory({ text: 'Data' })],
                                  }),
                                  dataFactory({
                                    componentChildren: [textFactory({ text: 'Only' })],
                                  }),
                                  dataFactory({
                                    componentChildren: [textFactory({ text: 'Table' })],
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
                    componentChildren: [
                      cardFactory({
                        bodyChildren: [
                          tableFactory({
                            alternatingColors: false,
                            hoverable: false,
                            headerRows: [
                              headerRowFactory({
                                cells: [
                                  headerFactory({
                                    componentChildren: [textFactory({ text: 'Double' })],
                                  }),
                                  headerFactory({
                                    componentChildren: [textFactory({ text: 'Header' })],
                                  }),
                                  headerFactory({
                                    componentChildren: [textFactory({ text: 'Table' })],
                                  }),
                                ],
                              }),
                              headerRowFactory({
                                cells: [
                                  headerFactory({
                                    componentChildren: [textFactory({ text: 'Double' })],
                                  }),
                                  headerFactory({
                                    componentChildren: [textFactory({ text: 'Header' })],
                                  }),
                                  headerFactory({
                                    componentChildren: [textFactory({ text: 'Table' })],
                                  }),
                                ],
                              }),
                            ],
                            dataRows: [
                              dataRowFactory({
                                cells: [
                                  dataFactory({ componentChildren: [textFactory({ text: 'NO' })] }),
                                  dataFactory({ componentChildren: [textFactory({ text: 'ALTERNATING' })] }),
                                  dataFactory({ componentChildren: [textFactory({ text: 'COLORS' })] }),
                                ],
                              }),
                              dataRowFactory({
                                cells: [
                                  dataFactory({ componentChildren: [textFactory({ text: 'NO' })] }),
                                  dataFactory({ componentChildren: [textFactory({ text: 'HOVER' })] }),
                                  dataFactory({ componentChildren: [textFactory({ text: '' })] }),
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
