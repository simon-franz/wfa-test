// @ts-check

import { buttonFactory } from '#shared/smartFaceComponentFactories/core/buttonFactory';
import { cardFactory } from '#shared/smartFaceComponentFactories/core/cardFactory';
import { checkboxFactory } from '#shared/smartFaceComponentFactories/core/checkboxFactory';
import { checkboxGroupFactory } from '#shared/smartFaceComponentFactories/core/checkboxGroupFactory';
import { comboBoxFactory } from '#shared/smartFaceComponentFactories/core/comboBoxFactory';
import { dateFieldFactory } from '#shared/smartFaceComponentFactories/core/dateFieldFactory';
import { dateRangeFieldFactory } from '#shared/smartFaceComponentFactories/core/dateRangeFieldFactory';
import { decimalFieldFactory } from '#shared/smartFaceComponentFactories/core/decimalFieldFactory';
import { flexboxFactory, flexboxItemFactory } from '#shared/smartFaceComponentFactories/core/flexboxFactory';
import { formTextFactory } from '#shared/smartFaceComponentFactories/core/formTextFactory';
import { gridFactory, gridItemFactory } from '#shared/smartFaceComponentFactories/core/gridFactory';
import { integerFieldFactory } from '#shared/smartFaceComponentFactories/core/integerFieldFactory';
import { passwordFieldFactory } from '#shared/smartFaceComponentFactories/core/passwordFieldFactory';
import { progressFactory } from '#shared/smartFaceComponentFactories/core/progressFactory';
import { radioGroupFactory } from '#shared/smartFaceComponentFactories/core/radioGroupFactory';
import { selectFactory } from '#shared/smartFaceComponentFactories/core/selectFactory';
import { switchFactory } from '#shared/smartFaceComponentFactories/core/switchFactory';
import { tabsFactory, tabsItemFactory } from '#shared/smartFaceComponentFactories/core/tabsFactory';
import { textareaFactory } from '#shared/smartFaceComponentFactories/core/textareaFactory';
import { textFactory } from '#shared/smartFaceComponentFactories/core/textFactory';
import { textFieldFactory } from '#shared/smartFaceComponentFactories/core/textFieldFactory';
import { timeFieldFactory } from '#shared/smartFaceComponentFactories/core/timeFieldFactory';
import { uiHandlerFactory } from '#shared/smartFaceComponentFactories/core/uiHandlerFactory';
import { barChartFactory } from '#shared/smartFaceComponentFactories/extension/barChartFactory';
import { headerAreaFactory } from '#shared/smartFaceComponentFactories/extension/headerAreaFactory';
import { lineChartFactory } from '#shared/smartFaceComponentFactories/extension/lineChartFactory';
import {
  panelGroupFactory,
  panelGroupItemFactory,
} from '#shared/smartFaceComponentFactories/extension/panelGroupFactory';
import { pieChartFactory } from '#shared/smartFaceComponentFactories/extension/pieChartFactory';

