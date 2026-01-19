// @ts-check

import { buttonFactory } from '../../../../shared/smartFaceComponentFactories/core/buttonFactory.js';
import { cardFactory } from '../../../../shared/smartFaceComponentFactories/core/cardFactory.js';
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import {
  flexboxFactory,
  flexboxItemFactory,
} from '../../../../shared/smartFaceComponentFactories/core/flexboxFactory.js';
import { gridFactory, gridItemFactory } from '../../../../shared/smartFaceComponentFactories/core/gridFactory.js';
import { keyDownSideEffectFactory } from '../../../../shared/smartFaceComponentFactories/core/keyDownSideEffectFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { streamlineIconFactory } from '../../../../shared/smartFaceComponentFactories/core/streamlineIconFactory.js';
import { textFactory } from '../../../../shared/smartFaceComponentFactories/core/textFactory.js';
import { overlayEffectFactory } from '../../../../shared/smartFaceComponentFactories/extension/overlayEffectFactory.js';
import { footer } from '../shared/footer.js';
import { patchFactory } from '../shared/patchFactory.js';
import { sidebar } from '../shared/sidebar.js';

const dummyText =
  '“I see you feel as I do,” said Mr. Enfield. “Yes, it’s a bad story. For my man was a fellow that nobody could have to do with, a really damnable man; and the person that drew the cheque is the very pink of the proprieties, celebrated too, and (what makes it worse) one of your fellows who do what they call good. Black mail I suppose; an honest man paying through the nose for some of the capers of his youth. Black Mail House is what I call the place with the door, in consequence. Though even that, you know, is far from explaining all,” he added, and with the words fell into a vein of musing.';

