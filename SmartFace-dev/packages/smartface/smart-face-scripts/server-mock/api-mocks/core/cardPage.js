// @ts-check

import { fontAwesomeIconFactory } from '#shared/smartFaceComponentFactories/core/fontAwesomeIconFactory';

import { badgeFactory } from '../../../../shared/smartFaceComponentFactories/core/badgeFactory.js';
import { buttonFactory } from '../../../../shared/smartFaceComponentFactories/core/buttonFactory.js';
import { cardFactory } from '../../../../shared/smartFaceComponentFactories/core/cardFactory.js';
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import {
  flexboxFactory,
  flexboxItemFactory,
} from '../../../../shared/smartFaceComponentFactories/core/flexboxFactory.js';
import { gridFactory, gridItemFactory } from '../../../../shared/smartFaceComponentFactories/core/gridFactory.js';
import { iconButtonFactory } from '../../../../shared/smartFaceComponentFactories/core/iconButtonFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { textFactory } from '../../../../shared/smartFaceComponentFactories/core/textFactory.js';
import { sidebar } from '../shared/sidebar.js';
import times from 'lodash/times.js';

/**
 * @type { import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType }
 */
export const cardPage = smartFaceFactory({
  sfComponents: [
    pageFactory({
      document: { head: { title: 'Card Page' } },
      componentChildren: [
        classicLayoutFactory({
          sidebar: sidebar('card-page', ['component-pages']),
          content: {
            componentChildren: [
              gridFactory({
                items: [
                  gridItemFactory({
                    size: 12,
                    componentChildren: [
                      gridFactory({
                        items: [
                          gridItemFactory({
                            size: 6,
                            componentChildren: [
                              cardFactory({
                                title: 'Card',
                                icon: fontAwesomeIconFactory({ name: 'snowman', variant: 'duotone' }),
                                bodyChildren: [textFactory({ text: 'Lorem ipsum' })],
                              }),
                            ],
                          }),
                          gridItemFactory({
                            size: 6,
                            componentChildren: [
                              cardFactory({
                                title: 'Buzzer Reihenfolge',
                                toolbarChildren: [
                                  flexboxFactory({
                                    gap: 'small',
                                    items: [
                                      flexboxItemFactory({
                                        componentChildren: [
                                          iconButtonFactory({
                                            color: 'danger',
                                            size: 'extraSmall',
                                            icon: fontAwesomeIconFactory({ name: 'lock' }),
                                          }),
                                        ],
                                      }),
                                      flexboxItemFactory({
                                        componentChildren: [
                                          iconButtonFactory({
                                            size: 'extraSmall',
                                            icon: fontAwesomeIconFactory({ name: 'rotate-left' }),
                                          }),
                                        ],
                                      }),
                                      flexboxItemFactory({
                                        componentChildren: [
                                          iconButtonFactory({
                                            size: 'extraSmall',
                                            icon: fontAwesomeIconFactory({ name: 'music' }),
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                ],
                                bodyChildren: [textFactory({ text: 'Card with a fancy animated Badge in Toolbar' })],
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  gridItemFactory({
                    size: 12,
                    componentChildren: [
                      gridFactory({
                        items: [
                          gridItemFactory({
                            size: 6,
                            componentChildren: [
                              cardFactory({
                                title: 'Card with Footer',
                                bodyChildren: [textFactory({ text: "I'm not lenny face, I'm a legend" })],
                                footerChildren: [buttonFactory({ text: '( ͡° ͜ʖ ͡°)' })],
                              }),
                            ],
                          }),
                          gridItemFactory({
                            size: 6,
                            componentChildren: [
                              cardFactory({
                                title: 'Card',
                                subtitle: 'with subtitle',
                                toolbarChildren: [
                                  flexboxFactory({
                                    gap: 'small',
                                    items: times(3, () =>
                                      flexboxItemFactory({
                                        componentChildren: [
                                          badgeFactory({
                                            text: '1',
                                            animation: 'pulsing',
                                            color: 'danger',
                                            size: 'large',
                                          }),
                                        ],
                                      }),
                                    ),
                                  }),
                                ],
                                bodyChildren: [textFactory({ text: 'Lorem ipsum' })],
                                footerChildren: [buttonFactory({ text: "I'm a Button!" })],
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  gridItemFactory({
                    size: 12,
                    componentChildren: [
                      cardFactory({
                        title: 'Card with onClick',
                        bodyChildren: [textFactory({ text: 'Click on this card to open the Card Full Height Page' })],
                        footerChildren: [
                          buttonFactory({ text: 'Open Button Page', onClick: [{ type: 'redirect', url: 'button' }] }),
                        ],
                        onClick: [{ type: 'redirect', url: 'cardFullHeight' }],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          },
        }),
      ],
    }),
  ],
});
