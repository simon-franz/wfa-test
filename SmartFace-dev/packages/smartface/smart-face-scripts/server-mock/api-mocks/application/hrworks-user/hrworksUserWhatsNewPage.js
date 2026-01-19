// @ts-check

import { sqwDropdownMenuFactory } from '#shared/smartFaceComponentFactories/application/hrworks-user/sqwDropdownMenuFactory';

import {
  hrworksUserWhatsNewFactory,
  previousNewsItemFactory,
} from '../../../../../shared/smartFaceComponentFactories/application/hrworks-user/hrworksUserWhatsNewFactory.js';
import { sqwClockInButtonFactory } from '../../../../../shared/smartFaceComponentFactories/application/hrworks-user/sqwClockInButtonFactory.js';
import { sqwLayoutFactory } from '../../../../../shared/smartFaceComponentFactories/application/hrworks-user/sqwLayoutFactory.js';
import { sqwProfileMenuFactory } from '../../../../../shared/smartFaceComponentFactories/application/hrworks-user/sqwProfileMenuFactory.js';
import { sqwSearchFieldFactory } from '../../../../../shared/smartFaceComponentFactories/application/hrworks-user/sqwSearchFieldFactory.js';
import { sqwSupportMenuFactory } from '../../../../../shared/smartFaceComponentFactories/application/hrworks-user/sqwSupportMenuFactory.js';
import { badgeFactory } from '../../../../../shared/smartFaceComponentFactories/core/badgeFactory.js';
import { buttonFactory } from '../../../../../shared/smartFaceComponentFactories/core/buttonFactory.js';
import {
  collapsibleMenuFactory,
  entryFactory,
} from '../../../../../shared/smartFaceComponentFactories/core/collapsibleMenuFactory.js';
import {
  dropdownMenuEntryFactory,
  dropdownMenuFactory,
} from '../../../../../shared/smartFaceComponentFactories/core/dropdownMenuFactory.js';
import { formFactory } from '../../../../../shared/smartFaceComponentFactories/core/formFactory.js';
import { imageFactory } from '../../../../../shared/smartFaceComponentFactories/core/imageFactory.js';
import { pageFactory } from '../../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { streamlineIconFactory } from '../../../../../shared/smartFaceComponentFactories/core/streamlineIconFactory.js';
import { switchFactory } from '../../../../../shared/smartFaceComponentFactories/core/switchFactory.js';
import { textFactory } from '../../../../../shared/smartFaceComponentFactories/core/textFactory.js';
import { patchFactory } from '../../shared/patchFactory.js';

const getNow = () => {
  const now = new Date();

  return now.toISOString();
};

const getTimeString = () => {
  const now = new Date();

  return `seit ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} Uhr`;
};

const testPdf = 'https://d9yw7530xbzu.cloudfront.net/assets/V15DetectUserManual.pdf';

/**
 * @type { import('../../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType }
 */
