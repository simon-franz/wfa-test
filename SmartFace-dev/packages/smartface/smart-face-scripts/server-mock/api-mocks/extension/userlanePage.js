// @ts-check

import { backendRequestSideEffectFactory } from '../../../../shared/smartFaceComponentFactories/core/backendRequestSideEffectFactory.js';
import { buttonFactory } from '../../../../shared/smartFaceComponentFactories/core/buttonFactory.js';
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { sectionFactory } from '../../../../shared/smartFaceComponentFactories/core/sectionFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { tooltipFactory } from '../../../../shared/smartFaceComponentFactories/core/tooltipFactory.js';
import { footer } from '../shared/footer.js';
import { sidebar } from '../shared/sidebar.js';

/**
 * @type { import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType }
 */
export const userlanePage = smartFaceFactory({
  sfComponents: [
    pageFactory({
      document: { head: { title: 'Userlane Page' } },
      componentChildren: [
        backendRequestSideEffectFactory({
          onLoad: [{ type: 'userlane-action', action: 'open-assistant' }],
        }),
        classicLayoutFactory({
          sidebar: sidebar('userlane-page', ['Components']),
          content: {
            componentChildren: [
              sectionFactory({
                title: 'Setup Userlane - Klick die Buttons damit Userlane aktiviert wird ',
                componentChildren: [
                  buttonFactory({
                    text: '1. Setup Application to SmartFace Test Project',
                    color: 'success',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: {
                            sideEffects: [
                              {
                                type: 'updateSmartFaceBackendConfig',
                                fields: {
                                  sfGuidanceHandler: {
                                    config: { application: '3q4kdqy10r' },
                                  },
                                },
                              },
                            ],
                          },
                        },
                      },
                    ],
                  }),
                  buttonFactory({
                    text: '2. Setup UserId',
                    color: 'success',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: {
                            sideEffects: [
                              {
                                type: 'updateSmartFaceBackendConfig',
                                fields: {
                                  sfGuidanceHandler: {
                                    config: {
                                      userId: 'smartface-tester',
                                    },
                                  },
                                },
                              },
                            ],
                          },
                        },
                      },
                    ],
                  }),
                  tooltipFactory({
                    fullWidth: false,
                    title: 'Erklärung:',
                    text: 'In Userlane können Benutzer über eine Custom-id, in diesem Fall "smartface-tester", sowie über Custom-Attribute identifiziert werden. Dies ist notwendig, da nicht jedem Benutzer die gleichen Guides angezeigt werden sollen. Diese Custom-Attribute können in einem frei wählbaren Objekt definiert werden. Die Key-Value-Paare sind dabei frei wählbar, müssen aber in der Userlane-Applikation hinterlegt werden, damit diese letztendlich zugeordnet werden können. In diesem konkreten Fall habe ich im Webinterface von Userlane festgelegt, dass es ein `role` Attribut geben wird. Mit einer Fallabfrage habe ich dann festgelegt, dass wenn die Rolle === `user` ist, ein anderer Guide innerhalb der Mock-API-Examples angezeigt werden soll. Das ganze Konzept mit der Fallabfrage wird bei Userlane "Segmentierung" genannt.',
                    componentChildren: [
                      buttonFactory({
                        text: '3. Change role to user',
                        color: 'success',
                        onClick: [
                          {
                            type: 'request',
                            data: {
                              action: 'reflect',
                              reflectedData: {
                                sideEffects: [
                                  {
                                    type: 'updateSmartFaceBackendConfig',
                                    fields: {
                                      sfGuidanceHandler: {
                                        config: { segmentAttributes: { role: 'user' } },
                                      },
                                    },
                                  },
                                ],
                              },
                            },
                          },
                        ],
                      }),
                    ],
                  }),
                  buttonFactory({
                    text: '3. Change role to admin',
                    color: 'success',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: {
                            sideEffects: [
                              {
                                type: 'updateSmartFaceBackendConfig',
                                fields: {
                                  sfGuidanceHandler: {
                                    config: { segmentAttributes: { role: 'admin' } },
                                  },
                                },
                              },
                            ],
                          },
                        },
                      },
                    ],
                  }),
                ],
              }),

              tooltipFactory({
                title: 'Erklärung:',
                text: 'Öffnet den Userlane-Assistent',
                componentChildren: [
                  buttonFactory(
                    {
                      text: 'Open-Userlane',
                      onClick: [
                        {
                          type: 'userlane-action',
                          action: 'open-assistant',
                        },
                      ],
                    },
                    undefined,
                    'ec7c7711-91be-473a-94d7-2a762cea7fbc',
                  ),
                ],
              }),
              tooltipFactory({
                title: 'Erklärung:',
                text: 'Ändert die Sprache zu englisch. In Userlane ist es möglich individuell je Sprache einen anderen Text anzuzeigen.',
                componentChildren: [
                  buttonFactory({
                    text: 'Change Language to "en',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: {
                            sideEffects: [
                              {
                                type: 'updateSmartFaceBackendConfig',
                                fields: {
                                  sfGuidanceHandler: {
                                    config: { language: 'en' },
                                  },
                                },
                              },
                            ],
                          },
                        },
                      },
                    ],
                  }),
                ],
              }),

              tooltipFactory({
                title: 'Erklärung:',
                text: 'Ändert die custom-id von smartface-tester zu secret-user',
                componentChildren: [
                  buttonFactory({
                    text: 'Change userId to secret-user',
                    color: 'warning',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: {
                            sideEffects: [
                              {
                                type: 'updateSmartFaceBackendConfig',
                                fields: {
                                  sfGuidanceHandler: {
                                    config: { userId: 'secret-user' },
                                  },
                                },
                              },
                            ],
                          },
                        },
                      },
                    ],
                  }),
                ],
              }),
              tooltipFactory({
                title: 'Erklärung:',
                text: 'In Userlane ist es auch möglich direkt in eine Tour zu springen.',
                componentChildren: [
                  buttonFactory({
                    text: 'Trigger SmartFace Admin-Tour',
                    color: 'warning',
                    onClick: [
                      {
                        type: 'userlane-action',
                        action: 'start-tour',
                        tour: { id: '116725' },
                      },
                    ],
                  }),
                ],
              }),
              tooltipFactory({
                title: 'Erklärung:',
                text: 'In Userlane ist es auch möglich direkt in eine Tour sowie zu einem bestimmten Schritt innerhalb einer Tour zu springen.',
                componentChildren: [
                  buttonFactory({
                    text: 'Trigger SmartFace Admin-Tour at Step 2',
                    color: 'warning',
                    onClick: [
                      {
                        type: 'userlane-action',
                        action: 'start-tour',
                        tour: { id: '116725', step: 2 },
                      },
                    ],
                  }),
                ],
              }),
              tooltipFactory({
                title: 'Erklärung:',
                text: 'Innerhalb von Userlane gibt es mehrere sogenannte Applications. Diese kann man sich wie verschiedene Repos vorstellen. In jeder Application können Touren und Segmente, User, definiert werden. Ein Segment ist nichts anderes als ein Filter, der bestimmt, wer welche Touren sehen darf. Die Aktionen der Warning Buttons gibt es in der HRworks Application nicht, daher funktionieren diese nicht mehr, sobald man die Application wechselt. Sobald du die Application wechselst, wird das Userlane Icon verschwinden wodurch es nurnoch über den `open-userlane`-Button geöffnet werden kann. Das ist so gewollt.',
                componentChildren: [
                  buttonFactory({
                    text: 'Change application to hrworks (breaks orange buttons) CURRENTLY BROKEN',
                    color: 'danger',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: {
                            sideEffects: [
                              {
                                type: 'updateSmartFaceBackendConfig',
                                fields: {
                                  sfGuidanceHandler: {
                                    config: { application: '3q4kdqy10r' },
                                  },
                                },
                              },
                            ],
                          },
                        },
                      },
                    ],
                  }),
                ],
              }),
            ],
          },
          footer,
        }),
      ],
    }),
  ],
});
