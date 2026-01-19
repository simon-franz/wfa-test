// @ts-check

import { buttonFactory } from '../../../../shared/smartFaceComponentFactories/core/buttonFactory.js';
import { cardFactory } from '../../../../shared/smartFaceComponentFactories/core/cardFactory.js';
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { gridFactory, gridItemFactory } from '../../../../shared/smartFaceComponentFactories/core/gridFactory.js';
import { imageFactory } from '../../../../shared/smartFaceComponentFactories/core/imageFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import {
  panelGroupFactory,
  panelGroupItemFactory,
} from '../../../../shared/smartFaceComponentFactories/extension/panelGroupFactory.js';
import { patchFactory } from '../shared/patchFactory.js';
import { sidebar } from '../shared/sidebar.js';

/**
 * @type { import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType }
 */

export const panelGroupFullHeightPage = smartFaceFactory({
  sfComponents: [
    pageFactory({
      document: { head: { title: 'PanelGroup fullHeight Page' } },
      componentChildren: [
        classicLayoutFactory({
          sidebar: sidebar('panel-group-full-height-page', ['component-pages']),
          content: {
            componentChildren: [
              cardFactory({
                title: 'PanelGroup ',
                subtitle: 'fullHeight',
                fullHeight: true,
                bodyChildren: [
                  panelGroupFactory(
                    {
                      fullHeight: false,
                      direction: {
                        xl: 'vertical',
                        lg: 'horizontal',
                        md: 'vertical',
                        sm: 'horizontal',
                        xs: 'vertical',
                      },
                      items: [
                        panelGroupItemFactory({
                          componentChildren: [
                            imageFactory(
                              { src: 'https://placedog.net/1000/1000', corner: 'square' },
                              'panel-group-item-1',
                            ),
                          ],
                        }),
                        panelGroupItemFactory({
                          componentChildren: [
                            imageFactory(
                              { src: 'https://placedog.net/1000/1000', corner: 'square' },
                              'panel-group-item-2',
                            ),
                          ],
                        }),
                      ],
                    },
                    'panel-group-full-height',
                  ),
                ],
                footerChildren: [
                  gridFactory({
                    items: [
                      gridItemFactory(
                        {
                          size: 12,
                          componentChildren: [
                            buttonFactory({
                              size: 'medium',
                              text: 'direction: vertical',
                              color: 'success',
                              corner: 'rounded',
                              onClick: [
                                {
                                  type: 'request',
                                  data: {
                                    action: 'reflect',
                                    reflectedData: patchFactory([
                                      {
                                        targetSfId: 'panel-group-full-height',
                                        operation: 'write',
                                        path: 'props.direction',
                                        value: 'vertical',
                                      },
                                    ]),
                                  },
                                },
                              ],
                            }),
                            buttonFactory({
                              size: 'medium',
                              text: 'direction: horizontal',
                              color: 'success',
                              corner: 'rounded',
                              onClick: [
                                {
                                  type: 'request',
                                  data: {
                                    action: 'reflect',
                                    reflectedData: patchFactory([
                                      {
                                        targetSfId: 'panel-group-full-height',
                                        operation: 'write',
                                        path: 'props.direction',
                                        value: 'horizontal',
                                      },
                                    ]),
                                  },
                                },
                              ],
                            }),
                          ],
                        },
                        'direction-buttons',
                      ),
                      gridItemFactory(
                        {
                          size: 12,
                          componentChildren: [
                            buttonFactory({
                              size: 'medium',
                              text: 'fullHeight: false',
                              color: 'success',
                              corner: 'rounded',
                              onClick: [
                                {
                                  type: 'request',
                                  data: {
                                    action: 'reflect',
                                    reflectedData: patchFactory([
                                      {
                                        targetSfId: 'panel-group-full-height',
                                        operation: 'write',
                                        path: 'props.fullHeight',
                                        value: false,
                                      },
                                    ]),
                                  },
                                },
                              ],
                            }),
                            buttonFactory({
                              size: 'medium',
                              text: 'fullHeight: true',
                              color: 'success',
                              corner: 'rounded',
                              onClick: [
                                {
                                  type: 'request',
                                  data: {
                                    action: 'reflect',
                                    reflectedData: patchFactory([
                                      {
                                        targetSfId: 'panel-group-full-height',
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
                        },
                        'fullHeight-buttons',
                      ),
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