export const hrworksUserWhatsNewPage = smartFaceFactory({
  sfComponents: [
    pageFactory({
      document: { head: { title: 'hrworksUserWhatsNewPage' } },
      componentChildren: [
        sqwLayoutFactory({
          borderless: true,
          header: {
            clockInButton: sqwClockInButtonFactory(
              {
                startDateTime: '2024-08-02T14:15:00+02:00',
                label: 'seit 13:13 Uhr',
                onClockIn: [
                  {
                    type: 'request',
                    data: {
                      action: 'reflect',
                      reflectedData: patchFactory([
                        {
                          targetSfId: 'clockin-1',
                          operation: 'write',
                          path: 'props.isActive',
                          value: true,
                        },
                        {
                          targetSfId: 'clockin-1',
                          operation: 'write',
                          path: 'props.startDateTime',
                          value: getNow(),
                        },
                        {
                          targetSfId: 'clockin-1',
                          operation: 'write',
                          path: 'props.label',
                          value: getTimeString(),
                        },
                      ]),
                    },
                  },
                ],
                onClockOut: [
                  {
                    type: 'request',
                    data: {
                      action: 'reflect',
                      reflectedData: patchFactory([
                        {
                          targetSfId: 'clockin-1',
                          operation: 'write',
                          path: 'props.isActive',
                          value: false,
                        },
                      ]),
                    },
                  },
                ],
                projectOrActivityDropdown: dropdownMenuFactory({
                  title: 'funny',
                  trigger: streamlineIconFactory({ name: 'arrow-down' }),
                  componentParts: [
                    dropdownMenuEntryFactory({
                      text: 'Projekt A mit einem etwas langen label',
                      onClick: [
                        {
                          type: 'request',
                          data: {
                            action: 'reflect',
                            reflectedData: patchFactory([
                              {
                                targetSfId: 'clockin-1',
                                operation: 'write',
                                path: 'props.projectOrActivityLabel',
                                value: 'Projekt A mit einem etwas langen label',
                              },
                              {
                                targetSfId: 'clockin-1',
                                operation: 'write',
                                path: 'props.isActive',
                                value: true,
                              },
                              {
                                targetSfId: 'clockin-1',
                                operation: 'write',
                                path: 'props.startDateTime',
                                value: getNow(),
                              },
                              {
                                targetSfId: 'clockin-1',
                                operation: 'write',
                                path: 'props.label',
                                value: getTimeString(),
                              },
                            ]),
                          },
                        },
                      ],
                    }),
                    dropdownMenuEntryFactory({
                      text: 'Projekt A + Arztgang',
                      onClick: [
                        {
                          type: 'request',
                          data: {
                            action: 'reflect',
                            reflectedData: patchFactory([
                              {
                                targetSfId: 'clockin-1',
                                operation: 'write',
                                path: 'props.projectOrActivityLabel',
                                value: 'Projekt A',
                              },
                              {
                                targetSfId: 'clockin-1',
                                operation: 'write',
                                path: 'props.label',
                                value: 'Arztgang',
                              },
                              {
                                targetSfId: 'clockin-1',
                                operation: 'write',
                                path: 'props.isActive',
                                value: true,
                              },
                              {
                                targetSfId: 'clockin-1',
                                operation: 'write',
                                path: 'props.startDateTime',
                                value: getNow(),
                              },
                            ]),
                          },
                        },
                      ],
                    }),
                  ],
                }),
              },
              'clockin-1',
            ),
            supportMenu: sqwSupportMenuFactory({
              title: 'Support',
              componentChildren: [
                buttonFactory({
                  variant: 'link',
                  textAlign: 'left',
                  text: 'HRworks Neuigkeiten',
                  href: '/',
                  fullWidth: true,
                  color: 'info',
                }),
                buttonFactory({
                  variant: 'link',
                  textAlign: 'left',
                  text: 'Helpcenter',
                  href: '/',
                  fullWidth: true,
                  color: 'info',
                }),
                buttonFactory({
                  variant: 'link',
                  textAlign: 'left',
                  text: 'Interaktive Touren',
                  href: '/',
                  fullWidth: true,
                  color: 'info',
                }),
                buttonFactory({
                  variant: 'link',
                  textAlign: 'left',
                  text: 'Datenschutzmodus aktivieren',
                  fullWidth: true,
                  color: 'info',
                }),
              ],
            }),
            profileMenu: sqwProfileMenuFactory({
              username: 'Marko Guastella',
              email: 'marko.guastella@hrworks.de',
              portrait: imageFactory({ corner: 'circular' }),
              onPortraitAction: [
                {
                  type: 'request',
                  data: {
                    action: 'reflect',
                    reflectedData: {
                      sideEffects: [
                        {
                          type: 'addNotification',
                          message: 'This will open a Modal in Production',
                        },
                      ],
                    },
                  },
                },
              ],
              componentChildren: [
                buttonFactory({
                  textAlign: 'left',
                  variant: 'link',
                  color: 'info',
                  fullWidth: true,
                  text: 'Mein Profil',
                  href: '/',
                }),
                buttonFactory({
                  textAlign: 'left',
                  variant: 'link',
                  color: 'info',
                  fullWidth: true,
                  text: 'Feedback geben',
                  href: '/',
                }),
                buttonFactory({ corner: 'pill', fullWidth: true, text: 'Abmelden' }),
              ],
            }),
            logo: {
              src: 'https://d3nnb1hxumbr0v.cloudfront.net/images/logos2024Relaunch/HRW_Logo_ohne_Claim_Farbe.png',
              alt: 'This is a logo',
              //href: '/',
              target: '_blank',
              onClick: [{ type: 'redirect', url: '/' }],
            },
            dropdowns: [
              sqwDropdownMenuFactory(
                {
                  icon: streamlineIconFactory({ name: 'list-to-do' }),
                  title: 'Zu erledigen',
                  badge: badgeFactory({ text: '3', color: 'warning' }),
                  componentParts: [
                    dropdownMenuEntryFactory(
                      {
                        text: 'Systemaufgaben',
                        badge: badgeFactory({ text: '2', color: 'warning' }),
                        href: '/',
                        componentParts: [
                          dropdownMenuEntryFactory({ text: 'Meine heute fälligen aufgaben' }),
                          dropdownMenuEntryFactory({ text: 'Mir zugewiesene Aufgaben' }),
                          dropdownMenuEntryFactory({ text: 'Anderen zugewiesene Aufgaben' }),
                        ],
                        onClick: [
                          {
                            type: 'request',
                            data: {
                              action: 'reflect',
                              reflectedData: patchFactory([
                                {
                                  operation: 'write',
                                  targetSfId: 'zu-erledigen-dropdown',
                                  path: 'props.title',
                                  value: 'Overriden Title',
                                },
                              ]),
                            },
                          },
                        ],
                      },
                      undefined,
                      'data-guide-systemaufgaben',
                    ),
                    dropdownMenuEntryFactory({
                      text: 'Aufgaben',
                      href: '/',
                      badge: badgeFactory({ text: '1', color: 'warning' }),
                    }),
                    dropdownMenuEntryFactory({ text: 'Aufgabe erstellen', href: '/' }),
                  ],
                },
                'zu-erledigen-dropdown',
                'data-guide-zu-erledigen',
              ),
              sqwDropdownMenuFactory({
                icon: streamlineIconFactory({ name: 'building-1' }),
                title: 'Firmenübersicht',
                componentParts: [
                  dropdownMenuEntryFactory({
                    text: 'Telefonverzeichnis',
                    href: '/',
                  }),
                  dropdownMenuEntryFactory({
                    text: 'Firmeninformationen',
                    href: '/',
                  }),
                  dropdownMenuEntryFactory({
                    text: 'Ereignisse',
                    href: '/',
                  }),
                  dropdownMenuEntryFactory({
                    text: 'Firmenkalender',
                    href: '/',
                    componentParts: [
                      dropdownMenuEntryFactory({
                        text: 'Diese Woche',
                        href: '/',
                      }),
                      dropdownMenuEntryFactory({
                        text: 'Nach Organisationseinheiten',
                        href: '/',
                      }),
                      dropdownMenuEntryFactory({
                        text: 'Nach Vorgesetzten',
                        href: '/',
                      }),
                      dropdownMenuEntryFactory({
                        text: 'Nach Betriebsstätten',
                        href: '/',
                      }),
                      dropdownMenuEntryFactory({
                        text: 'Individuelle Personenauswahl',
                        href: '/',
                      }),
                      dropdownMenuEntryFactory({
                        text: 'Individuelle Gruppenauswahl',
                        href: '/',
                      }),
                    ],
                  }),
                ],
              }),
            ],
          },
          sidebarChildren: [
            collapsibleMenuFactory({
              activeEntrySfId: 'active',
              componentParts: [
                entryFactory(
                  {
                    text: 'Dashboard',
                    href: '/',
                    icon: streamlineIconFactory({ name: 'hierarchy-9' }),
                  },
                  'active',
                ),
                entryFactory({
                  text: 'Zeitwirtschaft',
                  href: '/',
                  icon: streamlineIconFactory({ name: 'time-management' }),
                  componentParts: [
                    entryFactory({ text: 'Jahresübersicht', href: '/' }),
                    entryFactory({ text: 'Mobiles Arbeiten', href: '/' }),
                    entryFactory({ text: 'Abwesenheiten', href: '/' }),
                    entryFactory({ text: 'Krankmeldungen', href: '/' }),
                    entryFactory({ text: 'Stellvertretungen', href: '/' }),
                  ],
                }),
                entryFactory({
                  text: 'Reisemanagement',
                  icon: streamlineIconFactory({ name: 'travel-management' }),
                  componentParts: [
                    entryFactory({ text: 'Reiseanträge', href: '/' }),
                    entryFactory({ text: 'Reisekostenabrechnungen', href: '/' }),
                    entryFactory({ text: 'Reisekosten Sammelerfassung', href: '/' }),
                    entryFactory({ text: 'Zuzuordnende Belege', href: '/' }),
                    entryFactory({ text: 'Digitale Belege', href: '/' }),
                    entryFactory({ text: 'Erhaltene Vorschüsse', href: '/' }),
                    entryFactory({ text: 'A1-Anträge', href: '/' }),
                  ],
                }),
                entryFactory({
                  text: 'Personalbereich',
                  icon: streamlineIconFactory({ name: 'personnel-administration' }),
                  componentParts: [
                    entryFactory({ text: 'Mitarbeitergespräche', href: '/' }),
                    entryFactory({ text: 'Compliance Management Dokumente', href: '/' }),
                    entryFactory({ text: 'Personalentwicklung', href: '/' }),
                    entryFactory({ text: 'Dokumentenkorb', href: '/' }),
                  ],
                }),
                entryFactory({
                  text: 'Lohn und Gehalt',
                  icon: streamlineIconFactory({ name: 'wage-salary' }),
                  componentParts: [
                    entryFactory({ text: 'Gehalt', href: '/' }),
                    entryFactory({ text: 'Lohnmonate', href: '/' }),
                    entryFactory({ text: 'Steuererklärungsdaten', href: '/' }),
                  ],
                }),
                entryFactory({
                  text: 'I will change a Prev News Item',
                  icon: streamlineIconFactory({ name: 'hammer-wench' }),
                  onClick: [
                    {
                      type: 'request',
                      data: {
                        action: 'reflect',
                        reflectedData: patchFactory([
                          {
                            targetSfId: 'uniqueNews',
                            operation: 'write',
                            path: 'props.title',
                            value: 'CHANGED',
                          },
                        ]),
                      },
                    },
                  ],
                  componentParts: [
                    entryFactory({ text: 'Arbeitsmittel', href: '/' }),
                    entryFactory({ text: 'Arbeitsmittelanträge', href: '/' }),
                  ],
                }),
              ],
            }),
            sqwSearchFieldFactory({
              placeholder: 'Suche',
              'aria-label': 'Suche',
              onEnterKeyDown: [
                {
                  type: 'request',
                  data: {
                    action: 'reflect',
                    reflectedData: {
                      sideEffects: [
                        {
                          type: 'addNotification',
                          message: 'This will open a Modal in Production',
                        },
                      ],
                    },
                  },
                },
              ],
            }),
          ],
          contentChildren: [
            formFactory({
              fullHeight: true,
              componentChildren: [
                hrworksUserWhatsNewFactory({
                  hero: {
                    src: 'https://images.pexels.com/photos/925786/pexels-photo-925786.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                    title: "What's New",
                    adminSwitch: switchFactory({ label: 'Admin News' }),
                    subtitle:
                      'Erfahren Sie mehr über die Neusten Features Ihrer HR-Software. Entdecken Sie hier jede einzelne Details der neusten wie auch vergangene Updates um Immer auf dem neusten Stand zu bleiben.',
                  },
                  content: {
                    spotlight: {
                      statusBadge: badgeFactory({
                        text: 'Demnächst verfügbar',
                        animation: 'pulsing',
                        color: 'success',
                      }),
                      date: '24.12.2024',
                      tags: ['Zeitwirtschaft', 'Zeitwirtschaft', 'Zeitwirtschaft', 'Zeitwirtschaft'],
                      contentSrc: 'https://d9yw7530xbzu.cloudfront.net/assets/V15DetectUserManual.pdf',
                      imgSrc: 'https://raw.githubusercontent.com/dy0gu/dy0gu/main/shrek.gif',
                      componentChildren: [
                        textFactory({
                          html: true,
                          text: '<p>Die Änderungen sind dabei wie folgt:</p><ul style="margin: 6px 0px;"><li>Coole Änderung 1</li><li>Coole Änderung 2</li><li>Coole Änderung 3</li></ul><br/><p>Wir hoffen Ihne gefallen die Änderungen</p>',
                        }),
                        textFactory({
                          text: 'Dankeschön',
                        }),
                      ],
                    },
                    previousNewsItems: [
                      previousNewsItemFactory(
                        {
                          title: 'HRworks News 3.119',
                          date: '25.10.2024',
                          tags: ['Neues Feature', 'Nedir', 'Alex', 'Fabian', 'Jacqueline'],
                          contentSrc: testPdf,
                        },
                        'uniqueNews',
                      ),
                      previousNewsItemFactory({
                        title: 'HRworks News 3.118',
                        date: '25.09.2024',
                        tags: ['Neues Feature', 'Nedir', 'Alex', 'Fabian', 'Jacqueline'],
                        contentSrc: testPdf,
                      }),

                      previousNewsItemFactory({
                        title: 'HRworks News 3.117',
                        date: '25.08.2024',
                        tags: ['Neues Feature', 'Fabian', 'Jacqueline'],
                        contentSrc: testPdf,
                      }),

                      previousNewsItemFactory({
                        title: 'HRworks News 3.116',
                        date: '25.07.2024',
                        tags: ['Neues Feature', 'Nedir', 'Alex'],
                        contentSrc: testPdf,
                      }),
                      previousNewsItemFactory({
                        title: 'HRworks News 3.115',
                        date: '25.06.2024',
                        tags: ['Neues Feature'],
                        contentSrc: testPdf,
                      }),
                    ],
                  },
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
  sideEffects: [
    {
      type: 'addNotification',
      message: 'Willkommen in der Useroberfläche',
    },
  ],
});
