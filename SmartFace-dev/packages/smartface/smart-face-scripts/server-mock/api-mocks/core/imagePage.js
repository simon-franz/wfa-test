// @ts-check

import {
  accordionFactory,
  accordionItemFactory,
} from '../../../../shared/smartFaceComponentFactories/core/accordionFactory.js';
import { buttonFactory } from '../../../../shared/smartFaceComponentFactories/core/buttonFactory.js';
import { cardFactory } from '../../../../shared/smartFaceComponentFactories/core/cardFactory.js';
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { gridFactory, gridItemFactory } from '../../../../shared/smartFaceComponentFactories/core/gridFactory.js';
import { imageFactory } from '../../../../shared/smartFaceComponentFactories/core/imageFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { footer } from '../shared/footer.js';
import { sidebar } from '../shared/sidebar.js';

/**
 * @type { import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType }
 */
export const imagePage = smartFaceFactory({
  sfComponents: [
    pageFactory({
      document: { head: { title: 'Image Page' } },
      componentChildren: [
        classicLayoutFactory({
          sidebar: sidebar('image-page', ['component-pages']),
          content: {
            componentChildren: [
              gridFactory({
                items: [
                  gridItemFactory({
                    componentChildren: [
                      cardFactory({
                        title: 'Broken images',
                        bodyChildren: [
                          accordionFactory({
                            expandedItemSfIds: ['broken-images'],
                            items: [
                              accordionItemFactory({
                                title: 'Broken src with alt text',
                                componentChildren: [
                                  imageFactory(
                                    {
                                      src: 'tps://place.dog/400/400',
                                      alt: 'This is a very descriptive alt text',
                                      fullWidth: false,
                                    },
                                    'image-0',
                                    'data-guide-0',
                                  ),
                                ],
                              }),
                              accordionItemFactory({
                                title: 'Broken src with fallback text',
                                componentChildren: [
                                  imageFactory(
                                    {
                                      src: 'tps://place.dog/400/400',
                                      fullWidth: false,
                                    },
                                    'image-1',
                                    'data-guide-1',
                                  ),
                                ],
                              }),
                              accordionItemFactory({
                                title: 'Empty string src',
                                componentChildren: [
                                  imageFactory(
                                    {
                                      src: '',
                                      fullWidth: false,
                                    },
                                    'image-2',
                                    'data-guide-2',
                                  ),
                                ],
                              }),
                              accordionItemFactory({
                                title: 'src = undefined',
                                componentChildren: [
                                  imageFactory(
                                    {
                                      src: undefined,
                                      fullWidth: false,
                                    },
                                    'image-3',
                                    'data-guide-3',
                                  ),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                      cardFactory({
                        title: 'Image in Card Body',
                        bodyChildren: [
                          imageFactory(
                            {
                              src: 'https://place.dog/400/400',
                              fullWidth: false,
                              // fallbackConfig: {
                              //   fallbackSrc: 'https://place.dog/500/500',
                              //   numberOfRetries: '2',
                              //   retryInterval: -1000,
                              // },
                            },
                            'image',
                            'data-guide-test',
                          ),
                        ],
                        footerChildren: [
                          gridFactory({
                            items: [
                              gridItemFactory({
                                componentChildren: [
                                  gridFactory({
                                    items: [
                                      gridItemFactory({
                                        componentChildren: [
                                          buttonFactory({
                                            onClick: [
                                              {
                                                type: 'request',
                                                data: {
                                                  action: 'modifyImage',
                                                  path: 'props.src',
                                                  value: 'ttps://place.dog/500/500',
                                                  targetId: 'image',
                                                },
                                              },
                                            ],
                                            text: 'break src',
                                          }),
                                        ],
                                      }),
                                      gridItemFactory({
                                        componentChildren: [
                                          buttonFactory({
                                            onClick: [
                                              {
                                                type: 'request',
                                                data: {
                                                  action: 'modifyImage',
                                                  path: 'props.src',
                                                  value: 'https://place.dog/500/500',
                                                  targetId: 'image',
                                                },
                                              },
                                            ],
                                            text: 'fix src',
                                          }),
                                        ],
                                      }),
                                      gridItemFactory({
                                        componentChildren: [
                                          buttonFactory({
                                            onClick: [
                                              {
                                                type: 'request',
                                                data: {
                                                  action: 'modifyImage',
                                                  path: 'props.onClick',
                                                  value: [
                                                    {
                                                      type: 'request',
                                                      data: {
                                                        action: 'reflect',
                                                        reflectedData: {
                                                          sideEffects: [
                                                            {
                                                              type: 'addNotification',
                                                              id: 'notification-1',
                                                              message: 'onClick Funktioniert',
                                                              color: 'danger',
                                                            },
                                                          ],
                                                        },
                                                      },
                                                    },
                                                  ],
                                                  targetId: 'image',
                                                },
                                              },
                                            ],
                                            text: 'click-able',
                                          }),
                                        ],
                                      }),
                                      gridItemFactory({
                                        componentChildren: [
                                          buttonFactory({
                                            onClick: [
                                              {
                                                type: 'request',
                                                data: {
                                                  action: 'modifyImage',
                                                  path: 'props.corner',
                                                  value: 'square',
                                                  targetId: 'image',
                                                },
                                              },
                                            ],
                                            text: 'square',
                                          }),
                                        ],
                                      }),
                                      gridItemFactory({
                                        componentChildren: [
                                          buttonFactory({
                                            onClick: [
                                              {
                                                type: 'request',
                                                data: {
                                                  action: 'modifyImage',
                                                  path: 'props.corner',
                                                  value: 'rounded',
                                                  targetId: 'image',
                                                },
                                              },
                                            ],
                                            text: 'rounded',
                                          }),
                                        ],
                                      }),
                                      gridItemFactory({
                                        componentChildren: [
                                          buttonFactory({
                                            onClick: [
                                              {
                                                type: 'request',
                                                data: {
                                                  action: 'modifyImage',
                                                  path: 'props.corner',
                                                  value: 'circular',
                                                  targetId: 'image',
                                                },
                                              },
                                            ],
                                            text: 'circular',
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
                                    items: [
                                      gridItemFactory({
                                        componentChildren: [
                                          buttonFactory({
                                            onClick: [
                                              {
                                                type: 'request',
                                                data: {
                                                  action: 'modifyImage',
                                                  path: 'props.src',
                                                  value: 'https://placedog.net/400/400',
                                                  targetId: 'image',
                                                },
                                              },
                                            ],
                                            text: 'Image 1:1',
                                          }),
                                        ],
                                      }),
                                      gridItemFactory({
                                        componentChildren: [
                                          buttonFactory({
                                            onClick: [
                                              {
                                                type: 'request',
                                                data: {
                                                  action: 'modifyImage',
                                                  path: 'props.src',
                                                  value: 'https://placedog.net/480/270',
                                                  targetId: 'image',
                                                },
                                              },
                                            ],
                                            text: 'Image 16:9',
                                          }),
                                        ],
                                      }),
                                      gridItemFactory({
                                        componentChildren: [
                                          buttonFactory({
                                            onClick: [
                                              {
                                                type: 'request',
                                                data: {
                                                  action: 'modifyImage',
                                                  path: 'props.src',
                                                  value: 'https://placedog.net/270/480',
                                                  targetId: 'image',
                                                },
                                              },
                                            ],
                                            text: 'Image 9:16',
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
                                    items: [
                                      gridItemFactory({
                                        componentChildren: [
                                          buttonFactory({
                                            onClick: [
                                              {
                                                type: 'request',
                                                data: {
                                                  action: 'modifyImage',
                                                  path: 'props.aspectRatio',
                                                  value: '1 / 1',
                                                  targetId: 'image',
                                                },
                                              },
                                            ],
                                            text: 'aspectRatio 1:1',
                                          }),
                                        ],
                                      }),
                                      gridItemFactory({
                                        componentChildren: [
                                          buttonFactory({
                                            onClick: [
                                              {
                                                type: 'request',
                                                data: {
                                                  action: 'modifyImage',
                                                  path: 'props.aspectRatio',
                                                  value: '16 / 9',
                                                  targetId: 'image',
                                                },
                                              },
                                            ],
                                            text: 'aspectRatio 16:9',
                                          }),
                                        ],
                                      }),
                                      gridItemFactory({
                                        componentChildren: [
                                          buttonFactory({
                                            onClick: [
                                              {
                                                type: 'request',
                                                data: {
                                                  action: 'modifyImage',
                                                  path: 'props.aspectRatio',
                                                  value: '9 / 16',
                                                  targetId: 'image',
                                                },
                                              },
                                            ],
                                            text: 'aspectRatio 9:16',
                                          }),
                                        ],
                                      }),
                                      gridItemFactory({
                                        componentChildren: [
                                          buttonFactory({
                                            onClick: [
                                              {
                                                type: 'request',
                                                data: {
                                                  action: 'modifyImage',
                                                  path: 'props.aspectRatio',
                                                  value: '14 / 9',
                                                  targetId: 'image',
                                                },
                                              },
                                            ],
                                            text: 'aspectRatio 14:9',
                                          }),
                                        ],
                                      }),
                                      gridItemFactory({
                                        componentChildren: [
                                          buttonFactory({
                                            onClick: [
                                              {
                                                type: 'request',
                                                data: {
                                                  action: 'modifyImage',
                                                  path: 'props.aspectRatio',
                                                  value: '7 / 5',
                                                  targetId: 'image',
                                                },
                                              },
                                            ],
                                            text: 'aspectRatio 7:5',
                                          }),
                                        ],
                                      }),
                                      gridItemFactory({
                                        componentChildren: [
                                          buttonFactory({
                                            onClick: [
                                              {
                                                type: 'request',
                                                data: {
                                                  action: 'modifyImage',
                                                  path: 'props.aspectRatio',
                                                  value: '21 / 9',
                                                  targetId: 'image',
                                                },
                                              },
                                            ],
                                            text: 'aspectRatio 21:9',
                                          }),
                                        ],
                                      }),
                                      gridItemFactory({
                                        componentChildren: [
                                          buttonFactory({
                                            onClick: [
                                              {
                                                type: 'request',
                                                data: {
                                                  action: 'modifyImage',
                                                  path: 'props.aspectRatio',
                                                  value: '9 / 21',
                                                  targetId: 'image',
                                                },
                                              },
                                            ],
                                            text: 'aspectRatio 9:21',
                                          }),
                                        ],
                                      }),
                                      gridItemFactory({
                                        componentChildren: [
                                          buttonFactory({
                                            onClick: [
                                              {
                                                type: 'request',
                                                data: {
                                                  action: 'modifyImage',
                                                  path: 'props.aspectRatio',
                                                  value: '',
                                                  targetId: 'image',
                                                },
                                              },
                                            ],
                                            text: 'Reset aspectRatio',
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
                                    items: [
                                      gridItemFactory({
                                        componentChildren: [
                                          buttonFactory({
                                            onClick: [
                                              {
                                                type: 'request',
                                                data: {
                                                  action: 'modifyImage',
                                                  path: 'props.fullWidth',
                                                  value: true,
                                                  targetId: 'image',
                                                },
                                              },
                                            ],
                                            text: 'fullWidth-True',
                                          }),
                                        ],
                                      }),
                                      gridItemFactory({
                                        componentChildren: [
                                          buttonFactory({
                                            onClick: [
                                              {
                                                type: 'request',
                                                data: {
                                                  action: 'modifyImage',
                                                  path: 'props.fullWidth',
                                                  value: false,
                                                  targetId: 'image',
                                                },
                                              },
                                            ],
                                            text: 'fullWidth-False',
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
        }),
      ],
    }),
  ],
});
