// @ts-check

import { buttonFactory } from '#shared/smartFaceComponentFactories/core/buttonFactory';
import { cardFactory } from '#shared/smartFaceComponentFactories/core/cardFactory';
import { gridFactory, gridItemFactory } from '#shared/smartFaceComponentFactories/core/gridFactory';

import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { fontAwesomeIconFactory } from '../../../../shared/smartFaceComponentFactories/core/fontAwesomeIconFactory.js';
import { imageFactory } from '../../../../shared/smartFaceComponentFactories/core/imageFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import {
  fortuneWheelFactory,
  fortuneWheelItemFactory,
} from '../../../../shared/smartFaceComponentFactories/extension/fortuneWheelFactory.js';
import { footer } from '../shared/footer.js';
import { patchFactory } from '../shared/patchFactory.js';
import { sidebar } from '../shared/sidebar.js';

/**
 * @type { import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType }
 */
export const fortuneWheelPage = smartFaceFactory({
  sfComponents: [
    pageFactory({
      document: { head: { title: 'Fortune Wheel Page' } },
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
                        title: 'Fortune Wheel',
                        bodyChildren: [
                          buttonFactory({
                            text: 'Un-Jinx First Item',
                            onClick: [
                              {
                                type: 'request',
                                data: {
                                  action: 'reflect',
                                  reflectedData: patchFactory([
                                    {
                                      targetSfId: 'Jinx',
                                      operation: 'write',
                                      path: 'props.text',
                                      value: ' Nicht-Jinx',
                                    },
                                  ]),
                                },
                              },
                            ],
                          }),
                          fortuneWheelFactory({
                            color: 'alternating',
                            onSpinComplete: [
                              {
                                type: 'request',
                                data: {
                                  action: 'reflect',
                                  reflectedData: {
                                    sideEffects: [
                                      {
                                        type: 'addNotification',
                                        id: 'notification-test',
                                        title: 'Winner Found',
                                        message: 'A winner was found',
                                        duration: 'infinite',
                                      },
                                    ],
                                  },
                                },
                              },
                            ],
                            items: [
                              fortuneWheelItemFactory(
                                { text: 'Jinx', media: imageFactory({ corner: 'rounded' }) },
                                'Jinx',
                              ),
                              fortuneWheelItemFactory({
                                text: 'OdinAngelJens',
                                media: fontAwesomeIconFactory({ name: 'file' }),
                              }),
                              fortuneWheelItemFactory({ text: 'Frodo', media: imageFactory({ corner: 'rounded' }) }),
                              fortuneWheelItemFactory({
                                text: 'Dingus',
                                media: fontAwesomeIconFactory({ name: 'globe' }),
                              }),
                              fortuneWheelItemFactory({
                                text: 'Emperor Palpatine',
                                media: imageFactory({ corner: 'rounded' }),
                              }),
                              fortuneWheelItemFactory({
                                text: 'Mr. Inkognito',
                                media: fontAwesomeIconFactory({ name: 'hand' }),
                              }),
                              fortuneWheelItemFactory({
                                text: 'Robin Hood',
                                media: imageFactory({ corner: 'rounded' }),
                              }),
                              fortuneWheelItemFactory({
                                text: 'Benjamin Blümchen',
                                media: fontAwesomeIconFactory({ name: 'user' }),
                              }),
                              fortuneWheelItemFactory({
                                text: 'El Nediro',
                                media: imageFactory({ corner: 'rounded' }),
                              }),
                              fortuneWheelItemFactory({
                                text: 'Jango',
                                media: fontAwesomeIconFactory({ name: 'video' }),
                              }),
                              fortuneWheelItemFactory({
                                text: '|_oser J',
                                media: imageFactory({ corner: 'rounded' }),
                              }),
                              fortuneWheelItemFactory({
                                text: 'Batman',
                                media: fontAwesomeIconFactory({ name: 'pen' }),
                              }),
                              fortuneWheelItemFactory({
                                text: 'Commander',
                                media: imageFactory({ corner: 'rounded' }),
                              }),
                              fortuneWheelItemFactory({
                                text: 'Error 404 maybe?',
                                media: fontAwesomeIconFactory({ name: 'trash' }),
                              }),
                              fortuneWheelItemFactory({ text: 'Operator', media: imageFactory({ corner: 'rounded' }) }),
                              fortuneWheelItemFactory({
                                text: 'laaaaanger Name for the lolz',
                                media: fontAwesomeIconFactory({ name: 'info' }),
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
