// @ts-check
import {
  onboardingControllerFactory,
  onboardingControllerItemFactory,
} from '../../../../../shared/smartFaceComponentFactories/application/onboarding/onboardingControllerFactory.js';
import { onboardingLoginPageFactory } from '../../../../../shared/smartFaceComponentFactories/application/onboarding/onboardingLoginPageFactory.js';
import { buttonFactory } from '../../../../../shared/smartFaceComponentFactories/core/buttonFactory.js';
import { gridFactory, gridItemFactory } from '../../../../../shared/smartFaceComponentFactories/core/gridFactory.js';
import { keyDownSideEffectFactory } from '../../../../../shared/smartFaceComponentFactories/core/keyDownSideEffectFactory.js';
import { pageFactory } from '../../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { passwordFieldFactory } from '../../../../../shared/smartFaceComponentFactories/core/passwordFieldFactory.js';
import { smartFaceFactory } from '../../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';

/**
 * @type { import('../../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType }
 */
export const onboardingPage = smartFaceFactory({
  sfComponents: [
    pageFactory({
      document: { head: { title: 'OnboardingController Page' } },
      componentChildren: [
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
                      type: 'addNotification',
                      id: 'debug-notification',
                      message: 'Notification triggert',
                      dismissible: true,
                      duration: 'infinite',
                      onDismiss: [
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
                                      data: {
                                        action: 'debug',
                                        eventId: '2',
                                      },
                                    },
                                  ],
                                },
                              ],
                            },
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
        onboardingControllerFactory(
          {
            activeItemSfId: '0',
            logo: {
              src: 'https://d9yw7530xbzu.cloudfront.net/assets/HRW_Logo_mit_Claim_Farbe.png',
              alt: 'logo',
              href: '#',
            },
            onBeforeNavigation: [
              {
                type: 'request',
                blockUi: true,
                data: {
                  backendLoad: 1000,
                },
              },
            ],
            imprintUrl: 'https://www.hrworks.de/',
            items: [
              onboardingControllerItemFactory(
                {
                  componentChildren: [
                    onboardingLoginPageFactory({
                      heading: 'Willkommen bei HRworks',
                      componentChildren: [
                        gridFactory({
                          items: [
                            gridItemFactory({
                              componentChildren: [
                                passwordFieldFactory(
                                  {
                                    label: 'Passwort',
                                    name: 'passwort',
                                    value: '',
                                    placeholder: 'Passwort',
                                    helpText:
                                      'Bitte geben Sie das Ihnen mitgeteilte Passwort an, um mit Ihrem Onboarding fortzufahren.',
                                  },
                                  'text-field-0',
                                ),
                              ],
                            }),
                            gridItemFactory({
                              componentChildren: [
                                buttonFactory({
                                  fullWidth: true,
                                  text: 'Weiter',
                                  onClick: [
                                    {
                                      type: 'request',
                                      data: { action: 'onboarding-page', pageEvent: 'login' },
                                    },
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
                '0',
              ),
            ],
          },
          'onboarding-controller-0',
          'data-guide-test',
        ),
      ],
    }),
  ],
  sideEffects: [
    {
      type: 'addNotification',
      id: 'notification-0',
      message: 'A simple notification',
      // duration: 'infinite',
    },
  ],
});
