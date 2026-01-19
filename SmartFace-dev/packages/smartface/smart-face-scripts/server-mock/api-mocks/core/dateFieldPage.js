// @ts-check

import { buttonFactory } from '../../../../shared/smartFaceComponentFactories/core/buttonFactory.js';
import { cardFactory } from '../../../../shared/smartFaceComponentFactories/core/cardFactory.js';
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { dateFieldFactory } from '../../../../shared/smartFaceComponentFactories/core/dateFieldFactory.js';
import { dateRangeFieldFactory } from '../../../../shared/smartFaceComponentFactories/core/dateRangeFieldFactory.js';
import { formFactory } from '../../../../shared/smartFaceComponentFactories/core/formFactory.js';
import { gridFactory, gridItemFactory } from '../../../../shared/smartFaceComponentFactories/core/gridFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { uiHandlerFactory } from '../../../../shared/smartFaceComponentFactories/core/uiHandlerFactory.js';
import { footer } from '../shared/footer.js';
import { patchFactory } from '../shared/patchFactory.js';
import { sidebar } from '../shared/sidebar.js';

const dateRangeFieldFullWidthCard = cardFactory({
  title: 'Date Range Picker',
  bodyChildren: [
    gridFactory({
      items: [
        gridItemFactory({
          componentChildren: [
            dateRangeFieldFactory(
              {
                label: 'Default',
                name: 'dateRangeField-default',
                startDate: '2023-19-10',
                onValueChange: [
                  {
                    type: 'request',
                    data: {
                      action: 'form-page',
                      targetId: 'dateRangeField-default',
                      pageEvent: 'on-value-change',
                    },
                  },
                ],
              },
              'dateRangeField-default',
              'data-guide-test',
            ),
          ],
        }),
        gridItemFactory({
          componentChildren: [
            buttonFactory({
              text: 'Get Value from "Backend"',
              onClick: [
                {
                  type: 'request',
                  data: {
                    action: 'reflect',
                    reflectedData: patchFactory([
                      {
                        targetSfId: 'dateRangeField-default',
                        operation: 'write',
                        path: 'props.value',
                        value: { from: '1999-03-30', to: '2069-08-30' },
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
});

const dateFieldCard = cardFactory({
  title: 'Date Picker',
  bodyChildren: [
    gridFactory({
      items: [
        gridItemFactory({
          componentChildren: [
            uiHandlerFactory({
              iconSet: 'streamline',
              componentChildren: [
                dateFieldFactory(
                  {
                    name: 'date-field-readOnly',
                    label: 'readOnly',
                    helpText: 'Can you see the input mask?',
                    placeholder: 'I am readOnly, focus me',
                    readOnly: true,
                    format: 'DDMMYYYY',
                    minValue: 1,
                    maxValue: 1,
                    onValueChange: [
                      {
                        type: 'request',
                        data: {
                          action: 'form-page',
                          targetId: 'date-field-readOnly',
                          pageEvent: 'on-value-change',
                        },
                      },
                    ],
                  },
                  'date-field-readOnly',
                ),
              ],
            }),
          ],
        }),
        gridItemFactory({
          componentChildren: [
            uiHandlerFactory({
              iconSet: 'streamline',
              componentChildren: [
                dateFieldFactory(
                  {
                    validationState: 'success',
                    size: 'extraSmall',
                    name: 'date-field-1',
                    label: 'min & max 1?',
                    helpText: 'You just need to pick a date',
                    placeholder: 'Placeholder',
                    format: 'DDMMYYYY',
                    minValue: 1,
                    maxValue: 1,
                    onValueChange: [
                      {
                        type: 'request',
                        data: {
                          action: 'form-page',
                          targetId: 'date-field-1',
                          pageEvent: 'on-value-change',
                        },
                      },
                    ],
                  },
                  'date-field-1',
                  'data-guide-test',
                ),
              ],
            }),
          ],
        }),
        gridItemFactory({
          componentChildren: [
            uiHandlerFactory({
              iconSet: 'streamline',
              componentChildren: [
                dateFieldFactory(
                  {
                    validationState: 'danger',
                    size: 'small',
                    name: 'date-field-2',
                    label: 'min 2 & max undef',
                    helpText: 'You just need to pick a date',
                    placeholder: 'Placeholder',
                    format: 'DDMMYYYY',
                    maxValue: 'Invalide Eingabe',
                    minValue: 2,
                    onValueChange: [
                      {
                        type: 'request',
                        data: {
                          action: 'form-page',
                          targetId: 'date-field-2',
                          pageEvent: 'on-value-change',
                        },
                      },
                    ],
                  },
                  'date-field-2',
                ),
              ],
            }),
          ],
        }),
        gridItemFactory({
          componentChildren: [
            uiHandlerFactory({
              iconSet: 'streamline',
              componentChildren: [
                dateFieldFactory(
                  {
                    validationState: 'danger',
                    size: 'medium',
                    name: 'min undef & max 3',
                    label: 'min undef & max 3',
                    helpText: 'You just need to pick a date',
                    placeholder: 'Placeholder',
                    format: 'DDMMYYYY',
                    maxValue: 3,
                    onValueChange: [
                      {
                        type: 'request',
                        data: {
                          action: 'form-page',
                          targetId: 'date-field-3',
                          pageEvent: 'on-value-change',
                        },
                      },
                    ],
                  },
                  'date-field-3',
                ),
              ],
            }),
          ],
        }),
        gridItemFactory({
          componentChildren: [
            uiHandlerFactory({
              iconSet: 'streamline',
              componentChildren: [
                dateFieldFactory(
                  {
                    validationState: 'danger',
                    size: 'large',
                    name: 'date-field-4',
                    label: 'What date is it?',
                    helpText: 'You just need to pick a date',
                    placeholder: 'Placeholder',
                    format: 'DDMMYYYY',
                    minValue: 200,
                    maxValue: 200,
                    onValueChange: [
                      {
                        type: 'request',
                        data: {
                          action: 'form-page',
                          targetId: 'date-field-4',
                          pageEvent: 'on-value-change',
                        },
                      },
                    ],
                  },
                  'date-field-4',
                ),
              ],
            }),
          ],
        }),
        gridItemFactory({
          componentChildren: [
            uiHandlerFactory({
              iconSet: 'streamline',
              componentChildren: [
                dateFieldFactory(
                  {
                    validationState: 'danger',
                    size: 'extraLarge',
                    name: 'date-field-5',
                    label: 'min & max 200',
                    helpText: 'You just need to pick a date',
                    placeholder: 'Placeholder',
                    format: 'DDMMYYYY',
                    minValue: 200,
                    maxValue: 200,
                    onValueChange: [
                      {
                        type: 'request',
                        data: {
                          action: 'form-page',
                          targetId: 'date-field-5',
                          pageEvent: 'on-value-change',
                        },
                      },
                    ],
                  },
                  'date-field-5',
                ),
              ],
            }),
          ],
        }),
        gridItemFactory({
          componentChildren: [
            uiHandlerFactory({
              iconSet: 'streamline',
              componentChildren: [
                dateFieldFactory(
                  {
                    name: 'date-field-6',
                    label: 'only default',
                    helpText: 'You just need to pick a date',
                    format: 'DDMMYYYY',
                    onValueChange: [
                      {
                        type: 'request',
                        data: {
                          action: 'form-page',
                          targetId: 'date-field-6',
                          pageEvent: 'on-value-change',
                        },
                      },
                    ],
                  },
                  'date-field-6',
                ),
              ],
            }),
          ],
        }),
        gridItemFactory({
          componentChildren: [
            uiHandlerFactory({
              iconSet: 'streamline',
              componentChildren: [
                dateFieldFactory(
                  {
                    name: 'date-field-7',
                    label: 'showMonthAndYearPicker is false by default',
                    helpText: 'Here you can test showMonthAndYearPicker',
                    showMonthAndYearPicker: false,
                    onValueChange: [
                      {
                        type: 'request',
                        data: {
                          action: 'form-page',
                          targetId: 'date-field-7',
                          pageEvent: 'on-value-change',
                        },
                      },
                    ],
                  },
                  'date-field-7',
                ),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});

const dateRangeFieldCard = cardFactory({
  title: 'Date Range Picker',
  bodyChildren: [
    gridFactory({
      items: [
        gridItemFactory({
          componentChildren: [
            dateRangeFieldFactory(
              {
                label: 'readOnly',
                name: 'dateRangeField-readOnly',
                startDate: '2023-19-10',
                placeholder: 'I am readOnly, focus me',
                readOnly: true,
                onValueChange: [
                  {
                    type: 'request',
                    data: {
                      action: 'form-page',
                      targetId: 'dateRangeField-readOnly',
                      pageEvent: 'on-value-change',
                    },
                  },
                ],
              },
              'dateRangeField-readOnly',
            ),
          ],
        }),
        gridItemFactory({
          componentChildren: [
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
              'dateRangeField-1',
              'data-guide-test',
            ),
          ],
        }),
        gridItemFactory({
          componentChildren: [
            buttonFactory({
              text: 'Change startDate of first Picker',
              onClick: [
                {
                  type: 'request',
                  data: {
                    action: 'reflect',
                    reflectedData: patchFactory([
                      {
                        targetSfId: 'dateRangeField-1',
                        operation: 'write',
                        path: 'props.startDate',
                        value: '2024-10-12',
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
            dateRangeFieldFactory({
              label: 'Extra Small',
              name: 'dateRangeField-2',
              placeholder: 'Placeholder',
              size: 'extraSmall',
            }),
          ],
        }),
        gridItemFactory({
          componentChildren: [
            dateRangeFieldFactory({
              label: 'Small',
              name: 'dateRangeField-3',
              placeholder: 'Placeholder',
              size: 'small',
            }),
          ],
        }),
        gridItemFactory({
          componentChildren: [
            dateRangeFieldFactory({
              label: 'Medium (Default)',
              name: 'dateRangeField-4',
              placeholder: 'Placeholder',
              size: 'medium',
            }),
          ],
        }),
        gridItemFactory({
          componentChildren: [
            dateRangeFieldFactory({
              label: 'Large',
              name: 'dateRangeField-5',
              placeholder: 'Placeholder',
              size: 'large',
            }),
          ],
        }),
        gridItemFactory({
          componentChildren: [
            dateRangeFieldFactory({
              label: 'Extra Large',
              name: 'dateRangeField-6',
              placeholder: 'Placeholder',
              size: 'extraLarge',
            }),
          ],
        }),
        gridItemFactory({
          componentChildren: [
            dateRangeFieldFactory({
              label: 'USA Format',
              name: 'dateRangeField-7',
              format: 'MMDDYYYY',
            }),
          ],
        }),
        gridItemFactory({
          componentChildren: [
            dateRangeFieldFactory({
              label: 'Invalid "From" Date',
              name: 'dateRangeField-8',
              value: { from: '1999-30-30', to: '2069-08-30' },
            }),
          ],
        }),
        gridItemFactory({
          componentChildren: [
            dateRangeFieldFactory({
              label: 'Invalid "To" Date',
              name: 'dateRangeField-9',
              value: { from: '1999-08-30', to: '2069-30-30' },
            }),
          ],
        }),
        gridItemFactory({
          componentChildren: [
            dateRangeFieldFactory({
              label: 'Invalid "From & To" Date',
              name: 'dateRangeField-10',
              value: { from: '1999-30-30', to: '2069-30-30' },
            }),
          ],
        }),
        gridItemFactory({
          componentChildren: [
            dateRangeFieldFactory({
              value: { from: '1999-08-30', to: '2069-08-30' },
              label: 'Min-Value -1 year from today',
              name: 'dateRangeField-11',
              minValue: 1,
            }),
          ],
        }),
        gridItemFactory({
          componentChildren: [
            dateRangeFieldFactory({
              value: { from: '1900-03-25', to: '2100-03-25' },
              label: 'Max-Value +1 year from today',
              name: 'dateRangeField-12',
              maxValue: 1,
            }),
          ],
        }),
        gridItemFactory({
          componentChildren: [
            dateRangeFieldFactory({
              value: { from: '1900-03-25', to: '2100-03-25' },
              label: 'Max-Value invalid',
              name: 'dateRangeField-20',
              maxValue: 'ridiculous',
            }),
          ],
        }),
        gridItemFactory({
          componentChildren: [
            dateRangeFieldFactory({
              value: { from: '1900-02-18', to: '2100-04-28' },
              label: 'Date between -/+2 years from today',
              name: 'dateRangeField-13',
              minValue: 2,
              maxValue: 2,
            }),
          ],
        }),
        gridItemFactory({
          componentChildren: [
            dateRangeFieldFactory({
              value: { from: '2023-08-30', to: '2023-12-19' },
              label: 'Date between 30.08.2023 and 19.12.2023 (inclusive)',
              name: 'dateRangeField-14',
              minValue: '2023-08-30',
              maxValue: '2023-12-19',
            }),
          ],
        }),
        gridItemFactory({
          componentChildren: [
            dateRangeFieldFactory({
              label: 'StartDate December 2023',
              name: 'dateRangeField-17',
              startDate: '2023-12-01',
            }),
          ],
        }),
        gridItemFactory({
          componentChildren: [
            dateRangeFieldFactory({
              label: 'Single Calendar',
              name: 'dateRangeField-18',
              minValue: '2023-09-30',
            }),
          ],
        }),
        gridItemFactory({
          componentChildren: [
            dateRangeFieldFactory({
              label: 'No Calendar --> Fallback to 1',
              name: 'dateRangeField-19',
              minValue: '2023-09-30',
            }),
          ],
        }),
        gridItemFactory({
          componentChildren: [
            dateRangeFieldFactory({
              label: 'showMonthAndYearPicker is false by default',
              name: 'dateRangeField-20',
              minValue: '2023-09-30',
              showMonthAndYearPicker: false,
              helpText: 'Here you can test showMonthAndYearPicker',
            }),
          ],
        }),
      ],
    }),
  ],
});

const dateFieldSizesCard = cardFactory({
  title: 'Date Picker - Sizes',

  bodyChildren: [
    gridFactory({
      items: [
        gridItemFactory({
          componentChildren: [
            uiHandlerFactory({
              iconSet: 'streamline',
              componentChildren: [
                dateFieldFactory(
                  {
                    size: 'extraSmall',
                    name: 'date-field-1-extraSmall',
                    label: 'Extra Small',
                    placeholder: 'Placeholder',
                    format: 'DDMMYYYY',
                    onValueChange: [
                      {
                        type: 'request',
                        data: {
                          action: 'form-page',
                          targetId: 'date-field-1-extraSmall',
                          pageEvent: 'on-value-change',
                        },
                      },
                    ],
                  },
                  'date-field-1-extraSmall',
                ),
              ],
            }),
          ],
        }),
        gridItemFactory({
          componentChildren: [
            uiHandlerFactory({
              iconSet: 'streamline',
              componentChildren: [
                dateFieldFactory(
                  {
                    size: 'small',
                    name: 'date-field-2-small',
                    label: 'Small',
                    placeholder: 'Placeholder',
                    format: 'DDMMYYYY',
                    onValueChange: [
                      {
                        type: 'request',
                        data: {
                          action: 'form-page',
                          targetId: 'date-field-2-small',
                          pageEvent: 'on-value-change',
                        },
                      },
                    ],
                  },
                  'date-field-2-small',
                ),
              ],
            }),
          ],
        }),
        gridItemFactory({
          componentChildren: [
            uiHandlerFactory({
              iconSet: 'streamline',
              componentChildren: [
                dateFieldFactory(
                  {
                    size: 'medium',
                    name: 'date-field-3-medium',
                    label: 'Medium (Default)',
                    placeholder: 'Placeholder',
                    format: 'DDMMYYYY',
                    // maxValue: 3,
                    onValueChange: [
                      {
                        type: 'request',
                        data: {
                          action: 'form-page',
                          targetId: 'date-field-3-medium',
                          pageEvent: 'on-value-change',
                        },
                      },
                    ],
                  },
                  'date-field-3-medium',
                ),
              ],
            }),
          ],
        }),
        gridItemFactory({
          componentChildren: [
            uiHandlerFactory({
              iconSet: 'streamline',
              componentChildren: [
                dateFieldFactory(
                  {
                    size: 'large',
                    name: 'date-field-4-large',
                    label: 'Large',
                    placeholder: 'Placeholder',
                    format: 'DDMMYYYY',
                    // minValue: 200,
                    // maxValue: 200,
                    onValueChange: [
                      {
                        type: 'request',
                        data: {
                          action: 'form-page',
                          targetId: 'date-field-4-large',
                          pageEvent: 'on-value-change',
                        },
                      },
                    ],
                  },
                  'date-field-4-large',
                ),
              ],
            }),
          ],
        }),
        gridItemFactory({
          componentChildren: [
            uiHandlerFactory({
              iconSet: 'streamline',
              componentChildren: [
                dateFieldFactory(
                  {
                    size: 'extraLarge',
                    name: 'date-field-5-extraLarge',
                    label: 'Extra Large  minValue = 20 | maxValue = 10',
                    format: 'DDMMYYYY',
                    minValue: 20,
                    maxValue: 10,
                    onValueChange: [
                      {
                        type: 'request',
                        data: {
                          action: 'form-page',
                          targetId: 'date-field-5-extraLarge',
                          pageEvent: 'on-value-change',
                        },
                      },
                    ],
                  },
                  'date-field-5-extraLarge',
                ),
                buttonFactory({
                  text: 'Change minValue of this DateField to 40',
                  onClick: [
                    {
                      type: 'request',
                      data: {
                        action: 'reflect',
                        reflectedData: patchFactory([
                          {
                            targetSfId: 'date-field-5-extraLarge',
                            operation: 'write',
                            path: 'props.minValue',
                            value: 40,
                          },
                        ]),
                      },
                    },
                  ],
                }),
                buttonFactory({
                  text: 'Change maxValue of this DateField to 40',
                  onClick: [
                    {
                      type: 'request',
                      data: {
                        action: 'reflect',
                        reflectedData: patchFactory([
                          {
                            targetSfId: 'date-field-5-extraLarge',
                            operation: 'write',
                            path: 'props.maxValue',
                            value: 40,
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
});

const dateRangeFieldSizesCard = cardFactory({
  title: 'Date Range Picker - Sizes',
  bodyChildren: [
    gridFactory({
      items: [
        gridItemFactory({
          componentChildren: [
            dateRangeFieldFactory({
              label: 'Extra Small',
              name: 'dateRangeField-2',
              placeholder: 'Placeholder',
              size: 'extraSmall',
            }),
          ],
        }),
        gridItemFactory({
          componentChildren: [
            dateRangeFieldFactory({
              label: 'Small',
              name: 'dateRangeField-3',
              placeholder: 'Placeholder',
              size: 'small',
            }),
          ],
        }),
        gridItemFactory({
          componentChildren: [
            dateRangeFieldFactory({
              label: 'Medium (Default)',
              name: 'dateRangeField-4',
              placeholder: 'Placeholder',
              size: 'medium',
            }),
          ],
        }),
        gridItemFactory({
          componentChildren: [
            dateRangeFieldFactory({
              label: 'Large',
              name: 'dateRangeField-5',
              placeholder: 'Placeholder',
              size: 'large',
            }),
          ],
        }),
        gridItemFactory({
          componentChildren: [
            dateRangeFieldFactory({
              label: 'Extra Large',
              name: 'dateRangeField-6',
              placeholder: 'Placeholder',
              size: 'extraLarge',
            }),
          ],
        }),
      ],
    }),
  ],
});

const datePresentationCard = cardFactory({
  title: 'Presentation: modal',
  bodyChildren: [
    gridFactory({
      items: [
        gridItemFactory({
          componentChildren: [
            uiHandlerFactory({
              iconSet: 'streamline',
              componentChildren: [
                dateFieldFactory(
                  {
                    presentation: 'modal',
                    size: 'extraLarge',
                    name: 'date-field-5-extraLarge-presentation',
                    label: 'DateField',
                    format: 'DDMMYYYY',
                    onValueChange: [
                      {
                        type: 'request',
                        data: {
                          action: 'form-page',
                          targetId: 'date-field-5-extraLarge-presentation',
                          pageEvent: 'on-value-change',
                        },
                      },
                    ],
                  },
                  'date-field-5-extraLarge-presentation',
                ),
              ],
            }),
          ],
        }),
        gridItemFactory({
          componentChildren: [
            dateRangeFieldFactory({
              presentation: 'modal',
              label: 'DateRangeField',
              name: 'dateRangeField-6',
              size: 'extraLarge',
            }),
          ],
        }),
      ],
    }),
  ],
});

/**
 * @type { import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType }
 */
export const dateFieldPage = smartFaceFactory({
  sfComponents: [
    pageFactory(
      {
        document: { head: { title: 'DateField Page' } },
        componentChildren: [
          classicLayoutFactory({
            sidebar: sidebar('date-fields-page', ['form-pages']),
            content: {
              componentChildren: [
                formFactory(
                  {
                    componentChildren: [
                      gridFactory({
                        items: [
                          gridItemFactory({
                            size: 12,
                            componentChildren: [dateRangeFieldFullWidthCard],
                          }),
                          gridItemFactory({
                            size: 6,
                            componentChildren: [dateFieldSizesCard],
                          }),
                          gridItemFactory({
                            size: 6,
                            componentChildren: [dateFieldCard],
                          }),
                          gridItemFactory({
                            size: 6,
                            componentChildren: [dateRangeFieldSizesCard],
                          }),
                          gridItemFactory({
                            size: 6,
                            componentChildren: [dateRangeFieldCard],
                          }),
                          gridItemFactory({
                            size: 6,
                            componentChildren: [datePresentationCard],
                          }),
                        ],
                      }),
                    ],
                  },
                  undefined,
                  'data-guide-test',
                ),
              ],
            },
            footer,
          }),
        ],
      },
      'form-1',
    ),
  ],
});
