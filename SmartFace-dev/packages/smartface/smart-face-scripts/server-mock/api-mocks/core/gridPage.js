import { fontAwesomeIconFactory } from '#shared/smartFaceComponentFactories/core/fontAwesomeIconFactory';

import { alertFactory } from '../../../../shared/smartFaceComponentFactories/core/alertFactory.js';
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { gridFactory, gridItemFactory } from '../../../../shared/smartFaceComponentFactories/core/gridFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { footer } from '../shared/footer.js';
import { sidebar } from '../shared/sidebar.js';

/**
 * @type { import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType }
 */
export const gridPage = smartFaceFactory({
  sfComponents: [
    pageFactory({
      document: { head: { title: 'Grid Page' } },
      componentChildren: [
        classicLayoutFactory({
          sidebar: sidebar('Grid-page', ['component-pages']),
          content: {
            componentChildren: [
              gridFactory(
                {
                  gap: 'extraLarge',
                  columnGap: 'small',
                  items: [
                    gridItemFactory(
                      {
                        size: 'default',
                        componentChildren: [alertFactory({ title: 'Explicit Default-Size (12)', closeable: true })],
                      },
                      undefined,
                      'data-guide-test',
                    ),
                    gridItemFactory({
                      componentChildren: [alertFactory({ title: 'Implicit Default-Size (12)', text: 'Funny test' })],
                    }),
                    gridItemFactory({
                      size: 4,
                      componentChildren: [alertFactory({ title: 'Child: 1', text: 'Size 4' })],
                    }),
                    gridItemFactory({
                      fullHeight: true,
                      size: 4,
                      componentChildren: [
                        alertFactory({
                          title: 'Child: 2 Size 4',
                          text: 'Funny test Funny test Funny test Funny test Funny test Funny test Funny test Funny test Funny test Funny test Funny test Funny test Funny test Funny test ',
                        }),
                      ],
                    }),
                    gridItemFactory({
                      size: 4,
                      componentChildren: [alertFactory({ title: 'Child: 3', text: 'Size 4' })],
                    }),
                    gridItemFactory({
                      size: 4,
                      componentChildren: [alertFactory({ title: 'Child: 4', text: 'Size 4' })],
                    }),
                    gridItemFactory({
                      size: { sm: 3, md: 'default', lg: 8, xl: 12 },
                      componentChildren: [
                        alertFactory({
                          title: 'Child: 5',
                          text: 'Responsive Size: xs: unset, sm: 3, md: default, lg: 8, xl: 12',
                        }),
                      ],
                    }),
                    gridItemFactory({
                      size: 12,
                      visible: true,
                      componentChildren: [
                        alertFactory({
                          title: 'Visibile: true + kleinen Witz',
                          text: 'Papa hast du Gestern noch im Bett mit Mama Weißwurst gegessen. Nö, wieso? Auf dem Nachttisch hab ich noch die Haut gefunden.',
                          corner: 'square',
                          color: 'success',
                          closeable: true,
                          icon: fontAwesomeIconFactory(),
                        }),
                      ],
                    }),
                    gridItemFactory({
                      size: 12,
                      visible: false,
                      componentChildren: [alertFactory({ title: 'Visibile: false' })],
                    }),
                    gridItemFactory({
                      size: 12,
                      visible: ['xs', 'md', 'xl'],
                      componentChildren: [alertFactory({ title: 'visible: [xs, md, xl],' })],
                    }),
                    gridItemFactory({
                      size: 12,
                      visible: '<=lg',
                      componentChildren: [alertFactory({ title: 'visible: <=lg,' })],
                    }),
                    gridItemFactory({
                      size: 12,
                      visible: '>=lg',
                      componentChildren: [alertFactory({ title: 'visible: >=lg,' })],
                    }),
                    gridItemFactory({
                      size: 12,
                      visible: 'lg',
                      componentChildren: [alertFactory({ title: 'visible: lg,' })],
                    }),
                  ],
                },
                undefined,
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
