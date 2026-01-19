// @ts-check

import { buttonFactory } from '../../../../shared/smartFaceComponentFactories/core/buttonFactory.js';
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { gridFactory, gridItemFactory } from '../../../../shared/smartFaceComponentFactories/core/gridFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { textareaFactory } from '../../../../shared/smartFaceComponentFactories/core/textareaFactory.js';
import { footer } from '../shared/footer.js';
import { patchFactory } from '../shared/patchFactory.js';
import { sidebar } from '../shared/sidebar.js';

/**
 * @type { import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType }
 */

export const copyToClipboardPage = smartFaceFactory({
  sfComponents: [
    pageFactory({
      document: { head: { title: 'Component Page' } },
      componentChildren: [
        classicLayoutFactory({
          sidebar: sidebar('component-page', ['sidebarParent']),
          content: {
            componentChildren: [
              gridFactory({
                items: [
                  gridItemFactory({
                    size: { sm: 12, lg: 12 },
                    componentChildren: [
                      buttonFactory(
                        {
                          text: 'Click to copy secret text to clipboard',
                          onClick: [
                            {
                              type: 'copy-to-clipboard',
                              text: 'I am a secret text',
                            },
                          ],
                        },
                        'btnToChange',
                      ),
                    ],
                  }),
                  gridItemFactory({
                    size: { sm: 12, lg: 12 },
                    componentChildren: [
                      buttonFactory({
                        text: 'Click to change secret text behind first button',
                        onClick: [
                          {
                            type: 'request',
                            data: {
                              action: 'reflect',
                              reflectedData: patchFactory([
                                {
                                  targetSfId: 'btnToChange',
                                  operation: 'write',
                                  path: 'props.onClick',
                                  value: [
                                    {
                                      type: 'copy-to-clipboard',
                                      text: 'I am different secret text',
                                    },
                                  ],
                                },
                              ]),
                            },
                          },
                        ],
                      }),
                    ],
                  }),
                  gridItemFactory({
                    size: { sm: 12, lg: 12 },
                    componentChildren: [
                      textareaFactory(
                        {
                          name: 'textarea-resize-1',
                          label: 'Paste copied text',
                          resize: 'horizontal',
                        },
                        'textarea-resize-1',
                      ),
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
