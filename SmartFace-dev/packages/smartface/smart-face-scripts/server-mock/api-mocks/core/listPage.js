// @ts-check
import getId from '../../../../shared/getId.js';
import { cardFactory } from '../../../../shared/smartFaceComponentFactories/core/cardFactory.js';
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { formTextFactory } from '../../../../shared/smartFaceComponentFactories/core/formTextFactory.js';
import { gridFactory, gridItemFactory } from '../../../../shared/smartFaceComponentFactories/core/gridFactory.js';
import { listFactory, listItemFactory } from '../../../../shared/smartFaceComponentFactories/core/listFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { sidebar } from '../shared/sidebar.js';

/** @type {import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType.js').SmartFaceBackendDataType}  */
export const listPage = smartFaceFactory({
  sfComponents: [
    pageFactory(
      {
        document: { head: { title: 'List Page' } },
        componentChildren: [
          classicLayoutFactory({
            sidebar: sidebar('list-page', ['component-pages']),
            content: {
              componentChildren: [
                gridFactory(
                  {
                    items: [
                      gridItemFactory(
                        {
                          size: 12,
                          componentChildren: [
                            cardFactory(
                              {
                                title: 'List test',
                                bodyChildren: [
                                  listFactory(
                                    {
                                      lineStyle: 'dashed',
                                      items: [
                                        listItemFactory(
                                          {
                                            title: 'href + _blank + onClick = Notification + new Tab',
                                            href: '/list',
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
                                            componentChildren: [
                                              formTextFactory({
                                                label: 'href + _blank + onClick',
                                                value: 'href + _blank + onClick',
                                              }),
                                            ],
                                          },
                                          `href_target-${getId()}`,
                                        ),
                                        listItemFactory(
                                          {
                                            title: 'href + _self + onClick = Notification + new Tab',
                                            href: '/list',
                                            target: '_self',
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
                                            componentChildren: [
                                              formTextFactory({
                                                label: 'href + _self + onClick',
                                                value: 'href + _self + onClick',
                                              }),
                                            ],
                                          },
                                          `href_target-${getId()}`,
                                        ),
                                        listItemFactory(
                                          {
                                            title: 'href + _parent + onClick = Notification + new Tab',
                                            href: '/list',
                                            target: '_parent',
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
                                            componentChildren: [
                                              formTextFactory({
                                                label: 'href + _parent + onClick',
                                                value: 'href + _parent + onClick',
                                              }),
                                            ],
                                          },
                                          `href_target-${getId()}`,
                                        ),

                                        listItemFactory(
                                          {
                                            title: 'href + _top + onClick = Notification + new Tab',
                                            href: '/list',
                                            target: '_top',
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
                                            componentChildren: [
                                              formTextFactory({
                                                label: 'href + _top + onClick',
                                                value: 'href + _top + onClick',
                                              }),
                                            ],
                                          },
                                          `href_target-${getId()}`,
                                        ),
                                        listItemFactory(
                                          {
                                            title: 'broken href + _top + onClick = Notification + new Tab',
                                            href: '/ASFKDFA',
                                            target: '_top',
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
                                            componentChildren: [
                                              formTextFactory({
                                                label: 'broken href  + _top + onClick',
                                                value: 'broken href  + _top + onClick',
                                              }),
                                            ],
                                          },
                                          `href_target-${getId()}`,
                                        ),
                                      ],
                                    },
                                    'list-0',
                                  ),
                                ],
                              },
                              'card',
                            ),
                          ],
                        },
                        'item',
                      ),
                    ],
                  },
                  'grid-0',
                ),
              ],
            },
          }),
        ],
      },
      'page-0',
    ),
  ],
});
