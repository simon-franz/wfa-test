// @ts-check

import { buttonFactory } from '../../../../shared/smartFaceComponentFactories/core/buttonFactory.js';
import { cardFactory } from '../../../../shared/smartFaceComponentFactories/core/cardFactory.js';
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { fontAwesomeIconFactory } from '../../../../shared/smartFaceComponentFactories/core/fontAwesomeIconFactory.js';
import { gridFactory, gridItemFactory } from '../../../../shared/smartFaceComponentFactories/core/gridFactory.js';
import { imageFactory } from '../../../../shared/smartFaceComponentFactories/core/imageFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { afterEffectsMediaFactory } from '../../../../shared/smartFaceComponentFactories/extension/afterEffectsMediaFactory.js';
import {
  portrayedListFactory,
  portrayedListItemFactory,
} from '../../../../shared/smartFaceComponentFactories/extension/portrayedListFactory.js';
import { footer } from '../shared/footer.js';
import { sidebar } from '../shared/sidebar.js';

/** @type {import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType}  */
export const portrayedListPage = smartFaceFactory({
  sfComponents: [
    pageFactory(
      {
        document: { head: { title: 'Portrayed List Page' } },
        componentChildren: [
          classicLayoutFactory({
            sidebar: sidebar('portrayed-list-page', ['component-pages']),
            content: {
              componentChildren: [
                gridFactory(
                  {
                    items: [
                      gridItemFactory({
                        size: 6,
                        componentChildren: [
                          cardFactory({
                            title: 'lineStyle - solid',
                            subtitle: 'Default',
                            icon: fontAwesomeIconFactory(),
                            bodyChildren: [
                              portrayedListFactory(
                                {
                                  lineStyle: 'solid',
                                  items: [
                                    portrayedListItemFactory(
                                      {
                                        title: 'solid',
                                        extrasChildren: [fontAwesomeIconFactory()],
                                      },
                                      'selectedItemId-solid-1',
                                      'data-guide-test',
                                    ),
                                    portrayedListItemFactory(
                                      {
                                        title: 'solid',
                                        extrasChildren: [fontAwesomeIconFactory()],
                                      },
                                      'selectedItemId-solid-2',
                                    ),
                                  ],
                                  selectedItemSfId: 'selectedItemId',
                                  hoverable: true,
                                },
                                'list-1',
                                'data-guide-test',
                              ),
                            ],
                          }),
                        ],
                      }),
                      gridItemFactory({
                        size: 6,
                        componentChildren: [
                          cardFactory({
                            title: 'lineStyle - dotted',
                            subtitle: 'Default',
                            icon: fontAwesomeIconFactory(),
                            bodyChildren: [
                              portrayedListFactory(
                                {
                                  lineStyle: 'dotted',
                                  items: [
                                    portrayedListItemFactory(
                                      {
                                        title: 'dotted',
                                        extrasChildren: [fontAwesomeIconFactory()],
                                      },
                                      'selectedItemId-solid-1',
                                    ),
                                    portrayedListItemFactory(
                                      {
                                        title: 'dotted',
                                        extrasChildren: [fontAwesomeIconFactory()],
                                      },
                                      'selectedItemId-solid-2',
                                    ),
                                  ],
                                  selectedItemSfId: 'selectedItemId',
                                  hoverable: true,
                                },
                                'list-2',
                              ),
                            ],
                          }),
                        ],
                      }),
                      gridItemFactory({
                        size: 6,
                        componentChildren: [
                          cardFactory({
                            title: 'lineStyle - dashed',
                            subtitle: 'Default',
                            icon: fontAwesomeIconFactory(),
                            bodyChildren: [
                              portrayedListFactory(
                                {
                                  lineStyle: 'dashed',
                                  items: [
                                    portrayedListItemFactory(
                                      {
                                        title: 'dashed',
                                        extrasChildren: [fontAwesomeIconFactory()],
                                      },
                                      'selectedItemId-solid-1',
                                    ),
                                    portrayedListItemFactory(
                                      {
                                        title: 'dashed',
                                        extrasChildren: [fontAwesomeIconFactory()],
                                      },
                                      'selectedItemId-solid-2',
                                    ),
                                  ],
                                  selectedItemSfId: 'selectedItemId',
                                  hoverable: true,
                                },
                                'list-3',
                              ),
                            ],
                          }),
                        ],
                      }),
                      gridItemFactory({
                        size: 6,
                        componentChildren: [
                          cardFactory({
                            title: 'lineStyle - none',
                            subtitle: 'Default',
                            icon: fontAwesomeIconFactory(),
                            bodyChildren: [
                              portrayedListFactory(
                                {
                                  lineStyle: 'none',
                                  items: [
                                    portrayedListItemFactory(
                                      {
                                        title: 'none',
                                        extrasChildren: [fontAwesomeIconFactory()],
                                      },
                                      'selectedItemId-solid-1',
                                    ),
                                    portrayedListItemFactory(
                                      {
                                        title: 'none',
                                        extrasChildren: [fontAwesomeIconFactory()],
                                      },
                                      'selectedItemId-solid-2',
                                    ),
                                  ],
                                  selectedItemSfId: 'selectedItemId',
                                  hoverable: true,
                                },
                                'list-4',
                              ),
                            ],
                          }),
                        ],
                      }),
                      gridItemFactory({
                        size: 12,
                        componentChildren: [
                          cardFactory({
                            title: 'List',
                            subtitle: 'MISC',
                            icon: fontAwesomeIconFactory(),
                            bodyChildren: [
                              portrayedListFactory(
                                {
                                  items: [
                                    portrayedListItemFactory(
                                      {
                                        media: fontAwesomeIconFactory(),
                                        title: 'selectedItem',
                                        extrasChildren: [fontAwesomeIconFactory()],
                                      },
                                      'selectedItemId',
                                    ),
                                    portrayedListItemFactory(
                                      {
                                        media: imageFactory({ corner: 'rounded' }),
                                        title: 'no extrasChildren',
                                        subtitle: 'Click this item in order to select it',
                                        onClick: [{ type: 'request', data: { action: 'portrayed-list-event-2' } }],
                                      },
                                      'secondListItem',
                                    ),
                                    portrayedListItemFactory({
                                      media: imageFactory({ corner: 'square' }),
                                      title: 'image corner square',
                                      extrasChildren: [buttonFactory()],
                                    }),
                                    portrayedListItemFactory({
                                      media: null,
                                      title: 'no media',
                                      extrasChildren: [buttonFactory(), buttonFactory()],
                                    }),
                                    portrayedListItemFactory({
                                      title: 'grouped via gridFactory extras',
                                      extrasChildren: [
                                        gridFactory({
                                          rowGap: 'extraSmall',
                                          columnGap: 'extraSmall',
                                          items: [
                                            gridItemFactory({
                                              componentChildren: [buttonFactory()],
                                            }),
                                            gridItemFactory({
                                              componentChildren: [buttonFactory()],
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                    portrayedListItemFactory({
                                      title: 'no subtitle',
                                      subtitle: undefined,
                                      extrasChildren: [buttonFactory()],
                                    }),
                                    portrayedListItemFactory({
                                      title: 'padding with extrasChildren',
                                      extrasChildren: [buttonFactory()],
                                    }),
                                    portrayedListItemFactory(
                                      {
                                        title: 'onClick list item',
                                        onClick: [{ type: 'request', data: { action: 'portrayed-list-event-0' } }],
                                        href: '/',
                                        extrasChildren: [fontAwesomeIconFactory()],
                                      },
                                      'event-item-id',
                                    ),
                                    portrayedListItemFactory({
                                      media: afterEffectsMediaFactory(
                                        {
                                          url: 'https://d9yw7530xbzu.cloudfront.net/assets/lock+animation.json',
                                          loopStartFrame: 40,
                                          loopEndFrame: 70,
                                        },
                                        'ae-test',
                                        'data-guide-test',
                                      ),
                                      title: 'After Effects Media',
                                      extrasChildren: [fontAwesomeIconFactory()],
                                    }),
                                    portrayedListItemFactory(
                                      {
                                        title: 'href + blank + onClick = Notification + new Tab',
                                        href: '/portrayedList',
                                        target: '_blank',
                                        onClick: [
                                          {
                                            type: 'request',
                                            data: {
                                              action: 'reflect',
                                              reflectedData: {
                                                sideEffects: [
                                                  {
                                                    type: 'addNotification',
                                                    id: 'notification-1',
                                                    message: 'onClick Triggert!',
                                                    color: 'danger',
                                                  },
                                                ],
                                              },
                                            },
                                          },
                                        ],
                                        extrasChildren: [fontAwesomeIconFactory()],
                                      },
                                      'href-test',
                                      'data-guide-test',
                                    ),
                                  ],
                                  selectedItemSfId: 'selectedItemId',
                                  hoverable: true,
                                },
                                'list-0',
                              ),
                            ],
                            footerChildren: [
                              buttonFactory({
                                text: 'Add item',
                                onClick: [{ type: 'request', data: { action: 'portrayed-list-event-1' } }],
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  },
                  'grid-0',
                ),
              ],
            },
            header: {
              componentChildren: [],
            },
            footer,
          }),
        ],
        modals: [],
      },
      'page-0',
    ),
  ],
});
