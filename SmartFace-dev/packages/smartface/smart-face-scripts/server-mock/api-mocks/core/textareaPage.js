// @ts-check
import { buttonFactory } from '#shared/smartFaceComponentFactories/core/buttonFactory';

import { cardFactory } from '../../../../shared/smartFaceComponentFactories/core/cardFactory.js';
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { formFactory } from '../../../../shared/smartFaceComponentFactories/core/formFactory.js';
import { gridFactory, gridItemFactory } from '../../../../shared/smartFaceComponentFactories/core/gridFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { textareaFactory } from '../../../../shared/smartFaceComponentFactories/core/textareaFactory.js';
import { patchFactory } from '../shared/patchFactory.js';
import { sidebar } from '../shared/sidebar.js';

const changeRows42 = buttonFactory({
  size: 'medium',
  text: 'Change Rows to 42',
  color: 'info',
  corner: 'rounded',
  onClick: [
    {
      type: 'request',
      data: {
        action: 'reflect',
        reflectedData: patchFactory([
          {
            targetSfId: `textarea-misc-7`,
            operation: 'write',
            path: 'props.rows',
            value: 42,
          },
        ]),
      },
    },
  ],
});

const changeRows20 = buttonFactory({
  size: 'medium',
  text: 'Change Rows to 20',
  color: 'info',
  corner: 'rounded',
  onClick: [
    {
      type: 'request',
      data: {
        action: 'reflect',
        reflectedData: patchFactory([
          {
            targetSfId: `textarea-misc-7`,
            operation: 'write',
            path: 'props.rows',
            value: 20,
          },
        ]),
      },
    },
  ],
});

const changeRows15 = buttonFactory({
  size: 'medium',
  text: 'Change Rows to 5',
  color: 'info',
  corner: 'rounded',
  onClick: [
    {
      type: 'request',
      data: {
        action: 'reflect',
        reflectedData: patchFactory([
          {
            targetSfId: `textarea-misc-7`,
            operation: 'write',
            path: 'props.rows',
            value: 5,
          },
        ]),
      },
    },
  ],
});

/**
 * @type { import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType.js').SmartFaceBackendDataType }
 */
