import { faker } from '@faker-js/faker';

import getId from '../../../../../shared/getId.js';
import { gridFactory, gridItemFactory } from '../../../../../shared/smartFaceComponentFactories/core/gridFactory.js';
import { imageFactory } from '../../../../../shared/smartFaceComponentFactories/core/imageFactory.js';
import { listFactory, listItemFactory } from '../../../../../shared/smartFaceComponentFactories/core/listFactory.js';
import { textFactory } from '../../../../../shared/smartFaceComponentFactories/core/textFactory.js';
import { treeGraphEntryFactory } from '../../../../../shared/smartFaceComponentFactories/core/treeGraphFactory.js';
import { patchFactory } from '../../shared/patchFactory.js';
import { modalFactory } from './../../../../../shared/smartFaceComponentFactories/core/pageFactory.js';

const treeGraphNestingCounter = {};

let highlighted = true;

export default (body) => {
  const { pageEvent: event } = body.backendEventData;
  const targetSfId = body.frontendEventData?.targetSfId;

  switch (event) {
    case 'onClickCard':
      return patchFactory([
        {
          targetSfId: 'page-01',
          operation: 'write',
          path: 'props.modals',
          value: [
            modalFactory({
              closeable: true,
              title: 'Detailansicht',
              size: 'small',
              bodyChildren: [
                gridFactory({
                  flexDirection: 'row',
                  rowGapSize: 'large',
                  alignItems: 'center',
                  items: [
                    gridItemFactory({
                      size: '3',
                      componentChildren: [imageFactory({ src: 'https://placedog.net/200/200' })],
                    }),
                    gridItemFactory({
                      size: 'grow',
                      componentChildren: [
                        listFactory({
                          items: [
                            listItemFactory({
                              componentChildren: [textFactory({ text: 'Simeon Sembach', fontWeight: 'bold' })],
                            }),
                            listItemFactory({ componentChildren: [textFactory({ text: 'Entwicklung' })] }),
                            listItemFactory({ componentChildren: [textFactory({ text: 'Teamleiter' })] }),
                            listItemFactory({ componentChildren: [textFactory({ text: 'Weitere Informationen' })] }),
                            listItemFactory({ componentChildren: [textFactory({ text: 'Könnten hier folgen' })] }),
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
      ]);
    case 'resetNodes':
      return patchFactory([
        {
          targetSfId: 'treeGraph-01',
          operation: 'write',
          path: 'props.entries',
          value: [
            treeGraphEntryFactory({
              title: 'Christine Keller',
              subtitle: 'Node',
            }),
            treeGraphEntryFactory({
              title: 'Barbara Moreno',
              subtitle: 'Node',
              onLoadChildEntries: [
                {
                  type: 'request',
                  data: { backendLoad: 98, action: 'tree-graph', pageEvent: 'loadEntries' },
                },
              ],
            }),
          ],
        },
      ]);
    case 'loadEntries':
      const currentCounter = (targetSfId ? treeGraphNestingCounter[targetSfId] || 0 : 0) + 1;
      const random = Math.floor(Math.random() * 9 + 1);
      const ids = Array.from({ length: random }).map((_) => getId());
      const hasClick = random > 10 ? 'Is Clickable' : 'Not Clickable';
      ids.forEach((id) => (treeGraphNestingCounter[id] = currentCounter));

      return patchFactory([
        {
          targetSfId,
          operation: 'write',
          path: 'props.entries',
          value: ids.map((id) =>
            treeGraphEntryFactory(
              {
                title: faker.person.firstName(),
                subtitle: faker.company.buzzAdjective(),
                subsubtitle: hasClick,
                ...(hasClick === 'Is Clickable' && {
                  onClick: [
                    {
                      type: 'request',
                      data: { action: 'tree-graph', pageEvent: 'onClickCard' },
                    },
                  ],
                }),
                imageSrc: 'https://placedog.net/200/200',
                ...(currentCounter < 2 && {
                  onLoadChildEntries: [
                    {
                      type: 'request',
                      data: { backendLoad: 500, action: 'tree-graph', pageEvent: 'loadEntries' },
                    },
                  ],
                }),
              },
              id,
            ),
          ),
        },
      ]);
    case 'loadBornEntries':
      return patchFactory([
        {
          targetSfId,
          operation: 'write',
          path: 'props.entries',
          value: [
            treeGraphEntryFactory({
              title: 'Christine Keller',
              subtitle: 'Node',
            }),
            treeGraphEntryFactory({
              title: 'Anette Vogel',
              subtitle: 'Node',
            }),
            treeGraphEntryFactory({
              title: 'Jean-Luc Tachel',
              subtitle: 'Node',
            }),
            treeGraphEntryFactory({
              title: 'Gerfried Kessler',
              subtitle: 'Node',
            }),
            treeGraphEntryFactory({
              title: 'Barbara Moreno',
              subtitle: 'Node',
              onLoadChildEntries: [
                {
                  type: 'request',
                  data: { backendLoad: 98, action: 'tree-graph', pageEvent: 'loadEntries' },
                },
              ],
            }),
          ],
        },
      ]);
    case 'highlight':
      highlighted = !highlighted;

      return patchFactory([
        {
          targetSfId: 'entry-1',
          operation: 'write',
          path: 'props.variant',
          value: highlighted ? 'highlighted' : 'greyedOut',
        },
      ]);
    default:
      return {};
  }
};
