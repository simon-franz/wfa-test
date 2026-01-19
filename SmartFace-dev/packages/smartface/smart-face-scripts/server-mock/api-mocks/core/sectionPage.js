// @ts-check

import {
  accordionFactory,
  accordionItemFactory,
} from '../../../../shared/smartFaceComponentFactories/core/accordionFactory.js';
import { badgeFactory } from '../../../../shared/smartFaceComponentFactories/core/badgeFactory.js';
import { buttonFactory } from '../../../../shared/smartFaceComponentFactories/core/buttonFactory.js';
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { fontAwesomeIconFactory } from '../../../../shared/smartFaceComponentFactories/core/fontAwesomeIconFactory.js';
import { gridFactory, gridItemFactory } from '../../../../shared/smartFaceComponentFactories/core/gridFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { sectionFactory } from '../../../../shared/smartFaceComponentFactories/core/sectionFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { textFactory } from '../../../../shared/smartFaceComponentFactories/core/textFactory.js';
import { textFieldFactory } from '../../../../shared/smartFaceComponentFactories/core/textFieldFactory.js';
import { tooltipFactory } from '../../../../shared/smartFaceComponentFactories/core/tooltipFactory.js';
import { sidebar } from '../shared/sidebar.js';

const sizes = ['extraSmall', 'small', 'medium', 'large', 'extraLarge'];
const alignmentsTitle = ['flex-start', 'center', 'flex-end'];

const generatedSizes = (divider, children, titleChildren, collapsible, alignTitle) => {
  let generated = [];
  sizes.forEach((size) => {
    if (alignTitle) {
      alignmentsTitle.forEach((alignmentTitle) => {
        generated.push(
          gridItemFactory({
            componentChildren: [
              sectionFactory(
                {
                  title: size,
                  titleChildren: titleChildren ? [...titleChildren] : undefined,
                  componentChildren: children ? [...children] : undefined,
                  divider: divider,
                  size: size,
                  collapsible: collapsible,
                  alignTitle: alignmentTitle,
                },
                undefined,
                'data-guide-test',
              ),
            ],
          }),
        );
      });
    } else {
      generated.push(
        gridItemFactory({
          componentChildren: [
            sectionFactory({
              title: size,
              titleChildren: titleChildren ? [...titleChildren] : undefined,
              componentChildren: children ? [...children] : undefined,
              divider: divider,
              size: size,
              collapsible: collapsible,
              alignTitle: alignTitle,
            }),
          ],
        }),
      );
    }
  });

  return generated;
};

/**
 * @type { import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType }
 */
