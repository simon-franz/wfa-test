// @ts-check
import { cardFactory } from '../../../../shared/smartFaceComponentFactories/core/cardFactory.js';
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import {
  dropdownMenuEntryFactory,
  dropdownMenuFactory,
  dropdownMenuSectionFactory,
} from '../../../../shared/smartFaceComponentFactories/core/dropdownMenuFactory.js';
import { gridFactory, gridItemFactory } from '../../../../shared/smartFaceComponentFactories/core/gridFactory.js';
import { iconButtonFactory } from '../../../../shared/smartFaceComponentFactories/core/iconButtonFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { streamlineIconFactory } from '../../../../shared/smartFaceComponentFactories/core/streamlineIconFactory.js';
import { textFactory } from '../../../../shared/smartFaceComponentFactories/core/textFactory.js';
import {
  treeGraphEntryFactory,
  treeGraphFactory,
} from '../../../../shared/smartFaceComponentFactories/core/treeGraphFactory.js';
import { sidebar } from '../shared/sidebar.js';

/*  @type { import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType } */

const treeGraph = treeGraphFactory(
  {
    showMiniMap: true,
    showControls: true,
    exportLimit: 150,
    // leafGroupingThreshold Best to test in useTreeLayout where it gets called.
    controlsChildren: [
      dropdownMenuFactory({
        trigger: iconButtonFactory({
          icon: streamlineIconFactory({ name: 'common-file-download' }),
          size: 'extraLarge',
        }),
        placement: 'top-end',
        componentParts: [
          dropdownMenuSectionFactory({
            title: 'Export as...',
            componentParts: [
              dropdownMenuEntryFactory({
                text: 'PNG',
                onClick: [
                  {
                    type: 'tree-graph-action',
                    action: 'export-as-png',
                    filename: 'Abso lu%t& in.(.jpg) akzeptabel;',
                  },
                ],
              }),
              dropdownMenuEntryFactory({
                text: 'JPEG',
                onClick: [
                  {
                    type: 'tree-graph-action',
                    action: 'export-as-jpeg',
                    filename: 'customFileName',
                  },
                ],
              }),
              dropdownMenuEntryFactory({
                text: 'PDF',
                onClick: [
                  {
                    type: 'tree-graph-action',
                    action: 'export-as-pdf',
                  },
                ],
              }),
              dropdownMenuEntryFactory({
                text: 'Svg',
                onClick: [
                  {
                    type: 'tree-graph-action',
                    action: 'export-as-svg',
                  },
                ],
              }),
              dropdownMenuEntryFactory({
                text: 'Print',
                onClick: [
                  {
                    type: 'tree-graph-action',
                    action: 'print',
                    targetSfId: 'treeGraph-01',
                  },
                ],
              }),
            ],
          }),
        ],
      }),
    ],
    entries: [
      /*...times(60, () =>
        treeGraphEntryFactory({
          title: 'Node',
          subtitle: 'Node',
          imageSrc: 'https://placedog.net/400/400',
          subsubtitle: 'Node',
        }),
      ),*/
      treeGraphEntryFactory({
        title: 'Willi Bösch',
        subtitle: 'Node',
        entries: [
          treeGraphEntryFactory({
            title: 'Oliver Born',
            subtitle: 'Node',
            onLoadChildEntries: [
              {
                type: 'request',
                data: { backendLoad: 98, action: 'tree-graph', pageEvent: 'loadBornEntries' },
              },
            ],
          }),
          treeGraphEntryFactory({
            title: 'Kurt Fischer',
            subtitle: 'Node',
          }),
          treeGraphEntryFactory({
            title: 'Nino Filipovic',
            subtitle: 'Node',
          }),
        ],
      }),
      treeGraphEntryFactory(
        {
          title: 'Simeon Sembach',
          subtitle: 'Entwicklung',
          subsubtitle: 'Teamleiter',
          variant: 'highlighted',
          imageSrc: 'https://placedog.net/400/400',
          onClick: [
            {
              type: 'request',
              data: { action: 'tree-graph', pageEvent: 'onClickCard' },
            },
          ],
          isExpanded: false,
          entries: [
            treeGraphEntryFactory({
              title: 'David Wichmann',
              subtitle: 'Entwicklung',
              subsubtitle: 'Professional Entwickler',
              imageSrc: 'https://placedog.net/400/400',
              isExpanded: false,
              entries: [
                treeGraphEntryFactory({
                  title: 'Node',
                  subtitle: 'Node',
                  imageSrc: 'https://placedog.net/400/400',
                  subsubtitle: 'Node',
                }),
              ],
            }),
            treeGraphEntryFactory({
              title: 'Alexander Kiefer',
              subtitle: 'Entwicklung',
              subsubtitle: 'Junior Entwickler',
              imageSrc: 'https://placedog.net/400/400',
            }),
            treeGraphEntryFactory({
              title: 'Jacqueline Kraus',
              subtitle: 'Entwicklung',
              subsubtitle: 'Junior Entwicklerin',
              imageSrc: 'https://placedog.net/400/400',
            }),
            treeGraphEntryFactory({
              title: 'Nedir Moulgada',
              subtitle: 'Entwicklung',
              subsubtitle: 'Junior Entwickler',
              imageSrc: 'https://placedog.net/400/400',
            }),
            treeGraphEntryFactory({
              title: 'Marko Guastella',
              subtitle: 'Entwicklung',
              subsubtitle: 'Thesist',
              imageSrc: 'https://placedog.net/400/400',
            }),
            treeGraphEntryFactory({
              title: 'Lukas Fettig',
              subtitle: 'Entwicklung',
              variant: 'greyedOut',
              subsubtitle: 'Werkstudent',
              imageSrc: 'https://placedog.net/400/400',
            }),
          ],
        },
        '1200',
      ),
      treeGraphEntryFactory(
        {
          title: 'Simeon Sembach',
          subtitle: 'Entwicklung',
          subsubtitle: 'Teamleiter',
          variant: 'highlighted',
          imageSrc: 'https://placedog.net/400/400',
          onClick: [
            {
              type: 'request',
              data: { action: 'tree-graph', pageEvent: 'onClickCard' },
            },
          ],
          isExpanded: false,
          entries: [
            treeGraphEntryFactory({
              title: 'David Wichmann',
              subtitle: 'Entwicklung',
              subsubtitle: 'Professional Entwickler',
              imageSrc: 'https://placedog.net/400/400',
              isExpanded: false,
              entries: [
                treeGraphEntryFactory({
                  title: 'Node',
                  subtitle: 'Node',
                  imageSrc: 'https://placedog.net/400/400',
                  subsubtitle: 'Node',
                }),
              ],
            }),
            treeGraphEntryFactory({
              title: 'Alexander Kiefer',
              subtitle: 'Entwicklung',
              subsubtitle: 'Junior Entwickler',
              imageSrc: 'https://placedog.net/400/400',
            }),
            treeGraphEntryFactory({
              title: 'Jacqueline Kraus',
              subtitle: 'Entwicklung',
              subsubtitle: 'Junior Entwicklerin',
              imageSrc: 'https://placedog.net/400/400',
            }),
            treeGraphEntryFactory({
              title: 'Nedir Moulgada',
              subtitle: 'Entwicklung',
              subsubtitle: 'Junior Entwickler',
              imageSrc: 'https://placedog.net/400/400',
            }),
            treeGraphEntryFactory({
              title: 'Marko Guastella',
              subtitle: 'Entwicklung',
              subsubtitle: 'Thesist',
              imageSrc: 'https://placedog.net/400/400',
            }),
            treeGraphEntryFactory({
              title: 'Lukas Fettig',
              subtitle: 'Entwicklung',
              variant: 'greyedOut',
              subsubtitle: 'Werkstudent',
              imageSrc: 'https://placedog.net/400/400',
            }),
          ],
        },
        '1200',
      ),
      treeGraphEntryFactory(
        {
          title: 'Markus Schunk',
          subtitle: 'HRworks Holding',
          imageSrc: 'https://placedog.net/400/400',
          subsubtitle: 'CEO',
          entries: [
            treeGraphEntryFactory({
              title: 'Simon Franz',
              subtitle: 'Entwicklung',
              subsubtitle: 'Bereichsleiter',
              imageSrc: 'https://placedog.net/400/400',
              entries: [
                treeGraphEntryFactory(
                  {
                    title: 'Simeon Sembach',
                    subtitle: 'Entwicklung',
                    subsubtitle: 'Teamleiter',
                    variant: 'highlighted',
                    imageSrc: 'https://placedog.net/400/400',
                    onClick: [
                      {
                        type: 'request',
                        data: { action: 'tree-graph', pageEvent: 'onClickCard' },
                      },
                    ],
                    isExpanded: false,
                    entries: [
                      treeGraphEntryFactory({
                        title: 'David Wichmann',
                        subtitle: 'Entwicklung',
                        subsubtitle: 'Professional Entwickler',
                        imageSrc: 'https://placedog.net/400/400',
                        onLoadChildEntries: [
                          {
                            type: 'request',
                            data: { backendLoad: 98, action: 'tree-graph', pageEvent: 'loadEntries' },
                          },
                        ],
                      }),
                      treeGraphEntryFactory({
                        title: 'Alexander Kiefer',
                        subtitle: 'Entwicklung',
                        subsubtitle: 'Junior Entwickler',
                        imageSrc: 'https://placedog.net/400/400',
                      }),
                      treeGraphEntryFactory({
                        title: 'Jacqueline Kraus',
                        subtitle: 'Entwicklung',
                        subsubtitle: 'Junior Entwicklerin',
                        imageSrc: 'https://placedog.net/400/400',
                      }),
                      treeGraphEntryFactory({
                        title: 'Nedir Moulgada',
                        subtitle: 'Entwicklung',
                        subsubtitle: 'Junior Entwickler',
                        imageSrc: 'https://placedog.net/400/400',
                      }),
                      treeGraphEntryFactory({
                        title: 'Marko Guastella',
                        subtitle: 'Entwicklung',
                        subsubtitle: 'Thesist',
                        imageSrc: 'https://placedog.net/400/400',
                      }),
                      treeGraphEntryFactory({
                        title: 'Lukas Fettig',
                        subtitle: 'Entwicklung',
                        variant: 'greyedOut',
                        subsubtitle: 'Werkstudent',
                        imageSrc: 'https://placedog.net/400/400',
                      }),
                    ],
                  },
                  '1000',
                ),
              ],
            }),
          ],
        },
        'entry-1',
      ),
      treeGraphEntryFactory({
        title: 'Zweiter Baum',
        subtitle: 'Ohne Inhalt',
        entries: [
          treeGraphEntryFactory({
            title: 'Lukas Fettig',
            subtitle: 'Entwicklung',
            variant: 'greyedOut',
            subsubtitle: 'Werkstudent',
            imageSrc: 'https://placedog.net/400/400',
            onLoadChildEntries: [
              {
                type: 'request',
                data: { backendLoad: 478, action: 'tree-graph', pageEvent: 'loadEntries' },
              },
            ],
          }),
        ],
      }),
      treeGraphEntryFactory({
        title: 'Dritter Baum',
        subtitle: 'Ohne Inhalt',
        entries: [treeGraphEntryFactory()],
      }),
    ],
  },
  'treeGraph-01',
);

export const gridFullHeightPage = smartFaceFactory({
  sfComponents: [
    pageFactory({
      componentChildren: [
        classicLayoutFactory({
          sidebar: sidebar('grid-full-height-page', ['component-pages']),
          content: {
            componentChildren: [
              gridFactory({
                fullHeight: true,
                items: [
                  gridItemFactory({
                    componentChildren: [
                      cardFactory(
                        {
                          title: 'Lorem Ipsum',
                          bodyChildren: [
                            textFactory({
                              text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
                            }),
                          ],
                        },
                        'card-0',
                      ),
                    ],
                  }),
                  gridItemFactory({
                    componentChildren: [treeGraph],
                  }),
                ],
              }),
            ],
          },
        }),
      ],
    }),
  ],
});
