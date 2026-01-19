// @ts-check
import {
  accordionFactory,
  accordionItemFactory,
} from '../../../../shared/smartFaceComponentFactories/core/accordionFactory.js';
import { buttonFactory } from '../../../../shared/smartFaceComponentFactories/core/buttonFactory.js';
import { cardFactory } from '../../../../shared/smartFaceComponentFactories/core/cardFactory.js';
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { formTextFactory } from '../../../../shared/smartFaceComponentFactories/core/formTextFactory.js';
import { gridFactory, gridItemFactory } from '../../../../shared/smartFaceComponentFactories/core/gridFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { afterEffectsMediaFactory } from '../../../../shared/smartFaceComponentFactories/extension/afterEffectsMediaFactory.js';
import { footer } from '../shared/footer.js';
import { patchFactory } from '../shared/patchFactory.js';
import { sidebar } from '../shared/sidebar.js';

/**
 * @type { import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType }
 */
export const afterEffectsMediaPage = smartFaceFactory({
  sfComponents: [
    pageFactory({
      document: { head: { title: 'After Effects Media Page' } },
      componentChildren: [
        classicLayoutFactory({
          sidebar: sidebar('after-effects-media-page', ['component-pages']),
          content: {
            componentChildren: [
              gridFactory({
                items: [
                  gridItemFactory({
                    componentChildren: [
                      cardFactory({
                        title: 'After Effects Media Controls',
                        bodyChildren: [
                          gridFactory({
                            items: [
                              gridItemFactory({
                                size: 4,
                                componentChildren: [
                                  buttonFactory({
                                    text: 'Default Lock Lottie',
                                    color: 'primary',
                                    onClick: [
                                      {
                                        type: 'request',
                                        data: {
                                          action: 'reflect',
                                          reflectedData: patchFactory([
                                            {
                                              targetSfId: 'dynamic-after-effects-media',
                                              operation: 'write',
                                              path: 'props.url',
                                              value: 'https://d9yw7530xbzu.cloudfront.net/assets/lock+animation.json',
                                            },
                                          ]),
                                        },
                                      },
                                    ],
                                  }),
                                  formTextFactory(
                                    { label: '', value: 'Loads the default lock animation Lottie file.' },
                                    undefined,
                                    'data-guide-default-lock-lottie',
                                  ),
                                ],
                              }),
                              gridItemFactory({
                                size: 4,
                                componentChildren: [
                                  buttonFactory({
                                    text: 'Simple Loading Lottie',
                                    color: 'primary',
                                    onClick: [
                                      {
                                        type: 'request',
                                        data: {
                                          action: 'reflect',
                                          reflectedData: patchFactory([
                                            {
                                              targetSfId: 'dynamic-after-effects-media',
                                              operation: 'write',
                                              path: 'props.url',
                                              value: 'https://assets3.lottiefiles.com/packages/lf20_b88nh30c.json',
                                            },
                                          ]),
                                        },
                                      },
                                    ],
                                  }),
                                  formTextFactory(
                                    { label: '', value: 'Loads a simple loading animation Lottie file.' },
                                    undefined,
                                    'data-guide-simple-loading-lottie',
                                  ),
                                ],
                              }),
                              gridItemFactory({
                                size: 4,
                                componentChildren: [
                                  buttonFactory({
                                    text: 'Complex Lottie',
                                    color: 'primary',
                                    onClick: [
                                      {
                                        type: 'request',
                                        data: {
                                          action: 'reflect',
                                          reflectedData: patchFactory([
                                            {
                                              targetSfId: 'dynamic-after-effects-media',
                                              operation: 'write',
                                              path: 'props.url',
                                              value: 'https://assets2.lottiefiles.com/packages/lf20_GxMZME.json',
                                            },
                                          ]),
                                        },
                                      },
                                    ],
                                  }),
                                  formTextFactory(
                                    { label: '', value: 'Loads a more complex Lottie animation.' },
                                    undefined,
                                    'data-guide-complex-lottie',
                                  ),
                                ],
                              }),
                              gridItemFactory({
                                size: 4,
                                componentChildren: [
                                  buttonFactory({
                                    text: 'Break URL',
                                    color: 'danger',
                                    onClick: [
                                      {
                                        type: 'request',
                                        data: {
                                          action: 'reflect',
                                          reflectedData: patchFactory([
                                            {
                                              targetSfId: 'dynamic-after-effects-media',
                                              operation: 'write',
                                              path: 'props.url',
                                              value: 'https://assets2.lottiefisles.com/packages/lf20_GxMZME.json',
                                            },
                                          ]),
                                        },
                                      },
                                    ],
                                  }),
                                  formTextFactory(
                                    {
                                      label: '',
                                      value: 'Attempts to load a Lottie file from an invalid URL.',
                                    },
                                    undefined,
                                    'data-guide-break-url',
                                  ),
                                ],
                              }),
                              gridItemFactory({
                                size: 4,
                                componentChildren: [
                                  buttonFactory({
                                    text: 'Buggy Lottie',
                                    color: 'warning',
                                    onClick: [
                                      {
                                        type: 'request',
                                        data: {
                                          action: 'reflect',
                                          reflectedData: patchFactory([
                                            {
                                              targetSfId: 'dynamic-after-effects-media',
                                              operation: 'write',
                                              path: 'props.url',
                                              value: 'https://d9yw7530xbzu.cloudfront.net/assets/present-yey.json',
                                            },
                                          ]),
                                        },
                                      },
                                    ],
                                  }),
                                  formTextFactory(
                                    {
                                      label: 'Buggy!',
                                      value:
                                        'This Lottie will only work IF the previous URL was not broken! Otherwise it be will be stuck on Frame 1',
                                    },
                                    undefined,
                                    'data-guide-buggy-long-lottie',
                                  ),
                                ],
                              }),
                              gridItemFactory({
                                size: 4,
                                componentChildren: [
                                  afterEffectsMediaFactory(
                                    {
                                      url: 'https://d9yw7530xbzu.cloudfront.net/assets/lock+animation.json',
                                      alt: 'Standard Lottie Animation',
                                    },
                                    'dynamic-after-effects-media',
                                    'data-guide-after-effects-media-0',
                                  ),
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
                      cardFactory({
                        title: 'Broken After Effects Media',
                        bodyChildren: [
                          accordionFactory({
                            expandedItemSfIds: ['broken-after-effects'],
                            items: [
                              accordionItemFactory({
                                title: 'Broken url with alt text',
                                componentChildren: [
                                  afterEffectsMediaFactory(
                                    {
                                      url: 'ttps://d9yw7530xbzu.cloudfront.net/assets/lock+animation.json',
                                      alt: 'Creative alt text',
                                      loopStartFrame: 40,
                                      loopEndFrame: 70,
                                    },
                                    'ae-test',
                                    'data-guide-after-effects-media-1',
                                  ),
                                ],
                              }),
                              accordionItemFactory({
                                title: 'Empty string url',
                                componentChildren: [
                                  afterEffectsMediaFactory(
                                    {
                                      url: '',
                                      loopStartFrame: 40,
                                      loopEndFrame: 70,
                                    },
                                    'ae-test',
                                    'data-guide-after-effects-media-2',
                                  ),
                                ],
                              }),
                              accordionItemFactory({
                                title: 'url = null',
                                componentChildren: [
                                  afterEffectsMediaFactory(
                                    {
                                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                      // @ts-expect-error
                                      url: null,
                                      loopStartFrame: 40,
                                      loopEndFrame: 70,
                                    },
                                    'ae-test',
                                    'data-guide-after-effects-media-3',
                                  ),
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
        }),
      ],
    }),
  ],
});
