// @ts-check

import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { containerFactory } from '../../../../shared/smartFaceComponentFactories/core/containerFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { textFactory } from '../../../../shared/smartFaceComponentFactories/core/textFactory.js';
import { footer } from '../shared/footer.js';
import { sidebar } from '../shared/sidebar.js';

/**
 * @type { import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType }
 */
export const sessionExpiredPage = smartFaceFactory({
  sfComponents: [
    containerFactory({
      componentChildren: [
        pageFactory({
          document: { head: { title: 'Session Expired Test Page' } },
          componentChildren: [
            classicLayoutFactory({
              sidebar: sidebar('session-expired-page', ['side-effect-pages']),
              footer,
            }),
          ],
        }),
      ],
    }),
  ],
  // Here you can simulate several backend requests to figure out if only the first request is respected.
  sideEffects: [
    {
      type: 'sessionExpired',
      targetUrl: 'https://www.hrworks.de/login',
      // autoRedirectAfterMilliseconds: 8000
    },
    {
      type: 'sessionExpired',
      targetUrl: 'https://www.scfreiburg.com/',
      autoRedirectAfterMilliseconds: 8000,
    },
    {
      type: 'sessionExpired',
      targetUrl: 'http://eelslap.com/',
      autoRedirectAfterMilliseconds: 3000,
    },
  ],
});
