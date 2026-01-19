// @ts-check
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { gridFactory, gridItemFactory } from '../../../../shared/smartFaceComponentFactories/core/gridFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { tabsFactory, tabsItemFactory } from '../../../../shared/smartFaceComponentFactories/core/tabsFactory.js';
import { textFactory } from '../../../../shared/smartFaceComponentFactories/core/textFactory.js';
import { sidebar } from '../shared/sidebar.js';
import { backendRequestSideEffectFactory } from './../../../../shared/smartFaceComponentFactories/core/backendRequestSideEffectFactory.js';
import { buttonFactory } from './../../../../shared/smartFaceComponentFactories/core/buttonFactory.js';
import { cardFactory } from './../../../../shared/smartFaceComponentFactories/core/cardFactory.js';
import { modalFactory, pageFactory } from './../../../../shared/smartFaceComponentFactories/core/pageFactory.js';

/** @type {import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType.js').SmartFaceBackendDataType}  */
export const tabsPage = smartFaceFactory({
  sfComponents: [
    pageFactory(
      {
        document: { head: { title: 'Tabs Page' } },
        componentChildren: [
          backendRequestSideEffectFactory({
            onLoad: [
              {
                type: 'request',
                data: { action: 'page-load' },
              },
            ],
          }),
          classicLayoutFactory({
            sidebar: sidebar('tabs-page', ['component-pages']),
            content: {
              componentChildren: [
                gridFactory({
                  items: [
                    gridItemFactory({
                      size: 12,
                      componentChildren: [
                        cardFactory({
                          title: 'Tab Card 0',
                          bodyChildren: [
                            tabsFactory(
                              {
                                items: [
                                  tabsItemFactory(
                                    {
                                      title: 'TabItem 0',
                                      color: 'secondary',
                                      onAfterSelect: [
                                        {
                                          type: 'request',
                                          data: { action: 'tabs-page', targetId: '00', pageEvent: 'select' },
                                        },
                                      ],
                                      onAfterInitialSelect: [
                                        {
                                          type: 'request',
                                          data: { action: 'tabs-page', targetId: '00', pageEvent: 'initialSelect' },
                                        },
                                      ],
                                      onDeselect: [
                                        {
                                          type: 'request',
                                          data: { action: 'tabs-page', targetId: '00', pageEvent: 'deselect' },
                                        },
                                      ],
                                      componentChildren: [
                                        textFactory({ text: 'tab 0 item 0 unchanged' }, 'text-0'),
                                        buttonFactory({ text: 'Button 0-a' }),
                                        buttonFactory({ text: 'Button 0-b' }),
                                      ],
                                    },
                                    'tabItem-0',
                                    'data-guide-test',
                                  ),
                                  tabsItemFactory(
                                    {
                                      title: 'TabItem 1',
                                      color: 'danger',
                                      onAfterSelect: [
                                        {
                                          type: 'request',
                                          data: { action: 'tabs-page', targetId: '01', pageEvent: 'select' },
                                        },
                                      ],
                                      onAfterInitialSelect: [
                                        {
                                          type: 'request',
                                          data: { action: 'tabs-page', targetId: '01', pageEvent: 'initialSelect' },
                                        },
                                      ],
                                      onDeselect: [
                                        {
                                          type: 'request',
                                          data: { action: 'tabs-page', targetId: '01', pageEvent: 'deselect' },
                                        },
                                      ],
                                      componentChildren: [
                                        textFactory({ text: 'tab 0 item 1 unchanged' }, 'text-1'),
                                        buttonFactory({ text: 'Button 1-a' }),
                                        buttonFactory({ text: 'Button 1-b' }),
                                      ],
                                    },
                                    'tabItem-1',
                                  ),
                                  tabsItemFactory(
                                    {
                                      title: 'TabItem 2 onAfterSelect and href _blank',
                                      color: 'success',
                                      href: '/button',
                                      target: '_blank',
                                      onAfterSelect: [
                                        {
                                          type: 'request',
                                          data: { action: 'tabs-page', targetId: '02', pageEvent: 'select' },
                                        },
                                      ],
                                      onDeselect: [
                                        {
                                          type: 'request',
                                          data: { action: 'tabs-page', targetId: '02', pageEvent: 'deselect' },
                                        },
                                      ],
                                      componentChildren: [
                                        textFactory({ text: 'tab 1 item 2 unchanged' }, 'text-2'),
                                        buttonFactory({ text: 'Button 2-a' }),
                                        buttonFactory({ text: 'Button 2-b' }),
                                      ],
                                    },
                                    'tabItem-2',
                                  ),
                                  tabsItemFactory(
                                    {
                                      title: 'TabItem 3 href _self',
                                      color: 'warning',
                                      href: '/button',
                                      target: '_self',
                                      componentChildren: [
                                        textFactory({ text: 'tab 0 item 3 href/target new page' }, 'text-3'),
                                        buttonFactory({ text: 'Button 3-a' }),
                                        buttonFactory({ text: 'Button 3-b' }),
                                      ],
                                    },
                                    'tabItem-3',
                                  ),
                                  tabsItemFactory(
                                    {
                                      title: 'TabItem 4 href _blank',
                                      color: 'info',
                                      href: '/button',
                                      target: '_blank',
                                      componentChildren: [
                                        textFactory({ text: 'some Text' }, 'text-4'),
                                        buttonFactory({ text: 'Button 4-a' }),
                                        buttonFactory({ text: 'Button 4-b' }),
                                      ],
                                    },
                                    'tabItem-4',
                                  ),
                                ],
                                selectedItemSfId: 'tabItem-0',
                              },
                              'tab-0',
                              'data-guide-test',
                            ),
                          ],
                          footerChildren: [textFactory({}, 'footer-text-0')],
                        }),
                      ],
                    }),
                    gridItemFactory({
                      size: 12,
                      componentChildren: [
                        tabsFactory(
                          {
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
                        textFactory({}, 'footer-text-1'),
                      ],
                    }),
                  ],
                }),
              ],
            },
            footer: {
              componentChildren: [
                textFactory({ text: 'Choose a tab to become the selected item:' }),
                buttonFactory({
                  text: 'TabItem 0',
                  color: 'primary',
                  onClick: [
                    {
                      type: 'request',
                      data: { action: 'tabs-page', targetId: '00', pageEvent: 'button' },
                    },
                  ],
                }),
                buttonFactory({
                  text: 'TabItem 1',
                  color: 'success',
                  onClick: [
                    {
                      type: 'request',
                      data: { action: 'tabs-page', targetId: '01', pageEvent: 'button' },
                    },
                  ],
                }),
                buttonFactory({
                  text: 'TabItem 2',
                  color: 'danger',
                  onClick: [
                    {
                      type: 'request',
                      data: { action: 'tabs-page', targetId: '02', pageEvent: 'button' },
                    },
                  ],
                }),
                buttonFactory({
                  text: 'TabItem 3',
                  color: 'info',
                  onClick: [
                    {
                      type: 'request',
                      data: { action: 'tabs-page', targetId: '03', pageEvent: 'button' },
                    },
                  ],
                }),
                buttonFactory({
                  text: 'Tab in Modal',
                  onClick: [
                    {
                      type: 'request',
                      data: {
                        action: 'reflect',
                        reflectedData: {
                          sideEffects: [
                            {
                              type: 'patch',
                              updates: [
                                {
                                  operation: 'write',
                                  targetSfId: 'Tabs-Page-0',
                                  path: 'props.modals',
                                  value: [
                                    modalFactory(
                                      {
                                        closeable: true,
                                        title: 'Page Modal',
                                        size: 'extraLarge',
                                        bodyChildren: [
                                          tabsFactory({
                                            items: [tabsItemFactory({}, 'funny'), tabsItemFactory({})],
                                            selectedItemSfId: 'funny',
                                          }),
                                        ],
                                      },
                                      `modal-stacked-id`,
                                    ),
                                  ],
                                },
                              ],
                            },
                            { type: 'navigateToElement', id: 'modal-0-button-0', focus: true, scrollIntoView: false },
                          ],
                        },
                      },
                    },
                  ],
                }),
              ],
            },
          }),
        ],
      },
      'Tabs-Page-0',
    ),
  ],
});
