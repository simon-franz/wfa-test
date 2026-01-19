// @ts-check

import { alertFactory } from '../../../../shared/smartFaceComponentFactories/core/alertFactory.js';
import { buttonFactory } from '../../../../shared/smartFaceComponentFactories/core/buttonFactory.js';
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { gridFactory, gridItemFactory } from '../../../../shared/smartFaceComponentFactories/core/gridFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { footer } from '../shared/footer.js';
import { sidebar } from '../shared/sidebar.js';

/**
 * @type { import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType }
 */
export const smartFaceBackendConfigPage = smartFaceFactory({
  sfComponents: [
    pageFactory({
      document: { head: { title: 'SmartFace Backend Config Page' } },
      componentChildren: [
        classicLayoutFactory({
          sidebar: sidebar('smart-face-backend-config-page', ['side-effect-pages']),
          content: {
            componentChildren: [
              gridFactory({
                items: [
                  gridItemFactory({
                    size: 12,
                    componentChildren: [
                      alertFactory({
                        title: 'Attention',
                        text: "You need to replace 'REPLACE_FOR_BACKEND_CONFIG' in index.html with an empty object",
                      }),
                    ],
                  }),
                  gridItemFactory({
                    componentChildren: [
                      buttonFactory({
                        text: 'Switch to dark',
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
                                      sfTheme: 'hrwDarkMode',
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
                  gridItemFactory({
                    componentChildren: [
                      buttonFactory({
                        text: 'Initial update',
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
                                      sfCustomHeaders: {
                                        a: 'b',
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
                  gridItemFactory({
                    componentChildren: [
                      buttonFactory({
                        text: 'Merge update',
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
                                      sfCustomHeaders: {
                                        b: 'c',
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
                  gridItemFactory({
                    componentChildren: [
                      buttonFactory({
                        text: 'Replace update',
                        onClick: [
                          {
                            type: 'request',
                            data: {
                              action: 'reflect',
                              reflectedData: {
                                sideEffects: [
                                  {
                                    type: 'updateSmartFaceBackendConfig',
                                    merge: false,
                                    fields: {
                                      sfCustomHeaders: {
                                        c: 'd',
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
              }),
            ],
          },
          footer,
        }),
      ],
    }),
  ],
});
