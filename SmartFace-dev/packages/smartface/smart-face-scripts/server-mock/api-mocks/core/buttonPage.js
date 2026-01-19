// @ts-check

import { logo } from '#shared/smartFaceComponentFactories/shared/logo';

import {
  accordionFactory,
  accordionItemFactory,
} from '../../../../shared/smartFaceComponentFactories/core/accordionFactory.js';
import {
  breadcrumbFactory,
  breadcrumbItemFactory,
} from '../../../../shared/smartFaceComponentFactories/core/breadcrumbFactory.js';
import { buttonFactory } from '../../../../shared/smartFaceComponentFactories/core/buttonFactory.js';
import { cardFactory } from '../../../../shared/smartFaceComponentFactories/core/cardFactory.js';
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { comboBoxFactory } from '../../../../shared/smartFaceComponentFactories/core/comboBoxFactory.js';
import { fontAwesomeIconFactory } from '../../../../shared/smartFaceComponentFactories/core/fontAwesomeIconFactory.js';
import { gridFactory, gridItemFactory } from '../../../../shared/smartFaceComponentFactories/core/gridFactory.js';
import { iconButtonFactory } from '../../../../shared/smartFaceComponentFactories/core/iconButtonFactory.js';
import { keyDownSideEffectFactory } from '../../../../shared/smartFaceComponentFactories/core/keyDownSideEffectFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { switchFactory } from '../../../../shared/smartFaceComponentFactories/core/switchFactory.js';
import { textFactory } from '../../../../shared/smartFaceComponentFactories/core/textFactory.js';
import { uiHandlerFactory } from '../../../../shared/smartFaceComponentFactories/core/uiHandlerFactory.js';
import { visibilityHandlerFactory } from '../../../../shared/smartFaceComponentFactories/core/visibilityHandlerFactory.js';
import { profileMenuFactory } from '../../../../shared/smartFaceComponentFactories/extension/profileMenuFactory.js';
import { footer } from '../shared/footer.js';
import { patchFactory } from '../shared/patchFactory.js';
import { sidebar } from '../shared/sidebar.js';

const colors = ['primary', 'secondary', 'success', 'warning', 'danger', 'info'];
const variants = ['filled', 'subtle', 'ghost', 'text', 'link', 'unstyled'];
const corners = ['square', 'rounded', 'pill'];
const sizes = ['extraSmall', 'small', 'medium', 'large', 'extraLarge'];

const variantsColors = () => {
  let generatedButtons = [];
  let buttonRow = [];
  variants.forEach((variant) => {
    colors.forEach((color) => {
      buttonRow.push(
        gridItemFactory({
          size: 2,
          componentChildren: [buttonFactory({ text: variant + ' ' + color, variant: variant, color: color })],
        }),
      );
    });
    generatedButtons.push(
      gridItemFactory({
        componentChildren: [gridFactory({ items: [...buttonRow] })],
      }),
    );
    buttonRow = [];
  });

  return generatedButtons;
};

const onClick = (text) => [
  {
    type: 'request',
    data: {
      action: 'reflect',
      reflectedData: {
        sideEffects: [
          {
            type: 'consoleMessage',
            message: `onClick ${text}`,
          },
        ],
      },
    },
  },
];

const iconButtons = () => {
  let generatedButtons = [];
  let buttonRow = [];
  variants.forEach((variant) => {
    colors.forEach((color) => {
      buttonRow.push(
        gridItemFactory({
          size: 2,
          componentChildren: [
            iconButtonFactory({
              variant: variant,
              color: color,
              onClick: onClick(`${variant} ${color}`),
            }),
          ],
        }),
      );
    });
    generatedButtons.push(
      gridItemFactory({
        componentChildren: [gridFactory({ items: [...buttonRow] })],
      }),
    );
    buttonRow = [];
  });

  return generatedButtons;
};

const cornerVariantColors = () => {
  let generatedButtons = [];
  let buttonRow = [];
  variants.forEach((variant) => {
    corners.forEach((corner) => {
      buttonRow.push(
        gridItemFactory({
          size: 4,
          componentChildren: [buttonFactory({ text: variant + ' ' + corner, variant: variant, corner: corner })],
        }),
      );
    });
    generatedButtons.push(
      gridItemFactory({
        componentChildren: [gridFactory({ items: [...buttonRow] })],
      }),
    );
    buttonRow = [];
  });

  return generatedButtons;
};

