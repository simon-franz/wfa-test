// @ts-check

import { blankLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/blankLayoutFactory.js';
import { keyDownSideEffectFactory } from '../../../../shared/smartFaceComponentFactories/core/keyDownSideEffectFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { serverStatusFactory } from '../../../../shared/smartFaceComponentFactories/core/serverStatusFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { streamlineIconFactory } from '../../../../shared/smartFaceComponentFactories/core/streamlineIconFactory.js';

/**
 * @type { import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType }
 */
export const serverStatusPage = smartFaceFactory({
  sfComponents: [
    pageFactory({
      document: { head: { title: 'Server Status Page' } },
      componentChildren: [
        blankLayoutFactory({
          logo: {
            alt: 'HRworks Logo hier zu sehen.',
            title: 'HRworks',
            borderless: false,
            src: 'https://d9yw7530xbzu.cloudfront.net/assets/HRW_Logo_mit_Claim_Farbe.png',
            // src: 'https://placedog.net/600/100',
            // src: 'https://placedog.net/100/600',
            // src: 'https://placedog.net/100/50',
            // src: 'https://placedog.net/800/800',
            href: '#',
          },
          componentChildren: [
            serverStatusFactory({
              media: streamlineIconFactory(),
              statusCode: '404',
              title: 'UPS DA STIMMT WAS NICHT!',
              subtitle: 'DIESE SEITE KONNTE NICHT GEFUNDEN WERDEN',
            }),
            keyDownSideEffectFactory({
              shortcut: { key: 'F2' },
              onKeyDown: [
                {
                  type: 'request',
                  data: {
                    action: 'reflect',
                    reflectedData: {
                      sideEffects: [
                        {
                          type: 'addNotification',
                          id: 'notification-test',
                          title: 'Test',
                          message: 'Test notification',
                          duration: 'infinite',
                          color: 'success',
                        },
                      ],
                    },
                  },
                },
              ],
            }),
          ],
        }),
      ],
    }),
  ],

  sideEffects: [
    {
      type: 'addNotification',
      id: 'notification-1',
      title: 'Info',
      message: 'Press <b>"F2"</b> to trigger a test notification.',
      html: true,
      color: 'info',
      duration: 3500,
    },
  ],
});
