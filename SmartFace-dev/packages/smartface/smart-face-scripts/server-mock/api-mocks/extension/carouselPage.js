// @ts-check

import { badgeFactory } from '#shared/smartFaceComponentFactories/core/badgeFactory';
import { buttonFactory } from '#shared/smartFaceComponentFactories/core/buttonFactory';
import { cardFactory } from '#shared/smartFaceComponentFactories/core/cardFactory';
import { dateFieldFactory } from '#shared/smartFaceComponentFactories/core/dateFieldFactory';
import {
  dropdownMenuEntryFactory,
  dropdownMenuFactory,
  dropdownMenuSectionFactory,
} from '#shared/smartFaceComponentFactories/core/dropdownMenuFactory';
import { gridFactory, gridItemFactory } from '#shared/smartFaceComponentFactories/core/gridFactory';
import { imageFactory } from '#shared/smartFaceComponentFactories/core/imageFactory';
import { textFactory } from '#shared/smartFaceComponentFactories/core/textFactory';
import { tooltipFactory } from '#shared/smartFaceComponentFactories/core/tooltipFactory';

import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import {
  carouselFactory,
  carouselItemFactory,
} from '../../../../shared/smartFaceComponentFactories/extension/carouselFactory.js';
import { footer } from '../shared/footer.js';
import { patchFactory } from '../shared/patchFactory.js';
import { sidebar } from '../shared/sidebar.js';

/**
 * @type { import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType }
 */
