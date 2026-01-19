// @ts-check
import { buttonFactory } from '../../../../shared/smartFaceComponentFactories/core/buttonFactory.js';
import { cardFactory } from '../../../../shared/smartFaceComponentFactories/core/cardFactory.js';
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { comboBoxFactory } from '../../../../shared/smartFaceComponentFactories/core/comboBoxFactory.js';
import { dateFieldFactory } from '../../../../shared/smartFaceComponentFactories/core/dateFieldFactory.js';
import { dateRangeFieldFactory } from '../../../../shared/smartFaceComponentFactories/core/dateRangeFieldFactory.js';
import { gridFactory, gridItemFactory } from '../../../../shared/smartFaceComponentFactories/core/gridFactory.js';
import { modalFactory, pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { selectFactory } from '../../../../shared/smartFaceComponentFactories/core/selectFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { streamlineIconFactory } from '../../../../shared/smartFaceComponentFactories/core/streamlineIconFactory.js';
import { textFactory } from '../../../../shared/smartFaceComponentFactories/core/textFactory.js';
import { textFieldFactory } from '../../../../shared/smartFaceComponentFactories/core/textFieldFactory.js';
import { timeFieldFactory } from '../../../../shared/smartFaceComponentFactories/core/timeFieldFactory.js';
import { uiHandlerFactory } from '../../../../shared/smartFaceComponentFactories/core/uiHandlerFactory.js';
import { footer } from '../shared/footer.js';
import { sidebar } from '../shared/sidebar.js';

// COMP COLLECTION
// ########################################################################

const dummyText =
  '“I see you feel as I do,” said Mr. Enfield. “Yes, it’s a bad story. For my man was a fellow that nobody could have to do with, a really damnable man; and the';
const extraSmallModalsRow = [];
const extraLargeModalsRow = [];
const extraLargeDropdownsRow = [];

// TIME-FIELD
const timeField = (id) =>
  timeFieldFactory(
    {
      name: 'time-0',
      label: 'What time is it?',
    },
    id,
  );
extraSmallModalsRow.push({ name: 'TimeField', comp: timeField('timeField-0-extraSmall') });
extraLargeModalsRow.push({ name: 'TimeField', comp: timeField('timeField-0-extraLarge') });
// DATE-FIELD
const dateField = (id) =>
  uiHandlerFactory({
    iconSet: 'streamline',
    componentChildren: [
      dateFieldFactory(
        {
          label: 'Date Label',
          name: 'date-field-0',
          mandatory: true,
          helpText: 'Helptext',
          format: 'DDMMYYYY',
          onValueChange: [
            {
              type: 'request',
              blockUi: false,
              data: {
                action: 'form-page',
                targetId: 'date-field-0',
                pageEvent: 'on-value-change',
              },
            },
          ],
        },
        id,
      ),
    ],
  });
extraSmallModalsRow.push({
  name: 'DateField',
  comp: dateField('dateField-0-extraSmall'),
});
extraLargeModalsRow.push({
  name: 'DateField',
  comp: dateField('dateField-0-extraLarge'),
});

// DATERANGEFIELD
const dateRangeField = (id) =>
  dateRangeFieldFactory(
    {
      label: 'Default',
      name: 'dateRangeField-1',
      startDate: '2023-19-10',
      onValueChange: [
        {
          type: 'request',
          data: {
            action: 'form-page',
            targetId: 'dateRangeField-1',
            pageEvent: 'on-value-change',
          },
        },
      ],
    },
    id,
  );
extraSmallModalsRow.push({ name: 'DateRangeField', comp: dateRangeField('dateRangeField-0-extraSmall') });
extraLargeModalsRow.push({ name: 'DateRangeField', comp: dateRangeField('dateRangeField-0-extraLarge') });

// COMBOBOX
const comboBoxModal = (id) =>
  comboBoxFactory(
    {
      presentation: 'modal',
      getResultMinLength: 3,
      getResultDelay: 500,
      clearValueOnQueryChange: false,
      url: '/combo-box-backend',
      label: 'Choose your friend',
      name: 'friend',
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
    id,
  );

const comboBoxDropdown = (id) =>
  comboBoxFactory(
    {
      presentation: 'dropdown',
      getResultMinLength: 3,
      getResultDelay: 500,
      clearValueOnQueryChange: false,
      url: '/combo-box-backend',
      label: 'Choose your friend',
      name: 'friend',
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
    id,
  );
extraSmallModalsRow.push({ name: 'comboBoxModal', comp: comboBoxModal('comboBoxModal-0-extraSmall') });
extraLargeModalsRow.push({ name: 'comboBoxModal', comp: comboBoxModal('comboBoxModal-0-extraLarge') });
extraLargeDropdownsRow.push({ name: 'comboBoxDropdown', comp: comboBoxDropdown('comboBoxDropdown-0-extraLarge') });

// SELECT
const selectDropdown = (id) =>
  selectFactory(
    {
      presentation: 'dropdown',
      getResultMinLength: 3,
      getResultDelay: 500,
      clearValueOnQueryChange: false,
      url: '/combo-box-backend',
      label: 'Choose your friend',
      name: 'friend',
      helpText: 'Help',
      options: [
        { label: 'Vanilla', sfId: 'option-0' },
        { label: 'Chocolate', sfId: 'option-1' },
        { label: 'Pistachio', sfId: 'option-2' },
        { label: 'Strawberry', sfId: 'option-3' },
        { label: 'Stracciatella', sfId: 'option-4' },
        { label: 'Beer', sfId: 'option-5' },
        { label: 'Sausage', sfId: 'option-6' },
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
    id,
  );
extraLargeDropdownsRow.push({ name: 'selectDropdown', comp: selectDropdown('selectDropdown-0-extraLarge') });

const generateSingleModal = (props, Index) => {
  return modalFactory(
    {
      closeable: true,
      ...props,
    },
    `prompts-${Index}`,
  );
};

const extraSmallModalsRowButtons = [];
const extraLargeModalsRowButtons = [];
const extraLargeDropdownsRowButtons = [];
const pushToRow = (compArr, buttonArr, size) => {
  compArr.forEach((button) => {
    buttonArr.push(
      gridItemFactory({
        componentChildren: [
          buttonFactory({
            text: `${button.name}`,
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
                            targetSfId: 'page-0',
                            path: 'props.modals',
                            value: [
                              generateSingleModal({
                                title: `${button.name}`,
                                bodyChildren: [button.comp],
                                size: size,
                              }),
                            ],
                          },
                        ],
                      },
                      { type: 'navigateToElement', id: 'modal-0-button-0', focus: true, scrollIntoView: false },
                    ],
                  },
                },
              },
            ],
          }),
        ],
      }),
    );
  });
};

