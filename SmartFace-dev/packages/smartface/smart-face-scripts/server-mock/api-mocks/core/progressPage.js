// @ts-check
import { cardFactory } from '../../../../shared/smartFaceComponentFactories/core/cardFactory.js';
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { gridFactory, gridItemFactory } from '../../../../shared/smartFaceComponentFactories/core/gridFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { progressFactory } from '../../../../shared/smartFaceComponentFactories/core/progressFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { streamlineIconFactory } from '../../../../shared/smartFaceComponentFactories/core/streamlineIconFactory.js';
import { footer } from '../shared/footer.js';
import { sidebar } from '../shared/sidebar.js';

const progress = [100, 85, 75, 50, 25, 15, 0];
const colors = ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'primary'];
const sizes = ['extraLarge', 'large', 'medium', 'medium', 'medium', 'small', 'extraSmall'];

const generateProgressCard = (presentation) => {
  const cardItems = [];

  progress.forEach((progress, index) => {
    cardItems.push(generateProgress(presentation, progress, colors[index], sizes[index]));
  });

  return cardItems;
};

const generateProgress = (presentation, progress, color, size) => {
  const props = size
    ? {
        presentation: `${presentation}`,
        progress: `${progress}`,
        color: `${color}`,
        size: `${size}`,
      }
    : {
        presentation: `${presentation}`,
        progress: `${progress}`,
        color: `${color}`,
      };

  return gridItemFactory({
    size: presentation === 'linear' ? 12 : 4,
    componentChildren: [progressFactory(props, undefined, 'data-guide-test')],
  });
};

/** @type {import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType.js').SmartFaceBackendDataType}  */
export const progressPage = smartFaceFactory({
  sfComponents: [
    pageFactory(
      {
        document: { head: { title: 'Progress Page' } },
        componentChildren: [
          classicLayoutFactory({
            sidebar: sidebar('progress-page'),
            content: {
              componentChildren: [
                gridFactory({
                  items: [
                    gridItemFactory(
                      {
                        size: 12,
                        componentChildren: [
                          cardFactory({
                            title: 'Progress Linear',
                            icon: streamlineIconFactory({ name: 'messages-bubble-double' }),
                            bodyChildren: [
                              gridFactory({
                                items: [
                                  ...generateProgressCard('linear'),
                                  gridItemFactory({
                                    size: 12,
                                    componentChildren: [progressFactory()],
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      },
                      'item-2',
                    ),
                    gridItemFactory(
                      {
                        size: 12,
                        componentChildren: [
                          cardFactory({
                            title: 'Progress Circular',
                            icon: streamlineIconFactory({ name: 'messages-bubble-double' }),
                            bodyChildren: [
                              gridFactory({
                                items: [
                                  ...generateProgressCard('circular'),
                                  gridItemFactory({
                                    size: 12,
                                    componentChildren: [
                                      progressFactory({
                                        presentation: 'circular',
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      },
                      'item-1',
                    ),
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