export const carouselPage = smartFaceFactory({
  sfComponents: [
    pageFactory({
      document: { head: { title: 'Carousel Page' } },
      componentChildren: [
        classicLayoutFactory({
          sidebar: sidebar('component-page', ['sidebarParent']),
          content: {
            componentChildren: [
              gridFactory({
                items: [
                  gridItemFactory({
                    size: 12,
                    componentChildren: [
                      cardFactory({
                        title: 'Image Carousel 1 - NOT LOOPABLE',
                        bodyChildren: [
                          carouselFactory(
                            {
                              slidesToShow: { xs: 1, sm: 2, lg: 5 },
                              showArrows: true,
                              items: [
                                carouselItemFactory({
                                  componentChildren: [
                                    imageFactory({
                                      src: 'https://picsum.photos/800/400?random=1',
                                      alt: 'Slide Image 1',
                                    }),
                                  ],
                                }),
                                carouselItemFactory({
                                  componentChildren: [
                                    imageFactory({
                                      src: 'https://picsum.photos/600/200?random=2',
                                      alt: 'Slide Image 2',
                                    }),
                                  ],
                                }),
                                carouselItemFactory({
                                  componentChildren: [
                                    imageFactory({
                                      src: 'https://picsum.photos/400/400?random=3',
                                      alt: 'Slide Image 3',
                                    }),
                                  ],
                                }),
                                carouselItemFactory({
                                  componentChildren: [
                                    imageFactory({
                                      src: 'https://picsum.photos/800/400?random=4',
                                      alt: 'Slide Image 4',
                                    }),
                                  ],
                                }),
                                carouselItemFactory({
                                  componentChildren: [
                                    imageFactory({
                                      src: 'https://picsum.photos/800/400?random=5',
                                      alt: 'Slide Image 5',
                                    }),
                                  ],
                                }),
                                carouselItemFactory({
                                  componentChildren: [
                                    imageFactory({
                                      src: 'https://picsum.photos/800/400?random=6',
                                      alt: 'Slide Image 6',
                                    }),
                                  ],
                                }),
                                carouselItemFactory({
                                  componentChildren: [
                                    imageFactory({
                                      src: 'https://picsum.photos/800/400?random=7',
                                      alt: 'Slide Image 7',
                                    }),
                                  ],
                                }),
                              ],
                            },
                            'carousel1',
                          ),
                        ],
                        footerChildren: [
                          gridFactory({
                            columnGap: 'extraSmall',
                            rowGap: 'extraSmall',
                            items: [
                              gridItemFactory({
                                componentChildren: [
                                  buttonFactory({
                                    text: 'Change slidesToShow to responsive',
                                    onClick: [
                                      {
                                        type: 'request',
                                        data: {
                                          action: 'reflect',
                                          reflectedData: patchFactory([
                                            {
                                              targetSfId: 'carousel1',
                                              operation: 'write',
                                              path: 'props.slidesToShow',
                                              value: { xs: 1, sm: 2, lg: 5 },
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
                                    text: 'Change Slides Per View to 3 on Desktop',
                                    onClick: [
                                      {
                                        type: 'request',
                                        data: {
                                          action: 'reflect',
                                          reflectedData: patchFactory([
                                            {
                                              targetSfId: 'carousel1',
                                              operation: 'write',
                                              path: 'props.slidesToShow',
                                              value: 3,
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
                                    text: 'Change Slides Per View to 2 on Desktop',
                                    onClick: [
                                      {
                                        type: 'request',
                                        data: {
                                          action: 'reflect',
                                          reflectedData: patchFactory([
                                            {
                                              targetSfId: 'carousel1',
                                              operation: 'write',
                                              path: 'props.slidesToShow',
                                              value: 2,
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
                                    text: 'Change Slides Per View to 5 on Desktop',
                                    onClick: [
                                      {
                                        type: 'request',
                                        data: {
                                          action: 'reflect',
                                          reflectedData: patchFactory([
                                            {
                                              targetSfId: 'carousel1',
                                              operation: 'write',
                                              path: 'props.slidesToShow',
                                              value: 5,
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
                  }),
                  gridItemFactory({
                    size: 12,
                    componentChildren: [
                      cardFactory({
                        title: 'Image Carousel 2 with autoplay',
                        bodyChildren: [
                          carouselFactory(
                            {
                              autoplay: 'medium',
                              slidesToShow: 2,
                              showArrows: true,
                              items: [
                                carouselItemFactory({
                                  componentChildren: [
                                    imageFactory({
                                      src: 'https://picsum.photos/800/400?random=9',
                                      alt: 'Slide Image 9',
                                    }),
                                  ],
                                }),
                                carouselItemFactory({
                                  componentChildren: [
                                    imageFactory({
                                      src: 'https://picsum.photos/1200/400?random=10',
                                      alt: 'Slide Image 10',
                                    }),
                                  ],
                                }),
                                carouselItemFactory({
                                  componentChildren: [
                                    imageFactory({
                                      src: 'https://picsum.photos/800/400?random=11',
                                      alt: 'Slide Image 11',
                                    }),
                                  ],
                                }),
                                carouselItemFactory({
                                  componentChildren: [
                                    imageFactory({
                                      src: 'https://picsum.photos/1200/1200?random=12',
                                      alt: 'Slide Image 12',
                                    }),
                                  ],
                                }),
                              ],
                            },
                            'carousel2',
                          ),
                        ],
                        footerChildren: [
                          gridFactory({
                            columnGap: 'extraSmall',
                            rowGap: 'extraSmall',
                            items: [
                              gridItemFactory({
                                componentChildren: [
                                  buttonFactory({
                                    text: 'Toggle Pagination to true',
                                    onClick: [
                                      {
                                        type: 'request',
                                        data: {
                                          action: 'reflect',
                                          reflectedData: patchFactory([
                                            {
                                              targetSfId: 'carousel2',
                                              operation: 'write',
                                              path: 'props.showPagination',
                                              value: true,
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
                                    text: 'Toggle Pagination to false',
                                    onClick: [
                                      {
                                        type: 'request',
                                        data: {
                                          action: 'reflect',
                                          reflectedData: patchFactory([
                                            {
                                              targetSfId: 'carousel2',
                                              operation: 'write',
                                              path: 'props.showPagination',
                                              value: false,
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
                                    text: 'Set autoplay to none',
                                    onClick: [
                                      {
                                        type: 'request',
                                        data: {
                                          action: 'reflect',
                                          reflectedData: patchFactory([
                                            {
                                              targetSfId: 'carousel2',
                                              operation: 'write',
                                              path: 'props.autoplay',
                                              value: 'none',
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
                                    text: 'Set autoplay to slow',
                                    onClick: [
                                      {
                                        type: 'request',
                                        data: {
                                          action: 'reflect',
                                          reflectedData: patchFactory([
                                            {
                                              targetSfId: 'carousel2',
                                              operation: 'write',
                                              path: 'props.autoplay',
                                              value: 'slow',
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
                                    text: 'Set autoplay to medium',
                                    onClick: [
                                      {
                                        type: 'request',
                                        data: {
                                          action: 'reflect',
                                          reflectedData: patchFactory([
                                            {
                                              targetSfId: 'carousel2',
                                              operation: 'write',
                                              path: 'props.autoplay',
                                              value: 'medium',
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
                                    text: 'Set autoplay to fast',
                                    onClick: [
                                      {
                                        type: 'request',
                                        data: {
                                          action: 'reflect',
                                          reflectedData: patchFactory([
                                            {
                                              targetSfId: 'carousel2',
                                              operation: 'write',
                                              path: 'props.autoplay',
                                              value: 'fast',
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
                                    text: 'Toggle navigation Arrows to false',
                                    onClick: [
                                      {
                                        type: 'request',
                                        data: {
                                          action: 'reflect',
                                          reflectedData: patchFactory([
                                            {
                                              targetSfId: 'carousel2',
                                              operation: 'write',
                                              path: 'props.showArrows',
                                              value: false,
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
                                    text: 'Toggle navigation Arrows to true',
                                    onClick: [
                                      {
                                        type: 'request',
                                        data: {
                                          action: 'reflect',
                                          reflectedData: patchFactory([
                                            {
                                              targetSfId: 'carousel2',
                                              operation: 'write',
                                              path: 'props.showArrows',
                                              value: true,
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
                                    text: 'Toggle Loop to false',
                                    onClick: [
                                      {
                                        type: 'request',
                                        data: {
                                          action: 'reflect',
                                          reflectedData: patchFactory([
                                            {
                                              targetSfId: 'carousel2',
                                              operation: 'write',
                                              path: 'props.loop',
                                              value: false,
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
                                    text: 'Toggle Loop to true',
                                    onClick: [
                                      {
                                        type: 'request',
                                        data: {
                                          action: 'reflect',
                                          reflectedData: patchFactory([
                                            {
                                              targetSfId: 'carousel2',
                                              operation: 'write',
                                              path: 'props.loop',
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
                  }),
                  gridItemFactory({
                    size: 12,
                    componentChildren: [
                      cardFactory({
                        title: 'Diverse Carousel',
                        bodyChildren: [
                          carouselFactory(
                            {
                              autoplay: 'none',
                              slidesToShow: 2,
                              loop: true,
                              showArrows: true,
                              items: [
                                carouselItemFactory({
                                  componentChildren: [
                                    gridFactory({
                                      items: [
                                        gridItemFactory({
                                          componentChildren: [
                                            tooltipFactory({
                                              text: 'Tooltip 1',
                                              componentChildren: [badgeFactory({ text: 'Hover me' })],
                                            }),
                                          ],
                                        }),
                                        gridItemFactory({
                                          componentChildren: [
                                            tooltipFactory({
                                              text: 'Tooltip 2',
                                              componentChildren: [textFactory({ text: 'Another tooltip' })],
                                            }),
                                          ],
                                        }),
                                        gridItemFactory({
                                          componentChildren: [
                                            tooltipFactory({
                                              text: 'Tooltip 3',
                                              componentChildren: [buttonFactory({ text: 'Button with tooltip' })],
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                carouselItemFactory({
                                  componentChildren: [
                                    dateFieldFactory({
                                      label: 'Select a date',
                                      name: 'carousel-date-field',
                                      format: 'DDMMYYYY',
                                    }),
                                  ],
                                }),
                                carouselItemFactory({
                                  componentChildren: [
                                    dropdownMenuFactory({
                                      trigger: buttonFactory({ text: 'Open Dropdown' }),
                                      componentParts: [
                                        dropdownMenuSectionFactory({
                                          componentParts: [
                                            dropdownMenuEntryFactory({ text: 'Option 1' }),
                                            dropdownMenuEntryFactory({ text: 'Option 2' }),
                                            dropdownMenuEntryFactory({ text: 'Option 3' }),
                                          ],
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            },
                            'diverse-carousel',
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
    }),
  ],
});
