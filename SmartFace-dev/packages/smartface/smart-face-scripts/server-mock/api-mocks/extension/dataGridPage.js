// @ts-check
import { buttonFactory } from '#shared/smartFaceComponentFactories/core/buttonFactory';
import { textFactory } from '#shared/smartFaceComponentFactories/core/textFactory';

import { cardFactory } from '../../../../shared/smartFaceComponentFactories/core/cardFactory.js';
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { gridFactory, gridItemFactory } from '../../../../shared/smartFaceComponentFactories/core/gridFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { createRandomUser } from '../dataGridBackend/createRandomUser.js';
import { createRandomUserWithOnClick } from '../dataGridBackend/createRandomUserWithOnClick.js';
import { footer } from '../shared/footer.js';
import { getDataGrid } from '../shared/getDataGrid.js';
import { sidebar } from '../shared/sidebar.js';

const singleRow = Array.from({ length: 1 }).map((_, _i) => createRandomUser(2));
const singleRowWithOnClick = Array.from({ length: 1 }).map((_, _i) => createRandomUserWithOnClick(2));

/** @type {import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType}  */
export const dataGridPage = smartFaceFactory({
  sfComponents: [
    pageFactory(
      {
        document: { head: { title: 'DataGrid Page' } },
        componentChildren: [
          classicLayoutFactory({
            sidebar: sidebar('data-grid-page', ['component-pages']),
            content: {
              componentChildren: [
                // Original komplexe DataGrids
                gridFactory({
                  items: [
                    gridItemFactory({
                      size: 12,
                      componentChildren: [
                        cardFactory({
                          title: 'DataGrid',
                          subtitle: 'Default',
                          bodyChildren: [getDataGrid(null, 'data-grid-0')],
                          footerChildren: [],
                        }),
                      ],
                    }),
                    gridItemFactory({
                      size: 12,
                      componentChildren: [
                        cardFactory({
                          title: 'DataGrid',
                          subtitle: 'Default',
                          bodyChildren: [getDataGrid({ onFetchRows: null, rows: singleRow }, 'data-grid-1')],
                          footerChildren: [
                            textFactory({
                              text: 'Make sure the header is not taking up more space as needed. (In some cases it took 50% when content was too small)',
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                gridFactory({
                  items: [
                    gridItemFactory({
                      size: 12,
                      componentChildren: [
                        cardFactory({
                          title: 'DataGrid with Random onClicks',
                          subtitle: 'Default',
                          bodyChildren: [getDataGrid({ onFetchRows: null, rows: singleRowWithOnClick }, 'data-grid-3')],
                          footerChildren: [
                            textFactory({
                              text: 'Make sure the header is not taking up more space as needed. (In some cases it took 50% when content was too small)',
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
        modals: [],
      },
      'page',
    ),
  ],
});
