// @ts-check

import { buttonFactory } from '../../../../shared/smartFaceComponentFactories/core/buttonFactory.js';
import { cardFactory } from '../../../../shared/smartFaceComponentFactories/core/cardFactory.js';
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { sectionFactory } from '../../../../shared/smartFaceComponentFactories/core/collapsibleMenuFactory.js';
import {
  dropdownMenuDividerFactory,
  dropdownMenuEntryFactory,
  dropdownMenuFactory,
  dropdownMenuSectionFactory,
} from '../../../../shared/smartFaceComponentFactories/core/dropdownMenuFactory.js';
import { fontAwesomeIconFactory } from '../../../../shared/smartFaceComponentFactories/core/fontAwesomeIconFactory.js';
import { gridFactory, gridItemFactory } from '../../../../shared/smartFaceComponentFactories/core/gridFactory.js';
import { iconButtonFactory } from '../../../../shared/smartFaceComponentFactories/core/iconButtonFactory.js';
import { imageFactory } from '../../../../shared/smartFaceComponentFactories/core/imageFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { streamlineIconFactory } from '../../../../shared/smartFaceComponentFactories/core/streamlineIconFactory.js';
import { uiHandlerFactory } from '../../../../shared/smartFaceComponentFactories/core/uiHandlerFactory.js';
import { patchFactory } from '../shared/patchFactory.js';
import { sidebar } from '../shared/sidebar.js';

const dropdownProps = {
  trigger: buttonFactory({ text: 'DropdownMenu' }, 'dropdown-button-0'),
  componentParts: [
    dropdownMenuSectionFactory(
      {
        componentParts: [
          dropdownMenuEntryFactory(
            {
              text: 'I am a very long text and apparently im bugging around',
              href: 'https://www.hrworks.de/',
            },
            undefined,
            'data-guide-test',
          ),
          dropdownMenuEntryFactory({
            text: 'Link Entry with onClick',
            href: 'https://www.hrworks.de/',
            onClick: [
              {
                type: 'request',
                data: {
                  action: 'reflect',
                  reflectedData: patchFactory([
                    {
                      operation: 'write',
                      targetSfId: 'dropdown-button-0',
                      path: 'props.color',
                      value: 'secondary',
                    },
                  ]),
                },
              },
            ],
          }),
          dropdownMenuEntryFactory({ icon: streamlineIconFactory() }),
          dropdownMenuEntryFactory({ icon: fontAwesomeIconFactory() }),
        ],
      },
      undefined,
      'data-guide-test',
    ),
    dropdownMenuDividerFactory({}, undefined, 'data-guide-test'),
    dropdownMenuSectionFactory({
      componentParts: [
        dropdownMenuEntryFactory(),
        dropdownMenuEntryFactory({
          componentParts: [
            sectionFactory({
              title: 'Subview-Section',
              componentParts: [
                dropdownMenuEntryFactory({ text: 'Entry (Layer 2)' }),
                dropdownMenuEntryFactory({ text: 'Entry (Layer 2)' }),
                dropdownMenuEntryFactory({ text: 'Entry (Layer 2)' }),
                dropdownMenuEntryFactory({
                  componentParts: [
                    dropdownMenuEntryFactory({ text: 'Entry (Layer 3)' }),
                    dropdownMenuEntryFactory({
                      text: 'Entry (Layer 3)',
                      componentParts: [
                        dropdownMenuEntryFactory({ text: 'Empty href (Layer 4) ', href: '' }),
                        dropdownMenuEntryFactory({ text: 'Entry (Layer 4)' }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    dropdownMenuEntryFactory({
      text: 'Simulate maintenance for 10 seconds',
      componentParts: [dropdownMenuEntryFactory()],
    }),
  ],
};

/**
 * @type { import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType.js').SmartFaceBackendDataType }
 */
export const dropdownMenuPage = smartFaceFactory({
  sfComponents: [
    pageFactory({
      document: { head: { title: 'DropdownMenu Page' } },
      componentChildren: [
        uiHandlerFactory({
          iconSet: 'font-awesome',
          componentChildren: [
            classicLayoutFactory({
              sidebar: sidebar('dropdownMenu-page', ['component-pages']),
              content: {
                componentChildren: [
                  gridFactory({
                    items: [
                      gridItemFactory({
                        componentChildren: [
                          buttonFactory({
                            text: 'Change presentation to modal',
                            onClick: [
                              {
                                type: 'request',
                                data: {
                                  action: 'reflect',
                                  reflectedData: patchFactory([
                                    {
                                      targetSfId: 'd',
                                      operation: 'write',
                                      path: 'props.presentation',
                                      value: 'modal',
                                    },
                                  ]),
                                },
                              },
                            ],
                          }),
                          buttonFactory({
                            text: 'Change presentation to dropdown',
                            onClick: [
                              {
                                type: 'request',
                                data: {
                                  action: 'reflect',
                                  reflectedData: patchFactory([
                                    {
                                      targetSfId: 'd',
                                      operation: 'write',
                                      path: 'props.presentation',
                                      value: 'dropdown',
                                    },
                                  ]),
                                },
                              },
                            ],
                          }),
                          cardFactory({
                            title: 'Dropdown',
                            subtitle: 'Default',
                            icon: fontAwesomeIconFactory(),
                            bodyChildren: [
                              dropdownMenuFactory(
                                {
                                  ...dropdownProps,
                                  placement: 'right-start',
                                },
                                'd',
                                'data-guide-test',
                              ),
                            ],
                          }),
                        ],
                      }),
                      gridItemFactory({
                        componentChildren: [
                          cardFactory({
                            title: 'Image Cursor Test',
                            bodyChildren: [
                              dropdownMenuFactory({
                                title: 'Image Cursor Test',
                                ...dropdownProps,
                                placement: 'right-start',
                                trigger: imageFactory({ corner: 'square' }),
                              }),
                            ],
                          }),
                        ],
                      }),
                      gridItemFactory({
                        componentChildren: [
                          cardFactory({
                            title: 'IconButton Test',
                            bodyChildren: [
                              dropdownMenuFactory({
                                ...dropdownProps,
                                placement: 'right-start',
                                trigger: iconButtonFactory(),
                              }),
                              dropdownMenuFactory({
                                ...dropdownProps,
                                placement: 'right-start',
                                trigger: iconButtonFactory({ icon: undefined }),
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              },
              footer: {
                componentChildren: [
                  gridFactory({
                    items: [
                      gridItemFactory({
                        componentChildren: [dropdownMenuFactory({ ...dropdownProps, placement: 'top-start' })],
                      }),
                    ],
                  }),
                ],
              },
            }),
          ],
        }),
      ],
    }),
  ],
});
