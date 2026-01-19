// @ts-check

import { alertFactory } from '../../../../shared/smartFaceComponentFactories/core/alertFactory.js';
import { buttonFactory } from '../../../../shared/smartFaceComponentFactories/core/buttonFactory.js';
import { cardFactory } from '../../../../shared/smartFaceComponentFactories/core/cardFactory.js';
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { gridFactory, gridItemFactory } from '../../../../shared/smartFaceComponentFactories/core/gridFactory.js';
import { imageFactory } from '../../../../shared/smartFaceComponentFactories/core/imageFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { textFactory } from '../../../../shared/smartFaceComponentFactories/core/textFactory.js';
import {
  panelGroupFactory,
  panelGroupItemFactory,
} from '../../../../shared/smartFaceComponentFactories/extension/panelGroupFactory.js';
import { footer } from '../shared/footer.js';
import { patchFactory } from '../shared/patchFactory.js';
import { sidebar } from '../shared/sidebar.js';

/**
 * @type { import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType }
 */

export const panelGroupPage = smartFaceFactory({
  sfComponents: [
    pageFactory({
      document: { head: { title: 'PanelGroup Page' } },
      componentChildren: [
        classicLayoutFactory({
          sidebar: sidebar('panel-group-page', ['component-pages']),
          content: {
            componentChildren: [
              gridFactory({
                items: [
                  gridItemFactory({
                    size: 12,
                    componentChildren: [
                      cardFactory({
                        title: 'Nested PanelGroup',
                        bodyChildren: [
                          panelGroupFactory(
                            {
                              // fullHeight: false,
                              direction: 'horizontal',
                              defaultThreshold: 'extraSmall',
                              items: [
                                panelGroupItemFactory(
                                  {
                                    // threshold: 'extraLarge',
                                    // size: 23,
                                    componentChildren: [textFactory({ text: 'left' })],
                                  },
                                  'panel-1',
                                ),
                                panelGroupItemFactory(
                                  {
                                    // size: 75,
                                    componentChildren: [
                                      panelGroupFactory({
                                        // fullHeight: false,
                                        direction: 'vertical',
                                        items: [
                                          panelGroupItemFactory(
                                            {
                                              componentChildren: [
                                                imageFactory({
                                                  src: 'https://placedog.net/1000/1000',
                                                  corner: 'square',
                                                }),
                                              ],
                                            },
                                            'panel-2',
                                          ),
                                          panelGroupItemFactory(
                                            {
                                              componentChildren: [
                                                panelGroupFactory({
                                                  // fullHeight: false,
                                                  // defaultThreshold: 'extraSmall',
                                                  direction: 'horizontal',
                                                  items: [
                                                    panelGroupItemFactory(
                                                      {
                                                        // threshold: 'extraLarge',
                                                        componentChildren: [
                                                          textFactory({
                                                            text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
                                                          }),
                                                        ],
                                                      },
                                                      'panel-3',
                                                    ),
                                                    panelGroupItemFactory(
                                                      {
                                                        componentChildren: [textFactory({ text: 'right' })],
                                                      },
                                                      'panel-4',
                                                    ),
                                                  ],
                                                }),
                                              ],
                                            },
                                            'panel-5',
                                          ),
                                        ],
                                      }),
                                    ],
                                  },
                                  'panel-6',
                                ),
                                panelGroupItemFactory(
                                  {
                                    // size: 45,
                                    componentChildren: [textFactory({ text: 'right' })],
                                  },
                                  'panel-7',
                                ),
                              ],
                            },
                            'nested-panel-group',
                          ),
                        ],
                        footerChildren: [
                          gridFactory({
                            items: [
                              gridItemFactory(
                                {
                                  size: 12,
                                  componentChildren: [
                                    buttonFactory({
                                      size: 'medium',
                                      text: 'direction: vertical',
                                      color: 'success',
                                      corner: 'rounded',
                                      onClick: [
                                        {
                                          type: 'request',
                                          data: {
                                            action: 'reflect',
                                            reflectedData: patchFactory([
                                              {
                                                targetSfId: 'nested-panel-group',
                                                operation: 'write',
                                                path: 'props.direction',
                                                value: 'vertical',
                                              },
                                            ]),
                                          },
                                        },
                                      ],
                                    }),
                                    buttonFactory({
                                      size: 'medium',
                                      text: 'direction: horizontal',
                                      color: 'success',
                                      corner: 'rounded',
                                      onClick: [
                                        {
                                          type: 'request',
                                          data: {
                                            action: 'reflect',
                                            reflectedData: patchFactory([
                                              {
                                                targetSfId: 'nested-panel-group',
                                                operation: 'write',
                                                path: 'props.direction',
                                                value: 'horizontal',
                                              },
                                            ]),
                                          },
                                        },
                                      ],
                                    }),
                                  ],
                                },
                                'direction-buttons',
                              ),
                              gridItemFactory(
                                {
                                  size: 12,
                                  componentChildren: [
                                    buttonFactory({
                                      size: 'medium',
                                      text: 'Panel 1 - size: 23',
                                      color: 'success',
                                      corner: 'rounded',
                                      onClick: [
                                        {
                                          type: 'request',
                                          data: {
                                            action: 'reflect',
                                            reflectedData: patchFactory([
                                              {
                                                targetSfId: 'panel-1',
                                                operation: 'write',
                                                path: 'props.size',
                                                value: 23,
                                              },
                                            ]),
                                          },
                                        },
                                      ],
                                    }),
                                    buttonFactory({
                                      size: 'medium',
                                      text: 'Panel 1 - size: 46',
                                      color: 'success',
                                      corner: 'rounded',
                                      onClick: [
                                        {
                                          type: 'request',
                                          data: {
                                            action: 'reflect',
                                            reflectedData: patchFactory([
                                              {
                                                targetSfId: 'panel-1',
                                                operation: 'write',
                                                path: 'props.size',
                                                value: 46,
                                              },
                                            ]),
                                          },
                                        },
                                      ],
                                    }),
                                  ],
                                },
                                'size-buttons-panel-1',
                              ),
                              gridItemFactory(
                                {
                                  size: 12,
                                  componentChildren: [
                                    buttonFactory({
                                      size: 'medium',
                                      text: 'Panel 4 - size: 98',
                                      color: 'success',
                                      corner: 'rounded',
                                      onClick: [
                                        {
                                          type: 'request',
                                          data: {
                                            action: 'reflect',
                                            reflectedData: patchFactory([
                                              {
                                                targetSfId: 'panel-4',
                                                operation: 'write',
                                                path: 'props.size',
                                                value: 98,
                                              },
                                            ]),
                                          },
                                        },
                                      ],
                                    }),
                                    buttonFactory({
                                      size: 'medium',
                                      text: 'Panel 4 - size: 4',
                                      color: 'success',
                                      corner: 'rounded',
                                      onClick: [
                                        {
                                          type: 'request',
                                          data: {
                                            action: 'reflect',
                                            reflectedData: patchFactory([
                                              {
                                                targetSfId: 'panel-4',
                                                operation: 'write',
                                                path: 'props.size',
                                                value: 4,
                                              },
                                            ]),
                                          },
                                        },
                                      ],
                                    }),
                                  ],
                                },
                                'size-buttons-panel-4',
                              ),
                              gridItemFactory(
                                {
                                  size: 12,
                                  componentChildren: [
                                    buttonFactory({
                                      size: 'medium',
                                      text: 'Panel 2 - size: 4',
                                      color: 'success',
                                      corner: 'rounded',
                                      onClick: [
                                        {
                                          type: 'request',
                                          data: {
                                            action: 'reflect',
                                            reflectedData: patchFactory([
                                              {
                                                targetSfId: 'panel-2',
                                                operation: 'write',
                                                path: 'props.size',
                                                value: 4,
                                              },
                                            ]),
                                          },
                                        },
                                      ],
                                    }),
                                    buttonFactory({
                                      size: 'medium',
                                      text: 'Panel 2 - size: 98',
                                      color: 'success',
                                      corner: 'rounded',
                                      onClick: [
                                        {
                                          type: 'request',
                                          data: {
                                            action: 'reflect',
                                            reflectedData: patchFactory([
                                              {
                                                targetSfId: 'panel-2',
                                                operation: 'write',
                                                path: 'props.size',
                                                value: 98,
                                              },
                                            ]),
                                          },
                                        },
                                      ],
                                    }),
                                  ],
                                },
                                'size-buttons-panel-2',
                              ),
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
                        title: 'Separate PanelGroupItems',
                        bodyChildren: [
                          panelGroupFactory(
                            {
                              fullHeight: false,
                              direction: 'horizontal',
                              items: [
                                panelGroupItemFactory(
                                  {
                                    componentChildren: [
                                      // imageFactory(
                                      //   { src: 'https://placedog.net/1000/1000', corner: 'square', fullWidth: true },
                                      // ),
                                      alertFactory({
                                        title:
                                          'I need more space I need more space I need more space I need more space I need more space',
                                      }),
                                    ],
                                  },
                                  'panel-group-item-1',
                                ),
                                panelGroupItemFactory(
                                  {
                                    componentChildren: [
                                      // imageFactory(
                                      //   { src: 'https://placedog.net/1000/1000', corner: 'square' },
                                      // ),
                                      alertFactory({
                                        title: 'I want to stretch',
                                      }),
                                    ],
                                  },
                                  'panel-group-item-2',
                                ),
                              ],
                            },
                            'separated-panel-group',
                          ),
                        ],
                        footerChildren: [
                          gridFactory({
                            items: [
                              gridItemFactory(
                                {
                                  size: 12,
                                  componentChildren: [
                                    buttonFactory({
                                      size: 'medium',
                                      text: 'direction: vertical',
                                      color: 'success',
                                      corner: 'rounded',
                                      onClick: [
                                        {
                                          type: 'request',
                                          data: {
                                            action: 'reflect',
                                            reflectedData: patchFactory([
                                              {
                                                targetSfId: 'separated-panel-group',
                                                operation: 'write',
                                                path: 'props.direction',
                                                value: 'vertical',
                                              },
                                            ]),
                                          },
                                        },
                                      ],
                                    }),
                                    buttonFactory({
                                      size: 'medium',
                                      text: 'direction: horizontal',
                                      color: 'success',
                                      corner: 'rounded',
                                      onClick: [
                                        {
                                          type: 'request',
                                          data: {
                                            action: 'reflect',
                                            reflectedData: patchFactory([
                                              {
                                                targetSfId: 'separated-panel-group',
                                                operation: 'write',
                                                path: 'props.direction',
                                                value: 'horizontal',
                                              },
                                            ]),
                                          },
                                        },
                                      ],
                                    }),
                                  ],
                                },
                                'direction-buttons',
                              ),
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
                        title: 'Scrollable PanelGroup',
                        bodyChildren: [
                          panelGroupFactory(
                            {
                              direction: 'horizontal',
                              items: [
                                panelGroupItemFactory(
                                  {
                                    componentChildren: [
                                      gridFactory({
                                        items: [
                                          gridItemFactory(
                                            {
                                              size: 12,
                                              componentChildren: [
                                                alertFactory({
                                                  title:
                                                    'I need more space I need more space I need more space I need more space I need more space',
                                                }),
                                              ],
                                            },
                                            'scrollable-grid-item-1',
                                          ),
                                          gridItemFactory(
                                            {
                                              size: 12,
                                              componentChildren: [
                                                alertFactory({
                                                  title:
                                                    'I need more space I need more space I need more space I need more space I need more space',
                                                }),
                                              ],
                                            },
                                            'scrollable-grid-item-2',
                                          ),
                                          gridItemFactory(
                                            {
                                              size: 12,
                                              componentChildren: [
                                                alertFactory({
                                                  title:
                                                    'I need more space I need more space I need more space  need more space I need more space',
                                                }),
                                              ],
                                            },
                                            'scrollable-grid-item-3',
                                          ),
                                          gridItemFactory(
                                            {
                                              size: 12,
                                              componentChildren: [
                                                alertFactory({
                                                  title:
                                                    'I need more space I need more space I need more space I need more space I need more space',
                                                }),
                                              ],
                                            },
                                            'scrollable-grid-item-4',
                                          ),
                                          gridItemFactory(
                                            {
                                              size: 12,
                                              componentChildren: [
                                                alertFactory({
                                                  title:
                                                    'I need more space I need more space I need more space I need more space I need more space I need more space I need more space I need more space I need more space I need more space',
                                                }),
                                              ],
                                            },
                                            'scrollable-grid-item-5',
                                          ),
                                          gridItemFactory(
                                            {
                                              size: 12,
                                              componentChildren: [
                                                alertFactory({
                                                  title:
                                                    'I need more space I need more space I need more space I need more space I need more space',
                                                }),
                                              ],
                                            },
                                            'scrollable-grid-item-6',
                                          ),
                                          gridItemFactory(
                                            {
                                              size: 12,
                                              componentChildren: [
                                                alertFactory({
                                                  title:
                                                    'I need more space I need more space I need more space I need more space I need more space',
                                                }),
                                              ],
                                            },
                                            'scrollable-grid-item-7',
                                          ),
                                          gridItemFactory(
                                            {
                                              size: 12,
                                              componentChildren: [
                                                alertFactory({
                                                  title:
                                                    'I need more space I need more space I need more space I need more space I need more space',
                                                }),
                                              ],
                                            },
                                            'scrollable-grid-item-8',
                                          ),
                                        ],
                                      }),
                                    ],
                                  },
                                  'panel-group-item-1',
                                ),
                                panelGroupItemFactory(
                                  {
                                    componentChildren: [
                                      gridFactory({
                                        items: [
                                          gridItemFactory(
                                            {
                                              size: 12,
                                              componentChildren: [
                                                alertFactory({
                                                  title:
                                                    'I need more space I need more space I need more space I need more space I need more space',
                                                }),
                                              ],
                                            },
                                            'scrollable-grid-item-1',
                                          ),
                                          gridItemFactory(
                                            {
                                              size: 12,
                                              componentChildren: [
                                                alertFactory({
                                                  title:
                                                    'I need more space I need more space I need more space I need more space I need more space',
                                                }),
                                              ],
                                            },
                                            'scrollable-grid-item-2',
                                          ),
                                          gridItemFactory(
                                            {
                                              size: 12,
                                              componentChildren: [
                                                alertFactory({
                                                  title:
                                                    'I need more space I need more space I need more space I need more space I need more space',
                                                }),
                                              ],
                                            },
                                            'scrollable-grid-item-3',
                                          ),
                                          gridItemFactory(
                                            {
                                              size: 12,
                                              componentChildren: [
                                                alertFactory({
                                                  title:
                                                    'I need more space I need more space I need more space I need more space I need more space',
                                                }),
                                              ],
                                            },
                                            'scrollable-grid-item-4',
                                          ),
                                          gridItemFactory(
                                            {
                                              size: 12,
                                              componentChildren: [
                                                alertFactory({
                                                  title:
                                                    'I need more space I need more space I need more space I need more space I need more space I need more space I need more space I need more space I need more space I need more space',
                                                }),
                                              ],
                                            },
                                            'scrollable-grid-item-5',
                                          ),
                                          gridItemFactory(
                                            {
                                              size: 12,
                                              componentChildren: [
                                                alertFactory({
                                                  title:
                                                    'I need more space I need more space I need more space I need more space I need more space',
                                                }),
                                              ],
                                            },
                                            'scrollable-grid-item-6',
                                          ),
                                          gridItemFactory(
                                            {
                                              size: 12,
                                              componentChildren: [
                                                alertFactory({
                                                  title:
                                                    'I need more space I need more space I need more space I need more space I need more space',
                                                }),
                                              ],
                                            },
                                            'scrollable-grid-item-7',
                                          ),
                                          gridItemFactory(
                                            {
                                              size: 12,
                                              componentChildren: [
                                                alertFactory({
                                                  title:
                                                    'I need more spaceI need more space I need more space I need more space I need more space',
                                                }),
                                              ],
                                            },
                                            'scrollable-grid-item-8',
                                          ),
                                        ],
                                      }),
                                    ],
                                  },
                                  'panel-group-item-2',
                                ),
                              ],
                            },
                            'scrollable-panel-group',
                          ),
                        ],
                        footerChildren: [
                          gridFactory({
                            items: [
                              gridItemFactory(
                                {
                                  size: 12,
                                  componentChildren: [
                                    buttonFactory({
                                      size: 'medium',
                                      text: 'direction: vertical',
                                      color: 'success',
                                      corner: 'rounded',
                                      onClick: [
                                        {
                                          type: 'request',
                                          data: {
                                            action: 'reflect',
                                            reflectedData: patchFactory([
                                              {
                                                targetSfId: 'scrollable-panel-group',
                                                operation: 'write',
                                                path: 'props.direction',
                                                value: 'vertical',
                                              },
                                            ]),
                                          },
                                        },
                                      ],
                                    }),
                                    buttonFactory({
                                      size: 'medium',
                                      text: 'direction: horizontal',
                                      color: 'success',
                                      corner: 'rounded',
                                      onClick: [
                                        {
                                          type: 'request',
                                          data: {
                                            action: 'reflect',
                                            reflectedData: patchFactory([
                                              {
                                                targetSfId: 'scrollable-panel-group',
                                                operation: 'write',
                                                path: 'props.direction',
                                                value: 'horizontal',
                                              },
                                            ]),
                                          },
                                        },
                                      ],
                                    }),
                                  ],
                                },
                                'direction-buttons',
                              ),
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
                        title: 'Closing behaviour PanelGroupItems',
                        bodyChildren: [
                          panelGroupFactory(
                            {
                              fullHeight: false,
                              direction: 'horizontal',
                              defaultThreshold: 'small',
                              items: [
                                panelGroupItemFactory(
                                  {
                                    componentChildren: [
                                      alertFactory({
                                        title: 'I need more space',
                                      }),
                                    ],
                                  },
                                  'panel-group-item-1',
                                ),
                                panelGroupItemFactory(
                                  {
                                    componentChildren: [
                                      alertFactory({
                                        title: 'I want to stretch',
                                      }),
                                    ],
                                  },
                                  'panel-group-item-2',
                                ),
                                panelGroupItemFactory(
                                  {
                                    componentChildren: [
                                      alertFactory({
                                        title: 'I am hungry',
                                      }),
                                    ],
                                  },
                                  'panel-group-item-3',
                                ),
                                panelGroupItemFactory(
                                  {
                                    componentChildren: [
                                      alertFactory({
                                        title: 'Freedooooom!',
                                      }),
                                    ],
                                  },
                                  'panel-group-item-4',
                                ),
                              ],
                            },
                            'closing-behaviour-panel-group',
                          ),
                        ],
                        footerChildren: [
                          gridFactory({
                            items: [
                              gridItemFactory(
                                {
                                  size: 12,
                                  componentChildren: [
                                    buttonFactory({
                                      size: 'medium',
                                      text: 'direction: vertical',
                                      color: 'success',
                                      corner: 'rounded',
                                      onClick: [
                                        {
                                          type: 'request',
                                          data: {
                                            action: 'reflect',
                                            reflectedData: patchFactory([
                                              {
                                                targetSfId: 'closing-behaviour-panel-group',
                                                operation: 'write',
                                                path: 'props.direction',
                                                value: 'vertical',
                                              },
                                            ]),
                                          },
                                        },
                                      ],
                                    }),
                                    buttonFactory({
                                      size: 'medium',
                                      text: 'direction: horizontal',
                                      color: 'success',
                                      corner: 'rounded',
                                      onClick: [
                                        {
                                          type: 'request',
                                          data: {
                                            action: 'reflect',
                                            reflectedData: patchFactory([
                                              {
                                                targetSfId: 'closing-behaviour-panel-group',
                                                operation: 'write',
                                                path: 'props.direction',
                                                value: 'horizontal',
                                              },
                                            ]),
                                          },
                                        },
                                      ],
                                    }),
                                  ],
                                },
                                'direction-buttons',
                              ),
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
                        title: 'Responsive PanelGroup',
                        bodyChildren: [
                          panelGroupFactory(
                            {
                              fullHeight: false,
                              direction: {
                                xl: 'vertical',
                                lg: 'horizontal',
                                md: 'vertical',
                                sm: 'horizontal',
                                xs: 'vertical',
                              },
                              defaultThreshold: 'small',
                              items: [
                                panelGroupItemFactory(
                                  {
                                    componentChildren: [
                                      alertFactory({
                                        title: 'xs: vert',
                                      }),
                                    ],
                                  },
                                  'panel-group-item-1',
                                ),
                                panelGroupItemFactory(
                                  {
                                    componentChildren: [
                                      alertFactory({
                                        title: 'sm: horz',
                                      }),
                                    ],
                                  },
                                  'panel-group-item-2',
                                ),
                                panelGroupItemFactory(
                                  {
                                    componentChildren: [
                                      alertFactory({
                                        title: 'md: vert',
                                      }),
                                    ],
                                  },
                                  'panel-group-item-3',
                                ),
                                panelGroupItemFactory(
                                  {
                                    componentChildren: [
                                      alertFactory({
                                        title: 'lg: horz',
                                      }),
                                    ],
                                  },
                                  'panel-group-item-4',
                                ),
                                panelGroupItemFactory(
                                  {
                                    size: 50,
                                    componentChildren: [
                                      alertFactory({
                                        title: 'xl: vert',
                                      }),
                                      panelGroupFactory(
                                        {
                                          direction: {
                                            lg: 'vertical',
                                            md: 'horizontal',
                                            xs: 'vertical',
                                          },
                                          items: [
                                            panelGroupItemFactory(
                                              {
                                                componentChildren: [
                                                  alertFactory({
                                                    title: 'lg & xs: vert, md: horz',
                                                    color: 'danger',
                                                  }),
                                                ],
                                              },
                                              'panel-nested-1',
                                            ),
                                            panelGroupItemFactory(
                                              {
                                                componentChildren: [
                                                  alertFactory({
                                                    title: '<=md: horz',
                                                    color: 'danger',
                                                  }),
                                                ],
                                              },
                                              'panel-nested-2',
                                            ),
                                          ],
                                        },
                                        'responsive-panel-group-nested',
                                      ),
                                    ],
                                  },
                                  'panel-group-item-5',
                                ),
                              ],
                            },
                            'responsive-panel-group',
                          ),
                        ],
                        footerChildren: [
                          gridFactory({
                            items: [
                              gridItemFactory(
                                {
                                  size: 12,
                                  componentChildren: [
                                    buttonFactory({
                                      size: 'medium',
                                      text: 'direction: vertical',
                                      color: 'success',
                                      corner: 'rounded',
                                      onClick: [
                                        {
                                          type: 'request',
                                          data: {
                                            action: 'reflect',
                                            reflectedData: patchFactory([
                                              {
                                                targetSfId: 'responsive-panel-group',
                                                operation: 'write',
                                                path: 'props.direction',
                                                value: 'vertical',
                                              },
                                            ]),
                                          },
                                        },
                                      ],
                                    }),
                                    buttonFactory({
                                      size: 'medium',
                                      text: 'direction: horizontal',
                                      color: 'success',
                                      corner: 'rounded',
                                      onClick: [
                                        {
                                          type: 'request',
                                          data: {
                                            action: 'reflect',
                                            reflectedData: patchFactory([
                                              {
                                                targetSfId: 'responsive-panel-group',
                                                operation: 'write',
                                                path: 'props.direction',
                                                value: 'horizontal',
                                              },
                                            ]),
                                          },
                                        },
                                      ],
                                    }),
                                    buttonFactory({
                                      size: 'medium',
                                      text: `direction: { xs: vert, sm: horz, md: vert, lg: horz,, xl: vert}`,
                                      color: 'success',
                                      corner: 'rounded',
                                      onClick: [
                                        {
                                          type: 'request',
                                          data: {
                                            action: 'reflect',
                                            reflectedData: patchFactory([
                                              {
                                                targetSfId: 'responsive-panel-group',
                                                operation: 'write',
                                                path: 'props.direction',
                                                value: {
                                                  xl: 'vertical',
                                                  lg: 'horizontal',
                                                  md: 'vertical',
                                                  sm: 'horizontal',
                                                  xs: 'vertical',
                                                },
                                              },
                                            ]),
                                          },
                                        },
                                      ],
                                    }),
                                  ],
                                },
                                'direction-buttons',
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
          },
          footer,
        }),
      ],
    }),
  ],
});
