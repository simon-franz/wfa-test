// @ts-check
import { cardFactory } from '#shared/smartFaceComponentFactories/core/cardFactory';
import {
  dataFactory,
  dataRowFactory,
  headerFactory,
  headerRowFactory,
  tableFactory,
} from '#shared/smartFaceComponentFactories/core/tableFactory';

import {
  accordionFactory,
  accordionItemFactory,
} from '../../../../shared/smartFaceComponentFactories/core/accordionFactory.js';
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { fontAwesomeIconFactory } from '../../../../shared/smartFaceComponentFactories/core/fontAwesomeIconFactory.js';
import { gridFactory, gridItemFactory } from '../../../../shared/smartFaceComponentFactories/core/gridFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { switchFactory } from '../../../../shared/smartFaceComponentFactories/core/switchFactory.js';
import { textFactory } from '../../../../shared/smartFaceComponentFactories/core/textFactory.js';
import { tooltipFactory } from '../../../../shared/smartFaceComponentFactories/core/tooltipFactory.js';
import { footer } from '../shared/footer.js';
import { sidebar } from '../shared/sidebar.js';
import times from 'lodash/times.js';

const validationStates = ['default', 'success', 'warning', 'danger'];
const sizes = ['extraSmall', 'small', 'medium', 'large', 'extraLarge'];

// CHECKBOX ----------------------------------------------------------
const generateSwitch = (id, size, state, gridItemSize = 12, disabled) => {
  return gridItemFactory({
    size: gridItemSize,
    componentChildren: [
      switchFactory(
        {
          label: `${state}`,
          name: `switch-${id}`,
          size: `${size}`,
          'aria-label': `switch ${state}`,
          validationState: state === 'default' ? undefined : `${state}`,
          validationMessage: state === 'default' ? undefined : `Validation Message: ${state}`,
          disabled: disabled,
          helpText: 'Helper',
          labelChildren: [
            tooltipFactory({
              componentChildren: [fontAwesomeIconFactory()],
              text: 'Your information could be displayed here',
            }),
            tooltipFactory({
              componentChildren: [fontAwesomeIconFactory()],
              text: 'Your information could be displayed here',
            }),
          ],
          icon: true,
          onValueChange: [
            {
              type: 'request',
              blockUi: false,
              data: {
                action: 'switch-page',
                targetId: `switch-${id}`,
                pageEvent: 'on-value-change',
              },
            },
          ],
        },
        `switch-${id}`,
        'data-guide-test',
      ),
    ],
  });
};

const generateSwitchAccContent = () => {
  let switches = [];
  let switchRow = [];
  sizes.forEach((size, indexSizes) => {
    validationStates.forEach((state, indexVariant) => {
      switchRow.push(generateSwitch(indexSizes + '-' + indexVariant, size, state, 3));
    });
    switches.push(
      gridItemFactory({
        componentChildren: [gridFactory({ items: [...switchRow] })],
      }),
    );
    switchRow = [];
  });

  return switches;
};
const generateSwitchDisabledAccContent = () => {
  let switches = [];
  let switchRow = [];
  validationStates.forEach((state, indexVariant) => {
    switchRow.push(generateSwitch('disabled' + '-' + indexVariant, 'medium', state, 3, true));
  });
  switches.push(
    gridItemFactory({
      componentChildren: [gridFactory({ items: [...switchRow] })],
    }),
  );

  return switches;
};
const generateSwitchJustifyContent = () => {
  const justifyContentOptions = ['flex-start', 'flex-end', 'center', 'space-between', undefined];

  return justifyContentOptions.map((option, index) =>
    gridItemFactory({
      size: 12,
      componentChildren: [
        switchFactory(
          {
            label: `${option || 'undefined'}`,
            size: 'medium',
            'aria-label': `justify content ${option || 'undefined'}`,
            helpText: `Set justifyContent to ${option || 'undefined'}`,
            justifyContent: option,
          },
          `justify-content-${index}`,
          'switch-justifyContent-test',
        ),
      ],
    }),
  );
};

