// @ts-check

import { cardFactory } from '../../../../shared/smartFaceComponentFactories/core/cardFactory.js';
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { comboBoxFactory } from '../../../../shared/smartFaceComponentFactories/core/comboBoxFactory.js';
import { fontAwesomeIconFactory } from '../../../../shared/smartFaceComponentFactories/core/fontAwesomeIconFactory.js';
import { formFactory } from '../../../../shared/smartFaceComponentFactories/core/formFactory.js';
import { gridFactory, gridItemFactory } from '../../../../shared/smartFaceComponentFactories/core/gridFactory.js';
import { iconButtonFactory } from '../../../../shared/smartFaceComponentFactories/core/iconButtonFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { footer } from '../shared/footer.js';
import { sidebar } from '../shared/sidebar.js';

const allIcons = [
  'time-field-clock',
  'time-picker-angle-up',
  'time-picker-angle-down',
  'nested-checklist-expand-arrow',
  'accordion-item-arrow',
  'accordion-item-plus',
  'accordion-item-minus',
  'alert-close',
  'combo-box-delete',
  'modal-close',
  'select-down',
  'switch-off',
  'switch-on',
  'collapsible-menu-submenu-arrow',
  'hamburger-menu-bars',
  'dropdown-indicator-right',
  'dropdown-arrow-up',
  'dropdown-arrow-down',
  'combo-box-item-selected',
  'date-field-calendar',
  'calendar-angle-left',
  'calendar-angle-right',
  'combo-box-clear',
  'vertical-navigation-arrow-up',
  'vertical-navigation-arrow-down',
  'password-field-hide',
  'password-field-show',
  'file-manager-delete',
  'cmd-table-check',
  'cmd-table-link',
  'print',
  'onboarding-imprint',
  'section-toggle',
  'data-grid-boolean-false',
  'data-grid-boolean-true',
  'data-grid-columns',
  'data-grid-context-menu',
  'data-grid-context-menu-hide-column',
  'data-grid-density',
  'data-grid-expand',
  'data-grid-export',
  'data-grid-filter',
  'data-grid-pin-left',
  'data-grid-pin-right',
  'data-grid-sort-asc',
  'data-grid-sort-desc',
  'checkbox-check',
  'tree-graph-plus',
  'tree-graph-minus',
  'tree-graph-fit-view',
  'tree-graph-expand',
];

const allIconsFA = [
  'clock',
  'angle-up',
  'angle-down',
  'angle-down',
  'angle-down',
  'plus',
  'minus',
  'x',
  'x',
  'x',
  'angle-down',
  'x',
  'check',
  'angle-down',
  'bars',
  'angle-right',
  'angle-up',
  'angle-down',
  'check',
  'calendar',
  'angle-left',
  'angle-right',
  'x',
  'angle-up',
  'angle-down',
  'eye-slash',
  'eye',
  'x',
  'check',
  'arrow-up-right-from-square',
  'print',
  'circle-info',
  'angle-down',
  'x',
  'check',
  'line-columns',
  'ellipsis-vertical',
  'eye-slash',
  'line-height',
  'angle-right',
  'download',
  'filter',
  'thumbtack',
  'thumbtack',
  'arrow-up',
  'arrow-down',
  'check',
  'plus',
  'minus',
  'expand',
  'angle-down',
];

const allIconButtons = allIconsFA.map((icon, index) =>
  gridItemFactory(
    {
      size: 2,
      componentChildren: [
        iconButtonFactory({
          icon: fontAwesomeIconFactory({
            name: icon,
          }),
        }),
      ],
    },
    `${index}`,
  ),
);

const buttonsWithIcon = (icon) =>
  gridItemFactory({
    size: 6,
    componentChildren: [
      cardFactory({
        title: icon,
        bodyChildren: [
          iconButtonFactory({
            icon: fontAwesomeIconFactory({
              name: icon,
            }),
          }),
        ],
      }),
    ],
  });

const allIconButtonButtons = allIconsFA.map((icon) => buttonsWithIcon(icon));

/**
 * @type { import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType.js').SmartFaceBackendDataType }
 */
export const svgIconPage = smartFaceFactory({
  sfComponents: [
    pageFactory({
      document: { head: { title: 'Svg Icon Page' } },
      componentChildren: [
        classicLayoutFactory({
          sidebar: sidebar('svg-icon-page', ['form-pages']),
          content: {
            componentChildren: [
              gridFactory({
                items: [
                  gridItemFactory({
                    size: 6,
                    componentChildren: [
                      formFactory(
                        {
                          componentChildren: [
                            cardFactory({
                              title: 'Svg iconButtons',
                              bodyChildren: [
                                gridFactory({
                                  items: [...allIconButtons],
                                }),
                              ],
                            }),
                          ],
                        },
                        'form-0',
                      ),
                    ],
                  }),
                  gridItemFactory({
                    size: 6,
                    componentChildren: [
                      formFactory(
                        {
                          componentChildren: [
                            cardFactory({
                              title: 'Svg comboBox & buttons',
                              bodyChildren: [
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
                                    ...allIconButtonButtons,
                                  ],
                                }),
                              ],
                            }),
                          ],
                        },
                        'form-0',
                      ),
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
