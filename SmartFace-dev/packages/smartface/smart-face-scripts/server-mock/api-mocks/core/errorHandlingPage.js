// @ts-check

import { buttonFactory } from '#shared/smartFaceComponentFactories/core/buttonFactory';
import { gridFactory, gridItemFactory } from '#shared/smartFaceComponentFactories/core/gridFactory';
import { imageFactory } from '#shared/smartFaceComponentFactories/core/imageFactory';
import { sectionFactory } from '#shared/smartFaceComponentFactories/core/sectionFactory';

import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { dateRangeFieldFactory } from '../../../../shared/smartFaceComponentFactories/core/dateRangeFieldFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { footer } from '../shared/footer.js';
import { patchFactory } from '../shared/patchFactory.js';

/**
 * @type { import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType }
 */
export const errorHandlingPage = smartFaceFactory({
  sfComponents: [
    pageFactory({
      document: { head: { title: 'Error Handling' } },
      componentChildren: [
        classicLayoutFactory(
          {
            content: {
              componentChildren: [
                gridFactory({
                  items: [
                    gridItemFactory({
                      componentChildren: [
                        sectionFactory({
                          expanded: true,
                          title: 'Error Tests',
                          componentChildren: [
                            gridFactory({
                              items: [
                                gridItemFactory({
                                  size: 3,
                                  componentChildren: [
                                    buttonFactory({
                                      text: 'Update Page Crash Text',
                                      color: 'primary',
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
                                                    sfTranslations: {
                                                      'render-error-title': 'Hallo',
                                                      'render-error-message': 'Ich bin ein neuer',
                                                      'render-error-information': 'Text',
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
                                gridItemFactory(
                                  {
                                    size: 2,
                                    componentChildren: [
                                      buttonFactory({
                                        text: 'Page Crash',
                                        onClick: [
                                          {
                                            type: 'request',
                                            data: {
                                              action: 'reflect',
                                              reflectedData: patchFactory([
                                                {
                                                  operation: 'append',
                                                  targetSfId: 'griddo',
                                                  path: 'props.componentChildren',
                                                  value: {
                                                    sfComponent: 'FontAwesomeIconSvg',
                                                    sfId: 'id-37f0b623-23d6-4025-875e-3af2812a3b276',
                                                    props: {
                                                      variant: 'solid',
                                                      name: 'InvalidIconTest',
                                                    },
                                                  },
                                                },
                                              ]),
                                            },
                                          },
                                        ],
                                      }),
                                    ],
                                  },
                                  'griddo',
                                ),
                                gridItemFactory({
                                  size: 2,
                                  componentChildren: [
                                    buttonFactory({
                                      text: 'Icon not Found Error',
                                      onClick: [
                                        {
                                          type: 'request',
                                          data: {
                                            action: 'reflect',
                                            reflectedData: patchFactory([
                                              {
                                                operation: 'append',
                                                targetSfId: 'griddo',
                                                path: 'props.componentChildren',
                                                value: {
                                                  sfComponent: 'FontAwesomeIcon',
                                                  sfId: 'id-37f0b623-23d6-4025-875e-3af2812a3b76',
                                                  props: {
                                                    variant: 'solid',
                                                    name: 'InvalidIconTest',
                                                  },
                                                },
                                              },
                                            ]),
                                          },
                                        },
                                      ],
                                    }),
                                  ],
                                }),
                                gridItemFactory({
                                  componentChildren: [
                                    imageFactory(
                                      {
                                        src: 'https://placedog.net/500',
                                        alt: 'This is a very descriptive alt text',
                                        fullWidth: false,
                                      },
                                      'image-0',
                                      'data-guide-0',
                                    ),
                                  ],
                                }),
                                gridItemFactory({
                                  size: 3,
                                  componentChildren: [
                                    buttonFactory({
                                      text: 'Network Error - will not be submitted to Sentry',
                                      color: 'danger',
                                      onClick: [
                                        {
                                          type: 'request',
                                          url: 'https://nixistechterlink.de',
                                          data: {
                                            action: 'testNetworkError',
                                          },
                                        },
                                      ],
                                    }),
                                  ],
                                }),
                                gridItemFactory({
                                  size: 3,
                                  componentChildren: [
                                    buttonFactory({
                                      text: 'Unknown Component Error - will cause Page crash',
                                      color: 'warning',
                                      onClick: [
                                        {
                                          type: 'request',
                                          data: {
                                            action: 'reflect',
                                            reflectedData: patchFactory([
                                              {
                                                operation: 'append',
                                                targetSfId: 'griddo',
                                                path: 'props.componentChildren',
                                                value: {
                                                  sfComponent: 'NonExistentComponent',
                                                  sfId: 'error-component-test',
                                                  props: {
                                                    someProperty: 'test',
                                                  },
                                                },
                                              },
                                            ]),
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
                        dateRangeFieldFactory({
                          label: 'Invalid Max Value',
                          name: 'dateRangeField-9',
                          maxValue: 'Invalide Eingabe',
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            },
            footer,
          },
          'a',
        ),
      ],
    }),
  ],
});
