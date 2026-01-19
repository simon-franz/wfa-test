import { buttonFactory } from '../../../../shared/smartFaceComponentFactories/core/buttonFactory.js';
import { cardFactory } from '../../../../shared/smartFaceComponentFactories/core/cardFactory.js';
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { gridFactory, gridItemFactory } from '../../../../shared/smartFaceComponentFactories/core/gridFactory.js';
import { iframeFactory } from '../../../../shared/smartFaceComponentFactories/core/iframeFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { textFieldFactory } from '../../../../shared/smartFaceComponentFactories/core/textFieldFactory.js';
import { footer } from '../shared/footer.js';
import { sidebar } from '../shared/sidebar.js';

/**
 * @type { import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType }
 */
export const navigateToElementPage = smartFaceFactory({
  sfComponents: [
    pageFactory({
      document: { head: { title: 'Focus Element Page' } },
      componentChildren: [
        classicLayoutFactory({
          sidebar: sidebar('navigate-to-element-page', ['side-effect-pages']),
          content: {
            componentChildren: [
              gridFactory({
                items: [
                  gridItemFactory({
                    componentChildren: [
                      gridFactory({
                        rowGapSize: 'extraSmall',
                        columnGapSize: 'extraSmall',
                        alignItems: 'center',
                        items: [
                          gridItemFactory({
                            size: 'auto',
                            componentChildren: [
                              textFieldFactory(
                                {
                                  label: 'Focus Element Text Field',
                                  name: 'focusElement1',
                                },
                                'text-field-0',
                              ),
                            ],
                          }),
                          gridItemFactory({
                            size: 'auto',
                            componentChildren: [
                              buttonFactory({
                                text: 'Default (scrollIntoView)',
                                onClick: [
                                  {
                                    type: 'request',
                                    data: {
                                      action: 'navigate-to-element',
                                      targetId: 'text-field-0',
                                    },
                                  },
                                ],
                              }),
                            ],
                          }),
                          gridItemFactory({
                            size: 'auto',
                            componentChildren: [
                              buttonFactory({
                                text: 'focus + scrollIntoView',
                                onClick: [
                                  {
                                    type: 'request',
                                    data: {
                                      action: 'navigate-to-element',
                                      targetId: 'text-field-0',
                                      pageEvent: {
                                        focus: true,
                                        scrollIntoView: true,
                                      },
                                    },
                                  },
                                ],
                              }),
                            ],
                          }),
                          gridItemFactory({
                            size: 'auto',
                            componentChildren: [
                              buttonFactory({
                                text: 'focus',
                                onClick: [
                                  {
                                    type: 'request',
                                    data: {
                                      action: 'navigate-to-element',
                                      targetId: 'text-field-0',
                                      pageEvent: {
                                        focus: true,
                                        scrollIntoView: false,
                                      },
                                    },
                                  },
                                ],
                              }),
                            ],
                          }),
                          gridItemFactory({
                            size: 'auto',
                            componentChildren: [
                              buttonFactory({
                                text: 'None',
                                onClick: [
                                  {
                                    type: 'request',
                                    data: {
                                      action: 'navigate-to-element',
                                      targetId: 'text-field-0',
                                      pageEvent: {
                                        focus: false,
                                        scrollIntoView: false,
                                      },
                                    },
                                  },
                                ],
                              }),
                            ],
                          }),
                          gridItemFactory({
                            size: 'auto',
                            componentChildren: [
                              buttonFactory({
                                text: 'Special',
                                onClick: [
                                  {
                                    type: 'request',
                                    data: {
                                      action: 'navigate-to-element',
                                      targetId: 'text-field-1',
                                      pageEvent: {
                                        focus: true,
                                        scrollIntoView: true,
                                      },
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
                  gridItemFactory({
                    componentChildren: [
                      gridFactory({
                        rowGapSize: 'extraSmall',
                        columnGapSize: 'extraSmall',
                        alignItems: 'center',
                        items: [
                          gridItemFactory({
                            size: 'auto',
                            componentChildren: [
                              cardFactory(
                                {
                                  title: 'Focus on Textfield',
                                  bodyChildren: [
                                    textFieldFactory({
                                      label: 'Focus Element Card 1',
                                      name: 'focusElement2',
                                    }),
                                    textFieldFactory({
                                      label: 'Focus Element Card 2',
                                      name: 'focusElement3',
                                    }),
                                    buttonFactory({
                                      text: 'Focus Card',
                                      onClick: [
                                        {
                                          type: 'request',
                                          data: {
                                            action: 'navigate-to-element',
                                            targetId: 'card-0',
                                          },
                                        },
                                      ],
                                    }),
                                  ],
                                },
                                'card-0',
                              ),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              gridFactory({
                items: [
                  gridItemFactory({
                    componentChildren: [
                      iframeFactory({
                        height: 1000,
                      }),
                      textFieldFactory(
                        {
                          label: 'Focus Into View',
                          name: 'focusElement4',
                        },
                        'text-field-1',
                      ),
                      iframeFactory({
                        height: 1000,
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
