import {
  cmdTableFactory,
  cmdTableItemFactory,
} from '../../../../../shared/smartFaceComponentFactories/application/onboarding/cmdTableFactory.js';
import { onboardingControllerItemFactory } from '../../../../../shared/smartFaceComponentFactories/application/onboarding/onboardingControllerFactory.js';
import { onboardingWelcomePageFactory } from '../../../../../shared/smartFaceComponentFactories/application/onboarding/onboardingWelcomePageFactory.js';
import { alertFactory } from '../../../../../shared/smartFaceComponentFactories/core/alertFactory.js';
import { buttonFactory } from '../../../../../shared/smartFaceComponentFactories/core/buttonFactory.js';
import { checkboxFactory } from '../../../../../shared/smartFaceComponentFactories/core/checkboxFactory.js';
import { dateFieldFactory } from '../../../../../shared/smartFaceComponentFactories/core/dateFieldFactory.js';
import { dropzoneFactory } from '../../../../../shared/smartFaceComponentFactories/core/dropzoneFactory.js';
import { fontAwesomeIconFactory } from '../../../../../shared/smartFaceComponentFactories/core/fontAwesomeIconFactory.js';
import { formFactory } from '../../../../../shared/smartFaceComponentFactories/core/formFactory.js';
import { gridFactory, gridItemFactory } from '../../../../../shared/smartFaceComponentFactories/core/gridFactory.js';
import { imageFactory } from '../../../../../shared/smartFaceComponentFactories/core/imageFactory.js';
import { sectionFactory } from '../../../../../shared/smartFaceComponentFactories/core/sectionFactory.js';
import { selectFactory } from '../../../../../shared/smartFaceComponentFactories/core/selectFactory.js';
import { streamlineIconFactory } from '../../../../../shared/smartFaceComponentFactories/core/streamlineIconFactory.js';
import { textareaFactory } from '../../../../../shared/smartFaceComponentFactories/core/textareaFactory.js';
import { textFactory } from '../../../../../shared/smartFaceComponentFactories/core/textFactory.js';
import { textFieldFactory } from '../../../../../shared/smartFaceComponentFactories/core/textFieldFactory.js';
import { tooltipFactory } from '../../../../../shared/smartFaceComponentFactories/core/tooltipFactory.js';
import { patchFactory } from '../../shared/patchFactory.js';

