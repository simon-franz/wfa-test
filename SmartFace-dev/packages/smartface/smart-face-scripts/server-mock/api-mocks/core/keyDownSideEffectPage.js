import { buttonFactory } from '../../../../shared/smartFaceComponentFactories/core/buttonFactory.js';
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { gridFactory, gridItemFactory } from '../../../../shared/smartFaceComponentFactories/core/gridFactory.js';
import { keyDownSideEffectFactory } from '../../../../shared/smartFaceComponentFactories/core/keyDownSideEffectFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { textFieldFactory } from '../../../../shared/smartFaceComponentFactories/core/textFieldFactory.js';
import { footer } from '../shared/footer.js';
import { sidebar } from '../shared/sidebar.js';

/**
 * @type { import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType }
 */
export const keyDownSideEffectPage = smartFaceFactory({
  sfComponents: [
    pageFactory({
      document: { head: { title: 'keyDown Page' } },
      componentChildren: [
        keyDownSideEffectFactory(
          {
            shortcut: { key: 'a' },
            onKeyDown: [
              {
                type: 'request',
                data: {
                  action: 'reflect',
                  reflectedData: {
                    sideEffects: [
                      {
                        type: 'addNotification',
                        id: 'notification-key-a',
                        title: 'Shortcut Activated',
                        message: 'Shortcut 01 was pressed',
                        color: 'info',
                      },
                    ],
                  },
                },
              },
            ],
          },
          'key-down-0',
        ),
        keyDownSideEffectFactory(
          {
            shortcut: { key: 'a', ctrlKey: true },
            onKeyDown: [
              {
                type: 'request',
                data: {
                  action: 'reflect',
                  reflectedData: {
                    sideEffects: [
                      {
                        type: 'addNotification',
                        id: 'notification-key-a-ctrl',
                        title: 'Shortcut Activated',
                        message: 'Shortcut 02 was pressed',
                        color: 'info',
                      },
                    ],
                  },
                },
              },
            ],
          },
          'key-down-1',
        ),
        keyDownSideEffectFactory(
          {
            shortcut: { key: 'a', ctrlKey: true, altKey: true },
            onKeyDown: [
              {
                type: 'request',
                data: {
                  action: 'reflect',
                  reflectedData: {
                    sideEffects: [
                      {
                        type: 'addNotification',
                        id: 'notification-key-c',
                        title: 'Shortcut Activated',
                        message: 'Shortcut 03 was pressed',
                        color: 'info',
                      },
                    ],
                  },
                },
              },
            ],
          },
          'key-down-2',
        ),
        classicLayoutFactory({
          sidebar: sidebar('key-down-page', ['side-effect-pages']),
          content: {
            componentChildren: [
              gridFactory(
                {
                  items: [
                    gridItemFactory({
                      componentChildren: [
                        textFieldFactory(
                          {
                            name: 'Textfield',
                            placeholder: 'Typing letters "a", "ctrl+a" and "ctrl+alt+a" should trigger alerts',
                          },
                          'textfield',
                        ),
                      ],
                    }),
                    gridItemFactory({
                      componentChildren: [
                        buttonFactory({
                          text: 'Delete component (shortcut 01)',
                          onClick: [
                            {
                              type: 'request',
                              data: { action: 'key-down-page', pageEvent: 'deactivate' },
                            },
                          ],
                        }),
                      ],
                    }),
                    gridItemFactory({
                      componentChildren: [
                        buttonFactory({
                          text: 'Modify ctrl + x',
                          onClick: [
                            {
                              type: 'request',
                              data: { action: 'key-down-page', pageEvent: 'modify-ctrlKey-x' },
                            },
                          ],
                        }),
                      ],
                    }),
                    gridItemFactory({
                      componentChildren: [
                        buttonFactory({
                          text: 'Modify alt + x',
                          onClick: [
                            {
                              type: 'request',
                              data: { action: 'key-down-page', pageEvent: 'modify-altKey-x' },
                            },
                          ],
                        }),
                      ],
                    }),
                    gridItemFactory({
                      componentChildren: [
                        buttonFactory({
                          text: 'Modify ctrl + alt + x',
                          onClick: [
                            {
                              type: 'request',
                              data: { action: 'key-down-page', pageEvent: 'modify-ctrlKey-altKey-x' },
                            },
                          ],
                        }),
                      ],
                    }),
                    gridItemFactory({
                      componentChildren: [
                        buttonFactory({
                          text: 'Update sfEvent',
                          onClick: [
                            {
                              type: 'request',
                              data: { action: 'key-down-page', pageEvent: 'update-sfEvent' },
                            },
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
          footer,
        }),
      ],
    }),
  ],
});
