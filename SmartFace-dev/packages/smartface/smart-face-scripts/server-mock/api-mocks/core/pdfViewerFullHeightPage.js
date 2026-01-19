// @ts-check

import { buttonFactory } from '../../../../shared/smartFaceComponentFactories/core/buttonFactory.js';
import { cardFactory } from '../../../../shared/smartFaceComponentFactories/core/cardFactory.js';
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import {
  flexboxFactory,
  flexboxItemFactory,
} from '../../../../shared/smartFaceComponentFactories/core/flexboxFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { pdfViewerFactory } from '../../../../shared/smartFaceComponentFactories/extension/pdfViewerFactory.js';
import { patchFactory } from '../shared/patchFactory.js';

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
            targetSfId: `pdfViewer-full-height`,
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
            targetSfId: `pdfViewer-full-height`,
            operation: 'write',
            path: 'props.fullHeight',
            value: false,
          },
        ]),
      },
    },
  ],
});

/**
 * @type { import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType }
 */
export const pdfViewerFullHeightPage = smartFaceFactory({
  sfComponents: [
    pageFactory({
      componentChildren: [
        classicLayoutFactory({
          content: {
            componentChildren: [
              cardFactory({
                fullHeight: true,
                bodyChildren: [
                  pdfViewerFactory(
                    {
                      url: 'https://d9yw7530xbzu.cloudfront.net/assets/V15DetectUserManual.pdf',
                    },
                    'pdfViewer-full-height',
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
