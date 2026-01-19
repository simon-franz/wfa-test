// @ts-check

import { badgeFactory } from '../../../../shared/smartFaceComponentFactories/core/badgeFactory.js';
import { buttonFactory } from '../../../../shared/smartFaceComponentFactories/core/buttonFactory.js';
import { cardFactory } from '../../../../shared/smartFaceComponentFactories/core/cardFactory.js';
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { gridFactory, gridItemFactory } from '../../../../shared/smartFaceComponentFactories/core/gridFactory.js';
import { keyDownSideEffectFactory } from '../../../../shared/smartFaceComponentFactories/core/keyDownSideEffectFactory.js';
import { modalFactory, pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { streamlineIconFactory } from '../../../../shared/smartFaceComponentFactories/core/streamlineIconFactory.js';
import { textFactory } from '../../../../shared/smartFaceComponentFactories/core/textFactory.js';
import { timerFactory } from '../../../../shared/smartFaceComponentFactories/core/timerFactory.js';
import { tooltipFactory } from '../../../../shared/smartFaceComponentFactories/core/tooltipFactory.js';
import { footer } from '../shared/footer.js';
import { sidebar } from '../shared/sidebar.js';

// ERROR-Loop (Timer in GridItem + delete via Id)
const timerOnGridItemId_DeleteViaModalId = [
  gridItemFactory(
    {
      size: 6,
      componentChildren: [
        buttonFactory(
          {
            text: 'Modal + Timer on GridItem',
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
                          // 1. SideEffect - Patch (Add Modal)
                          {
                            operation: 'write',
                            targetSfId: 'page-0',
                            path: 'props.modals',
                            value: [
                              modalFactory(
                                {
                                  title: 'Modal patched next to Timer',
                                  entryAnimation: 'top',
                                  exitAnimation: 'right',
                                  closeable: true,
                                  bodyChildren: [
                                    textFactory(
                                      {
                                        htmlTag: 'p',
                                        text: 'Timer next to Modal',
                                      },
                                      'text-field-1',
                                    ),
                                  ],
                                },
                                'modal-1',
                              ),
                            ],
                          },
                          // 2. Patch (Add timerSideEffect)
                          {
                            operation: 'append',
                            targetSfId: 'grid-item-1-a',
                            path: 'props.componentChildren',
                            value: timerFactory(
                              {
                                tick: 10_000,
                                // tick: 0,
                                // interval: true,
                                // intervalTick: 3000,
                                // onTimerIsUp: [
                                //   {
                                //     type: 'request',
                                //     data: {
                                //       action: 'reflect',
                                //       reflectedData: {
                                //         sideEffects: [
                                //           {
                                //             type: 'patch',
                                //             updates: [
                                //               // 3. SideEffect - Patch (Remove Modal)
                                //               { operation: 'delete', targetSfId: 'modal-1', path: null },
                                //             ],
                                //           },
                                //         ],
                                //       },
                                //     },
                                //   },
                                // ],
                              },
                              'timer-1',
                            ),
                          },
                        ],
                      },
                    ],
                  },
                },
              },
            ],
          },
          'button-1',
        ),
      ],
    },
    'grid-item-1-a',
  ),
  gridItemFactory(
    {
      size: 6,
      componentChildren: [textFactory({ text: '=> timer deletes modal via modal-id' })],
    },
    'grid-item-1-b',
  ),
];

// WORKS (Timer in GridItem + delete via page props)
const timerOnGridItem_DeleteViaPageProps = [
  gridItemFactory(
    {
      size: 6,
      componentChildren: [
        buttonFactory(
          {
            text: 'Modal + Timer on GridItem',
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
                          // 1. SideEffect - Patch (Add Modal)
                          {
                            operation: 'write',
                            targetSfId: 'page-0',
                            path: 'props.modals',
                            value: [
                              modalFactory(
                                {
                                  title: 'Modal patched next to Timer',
                                  entryAnimation: 'top',
                                  exitAnimation: 'right',
                                  closeable: true,
                                  bodyChildren: [
                                    textFactory(
                                      {
                                        htmlTag: 'p',
                                        text: 'Timer next to Modal',
                                      },
                                      'text-field-2',
                                    ),
                                  ],
                                },
                                'modal-2',
                              ),
                            ],
                          },
                          // 2. Patch (Add timerSideEffect)
                          {
                            operation: 'append',
                            targetSfId: 'grid-item-2-a',
                            path: 'props.componentChildren',
                            value: timerFactory(
                              {
                                tick: 0,
                                interval: true,
                                intervalTick: 3000,
                                // onTimerIsUp: [
                                //   {
                                //     type: 'request',
                                //     data: {
                                //       action: 'reflect',
                                //       reflectedData: {
                                //         sideEffects: [
                                //           {
                                //             type: 'patch',
                                //             updates: [
                                //               {
                                //                 operation: 'delete',
                                //                 targetSfId: 'page-0',
                                //                 path: 'props.modals',
                                //               },
                                //             ],
                                //           },
                                //         ],
                                //       },
                                //     },
                                //   },
                                // ],
                              },
                              'timer-2',
                            ),
                          },
                        ],
                      },
                    ],
                  },
                },
              },
            ],
          },
          'button-2',
        ),
      ],
    },
    'grid-item-2-a',
  ),
  gridItemFactory(
    {
      size: 6,
      componentChildren: [textFactory({ text: '=> timer deletes modal via modals prop of page' })],
    },
    'grid-item-2-b',
  ),
];