export const textareaPage = smartFaceFactory({
  sfComponents: [
    pageFactory(
      {
        document: { head: { title: 'Textarea Page' } },
        componentChildren: [
          classicLayoutFactory({
            sidebar: sidebar('textarea-page', ['textarea-pages']),
            content: {
              componentChildren: [
                gridFactory({
                  items: [
                    gridItemFactory({
                      size: { sm: 12, lg: 12 },
                      componentChildren: [
                        cardFactory({
                          title: 'Textareas',
                          subtitle: 'Resizing',
                          bodyChildren: [
                            formFactory(
                              {
                                componentChildren: [
                                  gridFactory({
                                    items: [
                                      gridItemFactory({
                                        componentChildren: [
                                          buttonFactory({
                                            text: 'setGrowsWithContentToFalse',
                                            onClick: [
                                              {
                                                type: 'request',
                                                data: {
                                                  action: 'reflect',
                                                  reflectedData: patchFactory([
                                                    {
                                                      targetSfId: 'textarea-resize-0',
                                                      operation: 'write',
                                                      path: 'props.growsWithContent',
                                                      value: false,
                                                    },
                                                  ]),
                                                },
                                              },
                                            ],
                                          }),
                                          buttonFactory({
                                            text: 'setGrowsWithContentToTrue',
                                            onClick: [
                                              {
                                                type: 'request',
                                                data: {
                                                  action: 'reflect',
                                                  reflectedData: patchFactory([
                                                    {
                                                      targetSfId: 'textarea-resize-0',
                                                      operation: 'write',
                                                      path: 'props.growsWithContent',
                                                      value: true,
                                                    },
                                                  ]),
                                                },
                                              },
                                            ],
                                          }),
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

                    gridItemFactory({
                      size: { sm: 12, lg: 6 },
                      componentChildren: [
                        cardFactory({
                          title: 'Textarea',
                          subtitle: 'Sizes & Validation',
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
                                              name: 'textarea-size-0',
                                              label: 'Label - extraSmall',
                                              size: 'extraSmall',
                                              validationState: 'success',
                                              validationMessage: 'extraSmall',
                                              onValueChange: [
                                                {
                                                  type: 'request',
                                                  blockUi: false,
                                                  data: {
                                                    action: 'form-page',
                                                    targetId: 'textarea-size-0',
                                                    pageEvent: 'on-value-change',
                                                  },
                                                },
                                              ],
                                            },
                                            'textarea-size-0',
                                          ),
                                        ],
                                      }),
                                      gridItemFactory({
                                        componentChildren: [
                                          textareaFactory(
                                            {
                                              name: 'textarea-size-1',
                                              label: 'Label - small',
                                              size: 'small',
                                              validationState: 'success',
                                              validationMessage: 'small',
                                              onValueChange: [
                                                {
                                                  type: 'request',
                                                  blockUi: false,
                                                  data: {
                                                    action: 'form-page',
                                                    targetId: 'textarea-size-1',
                                                    pageEvent: 'on-value-change',
                                                  },
                                                },
                                              ],
                                            },
                                            'textarea-size-1',
                                          ),
                                        ],
                                      }),
                                      gridItemFactory({
                                        componentChildren: [
                                          textareaFactory(
                                            {
                                              name: 'textarea-size-2',
                                              label: 'Label - medium',
                                              size: 'medium',
                                              validationState: 'warning',
                                              validationMessage: 'medium',
                                              onValueChange: [
                                                {
                                                  type: 'request',
                                                  blockUi: false,
                                                  data: {
                                                    action: 'form-page',
                                                    targetId: 'textarea-size-2',
                                                    pageEvent: 'on-value-change',
                                                  },
                                                },
                                              ],
                                            },
                                            'textarea-size-2',
                                          ),
                                        ],
                                      }),
                                      gridItemFactory({
                                        componentChildren: [
                                          textareaFactory(
                                            {
                                              name: 'textarea-size-3',
                                              label: 'Label - large',
                                              size: 'large',
                                              validationState: 'danger',
                                              validationMessage: 'large',
                                              onValueChange: [
                                                {
                                                  type: 'request',
                                                  blockUi: false,
                                                  data: {
                                                    action: 'form-page',
                                                    targetId: 'textarea-size-3',
                                                    pageEvent: 'on-value-change',
                                                  },
                                                },
                                              ],
                                            },
                                            'textarea-size-3',
                                          ),
                                        ],
                                      }),
                                      gridItemFactory({
                                        componentChildren: [
                                          textareaFactory(
                                            {
                                              name: 'textarea-size-4',
                                              label: 'Label - extraLarge',
                                              size: 'extraLarge',
                                              validationState: 'danger',
                                              validationMessage: 'extraLarge',
                                              onValueChange: [
                                                {
                                                  type: 'request',
                                                  blockUi: false,
                                                  data: {
                                                    action: 'form-page',
                                                    targetId: 'textarea-size-4',
                                                    pageEvent: 'on-value-change',
                                                  },
                                                },
                                              ],
                                            },
                                            'textarea-size-4',
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
                        cardFactory({
                          title: 'Textarea',
                          subtitle: 'MISC',

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
                                              name: 'textarea-misc-0',
                                              label: 'Label - Placeholder',
                                              placeholder: 'Please insert... 	(˵ ͡° ͜ʖ ͡°˵)',
                                            },
                                            'textarea-misc-0',
                                          ),
                                        ],
                                      }),
                                      gridItemFactory({
                                        componentChildren: [
                                          textareaFactory(
                                            {
                                              name: 'textarea-misc-1',
                                              label: 'Label - Helptext',
                                              helpText: 'Helptext',
                                            },
                                            'textarea-misc-1',
                                          ),
                                        ],
                                      }),
                                      gridItemFactory({
                                        componentChildren: [
                                          textareaFactory(
                                            {
                                              name: 'textarea-misc-2',
                                              label: 'Label - mandatory',
                                              mandatory: true,
                                            },
                                            'textarea-misc-2',
                                          ),
                                        ],
                                      }),
                                      gridItemFactory({
                                        componentChildren: [
                                          textareaFactory(
                                            {
                                              name: 'textarea-misc-3',
                                              label: 'Label - readOnly',
                                              readOnly: true,
                                            },
                                            'textarea-misc-3',
                                          ),
                                        ],
                                      }),
                                      gridItemFactory({
                                        componentChildren: [
                                          textareaFactory(
                                            {
                                              name: 'textarea-misc-4',
                                              label: 'Label - spellCheck',
                                              spellCheck: true,
                                            },
                                            'textarea-misc-4',
                                          ),
                                        ],
                                      }),
                                      gridItemFactory({
                                        componentChildren: [
                                          textareaFactory(
                                            {
                                              name: 'textarea-misc-5',
                                              label: 'Label - value',
                                              value: 'value',
                                            },
                                            'textarea-misc-5',
                                          ),
                                        ],
                                      }),
                                      gridItemFactory({
                                        componentChildren: [
                                          textareaFactory(
                                            {
                                              name: 'textarea-misc-6',
                                              label: 'Label - disabled',
                                              disabled: true,
                                            },
                                            'textarea-misc-6',
                                          ),
                                        ],
                                      }),
                                      gridItemFactory({
                                        componentChildren: [changeRows42],
                                      }),
                                      gridItemFactory({
                                        componentChildren: [changeRows20],
                                      }),
                                      gridItemFactory({
                                        componentChildren: [changeRows15],
                                      }),
                                      gridItemFactory({
                                        componentChildren: [
                                          textareaFactory(
                                            {
                                              name: 'textarea-misc-7',
                                              label: 'Label - 10 rows',
                                              rows: 10,
                                            },
                                            'textarea-misc-7',
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
                  ],
                }),
              ],
            },
          }),
        ],
      },
      'page-0',
    ),
  ],
});
