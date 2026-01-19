// @ts-check

import { buttonFactory } from '../../../../shared/smartFaceComponentFactories/core/buttonFactory.js';
import { cardFactory } from '../../../../shared/smartFaceComponentFactories/core/cardFactory.js';
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { iframeFactory } from '../../../../shared/smartFaceComponentFactories/core/iframeFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { patchFactory } from '../shared/patchFactory.js';
import { sidebar } from '../shared/sidebar.js';

/**
 * @type { import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType }
 */

export const iframeFullHeightPage = smartFaceFactory({
  sfComponents: [
    pageFactory({
      componentChildren: [
        classicLayoutFactory({
          sidebar: sidebar('iframe-full-height-page', ['component-pages']),
          content: {
            componentChildren: [
              cardFactory({
                fullHeight: true,
                bodyChildren: [
                  iframeFactory(
                    {
                      title: 'SCF Webseite',
                      src: 'https://www.scfreiburg.com/',
                    },
                    'iframe-full-height',
                  ),
                ],
                footerChildren: [
                  buttonFactory({
                    size: 'medium',
                    text: 'Full Height',
                    color: 'success',
                    corner: 'rounded',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: patchFactory([
                            {
                              targetSfId: `iframe-full-height`,
                              operation: 'write',
                              path: 'props.fullHeight',
                              value: true,
                            },
                          ]),
                        },
                      },
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