// WORKS (Timer in Modal + delete via Id)
const timerInModal_DeleteViaModalId = [
  gridItemFactory(
    {
      size: 6,
      componentChildren: [
        buttonFactory(
          {
            text: "Modal + Timer in Modal's bodyChildren",
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
                            targetSfId: 'page-0',
                            path: 'props.modals',
                            value: [
                              modalFactory(
                                {
                                  title: 'Modal with Timer in bodyChildren',
                                  entryAnimation: 'top',
                                  exitAnimation: 'right',
                                  closeable: true,
                                  bodyChildren: [
                                    textFactory(
                                      {
                                        htmlTag: 'p',
                                        text: "Timer in Modal's bodyChildren",
                                      },
                                      'text-field-3',
                                    ),

                                    // Timer doing nothing
                                    timerFactory(
                                      {
                                        // tick: 10_000,
                                        tick: 0,
                                        interval: true,
                                        intervalTick: 3000,
                                      },
                                      'timer-3-a',
                                    ),

                                    // Timer deleting Modal via modals prop
                                    // for testing closing modal
                                    // timerFactory(
                                    //   {
                                    //     tick: 2000,
                                    //     interval: true,
                                    //     intervalTick: 3000,
                                    //     onTimerIsUp: [
                                    //       {
                                    //         type: 'request',
                                    //         data: {
                                    //           action: 'reflect',
                                    //           reflectedData: {
                                    //             sideEffects: [
                                    //               {
                                    //                 type: 'patch',
                                    //                 updates: [
                                    //                   {
                                    //                     operation: 'delete',
                                    //                     targetSfId: 'page-0',
                                    //                     path: 'props.modals',
                                    //                   },
                                    //                 ],
                                    //               },
                                    //             ],
                                    //           },
                                    //         },
                                    //       },
                                    //     ],
                                    //   },
                                    //   'timer-3-b',
                                    // ),
                                  ],
                                },
                                'modal-3',
                              ),
                            ],
                          },
                          // Delete Modal instant
                          {
                            operation: 'append',
                            targetSfId: 'grid-item-3-a',
                            path: 'props.componentChildren',
                            value: timerFactory(
                              {
                                // Works
                                // tick: 0,

                                // Bug
                                tick: 0,
                                // interval: true,
                                // intervalTick: 5000,
                                onTimerIsUp: [
                                  {
                                    type: 'request',
                                    data: {
                                      action: 'reflect',
                                      reflectedData: {
                                        sideEffects: [
                                          {
                                            type: 'patch',
                                            updates: [
                                              // 1. SideEffect - Patch (Remove Modal)
                                              { operation: 'delete', targetSfId: 'modal-3', path: null },
                                            ],
                                          },
                                        ],
                                      },
                                    },
                                  },
                                ],
                              },
                              'timer-till-delete-3-2-1',
                            ),
                          },
                        ],
                      },
                    ],
                  },
                },
              },
            ],
          },
          'button-3',
        ),
      ],
    },
    'grid-item-3-a',
  ),
  gridItemFactory(
    {
      size: 6,
      componentChildren: [textFactory({ text: '=> 2nd timer deletes modal instant via modal-id' })],
    },
    'grid-item-3-b',
  ),
];