const disabledButtons = () => {
  let generatedButtons = [];
  let buttonRow = [];
  variants.forEach((variant) => {
    buttonRow.push(
      gridItemFactory({
        componentChildren: [buttonFactory({ text: variant + ' ' + 'disabled', variant: variant, disabled: true })],
      }),
    );
    generatedButtons.push(
      gridItemFactory({
        componentChildren: [gridFactory({ items: [...buttonRow] })],
      }),
    );
    buttonRow = [];
  });

  return generatedButtons;
};

const disabledIconButtons = () => {
  let generatedButtons = [];
  variants.forEach((variant) => {
    generatedButtons.push(
      gridItemFactory({
        size: 2,
        componentChildren: [iconButtonFactory({ variant: variant, disabled: true })],
      }),
    );
  });

  return generatedButtons;
};

const fullWidthButtons = () => {
  let generatedButtons = [];
  let buttonRow = [];
  variants.forEach((variant) => {
    buttonRow.push(
      gridItemFactory({
        componentChildren: [buttonFactory({ text: variant + ' ' + 'fullWidth', variant: variant, fullWidth: true })],
      }),
    );
    generatedButtons.push(
      gridItemFactory({
        componentChildren: [gridFactory({ items: [...buttonRow] })],
      }),
    );
    buttonRow = [];
  });

  return generatedButtons;
};

const buttonsWithIcon = () => {
  let generatedButtons = [];
  let buttonRow = [];
  variants.forEach((variant) => {
    buttonRow.push(
      gridItemFactory({
        size: 4,
        componentChildren: [
          buttonFactory({ text: variant + ' ' + 'Icon', variant: variant, leftIcon: fontAwesomeIconFactory() }),
        ],
      }),
      gridItemFactory({
        size: 4,
        componentChildren: [
          buttonFactory({
            text: variant + ' ' + 'Icon',
            variant: variant,
            leftIcon: fontAwesomeIconFactory(),
            rightIcon: fontAwesomeIconFactory(),
          }),
        ],
      }),
      gridItemFactory({
        size: 4,
        componentChildren: [
          buttonFactory({ text: variant + ' ' + 'Icon', variant: variant, rightIcon: fontAwesomeIconFactory() }),
        ],
      }),
    );
    generatedButtons.push(
      gridItemFactory({
        componentChildren: [gridFactory({ items: [...buttonRow] })],
      }),
    );
    buttonRow = [];
  });

  return generatedButtons;
};

const sizeButtons = () => {
  let generatedButtons = [];
  let buttonRow = [];
  variants.forEach((variant) => {
    sizes.forEach((size) => {
      buttonRow.push(
        gridItemFactory({
          size: 2,
          componentChildren: [buttonFactory({ text: variant + ' ' + size, variant: variant, size: size })],
        }),
      );
    });
    generatedButtons.push(
      gridItemFactory({
        componentChildren: [gridFactory({ items: [...buttonRow] })],
      }),
    );
    buttonRow = [];
  });

  return generatedButtons;
};

