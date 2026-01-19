// @ts-check

import { buttonFactory } from '../../../../shared/smartFaceComponentFactories/core/buttonFactory.js';
import { cardFactory } from '../../../../shared/smartFaceComponentFactories/core/cardFactory.js';
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import {
  flexboxFactory,
  flexboxItemFactory,
} from '../../../../shared/smartFaceComponentFactories/core/flexboxFactory.js';
import { fontAwesomeIconFactory } from '../../../../shared/smartFaceComponentFactories/core/fontAwesomeIconFactory.js';
import { iconButtonFactory } from '../../../../shared/smartFaceComponentFactories/core/iconButtonFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import {
  dataFactory,
  dataRowFactory,
  headerFactory,
  headerRowFactory,
  tableFactory,
} from '../../../../shared/smartFaceComponentFactories/core/tableFactory.js';
import { textFactory } from '../../../../shared/smartFaceComponentFactories/core/textFactory.js';
import { patchFactory } from '../shared/patchFactory.js';
import times from 'lodash/times.js';

const fullHeightOn = buttonFactory({
  size: 'medium',
  text: 'Full Height On',
  color: 'success',
  corner: 'rounded',
  onClick: [
    {
      type: 'request',
      data: {
        action: 'reflect',
        reflectedData: patchFactory([
          {
            targetSfId: `table-full-height`,
            operation: 'write',
            path: 'props.fullHeight',
            value: true,
          },
        ]),
      },
    },
  ],
});

const fullHeightOff = buttonFactory({
  size: 'medium',
  text: 'Full Height Off',
  color: 'danger',
  corner: 'rounded',
  onClick: [
    {
      type: 'request',
      data: {
        action: 'reflect',
        reflectedData: patchFactory([
          {
            targetSfId: `table-full-height`,
            operation: 'write',
            path: 'props.fullHeight',
            value: false,
          },
        ]),
      },
    },
  ],
});

const getRows = (amount = 20) =>
  times(amount, () =>
    dataRowFactory({
      cells: [
        dataFactory({
          componentChildren: [textFactory({ text: 'Id' })],
        }),
        dataFactory({
          componentChildren: [textFactory({ text: 'Very very very very very very long Description' })],
        }),
        dataFactory({
          componentChildren: [
            buttonFactory({
              variant: 'link',
              text: 'Link',
              onClick: [
                {
                  type: 'request',
                  data: {
                    action: 'reflect',
                    reflectedData: {
                      sideEffects: [{ type: 'consoleMessage', message: 'Clicked' }],
                    },
                  },
                },
              ],
            }),
          ],
        }),
        dataFactory({
          componentChildren: [textFactory({ text: 'Other data' })],
        }),
        dataFactory({
          componentChildren: [textFactory({ text: 'Other data' })],
        }),
        dataFactory({
          componentChildren: [
            iconButtonFactory({
              onClick: [
                {
                  type: 'request',
                  data: {
                    action: 'reflect',
                    reflectedData: {
                      sideEffects: [{ type: 'consoleMessage', message: 'Clicked' }],
                    },
                  },
                },
              ],
            }),
          ],
        }),
        dataFactory({
          componentChildren: [fontAwesomeIconFactory()],
        }),
      ],
    }),
  );

/**
 * @type { import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType }
 */

export const tableFullHeightPage = smartFaceFactory({
  sfComponents: [
    pageFactory({
      componentChildren: [
        classicLayoutFactory({
          content: {
            componentChildren: [
              cardFactory({
                fullHeight: true,
                bodyChildren: [
                  tableFactory(
                    {
                      alternatingColors: true,
                      hoverable: true,
                      stickyHead: true,
                      headerRows: [
                        headerRowFactory({
                          cells: [
                            headerFactory({
                              componentChildren: [textFactory({ text: 'Big' })],
                            }),
                            headerFactory({
                              componentChildren: [textFactory({ text: 'Data' })],
                            }),
                            headerFactory({
                              componentChildren: [textFactory({ text: 'Test' })],
                            }),
                            headerFactory({
                              componentChildren: [textFactory({ text: 'With' })],
                            }),
                            headerFactory({
                              componentChildren: [textFactory({ text: 'Many' })],
                            }),
                            headerFactory({
                              componentChildren: [textFactory({ text: 'Many' })],
                            }),
                            headerFactory({
                              componentChildren: [textFactory({ text: 'Data' })],
                            }),
                          ],
                        }),
                      ],
                      dataRows: getRows(),
                    },
                    'table-full-height',
                  ),
                ],
                footerChildren: [
                  flexboxFactory({
                    items: [
                      flexboxItemFactory({
                        componentChildren: [fullHeightOn],
                      }),
                      flexboxItemFactory({
                        componentChildren: [fullHeightOff],
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
