// @ts-check
import { dateRangeFieldFactory } from '#shared/smartFaceComponentFactories/core/dateRangeFieldFactory';

import { buttonFactory } from '../../../../shared/smartFaceComponentFactories/core/buttonFactory.js';
import { cardFactory } from '../../../../shared/smartFaceComponentFactories/core/cardFactory.js';
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { dateFieldFactory } from '../../../../shared/smartFaceComponentFactories/core/dateFieldFactory.js';
import { decimalFieldFactory } from '../../../../shared/smartFaceComponentFactories/core/decimalFieldFactory.js';
import { fontAwesomeIconFactory } from '../../../../shared/smartFaceComponentFactories/core/fontAwesomeIconFactory.js';
import { formFactory } from '../../../../shared/smartFaceComponentFactories/core/formFactory.js';
import { formTextFactory } from '../../../../shared/smartFaceComponentFactories/core/formTextFactory.js';
import { gridFactory, gridItemFactory } from '../../../../shared/smartFaceComponentFactories/core/gridFactory.js';
import { imageFactory } from '../../../../shared/smartFaceComponentFactories/core/imageFactory.js';
import { integerFieldFactory } from '../../../../shared/smartFaceComponentFactories/core/integerFieldFactory.js';
import { modalFactory, pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { passwordFieldFactory } from '../../../../shared/smartFaceComponentFactories/core/passwordFieldFactory.js';
import { sectionFactory } from '../../../../shared/smartFaceComponentFactories/core/sectionFactory.js';
import { selectFactory } from '../../../../shared/smartFaceComponentFactories/core/selectFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { streamlineIconFactory } from '../../../../shared/smartFaceComponentFactories/core/streamlineIconFactory.js';
import { textareaFactory } from '../../../../shared/smartFaceComponentFactories/core/textareaFactory.js';
import { textFieldFactory } from '../../../../shared/smartFaceComponentFactories/core/textFieldFactory.js';
import { timeFieldFactory } from '../../../../shared/smartFaceComponentFactories/core/timeFieldFactory.js';
import { tooltipFactory } from '../../../../shared/smartFaceComponentFactories/core/tooltipFactory.js';
import { uiHandlerFactory } from '../../../../shared/smartFaceComponentFactories/core/uiHandlerFactory.js';
import { footer } from '../shared/footer.js';
import { sidebar } from '../shared/sidebar.js';
import times from 'lodash/times.js';

const modalProps = {
  closeable: true,
  footerChildren: [buttonFactory({}, 'modal-0-button-0')],
};

const modals = [
  modalFactory({
    ...modalProps,
    title: 'Check Z-Index for Section Tabbing',
    size: 'large',
    bodyChildren: [
      uiHandlerFactory({
        iconSet: 'font-awesome-svg',
        componentChildren: [
          selectFactory(
            {
              name: 'modal-select-0',
              label: 'Favorite Icecream?',
              mandatory: true,
              size: 'extraSmall',
              validationState: 'success',
              placeholder: 'Placeholder',
              'aria-label': 'text',
              noneOption: { label: 'Please choose', sfId: 'none' },
              helpText: 'Helptext',
              options: [
                ...times(100, (index) => {
                  return { label: `Option-${index}`, sfId: `modal-option${index}` };
                }),
              ],
              onValueChange: [
                {
                  type: 'request',
                  blockUi: false,
                  data: {
                    action: 'form-page',
                    targetId: 'modal-select-0',
                    pageEvent: 'on-value-change',
                  },
                },
              ],
            },
            'modal-select-0',
          ),
        ],
      }),
    ],
  }),
];

/**
 * @type { import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType }
 */
export const formPage = smartFaceFactory({
  sfComponents: [
    pageFactory(
      {
        document: { head: { title: 'Form Page' } },
        componentChildren: [
          classicLayoutFactory({
            sidebar: sidebar('form-page', ['form-pages']),
            content: {
              componentChildren: [
                gridFactory({
                  items: [
                    gridItemFactory({
                      size: { sm: 12, lg: 6 },
                      componentChildren: [
                        cardFactory({
                          title: 'Input',
                          subtitle: 'Texts & Numbers',
                          bodyChildren: [
                            formFactory(
                              {
                                componentChildren: [
                                  gridFactory({
                                    items: [
                                      gridItemFactory({
                                        componentChildren: [
                                          textFieldFactory(
                                            {
                                              label: 'First Name',
                                              name: 'firstName',
                                              value: 'Daisy',
                                              autoComplete: 'given-name',
                                              helpText:
                                                'Some looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong helpful Helptext...',
                                              // placeholder: 'Please enter your first name',
                                              // mandatory: true,
                                              onValueChange: [
                                                {
                                                  type: 'request',
                                                  blockUi: false,
                                                  data: {
                                                    action: 'form-page',
                                                    targetId: 'text-field-0',
                                                    pageEvent: 'on-value-change',
                                                  },
                                                },
                                              ],
                                              onEnterKeyDown: [
                                                {
                                                  type: 'request',
                                                  blockUi: false,
                                                  data: {
                                                    action: 'form-page',
                                                    targetId: 'text-field-0',
                                                    pageEvent: 'on-enter-key-down',
                                                  },
                                                },
                                              ],
                                            },
                                            'text-field-0',
                                            'data-guide-test',
                                          ),
                                        ],
                                      }),
                                      gridItemFactory({
                                        componentChildren: [
                                          textFieldFactory(
                                            {
                                              name: 'lastName',
                                              autoComplete: 'family-name',
                                              value: 'Duck',
                                              helpText: 'Helptext',
                                              mandatory: true,
                                              onValueChange: [
                                                {
                                                  type: 'request',
                                                  blockUi: false,
                                                  data: {
                                                    action: 'form-page',
                                                    targetId: 'text-field-1',
                                                    pageEvent: 'on-value-change',
                                                  },
                                                },
                                              ],
                                            },
                                            'text-field-1',
                                          ),
                                        ],
                                      }),
                                      gridItemFactory({
                                        componentChildren: [
                                          textFieldFactory(
                                            {
                                              label: 'Spell checker',
                                              name: 'spellchecker',
                                              helpText: 'Helptext',
                                              placeholder: 'Paceholder',
                                              spellCheck: true,
                                              onValueChange: [
                                                {
                                                  type: 'request',
                                                  blockUi: false,
                                                  data: {
                                                    action: 'form-page',
                                                    targetId: 'text-field-2',
                                                    pageEvent: 'on-value-change',
                                                  },
                                                },
                                              ],
                                            },
                                            'text-field-2',
                                          ),
                                        ],
                                      }),
                                      gridItemFactory({
                                        componentChildren: [
                                          integerFieldFactory(
                                            {
                                              label: 'Integer Field',
                                              name: 'integer-field-0',
                                              mandatory: true,
                                              helpText: 'Helptext',
                                              placeholder: 'Paceholder',
                                              validationState: 'success',
                                              onValueChange: [
                                                {
                                                  type: 'request',
                                                  blockUi: false,
                                                  data: {
                                                    action: 'form-page',
                                                    targetId: 'integer-field-0',
                                                    pageEvent: 'on-value-change',
                                                  },
                                                },
                                              ],
                                              onEnterKeyDown: [
                                                {
                                                  type: 'request',
                                                  blockUi: false,
                                                  data: {
                                                    action: 'form-page',
                                                    targetId: 'integer-field-0',
                                                    pageEvent: 'on-enter-key-down',
                                                  },
                                                },
                                              ],
                                            },
                                            'integer-field-0',
                                            'data-guide-test',
                                          ),
                                          integerFieldFactory(
                                            {
                                              label: 'Integer Field Disabled',
                                              name: 'integer-field-0',
                                              mandatory: true,
                                              disabled: true,
                                              helpText: 'Helptext',
                                              placeholder: 'Paceholder',
                                              onValueChange: [
                                                {
                                                  type: 'request',
                                                  blockUi: false,
                                                  data: {
                                                    action: 'form-page',
                                                    targetId: 'integer-field-0',
                                                    pageEvent: 'on-value-change',
                                                  },
                                                },
                                              ],
                                              onEnterKeyDown: [
                                                {
                                                  type: 'request',
                                                  blockUi: false,
                                                  data: {
                                                    action: 'form-page',
                                                    targetId: 'integer-field-0',
                                                    pageEvent: 'on-enter-key-down',
                                                  },
                                                },
                                              ],
                                            },
                                            'integer-field-20',
                                          ),
                                        ],
                                      }),
                                      gridItemFactory({
                                        componentChildren: [
                                          decimalFieldFactory(
                                            {
                                              label: 'Decimal Field',
                                              name: 'decimal-field-1',
                                              mandatory: true,
                                              helpText: 'Helptext',
                                              onValueChange: [
                                                {
                                                  type: 'request',
                                                  blockUi: false,
                                                  data: {
                                                    action: 'form-page',
                                                    targetId: 'decimal-field-1',
                                                    pageEvent: 'on-value-change',
                                                  },
                                                },
                                              ],
                                            },
                                            'decimal-field-1',
                                          ),
                                        ],
                                      }),
                                      gridItemFactory({
                                        componentChildren: [
                                          decimalFieldFactory(
                                            {
                                              label: 'Decimal Field with value and scale set to 2',
                                              name: 'decimal-field-0',
                                              value: '42.42',
                                              signed: false,
                                              mandatory: true,
                                              scale: 2,
                                              thousandsSeparator: '',
                                              padFractionalZeros: false,
                                              normalizeZeros: true,
                                              radix: ',',
                                              mapToRadix: ['.'],
                                              helpText: 'Helptext',
                                              onValueChange: [
                                                {
                                                  type: 'request',
                                                  blockUi: false,
                                                  data: {
                                                    action: 'form-page',
                                                    targetId: 'decimal-field-0',
                                                    pageEvent: 'on-value-change',
                                                  },
                                                },
                                              ],
                                              onEnterKeyDown: [
                                                {
                                                  type: 'request',
                                                  blockUi: false,
                                                  data: {
                                                    action: 'form-page',
                                                    targetId: 'decimal-field-0',
                                                    pageEvent: 'on-enter-key-down',
                                                  },
                                                },
                                              ],
                                            },
                                            'decimal-field-0',
                                            'data-guide-test',
                                          ),
                                        ],
                                      }),
                                      gridItemFactory({
                                        componentChildren: [
                                          decimalFieldFactory(
                                            {
                                              label:
                                                'max 1000, min -1000, points mapped to commas, 4 chars after comma, ...',
                                              name: 'decimal-field-2',
                                              max: 1000,
                                              min: -1000,
                                              scale: 4,
                                              radix: ',',
                                              mapToRadix: ['.'],
                                              thousandsSeparator: ' ',
                                              validationState: 'success',
                                              validationMessage: 'Decimal Field - Success Validation Message',
                                              helpText: 'Helptext',
                                              signed: false,
                                              readOnly: false,
                                              mandatory: true,
                                              normalizeZeros: false,
                                              padFractionalZeros: false,
                                              size: 'extraLarge',
                                              onValueChange: [
                                                {
                                                  type: 'request',
                                                  blockUi: false,
                                                  data: {
                                                    action: 'form-page',
                                                    targetId: 'decimal-field-2',
                                                    pageEvent: 'on-value-change',
                                                  },
                                                },
                                              ],
                                            },
                                            'decimal-field-2',
                                          ),
                                        ],
                                      }),
                                      gridItemFactory({
                                        componentChildren: [
                                          decimalFieldFactory(
                                            {
                                              label:
                                                'signed = true & min = 0 => negative numbers allowed, changed to 0 on focus out',
                                              name: 'decimal-field-3',
                                              mandatory: true,
                                              value: '42',
                                              max: 1000,
                                              min: 0,
                                              scale: 4,
                                              thousandsSeparator: ' ',
                                              validationState: 'warning',
                                              validationMessage: 'Decimal Field - Warning Validation Message',
                                              helpText: 'Helptext',
                                              normalizeZeros: false,
                                              padFractionalZeros: false,
                                              size: 'medium',
                                              onValueChange: [
                                                {
                                                  type: 'request',
                                                  blockUi: false,
                                                  data: {
                                                    action: 'form-page',
                                                    targetId: 'decimal-field-2',
                                                    pageEvent: 'on-value-change',
                                                  },
                                                },
                                              ],
                                            },
                                            'decimal-field-3',
                                          ),
                                        ],
                                      }),
                                      gridItemFactory({
                                        componentChildren: [
                                          decimalFieldFactory(
                                            {
                                              label: 'signed = false & min = 0 => kein negativ eingabe erlaubt',
                                              name: 'decimal-field-4',
                                              mandatory: true,
                                              value: '42',
                                              max: 1000,
                                              min: 0,
                                              scale: 4,
                                              radix: ',',
                                              mapToRadix: ['.'],
                                              thousandsSeparator: ' ',
                                              validationState: 'danger',
                                              validationMessage: 'Decimal Field - Danger Validation Message',
                                              helpText: 'Helptext',
                                              signed: false,
                                              readOnly: false,
                                              normalizeZeros: false,
                                              padFractionalZeros: false,
                                              size: 'extraSmall',
                                              onValueChange: [
                                                {
                                                  type: 'request',
                                                  blockUi: false,
                                                  data: {
                                                    action: 'form-page',
                                                    targetId: 'decimal-field-2',
                                                    pageEvent: 'on-value-change',
                                                  },
                                                },
                                              ],
                                            },
                                            'decimal-field-4',
                                          ),
                                        ],
                                      }),
                                      gridItemFactory({
                                        componentChildren: [
                                          passwordFieldFactory(
                                            {
                                              label: 'Passwort A + Show / Hide Icon',
                                              placeholder: 'Bitte geben Sie hier das Passwort ein.',
                                              name: 'passwortField',
                                              value: 'Never gonna give you up',
                                              allowShowPassword: true,
                                              mandatory: true,
                                              onEnterKeyDown: [
                                                {
                                                  type: 'request',
                                                  blockUi: false,
                                                  data: {
                                                    action: 'form-page',
                                                    targetId: 'password-field-0',
                                                    pageEvent: 'on-enter-key-down',
                                                  },
                                                },
                                              ],
                                            },
                                            'password-field-0',
                                            'data-guide-test',
                                          ),
                                        ],
                                      }),
                                      gridItemFactory({
                                        componentChildren: [
                                          passwordFieldFactory(
                                            {
                                              label: 'Passwort',
                                              placeholder: 'Bitte geben Sie hier das Passwort ein.',
                                              name: 'passwortField',
                                              allowShowPassword: false,
                                              mandatory: true,
                                              onEnterKeyDown: [
                                                {
                                                  type: 'request',
                                                  blockUi: false,
                                                  data: {
                                                    action: 'form-page',
                                                    targetId: 'password-field-1',
                                                    pageEvent: 'on-enter-key-down',
                                                  },
                                                },
                                              ],
                                            },
                                            'password-field-1',
                                          ),
                                        ],
                                      }),
                                      gridItemFactory({
                                        componentChildren: [
                                          passwordFieldFactory(
                                            {
                                              label: 'Passwort deaktiviert',
                                              placeholder: 'Passwort eingabe nicht möglich.',
                                              name: 'passwortField',

                                              validationState: 'danger',
                                              validationMessage: 'Password Field - Danger Validation Message',
                                              helpText: 'Helptext',
                                              allowShowPassword: true,
                                              disabled: true,
                                              size: 'extraLarge',
                                              onEnterKeyDown: [
                                                {
                                                  type: 'request',
                                                  blockUi: false,
                                                  data: {
                                                    action: 'form-page',
                                                    targetId: 'password-field-2',
                                                    pageEvent: 'on-enter-key-down',
                                                  },
                                                },
                                              ],
                                            },
                                            'password-field-2',
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
                          footerChildren: [
                            gridFactory({
                              rowGap: 'extraSmall',
                              columnGap: 'extraSmall',
                              items: [
                                gridItemFactory({
                                  componentChildren: [
                                    buttonFactory({
                                      text: 'Submit Form 1',
                                      onClick: [{ type: 'request', blockUi: false, data: { action: 'return-empty' } }],
                                    }),
                                  ],
                                }),

                                gridItemFactory({
                                  componentChildren: [
                                    buttonFactory({
                                      text: 'Reset Form 1',
                                      color: 'danger',
                                      onClick: [
                                        {
                                          type: 'request',
                                          blockUi: false,
                                          data: {
                                            action: 'form-page',
                                            targetId: 'form-0',
                                            pageEvent: 'reset-form',
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
                      size: { sm: 12, lg: 6 },
                      componentChildren: [
                        cardFactory({
                          title: 'Select',
                          subtitle: 'Select, Date- & Timefield, TextArea',
                          icon: streamlineIconFactory({ name: 'star' }),
                          bodyChildren: [
                            formFactory(
                              {
                                componentChildren: [
                                  gridFactory({
                                    items: [
                                      gridItemFactory({
                                        componentChildren: [
                                          selectFactory(
                                            {
                                              name: 'select-0',
                                              label: 'Favorite Icecream?',
                                              mandatory: true,
                                              size: 'extraSmall',
                                              validationState: 'success',
                                              placeholder: 'Placeholder',
                                              'aria-label': 'text',
                                              noneOption: {
                                                label: 'Please choose',
                                                sfId: 'none',
                                                media: fontAwesomeIconFactory({ name: 'bars' }),
                                              },
                                              helpText: 'Helptext',
                                              options: [
                                                {
                                                  label: 'Vanilla',
                                                  sfId: 'option-0',
                                                  media: fontAwesomeIconFactory({ name: 'ice-cream' }),
                                                },
                                                {
                                                  label: 'Chocolate',
                                                  sfId: 'option-1',
                                                  media: imageFactory({
                                                    src: 'https://d3nnb1hxumbr0v.cloudfront.net/images/flag_icons/GBR.png',
                                                  }),
                                                },
                                                {
                                                  label: 'Pistachio',
                                                  sfId: 'option-2',
                                                  media: fontAwesomeIconFactory({ name: 'leaf' }),
                                                },
                                                {
                                                  label: 'Blueberrymuffincake with little umbrella',
                                                  sfId: 'option-3',
                                                  media: imageFactory(),
                                                },
                                              ],
                                              onValueChange: [
                                                {
                                                  type: 'request',
                                                  blockUi: false,
                                                  data: {
                                                    action: 'form-page',
                                                    targetId: 'select-0',
                                                    pageEvent: 'on-value-change',
                                                  },
                                                },
                                              ],
                                            },
                                            'select-0',
                                            'data-guide-test',
                                          ),
                                        ],
                                      }),

                                      gridItemFactory({
                                        componentChildren: [
                                          selectFactory(
                                            {
                                              name: 'select-1',
                                              label: 'Favorite Icecream? (multiple)',
                                              mandatory: true,
                                              'aria-label': 'text',
                                              helpText: 'Multiple answers are accepted',
                                              multiple: true,
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
                                                  blockUi: true,
                                                  data: {
                                                    action: 'form-page',
                                                    targetId: 'select-1',
                                                    pageEvent: 'on-value-change',
                                                  },
                                                },
                                                {
                                                  type: 'request',
                                                  data: {
                                                    action: 'reflect',
                                                    reflectedData: {
                                                      sideEffects: [
                                                        {
                                                          type: 'addNotification',
                                                          id: 'notification-1',
                                                          message: 'onValueChanged',
                                                          color: 'danger',
                                                        },
                                                      ],
                                                    },
                                                  },
                                                },
                                              ],
                                            },
                                            'select-1',
                                          ),
                                        ],
                                      }),
                                      gridItemFactory({
                                        componentChildren: [
                                          selectFactory(
                                            {
                                              name: 'select-2',
                                              label: 'No Options :C',
                                              mandatory: true,
                                              'aria-label': 'text',
                                              helpText: 'Multiple answers are accepted',
                                              multiple: true,
                                              options: [],
                                              onValueChange: [
                                                {
                                                  type: 'request',
                                                  blockUi: true,
                                                  data: {
                                                    action: 'form-page',
                                                    targetId: 'select-2',
                                                    pageEvent: 'on-value-change',
                                                  },
                                                },
                                                {
                                                  type: 'request',
                                                  data: {
                                                    action: 'reflect',
                                                    reflectedData: {
                                                      sideEffects: [
                                                        {
                                                          type: 'addNotification',
                                                          id: 'notification-1',
                                                          message: 'onValueChanged',
                                                          color: 'danger',
                                                        },
                                                      ],
                                                    },
                                                  },
                                                },
                                              ],
                                            },
                                            'select-2',
                                          ),
                                        ],
                                      }),
                                      gridItemFactory({
                                        componentChildren: [
                                          selectFactory(
                                            {
                                              name: 'select-2',
                                              label: 'Favorite Food?',
                                              mandatory: true,
                                              'aria-label': 'text',
                                              noneOption: { label: 'Please choose', sfId: 'none' },
                                              helpText: 'SingleSelect Grouped',
                                              options: [
                                                {
                                                  label: 'Ice-Cream',
                                                  sfId: 'label-1',
                                                  options: [
                                                    { sfId: 'grouped-option-0' },
                                                    { label: 'Chocolate', sfId: 'grouped-option-1' },
                                                    { label: 'Pistachio', sfId: 'grouped-option-2' },
                                                  ],
                                                },
                                                {
                                                  label: 'Fast-Food',
                                                  sfId: 'label-2',
                                                  options: [
                                                    { label: 'Döner', sfId: 'grouped-option-3' },
                                                    { label: 'Pizza', sfId: 'grouped-option-4' },
                                                    { label: 'Pommes', sfId: 'grouped-option-5' },
                                                  ],
                                                },
                                              ],
                                              onValueChange: [
                                                {
                                                  type: 'request',
                                                  blockUi: false,
                                                  data: {
                                                    action: 'form-page',
                                                    targetId: 'select-2',
                                                    pageEvent: 'on-value-change',
                                                  },
                                                },
                                              ],
                                            },
                                            'select-2',
                                          ),
                                        ],
                                      }),
                                      gridItemFactory({
                                        componentChildren: [
                                          timeFieldFactory(
                                            {
                                              name: 'time-0',
                                              label: 'What time is it?',
                                              mandatory: true,
                                              helpText: 'Helptext',
                                              placeholder: 'Placeholder',
                                              // readOnly: true,
                                              timePickerToggleIcon: {
                                                sfComponent: 'FontAwesomeIcon',
                                                sfId: 'time-icon-0',
                                                props: { name: 'clock' },
                                              },
                                              onValueChange: [
                                                {
                                                  type: 'request',
                                                  blockUi: false,
                                                  data: {
                                                    action: 'form-page',
                                                    targetId: 'time-field-0',
                                                    pageEvent: 'on-value-change',
                                                  },
                                                },
                                              ],
                                              onEnterKeyDown: [
                                                {
                                                  type: 'request',
                                                  blockUi: false,
                                                  data: {
                                                    action: 'form-page',
                                                    targetId: 'time-field-0',
                                                    pageEvent: 'on-enter-key-down',
                                                  },
                                                },
                                              ],
                                            },
                                            'time-field-0',
                                            'data-guide-test',
                                          ),
                                        ],
                                      }),
                                      gridItemFactory({
                                        componentChildren: [
                                          uiHandlerFactory({
                                            iconSet: 'font-awesome',
                                            componentChildren: [
                                              dateFieldFactory(
                                                {
                                                  label:
                                                    'What date is it? What date is it? What date is it? What date is it? What date is it? What date is it? What date is it? What date is it? What date is it? What date is it? What date is it? What date is it? What date is it? What date is it? What date is it?',
                                                  name: 'date-field-0',
                                                  mandatory: true,
                                                  helpText: 'You just need to pick a date',
                                                  // size: 'large',
                                                  // placeholder: 'Placeholder',
                                                  // validationState: 'danger',
                                                  format: 'DDMMYYYY',
                                                  // minValue: 1,
                                                  // maxValue: 1,
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
                                                'date-field-0',
                                              ),
                                            ],
                                          }),
                                        ],
                                      }),
                                      gridItemFactory({
                                        componentChildren: [
                                          dateRangeFieldFactory(
                                            {
                                              label: 'dateRangeField',
                                              name: 'dateRangeField-1',
                                              startDate: '2023-19-10',
                                              helpText: 'Just pick a Date Range',
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
                                            text: 'update SmartFaceBackendConfig',
                                            color: 'primary',
                                            onClick: [
                                              {
                                                type: 'request',
                                                data: {
                                                  action: 'reflect',
                                                  reflectedData: {
                                                    sideEffects: [
                                                      {
                                                        type: 'updateSmartFaceBackendConfig',
                                                        fields: {
                                                          sfTranslations: {
                                                            'date-field-max-length': 'UPDATE TEXT',
                                                          },
                                                        },
                                                      },
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
                                          textareaFactory(
                                            {
                                              name: 'text-area',
                                              label: 'Insert Feedback:',
                                              mandatory: true,
                                              // placeholder: 'Please insert...',
                                              rows: 5,
                                              helpText: 'Insert Feedback Helptext',
                                              onValueChange: [
                                                {
                                                  type: 'request',
                                                  blockUi: false,
                                                  data: {
                                                    action: 'form-page',
                                                    targetId: 'textarea-0',
                                                    pageEvent: 'on-value-change',
                                                  },
                                                },
                                              ],
                                            },
                                            'textarea-0',
                                          ),
                                        ],
                                      }),
                                      gridItemFactory({
                                        componentChildren: [
                                          buttonFactory({
                                            text: 'Open Select in Modal',
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
                                                            value: modals,
                                                          },
                                                        ],
                                                      },
                                                      {
                                                        type: 'navigateToElement',
                                                        id: 'modal-0-button-0',
                                                        focus: true,
                                                        scrollIntoView: false,
                                                      },
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
                                          selectFactory(
                                            {
                                              dropdownWidth: 'limited',

                                              name: 'select-3',
                                              label: 'dropdownWidth: limited - large options',
                                              mandatory: true,
                                              'aria-label': 'text',
                                              noneOption: { label: 'Please choose', sfId: 'none' },
                                              options: [
                                                {
                                                  label: 'IC',
                                                  sfId: 'label-1',
                                                  options: [
                                                    { sfId: 'grouped-option-0' },
                                                    {
                                                      label: 'ChocolateChocolateChocolateChocolateChocolate',
                                                      sfId: 'grouped-option-1',
                                                    },
                                                    {
                                                      label: 'PistachioPistachioPistachioPistachioPistachio',
                                                      sfId: 'grouped-option-2',
                                                    },
                                                  ],
                                                },
                                                {
                                                  label: 'FF',
                                                  sfId: 'label-2',
                                                  options: [
                                                    {
                                                      label: 'DönerDönerDönerDönerDönerDönerDönerDönerDöner',
                                                      sfId: 'grouped-option-3',
                                                    },
                                                    {
                                                      label: 'PizzaPizzaPizzaPizzaPizzaPizzaPizzaPizzaPizza',
                                                      sfId: 'grouped-option-4',
                                                    },
                                                    {
                                                      label: 'PommesPommesPommesPommesPommesPommesPommesPommesPommes',
                                                      sfId: 'grouped-option-5',
                                                    },
                                                  ],
                                                },
                                              ],
                                              onValueChange: [
                                                {
                                                  type: 'request',
                                                  blockUi: false,
                                                  data: {
                                                    action: 'form-page',
                                                    targetId: 'select-dropdownWidth-limited',
                                                    pageEvent: 'on-value-change',
                                                  },
                                                },
                                              ],
                                            },
                                            'select-dropdownWidth-limited',
                                          ),
                                        ],
                                      }),
                                      gridItemFactory({
                                        componentChildren: [
                                          selectFactory(
                                            {
                                              dropdownWidth: 'auto',

                                              name: 'select-dropdownWidth-auto',
                                              label: 'dropdownWidth: auto - large options',
                                              mandatory: true,
                                              'aria-label': 'text',
                                              noneOption: { label: 'Please choose', sfId: 'none' },
                                              options: [
                                                {
                                                  label: 'IC',
                                                  sfId: 'label-1',
                                                  options: [
                                                    { sfId: 'grouped-option-0' },
                                                    {
                                                      label: 'ChocolateChocolateChocolateChocolateChocolate',
                                                      sfId: 'grouped-option-1',
                                                    },
                                                    {
                                                      label: 'PistachioPistachioPistachioPistachioPistachio',
                                                      sfId: 'grouped-option-2',
                                                    },
                                                  ],
                                                },
                                                {
                                                  label: 'FF',
                                                  sfId: 'label-2',
                                                  options: [
                                                    {
                                                      label: 'DönerDönerDönerDönerDönerDönerDönerDönerDöner',
                                                      sfId: 'grouped-option-3',
                                                    },
                                                    {
                                                      label: 'PizzaPizzaPizzaPizzaPizzaPizzaPizzaPizzaPizza',
                                                      sfId: 'grouped-option-4',
                                                    },
                                                    {
                                                      label: 'PommesPommesPommesPommesPommesPommesPommesPommesPommes',
                                                      sfId: 'grouped-option-5',
                                                    },
                                                  ],
                                                },
                                              ],
                                              onValueChange: [
                                                {
                                                  type: 'request',
                                                  blockUi: false,
                                                  data: {
                                                    action: 'form-page',
                                                    targetId: 'select-dropdownWidth-auto',
                                                    pageEvent: 'on-value-change',
                                                  },
                                                },
                                              ],
                                            },
                                            'select-dropdownWidth-auto',
                                          ),
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
                    gridItemFactory({
                      size: { sm: 12, lg: 6 },
                      componentChildren: [
                        sectionFactory({
                          title: 'Miscellaneous',
                          divider: true,
                          titleChildren: [
                            tooltipFactory({
                              componentChildren: [fontAwesomeIconFactory()],
                              text: 'Your information could be displayed here',
                            }),
                          ],
                          componentChildren: [
                            formFactory(
                              {
                                componentChildren: [
                                  gridFactory({
                                    items: [
                                      gridItemFactory({
                                        componentChildren: [
                                          formTextFactory(
                                            {
                                              label: 'FormTextTitel',
                                              labelChildren: [fontAwesomeIconFactory()],
                                              value: 'FormText',
                                            },
                                            undefined,
                                            'data-guide-test',
                                          ),
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
                      ],
                    }),
                  ],
                }),
              ],
            },
            footer,
          }),
        ],
        modals: [],
      },
      'page-0',
    ),
  ],
});