import {
  breadcrumbFactory,
  breadcrumbItemFactory,
} from '../../../../shared/smartFaceComponentFactories/core/breadcrumbFactory.js';
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { modalFactory, pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { sectionFactory } from '../../../../shared/smartFaceComponentFactories/core/sectionFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { expertGraphJSON } from '../extension/workflowGraphPage.js';
import { getDataGrid } from '../shared/getDataGrid.js';
import { patchFactory } from '../shared/patchFactory.js';
import { sidebar } from '../shared/sidebar.js';
import { treeGraph } from './treeGraphPage.js';
import times from 'lodash/times.js';

const onclick = (componentJson) => {
  return [
    {
      type: 'request',
      data: {
        action: 'reflect',
        reflectedData: patchFactory([
          {
            targetSfId: 'fullHeightHandler',
            operation: 'write',
            path: 'props.componentChildren',
            value: [componentJson],
          },
        ]),
      },
    },
  ];
};

/**
 * @type { import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType }
 */
export const defaultProviderPage = smartFaceFactory({
  sfComponents: [
    uiHandlerFactory(
      {
        componentChildren: [
          pageFactory({
            modals: [
              modalFactory({
                closeable: true,
                bodyChildren: [
                  buttonFactory({
                    text: 'defaultSize: extraSmall',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: patchFactory([
                            {
                              targetSfId: 'ui-root',
                              operation: 'write',
                              path: 'props.defaultSize',
                              value: 'extraSmall',
                            },
                          ]),
                        },
                      },
                    ],
                  }),
                  buttonFactory({
                    text: 'defaultSize: extraLarge',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: patchFactory([
                            {
                              targetSfId: 'ui-root',
                              operation: 'write',
                              path: 'props.defaultSize',
                              value: 'extraLarge',
                            },
                          ]),
                        },
                      },
                    ],
                  }),
                ],
              }),
            ],
            document: { head: { title: 'Default Provider' } },
            componentChildren: [
              classicLayoutFactory({
                sidebar: sidebar('default-provider', ['sidebarParent']),
                content: {
                  componentChildren: [
                    flexboxFactory({
                      fullHeight: true,
                      flexDirection: 'column',
                      flexWrap: 'no-wrap',
                      items: [
                        flexboxItemFactory({
                          componentChildren: [
                            uiHandlerFactory({
                              defaultSize: 'extraSmall',
                              componentChildren: [
                                flexboxFactory({
                                  items: [
                                    flexboxItemFactory({
                                      componentChildren: [
                                        buttonFactory({
                                          text: 'button',
                                          onClick: onclick(buttonFactory({ text: 'Ich bin ein Button' })),
                                        }),
                                        buttonFactory({
                                          text: 'card',
                                          onClick: onclick(cardFactory({ title: 'Card' })),
                                        }),
                                        buttonFactory({
                                          text: 'breadcrumb',
                                          onClick: onclick(
                                            breadcrumbFactory({
                                              items: [
                                                breadcrumbItemFactory({ text: 'text' }),
                                                breadcrumbItemFactory({ text: 'href', href: 'sidebar' }),
                                              ],
                                            }),
                                          ),
                                        }),
                                        buttonFactory({
                                          text: 'checkbox',
                                          onClick: onclick(checkboxFactory({ label: 'Test', name: 'test' }, 'd')),
                                        }),
                                        buttonFactory({
                                          text: 'checkboxGroup',
                                          onClick: onclick(
                                            checkboxGroupFactory(
                                              {
                                                label: 'Test',
                                                name: 'test',
                                                options: [
                                                  { sfId: 'chk-0', label: 'Option-0' },
                                                  { sfId: 'chk-1', label: 'Option-1' },
                                                  { sfId: 'chk-2', label: 'Option-2' },
                                                ],
                                              },
                                              'd',
                                            ),
                                          ),
                                        }),
                                        buttonFactory({
                                          text: 'combobox',
                                          onClick: onclick(comboBoxFactory({ label: 'Box', name: 'funny' })),
                                        }),
                                        buttonFactory({
                                          text: 'datefield',
                                          onClick: onclick(dateFieldFactory({ label: 'date' })),
                                        }),
                                        buttonFactory({
                                          text: 'daterangefield',
                                          onClick: onclick(dateRangeFieldFactory({ label: 'Date Range' })),
                                        }),
                                        buttonFactory({
                                          text: 'decimalfield',
                                          onClick: onclick(decimalFieldFactory({ label: 'Decimal' })),
                                        }),
                                        buttonFactory({
                                          text: 'formtext',
                                          onClick: onclick(
                                            formTextFactory({ label: 'Form Text', value: 'Sample Text' }),
                                          ),
                                        }),
                                        buttonFactory({
                                          text: 'flexbox',
                                          onClick: onclick(
                                            flexboxFactory({
                                              items: [
                                                flexboxItemFactory({
                                                  componentChildren: [
                                                    cardFactory({ title: 'funny', fullHeight: true }),
                                                  ],
                                                }),
                                              ],
                                            }),
                                          ),
                                        }),
                                        buttonFactory({
                                          text: 'grid',
                                          onClick: onclick(
                                            gridFactory({
                                              items: [
                                                gridItemFactory({
                                                  size: 2,
                                                  componentChildren: [
                                                    cardFactory({ title: 'funny', fullHeight: true }),
                                                  ],
                                                }),
                                                gridItemFactory({
                                                  size: 2,
                                                  componentChildren: [
                                                    cardFactory({ title: 'funny', fullHeight: true }),
                                                  ],
                                                }),
                                              ],
                                            }),
                                          ),
                                        }),
                                        buttonFactory({
                                          text: 'integer',
                                          onClick: onclick(integerFieldFactory({ label: 'funny' })),
                                        }),
                                        buttonFactory({
                                          text: 'password',
                                          onClick: onclick(passwordFieldFactory({ label: 'funny' })),
                                        }),
                                        buttonFactory({
                                          text: 'progress',
                                          onClick: onclick(progressFactory({ presentation: 'linear' })),
                                        }),
                                        buttonFactory({
                                          text: 'radio',
                                          onClick: onclick(
                                            radioGroupFactory({
                                              label: 'funny',
                                              options: [
                                                { sfId: 'chk-0', label: 'Option-0' },
                                                { sfId: 'chk-1', label: 'Option-1' },
                                                { sfId: 'chk-2', label: 'Option-2' },
                                              ],
                                            }),
                                          ),
                                        }),
                                        buttonFactory({
                                          text: 'switch',
                                          onClick: onclick(switchFactory({ title: 'funny' })),
                                        }),
                                        buttonFactory({
                                          text: 'tabs',
                                          onClick: onclick(
                                            tabsFactory({
                                              items: [
                                                tabsItemFactory({
                                                  title: 'fun',
                                                  componentChildren: [cardFactory({ fullHeight: true, title: 'card' })],
                                                }),
                                              ],
                                            }),
                                          ),
                                        }),
                                        buttonFactory({
                                          text: 'integer',
                                          onClick: onclick(integerFieldFactory({ label: 'funny' })),
                                        }),
                                        buttonFactory({
                                          text: 'section',
                                          onClick: onclick(sectionFactory({ title: 'funny' })),
                                        }),
                                        buttonFactory({
                                          text: 'text',
                                          onClick: onclick(textFactory({ text: 'funny' })),
                                        }),
                                        buttonFactory({
                                          text: 'textarea',
                                          onClick: onclick(textareaFactory({ label: 'funny' })),
                                        }),
                                        buttonFactory({
                                          text: 'textfield',
                                          onClick: onclick(textFieldFactory({ label: 'funny' })),
                                        }),
                                        buttonFactory({
                                          text: 'timefield',
                                          onClick: onclick(timeFieldFactory({ label: 'funny' })),
                                        }),
                                        buttonFactory({
                                          text: 'select',
                                          onClick: onclick(
                                            selectFactory({
                                              name: 'modal-select-0',
                                              label: 'Favorite Icecream?',
                                              options: [
                                                ...times(10, (index) => {
                                                  return { label: `Option-${index}`, sfId: `modal-option${index}` };
                                                }),
                                              ],
                                            }),
                                          ),
                                        }),
                                        buttonFactory({
                                          text: 'barchart',
                                          onClick: onclick(
                                            barChartFactory({
                                              type: 'column',
                                              data: [
                                                {
                                                  name: 'japan',
                                                  value: [-137, -79, 105, -40, 41, -200, 88, 244, 274, 26, 122, 162],
                                                },
                                                {
                                                  name: 'france',
                                                  value: [248, -236, 105, 95, -279, 94, 22, -55, 2, 249, -57, 230],
                                                },
                                              ],
                                            }),
                                          ),
                                        }),
                                        buttonFactory({
                                          text: 'linechart',
                                          onClick: onclick(
                                            lineChartFactory({
                                              data: [
                                                {
                                                  name: 'japan',
                                                  value: [-137, -79, 105, -40, 41, -200, 88, 244, 274, 26, 122, 162],
                                                },
                                                {
                                                  name: 'france',
                                                  value: [248, -236, 105, 95, -279, 94, 22, -55, 2, 249, -57, 230],
                                                },
                                              ],
                                            }),
                                          ),
                                        }),
                                        buttonFactory({
                                          text: 'pieChart',
                                          onClick: onclick(pieChartFactory({})),
                                        }),
                                        buttonFactory({
                                          text: 'headerarea',
                                          onClick: onclick(
                                            headerAreaFactory({
                                              title: 'funny',
                                              componentChildren: [cardFactory({ title: 'fun', fullHeight: true })],
                                            }),
                                          ),
                                        }),
                                        buttonFactory({
                                          text: 'panelgroup',
                                          onClick: onclick(
                                            panelGroupFactory(
                                              {
                                                direction: 'horizontal',
                                                defaultThreshold: 'extraSmall',
                                                items: [
                                                  panelGroupItemFactory(
                                                    {
                                                      componentChildren: [textFactory({ text: 'left' })],
                                                    },
                                                    'panel-1',
                                                  ),

                                                  panelGroupItemFactory({
                                                    componentChildren: [textFactory({ text: 'right' })],
                                                  }),
                                                ],
                                              },
                                              'nested-panel-group',
                                            ),
                                          ),
                                        }),
                                        buttonFactory({
                                          text: 'treegraph',
                                          onClick: onclick(treeGraph),
                                        }),
                                        buttonFactory({
                                          text: 'workflowgraph',
                                          onClick: onclick(expertGraphJSON),
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                        flexboxItemFactory(
                          {
                            flexGrow: 1,
                            componentChildren: [
                              uiHandlerFactory(
                                {
                                  componentChildren: [getDataGrid(null, 'data-grid-0')],
                                },
                                'fullHeightHandler',
                              ),
                            ],
                          },
                          'flexbox',
                        ),
                      ],
                    }),
                  ],
                },
                footer: {
                  componentChildren: [
                    buttonFactory({
                      text: 'FullHeight: true',
                      onClick: [
                        {
                          type: 'request',
                          data: {
                            action: 'reflect',
                            reflectedData: patchFactory([
                              {
                                targetSfId: 'fullHeightHandler',
                                operation: 'write',
                                path: 'props.defaultFullHeight',
                                value: true,
                              },
                            ]),
                          },
                        },
                      ],
                    }),
                    buttonFactory({
                      text: 'FullHeight: false',
                      onClick: [
                        {
                          type: 'request',
                          data: {
                            action: 'reflect',
                            reflectedData: patchFactory([
                              {
                                targetSfId: 'fullHeightHandler',
                                operation: 'write',
                                path: 'props.defaultFullHeight',
                                value: false,
                              },
                            ]),
                          },
                        },
                      ],
                    }),
                    buttonFactory({
                      text: 'defaultSize: extraSmall',
                      onClick: [
                        {
                          type: 'request',
                          data: {
                            action: 'reflect',
                            reflectedData: patchFactory([
                              {
                                targetSfId: 'fullHeightHandler',
                                operation: 'write',
                                path: 'props.defaultSize',
                                value: 'extraSmall',
                              },
                            ]),
                          },
                        },
                      ],
                    }),
                    buttonFactory({
                      text: 'defaultSize: extraLarge',
                      onClick: [
                        {
                          type: 'request',
                          data: {
                            action: 'reflect',
                            reflectedData: patchFactory([
                              {
                                targetSfId: 'fullHeightHandler',
                                operation: 'write',
                                path: 'props.defaultSize',
                                value: 'extraLarge',
                              },
                            ]),
                          },
                        },
                      ],
                    }),
                  ],
                },
              }),
            ],
          }),
        ],
      },
      'ui-root',
    ),
  ],
});