export default (body) => {
  const { pageEvent: event } = body.backendEventData;

  switch (event) {
    case 'login':
      return patchFactory([
        {
          targetSfId: 'onboarding-controller-0',
          operation: 'write',
          path: 'props.items',
          value: [
            onboardingControllerItemFactory(
              {
                topArrowBar: {
                  show: false,
                },
                bottomArrowBar: {
                  description: "Los geht's",
                },
                media: streamlineIconFactory({ name: 'teamwork-hand-gather-desktop' }),
                componentChildren: [
                  onboardingWelcomePageFactory(
                    {
                      heading: 'HERZLICH WILLKOMMEN',
                      bodyChildren: [
                        gridFactory({
                          items: [
                            gridItemFactory({
                              componentChildren: [
                                textFactory({
                                  text: 'Wir freuen uns, dass Sie Teil unseres Teams werden. Bitte füllen Sie die angegebenen Felder aus, so können wir alles für Ihren Start bei uns vorbereiten.',
                                }),
                              ],
                            }),
                            gridItemFactory({
                              componentChildren: [
                                textFactory({
                                  text: 'Über den "Speichern" Button können Sie jederzeit Ihren Zwischenstand abspeichern. Mit "Fertigstellen" schließen Sie das Onboarding ab, eine weitere Bearbeitung ist anschließend nicht mehr möglich.',
                                }),
                              ],
                            }),
                            gridItemFactory({
                              componentChildren: [
                                textFactory({
                                  text: 'Werden Felder zwingend benötigt oder sind nicht korrekt ausgefüllt, wird Ihnen ein entsprechender Fehler angezeigt.',
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                      footerChildren: [
                        gridFactory({
                          rowGap: 'extraSmall',
                          items: [
                            gridItemFactory({
                              componentChildren: [
                                textFactory({ text: 'Bitte füllen Sie das Dokument vollständig aus.' }),
                              ],
                            }),
                            gridItemFactory({
                              componentChildren: [textFactory({ text: 'Ihr(e) Ansprechpartner:in ist Herr Schmidt:' })],
                            }),
                            gridItemFactory({
                              componentChildren: [
                                textFactory({ text: 'Max Schmidt: hrworks.demo@gmail.com', fontSize: 'small' }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    },
                    undefined,
                    'data-guide-test',
                  ),
                ],
              },
              '0',
            ),
            onboardingControllerItemFactory(
              {
                title: 'Stammdaten',
                navigationIcon: streamlineIconFactory({ name: 'avatar-neutral-mobil' }),
                description:
                  'Bitte tragen Sie für Ihren Start am 01.03.2023 hier Ihre persönlichen Daten ein, um Ihnen und uns den Einstieg zu erleichtern.',
                media: streamlineIconFactory({ name: 'woman-hair-open-desktop' }),
                componentChildren: [
                  formFactory(
                    {
                      componentChildren: [
                        gridFactory({
                          rowGap: 'large',
                          columnGap: 'extraLarge',
                          items: [
                            gridItemFactory({
                              size: 12,
                              componentChildren: [
                                // START - SECTION TEST: icons & section title
                                // sectionFactory({
                                //   title: 'Tooltip: FontAwesomeIcon',
                                //   titleChildren: [
                                //     tooltipFactory({
                                //       componentChildren: [fontAwesomeIconFactory({ name: 'info-circle', variant: 'light' })],
                                //       text: 'Tooltip Text!',
                                //     }),
                                //   ],
                                //   componentChildren: [
                                //     gridFactory({
                                //       rowGapSize: 'large',
                                //       columnGapSize: 'large',
                                //       items: [
                                //         gridItemFactory({
                                //           size: 6,
                                //           componentChildren: [
                                //             textFieldFactory(
                                //               {
                                //                 label: 'test',
                                //                 name: `test`,
                                //                 mandatory: true,
                                //               },
                                //               `text-field-vorname`,
                                //             ),
                                //           ],
                                //         }),
                                //       ],
                                //     }),
                                //   ],
                                // }),
                                // sectionFactory({
                                //   title: 'Tooltip: StreamlineIconsN',
                                //   titleChildren: [
                                //     tooltipFactory({
                                //       componentChildren: [streamlineIconFactory({ name: 'info-2' })],
                                //       text: 'Tooltip Text!',
                                //     }),
                                //   ],
                                //   componentChildren: [
                                //     gridFactory({
                                //       rowGapSize: 'large',
                                //       columnGapSize: 'large',
                                //       items: [
                                //         gridItemFactory({
                                //           size: 6,
                                //           componentChildren: [
                                //             textFieldFactory(
                                //               {
                                //                 label: 'test',
                                //                 name: `test`,
                                //                 mandatory: true,
                                //               },
                                //               `text-field-vorname`,
                                //             ),
                                //           ],
                                //         }),
                                //       ],
                                //     }),
                                //   ],
                                // }),
                                // sectionFactory({
                                //   title: 'FontAwesomeIcon',
                                //   titleChildren: [fontAwesomeIconFactory({ name: 'info-circle', variant: 'light' })],
                                //   componentChildren: [
                                //     gridFactory({
                                //       rowGapSize: 'large',
                                //       columnGapSize: 'large',
                                //       items: [
                                //         gridItemFactory({
                                //           size: 6,
                                //           componentChildren: [
                                //             textFieldFactory(
                                //               {
                                //                 label: 'test',
                                //                 name: `test`,
                                //                 mandatory: true,
                                //               },
                                //               `text-field-vorname`,
                                //             ),
                                //           ],
                                //         }),
                                //       ],
                                //     }),
                                //   ],
                                // }),
                                // sectionFactory({
                                //   title: 'StreamlineIconsN',
                                //   titleChildren: [streamlineIconFactory({ name: 'info-2' })],
                                //   componentChildren: [
                                //     gridFactory({
                                //       rowGapSize: 'large',
                                //       columnGapSize: 'large',
                                //       items: [
                                //         gridItemFactory({
                                //           size: 6,
                                //           componentChildren: [
                                //             textFieldFactory(
                                //               {
                                //                 label: 'test',
                                //                 name: `test`,
                                //                 mandatory: true,
                                //               },
                                //               `text-field-vorname`,
                                //             ),
                                //           ],
                                //         }),
                                //       ],
                                //     }),
                                //   ],
                                // }),
                                // END - SECTION TEST: icons & section title
                                sectionFactory({
                                  title: 'Persönliche Daten',
                                  titleChildren: [
                                    tooltipFactory({
                                      componentChildren: [streamlineIconFactory({ name: 'info-2' })],
                                      text: 'Hier könnte dein Text stehen!',
                                    }),
                                  ],
                                  componentChildren: [
                                    gridFactory({
                                      rowGap: 'large',
                                      columnGap: 'large',
                                      items: [
                                        gridItemFactory({
                                          size: 6,
                                          componentChildren: [
                                            textFieldFactory(
                                              {
                                                label: 'Vorname',
                                                name: `firstName`,
                                                mandatory: true,
                                              },
                                              `text-field-vorname`,
                                            ),
                                          ],
                                        }),
                                        gridItemFactory({
                                          size: 6,
                                          componentChildren: [
                                            textFieldFactory(
                                              {
                                                label: 'Nachname',
                                                name: `name`,
                                                mandatory: true,
                                              },
                                              `text-field-nachname`,
                                            ),
                                          ],
                                        }),
                                        gridItemFactory({
                                          size: 6,
                                          componentChildren: [
                                            textFieldFactory(
                                              {
                                                validationState: 'success',
                                                label: 'Anrede',
                                                name: `anrede`,
                                              },
                                              `text-field-anrede`,
                                            ),
                                          ],
                                        }),
                                        gridItemFactory({
                                          size: 6,
                                          componentChildren: [
                                            textFieldFactory(
                                              {
                                                validationState: 'danger',
                                                label: 'Titel',
                                                name: `titel`,
                                              },
                                              `text-field-titel`,
                                            ),
                                          ],
                                        }),

                                        gridItemFactory({
                                          size: 12,
                                          componentChildren: [
                                            textFieldFactory(
                                              {
                                                validationState: 'danger',
                                                label: 'Geburtsname',
                                                name: `geburtsname`,
                                                disabled: true,
                                              },
                                              `text-field-geburtsname`,
                                            ),
                                          ],
                                        }),
                                        gridItemFactory({
                                          size: 6,
                                          componentChildren: [
                                            dateFieldFactory(
                                              {
                                                label: 'Geburtdatum',
                                                name: `geburtsdatum`,
                                              },
                                              `date-field-geburtsdatum`,
                                            ),
                                          ],
                                        }),
                                        gridItemFactory({
                                          size: 6,
                                          componentChildren: [
                                            selectFactory(
                                              {
                                                label: 'Geschlecht',
                                                name: `geschlecht`,
                                                options: [
                                                  { label: 'Weiblich', sfId: '1' },
                                                  { label: 'Männlich', sfId: '2' },
                                                  { label: 'Divers', sfId: '3' },
                                                ],
                                              },
                                              `text-field-gender`,
                                            ),
                                          ],
                                        }),
                                        gridItemFactory({
                                          size: 12,
                                          componentChildren: [
                                            selectFactory(
                                              {
                                                label: 'Geburtsland',
                                                name: `geburtsland`,
                                                options: [
                                                  { label: 'Deutschland', sfId: '0' },
                                                  { label: 'Österreich', sfId: '1' },
                                                  { label: 'Schweiz', sfId: '2' },
                                                  { label: 'Vatikan', sfId: '3' },
                                                  { label: 'Montserrat', sfId: '4' },
                                                ],
                                              },
                                              `text-field-geburtsland`,
                                            ),
                                          ],
                                        }),
                                        gridItemFactory({
                                          size: 12,
                                          componentChildren: [
                                            textFieldFactory(
                                              {
                                                label: 'Geburtsort',
                                                name: `geburtsort`,
                                              },
                                              `text-field-geburtsort`,
                                            ),
                                          ],
                                        }),
                                        gridItemFactory({
                                          size: 12,
                                          componentChildren: [
                                            selectFactory(
                                              {
                                                label: 'Sprache',
                                                name: `sprache`,
                                                options: [
                                                  { label: 'Deutsch', sfId: '1' },
                                                  { label: 'Spanisch', sfId: '2' },
                                                  { label: 'Französisch', sfId: '3' },
                                                ],
                                              },
                                              `text-field-sprache`,
                                            ),
                                          ],
                                        }),
                                        gridItemFactory({
                                          size: 12,
                                          componentChildren: [
                                            selectFactory(
                                              {
                                                label: 'Familienstand',
                                                name: `familienstand`,
                                                options: [
                                                  { label: 'Ledig', sfId: '1' },
                                                  { label: 'Verheiratet', sfId: '2' },
                                                ],
                                              },
                                              `text-field-familienstand`,
                                            ),
                                          ],
                                        }),
                                        gridItemFactory({
                                          size: 6,
                                          componentChildren: [
                                            textFieldFactory(
                                              {
                                                label: 'Höchste berufliche Qualifikation',
                                                name: `qualification`,
                                              },
                                              `text-field-qualification`,
                                            ),
                                          ],
                                        }),
                                        gridItemFactory({
                                          size: 6,
                                          componentChildren: [
                                            textFieldFactory(
                                              {
                                                label: 'Höchster Bildungsgrad',
                                                name: `degree`,
                                              },
                                              `text-field-degree`,
                                            ),
                                          ],
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            gridItemFactory({
                              size: 12,
                              componentChildren: [
                                sectionFactory({
                                  title: 'KONTAKTDATEN',
                                  componentChildren: [
                                    gridFactory({
                                      rowGap: 'large',
                                      items: [
                                        gridItemFactory({
                                          size: 12,
                                          componentChildren: [
                                            textFieldFactory(
                                              {
                                                label: 'Mobiltelefon Privat',
                                                name: `mobilePhone`,
                                                mandatory: true,
                                              },
                                              `text-field-mobile-nr`,
                                            ),
                                          ],
                                        }),
                                        gridItemFactory({
                                          size: 12,
                                          componentChildren: [
                                            textFieldFactory(
                                              {
                                                label: 'Telefon',
                                                name: `name`,
                                                mandatory: false,
                                              },
                                              `text-field-phone-nr`,
                                            ),
                                          ],
                                        }),
                                        gridItemFactory({
                                          size: 12,
                                          componentChildren: [
                                            textFieldFactory(
                                              {
                                                label: 'Private E-Mail',
                                                name: `privatemail`,
                                                mandatory: true,
                                              },
                                              `text-field-privatemail`,
                                            ),
                                          ],
                                        }),
                                        gridItemFactory({
                                          size: 6,
                                          componentChildren: [
                                            textFieldFactory(
                                              {
                                                label: 'Notfallkontakt Name',
                                                name: `notfallkontakt`,
                                                mandatory: true,
                                              },
                                              `text-field-notfallkontakt`,
                                            ),
                                          ],
                                        }),
                                        gridItemFactory({
                                          size: 6,
                                          componentChildren: [
                                            selectFactory(
                                              {
                                                label: 'Notfallkontakt Beziehung',
                                                name: `notfallkontakt`,
                                                options: [
                                                  { label: 'Deutschland', sfId: '0' },
                                                  { label: 'Österreich', sfId: '1' },
                                                  { label: 'Schweiz', sfId: '2' },
                                                  { label: 'Vatikan', sfId: '3' },
                                                  { label: 'Montserrat', sfId: '4' },
                                                ],
                                              },
                                              `text-field-notfallkontakt`,
                                            ),
                                          ],
                                        }),
                                        gridItemFactory({
                                          size: 12,
                                          componentChildren: [
                                            textFieldFactory(
                                              {
                                                label: 'Notfallkontakt Telefon',
                                                name: `notfallkontaktPhone`,
                                                mandatory: true,
                                              },
                                              `text-field-notfallkontakt-phone`,
                                            ),
                                          ],
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            gridItemFactory({
                              size: 12,
                              componentChildren: [
                                sectionFactory({
                                  title: 'KINDER',
                                  componentChildren: [
                                    gridFactory({
                                      rowGap: 'large',
                                      items: [
                                        gridItemFactory({
                                          size: 6,
                                          componentChildren: [
                                            textFieldFactory(
                                              {
                                                label: 'Anzahl der Kinder',
                                                name: `kinder`,
                                                mandatory: false,
                                              },
                                              `text-field-mobile`,
                                            ),
                                          ],
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            gridItemFactory({
                              size: 12,
                              componentChildren: [
                                sectionFactory({
                                  title: 'WEITERE ANGABEN',
                                  componentChildren: [
                                    gridFactory({
                                      rowGap: 'large',
                                      items: [
                                        gridItemFactory({
                                          size: 12,
                                          componentChildren: [
                                            dropzoneFactory(
                                              {
                                                alternativeComponentChildren: [
                                                  buttonFactory(
                                                    {
                                                      text: 'Schwerbehindertenausweis hinzufügen',
                                                      leftIcon: fontAwesomeIconFactory({ name: 'plus' }),
                                                      variant: 'text',
                                                    },
                                                    'button-schwerbehindert',
                                                  ),
                                                ],
                                                componentChildren: [
                                                  textFactory({
                                                    text: 'Schwerbehindertenausweis hinzufügen',
                                                  }),
                                                ],
                                                fileManagerSfId: `file-manager-1`,
                                              },
                                              `dropzone-1`,
                                            ),
                                          ],
                                        }),
                                        gridItemFactory({
                                          size: 12,
                                          componentChildren: [
                                            textFieldFactory(
                                              {
                                                label: 'Beispiel für ein Weiteres Textfeld',
                                                name: `weiteres`,
                                                mandatory: false,
                                              },
                                              `text-field-weiteres`,
                                            ),
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
                      ],
                    },
                    'form-1',
                  ),
                ],
              },
              '1',
            ),
            onboardingControllerItemFactory(
              {
                navigationTitle: 'Adresse',
                title: 'Adresse',
                description:
                  'Geben Sie hier Ihre Adressdaten an, damit Ihr neuer Arbeitgeber HRworks Sie erreichen kann.',
                media: streamlineIconFactory({ name: 'house-sun-desktop' }),
                navigationIcon: streamlineIconFactory({ name: 'house-chimney-mobil' }),
                hasError: true,
                componentChildren: [
                  formFactory(
                    {
                      componentChildren: [
                        sectionFactory({
                          title: 'ADRESSE',
                          componentChildren: [
                            gridFactory({
                              rowGap: 'large',
                              columnGap: 'large',
                              items: [
                                gridItemFactory({
                                  size: 12,
                                  componentChildren: [
                                    textFieldFactory(
                                      {
                                        label: 'Straße',
                                        name: `adresse`,
                                        mandatory: true,
                                      },
                                      `text-field-strasse`,
                                    ),
                                  ],
                                }),
                                gridItemFactory({
                                  size: 6,
                                  componentChildren: [
                                    textFieldFactory(
                                      {
                                        label: 'Hausnummer',
                                        name: `hausnummer`,
                                        mandatory: true,
                                      },
                                      `text-field-hausnummer`,
                                    ),
                                  ],
                                }),
                                gridItemFactory({
                                  size: 6,
                                  componentChildren: [
                                    textFieldFactory(
                                      {
                                        label: 'Adresszusatz',
                                        name: `adresszusatz`,
                                        mandatory: false,
                                      },
                                      `text-field-zusatz`,
                                    ),
                                  ],
                                }),
                                gridItemFactory({
                                  size: 6,
                                  componentChildren: [
                                    textFieldFactory(
                                      {
                                        label: 'Ort',
                                        name: `ort`,
                                        mandatory: true,
                                      },
                                      `text-field-ort`,
                                    ),
                                  ],
                                }),
                                gridItemFactory({
                                  size: 6,
                                  componentChildren: [
                                    textFieldFactory(
                                      {
                                        label: 'PLZ',
                                        name: `plz`,
                                        mandatory: false,
                                      },
                                      `text-field-plz`,
                                    ),
                                  ],
                                }),
                                gridItemFactory({
                                  size: 12,
                                  componentChildren: [
                                    selectFactory(
                                      {
                                        label: 'Land',
                                        name: `land`,
                                        options: [
                                          { label: 'Deutschland', sfId: '1' },
                                          { label: 'Österreich', sfId: '2' },
                                          { label: 'Schweiz', sfId: '3' },
                                          { label: 'Vatikan', sfId: '4' },
                                          { label: 'Montserrat', sfId: '5' },
                                        ],
                                      },
                                      `text-field-land`,
                                    ),
                                  ],
                                }),
                                gridItemFactory({
                                  size: 12,
                                  componentChildren: [
                                    selectFactory(
                                      {
                                        label: 'Bundesland',
                                        name: `bundesland`,
                                        options: [
                                          { label: 'Baden', sfId: '1' },
                                          { label: 'Bayern', sfId: '2' },
                                          { label: 'Mecklenburg-Vorpommern', sfId: '3' },
                                          { label: 'Saarland', sfId: '4' },
                                          { label: 'Rheinland-Pfalz', sfId: '5' },
                                          { label: 'Nordrhein-Westfalen', sfId: '6' },
                                          { label: 'Sachsen', sfId: '7' },
                                          { label: 'Sachsen-Anhalt', sfId: '8' },
                                          { label: 'Niedersachsen', sfId: '9' },
                                          { label: 'Brandenburg', sfId: '10' },
                                          { label: 'Thüringen', sfId: '11' },
                                          { label: 'Bremen', sfId: '12' },
                                          { label: 'Hamburg', sfId: '13' },
                                          { label: 'Berlin', sfId: '14' },
                                          { label: 'Schleswig Holstein', sfId: '15' },
                                          { label: 'Hessen', sfId: '16' },
                                          { label: 'Mallorca', sfId: '17' },
                                        ],
                                      },
                                      `text-field-bundesland`,
                                    ),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    },
                    'form-2',
                  ),
                ],
              },
              '2',
            ),
            onboardingControllerItemFactory(
              {
                navigationTitle: 'Lohnabrechnung',
                title: 'Lohnabrechnung',
                description: 'Tragen Sie hier Ihre Bankdaten für Ihren neuen Arbeitgeber ein.',
                componentChildren: [
                  formFactory(
                    {
                      componentChildren: [
                        gridFactory({
                          rowGap: 'extraLarge',
                          items: [
                            gridItemFactory({
                              componentChildren: [
                                sectionFactory({
                                  title: 'BANKDATEN',
                                  titleChildren: [
                                    streamlineIconFactory({ name: 'information-circle' }),
                                    tooltipFactory({
                                      componentChildren: [streamlineIconFactory({ name: 'information-circle' })],
                                      text: 'Hier könnte dein langer Text stehen!\nOder Gehen oder so \nBliBlaBlub\nBliBlaBlub\nBliBlaBlub',
                                    }),
                                  ],
                                  componentChildren: [
                                    gridFactory({
                                      rowGap: 'large',
                                      items: [
                                        gridItemFactory({
                                          size: 12,
                                          componentChildren: [
                                            textFieldFactory(
                                              {
                                                label: 'IBAN',
                                                name: `iban`,
                                                mandatory: true,
                                              },
                                              `text-field-iban`,
                                            ),
                                          ],
                                        }),
                                        gridItemFactory({
                                          size: 12,
                                          componentChildren: [
                                            textFieldFactory(
                                              {
                                                label: 'BIC',
                                                name: `bic`,
                                                mandatory: true,
                                              },
                                              `text-field-bic`,
                                            ),
                                          ],
                                        }),
                                        gridItemFactory({
                                          size: 12,
                                          componentChildren: [
                                            textFieldFactory(
                                              {
                                                label: 'Abweichender Kontoinhaber',
                                                name: `kontoinhaber`,
                                              },
                                              `text-field-kontoinhaber`,
                                            ),
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
                                sectionFactory({
                                  title: 'STEUERLICHE ANGABEN',
                                  titleChildren: [
                                    tooltipFactory({
                                      componentChildren: [streamlineIconFactory({ name: 'information-circle' })],
                                      text: 'Hier könnte dein Text stehen!',
                                    }),
                                  ],
                                  componentChildren: [
                                    gridFactory({
                                      rowGap: 'large',
                                      columnGap: 'large',
                                      items: [
                                        gridItemFactory({
                                          size: 6,
                                          componentChildren: [
                                            textFieldFactory(
                                              {
                                                label: 'Steueridentifikationsnummer',
                                                name: `steueridentifikationsnummer`,
                                                mandatory: true,
                                              },
                                              `text-field-steueridentifikationsnummer`,
                                            ),
                                          ],
                                        }),
                                        gridItemFactory({
                                          size: 6,
                                          componentChildren: [
                                            selectFactory(
                                              {
                                                label: 'Konfession für Lohnsteuer',
                                                name: `konfession`,
                                                options: [
                                                  { label: 'Keine', sfId: '1' },
                                                  { label: 'Katholisch', sfId: '2' },
                                                  { label: 'Evangelisch', sfId: '3' },
                                                  { label: 'Kirche des Fliegenden Spaghettimonster', sfId: '4' },
                                                ],
                                              },
                                              `text-field-konfession`,
                                            ),
                                          ],
                                        }),
                                        gridItemFactory({
                                          size: 6,
                                          componentChildren: [
                                            selectFactory(
                                              {
                                                label: 'Steuerklasse',
                                                name: `steuerklasse`,
                                                options: [
                                                  { label: '1', sfId: '1' },
                                                  { label: '2', sfId: '2' },
                                                  { label: '3', sfId: '3' },
                                                  { label: '4', sfId: '4' },
                                                ],
                                              },
                                              `text-field-steuerklasse`,
                                            ),
                                          ],
                                        }),
                                        gridItemFactory({
                                          size: 6,
                                          componentChildren: [
                                            textFieldFactory(
                                              {
                                                label: 'Kinderfreibetrag',
                                                name: `kinderfreibetrag`,
                                              },
                                              `text-field-kinderfreibetrag`,
                                            ),
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
                                sectionFactory({
                                  title: 'SOZIALVERSICHERUNGS-ANGABEN',
                                  titleChildren: [
                                    tooltipFactory({
                                      componentChildren: [streamlineIconFactory({ name: 'information-circle' })],
                                      text: 'Hier könnte dein Text stehen!',
                                    }),
                                  ],
                                  componentChildren: [
                                    gridFactory({
                                      items: [
                                        gridItemFactory({
                                          size: 12,
                                          componentChildren: [
                                            textFieldFactory(
                                              {
                                                label: 'Sozialversicherungsnummer',
                                                name: `sozialversicherungsnummer`,
                                                mandatory: true,
                                              },
                                              `text-field-sozialversicherungsnummer`,
                                            ),
                                          ],
                                        }),
                                        gridItemFactory({
                                          size: 12,
                                          componentChildren: [
                                            checkboxFactory(
                                              {
                                                label: 'Ist [Firma] ihr Hauptarbeitgeber',
                                                name: 'checkbox-hauptarbeitgeber',
                                                checked: false,
                                              },
                                              'checkbox-hauptarbeitgeber',
                                            ),
                                          ],
                                        }),
                                        gridItemFactory({
                                          size: 12,
                                          componentChildren: [
                                            checkboxFactory(
                                              {
                                                label: 'Sie haben eine Nebenbeschäftigung?',
                                                name: 'checkbox-nebenbeschäftigung',
                                                checked: false,
                                              },
                                              'checkbox-nebenbeschäftigung',
                                            ),
                                          ],
                                        }),
                                        gridItemFactory({
                                          size: 12,
                                          componentChildren: [
                                            dateFieldFactory(
                                              {
                                                label: 'Nebenbeschäftigung',
                                                name: `nebenbeschaeftigung`,
                                                disabled: true,
                                              },
                                              `date-field-nebenbeschaeftigung`,
                                            ),
                                          ],
                                        }),
                                        gridItemFactory({
                                          size: 12,
                                          componentChildren: [
                                            selectFactory(
                                              {
                                                label: 'Krankenversicherung',
                                                name: `krankenversicherung`,
                                                options: [
                                                  { label: 'Keine Angabe', sfId: '1' },
                                                  { label: 'Gesetzlich', sfId: '2' },
                                                  { label: 'Privat', sfId: '3' },
                                                ],
                                              },
                                              `text-field-krankenversicherung`,
                                            ),
                                          ],
                                        }),
                                        gridItemFactory({
                                          size: 12,
                                          componentChildren: [
                                            dropzoneFactory(
                                              {
                                                title: 'Urlaubsbescheinigung',
                                                label: 'Urlaubsbescheinigung',
                                              },
                                              undefined,
                                              'data-guide-test',
                                            ),
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
                      ],
                    },
                    'form-3',
                  ),
                ],
                media: imageFactory({ src: 'https://placedog.net/500/500', corner: 'circular', fullWidth: false }),
                navigationIcon: streamlineIconFactory({ name: 'cash-hand-mobil' }),
              },
              '3',
            ),
            onboardingControllerItemFactory(
              {
                navigationTitle: 'Compliance Management Dokumente',
                title: 'Compliance Management Dokumente',
                media: streamlineIconFactory({ name: 'woman-hair-open-desktop' }),
                description:
                  'das Bestätigen der Compliance Management Dokumente ist nötig um das Onbarding zu verollständigen.',
                componentChildren: [
                  formFactory(
                    {
                      componentChildren: [
                        gridFactory({
                          items: [
                            gridItemFactory({
                              componentChildren: [
                                cmdTableFactory({
                                  items: [
                                    cmdTableItemFactory(
                                      {
                                        title: 'Reisekosten- und Bewirtungsrichtlinie 12.06.2019',
                                        url: 'https://xd.adobe.com/view/e07b9829-5e82-46f4-bee6-85e94edad468-b528/screen/fc64b451-b97d-4452-a1b2-8f8dc0477fcd/',
                                        confirmed: false,
                                        onButtonClick: [
                                          {
                                            type: 'request',
                                            blockUi: false,
                                            data: {
                                              customString: 'Compliance Document Confirmed.',
                                              action: 'cmd-table-page',
                                              pageEvent: 'item-0',
                                            },
                                          },
                                        ],
                                      },
                                      'item-0',
                                    ),
                                    cmdTableItemFactory(
                                      {
                                        title:
                                          "We're no Strangers to love, Baby. You know the Rules and so do i. - Today",
                                        url: '',
                                        confirmed: false,
                                        onButtonClick: [
                                          {
                                            type: 'request',
                                            blockUi: false,
                                            data: {
                                              customString: 'Compliance Document Confirmed.',
                                              action: 'cmd-table-page',
                                              pageEvent: 'item-1',
                                            },
                                          },
                                        ],
                                      },
                                      'item-1',
                                    ),
                                    cmdTableItemFactory(
                                      {
                                        title:
                                          '3G-Status-Nachweis 11.09.20203G-Status-Nachweis 11.09.20203G-Status-Nachweis 11.09.20203G-Status-Nachweis 11.09.20203G-Status-Nachweis 11.09.20203G-Status-Nachweis 11.09.20203G-Status-Nachweis 11.09.20203G-Status-Nachweis 11.09.20203G-Status-Nachweis 11.09.20203G-Status-Nachweis 11.09.20203G-Status-Nachweis 11.09.2020',
                                        url: 'https://xd.adobe.com/view/e07b9829-5e82-46f4-bee6-85e94edad468-b528/screen/fc64b451-b97d-4452-a1b2-8f8dc0477fcd/',
                                        confirmed: true,
                                        onButtonClick: [
                                          {
                                            type: 'request',
                                            blockUi: false,
                                            data: {
                                              customString: 'Compliance Document Confirmed.',
                                              action: 'cmd-table-page',
                                              pageEvent: 'item-2',
                                            },
                                          },
                                        ],
                                      },
                                      'item-2',
                                    ),
                                    cmdTableItemFactory(
                                      {
                                        title: 'Datenschutzinformationen für Mitarbeiter 24.02.2022',
                                        url: 'https://xd.adobe.com/view/e07b9829-5e82-46f4-bee6-85e94edad468-b528/screen/fc64b451-b97d-4452-a1b2-8f8dc0477fcd/',
                                        confirmed: false,
                                        onButtonClick: [
                                          {
                                            type: 'request',
                                            blockUi: false,
                                            data: {
                                              customString: 'Compliance Document Confirmed.',
                                              action: 'cmd-table-page',
                                              pageEvent: 'item-3',
                                            },
                                          },
                                        ],
                                      },
                                      'item-3',
                                    ),
                                    cmdTableItemFactory(
                                      {
                                        title: 'IT-Sicherheitsrichtlinie 24.02.2022',
                                        url: 'https://xd.adobe.com/view/e07b9829-5e82-46f4-bee6-85e94edad468-b528/screen/fc64b451-b97d-4452-a1b2-8f8dc0477fcd/',
                                        confirmed: false,
                                        signingUrl:
                                          'https://xd.adobe.com/view/e07b9829-5e82-46f4-bee6-85e94edad468-b528/screen/fc64b451-b97d-4452-a1b2-8f8dc0477fcd/',
                                        onButtonClick: [
                                          {
                                            type: 'request',
                                            blockUi: false,
                                            data: {
                                              customString: 'Compliance Document Confirmed.',
                                              action: 'cmd-table-page',
                                              pageEvent: 'item-4',
                                            },
                                          },
                                        ],
                                      },
                                      'item-4',
                                    ),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    },
                    'form-5',
                  ),
                ],
                navigationIcon: streamlineIconFactory({ name: 'common-file-check-mobil' }),
              },
              '5',
            ),
            onboardingControllerItemFactory(
              {
                navigationTitle: 'Weitere Angaben',
                title: 'Weitere Angaben',
                description: 'Hier können Sie zusätzliche Angaben für Ihren neuen Arbeitgeber hinterlegen.',
                componentChildren: [
                  formFactory(
                    {
                      componentChildren: [
                        gridFactory({
                          items: [
                            gridItemFactory({
                              componentChildren: [
                                alertFactory({
                                  title: 'Notizen von Ihrem neuen Arbeitgeber',
                                  componentChildren: [textFactory({ text: 'Bitte fügen Sie den Lebenslauf ein' })],
                                  color: 'secondary',
                                }),
                              ],
                            }),
                            gridItemFactory({
                              componentChildren: [
                                textareaFactory(
                                  {
                                    name: `weiteres`,
                                    label: 'Notizen von Ihnen an Ihren neuen Arbeitsgeber HRworks',
                                    rows: 6,
                                  },
                                  `text-field-weiteres`,
                                ),
                              ],
                            }),
                            gridItemFactory({
                              componentChildren: [
                                checkboxFactory(
                                  {
                                    label: 'Weiteres Dokument anfügen',
                                    name: 'checkbox-weiteres',
                                    checked: false,
                                  },
                                  'checkbox-weiteres',
                                ),
                              ],
                            }),
                          ],
                        }),
                      ],
                    },
                    'form-6',
                  ),
                ],
                media: streamlineIconFactory({ name: 'note-desktop' }),
                navigationIcon: streamlineIconFactory({ name: 'note-mobil' }),
                bottomArrowBar: {
                  icon: streamlineIconFactory({ name: 'tick' }),
                  description: 'Fertigstellen',
                },
              },
              '6',
            ),
            onboardingControllerItemFactory(
              {
                title: 'ONBOARDING ABGESCHLOSSEN!',
                description: 'Bei Fragen wenden Sie sich an Ihren neuen Arbeitgeber.',
                media: streamlineIconFactory({ name: 'handshake-desktop' }),
                expandSidebar: true,
              },
              '7',
            ),
          ],
        },
      ]);
    default:
      return {};
  }
};
