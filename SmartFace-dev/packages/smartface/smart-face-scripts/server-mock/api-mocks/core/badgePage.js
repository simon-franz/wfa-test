// @ts-check

import {
  accordionFactory,
  accordionItemFactory,
} from '../../../../shared/smartFaceComponentFactories/core/accordionFactory.js';
import { badgeFactory } from '../../../../shared/smartFaceComponentFactories/core/badgeFactory.js';
import { buttonFactory } from '../../../../shared/smartFaceComponentFactories/core/buttonFactory.js';
import { cardFactory } from '../../../../shared/smartFaceComponentFactories/core/cardFactory.js';
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { gridFactory, gridItemFactory } from '../../../../shared/smartFaceComponentFactories/core/gridFactory.js';
import { iconButtonFactory } from '../../../../shared/smartFaceComponentFactories/core/iconButtonFactory.js';
import { imageFactory } from '../../../../shared/smartFaceComponentFactories/core/imageFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { profileMenuFactory } from '../../../../shared/smartFaceComponentFactories/extension/profileMenuFactory.js';
import { generateLoremSentences } from '../../../../src/main/lib/stringGenerator/stringGenerator.js';
import { footer } from '../shared/footer.js';
import { sidebar } from '../shared/sidebar.js';

const colors = ['primary', 'secondary', 'info', 'warning', 'success', 'danger'];
const corners = ['square', 'rounded', 'pill'];
const sizes = ['extraSmall', 'small', 'medium', 'large', 'extraLarge'];

const generateBadges = (variantType = 'filled', isDot = false) => {
  let generatedBadges = [];
  let badgesRow = [];
  corners.forEach((corner) => {
    colors.forEach((color) => {
      badgesRow.push(
        gridItemFactory({
          size: 2,
          componentChildren: [
            badgeFactory(
              {
                variant: variantType,
                corner: corner,
                text: corner + ' ' + color,
                dot: isDot,
                color: color,
              },
              undefined,
              'data-guide-test',
            ),
          ],
        }),
      );
    });
    generatedBadges.push(gridItemFactory({ componentChildren: [gridFactory({ items: [...badgesRow] })] }));
    badgesRow = [];
  });

  return generatedBadges;
};

const generateBadgeSizes = (variantType = 'filled') => {
  let generatedBadges = [];
  let badgesRow = [];
  for (let index = 0; index < 3; index++) {
    sizes.forEach((size) => {
      switch (index) {
        case 0: {
          badgesRow.push(
            gridItemFactory({
              size: 2,
              componentChildren: [badgeFactory({ variant: variantType, size: size, text: size })],
            }),
          );
          break;
        }
        case 1: {
          badgesRow.push(
            gridItemFactory({
              size: 2,
              componentChildren: [
                badgeFactory({
                  variant: variantType,
                  text: '123',
                  anchor: buttonFactory({ text: size, size }),
                }),
              ],
            }),
          );
          break;
        }
        case 2: {
          badgesRow.push(
            gridItemFactory({
              size: 2,
              componentChildren: [
                badgeFactory({
                  variant: variantType,
                  text: '123',
                  dot: true,
                  anchor: buttonFactory({ text: size, size }),
                }),
              ],
            }),
          );
          break;
        }
      }
    });

    generatedBadges.push(
      gridItemFactory({
        componentChildren: [gridFactory({ items: [...badgesRow] })],
      }),
    );
    badgesRow = [];
  }

  return generatedBadges;
};

const generateBadgeWithChildren = (variantType = 'filled', isDot = false) => {
  const textBadge = ['1', '9999', 'Ein Laaanger text'];
  const textButton = ['Child with short text', '9999', 'Child with looong text'];
  let badges = [];

  for (const [i, element] of textBadge.entries()) {
    badges.push(
      gridItemFactory({
        size: 1,
        componentChildren: [
          badgeFactory({
            variant: variantType,
            dot: isDot,
            text: element,
            anchor: buttonFactory({ text: textButton[i] }),
          }),
        ],
      }),
      gridItemFactory({
        size: 1,
        componentChildren: [
          badgeFactory({
            variant: variantType,
            dot: isDot,
            text: element,
            anchor: iconButtonFactory(),
          }),
        ],
      }),
    );
  }
  badges.push(
    gridItemFactory({
      size: 1,
      componentChildren: [
        badgeFactory({
          variant: variantType,
          dot: isDot,
          color: 'danger',
          text: '3',
          anchor: profileMenuFactory({ portrait: imageFactory().props }),
        }),
      ],
    }),
  );

  return badges;
};

