// @ts-check

import { buttonFactory } from '../../../../shared/smartFaceComponentFactories/core/buttonFactory.js';
import { cardFactory } from '../../../../shared/smartFaceComponentFactories/core/cardFactory.js';
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { comboBoxFactory } from '../../../../shared/smartFaceComponentFactories/core/comboBoxFactory.js';
import { formFactory } from '../../../../shared/smartFaceComponentFactories/core/formFactory.js';
import { gridFactory, gridItemFactory } from '../../../../shared/smartFaceComponentFactories/core/gridFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { footer } from '../shared/footer.js';
import { patchFactory } from '../shared/patchFactory.js';
import { sidebar } from '../shared/sidebar.js';

/**
 * @type { import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType }
 */
export const comboBoxPage = smartFaceFactory({
  sfComponents: [
    pageFactory({
      document: { head: { title: 'Combobox Page' } },
      componentChildren: [
        classicLayoutFactory({
          sidebar: sidebar('combo-box-page', ['form-pages']),
          content: {
            componentChildren: [
              gridFactory({
                items: [
                  gridItemFactory({
                    size: 6,
                    componentChildren: [
                      formFactory(
                        {
                          componentChildren: [
                            cardFactory({
                              title: 'ComboBox',
                              bodyChildren: [
                                gridFactory({
                                  items: [
                                    gridItemFactory({
                                      size: 10,
                                      componentChildren: [
                                        comboBoxFactory(
                                          {
                                            onEnterKeyDown: [
                                              {
                                                type: 'request',
                                                data: {
                                                  action: 'reflect',
                                                  reflectedData: {
                                                    sideEffects: [
                                                      {
                                                        type: 'addNotification',
                                                        message: 'This will open a Modal in Production',
                                                      },
                                                    ],
                                                  },
                                                },
                                              },
                                            ],
                                            // type: 'modal',
                                            getResultMinLength: 3,
                                            getResultDelay: 500,
                                            clearValueOnQueryChange: false,
                                            //clearValueOnFocus: true,
                                            url: '/combo-box-backend',
                                            label: 'Choose your friend',
                                            name: 'friend',
                                            // size: 'extraSmall',
                                            // query: 'Hello',
                                            // value: { id: 'oighesges', text: 'Whoops' },
                                            helpText: 'Help',
                                            onValueChange: [
                                              {
                                                type: 'request',
                                                data: {
                                                  action: 'reflect',
                                                  reflectedData: {
                                                    sideEffects: [{ type: 'consoleMessage', message: 'Value changed' }],
                                                  },
                                                },
                                              },
                                            ],
                                          },
                                          'combo-box-0',
                                          'data-guide-test',
                                        ),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                              footerChildren: [
                                gridFactory({
                                  columnGap: 'extraSmall',
                                  rowGap: 'extraSmall',
                                  items: [
                                    gridItemFactory({
                                      componentChildren: [
                                        buttonFactory({
                                          text: 'Submit Form',
                                          onClick: [{ type: 'request', data: { action: 'return-empty' } }],
                                        }),
                                      ],
                                    }),
                                    gridItemFactory({
                                      componentChildren: [
                                        buttonFactory({
                                          text: 'Change presentation to modal',
                                          onClick: [
                                            {
                                              type: 'request',
                                              data: {
                                                action: 'reflect',
                                                reflectedData: patchFactory([
                                                  {
                                                    targetSfId: 'combo-box-0',
                                                    operation: 'write',
                                                    path: 'props.presentation',
                                                    value: 'modal',
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
                                          text: 'Change value',
                                          onClick: [
                                            {
                                              type: 'request',
                                              data: {
                                                action: 'reflect',
                                                reflectedData: patchFactory([
                                                  {
                                                    targetSfId: 'combo-box-0',
                                                    operation: 'write',
                                                    path: 'props.value',
                                                    value: 'specific-item-0',
                                                  },
                                                  {
                                                    targetSfId: 'combo-box-0',
                                                    operation: 'write',
                                                    path: 'props.query',
                                                    value: 'New Query',
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
                                          text: 'Change getResultDelay',
                                          onClick: [
                                            {
                                              type: 'request',
                                              data: {
                                                action: 'reflect',
                                                reflectedData: patchFactory([
                                                  {
                                                    targetSfId: 'combo-box-0',
                                                    operation: 'write',
                                                    path: 'props.getResultDelay',
                                                    value: 5000,
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
                                          text: 'getResultMinLength = 0',
                                          onClick: [
                                            {
                                              type: 'request',
                                              data: {
                                                action: 'reflect',
                                                reflectedData: patchFactory([
                                                  {
                                                    targetSfId: 'combo-box-0',
                                                    operation: 'write',
                                                    path: 'props.getResultMinLength',
                                                    value: 0,
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
                                          text: 'getResultMinLength = 3',
                                          onClick: [
                                            {
                                              type: 'request',
                                              data: {
                                                action: 'reflect',
                                                reflectedData: patchFactory([
                                                  {
                                                    targetSfId: 'combo-box-0',
                                                    operation: 'write',
                                                    path: 'props.getResultMinLength',
                                                    value: 3,
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
                                          text: 'alwaysOpenOnFocus: true',
                                          onClick: [
                                            {
                                              type: 'request',
                                              data: {
                                                action: 'reflect',
                                                reflectedData: patchFactory([
                                                  {
                                                    targetSfId: 'combo-box-0',
                                                    operation: 'write',
                                                    path: 'props.alwaysOpenOnFocus',
                                                    value: true,
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
                                          text: 'alwaysOpenOnFocus: false',
                                          onClick: [
                                            {
                                              type: 'request',
                                              data: {
                                                action: 'reflect',
                                                reflectedData: patchFactory([
                                                  {
                                                    targetSfId: 'combo-box-0',
                                                    operation: 'write',
                                                    path: 'props.alwaysOpenOnFocus',
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
                            }),
                          ],
                        },
                        'form-0',
                      ),
                    ],
                  }),
                  gridItemFactory({
                    size: 6,
                    componentChildren: [
                      formFactory(
                        {
                          componentChildren: [
                            cardFactory({
                              title: 'MultiComboBox',
                              bodyChildren: [
                                gridFactory({
                                  items: [
                                    gridItemFactory({
                                      size: 10,
                                      componentChildren: [
                                        comboBoxFactory(
                                          {
                                            onEnterKeyDown: [
                                              {
                                                type: 'request',
                                                data: {
                                                  action: 'reflect',
                                                  reflectedData: {
                                                    sideEffects: [
                                                      {
                                                        type: 'addNotification',
                                                        message: 'This will open a Modal in Production',
                                                      },
                                                    ],
                                                  },
                                                },
                                              },
                                            ],
                                            multiple: true,
                                            getResultDelay: 100,
                                            clearValueOnQueryChange: false,
                                            url: '/combo-box-backend',
                                            label: 'Choose your friends',
                                            placeholder: 'Placeholder',
                                            name: 'friends',
                                            helpText: 'Help',
                                            onValueChange: [
                                              {
                                                type: 'request',
                                                data: {
                                                  action: 'reflect',
                                                  reflectedData: {
                                                    sideEffects: [{ type: 'consoleMessage', message: 'Value changed' }],
                                                  },
                                                },
                                              },
                                            ],
                                          },
                                          'multi-combo-box-0',
                                        ),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                              footerChildren: [
                                gridFactory({
                                  columnGap: 'extraSmall',
                                  rowGap: 'extraSmall',
                                  items: [
                                    gridItemFactory({
                                      componentChildren: [
                                        buttonFactory({
                                          text: 'Force Focus',
                                          color: 'danger',
                                          onClick: [
                                            {
                                              type: 'request',
                                              data: {
                                                action: 'reflect',
                                                reflectedData: {
                                                  sideEffects: [
                                                    { type: 'navigateToElement', id: 'multi-combo-box-0', focus: true },
                                                  ],
                                                },
                                              },
                                            },
                                          ],
                                        }),
                                      ],
                                    }),
                                    gridItemFactory({
                                      componentChildren: [
                                        buttonFactory({
                                          text: 'Change presentation to modal',
                                          onClick: [
                                            {
                                              type: 'request',
                                              data: {
                                                action: 'reflect',
                                                reflectedData: patchFactory([
                                                  {
                                                    targetSfId: 'multi-combo-box-0',
                                                    operation: 'write',
                                                    path: 'props.presentation',
                                                    value: 'modal',
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
                                          text: 'Change presentation to dropdown',
                                          onClick: [
                                            {
                                              type: 'request',
                                              data: {
                                                action: 'reflect',
                                                reflectedData: patchFactory([
                                                  {
                                                    targetSfId: 'multi-combo-box-0',
                                                    operation: 'write',
                                                    path: 'props.presentation',
                                                    value: 'dropdown',
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
                                          text: 'Change value',
                                          onClick: [
                                            {
                                              type: 'request',
                                              data: {
                                                action: 'reflect',
                                                reflectedData: patchFactory([
                                                  {
                                                    targetSfId: 'combo-box-0',
                                                    operation: 'write',
                                                    path: 'props.value',
                                                    value: 'specific-item-0',
                                                  },
                                                  {
                                                    targetSfId: 'multi-combo-box-0',
                                                    operation: 'write',
                                                    path: 'props.query',
                                                    value: 'New Query',
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
                                          text: 'Change readOnly',
                                          onClick: [
                                            {
                                              type: 'request',
                                              data: {
                                                action: 'reflect',
                                                reflectedData: patchFactory([
                                                  {
                                                    targetSfId: 'multi-combo-box-0',
                                                    operation: 'write',
                                                    path: 'props.readOnly',
                                                    value: true,
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
                                          text: 'getResultMinLength = undefined',
                                          onClick: [
                                            {
                                              type: 'request',
                                              data: {
                                                action: 'reflect',
                                                reflectedData: patchFactory([
                                                  {
                                                    targetSfId: 'multi-combo-box-0',
                                                    operation: 'write',
                                                    path: 'props.getResultMinLength',
                                                    value: undefined,
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
                                          text: 'getResultMinLength = 0',
                                          onClick: [
                                            {
                                              type: 'request',
                                              data: {
                                                action: 'reflect',
                                                reflectedData: patchFactory([
                                                  {
                                                    targetSfId: 'multi-combo-box-0',
                                                    operation: 'write',
                                                    path: 'props.getResultMinLength',
                                                    value: 0,
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
                                          text: 'getResultMinLength = 3',
                                          onClick: [
                                            {
                                              type: 'request',
                                              data: {
                                                action: 'reflect',
                                                reflectedData: patchFactory([
                                                  {
                                                    targetSfId: 'multi-combo-box-0',
                                                    operation: 'write',
                                                    path: 'props.getResultMinLength',
                                                    value: 3,
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
                                          text: 'alwaysOpenOnFocus: true',
                                          onClick: [
                                            {
                                              type: 'request',
                                              data: {
                                                action: 'reflect',
                                                reflectedData: patchFactory([
                                                  {
                                                    targetSfId: 'multi-combo-box-0',
                                                    operation: 'write',
                                                    path: 'props.alwaysOpenOnFocus',
                                                    value: true,
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
                                          text: 'alwaysOpenOnFocus: false',
                                          onClick: [
                                            {
                                              type: 'request',
                                              data: {
                                                action: 'reflect',
                                                reflectedData: patchFactory([
                                                  {
                                                    targetSfId: 'multi-combo-box-0',
                                                    operation: 'write',
                                                    path: 'props.alwaysOpenOnFocus',
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
                            }),
                          ],
                        },
                        'form-1',
                      ),
                    ],
                  }),
                  gridItemFactory({
                    size: 6,
                    componentChildren: [
                      formFactory(
                        {
                          componentChildren: [
                            cardFactory({
                              title: 'ComboBox (With clearValueOnFocus: true)',
                              bodyChildren: [
                                gridFactory({
                                  items: [
                                    gridItemFactory({
                                      size: 10,
                                      componentChildren: [
                                        comboBoxFactory(
                                          {
                                            // type: 'modal',
                                            getResultMinLength: 3,
                                            getResultDelay: 500,
                                            clearValueOnQueryChange: false,
                                            clearValueOnFocus: true,
                                            url: '/combo-box-backend',
                                            label: 'Choose your friend',
                                            name: 'friend',
                                            // size: 'extraSmall',
                                            // query: 'Hello',
                                            // value: { id: 'oighesges', text: 'Whoops' },
                                            helpText: 'Help',
                                            onValueChange: [
                                              {
                                                type: 'request',
                                                data: {
                                                  action: 'reflect',
                                                  reflectedData: {
                                                    sideEffects: [{ type: 'consoleMessage', message: 'Value changed' }],
                                                  },
                                                },
                                              },
                                            ],
                                          },
                                          'combo-box-2',
                                        ),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                              footerChildren: [
                                gridFactory({
                                  columnGap: 'extraSmall',
                                  rowGap: 'extraSmall',
                                  items: [
                                    gridItemFactory({
                                      componentChildren: [
                                        buttonFactory({
                                          text: 'Submit Form',
                                          onClick: [{ type: 'request', data: { action: 'return-empty' } }],
                                        }),
                                      ],
                                    }),
                                    gridItemFactory({
                                      componentChildren: [
                                        buttonFactory({
                                          text: 'Change presentation to modal',
                                          onClick: [
                                            {
                                              type: 'request',
                                              data: {
                                                action: 'reflect',
                                                reflectedData: patchFactory([
                                                  {
                                                    targetSfId: 'combo-box-2',
                                                    operation: 'write',
                                                    path: 'props.presentation',
                                                    value: 'modal',
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
                                          text: 'Change value',
                                          onClick: [
                                            {
                                              type: 'request',
                                              data: {
                                                action: 'reflect',
                                                reflectedData: patchFactory([
                                                  {
                                                    targetSfId: 'combo-box-2',
                                                    operation: 'write',
                                                    path: 'props.value',
                                                    value: 'specific-item-2',
                                                  },
                                                  {
                                                    targetSfId: 'combo-box-2',
                                                    operation: 'write',
                                                    path: 'props.query',
                                                    value: 'New Query',
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
                                          text: 'Change getResultDelay',
                                          onClick: [
                                            {
                                              type: 'request',
                                              data: {
                                                action: 'reflect',
                                                reflectedData: patchFactory([
                                                  {
                                                    targetSfId: 'combo-box-2',
                                                    operation: 'write',
                                                    path: 'props.getResultDelay',
                                                    value: 5000,
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
                        },
                        'form-2',
                      ),
                    ],
                  }),
                  gridItemFactory({
                    size: 6,
                    componentChildren: [
                      formFactory(
                        {
                          componentChildren: [
                            cardFactory({
                              title: 'MultiComboBox (With initial value)',
                              bodyChildren: [
                                gridFactory({
                                  items: [
                                    gridItemFactory({
                                      size: 10,
                                      componentChildren: [
                                        comboBoxFactory(
                                          {
                                            onEnterKeyDown: [
                                              {
                                                type: 'request',
                                                data: {
                                                  action: 'reflect',
                                                  reflectedData: {
                                                    sideEffects: [
                                                      {
                                                        type: 'addNotification',
                                                        message: 'This will open a Modal in Production',
                                                      },
                                                    ],
                                                  },
                                                },
                                              },
                                            ],
                                            multiple: true,
                                            getResultDelay: 100,
                                            clearValueOnQueryChange: false,
                                            url: '/combo-box-backend',
                                            label: 'Choose your friends',
                                            placeholder: 'Placeholder',
                                            name: 'friends',
                                            helpText: 'Help',
                                            value: [
                                              { id: 'specific-item-0', text: '1. My specific item' },
                                              { id: 'specific-item-1', text: '*My second specific (item)' },
                                            ],
                                            onValueChange: [
                                              {
                                                type: 'request',
                                                data: {
                                                  action: 'reflect',
                                                  reflectedData: {
                                                    sideEffects: [{ type: 'consoleMessage', message: 'Value changed' }],
                                                  },
                                                },
                                              },
                                            ],
                                          },
                                          'multi-combo-box-1',
                                        ),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                              footerChildren: [
                                gridFactory({
                                  columnGap: 'extraSmall',
                                  rowGap: 'extraSmall',
                                  items: [
                                    gridItemFactory({
                                      componentChildren: [
                                        buttonFactory({
                                          text: 'Force Focus',
                                          color: 'danger',
                                          onClick: [
                                            {
                                              type: 'request',
                                              data: {
                                                action: 'reflect',
                                                reflectedData: {
                                                  sideEffects: [
                                                    { type: 'navigateToElement', id: 'multi-combo-box-1', focus: true },
                                                  ],
                                                },
                                              },
                                            },
                                          ],
                                        }),
                                      ],
                                    }),
                                    gridItemFactory({
                                      componentChildren: [
                                        buttonFactory({
                                          text: 'Change presentation to modal',
                                          onClick: [
                                            {
                                              type: 'request',
                                              data: {
                                                action: 'reflect',
                                                reflectedData: patchFactory([
                                                  {
                                                    targetSfId: 'multi-combo-box-1',
                                                    operation: 'write',
                                                    path: 'props.presentation',
                                                    value: 'modal',
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
                                          text: 'Change presentation to dropdown',
                                          onClick: [
                                            {
                                              type: 'request',
                                              data: {
                                                action: 'reflect',
                                                reflectedData: patchFactory([
                                                  {
                                                    targetSfId: 'multi-combo-box-1',
                                                    operation: 'write',
                                                    path: 'props.presentation',
                                                    value: 'dropdown',
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
                                          text: 'Change value',
                                          onClick: [
                                            {
                                              type: 'request',
                                              data: {
                                                action: 'reflect',
                                                reflectedData: patchFactory([
                                                  {
                                                    targetSfId: 'combo-box-0',
                                                    operation: 'write',
                                                    path: 'props.value',
                                                    value: 'specific-item-0',
                                                  },
                                                  {
                                                    targetSfId: 'multi-combo-box-1',
                                                    operation: 'write',
                                                    path: 'props.query',
                                                    value: 'New Query',
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
                                          text: 'Change readOnly',
                                          onClick: [
                                            {
                                              type: 'request',
                                              data: {
                                                action: 'reflect',
                                                reflectedData: patchFactory([
                                                  {
                                                    targetSfId: 'multi-combo-box-1',
                                                    operation: 'write',
                                                    path: 'props.readOnly',
                                                    value: true,
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
                                          text: 'getResultMinLength = undefined',
                                          onClick: [
                                            {
                                              type: 'request',
                                              data: {
                                                action: 'reflect',
                                                reflectedData: patchFactory([
                                                  {
                                                    targetSfId: 'multi-combo-box-1',
                                                    operation: 'write',
                                                    path: 'props.getResultMinLength',
                                                    value: undefined,
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
                                          text: 'getResultMinLength = 0',
                                          onClick: [
                                            {
                                              type: 'request',
                                              data: {
                                                action: 'reflect',
                                                reflectedData: patchFactory([
                                                  {
                                                    targetSfId: 'multi-combo-box-1',
                                                    operation: 'write',
                                                    path: 'props.getResultMinLength',
                                                    value: 0,
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
                                          text: 'getResultMinLength = 3',
                                          onClick: [
                                            {
                                              type: 'request',
                                              data: {
                                                action: 'reflect',
                                                reflectedData: patchFactory([
                                                  {
                                                    targetSfId: 'multi-combo-box-1',
                                                    operation: 'write',
                                                    path: 'props.getResultMinLength',
                                                    value: 3,
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
                                          text: 'alwaysOpenOnFocus: true',
                                          onClick: [
                                            {
                                              type: 'request',
                                              data: {
                                                action: 'reflect',
                                                reflectedData: patchFactory([
                                                  {
                                                    targetSfId: 'multi-combo-box-1',
                                                    operation: 'write',
                                                    path: 'props.alwaysOpenOnFocus',
                                                    value: true,
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
                                          text: 'alwaysOpenOnFocus: false',
                                          onClick: [
                                            {
                                              type: 'request',
                                              data: {
                                                action: 'reflect',
                                                reflectedData: patchFactory([
                                                  {
                                                    targetSfId: 'multi-combo-box-1',
                                                    operation: 'write',
                                                    path: 'props.alwaysOpenOnFocus',
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
                            }),
                          ],
                        },
                        'form-1',
                      ),
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