/** @type {import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType.js').SmartFaceBackendDataType}  */
export const overlayEffectPage = smartFaceFactory({
  sfComponents: [
    pageFactory(
      {
        document: { head: { title: 'OverlayEffectPage' } },
        componentChildren: [
          overlayEffectFactory({ effect: 'vacation-vibes' }, 'overlay-effects-0'),
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
                            title: 'OverlayEffects',
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
                              flexboxFactory({
                                gap: 'small',
                                items: [
                                  flexboxItemFactory({
                                    componentChildren: [
                                      buttonFactory({
                                        fullWidth: false,
                                        text: 'confetti',

                                        onClick: [
                                          {
                                            type: 'request',
                                            data: {
                                              action: 'reflect',
                                              reflectedData: patchFactory([
                                                {
                                                  operation: 'write',
                                                  targetSfId: 'overlay-effects-0',
                                                  path: 'props.effect',
                                                  value: 'confetti',
                                                },
                                              ]),
                                            },
                                          },
                                        ],
                                      }),
                                    ],
                                  }),
                                  flexboxItemFactory({
                                    componentChildren: [
                                      buttonFactory({
                                        fullWidth: false,
                                        text: 'confetti-fireworks',

                                        onClick: [
                                          {
                                            type: 'request',
                                            data: {
                                              action: 'reflect',
                                              reflectedData: patchFactory([
                                                {
                                                  operation: 'write',
                                                  targetSfId: 'overlay-effects-0',
                                                  path: 'props.effect',
                                                  value: 'confetti-fireworks',
                                                },
                                              ]),
                                            },
                                          },
                                        ],
                                      }),
                                    ],
                                  }),
                                  flexboxItemFactory({
                                    componentChildren: [
                                      buttonFactory({
                                        fullWidth: false,
                                        text: 'autumn-vibes',

                                        onClick: [
                                          {
                                            type: 'request',
                                            data: {
                                              action: 'reflect',
                                              reflectedData: patchFactory([
                                                {
                                                  operation: 'write',
                                                  targetSfId: 'overlay-effects-0',
                                                  path: 'props.effect',
                                                  value: 'autumn-vibes',
                                                },
                                              ]),
                                            },
                                          },
                                        ],
                                      }),
                                    ],
                                  }),
                                  flexboxItemFactory({
                                    componentChildren: [
                                      buttonFactory({
                                        fullWidth: false,
                                        text: 'winter-vibes',

                                        onClick: [
                                          {
                                            type: 'request',
                                            data: {
                                              action: 'reflect',
                                              reflectedData: patchFactory([
                                                {
                                                  operation: 'write',
                                                  targetSfId: 'overlay-effects-0',
                                                  path: 'props.effect',
                                                  value: 'winter-vibes',
                                                },
                                              ]),
                                            },
                                          },
                                        ],
                                      }),
                                    ],
                                  }),
                                  flexboxItemFactory({
                                    componentChildren: [
                                      buttonFactory({
                                        fullWidth: false,
                                        text: 'spring-vibes',

                                        onClick: [
                                          {
                                            type: 'request',
                                            data: {
                                              action: 'reflect',
                                              reflectedData: patchFactory([
                                                {
                                                  operation: 'write',
                                                  targetSfId: 'overlay-effects-0',
                                                  path: 'props.effect',
                                                  value: 'spring-vibes',
                                                },
                                              ]),
                                            },
                                          },
                                        ],
                                      }),
                                    ],
                                  }),
                                  flexboxItemFactory({
                                    componentChildren: [
                                      buttonFactory({
                                        fullWidth: false,
                                        text: 'summer-vibes',

                                        onClick: [
                                          {
                                            type: 'request',
                                            data: {
                                              action: 'reflect',
                                              reflectedData: patchFactory([
                                                {
                                                  operation: 'write',
                                                  targetSfId: 'overlay-effects-0',
                                                  path: 'props.effect',
                                                  value: 'summer-vibes',
                                                },
                                              ]),
                                            },
                                          },
                                        ],
                                      }),
                                    ],
                                  }),
                                  flexboxItemFactory({
                                    componentChildren: [
                                      buttonFactory({
                                        fullWidth: false,
                                        text: 'rocket-fireworks',

                                        onClick: [
                                          {
                                            type: 'request',
                                            data: {
                                              action: 'reflect',
                                              reflectedData: patchFactory([
                                                {
                                                  operation: 'write',
                                                  targetSfId: 'overlay-effects-0',
                                                  path: 'props.effect',
                                                  value: 'rocket-fireworks',
                                                },
                                              ]),
                                            },
                                          },
                                        ],
                                      }),
                                    ],
                                  }),
                                  flexboxItemFactory({
                                    componentChildren: [
                                      buttonFactory({
                                        fullWidth: false,
                                        text: 'vacation-vibes',

                                        onClick: [
                                          {
                                            type: 'request',
                                            data: {
                                              action: 'reflect',
                                              reflectedData: patchFactory([
                                                {
                                                  operation: 'write',
                                                  targetSfId: 'overlay-effects-0',
                                                  path: 'props.effect',
                                                  value: 'vacation-vibes',
                                                },
                                              ]),
                                            },
                                          },
                                        ],
                                      }),
                                    ],
                                  }),
                                  flexboxItemFactory({
                                    componentChildren: [
                                      buttonFactory({
                                        fullWidth: false,
                                        size: 'medium',
                                        variant: 'ghost',
                                        text: 'duration-patch-test',
                                        onClick: [
                                          {
                                            type: 'request',
                                            data: {
                                              action: 'reflect',
                                              reflectedData: patchFactory([
                                                {
                                                  operation: 'write',
                                                  targetSfId: 'overlay-effects-0',
                                                  path: 'props.duration',
                                                  value: 1000,
                                                },
                                              ]),
                                            },
                                          },
                                        ],
                                      }),
                                    ],
                                  }),
                                  flexboxItemFactory({
                                    componentChildren: [
                                      buttonFactory({
                                        fullWidth: false,
                                        size: 'medium',
                                        variant: 'ghost',
                                        text: 'show-patch-test: false',
                                        onClick: [
                                          {
                                            type: 'request',
                                            data: {
                                              action: 'reflect',
                                              reflectedData: patchFactory([
                                                {
                                                  operation: 'write',
                                                  targetSfId: 'overlay-effects-0',
                                                  path: 'props.show',
                                                  value: false,
                                                },
                                              ]),
                                            },
                                          },
                                        ],
                                      }),
                                    ],
                                  }),
                                  flexboxItemFactory({
                                    componentChildren: [
                                      buttonFactory({
                                        fullWidth: false,
                                        size: 'medium',
                                        variant: 'ghost',
                                        text: 'show-patch-test: true',
                                        onClick: [
                                          {
                                            type: 'request',
                                            data: {
                                              action: 'reflect',
                                              reflectedData: patchFactory([
                                                {
                                                  operation: 'write',
                                                  targetSfId: 'overlay-effects-0',
                                                  path: 'props.show',
                                                  value: true,
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
      },
      'page-0',
    ),
  ],
});
