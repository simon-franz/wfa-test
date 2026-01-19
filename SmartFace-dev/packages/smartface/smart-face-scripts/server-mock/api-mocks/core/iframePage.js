// @ts-check

import { cardFactory } from '../../../../shared/smartFaceComponentFactories/core/cardFactory.js';
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { gridFactory, gridItemFactory } from '../../../../shared/smartFaceComponentFactories/core/gridFactory.js';
import { iframeFactory } from '../../../../shared/smartFaceComponentFactories/core/iframeFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { footer } from '../shared/footer.js';
import { sidebar } from '../shared/sidebar.js';

const websiteUrl = 'https://scfreiburg.com';

/**
 * @type { import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType }
 */
export const iframePage = smartFaceFactory({
  sfComponents: [
    pageFactory({
      document: { head: { title: 'IFrame Page' } },
      componentChildren: [
        classicLayoutFactory({
          sidebar: sidebar('iframe-page', ['component-pages']),
          content: {
            componentChildren: [
              gridFactory({
                items: [
                  gridItemFactory({
                    size: 12,
                    componentChildren: [
                      cardFactory({
                        title: 'IFrame Example #1',
                        subtitle: ' Default',
                        bodyChildren: [
                          iframeFactory(
                            {
                              title: 'HRworks Webseite',
                              src: websiteUrl,
                            },
                            undefined,
                            'data-guide-test',
                          ),
                        ],
                      }),
                    ],
                  }),
                  gridItemFactory({
                    size: 12,
                    componentChildren: [
                      cardFactory({
                        title: 'IFrame Example #2',
                        subtitle: ' Displaying a PDF file',
                        bodyChildren: [
                          iframeFactory({
                            title: 'Dyson v15 Detect PDF Test',
                            src: 'https://d9yw7530xbzu.cloudfront.net/assets/V15DetectUserManual.pdf',
                          }),
                        ],
                      }),
                    ],
                  }),
                  gridItemFactory({
                    size: 12,
                    componentChildren: [
                      cardFactory({
                        title: 'IFrame Example #3',
                        subtitle: ' Overwrite src by srcdoc',
                        bodyChildren: [
                          iframeFactory({
                            title: 'Iframe example 4',
                            src: 'https://d9yw7530xbzu.cloudfront.net/assets/V15DetectUserManual.pdf',
                            srcDoc:
                              '<h1 style="color:blue;">A Blue Heading</h1><p style="color:red;">A red paragraph.</p>',
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