// BASE
const backendTimerCard = gridFactory(
  {
    items: [
      gridItemFactory(
        {
          componentChildren: [
            cardFactory({
              title: 'Backend Timer Page',
              subtitle: 'Backend Timer Page',
              icon: streamlineIconFactory({ name: 'time-management' }),
              bodyChildren: [
                gridFactory({
                  items: [
                    gridItemFactory({
                      componentChildren: [
                        textFactory({ text: 'Backend-Requests: ', fullWidth: true }),
                        textFactory({ text: '0', fullWidth: true }, 'counterText'),
                      ],
                    }),
                    gridItemFactory(
                      {
                        componentChildren: [textFactory({ text: 'Active timers: ', fullWidth: true })],
                      },
                      'grid-item-1',
                    ),
                    gridItemFactory({
                      componentChildren: [
                        textFactory({ text: 'Backend load: ', fullWidth: true }),
                        badgeFactory({ text: 'off', color: 'secondary' }, 'backendLoadBadge'),
                      ],
                    }),
                  ],
                }),
              ],
              footerChildren: [
                gridFactory({
                  items: [
                    gridItemFactory({
                      componentChildren: [
                        gridFactory({
                          rowGap: 'extraSmall',
                          columnGap: 'extraSmall',
                          items: [
                            gridItemFactory({
                              componentChildren: [
                                buttonFactory(
                                  {
                                    text: 'Start 3s timer',
                                    color: 'success',
                                    onClick: [
                                      {
                                        type: 'request',
                                        data: {
                                          action: 'backend-timer-page',
                                          pageEvent: 'startSingleTimer',
                                        },
                                      },
                                    ],
                                  },
                                  'timer-button',
                                ),
                              ],
                            }),
                            gridItemFactory({
                              componentChildren: [
                                buttonFactory(
                                  {
                                    text: 'Start 3s interval timer',
                                    color: 'success',
                                    onClick: [
                                      {
                                        type: 'request',
                                        data: {
                                          action: 'backend-timer-page',
                                          pageEvent: 'startIntervalTimer',
                                        },
                                      },
                                    ],
                                  },
                                  'interval-timer-button',
                                ),
                              ],
                            }),
                            gridItemFactory({
                              componentChildren: [
                                buttonFactory(
                                  {
                                    text: 'Activate backend load',
                                    color: 'success',
                                    onClick: [
                                      {
                                        type: 'request',
                                        data: {
                                          action: 'backend-timer-page',
                                          pageEvent: 'activateBackendLoad',
                                        },
                                      },
                                    ],
                                  },
                                  'backendload-button',
                                ),
                              ],
                            }),
                            gridItemFactory({
                              componentChildren: [
                                buttonFactory({
                                  text: 'Update sfEvent',
                                  color: 'secondary',
                                  onClick: [
                                    {
                                      type: 'request',
                                      data: {
                                        action: 'backend-timer-page',
                                        pageEvent: 'updateSfEvent',
                                      },
                                    },
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    gridItemFactory({
                      componentChildren: [
                        gridFactory({
                          rowGap: 'extraSmall',
                          columnGap: 'extraSmall',
                          items: [
                            gridItemFactory({
                              componentChildren: [
                                buttonFactory(
                                  {
                                    text: 'Stop 3s timer',
                                    color: 'danger',
                                    disabled: true,
                                    onClick: [
                                      {
                                        type: 'request',
                                        data: {
                                          action: 'backend-timer-page',
                                          pageEvent: 'stopSingleTimer',
                                        },
                                      },
                                    ],
                                  },
                                  'deactivate-timer-button',
                                ),
                              ],
                            }),
                            gridItemFactory({
                              componentChildren: [
                                buttonFactory(
                                  {
                                    text: 'Stop 3s interval timer',
                                    color: 'danger',
                                    disabled: true,
                                    onClick: [
                                      {
                                        type: 'request',
                                        data: {
                                          action: 'backend-timer-page',
                                          pageEvent: 'stopIntervalTimer',
                                        },
                                      },
                                    ],
                                  },
                                  'deactivate-interval-timer-button',
                                ),
                              ],
                            }),
                            gridItemFactory({
                              componentChildren: [
                                buttonFactory(
                                  {
                                    text: 'Deactivate backend load',
                                    color: 'danger',
                                    disabled: true,
                                    onClick: [
                                      {
                                        type: 'request',
                                        data: {
                                          action: 'backend-timer-page',
                                          pageEvent: 'deactivateBackendLoad',
                                        },
                                      },
                                    ],
                                  },
                                  'deactivate-backendload-button',
                                ),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    gridItemFactory({
                      componentChildren: [
                        textFactory({ text: 'Test-Cases (hover for description): ' }),
                        textFactory({
                          text: 'Do not start/stop any other timer while running a test-case',
                        }),
                        tooltipFactory({
                          text: 'Start 3s interval timer and request it to be removed when the timer is up',
                          componentChildren: [
                            buttonFactory(
                              {
                                text: 'Test 1',
                                onClick: [
                                  {
                                    type: 'request',
                                    data: {
                                      action: 'backend-timer-page',
                                      pageEvent: 'testCase1',
                                    },
                                  },
                                ],
                              },
                              'test-case-1-button',
                            ),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        },
        'item-timercard',
      ),
      gridItemFactory(
        {
          componentChildren: [
            cardFactory({
              title: 'Timer Test',
              subtitle: 'Delete Modal',
              icon: streamlineIconFactory({ name: 'time-management' }),
              bodyChildren: [
                gridFactory({
                  items: [
                    // ...timerOnGridItemId_DeleteViaModalId,
                    // ...timerOnGridItem_DeleteViaPageProps,
                    ...timerInModal_DeleteViaModalId,
                  ],
                }),
              ],
            }),
          ],
        },
        'item-bugcard',
      ),
    ],
  },
  'grid-0',
);

/**
 * @type { import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType }
 */
export const backendTimerPage = smartFaceFactory({
  sfComponents: [
    pageFactory(
      {
        document: { head: { title: 'Backend Timer Page' } },
        componentChildren: [
          keyDownSideEffectFactory(
            {
              shortcut: { key: 'y' },
              onKeyDown: [
                {
                  type: 'request',
                  url: '/update',
                  data: { action: 'key-down' },
                },
              ],
            },
            'key-down-0',
          ),
          classicLayoutFactory({
            sidebar: sidebar('backend-timer-page', ['side-effect-pages']),
            content: {
              componentChildren: [backendTimerCard],
            },
            footer,
          }),
        ],
      },
      'page-0',
    ),
  ],
});
