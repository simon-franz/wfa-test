// @ts-check

import { buttonFactory } from '../../../../shared/smartFaceComponentFactories/core/buttonFactory.js';
import { cardFactory } from '../../../../shared/smartFaceComponentFactories/core/cardFactory.js';
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { textFactory } from '../../../../shared/smartFaceComponentFactories/core/textFactory.js';
import { sidebar } from '../shared/sidebar.js';

/**
 * @type { import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType }
 */
export const cardFullHeightPage = smartFaceFactory({
  sfComponents: [
    pageFactory({
      document: { head: { title: 'Card fullHeight Page' } },
      componentChildren: [
        classicLayoutFactory({
          sidebar: sidebar('card-full-height-page', ['component-pages']),
          content: {
            componentChildren: [
              cardFactory({
                fullHeight: true,
                title: 'Card',
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
          },
        }),
      ],
    }),
  ],
});
