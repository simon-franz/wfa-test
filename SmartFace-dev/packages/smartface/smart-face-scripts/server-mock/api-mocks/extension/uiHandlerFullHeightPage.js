// @ts-check

import { buttonFactory } from '../../../../shared/smartFaceComponentFactories/core/buttonFactory.js';
import { cardFactory } from '../../../../shared/smartFaceComponentFactories/core/cardFactory.js';
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { textFactory } from '../../../../shared/smartFaceComponentFactories/core/textFactory.js';
import { uiHandlerFactory } from '../../../../shared/smartFaceComponentFactories/core/uiHandlerFactory.js';
import { sidebar } from '../shared/sidebar.js';

/**
 * @type { import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType }
 */
export const uiHandlerFullHeightPage = smartFaceFactory({
  sfComponents: [
    pageFactory({
      document: { head: { title: 'UI-Handler fullHeight Page' } },
      componentChildren: [
        classicLayoutFactory({
          sidebar: sidebar('ui-handler-full-height-page', ['component-pages']),
          content: {
            componentChildren: [
              uiHandlerFactory({
                defaultFullHeight: true,
                componentChildren: [
                  cardFactory({
                    title: 'UI-Handler',
                    subtitle: 'fullHeight',
                    bodyChildren: [
                      textFactory({
                        text: 'Lorem Ipsum',
                      }),
                    ],
                    footerChildren: [
                      buttonFactory({
                        text: 'Hi, im a button without any function',
                        type: 'submit',
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