pushToRow(extraSmallModalsRow, extraSmallModalsRowButtons, 'extraSmall');
pushToRow(extraLargeModalsRow, extraLargeModalsRowButtons, 'extraLarge');
pushToRow(extraLargeDropdownsRow, extraLargeDropdownsRowButtons, 'extraLarge');

/** @type {import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType.js').SmartFaceBackendDataType}  */
export const promptsPage = smartFaceFactory({
  sfComponents: [
    pageFactory(
      {
        document: { head: { title: 'Prompts Page' } },
        componentChildren: [
          classicLayoutFactory({
            sidebar: sidebar('prompts-page'),
            content: {
              componentChildren: [
                gridFactory({
                  items: [
                    gridItemFactory(
                      {
                        size: 6,
                        componentChildren: [
                          cardFactory({
                            title: 'Modals',
                            subtitle: '- extraSmall',
                            icon: streamlineIconFactory({ name: 'messages-bubble-double' }),
                            bodyChildren: [
                              gridFactory({
                                items: [
                                  gridItemFactory({
                                    componentChildren: [
                                      textFactory({
                                        htmlTag: 'p',
                                        text: dummyText,
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            ],
                            footerChildren: [
                              gridFactory({
                                items: [
                                  gridItemFactory({
                                    size: 4,
                                    componentChildren: [
                                      gridFactory({
                                        rowGap: 'extraSmall',
                                        columnGap: 'extraSmall',
                                        items: [...extraSmallModalsRowButtons],
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      },
                      'item-2',
                    ),
                    gridItemFactory(
                      {
                        size: 6,
                        componentChildren: [
                          cardFactory({
                            title: 'Modals',
                            subtitle: '- extraLarge',
                            icon: streamlineIconFactory({ name: 'messages-bubble-double' }),
                            bodyChildren: [
                              gridFactory({
                                items: [
                                  gridItemFactory({
                                    componentChildren: [
                                      textFactory({
                                        htmlTag: 'p',
                                        text: dummyText,
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            ],
                            footerChildren: [
                              gridFactory({
                                items: [
                                  gridItemFactory({
                                    size: 7,
                                    componentChildren: [
                                      gridFactory({
                                        rowGap: 'extraSmall',
                                        columnGap: 'extraSmall',
                                        items: [...extraLargeModalsRowButtons],
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      },
                      'item-3',
                    ),
                    gridItemFactory(
                      {
                        size: 6,
                        componentChildren: [
                          cardFactory({
                            title: 'Dropdowns',
                            icon: streamlineIconFactory({ name: 'messages-bubble-double' }),
                            bodyChildren: [
                              gridFactory({
                                items: [
                                  gridItemFactory({
                                    componentChildren: [
                                      textFactory({
                                        htmlTag: 'p',
                                        text: dummyText,
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            ],
                            footerChildren: [
                              gridFactory({
                                items: [
                                  gridItemFactory({
                                    size: 7,
                                    componentChildren: [
                                      gridFactory({
                                        rowGap: 'extraSmall',
                                        columnGap: 'extraSmall',
                                        items: [...extraLargeDropdownsRowButtons],
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      },
                      'item-4',
                    ),
                    gridItemFactory(
                      {
                        size: { sm: 12, md: 6, lg: 4 },
                        componentChildren: [
                          cardFactory({
                            title: 'Focus on Open',
                            icon: streamlineIconFactory({ name: 'messages-bubble-double' }),
                            bodyChildren: [
                              gridFactory({
                                items: [
                                  gridItemFactory({
                                    componentChildren: [
                                      textFactory({
                                        htmlTag: 'p',
                                        text: dummyText,
                                      }),
                                    ],
                                  }),
                                ],
                              }),
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
                                          text: 'Modal with TextField',
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
                                                          targetSfId: 'page-0',
                                                          path: 'props.modals',
                                                          value: [
                                                            modalFactory(
                                                              {
                                                                title: `navigateToElement to focus textfield`,
                                                                entryAnimation: 'top',
                                                                exitAnimation: 'right',
                                                                closeable: true,
                                                                bodyChildren: [
                                                                  textFieldFactory(
                                                                    {
                                                                      label: 'TestLabel',
                                                                      name: 'testlabel',
                                                                    },
                                                                    'text-field-1',
                                                                  ),
                                                                ],
                                                              },
                                                              'modal-with-input',
                                                            ),
                                                          ],
                                                        },
                                                      ],
                                                    },

                                                    {
                                                      type: 'navigateToElement',
                                                      id: 'text-field-1',
                                                      focus: true,
                                                      scrollIntoView: false,
                                                    },
                                                  ],
                                                },
                                              },
                                            },
                                          ],
                                        },
                                        'modal-with-textfield',
                                      ),
                                    ],
                                  }),
                                  gridItemFactory({
                                    componentChildren: [
                                      buttonFactory(
                                        {
                                          text: 'Modal with ComboBox (presentation: modal + alwaysOpenOnFocus)',
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
                                                          targetSfId: 'page-0',
                                                          path: 'props.modals',
                                                          value: [
                                                            modalFactory(
                                                              {
                                                                title: 'navigateToElement to focus combobox',
                                                                entryAnimation: 'top',
                                                                exitAnimation: 'right',
                                                                closeable: true,
                                                                bodyChildren: [
                                                                  comboBoxFactory(
                                                                    {
                                                                      presentation: 'modal',
                                                                      alwaysOpenOnFocus: true,
                                                                      getResultMinLength: 3,
                                                                      getResultDelay: 500,
                                                                      clearValueOnQueryChange: false,
                                                                      url: '/combo-box-backend',
                                                                      label: 'Choose your foe',
                                                                      name: 'foe',
                                                                      helpText: 'alwaysOpenOnFocus: true',
                                                                      onValueChange: [
                                                                        {
                                                                          type: 'request',
                                                                          data: {
                                                                            action: 'reflect',
                                                                            reflectedData: {
                                                                              sideEffects: [
                                                                                {
                                                                                  type: 'consoleMessage',
                                                                                  message: 'Value changed',
                                                                                },
                                                                              ],
                                                                            },
                                                                          },
                                                                        },
                                                                      ],
                                                                    },
                                                                    'combobox-in-modal',
                                                                  ),
                                                                ],
                                                              },
                                                              'modal-with-combobox',
                                                            ),
                                                          ],
                                                        },
                                                      ],
                                                    },

                                                    {
                                                      type: 'navigateToElement',
                                                      id: 'combobox-in-modal',
                                                      focus: true,
                                                      scrollIntoView: false,
                                                    },
                                                  ],
                                                },
                                              },
                                            },
                                          ],
                                        },
                                        'modal-with-combobox',
                                      ),
                                    ],
                                  }),
                                  gridItemFactory({
                                    componentChildren: [
                                      buttonFactory(
                                        {
                                          text: 'Modal with MultiComboBox (presentation: modal)',
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
                                                          targetSfId: 'page-0',
                                                          path: 'props.modals',
                                                          value: [
                                                            modalFactory(
                                                              {
                                                                title: `navigateToElement to focus (multi-)combobox`,
                                                                entryAnimation: 'top',
                                                                exitAnimation: 'right',
                                                                closeable: true,
                                                                bodyChildren: [
                                                                  comboBoxFactory(
                                                                    {
                                                                      presentation: 'modal',
                                                                      // alwaysOpenOnFocus: true,
                                                                      multiple: true,
                                                                      getResultMinLength: 3,
                                                                      getResultDelay: 500,
                                                                      clearValueOnQueryChange: false,
                                                                      url: '/combo-box-backend',
                                                                      label: 'Choose your foe',
                                                                      name: 'foe',
                                                                      helpText: 'alwaysOpenOnFocus: true',
                                                                      onValueChange: [
                                                                        {
                                                                          type: 'request',
                                                                          data: {
                                                                            action: 'reflect',
                                                                            reflectedData: {
                                                                              sideEffects: [
                                                                                {
                                                                                  type: 'consoleMessage',
                                                                                  message: 'Value changed',
                                                                                },
                                                                              ],
                                                                            },
                                                                          },
                                                                        },
                                                                      ],
                                                                    },
                                                                    'multicombobox-in-modal',
                                                                  ),
                                                                ],
                                                              },
                                                              'modal-with-multicombobox',
                                                            ),
                                                          ],
                                                        },
                                                      ],
                                                    },

                                                    {
                                                      type: 'navigateToElement',
                                                      id: 'multicombobox-in-modal',
                                                      focus: true,
                                                      scrollIntoView: false,
                                                    },
                                                  ],
                                                },
                                              },
                                            },
                                          ],
                                        },
                                        'modal-with-multicombobox',
                                      ),
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      },
                      'item-5',
                    ),
                  ],
                }),

                // keyDownSideEffectFactory({
                //   shortcut: { key: 'F2' },
                //   onKeyDown: [
                //     {
                //       type: 'request',
                //       data: {
                //         action: 'reflect',
                //         reflectedData: {
                //           sideEffects: [
                //             {
                //               type: 'addNotification',
                //               id: 'notification-test',
                //               title: 'Test',
                //               message: 'This is a test notification',
                //               duration: 'infinite',
                //             },
                //           ],
                //         },
                //       },
                //     },
                //   ],
                // }),
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
