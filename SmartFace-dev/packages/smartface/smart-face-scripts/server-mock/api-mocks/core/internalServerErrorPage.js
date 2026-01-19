// @ts-check

import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { containerFactory } from '../../../../shared/smartFaceComponentFactories/core/containerFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { footer } from '../shared/footer.js';
import { sidebar } from '../shared/sidebar.js';

/**
 * @type { import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType }
 */
export const internalServerErrorPage = smartFaceFactory({
  sfComponents: [
    containerFactory({
      componentChildren: [
        pageFactory({
          document: { head: { title: 'Internal Server Error Page' } },
          componentChildren: [
            classicLayoutFactory({
              sidebar: sidebar('internal-server-error-page', ['side-effect-pages']),
              footer,
            }),
          ],
        }),
      ],
    }),
  ],
  sideEffects: [
    { type: 'showInternalError', title: 'Error Title', html: true, message: '<h1>Something happened</h1>' },
  ],
});
