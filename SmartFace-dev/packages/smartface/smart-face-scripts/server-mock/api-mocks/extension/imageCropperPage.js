// @ts-check

import { buttonFactory } from '../../../../shared/smartFaceComponentFactories/core/buttonFactory.js';
import { cardFactory } from '../../../../shared/smartFaceComponentFactories/core/cardFactory.js';
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { formFactory } from '../../../../shared/smartFaceComponentFactories/core/formFactory.js';
import { gridFactory, gridItemFactory } from '../../../../shared/smartFaceComponentFactories/core/gridFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { textFactory } from '../../../../shared/smartFaceComponentFactories/core/textFactory.js';
import { imageCropperFactory } from '../../../../shared/smartFaceComponentFactories/extension/imageCropperFactory.js';
import { footer } from '../shared/footer.js';
import { patchFactory } from '../shared/patchFactory.js';
import { sidebar } from '../shared/sidebar.js';

/** @type {import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType}  */
export const imageCropperPage = smartFaceFactory({
  sfComponents: [
    pageFactory(
      {
        document: { head: { title: 'Image Cropper Page' } },
        componentChildren: [
          classicLayoutFactory({
            sidebar: sidebar('image-cropper-page', ['component-pages']),
            content: {
              componentChildren: [
                formFactory({
                  componentChildren: [
                    gridFactory(
                      {
                        items: [
                          gridItemFactory({
                            size: 12,
                            componentChildren: [
                              cardFactory({
                                title: '1280x1168',
                                bodyChildren: [
                                  gridFactory({
                                    items: [
                                      gridItemFactory({
                                        componentChildren: [
                                          imageCropperFactory(
                                            {
                                              name: 'new-image',
                                              url: 'http://localhost:3000/ui-assets/pictures/profile.jpg',
                                            },
                                            'image-cropper-0',
                                            'data-guide-test',
                                          ),
                                        ],
                                      }),
                                      gridItemFactory({
                                        componentChildren: [
                                          buttonFactory({
                                            text: 'Submit Crop',
                                            onClick: [{ type: 'request', data: { action: 'return-empty' } }],
                                          }),
                                        ],
                                      }),
                                      gridItemFactory({
                                        componentChildren: [
                                          buttonFactory({
                                            text: 'Change URL',
                                            onClick: [
                                              {
                                                type: 'request',
                                                data: {
                                                  action: 'reflect',
                                                  reflectedData: patchFactory([
                                                    {
                                                      operation: 'write',
                                                      targetSfId: 'image-cropper-0',
                                                      path: 'props.url',
                                                      value:
                                                        'https://fastly.picsum.photos/id/606/200/300.jpg?hmac=BRE2ZQWvR5ntz52bw_Js0wWKmc4kKVAAppUz4_xfewo',
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
                                footerChildren: [
                                  imageCropperFactory(
                                    {
                                      name: 'new-image-2',
                                      url: 'https://placedog.net/100/100',
                                    },
                                    'image-cropper-2',
                                    'data-guide-test-2',
                                  ),
                                ],
                              }),
                            ],
                          }),
                        ],
                      },
                      'grid-0',
                    ),
                  ],
                }),
                formFactory({
                  componentChildren: [
                    gridFactory(
                      {
                        items: [
                          gridItemFactory({
                            size: 12,
                            componentChildren: [
                              textFactory({
                                text: 'Examples of images with smaller size:',
                                fontSize: 'extraLarge',
                                fontWeight: 'bold',
                              }),
                            ],
                          }),
                          gridItemFactory({
                            size: { xs: 12, sm: 6 },
                            componentChildren: [
                              cardFactory({
                                title: '200x300',
                                bodyChildren: [
                                  imageCropperFactory({
                                    name: 'image-small-1',
                                    url: 'https://placedog.net/100/100',
                                  }),
                                ],
                                footerChildren: [],
                              }),
                            ],
                          }),
                          gridItemFactory({
                            size: { xs: 12, sm: 6 },
                            componentChildren: [
                              cardFactory({
                                title: '100x100',
                                bodyChildren: [
                                  imageCropperFactory({
                                    name: 'image-small-2',
                                    url: 'https://placedog.net/100/100',
                                  }),
                                ],
                                footerChildren: [],
                              }),
                            ],
                          }),
                          gridItemFactory({
                            size: { xs: 12, sm: 12 },
                            componentChildren: [
                              cardFactory({
                                title: '200x100',
                                bodyChildren: [
                                  imageCropperFactory({
                                    name: 'image-small-3',
                                    url: 'https://placedog.net/100/100',
                                  }),
                                ],
                                footerChildren: [],
                              }),
                            ],
                          }),
                        ],
                      },
                      'grid-0',
                    ),
                  ],
                }),
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