export const sectionPage = smartFaceFactory({
  sfComponents: [
    pageFactory({
      componentChildren: [
        classicLayoutFactory({
          sidebar: sidebar('section-page', ['component-pages']),
          content: {
            componentChildren: [
              gridFactory({
                items: [
                  gridItemFactory({
                    componentChildren: [
                      accordionFactory({
                        items: [
                          accordionItemFactory({
                            title: 'Sizes, TitleChildren, Divider',
                            componentChildren: [
                              gridFactory({
                                items: [
                                  ...generatedSizes(false),
                                  ...generatedSizes(false, undefined, [
                                    tooltipFactory({
                                      componentChildren: [fontAwesomeIconFactory()],
                                      text: 'Your information could be displayed here',
                                    }),
                                  ]),
                                  ...generatedSizes(true, undefined, [
                                    tooltipFactory({
                                      componentChildren: [fontAwesomeIconFactory()],
                                      text: 'Your information could be displayed here',
                                    }),
                                  ]),
                                ],
                              }),
                            ],
                          }),
                          accordionItemFactory({
                            title: 'Sizes, Children, TitleChildren',
                            componentChildren: [
                              gridFactory({
                                items: [
                                  ...generatedSizes(
                                    false,
                                    [
                                      gridFactory({
                                        items: [
                                          gridItemFactory({
                                            size: 6,
                                            componentChildren: [textFieldFactory()],
                                          }),
                                          gridItemFactory({
                                            size: 6,
                                            componentChildren: [textFieldFactory()],
                                          }),
                                          gridItemFactory({
                                            size: 6,
                                            componentChildren: [textFieldFactory()],
                                          }),
                                          gridItemFactory({
                                            size: 6,
                                            componentChildren: [textFieldFactory()],
                                          }),
                                        ],
                                      }),
                                    ],
                                    [
                                      tooltipFactory({
                                        componentChildren: [fontAwesomeIconFactory()],
                                        text: 'Your information could be displayed here',
                                      }),
                                    ],
                                    true,
                                  ),
                                ],
                              }),
                            ],
                          }),
                          accordionItemFactory({
                            title: 'Sizes, Children, TitleChildren, Divider',
                            componentChildren: [
                              gridFactory({
                                items: [
                                  ...generatedSizes(
                                    true,
                                    [
                                      gridFactory({
                                        items: [
                                          gridItemFactory({
                                            size: 6,
                                            componentChildren: [textFieldFactory()],
                                          }),
                                          gridItemFactory({
                                            size: 6,
                                            componentChildren: [textFieldFactory()],
                                          }),
                                          gridItemFactory({
                                            size: 6,
                                            componentChildren: [textFieldFactory()],
                                          }),
                                          gridItemFactory({
                                            size: 6,
                                            componentChildren: [textFieldFactory()],
                                          }),
                                        ],
                                      }),
                                    ],
                                    [
                                      tooltipFactory({
                                        componentChildren: [fontAwesomeIconFactory()],
                                        text: 'Your information could be displayed here',
                                      }),
                                    ],
                                    true,
                                  ),
                                ],
                              }),
                            ],
                          }),
                          accordionItemFactory({
                            title: 'Sizes, Children, TitleChildren, Collapsible',
                            componentChildren: [
                              gridFactory({
                                items: [
                                  ...generatedSizes(
                                    false,
                                    [
                                      gridFactory({
                                        items: [
                                          gridItemFactory({
                                            size: 6,
                                            componentChildren: [textFieldFactory()],
                                          }),
                                          gridItemFactory({
                                            size: 6,
                                            componentChildren: [textFieldFactory()],
                                          }),
                                          gridItemFactory({
                                            size: 6,
                                            componentChildren: [textFieldFactory()],
                                          }),
                                          gridItemFactory({
                                            size: 6,
                                            componentChildren: [textFieldFactory()],
                                          }),
                                        ],
                                      }),
                                    ],
                                    [
                                      tooltipFactory({
                                        componentChildren: [fontAwesomeIconFactory()],
                                        text: 'Your information could be displayed here',
                                      }),
                                    ],
                                    true,
                                  ),
                                ],
                              }),
                            ],
                          }),
                          accordionItemFactory({
                            title: 'Sizes, Children, TitleChildren, Collapsible, Divider',
                            componentChildren: [
                              gridFactory({
                                items: [
                                  ...generatedSizes(
                                    true,
                                    [
                                      gridFactory({
                                        items: [
                                          gridItemFactory({
                                            size: 6,
                                            componentChildren: [textFieldFactory()],
                                          }),
                                          gridItemFactory({
                                            size: 6,
                                            componentChildren: [textFieldFactory()],
                                          }),
                                          gridItemFactory({
                                            size: 6,
                                            componentChildren: [textFieldFactory()],
                                          }),
                                          gridItemFactory({
                                            size: 6,
                                            componentChildren: [textFieldFactory()],
                                          }),
                                        ],
                                      }),
                                    ],
                                    [
                                      tooltipFactory({
                                        componentChildren: [fontAwesomeIconFactory()],
                                        text: 'Your information could be displayed here',
                                      }),
                                    ],
                                    true,
                                  ),
                                ],
                              }),
                            ],
                          }),
                          accordionItemFactory({
                            title: 'Sizes, Children, TitleChildren, Collapsible, Divider, Alignment',
                            componentChildren: [
                              gridFactory({
                                items: [
                                  ...generatedSizes(
                                    true,
                                    [
                                      gridFactory({
                                        items: [
                                          gridItemFactory({
                                            size: 6,
                                            componentChildren: [textFieldFactory()],
                                          }),
                                          gridItemFactory({
                                            size: 6,
                                            componentChildren: [textFieldFactory()],
                                          }),
                                          gridItemFactory({
                                            size: 6,
                                            componentChildren: [textFieldFactory()],
                                          }),
                                          gridItemFactory({
                                            size: 6,
                                            componentChildren: [textFieldFactory()],
                                          }),
                                        ],
                                      }),
                                    ],
                                    [
                                      tooltipFactory({
                                        componentChildren: [fontAwesomeIconFactory()],
                                        text: 'Your information could be displayed here',
                                      }),
                                    ],
                                    true,
                                    true,
                                  ),
                                ],
                              }),
                            ],
                          }),
                          accordionItemFactory({
                            title: 'Edge cases',
                            componentChildren: [
                              gridFactory({
                                items: [
                                  gridItemFactory({
                                    size: 3,
                                    componentChildren: [
                                      sectionFactory({
                                        title: 'I am a very long long long title and I may start breaking.',
                                        collapsible: true,
                                        titleChildren: [
                                          tooltipFactory({
                                            componentChildren: [fontAwesomeIconFactory()],
                                            text: 'Your information could be displayed here',
                                          }),
                                        ],
                                        componentChildren: [buttonFactory()],
                                      }),
                                    ],
                                  }),
                                  gridItemFactory({
                                    size: 9,
                                    componentChildren: [
                                      sectionFactory({
                                        title: 'You shouldnt try to do this but it works.',
                                        collapsible: true,
                                        size: 'extraSmall',
                                        titleChildren: [
                                          tooltipFactory({
                                            componentChildren: [buttonFactory({ size: 'extraLarge' })],
                                            text: 'Your information could be displayed here',
                                          }),
                                        ],
                                        componentChildren: [buttonFactory()],
                                      }),
                                    ],
                                  }),
                                  gridItemFactory({
                                    componentChildren: [
                                      sectionFactory({
                                        title: 'Multiple Icons',
                                        collapsible: true,
                                        size: 'extraSmall',
                                        titleChildren: [
                                          tooltipFactory({
                                            componentChildren: [fontAwesomeIconFactory()],
                                            text: 'Your information could be displayed here',
                                          }),
                                          tooltipFactory({
                                            componentChildren: [fontAwesomeIconFactory()],
                                            text: 'Your information could be displayed here',
                                          }),
                                          tooltipFactory({
                                            componentChildren: [fontAwesomeIconFactory()],
                                            text: 'Your information could be displayed here',
                                          }),
                                          tooltipFactory({
                                            componentChildren: [fontAwesomeIconFactory()],
                                            text: 'Your information could be displayed here',
                                          }),
                                        ],
                                        componentChildren: [buttonFactory()],
                                      }),
                                    ],
                                  }),
                                  gridItemFactory({
                                    componentChildren: [
                                      sectionFactory({
                                        divider: true,
                                        collapsible: true,
                                        expanded: false,
                                        title: 'Test with Textfield',
                                        componentChildren: [textFieldFactory()],
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                          accordionItemFactory({
                            title: 'Different TitleChildren Examples',
                            componentChildren: [
                              gridFactory({
                                items: [
                                  gridItemFactory({
                                    size: 3,
                                    componentChildren: [
                                      sectionFactory({
                                        size: 'extraSmall',
                                        divider: true,
                                        collapsible: true,
                                        expanded: false,
                                        title: 'Test with Icon',
                                        titleChildren: [fontAwesomeIconFactory()],
                                        componentChildren: [textFieldFactory()],
                                      }),
                                    ],
                                  }),
                                  gridItemFactory({
                                    size: 3,
                                    componentChildren: [
                                      sectionFactory({
                                        size: 'extraSmall',
                                        divider: true,
                                        collapsible: true,
                                        expanded: false,
                                        title: 'Test with Text',
                                        titleChildren: [textFactory()],
                                        componentChildren: [textFieldFactory()],
                                      }),
                                    ],
                                  }),
                                  gridItemFactory({
                                    size: 3,
                                    componentChildren: [
                                      sectionFactory({
                                        size: 'extraSmall',
                                        divider: true,
                                        collapsible: true,
                                        expanded: false,
                                        title: 'Test with badge',
                                        titleChildren: [badgeFactory({ text: 'Badge' })],
                                        componentChildren: [textFieldFactory()],
                                      }),
                                    ],
                                  }),
                                  gridItemFactory({
                                    size: 3,
                                    componentChildren: [
                                      sectionFactory({
                                        size: 'extraSmall',
                                        divider: true,
                                        collapsible: true,
                                        expanded: false,
                                        title: 'Test with Button',
                                        titleChildren: [buttonFactory()],
                                        componentChildren: [textFieldFactory()],
                                      }),
                                    ],
                                  }),
                                  gridItemFactory({
                                    size: 3,
                                    componentChildren: [
                                      sectionFactory({
                                        size: 'small',
                                        divider: true,
                                        collapsible: true,
                                        expanded: false,
                                        title: 'Test with Icon',
                                        titleChildren: [fontAwesomeIconFactory()],
                                        componentChildren: [textFieldFactory()],
                                      }),
                                    ],
                                  }),
                                  gridItemFactory({
                                    size: 3,
                                    componentChildren: [
                                      sectionFactory({
                                        size: 'small',
                                        divider: true,
                                        collapsible: true,
                                        expanded: false,
                                        title: 'Test with Text',
                                        titleChildren: [textFactory()],
                                        componentChildren: [textFieldFactory()],
                                      }),
                                    ],
                                  }),
                                  gridItemFactory({
                                    size: 3,
                                    componentChildren: [
                                      sectionFactory({
                                        size: 'small',
                                        divider: true,
                                        collapsible: true,
                                        expanded: false,
                                        title: 'Test with badge',
                                        titleChildren: [badgeFactory({ text: 'Badge' })],
                                        componentChildren: [textFieldFactory()],
                                      }),
                                    ],
                                  }),
                                  gridItemFactory({
                                    size: 3,
                                    componentChildren: [
                                      sectionFactory({
                                        size: 'small',
                                        divider: true,
                                        collapsible: true,
                                        expanded: false,
                                        title: 'Test with Button',
                                        titleChildren: [buttonFactory()],
                                        componentChildren: [textFieldFactory()],
                                      }),
                                    ],
                                  }),
                                  gridItemFactory({
                                    size: 3,
                                    componentChildren: [
                                      sectionFactory({
                                        size: 'medium',
                                        divider: true,
                                        collapsible: true,
                                        expanded: false,
                                        title: 'Test with Icon',
                                        titleChildren: [fontAwesomeIconFactory()],
                                        componentChildren: [textFieldFactory()],
                                      }),
                                    ],
                                  }),
                                  gridItemFactory({
                                    size: 3,
                                    componentChildren: [
                                      sectionFactory({
                                        size: 'medium',
                                        divider: true,
                                        collapsible: true,
                                        expanded: false,
                                        title: 'Test with Text',
                                        titleChildren: [textFactory()],
                                        componentChildren: [textFieldFactory()],
                                      }),
                                    ],
                                  }),
                                  gridItemFactory({
                                    size: 3,
                                    componentChildren: [
                                      sectionFactory({
                                        size: 'medium',
                                        divider: true,
                                        collapsible: true,
                                        expanded: false,
                                        title: 'Test with badge',
                                        titleChildren: [badgeFactory({ text: 'Badge' })],
                                        componentChildren: [textFieldFactory()],
                                      }),
                                    ],
                                  }),
                                  gridItemFactory({
                                    size: 3,
                                    componentChildren: [
                                      sectionFactory({
                                        size: 'medium',
                                        divider: true,
                                        collapsible: true,
                                        expanded: false,
                                        title: 'Test with Button',
                                        titleChildren: [buttonFactory()],
                                        componentChildren: [textFieldFactory()],
                                      }),
                                    ],
                                  }),
                                  gridItemFactory({
                                    size: 3,
                                    componentChildren: [
                                      sectionFactory({
                                        size: 'large',
                                        divider: true,
                                        collapsible: true,
                                        expanded: false,
                                        title: 'Test with Icon',
                                        titleChildren: [fontAwesomeIconFactory()],
                                        componentChildren: [textFieldFactory()],
                                      }),
                                    ],
                                  }),
                                  gridItemFactory({
                                    size: 3,
                                    componentChildren: [
                                      sectionFactory({
                                        size: 'large',
                                        divider: true,
                                        collapsible: true,
                                        expanded: false,
                                        title: 'Test with Text',
                                        titleChildren: [textFactory()],
                                        componentChildren: [textFieldFactory()],
                                      }),
                                    ],
                                  }),
                                  gridItemFactory({
                                    size: 3,
                                    componentChildren: [
                                      sectionFactory({
                                        size: 'large',
                                        divider: true,
                                        collapsible: true,
                                        expanded: false,
                                        title: 'Test with badge',
                                        titleChildren: [badgeFactory({ text: 'Badge' })],
                                        componentChildren: [textFieldFactory()],
                                      }),
                                    ],
                                  }),
                                  gridItemFactory({
                                    size: 3,
                                    componentChildren: [
                                      sectionFactory({
                                        size: 'large',
                                        divider: true,
                                        collapsible: true,
                                        expanded: false,
                                        title: 'Test with Button',
                                        titleChildren: [buttonFactory()],
                                        componentChildren: [textFieldFactory()],
                                      }),
                                    ],
                                  }),
                                  gridItemFactory({
                                    size: 3,
                                    componentChildren: [
                                      sectionFactory({
                                        size: 'extraLarge',
                                        divider: true,
                                        collapsible: true,
                                        expanded: false,
                                        title: 'Test with Icon',
                                        titleChildren: [fontAwesomeIconFactory()],
                                        componentChildren: [textFieldFactory()],
                                      }),
                                    ],
                                  }),
                                  gridItemFactory({
                                    size: 3,
                                    componentChildren: [
                                      sectionFactory({
                                        size: 'extraLarge',
                                        divider: true,
                                        collapsible: true,
                                        expanded: false,
                                        title: 'Test with Text',
                                        titleChildren: [textFactory()],
                                        componentChildren: [textFieldFactory()],
                                      }),
                                    ],
                                  }),
                                  gridItemFactory({
                                    size: 3,
                                    componentChildren: [
                                      sectionFactory({
                                        size: 'extraLarge',
                                        divider: true,
                                        collapsible: true,
                                        expanded: false,
                                        title: 'Test with badge',
                                        titleChildren: [badgeFactory({ text: 'Badge' })],
                                        componentChildren: [textFieldFactory()],
                                      }),
                                    ],
                                  }),
                                  gridItemFactory({
                                    size: 3,
                                    componentChildren: [
                                      sectionFactory({
                                        size: 'extraLarge',
                                        divider: true,
                                        collapsible: true,
                                        expanded: false,
                                        title: 'Test with Button',
                                        titleChildren: [buttonFactory()],
                                        componentChildren: [textFieldFactory()],
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
        }),
      ],
    }),
  ],
});
