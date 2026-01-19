// @ts-check

import { buttonFactory } from '#shared/smartFaceComponentFactories/core/buttonFactory';
import { cardFactory } from '#shared/smartFaceComponentFactories/core/cardFactory';
import { classicLayoutFactory } from '#shared/smartFaceComponentFactories/core/classicLayoutFactory';
import { gridFactory, gridItemFactory } from '#shared/smartFaceComponentFactories/core/gridFactory';
import { iframeFactory } from '#shared/smartFaceComponentFactories/core/iframeFactory';
import { pageFactory } from '#shared/smartFaceComponentFactories/core/pageFactory';
import { sizeHandlerFactory } from '#shared/smartFaceComponentFactories/core/sizeHandlerFactory';
import { smartFaceFactory } from '#shared/smartFaceComponentFactories/core/smartFaceFactory';

import { footer } from '../shared/footer.js';
import { sidebar } from '../shared/sidebar.js';

/**
 * @type { import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType }
 */
export const sizeHandlerPage = smartFaceFactory({
  sfComponents: [
    pageFactory(
      {
        document: { head: { title: 'Size Handler Page' } },
        componentChildren: [
          classicLayoutFactory({
            sidebar: sidebar('sidehandler-page', ['side-effect-pages']),
            content: {
              componentChildren: [
                gridFactory({
                  items: [
                    gridItemFactory({
                      componentChildren: [
                        cardFactory({
                          title: 'Size Handler with different buttons',
                          bodyChildren: [
                            gridFactory({
                              items: [
                                gridItemFactory({
                                  componentChildren: [
                                    sizeHandlerFactory({
                                      width: 200,
                                      maxWidth: '100%',
                                      componentChildren: [
                                        buttonFactory({
                                          text: 'width: 200px',
                                          fullWidth: true,
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                gridItemFactory({
                                  componentChildren: [
                                    sizeHandlerFactory({
                                      width: 400,
                                      maxWidth: '100%',
                                      componentChildren: [
                                        buttonFactory({
                                          text: 'width: 400px',
                                          fullWidth: true,
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                gridItemFactory({
                                  componentChildren: [
                                    sizeHandlerFactory({
                                      width: 600,
                                      maxWidth: '100%',
                                      componentChildren: [
                                        buttonFactory({
                                          text: 'width: 600px',
                                          fullWidth: true,
                                        }),
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
                    gridItemFactory({
                      componentChildren: [
                        cardFactory({
                          title: 'Size Handler with iframe height 400px',
                          bodyChildren: [
                            sizeHandlerFactory({
                              height: 400,
                              componentChildren: [
                                iframeFactory({
                                  title: "Help! I'm wrapped by a SizeHandler!!",
                                  src: 'https://d9yw7530xbzu.cloudfront.net/assets/V15DetectUserManual.pdf',
                                  fullHeight: true,
                                }),
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
            footer,
          }),
        ],
      },
      'page-0',
    ),
  ],
});
