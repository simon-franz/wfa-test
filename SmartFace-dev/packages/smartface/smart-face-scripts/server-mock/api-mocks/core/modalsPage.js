// @ts-check

import getId from '../../../../shared/getId.js';
import { buttonFactory } from '../../../../shared/smartFaceComponentFactories/core/buttonFactory.js';
import { cardFactory } from '../../../../shared/smartFaceComponentFactories/core/cardFactory.js';
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { comboBoxFactory } from '../../../../shared/smartFaceComponentFactories/core/comboBoxFactory.js';
import { dateFieldFactory } from '../../../../shared/smartFaceComponentFactories/core/dateFieldFactory.js';
import { formFactory } from '../../../../shared/smartFaceComponentFactories/core/formFactory.js';
import { gridFactory, gridItemFactory } from '../../../../shared/smartFaceComponentFactories/core/gridFactory.js';
import { keyDownSideEffectFactory } from '../../../../shared/smartFaceComponentFactories/core/keyDownSideEffectFactory.js';
import { modalFactory, pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { sectionFactory } from '../../../../shared/smartFaceComponentFactories/core/sectionFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { streamlineIconFactory } from '../../../../shared/smartFaceComponentFactories/core/streamlineIconFactory.js';
import { textFactory } from '../../../../shared/smartFaceComponentFactories/core/textFactory.js';
import { textFieldFactory } from '../../../../shared/smartFaceComponentFactories/core/textFieldFactory.js';
import { timeFieldFactory } from '../../../../shared/smartFaceComponentFactories/core/timeFieldFactory.js';
import { uiHandlerFactory } from '../../../../shared/smartFaceComponentFactories/core/uiHandlerFactory.js';
import { footer } from '../shared/footer.js';
import { patchFactory } from '../shared/patchFactory.js';
import { sidebar } from '../shared/sidebar.js';
import times from 'lodash/times.js';

const dummyText =
  '“I see you feel as I do,” said Mr. Enfield. “Yes, it´s a bad story. For my man was a fellow that nobody could have to do with, a really damnable man; and the person that drew the cheque is the very pink of the proprieties, celebrated too, and (what makes it worse) one of your fellows who do what they call good. Black mail I suppose; an honest man paying through the nose for some of the capers of his youth. Black Mail House is what I call the place with the door, in consequence. Though even that, you know, is far from explaining all,” he added, and with the words fell into a vein of musing.';

const modalProps = {
  closeable: true,
  footerChildren: [buttonFactory({}, 'modal-0-button-0')],
  bodyChildren: [
    ...times(8, () =>
      textFactory({
        htmlTag: 'p',
        text: dummyText,
      }),
    ),
  ],
};

const childModalTest = [
  modalFactory({
    title: 'Modal Group A (Parent)',
    size: 'extraLarge',
    ...modalProps,
    childModal: modalFactory({
      title: 'Modal Group A (Child)',
      size: 'medium',
      ...modalProps,
      childModal: modalFactory({ ...modalProps, title: 'Modal Group A (Grand-Child)', size: 'medium' }),
    }),
  }),
  modalFactory({
    title: 'Modal Group B (Parent)',
    size: 'medium',
    ...modalProps,
    childModal: modalFactory({
      title: 'Modal Group B (Child)',
      size: 'medium',
      ...modalProps,
      childModal: modalFactory({ ...modalProps, title: 'Modal Group B (Grand-Child)', size: 'medium' }),
    }),
  }),
  modalFactory({
    title: 'Modal Group C (Parent)',
    size: 'extraSmall',
    ...modalProps,
    childModal: modalFactory({
      title: 'Modal Group C (Child)',
      size: 'medium',
      ...modalProps,
      childModal: modalFactory({ ...modalProps, title: 'Modal Group C (Grand-Child)', size: 'medium' }),
    }),
  }),
];

const sizeModals = [
  modalFactory({ ...modalProps, title: 'extraLarge', size: 'extraLarge' }),
  modalFactory({ ...modalProps, title: 'large', size: 'large' }),
  modalFactory({ ...modalProps, title: 'medium', size: 'medium' }),
  modalFactory({ ...modalProps, title: 'small', size: 'small' }),
  modalFactory({ ...modalProps, title: 'extraSmall', size: 'extraSmall' }),
  modalFactory({ ...modalProps, title: 'auto', size: 'auto' }),
  modalFactory({ ...modalProps, title: 'default-size' }),
];

const noTabbableElementModal = [
  modalFactory(
    {
      title: 'No Tabbable Element - (Focus Trap Check)',
      size: 'auto',
      closeable: false,
      footerChildren: [
        textFactory({
          text: 'Some Text',
        }),
      ],
    },
    'modal-1',
  ),
];

const openAndReplaceModals = [
  modalFactory(
    {
      title: 'Open & Replace Modal',
      size: 'auto',
      closeable: false,
      footerChildren: [
        buttonFactory({
          onClick: [
            {
              type: 'request',
              data: {
                action: 'reflect',
                reflectedData: patchFactory([
                  {
                    operation: 'write',
                    targetSfId: 'modal-open-replace',
                    path: 'props.childModal',
                    value: modalFactory({
                      title: 'Blabla',
                      size: 'auto',
                      closeable: true,
                    }),
                  },
                ]),
              },
            },
          ],
        }),
      ],
    },
    'modal-open-replace',
  ),
];

const generateAnimationCombinations = () => {
  const animations = ['top', 'left', 'right', 'bottom', 'grow', 'shrink'];
  const combinations = [];

  animations.forEach((entryAnimation) => {
    animations.forEach((exitAnimation) => {
      combinations.push({ entryAnimation, exitAnimation });
    });
  });

  return combinations;
};

const animationCombinations = generateAnimationCombinations();
const animationModals = animationCombinations.map((combination) => {
  return modalFactory({
    ...combination,
    title: `Entry: ${combination.entryAnimation} & Exit: ${combination.exitAnimation}`,
    size: 'small',
    closeable: true,
    footerChildren: [buttonFactory({}, 'modal-0-button-0')],
    bodyChildren: [
      ...times(2, () =>
        textFactory({
          htmlTag: 'p',
          text: dummyText,
        }),
      ),
    ],
  });
});

const modals = [
  modalFactory(
    {
      closeable: true,
      footerChildren: [buttonFactory({}, 'modal-0-button-0')],
      bodyChildren: [
        ...times(8, () =>
          textFactory({
            htmlTag: 'p',
            text: dummyText,
          }),
        ),
      ],
      title: 'First Stacked Modal',
      size: 'large',
      // fullHeight: true,
      // fullWidth: true,
      fullScreen: false,
    },
    undefined,
    'data-guide-test',
  ),
  modalFactory({
    ...modalProps,
    title: 'Check Z-Index for Section Tabbing',
    size: 'large',
    bodyChildren: [
      formFactory({
        componentChildren: [
          sectionFactory({
            title: 'hallo',
            collapsible: true,
            componentChildren: [textFieldFactory({ placeholder: 'Tab the toggle over me' })],
          }),
        ],
      }),
    ],
  }),
  modalFactory(
    {
      title: 'Second Modal',
      size: 'auto',
      closeable: true,
      bodyChildren: [
        formFactory({
          componentChildren: [
            gridFactory({
              items: [
                gridItemFactory({
                  componentChildren: [
                    uiHandlerFactory({
                      iconSet: 'streamline',
                      componentChildren: [
                        dateFieldFactory(
                          {
                            label:
                              'What date is it? What date is it? What date is it? What date is it? What date is it? What date is it? What date is it? What date is it? What date is it? What date is it? What date is it? What date is it? What date is it? What date is it? What date is it?',
                            name: 'date-field-0',
                            mandatory: true,
                            helpText: 'You just need to pick a date',
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
                          'date-field-0',
                        ),
                      ],
                    }),
                  ],
                }),
                gridItemFactory({
                  componentChildren: [
                    timeFieldFactory({
                      name: 'time-0',
                      label: 'What time is it?',
                    }),
                  ],
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
              componentChildren: [
                {
                  sfComponent: 'Button',
                  sfId: getId(),
                  props: {
                    text: 'Open Next Modal',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: patchFactory([
                            {
                              targetSfId: 'modal-1',
                              operation: 'write',
                              path: 'props.childModal',
                              value: modalFactory(
                                {
                                  title: 'New Modal from Server',
                                  footerChildren: [
                                    buttonFactory({
                                      text: 'Close the additional modal',
                                      color: 'danger',
                                      onClick: [
                                        {
                                          type: 'request',
                                          data: {
                                            action: 'reflect',
                                            reflectedData: patchFactory([
                                              { operation: 'delete', targetSfId: 'modal-2', path: null },
                                            ]),
                                          },
                                        },
                                      ],
                                    }),
                                  ],
                                },
                                'modal-2',
                              ),
                            },
                          ]),
                        },
                      },
                    ],
                  },
                },
              ],
            }),
          ],
        }),
      ],
    },
    'modal-1',
  ),
];

const stackedModal = gridItemFactory({
  componentChildren: [
    buttonFactory({
      text: 'Stacked Modals',
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
                            closeable: true,
                            title: 'Page Modal',
                            size: 'extraLarge',
                            bodyChildren: [
                              comboBoxFactory(
                                {
                                  presentation: 'modal',
                                  getResultMinLength: 3,
                                  getResultDelay: 500,
                                  clearValueOnQueryChange: false,
                                  url: '/combo-box-backend',
                                  label: 'Trigger second Modal',
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
                                'comboBox-stacked-id',
                              ),
                            ],
                          },
                          `modal-stacked-id`,
                        ),
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
});

/** @type {import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType}  */
export const modalsPage = smartFaceFactory({
  sfComponents: [
    pageFactory(
      {
        document: { head: { title: 'Modals Page' } },
        componentChildren: [
          classicLayoutFactory({
            sidebar: sidebar('modals-page'),
            content: {
              componentChildren: [
                gridFactory({
                  items: [
                    gridItemFactory(
                      {
                        size: 12,
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
                                  stackedModal,
                                  gridItemFactory({
                                    componentChildren: [
                                      buttonFactory({
                                        text: 'Open modals again',
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
                                      buttonFactory({
                                        text: 'Open Size Test Modals',
                                        onClick: [
                                          {
                                            type: 'request',
                                            data: {
                                              action: 'reflect',
                                              reflectedData: patchFactory([
                                                {
                                                  operation: 'write',
                                                  targetSfId: 'page-0',
                                                  path: 'props.modals',
                                                  value: sizeModals,
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
                                        text: 'Animated Modals',
                                        onClick: [
                                          {
                                            type: 'request',
                                            data: {
                                              action: 'reflect',
                                              reflectedData: patchFactory([
                                                {
                                                  operation: 'write',
                                                  targetSfId: 'page-0',
                                                  path: 'props.modals',
                                                  value: animationModals,
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
                                        text: 'Open & Replace Modal',
                                        onClick: [
                                          {
                                            type: 'request',
                                            data: {
                                              action: 'reflect',
                                              reflectedData: patchFactory([
                                                {
                                                  operation: 'write',
                                                  targetSfId: 'page-0',
                                                  path: 'props.modals',
                                                  value: openAndReplaceModals,
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
                                        text: 'Open Modal without Tabbable Element',
                                        onClick: [
                                          {
                                            type: 'request',
                                            data: {
                                              action: 'reflect',
                                              reflectedData: patchFactory([
                                                {
                                                  operation: 'write',
                                                  targetSfId: 'page-0',
                                                  path: 'props.modals',
                                                  value: noTabbableElementModal,
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
                      'item-2',
                    ),
                  ],
                }),

                keyDownSideEffectFactory({
                  shortcut: { key: 'F2' },
                  onKeyDown: [
                    {
                      type: 'request',
                      data: {
                        action: 'reflect',
                        reflectedData: {
                          sideEffects: [
                            {
                              type: 'addNotification',
                              id: 'notification-test',
                              title: 'Test',
                              message: 'This is a test notification',
                              duration: 'infinite',
                            },
                          ],
                        },
                      },
                    },
                  ],
                }),
              ],
            },
            footer,
          }),
        ],
        // modals: [],
        // modals,
        // modals: sizeModals,
        // modals: childModalTest,
        // modals: animationModals,
      },
      'page-0',
    ),
  ],
  sideEffects: [
    {
      type: 'addNotification',
      id: 'notification-1',
      title: 'Info',
      message: 'This should be infront of the modal. Press <b>"F2"</b> to trigger a test notification.',
      html: true,
      color: 'info',
      duration: 2000,
    },
  ],
});
