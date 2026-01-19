// @ts-check

import { buttonFactory } from '../../../../shared/smartFaceComponentFactories/core/buttonFactory.js';
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { tabsFactory, tabsItemFactory } from '../../../../shared/smartFaceComponentFactories/core/tabsFactory.js';
import { textFactory } from '../../../../shared/smartFaceComponentFactories/core/textFactory.js';
import { sidebar } from '../shared/sidebar.js';

/**
 * @type { import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType.js').SmartFaceBackendDataType }
 */
export const tabsFullHeightPage = smartFaceFactory({
  sfComponents: [
    pageFactory({
      componentChildren: [
        classicLayoutFactory({
          sidebar: sidebar('tab-full-height-page', ['component-pages']),
          content: {
            componentChildren: [
              tabsFactory(
                {
                  fullHeight: true,
                  items: [
                    tabsItemFactory(
                      {
                        title: 'TabItem 4',
                        onAfterSelect: [
                          {
                            type: 'request',
                            data: { action: 'tabs-page', targetId: '14', pageEvent: 'select' },
                          },
                        ],
                        onAfterInitialSelect: [
                          {
                            type: 'request',
                            data: { action: 'tabs-page', targetId: '14', pageEvent: 'initialSelect' },
                          },
                        ],
                        onDeselect: [
                          {
                            type: 'request',
                            data: { action: 'tabs-page', targetId: '14', pageEvent: 'deselect' },
                          },
                        ],
                        componentChildren: [
                          textFactory({ text: 'tab 1 item 4 unchanged' }, 'text-4'),
                          buttonFactory({ text: 'Button 4-a' }),
                          buttonFactory({ text: 'Button 4-b' }),
                        ],
                      },
                      'tabItem-4',
                    ),
                    tabsItemFactory(
                      {
                        title: 'TabItem 5',
                        onAfterSelect: [
                          {
                            type: 'request',
                            data: { action: 'tabs-page', targetId: '15', pageEvent: 'select' },
                          },
                        ],
                        onAfterInitialSelect: [
                          {
                            type: 'request',
                            data: { action: 'tabs-page', targetId: '15', pageEvent: 'initialSelect' },
                          },
                        ],
                        onDeselect: [
                          {
                            type: 'request',
                            data: { action: 'tabs-page', targetId: '15', pageEvent: 'deselect' },
                          },
                        ],
                        componentChildren: [
                          textFactory({ text: 'tab 1 item 5 unchanged' }, 'text-5'),
                          buttonFactory({ text: 'Button 5-a' }),
                          buttonFactory({ text: 'Button 5-b' }),
                        ],
                      },
                      'tabItem-5',
                    ),
                    tabsItemFactory(
                      {
                        title: 'TabItem 6 onAfterSelect and href _blank',
                        href: '/button',
                        target: '_blank',
                        onAfterSelect: [
                          {
                            type: 'request',
                            data: { action: 'tabs-page', targetId: '16', pageEvent: 'select' },
                          },
                        ],
                        onDeselect: [
                          {
                            type: 'request',
                            data: { action: 'tabs-page', targetId: '16', pageEvent: 'deselect' },
                          },
                        ],
                        componentChildren: [
                          textFactory({ text: 'tab 1 item 6 unchanged' }, 'text-6'),
                          buttonFactory({ text: 'Button 6-a' }),
                          buttonFactory({ text: 'Button 6-b' }),
                        ],
                      },
                      'tabItem-6',
                    ),
                    tabsItemFactory(
                      {
                        title: 'TabItem 7 href _self',
                        href: '/button',
                        target: '_self',
                        componentChildren: [
                          textFactory({ text: 'tab 1 item 7 href/target new page' }, 'text-7'),
                          buttonFactory({ text: 'Button 7-a' }),
                          buttonFactory({ text: 'Button 7-b' }),
                        ],
                      },
                      'tabItem-7',
                    ),
                  ],
                  selectedItemSfId: 'tabItem-4',
                },
                'tab-1',
              ),
            ],
          },
        }),
      ],
    }),
  ],
});