//function for Button and IconButton testing onClick&Href:
const testButtonsWithHrefAndOnClick = () => {
  let generatedButtons = [];
  let buttonRow = [];

  buttonRow.push(
    gridItemFactory({
      size: 4,
      componentChildren: [
        buttonFactory({
          text: 'Button with onClick only',
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
                      message: 'Button onClick triggered',
                    },
                  ],
                },
              },
            },
          ],
        }),
      ],
    }),
    gridItemFactory({
      size: 4,
      componentChildren: [
        buttonFactory({
          text: 'Button with href only',
          color: 'secondary',
          href: '/accordion',
          target: '_blank',
        }),
      ],
    }),
    gridItemFactory({
      size: 4,
      componentChildren: [
        buttonFactory({
          text: 'Button with href + onClick',
          color: 'success',
          href: '/accordion',
          target: '_blank',
          onClick: [
            {
              type: 'request',
              data: {
                action: 'reflect',
                reflectedData: {
                  sideEffects: [
                    {
                      type: 'addNotification',
                      message: 'Button with href+onClick clicked',
                    },
                  ],
                },
              },
            },
          ],
        }),
      ],
    }),
  );

  generatedButtons.push(
    gridItemFactory({
      componentChildren: [gridFactory({ items: [...buttonRow] })],
    }),
  );

  buttonRow = [];
  buttonRow.push(
    gridItemFactory({
      size: 4,
      componentChildren: [
        textFactory({ text: 'onClick only:' }),
        iconButtonFactory({
          color: 'primary',
          icon: fontAwesomeIconFactory(),
          onClick: [
            {
              type: 'request',
              data: {
                action: 'reflect',
                reflectedData: {
                  sideEffects: [
                    {
                      type: 'addNotification',
                      message: 'IconButton onClick triggered',
                    },
                  ],
                },
              },
            },
          ],
        }),
      ],
    }),
    gridItemFactory({
      size: 4,
      componentChildren: [
        textFactory({ text: 'href only:' }),
        iconButtonFactory({
          color: 'secondary',
          icon: fontAwesomeIconFactory(),
          href: '/accordion',
          target: '_blank',
        }),
      ],
    }),
    gridItemFactory({
      size: 4,
      componentChildren: [
        textFactory({ text: 'href + onClick:' }),
        iconButtonFactory({
          color: 'success',
          icon: fontAwesomeIconFactory(),
          href: '/accordion',
          target: '_blank',
          onClick: [
            {
              type: 'request',
              data: {
                action: 'reflect',
                reflectedData: {
                  sideEffects: [
                    {
                      type: 'addNotification',
                      message: 'IconButton with href+onClick clicked',
                    },
                  ],
                },
              },
            },
          ],
        }),
      ],
    }),
  );

  generatedButtons.push(
    gridItemFactory({
      componentChildren: [gridFactory({ items: [...buttonRow] })],
    }),
  );

  return generatedButtons;
};

/**
 * @type { import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType }
 */
