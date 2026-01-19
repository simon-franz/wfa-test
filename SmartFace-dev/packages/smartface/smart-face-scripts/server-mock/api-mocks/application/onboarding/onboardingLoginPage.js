// @ts-check
import { onboardingLoginPageFactory } from '../../../../../shared/smartFaceComponentFactories/application/onboarding/onboardingLoginPageFactory.js';
import { buttonFactory } from '../../../../../shared/smartFaceComponentFactories/core/buttonFactory.js';
import { gridFactory, gridItemFactory } from '../../../../../shared/smartFaceComponentFactories/core/gridFactory.js';
import { pageFactory } from '../../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { passwordFieldFactory } from '../../../../../shared/smartFaceComponentFactories/core/passwordFieldFactory.js';
import { smartFaceFactory } from '../../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { textFactory } from '../../../../../shared/smartFaceComponentFactories/core/textFactory.js';
import { splitLayoutFactory } from '../../../../../shared/smartFaceComponentFactories/extension/splitLayoutFactory.js';

/**
 * @type { import('../../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType }
 */
export const onboardingLoginPage = smartFaceFactory({
  sfComponents: [
    pageFactory({
      document: { head: { title: 'Login' } },
      componentChildren: [
        splitLayoutFactory(
          {
            componentChildren: [
              onboardingLoginPageFactory(
                {
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
                              },
                              'text-field-0',
                            ),
                          ],
                        }),
                        gridItemFactory({
                          componentChildren: [
                            textFactory({
                              text: 'Bitte geben Sie das Ihnen mitgeteilte Passwort an, um mit Ihrem Onboarding fortzufahren.',
                              fontSize: 'small',
                            }),
                          ],
                        }),
                        gridItemFactory({
                          componentChildren: [buttonFactory({ fullWidth: true, text: 'Weiter' })],
                        }),
                      ],
                    }),
                  ],
                },
                undefined,
                'data-guide-test',
              ),
            ],
          },
          undefined,
          'data-guide-test',
        ),
      ],
    }),
  ],
});