const generateAnimatedBadges = (variantType = 'filled', isDot = false, anchor = false) => {
  const animations = ['pulsing', 'breathing', 'flashing', 'jumping'];
  let generatedBadges = [];
  let badgesRow = [];
  animations.forEach((animation) => {
    badgesRow.push(
      gridItemFactory({
        size: 3,
        componentChildren: [
          badgeFactory({
            variant: variantType,
            size: 'medium',
            text: anchor ? '1' : animation,
            dot: isDot,
            animation,
            anchor: anchor ? buttonFactory({ text: animation }) : undefined,
          }),
        ],
      }),
    );
  });

  generatedBadges.push(gridItemFactory({ componentChildren: [gridFactory({ items: [...badgesRow] })] }));

  return generatedBadges;
};

/**
 * @type { import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType }
 */
export const badgePage = smartFaceFactory({
  sfComponents: [
    pageFactory({
      document: { head: { title: 'Badge Page' } },
      componentChildren: [
        classicLayoutFactory({
          sidebar: sidebar('badge-page', ['component-pages']),
          content: {
            componentChildren: [
              gridFactory({
                items: [
                  gridItemFactory({
                    componentChildren: [
                      accordionFactory({
                        expandedItemSfIds: ['a1'],
                        items: [
                          accordionItemFactory(
                            {
                              icon: undefined,
                              title: 'Colors, Corners & Variants',
                              componentChildren: [
                                gridFactory({
                                  items: [
                                    ...generateBadges(),
                                    ...generateBadges('outlined'),
                                    gridItemFactory({
                                      componentChildren: [
                                        gridFactory({
                                          items: [
                                            gridItemFactory({
                                              componentChildren: [
                                                accordionFactory({
                                                  items: [
                                                    accordionItemFactory(
                                                      {
                                                        icon: undefined,
                                                        title: 'Badge as Dot',
                                                        componentChildren: [
                                                          gridFactory({
                                                            items: [
                                                              ...generateBadges('filled', true),
                                                              ...generateBadges('outlined', true),
                                                            ],
                                                          }),
                                                        ],
                                                      },
                                                      'a1',
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
                            'a1',
                          ),
                        ],
                      }),
                    ],
                  }),
                  gridItemFactory({
                    componentChildren: [
                      accordionFactory({
                        items: [
                          accordionItemFactory({
                            icon: undefined,
                            title: 'Sizes & Sizes with Children',
                            componentChildren: [
                              gridFactory({
                                items: [
                                  ...generateBadgeSizes(),
                                  gridItemFactory({
                                    componentChildren: [
                                      gridFactory({
                                        items: [
                                          gridItemFactory({
                                            componentChildren: [
                                              accordionFactory({
                                                items: [
                                                  accordionItemFactory(
                                                    {
                                                      icon: undefined,
                                                      title: 'Outlined',
                                                      componentChildren: [
                                                        gridFactory({
                                                          items: [...generateBadgeSizes('outlined')],
                                                        }),
                                                      ],
                                                    },
                                                    'a1',
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
                          }),
                        ],
                      }),
                    ],
                  }),
                  gridItemFactory({
                    componentChildren: [
                      accordionFactory({
                        items: [
                          accordionItemFactory({
                            title: 'Overflow tests/Missing string',
                            icon: undefined,
                            componentChildren: [
                              gridFactory({
                                items: [
                                  gridItemFactory({
                                    componentChildren: [
                                      cardFactory({
                                        title: 'No children & no text',
                                        bodyChildren: [badgeFactory()],
                                      }),
                                    ],
                                  }),
                                  gridItemFactory({
                                    size: 6,
                                    componentChildren: [
                                      cardFactory({
                                        title: 'Overflowing Badge in Card Body',
                                        bodyChildren: [badgeFactory({ text: generateLoremSentences(2) })],
                                      }),
                                    ],
                                  }),
                                  gridItemFactory({
                                    size: 6,
                                    componentChildren: [
                                      cardFactory({
                                        title: 'Overflowing Badge in Grid',
                                        bodyChildren: [
                                          gridFactory({
                                            items: [
                                              gridItemFactory({
                                                size: 6,
                                                componentChildren: [badgeFactory({ text: generateLoremSentences(2) })],
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                  gridItemFactory({
                                    size: 6,
                                    componentChildren: [
                                      cardFactory({
                                        title: 'Overflowing Badge (single word) in Card Body',
                                        bodyChildren: [
                                          // eslint-disable-next-line unicorn/prefer-string-replace-all
                                          badgeFactory({ text: generateLoremSentences(3).replace(/ /g, '') }),
                                        ],
                                      }),
                                    ],
                                  }),
                                  gridItemFactory({
                                    size: 6,
                                    componentChildren: [
                                      cardFactory({
                                        title: 'Overflowing Badge (single word) in Grid',
                                        bodyChildren: [
                                          gridFactory({
                                            items: [
                                              gridItemFactory({
                                                size: 6,
                                                componentChildren: [
                                                  // eslint-disable-next-line unicorn/prefer-string-replace-all
                                                  badgeFactory({ text: generateLoremSentences(3).replace(/ /g, '') }),
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
                  gridItemFactory({
                    componentChildren: [
                      accordionFactory({
                        items: [
                          accordionItemFactory({
                            icon: undefined,
                            title: 'Badge with Children',
                            componentChildren: [
                              gridFactory({
                                items: [
                                  gridItemFactory({
                                    size: 1,
                                    componentChildren: [
                                      badgeFactory({
                                        anchor: buttonFactory({ text: 'Child with no text set' }),
                                      }),
                                    ],
                                  }),
                                  ...generateBadgeWithChildren(),
                                  gridItemFactory({
                                    componentChildren: [
                                      gridFactory({
                                        items: [
                                          gridItemFactory({
                                            componentChildren: [
                                              accordionFactory({
                                                items: [
                                                  accordionItemFactory(
                                                    {
                                                      icon: undefined,
                                                      title: 'Outlined',
                                                      componentChildren: [
                                                        gridFactory({
                                                          items: [...generateBadgeWithChildren('outlined')],
                                                        }),
                                                      ],
                                                    },
                                                    'a1',
                                                  ),
                                                  accordionItemFactory(
                                                    {
                                                      icon: undefined,
                                                      title: 'Dot',
                                                      componentChildren: [
                                                        gridFactory({
                                                          items: [...generateBadgeWithChildren('filled', true)],
                                                        }),
                                                      ],
                                                    },
                                                    'a2',
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
                          }),
                        ],
                      }),
                    ],
                  }),
                  gridItemFactory({
                    componentChildren: [
                      accordionFactory({
                        items: [
                          accordionItemFactory({
                            icon: undefined,
                            title: 'Inline/fullWidth',
                            componentChildren: [
                              gridFactory({
                                items: [
                                  gridItemFactory({
                                    componentChildren: [
                                      badgeFactory({
                                        text: '1',
                                        anchor: buttonFactory({
                                          text: 'Full width button, badge set default (fullWidth)',
                                          fullWidth: true,
                                        }),
                                      }),
                                    ],
                                  }),
                                  gridItemFactory({
                                    componentChildren: [
                                      badgeFactory({
                                        text: '1',
                                        fullWidth: true,
                                        anchor: buttonFactory({
                                          text: 'Full width button, badge set fullWidth (fullWidth:true)',
                                          fullWidth: true,
                                        }),
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
                  gridItemFactory({
                    componentChildren: [
                      accordionFactory({
                        items: [
                          accordionItemFactory({
                            icon: undefined,
                            title: 'Animations',
                            componentChildren: [
                              gridFactory({
                                items: [
                                  ...generateAnimatedBadges(),
                                  ...generateAnimatedBadges('filled', false, true),
                                  gridItemFactory({
                                    componentChildren: [
                                      gridFactory({
                                        items: [
                                          gridItemFactory({
                                            componentChildren: [
                                              accordionFactory({
                                                items: [
                                                  accordionItemFactory(
                                                    {
                                                      icon: undefined,
                                                      title: 'Outlined',
                                                      componentChildren: [
                                                        gridFactory({
                                                          items: [
                                                            ...generateAnimatedBadges('outlined'),
                                                            ...generateAnimatedBadges('outlined', false, true),
                                                          ],
                                                        }),
                                                      ],
                                                    },
                                                    'a1',
                                                  ),
                                                  accordionItemFactory(
                                                    {
                                                      icon: undefined,
                                                      title: 'Dot',
                                                      componentChildren: [
                                                        gridFactory({
                                                          items: [
                                                            ...generateAnimatedBadges('filled', true),
                                                            ...generateAnimatedBadges('filled', true, true),
                                                          ],
                                                        }),
                                                      ],
                                                    },
                                                    'a2',
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