export const buttonPage = smartFaceFactory({
  sfComponents: [
    pageFactory(
      {
        componentChildren: [
          uiHandlerFactory(
            {
              componentChildren: [
                keyDownSideEffectFactory({
                  shortcut: { key: 'y', ctrlKey: true },
                  onKeyDown: [
                    {
                      type: 'request',
                      url: '/update',
                      data: { action: 'key-down' },
                    },
                  ],
                }),
                keyDownSideEffectFactory({
                  shortcut: { key: 'F8' },
                  onKeyDown: [
                    {
                      type: 'request',
                      data: {
                        action: 'reflect',
                        reflectedData: {
                          sideEffects: [
                            {
                              type: 'enableComponentDebugger',
                              onClick: [
                                {
                                  type: 'request',
                                  data: {
                                    action: 'debug',
                                    eventId: '1',
                                  },
                                },
                              ],
                            },
                          ],
                        },
                      },
                    },
                  ],
                }),
                classicLayoutFactory({
                  sidebar: sidebar('component-pages', ['component-pages']),
                  content: {
                    header: {
                      fixed: 'never',
                      componentChildren: [
                        cardFactory({}),
                        gridFactory({
                          items: [
                            gridItemFactory({
                              componentChildren: [
                                buttonFactory({
                                  text: 'DefaultSize Large',
                                  onClick: [
                                    {
                                      type: 'request',
                                      data: {
                                        action: 'reflect',
                                        reflectedData: {
                                          sideEffects: [
                                            {
                                              type: 'updateSmartFaceBackendConfig',
                                              fields: {
                                                sfDefaultSize: 'large',
                                              },
                                            },
                                          ],
                                        },
                                      },
                                    },
                                  ],
                                }),
                                buttonFactory({
                                  text: 'DefaultFullHeight True',
                                  onClick: [
                                    {
                                      type: 'request',
                                      data: {
                                        action: 'reflect',
                                        reflectedData: {
                                          sideEffects: [
                                            {
                                              type: 'updateSmartFaceBackendConfig',
                                              fields: {
                                                sfDefaultFullHeight: true,
                                              },
                                            },
                                          ],
                                        },
                                      },
                                    },
                                  ],
                                }),
                                buttonFactory({
                                  text: 'Dark',
                                  onClick: [
                                    {
                                      type: 'request',
                                      data: {
                                        action: 'reflect',
                                        reflectedData: {
                                          sideEffects: [
                                            {
                                              type: 'updateSmartFaceBackendConfig',
                                              fields: {
                                                sfTheme: 'hrwDarkMode',
                                              },
                                            },
                                          ],
                                        },
                                      },
                                    },
                                  ],
                                }),
                                buttonFactory({
                                  text: 'System',
                                  onClick: [
                                    {
                                      type: 'request',
                                      data: {
                                        action: 'reflect',
                                        reflectedData: {
                                          sideEffects: [
                                            {
                                              type: 'updateSmartFaceBackendConfig',
                                              fields: {
                                                sfTheme: 'hrwSystemMode',
                                              },
                                            },
                                          ],
                                        },
                                      },
                                    },
                                  ],
                                }),
                                buttonFactory({
                                  text: 'Light',
                                  onClick: [
                                    {
                                      type: 'request',
                                      data: {
                                        action: 'reflect',
                                        reflectedData: {
                                          sideEffects: [
                                            {
                                              type: 'updateSmartFaceBackendConfig',
                                              fields: {
                                                sfTheme: 'hrwLightMode',
                                              },
                                            },
                                          ],
                                        },
                                      },
                                    },
                                  ],
                                }),
                                buttonFactory({
                                  text: 'UseCustomScrollbar',
                                  onClick: [
                                    {
                                      type: 'request',
                                      data: {
                                        action: 'reflect',
                                        reflectedData: {
                                          sideEffects: [
                                            {
                                              type: 'updateSmartFaceBackendConfig',
                                              fields: {
                                                sfUseCustomScrollbars: true,
                                              },
                                            },
                                          ],
                                        },
                                      },
                                    },
                                  ],
                                }),
                                buttonFactory({
                                  text: 'Dont UseCustomScrollbar',
                                  onClick: [
                                    {
                                      type: 'request',
                                      data: {
                                        action: 'reflect',
                                        reflectedData: {
                                          sideEffects: [
                                            {
                                              type: 'updateSmartFaceBackendConfig',
                                              fields: {
                                                sfUseCustomScrollbars: false,
                                              },
                                            },
                                          ],
                                        },
                                      },
                                    },
                                  ],
                                }),
                                buttonFactory({
                                  text: 'Iconset: font-aswesome',
                                  onClick: [
                                    {
                                      type: 'request',
                                      data: {
                                        action: 'reflect',
                                        reflectedData: {
                                          sideEffects: [
                                            {
                                              type: 'updateSmartFaceBackendConfig',
                                              fields: {
                                                sfIconSet: 'font-awesome',
                                              },
                                            },
                                          ],
                                        },
                                      },
                                    },
                                  ],
                                }),
                                buttonFactory({
                                  text: 'Iconset: streamline',
                                  onClick: [
                                    {
                                      type: 'request',
                                      data: {
                                        action: 'reflect',
                                        reflectedData: {
                                          sideEffects: [
                                            {
                                              type: 'updateSmartFaceBackendConfig',
                                              fields: {
                                                sfIconSet: 'streamline',
                                              },
                                            },
                                          ],
                                        },
                                      },
                                    },
                                  ],
                                }),
                              ],
                            }),
                            gridItemFactory({
                              componentChildren: [
                                breadcrumbFactory(
                                  {
                                    items: [
                                      breadcrumbItemFactory({ text: 'text' }, undefined, 'data-guide-test'),
                                      breadcrumbItemFactory({ text: 'href', href: 'sidebar' }),
                                      breadcrumbItemFactory({
                                        text: 'onClick redirect',
                                        onClick: [{ type: 'redirect', url: 'card' }],
                                      }),
                                      breadcrumbItemFactory({
                                        text: 'onClick & href',
                                        href: 'accordion',
                                        target: '_blank',
                                        onClick: [
                                          {
                                            type: 'request',
                                            data: {
                                              action: 'reflect',
                                              reflectedData: {
                                                sideEffects: [
                                                  {
                                                    type: 'addNotification',
                                                    message: `Breadcrump clicked`,
                                                  },
                                                ],
                                              },
                                            },
                                          },
                                        ],
                                      }),
                                      breadcrumbItemFactory(
                                        {
                                          text: 'onClick change text',
                                          href: 'button',
                                          onClick: [
                                            {
                                              type: 'request',
                                              data: { action: 'button-page' },
                                            },
                                          ],
                                        },
                                        'breadCrumbItem-5',
                                      ),
                                    ],
                                  },
                                  undefined,
                                  'data-guide-test',
                                ),
                              ],
                            }),
                          ],
                        }),
                      ],
                    },
                    componentChildren: [
                      gridFactory(
                        {
                          items: [
                            //Tests for Button & IconButton Kombination: onClick & Href:
                            gridItemFactory({
                              componentChildren: [
                                accordionFactory({
                                  expandedItemSfIds: ['test-buttons'],
                                  items: [
                                    accordionItemFactory(
                                      {
                                        icon: undefined,
                                        title: 'Test for href and onClick Behavior',
                                        componentChildren: [
                                          gridFactory({ items: [...testButtonsWithHrefAndOnClick()] }),
                                        ],
                                      },
                                      'test-buttons',
                                    ),
                                  ],
                                }),
                              ],
                            }),
                            //
                            gridItemFactory({
                              componentChildren: [
                                accordionFactory({
                                  expandedItemSfIds: ['a1'],
                                  items: [
                                    accordionItemFactory(
                                      {
                                        icon: undefined,
                                        title: 'Button Variants and Colors',
                                        componentChildren: [gridFactory({ items: [...variantsColors()] })],
                                      },
                                      'a1',
                                    ),
                                  ],
                                }),
                              ],
                            }),
                            gridItemFactory({
                              size: 8,
                              componentChildren: [
                                accordionFactory({
                                  // expandedItemSfIds: ['a2'],
                                  items: [
                                    accordionItemFactory(
                                      {
                                        icon: undefined,
                                        title: 'Corners',
                                        componentChildren: [gridFactory({ items: [...cornerVariantColors()] })],
                                      },
                                      'a2',
                                    ),
                                  ],
                                }),
                              ],
                            }),
                            gridItemFactory({
                              size: 4,
                              componentChildren: [
                                accordionFactory({
                                  // expandedItemSfIds: ['a3'],
                                  items: [
                                    accordionItemFactory(
                                      {
                                        icon: undefined,
                                        title: 'Disabled',
                                        componentChildren: [gridFactory({ size: 4, items: [...disabledButtons()] })],
                                      },
                                      'a3',
                                    ),
                                  ],
                                }),
                              ],
                            }),
                            gridItemFactory({
                              componentChildren: [
                                accordionFactory({
                                  //expandedItemSfIds: ['a4'],
                                  items: [
                                    accordionItemFactory(
                                      {
                                        icon: undefined,
                                        title: 'Sizes',
                                        componentChildren: [gridFactory({ items: [...sizeButtons()] })],
                                      },
                                      'a4',
                                    ),
                                  ],
                                }),
                              ],
                            }),
                            gridItemFactory({
                              componentChildren: [
                                accordionFactory({
                                  // expandedItemSfIds: ['a5'],
                                  items: [
                                    accordionItemFactory(
                                      {
                                        icon: undefined,
                                        title: 'Href',
                                        componentChildren: [
                                          gridFactory({
                                            items: [
                                              gridItemFactory({
                                                componentChildren: [
                                                  gridFactory({
                                                    size: 7,
                                                    items: [
                                                      gridItemFactory({
                                                        size: 1,
                                                        componentChildren: [
                                                          buttonFactory({
                                                            text: 'Filled href',
                                                            href: '/',
                                                            color: 'danger',
                                                          }),
                                                        ],
                                                      }),
                                                      gridItemFactory({
                                                        size: 1,
                                                        componentChildren: [
                                                          buttonFactory(
                                                            {
                                                              text: 'Subtle href',
                                                              variant: 'subtle',
                                                              href: '/',
                                                              color: 'danger',
                                                            },
                                                            undefined,
                                                            'data-guide-test',
                                                          ),
                                                        ],
                                                      }),
                                                      gridItemFactory({
                                                        size: 1,
                                                        componentChildren: [
                                                          buttonFactory({
                                                            text: 'Ghost href',
                                                            variant: 'ghost',
                                                            href: '/',
                                                            color: 'danger',
                                                          }),
                                                        ],
                                                      }),
                                                      gridItemFactory({
                                                        size: 1,
                                                        componentChildren: [
                                                          buttonFactory({
                                                            text: 'Text href',
                                                            variant: 'text',
                                                            href: '/',
                                                            color: 'danger',
                                                          }),
                                                        ],
                                                      }),
                                                      gridItemFactory({
                                                        size: 1,
                                                        componentChildren: [
                                                          buttonFactory({
                                                            text: 'Unstyled href',
                                                            variant: 'unstyled',
                                                            href: '/',
                                                            color: 'danger',
                                                          }),
                                                        ],
                                                      }),
                                                      gridItemFactory({
                                                        size: 1,
                                                        componentChildren: [
                                                          buttonFactory({
                                                            text: 'Link w/o href',
                                                            color: 'danger',
                                                            variant: 'link',
                                                          }),
                                                        ],
                                                      }),
                                                      gridItemFactory({
                                                        size: 1,
                                                        componentChildren: [
                                                          buttonFactory({
                                                            text: 'Link href',
                                                            variant: 'link',
                                                            href: '/',
                                                            color: 'danger',
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
                                                    size: 7,
                                                    items: [
                                                      gridItemFactory({
                                                        size: 1,
                                                        componentChildren: [
                                                          buttonFactory({
                                                            disabled: true,
                                                            text: 'Filled href',
                                                            href: '/',
                                                            color: 'danger',
                                                          }),
                                                        ],
                                                      }),
                                                      gridItemFactory({
                                                        size: 1,
                                                        componentChildren: [
                                                          buttonFactory({
                                                            disabled: true,
                                                            text: 'Subtle href',
                                                            variant: 'subtle',
                                                            href: '/',
                                                            color: 'danger',
                                                          }),
                                                        ],
                                                      }),
                                                      gridItemFactory({
                                                        size: 1,
                                                        componentChildren: [
                                                          buttonFactory({
                                                            disabled: true,
                                                            text: 'Ghost href',
                                                            variant: 'ghost',
                                                            href: '/',
                                                            color: 'danger',
                                                          }),
                                                        ],
                                                      }),
                                                      gridItemFactory({
                                                        size: 1,
                                                        componentChildren: [
                                                          buttonFactory({
                                                            disabled: true,
                                                            text: 'Text href',
                                                            variant: 'text',
                                                            href: '/',
                                                            color: 'danger',
                                                          }),
                                                        ],
                                                      }),
                                                      gridItemFactory({
                                                        size: 1,
                                                        componentChildren: [
                                                          buttonFactory({
                                                            disabled: true,
                                                            text: 'Unstyled href',
                                                            variant: 'unstyled',
                                                            href: '/',
                                                            color: 'danger',
                                                          }),
                                                        ],
                                                      }),
                                                      gridItemFactory({
                                                        size: 1,
                                                        componentChildren: [
                                                          buttonFactory({
                                                            disabled: true,
                                                            text: 'Link w/o href',
                                                            color: 'danger',
                                                            variant: 'link',
                                                          }),
                                                        ],
                                                      }),
                                                      gridItemFactory({
                                                        size: 1,
                                                        componentChildren: [
                                                          buttonFactory({
                                                            disabled: true,
                                                            text: 'Link href',
                                                            variant: 'link',
                                                            href: '/',
                                                            color: 'danger',
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
                                      'a5',
                                    ),
                                  ],
                                }),
                              ],
                            }),
                            gridItemFactory({
                              size: 6,
                              componentChildren: [
                                accordionFactory({
                                  //expandedItemSfIds: ['a6'],
                                  items: [
                                    accordionItemFactory(
                                      {
                                        icon: undefined,
                                        title: 'Icons',
                                        componentChildren: [gridFactory({ items: [...buttonsWithIcon()] })],
                                      },
                                      'a6',
                                    ),
                                  ],
                                }),
                              ],
                            }),
                            gridItemFactory({
                              size: 6,
                              componentChildren: [
                                accordionFactory({
                                  //expandedItemSfIds: ['a7'],
                                  items: [
                                    accordionItemFactory(
                                      {
                                        icon: undefined,
                                        title: 'FullWidth',
                                        componentChildren: [gridFactory({ items: [...fullWidthButtons()] })],
                                      },
                                      'a7',
                                    ),
                                  ],
                                }),
                              ],
                            }),
                            gridItemFactory({
                              componentChildren: [
                                accordionFactory({
                                  //expandedItemSfIds: ['a8'],
                                  items: [
                                    accordionItemFactory(
                                      {
                                        icon: undefined,
                                        title: 'IconButton',
                                        componentChildren: [
                                          gridFactory({
                                            items: [
                                              ...iconButtons(),
                                              gridItemFactory({
                                                componentChildren: [
                                                  gridFactory({
                                                    items: [
                                                      gridItemFactory({
                                                        componentChildren: [
                                                          accordionFactory({
                                                            //expandedItemSfIds: ['a9'],
                                                            items: [
                                                              accordionItemFactory(
                                                                {
                                                                  title: 'Disabled',
                                                                  componentChildren: [
                                                                    gridFactory({
                                                                      items: [...disabledIconButtons()],
                                                                    }),
                                                                  ],
                                                                },
                                                                'a9',
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
                                      'a8',
                                    ),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        },
                        'grid-0',
                      ),
                    ],
                  },
                  header: {
                    flexComponentChildren: [
                      gridFactory({
                        items: [
                          gridItemFactory({
                            componentChildren: [
                              comboBoxFactory(
                                {
                                  // type: 'modal',
                                  getResultMinLength: 3,
                                  getResultDelay: 500,
                                  clearValueOnQueryChange: false,
                                  url: '/combo-box-backend',
                                  label: 'Choose your friend',
                                  name: 'friend',
                                  size: 'extraSmall',
                                  // query: 'Hello',
                                  // value: { id: 'oighesges', text: 'Whoops' },
                                  onValueChange: [
                                    {
                                      type: 'request',
                                      data: {
                                        action: 'reflect',
                                        reflectedData: {
                                          sideEffects: [{ type: 'consoleMessage', message: 'Value changed' }],
                                        },
                                      },
                                    },
                                  ],
                                },
                                'combo-box-0',
                              ),
                            ],
                          }),
                        ],
                      }),
                    ],
                    componentChildren: [
                      profileMenuFactory(
                        {
                          portrait: { src: 'ui-assets/pictures/profile.jpg' },
                          title: 'John Doe',
                          subtitle: 'A very anonymous',
                          headerChildren: [buttonFactory()],
                          bodyChildren: [
                            visibilityHandlerFactory(
                              {
                                visible: true,
                                componentChildren: [
                                  switchFactory({
                                    label: 'theme',
                                    checked: true,
                                    onValueChange: [
                                      {
                                        type: 'request',
                                        data: {
                                          action: 'reflect',
                                          reflectedData: patchFactory([
                                            {
                                              targetSfId: 'handler',
                                              operation: 'write',
                                              path: 'props.theme',
                                              value: 'lightmode',
                                            },
                                            {
                                              targetSfId: 'handler',
                                              operation: 'write',
                                              path: 'props.useCustomScrollbars',
                                              value: false,
                                            },
                                            {
                                              targetSfId: 'vh1',
                                              operation: 'write',
                                              path: 'props.visible',
                                              value: false,
                                            },
                                            {
                                              targetSfId: 'vh2',
                                              operation: 'write',
                                              path: 'props.visible',
                                              value: true,
                                            },
                                          ]),
                                        },
                                      },
                                    ],
                                  }),
                                ],
                              },
                              'vh1',
                            ),
                            visibilityHandlerFactory(
                              {
                                visible: true,
                                componentChildren: [
                                  switchFactory({
                                    label: 'Use Custom Scrollbars',
                                    checked: false,
                                    onValueChange: [
                                      {
                                        type: 'request',
                                        data: {
                                          action: 'reflect',
                                          reflectedData: patchFactory([
                                            {
                                              targetSfId: 'handler',
                                              operation: 'write',
                                              path: 'props.useCustomScrollbars',
                                              value: true,
                                            },
                                            {
                                              targetSfId: 'vh1',
                                              operation: 'write',
                                              path: 'props.visible',
                                              value: true,
                                            },
                                            {
                                              targetSfId: 'vh2',
                                              operation: 'write',
                                              path: 'props.visible',
                                              value: false,
                                            },
                                          ]),
                                        },
                                      },
                                    ],
                                  }),
                                ],
                              },
                              'vh2',
                            ),
                          ],
                        },
                        undefined,
                        'data-guide-test',
                      ),
                    ],
                  },
                  footer,
                  logo,
                }),
              ],
            },
            'handler',
          ),
        ],
        document: {
          head: {
            title: 'Button Page',
            fields: {
              javasript: {
                tag: 'script',
                attributes: {},
                innerText: 'console.log("Hello from the Server")',
              },
              style: {
                tag: 'style',
                attributes: {},
                innerText:
                  'body.lightGreen { background-color: lightgreen; } .redBackground body { background-color: red; }',
              },
            },
          },
          // html: {
          //   attributes: { lang: 'de' },
          // },
        },
      },
      'page-0',
    ),
  ],

  sideEffects: [
    {
      type: 'javaScriptExecutor',
      javaScript: 'function (context) { console.log(context); }',
    },
    {
      type: 'consoleMessage',
      message: 'Hello World',
    },
  ],
});
