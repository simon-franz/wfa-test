//@ts-check

import { buttonFactory } from '../../../../shared/smartFaceComponentFactories/core/buttonFactory.js';
import { gridFactory, gridItemFactory } from '../../../../shared/smartFaceComponentFactories/core/gridFactory.js';
import { textFactory } from '../../../../shared/smartFaceComponentFactories/core/textFactory.js';

/**
 * @type { import('../../../../src/adapters/core/ClassicLayoutAdapter/ClassicLayoutAdapter.types').ClassicLayoutBackendProps['footer'] }
 */
export const footer = {
  componentChildren: [
    gridFactory({
      rowGap: 'extraSmall',
      columnGap: 'extraSmall',
      items: [
        gridItemFactory({
          componentChildren: [
            textFactory({
              text: '© 1998 - 2026 HRworks GmbH',
            }),
          ],
        }),
        gridItemFactory({
          componentChildren: [
            buttonFactory({ text: 'About', variant: 'link' }),
            buttonFactory({ text: 'Privacy', variant: 'link' }),
            buttonFactory({ text: 'FAQ', variant: 'link' }),
          ],
        }),
      ],
    }),
  ],
};
