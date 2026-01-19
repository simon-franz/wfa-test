// @ts-check
import { buttonFactory } from '../../../../shared/smartFaceComponentFactories/core/buttonFactory.js';
import { cardFactory } from '../../../../shared/smartFaceComponentFactories/core/cardFactory.js';
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { gridFactory, gridItemFactory } from '../../../../shared/smartFaceComponentFactories/core/gridFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { patchFactory } from '../shared/patchFactory.js';

/**
 * @type { import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType }
 */
export const mobxPage = smartFaceFactory({
  sfComponents: [
    pageFactory({
      document: { head: { title: 'Mobx Page' } },
      componentChildren: [
        classicLayoutFactory({
          content: {
            componentChildren: [
              gridFactory({
                items: [
                  gridItemFactory({
                    size: 12,
                    componentChildren: [
                      cardFactory(
                        {
                          bodyChildren: [
                            gridFactory({
                              items: [
                                gridItemFactory(
                                  {
                                    size: 12,
                                    componentChildren: [
                                      buttonFactory(
                                        {
                                          text: 'Change value',
                                          onClick: [
                                            {
                                              type: 'request',
                                              data: {
                                                action: 'reflect',
                                                reflectedData: patchFactory([
                                                  {
                                                    targetSfId: 'button-1',
                                                    operation: 'write',
                                                    path: 'props.color',
                                                    value: 'danger',
                                                  },
                                                  {
                                                    targetSfId: 'button-1',
                                                    operation: 'write',
                                                    path: 'props.text',
                                                    value: 'Lorem Ipsum',
                                                  },
                                                  /* {
                                                    targetSfId: 'griditem-1',
                                                    operation: 'append',
                                                    path: 'props.componentChildren',
                                                    value: buttonFactory({}),
                                                  },  */
                                                ]),
                                              },
                                            },
                                          ],
                                        },
                                        'button-1',
                                      ),
                                    ],
                                  },
                                  'griditem-1',
                                ),
                              ],
                            }),
                          ],
                        },
                        'card-1',
                      ),
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
