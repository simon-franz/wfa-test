import { buttonFactory } from '../../../../shared/smartFaceComponentFactories/core/buttonFactory.js';
import { cardFactory } from '../../../../shared/smartFaceComponentFactories/core/cardFactory.js';
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { gridFactory, gridItemFactory } from '../../../../shared/smartFaceComponentFactories/core/gridFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { streamlineIconFactory } from '../../../../shared/smartFaceComponentFactories/core/streamlineIconFactory.js';
import { sliderFactory } from '../../../../shared/smartFaceComponentFactories/extension/sliderFactory.js';
import { footer } from '../shared/footer.js';
import { sidebar } from '../shared/sidebar.js';

/**
 * @type { import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType }
 */
export const audioPage = smartFaceFactory({
  sfComponents: [
    pageFactory({
      document: { head: { title: 'Audio Page' } },
      componentChildren: [
        classicLayoutFactory({
          sidebar: sidebar('audio-page', ['miscellaneous']),
          content: {
            componentChildren: [
              gridFactory({
                items: [
                  gridItemFactory(
                    {
                      size: 12,
                      componentChildren: [
                        cardFactory({
                          title: 'Audio Player',
                          subtitle:
                            "Click 'Replace Audio' while the funky beats are playing to replace it with the Buzzer",
                          icon: streamlineIconFactory({ name: 'controls-play-full' }),
                          footerChildren: [
                            gridFactory({
                              justifyContent: 'center',
                              alignItems: 'center',
                              items: [
                                gridItemFactory(
                                  {
                                    componentChildren: [
                                      buttonFactory({
                                        text: 'Play',
                                        onClick: [{ type: 'request', data: { action: 'play-sound' } }],
                                        fullWidth: true,
                                        color: 'primary',
                                        leftIcon: streamlineIconFactory({ name: 'controls-play-full' }),
                                      }),
                                    ],
                                  },
                                  'sound-grid-item',
                                ),
                                gridItemFactory(
                                  {
                                    componentChildren: [
                                      buttonFactory({
                                        text: 'Reset',
                                        onClick: [{ type: 'request', data: { action: 'reset-sound' } }],
                                        fullWidth: true,
                                        color: 'danger',
                                        leftIcon: streamlineIconFactory({ name: 'controls-pause-full' }),
                                      }),
                                    ],
                                  },
                                  'sound-reset-grid-item',
                                ),
                                gridItemFactory(
                                  {
                                    componentChildren: [
                                      buttonFactory({
                                        text: 'Replace Audio',
                                        onClick: [{ type: 'request', data: { action: 'replace-audio' } }],
                                        fullWidth: true,
                                        color: 'secondary',
                                      }),
                                    ],
                                  },
                                  'sound-replace-grid-item',
                                ),
                                gridItemFactory(
                                  {
                                    size: 2,
                                    componentChildren: [
                                      sliderFactory(
                                        {
                                          value: 60,
                                          onValueChange: [{ type: 'request', data: { action: 'update-audio-volume' } }],
                                        },
                                        'slider',
                                      ),
                                    ],
                                  },
                                  'sound-update-grid-item',
                                ),
                              ],
                            }),
                          ],
                        }),
                      ],
                    },
                    'item-2',
                  ),
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
