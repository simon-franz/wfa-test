// @ts-check
import { badgeFactory } from '../../../../shared/smartFaceComponentFactories/core/badgeFactory.js';
import { buttonFactory } from '../../../../shared/smartFaceComponentFactories/core/buttonFactory.js';
import { cardFactory } from '../../../../shared/smartFaceComponentFactories/core/cardFactory.js';
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { fontAwesomeIconFactory } from '../../../../shared/smartFaceComponentFactories/core/fontAwesomeIconFactory.js';
import { gridFactory, gridItemFactory } from '../../../../shared/smartFaceComponentFactories/core/gridFactory.js';
import { iconButtonFactory } from '../../../../shared/smartFaceComponentFactories/core/iconButtonFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { textFactory } from '../../../../shared/smartFaceComponentFactories/core/textFactory.js';
import { tooltipFactory } from '../../../../shared/smartFaceComponentFactories/core/tooltipFactory.js';
import { footer } from '../shared/footer.js';
import { patchFactory } from '../shared/patchFactory.js';
import { sidebar } from '../shared/sidebar.js';
/**
 * @type { import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType }
 */
export const tooltipPage = smartFaceFactory({
  sfComponents: [
    pageFactory({
      document: { head: { title: 'Tooltip Page' } },
      componentChildren: [
        classicLayoutFactory(
          {
            sidebar: sidebar('tooltip-page', ['component-pages']),
            content: {
              componentChildren: [
                gridFactory({
                  items: [
                    gridItemFactory({
                      size: 12,
                      componentChildren: [
                        cardFactory({
                          title: 'Tooltip in Card Body',
                          bodyChildren: [
                            gridFactory({
                              rowGap: 'extraLarge',
                              items: [
                                gridItemFactory({
                                  size: 12,
                                  componentChildren: [
                                    gridFactory({
                                      items: [
                                        gridItemFactory({
                                          componentChildren: [
                                            tooltipFactory({
                                              text: '01234569780285 with tooltip text',
                                              componentChildren: [badgeFactory({ text: 'with tooltip' })],
                                            }),
                                          ],
                                        }),
                                        gridItemFactory({
                                          componentChildren: [
                                            tooltipFactory({
                                              title: 'Tighter Tooltip Title',
                                              text: 'Wenn dieser Tooltip keinen title hat, ist was schief gegangen',
                                              componentChildren: [badgeFactory({ text: 'with tooltip with title' })],
                                            }),
                                          ],
                                        }),
                                        gridItemFactory({
                                          componentChildren: [badgeFactory({ text: 'no tooltip' })],
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                gridItemFactory({
                                  size: 12,
                                  componentChildren: [
                                    buttonFactory({ text: 'FullWidth w/o tooltip', fullWidth: true }),
                                  ],
                                }),
                                gridItemFactory({
                                  size: 12,
                                  componentChildren: [
                                    tooltipFactory({
                                      text: 'fullWidth',
                                      fullWidth: true,
                                      componentChildren: [
                                        buttonFactory({ text: 'FullWidth w tooltip', fullWidth: true }),
                                      ],
                                    }),
                                  ],
                                }),
                                gridItemFactory({
                                  size: 12,
                                  componentChildren: [buttonFactory({ text: 'Inline w/o tooltip', fullWidth: false })],
                                }),
                                gridItemFactory({
                                  size: 12,
                                  componentChildren: [
                                    tooltipFactory({
                                      text: 'Inline',
                                      componentChildren: [
                                        buttonFactory({ text: 'Inline w tooltip', fullWidth: false }),
                                      ],
                                    }),
                                  ],
                                }),
                                gridItemFactory({
                                  size: 3,
                                  componentChildren: [
                                    tooltipFactory({
                                      placement: 'top',
                                      text: 'top',
                                      componentChildren: [buttonFactory({ text: 'top', fullWidth: false })],
                                    }),
                                  ],
                                }),
                                gridItemFactory({
                                  size: 3,
                                  componentChildren: [
                                    tooltipFactory({
                                      placement: 'right',
                                      text: 'right',
                                      componentChildren: [buttonFactory({ text: 'right', fullWidth: false })],
                                    }),
                                  ],
                                }),
                                gridItemFactory({
                                  size: 3,
                                  componentChildren: [
                                    tooltipFactory({
                                      placement: 'left',
                                      text: 'left',
                                      componentChildren: [buttonFactory({ text: 'left', fullWidth: false })],
                                    }),
                                  ],
                                }),
                                gridItemFactory({
                                  size: 3,
                                  componentChildren: [
                                    tooltipFactory({
                                      placement: 'bottom',
                                      text: 'bottom',
                                      componentChildren: [buttonFactory({ text: 'bottom', fullWidth: false })],
                                    }),
                                  ],
                                }),
                                gridItemFactory(
                                  {
                                    size: 3,
                                    componentChildren: [
                                      tooltipFactory(
                                        {
                                          placement: 'bottom',
                                          text: 'Dieses ist ein Tooltip',
                                          componentChildren: [
                                            buttonFactory({
                                              text: 'Marco?',
                                              fullWidth: false,
                                              color: 'success',
                                              onClick: [
                                                {
                                                  type: 'request',
                                                  data: {
                                                    action: 'reflect',
                                                    reflectedData: patchFactory([
                                                      {
                                                        targetSfId: 'giFID',
                                                        operation: 'write',
                                                        path: 'props.componentChildren',
                                                        value: [
                                                          tooltipFactory({
                                                            text: 'Und dieses ist auch ein Tooltip',
                                                            componentChildren: [
                                                              buttonFactory({ text: 'Polo!', color: 'danger' }),
                                                            ],
                                                          }),
                                                        ],
                                                      },
                                                    ]),
                                                  },
                                                },
                                              ],
                                            }),
                                          ],
                                        },
                                        'myTooltip',
                                      ),
                                    ],
                                  },
                                  'giFID',
                                ),
                                gridItemFactory(
                                  {
                                    size: 12,
                                    componentChildren: [
                                      cardFactory({
                                        title: 'Touch Behaviour Test - on Mobile',
                                        bodyChildren: [
                                          gridFactory({
                                            items: [
                                              gridItemFactory({
                                                componentChildren: [
                                                  tooltipFactory(
                                                    {
                                                      text: 'Test Tooltip',
                                                      trigger: 'longHover',
                                                      componentChildren: [
                                                        buttonFactory({
                                                          text: 'Tooltip Trigger w/ event',
                                                          fullWidth: false,
                                                          color: 'primary',
                                                          onClick: [
                                                            {
                                                              type: 'request',
                                                              data: {
                                                                action: 'reflect',
                                                                reflectedData: {
                                                                  sideEffects: [
                                                                    {
                                                                      type: 'addNotification',
                                                                      id: 'notification-event-triggered',
                                                                      title: 'Event Triggered',
                                                                      message: 'The event was triggered',
                                                                      color: 'info',
                                                                      duration: 3000,
                                                                    },
                                                                  ],
                                                                },
                                                              },
                                                            },
                                                          ],
                                                        }),
                                                      ],
                                                    },
                                                    'testTooltip',
                                                  ),
                                                ],
                                              }),
                                              gridItemFactory({
                                                componentChildren: [
                                                  buttonFactory({
                                                    text: 'Set Trigger to HoverOrTouch',
                                                    fullWidth: false,
                                                    color: 'success',
                                                    onClick: [
                                                      {
                                                        type: 'request',
                                                        data: {
                                                          action: 'reflect',
                                                          reflectedData: patchFactory([
                                                            {
                                                              targetSfId: 'testTooltip',
                                                              operation: 'write',
                                                              path: 'props.trigger',
                                                              value: 'hoverOrTouch',
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
                                                    text: 'Set Trigger to LongHoverOrLongTouch',
                                                    fullWidth: false,
                                                    color: 'warning',
                                                    onClick: [
                                                      {
                                                        type: 'request',
                                                        data: {
                                                          action: 'reflect',
                                                          reflectedData: patchFactory([
                                                            {
                                                              targetSfId: 'testTooltip',
                                                              operation: 'write',
                                                              path: 'props.trigger',
                                                              value: 'longHoverOrLongTouch',
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
                                                    text: 'Set Trigger to LongHover',
                                                    fullWidth: false,
                                                    color: 'danger',
                                                    onClick: [
                                                      {
                                                        type: 'request',
                                                        data: {
                                                          action: 'reflect',
                                                          reflectedData: patchFactory([
                                                            {
                                                              targetSfId: 'testTooltip',
                                                              operation: 'write',
                                                              path: 'props.trigger',
                                                              value: 'longHover',
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
                                  'touchBehaviourTest',
                                ),
                                gridItemFactory({
                                  size: 12,
                                  componentChildren: [
                                    cardFactory({
                                      title: 'Tooltip Adapter Intelligence Test - on Mobile',
                                      bodyChildren: [
                                        gridFactory({
                                          items: [
                                            gridItemFactory({
                                              componentChildren: [
                                                tooltipFactory({
                                                  text: 'This should use "longHover" behavior',
                                                  componentChildren: [
                                                    buttonFactory({
                                                      text: 'Link Button',
                                                      href: 'https://example.com',
                                                      color: 'primary',
                                                    }),
                                                  ],
                                                }),
                                              ],
                                            }),
                                            gridItemFactory({
                                              componentChildren: [
                                                tooltipFactory({
                                                  text: 'This should use "longHoverOrLongTouch" behavior',
                                                  componentChildren: [
                                                    buttonFactory({
                                                      text: 'Regular Button',
                                                      color: 'warning',
                                                    }),
                                                  ],
                                                }),
                                              ],
                                            }),
                                            gridItemFactory({
                                              componentChildren: [
                                                tooltipFactory({
                                                  text: 'This should use "longHoverOrLongTouch" behavior',
                                                  componentChildren: [
                                                    iconButtonFactory({
                                                      icon: fontAwesomeIconFactory({ name: 'info' }),
                                                      color: 'info',
                                                    }),
                                                  ],
                                                }),
                                              ],
                                            }),
                                            gridItemFactory({
                                              componentChildren: [
                                                tooltipFactory({
                                                  text: 'This should use "longHoverOrLongTouch" behavior',
                                                  componentChildren: [
                                                    badgeFactory({
                                                      text: 'Badge with Tooltip',
                                                      color: 'success',
                                                    }),
                                                  ],
                                                }),
                                              ],
                                            }),
                                            gridItemFactory({
                                              componentChildren: [
                                                tooltipFactory({
                                                  text: 'This should use "longHoverOrLongTouch" behavior',
                                                  componentChildren: [
                                                    textFactory({
                                                      text: 'Regular Text - no Link',
                                                      color: 'primary',
                                                    }),
                                                  ],
                                                }),
                                              ],
                                            }),
                                            // Added Icon
                                            gridItemFactory({
                                              componentChildren: [
                                                tooltipFactory({
                                                  text: 'This should use "hoverOrTouch" behavior',
                                                  componentChildren: [fontAwesomeIconFactory({ name: 'trash' })],
                                                }),
                                              ],
                                            }),
                                            gridItemFactory({
                                              componentChildren: [
                                                badgeFactory({
                                                  dot: true,
                                                  color: 'danger',
                                                  animation: 'pulsing',
                                                  text: 'This should use "longHoverOrLongTouch" behavior',
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
          },
          'marco',
        ),
      ],
    }),
  ],
});