const getRows = (amount = 1) =>
  times(amount, () =>
    dataRowFactory({
      onClick: [
        {
          type: 'request',
          data: {
            action: 'reflect',
            reflectedData: {
              sideEffects: [
                {
                  type: 'addNotification',
                  message: 'This will open a Modal in Production',
                },
              ],
            },
          },
        },
      ],
      cells: [
        dataFactory({
          componentChildren: [switchFactory({ label: 'flex-start', justifyContent: 'flex-start' })],
        }),
        dataFactory({
          componentChildren: [switchFactory({ label: 'flex-end', justifyContent: 'flex-end' })],
        }),
        dataFactory({
          componentChildren: [switchFactory({ label: 'center', justifyContent: 'center' })],
        }),
        dataFactory({
          componentChildren: [switchFactory({ label: 'speac-between', justifyContent: 'space-between' })],
        }),
        dataFactory({
          componentChildren: [switchFactory({ label: 'default', justifyContent: 'default' })],
        }),
      ],
    }),
  );

/**
 * @type { import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType.js').SmartFaceBackendDataType }
 */
export const switchPage = smartFaceFactory({
  sfComponents: [
    pageFactory({
      document: { head: { title: 'Switch Page' } },
      componentChildren: [
        classicLayoutFactory({
          sidebar: sidebar('switch-page', ['form-pages']),
          content: {
            header: {
              fixed: 'never',
              componentChildren: [
                gridFactory({
                  items: [
                    gridItemFactory({
                      size: 'auto',
                      componentChildren: [
                        textFactory({
                          text: 'Switch Page',
                          fontSize: 'extraLarge',
                          fontWeight: 'bold',
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            },
            componentChildren: [
              gridFactory({
                items: [
                  // SWITCH
                  gridItemFactory({
                    componentChildren: [
                      accordionFactory({
                        expandedItemSfIds: ['a1'],
                        items: [
                          accordionItemFactory(
                            {
                              icon: undefined,
                              title: 'Switch - Sizes & Validationstates',
                              componentChildren: [gridFactory({ items: [...generateSwitchAccContent()] })],
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
                        expandedItemSfIds: ['a2'],
                        items: [
                          accordionItemFactory(
                            {
                              icon: undefined,
                              title: 'Switch - Disabled & Validationstates',
                              componentChildren: [gridFactory({ items: [...generateSwitchDisabledAccContent()] })],
                            },
                            'a2',
                          ),
                        ],
                      }),
                    ],
                  }),
                  gridItemFactory({
                    componentChildren: [
                      accordionFactory({
                        expandedItemSfIds: ['a3'],
                        items: [
                          accordionItemFactory(
                            {
                              icon: undefined,
                              title: 'Switch - All justifyContent options',
                              componentChildren: [gridFactory({ items: [...generateSwitchJustifyContent()] })],
                            },
                            'a3',
                          ),
                        ],
                      }),
                    ],
                  }),
                  gridItemFactory({
                    componentChildren: [
                      cardFactory({
                        title: 'Switch - All justifyContent options in a table',
                        bodyChildren: [
                          tableFactory(
                            {
                              alternatingColors: false,
                              hoverable: false,
                              stickyHead: true,
                              headerRows: [
                                headerRowFactory({
                                  cells: [
                                    headerFactory({
                                      componentChildren: [textFactory({ text: 'flext-start' })],
                                    }),
                                    headerFactory({
                                      componentChildren: [textFactory({ text: 'flex-end' })],
                                    }),
                                    headerFactory({
                                      componentChildren: [textFactory({ text: 'center' })],
                                    }),
                                    headerFactory({
                                      componentChildren: [textFactory({ text: 'space-between' })],
                                    }),
                                    headerFactory({
                                      componentChildren: [textFactory({ text: 'undefined' })],
                                    }),
                                  ],
                                }),
                              ],
                              dataRows: getRows(),
                            },
                            'big-data-table',
                          ),
                        ],
                        footerChildren: [
                          textFactory({
                            text: 'Footer',
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
