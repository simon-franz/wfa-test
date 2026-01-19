import { badgeFactory } from '../../../../shared/smartFaceComponentFactories/core/badgeFactory.js';
import { buttonFactory } from '../../../../shared/smartFaceComponentFactories/core/buttonFactory.js';
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import {
  collapsibleMenuFactory,
  entryFactory,
  sectionFactory,
} from '../../../../shared/smartFaceComponentFactories/core/collapsibleMenuFactory.js';
import { fontAwesomeIconFactory } from '../../../../shared/smartFaceComponentFactories/core/fontAwesomeIconFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { footer } from '../shared/footer.js';
import { patchFactory } from '../shared/patchFactory.js';
import { sidebar } from '../shared/sidebar.js';

/**
 * @type { import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType }
 */
export const collapsibleMenuPage = smartFaceFactory({
  sfComponents: [
    pageFactory({
      document: { head: { title: 'Component Page' } },
      componentChildren: [
        classicLayoutFactory({
          sidebar: sidebar('component-page', ['sidebarParent']),
          header: {
            componentChildren: [
              buttonFactory({
                text: 'showDepthIndicator: true',
                onClick: [
                  {
                    type: 'request',
                    data: {
                      action: 'reflect',
                      reflectedData: patchFactory([
                        {
                          operation: 'write',
                          targetSfId: 'collapsible-1',
                          path: 'props.showDepthIndicator',
                          value: true,
                        },
                      ]),
                    },
                  },
                ],
              }),
              buttonFactory({
                text: 'showDepthIndicator: false',
                onClick: [
                  {
                    type: 'request',
                    data: {
                      action: 'reflect',
                      reflectedData: patchFactory([
                        {
                          operation: 'write',
                          targetSfId: 'collapsible-1',
                          path: 'props.showDepthIndicator',
                          value: false,
                        },
                      ]),
                    },
                  },
                ],
              }),
            ],
          },
          content: {
            componentChildren: [
              collapsibleMenuFactory(
                {
                  expandedEntrySfIds: [
                    'layer0',
                    'layer1',
                    'layer2',
                    'layer3',
                    'layer4',
                    'layer5',
                    'layer6',
                    'layer7',
                    'layer8',
                    'layer9',
                    'layer10',
                    'layer11',
                    'layer12',
                    'layer0',
                    'layer1',
                    'layer2',
                    'layer3',
                    'layer4',
                  ],

                  componentParts: [
                    sectionFactory({
                      title: 'Extreme Example',
                      componentParts: [
                        entryFactory(
                          {
                            text: 'Layer 0',
                            icon: fontAwesomeIconFactory({ name: 'clock' }),
                            badge: badgeFactory({ text: 'TestiTesto' }),
                            componentParts: [
                              entryFactory({ text: 'Layer 1' }),
                              entryFactory(
                                {
                                  text: 'Layer 1',
                                  icon: fontAwesomeIconFactory({ name: 'clock' }),
                                  componentParts: [
                                    entryFactory(
                                      {
                                        text: 'Layer 2',
                                        icon: fontAwesomeIconFactory({ name: 'clock' }),
                                        componentParts: [
                                          entryFactory(
                                            {
                                              text: 'Layer 3',
                                              /*  icon: fontAwesomeIconFactory({ name: 'clock' }), */
                                              componentParts: [
                                                sectionFactory({
                                                  title: 'Section inside',
                                                  componentParts: [
                                                    entryFactory({
                                                      text: 'funny',
                                                      componentParts: [entryFactory({ text: 'funny test' })],
                                                    }),
                                                  ],
                                                }),
                                                entryFactory({ text: 'Layer4' }),
                                                entryFactory(
                                                  {
                                                    text: 'Layer 4',

                                                    componentParts: [
                                                      entryFactory(
                                                        {
                                                          text: 'Layer 5',
                                                          /*  icon: fontAwesomeIconFactory({ name: 'clock' }), */
                                                          componentParts: [
                                                            entryFactory(
                                                              {
                                                                text: 'Layer 6',
                                                                icon: fontAwesomeIconFactory({
                                                                  name: 'clock',
                                                                }),
                                                                componentParts: [
                                                                  entryFactory(
                                                                    {
                                                                      text: 'Layer 7',
                                                                      icon: fontAwesomeIconFactory({
                                                                        name: 'clock',
                                                                      }),
                                                                      componentParts: [
                                                                        entryFactory(
                                                                          {
                                                                            text: 'Layer 8',
                                                                            icon: fontAwesomeIconFactory({
                                                                              name: 'clock',
                                                                            }),
                                                                            componentParts: [
                                                                              entryFactory({
                                                                                text: 'You found me :)',
                                                                              }),
                                                                              entryFactory(
                                                                                {
                                                                                  text: 'Layer 9',
                                                                                  icon: fontAwesomeIconFactory({
                                                                                    name: 'clock',
                                                                                  }),
                                                                                  componentParts: [
                                                                                    entryFactory(
                                                                                      {
                                                                                        text: 'Layer 10',
                                                                                        icon: fontAwesomeIconFactory({
                                                                                          name: 'clock',
                                                                                        }),
                                                                                        componentParts: [
                                                                                          entryFactory(
                                                                                            {
                                                                                              text: 'Layer 11',
                                                                                              icon: fontAwesomeIconFactory(
                                                                                                {
                                                                                                  name: 'clock',
                                                                                                },
                                                                                              ),
                                                                                              componentParts: [
                                                                                                entryFactory(
                                                                                                  {
                                                                                                    text: 'Layer 12',
                                                                                                    icon: fontAwesomeIconFactory(
                                                                                                      {
                                                                                                        name: 'clock',
                                                                                                      },
                                                                                                    ),
                                                                                                    componentParts: [
                                                                                                      entryFactory({
                                                                                                        text: 'You found the deepest layer!',
                                                                                                      }),
                                                                                                    ],
                                                                                                  },
                                                                                                  'layer12',
                                                                                                ),
                                                                                              ],
                                                                                            },
                                                                                            'layer11',
                                                                                          ),
                                                                                        ],
                                                                                      },
                                                                                      'layer10',
                                                                                    ),
                                                                                  ],
                                                                                },
                                                                                'layer9',
                                                                              ),
                                                                            ],
                                                                          },
                                                                          'layer8',
                                                                        ),
                                                                      ],
                                                                    },
                                                                    'layer7',
                                                                  ),
                                                                ],
                                                              },
                                                              'layer6',
                                                            ),
                                                          ],
                                                        },
                                                        'layer5',
                                                      ),
                                                    ],
                                                  },
                                                  'layer4',
                                                ),
                                              ],
                                            },
                                            'layer3',
                                          ),
                                        ],
                                      },
                                      'layer2',
                                    ),
                                  ],
                                },
                                'layer1',
                              ),
                            ],
                          },
                          'layer0',
                        ),
                      ],
                    }),
                    sectionFactory({
                      title: 'Simple Example',
                      componentParts: [
                        entryFactory(
                          {
                            text: 'Layer 0',
                            badge: badgeFactory({ text: 'Simple' }),
                            componentParts: [
                              entryFactory(
                                {
                                  text: 'Layer 1',
                                  icon: fontAwesomeIconFactory({ name: 'folder' }),
                                  componentParts: [
                                    entryFactory(
                                      {
                                        text: 'Layer 2',
                                        icon: fontAwesomeIconFactory({ name: 'file' }),
                                        componentParts: [
                                          entryFactory(
                                            {
                                              text: 'Layer 3',
                                              icon: fontAwesomeIconFactory({ name: 'star' }),
                                              componentParts: [
                                                entryFactory(
                                                  {
                                                    text: 'Layer 4',
                                                    icon: fontAwesomeIconFactory({ name: 'check' }),
                                                    componentParts: [
                                                      entryFactory({
                                                        text: 'You reached the end!',
                                                      }),
                                                    ],
                                                  },
                                                  'layer4',
                                                ),
                                              ],
                                            },
                                            'layer3',
                                          ),
                                        ],
                                      },
                                      'layer2',
                                    ),
                                  ],
                                },
                                'layer1',
                              ),
                            ],
                          },
                          'layer0',
                        ),
                      ],
                    }),
                  ],
                },
                'collapsible-1',
                'data-guide-test',
              ),
            ],
          },
          footer,
        }),
      ],
    }),
  ],
});
