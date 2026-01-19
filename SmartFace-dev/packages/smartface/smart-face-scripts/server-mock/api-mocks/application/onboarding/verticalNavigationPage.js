// @ts-check
import {
  verticalNavigationFactory,
  verticalNavigationItemFactory,
} from '../../../../../shared/smartFaceComponentFactories/application/onboarding/verticalNavigationFactory.js';
import { classicLayoutFactory } from '../../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { fontAwesomeIconFactory } from '../../../../../shared/smartFaceComponentFactories/core/fontAwesomeIconFactory.js';
import { gridFactory, gridItemFactory } from '../../../../../shared/smartFaceComponentFactories/core/gridFactory.js';
import { pageFactory } from '../../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { textFieldFactory } from '../../../../../shared/smartFaceComponentFactories/core/textFieldFactory.js';
import { footer } from '../../shared/footer.js';
import { sidebar } from '../../shared/sidebar.js';

/**
 * @type { import('../../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType }
 */
export const verticalNavigationPage = smartFaceFactory({
  sfComponents: [
    pageFactory({
      document: { head: { title: 'VerticalNavigation Page' } },
      componentChildren: [
        classicLayoutFactory({
          sidebar: sidebar('vertical-navigation-page', ['onboarding-pages']),
          content: {
            componentChildren: [
              verticalNavigationFactory(
                {
                  items: [
                    verticalNavigationItemFactory(
                      {
                        navigationTitle: 'Stammdaten',
                        navigationIcon: fontAwesomeIconFactory(),
                        componentChildren: [
                          gridFactory({
                            items: [
                              gridItemFactory({
                                componentChildren: [
                                  textFieldFactory(
                                    {
                                      label: 'STAMMDATEN',
                                      name: 'firstName',
                                      value: 'Daisy',
                                      placeholder: 'Please enter your STAMMDATEN',
                                    },
                                    'text-field-0',
                                  ),
                                ],
                              }),
                              gridItemFactory({
                                componentChildren: [
                                  textFieldFactory(
                                    {
                                      label: 'STAMMDATEN',
                                      name: 'firstName',
                                      value: 'Daisy',
                                      placeholder: 'Please enter your STAMMDATEN',
                                    },
                                    'text-field-0',
                                  ),
                                ],
                              }),
                              gridItemFactory({
                                componentChildren: [
                                  textFieldFactory(
                                    {
                                      label: 'STAMMDATEN',
                                      name: 'firstName',
                                      value: 'Daisy',
                                      placeholder: 'Please enter your STAMMDATEN',
                                    },
                                    'text-field-0',
                                  ),
                                ],
                              }),
                              gridItemFactory({
                                componentChildren: [
                                  textFieldFactory(
                                    {
                                      label: 'STAMMDATEN',
                                      name: 'firstName',
                                      value: 'Daisy',
                                      placeholder: 'Please enter your STAMMDATEN',
                                    },
                                    'text-field-0',
                                  ),
                                ],
                              }),
                              gridItemFactory({
                                componentChildren: [
                                  textFieldFactory(
                                    {
                                      label: 'STAMMDATEN',
                                      name: 'firstName',
                                      value: 'Daisy',
                                      placeholder: 'Please enter your STAMMDATEN',
                                    },
                                    'text-field-0',
                                  ),
                                ],
                              }),
                              gridItemFactory({
                                componentChildren: [
                                  textFieldFactory(
                                    {
                                      label: 'STAMMDATEN',
                                      name: 'firstName',
                                      value: 'Daisy',
                                      placeholder: 'Please enter your STAMMDATEN',
                                    },
                                    'text-field-0',
                                  ),
                                ],
                              }),
                              gridItemFactory({
                                componentChildren: [
                                  textFieldFactory(
                                    {
                                      label: 'STAMMDATEN',
                                      name: 'firstName',
                                      value: 'Daisy',
                                      placeholder: 'Please enter your STAMMDATEN',
                                    },
                                    'text-field-0',
                                  ),
                                ],
                              }),
                              gridItemFactory({
                                componentChildren: [
                                  textFieldFactory(
                                    {
                                      label: 'STAMMDATEN',
                                      name: 'firstName',
                                      value: 'Daisy',
                                      placeholder: 'Please enter your STAMMDATEN',
                                    },
                                    'text-field-0',
                                  ),
                                ],
                              }),
                              gridItemFactory({
                                componentChildren: [
                                  textFieldFactory(
                                    {
                                      label: 'STAMMDATEN',
                                      name: 'firstName',
                                      value: 'Daisy',
                                      placeholder: 'Please enter your STAMMDATEN',
                                    },
                                    'text-field-0',
                                  ),
                                ],
                              }),
                              gridItemFactory({
                                componentChildren: [
                                  textFieldFactory(
                                    {
                                      label: 'STAMMDATEN',
                                      name: 'firstName',
                                      value: 'Daisy',
                                      placeholder: 'Please enter your STAMMDATEN',
                                    },
                                    'text-field-0',
                                  ),
                                ],
                              }),
                              gridItemFactory({
                                componentChildren: [
                                  textFieldFactory(
                                    {
                                      label: 'STAMMDATEN',
                                      name: 'firstName',
                                      value: 'Daisy',
                                      placeholder: 'Please enter your STAMMDATEN',
                                    },
                                    'text-field-0',
                                  ),
                                ],
                              }),
                              gridItemFactory({
                                componentChildren: [
                                  textFieldFactory(
                                    {
                                      label: 'STAMMDATEN',
                                      name: 'firstName',
                                      value: 'Daisy',
                                      placeholder: 'Please enter your STAMMDATEN',
                                    },
                                    'text-field-0',
                                  ),
                                ],
                              }),
                              gridItemFactory({
                                componentChildren: [
                                  textFieldFactory(
                                    {
                                      label: 'STAMMDATEN',
                                      name: 'firstName',
                                      value: 'Daisy',
                                      placeholder: 'Please enter your STAMMDATEN',
                                    },
                                    'text-field-0',
                                  ),
                                ],
                              }),
                              gridItemFactory({
                                componentChildren: [
                                  textFieldFactory(
                                    {
                                      label: 'STAMMDATEN',
                                      name: 'firstName',
                                      value: 'Daisy',
                                      placeholder: 'Please enter your STAMMDATEN',
                                    },
                                    'text-field-0',
                                  ),
                                ],
                              }),
                              gridItemFactory({
                                componentChildren: [
                                  textFieldFactory(
                                    {
                                      label: 'STAMMDATEN',
                                      name: 'firstName',
                                      value: 'Daisy',
                                      placeholder: 'Please enter your STAMMDATEN',
                                    },
                                    'text-field-0',
                                  ),
                                ],
                              }),
                              gridItemFactory({
                                componentChildren: [
                                  textFieldFactory(
                                    {
                                      label: 'STAMMDATEN',
                                      name: 'firstName',
                                      value: 'Daisy',
                                      placeholder: 'Please enter your STAMMDATEN',
                                    },
                                    'text-field-0',
                                  ),
                                ],
                              }),
                              gridItemFactory({
                                componentChildren: [
                                  textFieldFactory(
                                    {
                                      label: 'STAMMDATEN',
                                      name: 'firstName',
                                      value: 'Daisy',
                                      placeholder: 'Please enter your STAMMDATEN',
                                    },
                                    'text-field-0',
                                  ),
                                ],
                              }),
                              gridItemFactory({
                                componentChildren: [
                                  textFieldFactory(
                                    {
                                      label: 'STAMMDATEN',
                                      name: 'firstName',
                                      value: 'Daisy',
                                      placeholder: 'Please enter your STAMMDATEN',
                                    },
                                    'text-field-0',
                                  ),
                                ],
                              }),
                              gridItemFactory({
                                componentChildren: [
                                  textFieldFactory(
                                    {
                                      label: 'STAMMDATEN',
                                      name: 'firstName',
                                      value: 'Daisy',
                                      placeholder: 'Please enter your STAMMDATEN',
                                    },
                                    'text-field-0',
                                  ),
                                ],
                              }),
                              gridItemFactory({
                                componentChildren: [
                                  textFieldFactory(
                                    {
                                      label: 'STAMMDATEN',
                                      name: 'firstName',
                                      value: 'Daisy',
                                      placeholder: 'Please enter your STAMMDATEN',
                                    },
                                    'text-field-0',
                                  ),
                                ],
                              }),
                              gridItemFactory({
                                componentChildren: [
                                  textFieldFactory(
                                    {
                                      label: 'STAMMDATEN',
                                      name: 'firstName',
                                      value: 'Daisy',
                                      placeholder: 'Please enter your STAMMDATEN',
                                    },
                                    'text-field-0',
                                  ),
                                ],
                              }),
                              gridItemFactory({
                                componentChildren: [
                                  textFieldFactory(
                                    {
                                      label: 'STAMMDATEN',
                                      name: 'firstName',
                                      value: 'Daisy',
                                      placeholder: 'Please enter your STAMMDATEN',
                                    },
                                    'text-field-0',
                                  ),
                                ],
                              }),
                              gridItemFactory({
                                componentChildren: [
                                  textFieldFactory(
                                    {
                                      label: 'STAMMDATEN',
                                      name: 'firstName',
                                      value: 'Daisy',
                                      placeholder: 'Please enter your STAMMDATEN',
                                    },
                                    'text-field-0',
                                  ),
                                ],
                              }),
                              gridItemFactory({
                                componentChildren: [
                                  textFieldFactory(
                                    {
                                      label: 'STAMMDATEN',
                                      name: 'firstName',
                                      value: 'Daisy',
                                      placeholder: 'Please enter your STAMMDATEN',
                                    },
                                    'text-field-0',
                                  ),
                                ],
                              }),
                              gridItemFactory({
                                componentChildren: [
                                  textFieldFactory(
                                    {
                                      label: 'STAMMDATEN',
                                      name: 'firstName',
                                      value: 'Daisy',
                                      placeholder: 'Please enter your STAMMDATEN',
                                    },
                                    'text-field-0',
                                  ),
                                ],
                              }),
                            ],
                          }),
                        ],
                      },
                      undefined,
                      'data-guide-test',
                    ),
                    verticalNavigationItemFactory({
                      navigationTitle: 'Adresse',
                      hasError: true,
                      componentChildren: [
                        textFieldFactory(
                          {
                            label: 'Adresse',
                            name: 'firstName',
                            value: 'Adresse',
                            placeholder: 'Adresse',
                          },
                          'text-field-0',
                        ),
                        textFieldFactory(),
                        textFieldFactory(),
                        textFieldFactory(),
                      ],
                      navigationIcon: fontAwesomeIconFactory(),
                    }),
                    verticalNavigationItemFactory({
                      navigationTitle: 'Lohnabrechnung',
                      componentChildren: [
                        textFieldFactory(
                          {
                            label: 'Lohnabrechnung',
                            name: 'firstName',
                            value: 'Lohnabrechnung',
                            placeholder: 'Lohnabrechnung',
                          },
                          'text-field-0',
                        ),
                        textFieldFactory(),
                      ],
                      navigationIcon: fontAwesomeIconFactory(),
                    }),
                    verticalNavigationItemFactory({
                      navigationTitle: 'Urlaubsbescheinigung',
                      hasError: true,
                      componentChildren: [
                        textFieldFactory(
                          {
                            label: 'Urlaubsbescheinigung',
                            name: 'firstName',
                            value: 'Urlaubsbescheinigung',
                            placeholder: 'Urlaubsbescheinigung',
                          },
                          'text-field-0',
                        ),
                        textFieldFactory(),
                        textFieldFactory(),
                        textFieldFactory(),
                      ],
                      navigationIcon: fontAwesomeIconFactory(),
                    }),
                    verticalNavigationItemFactory({
                      navigationTitle: 'Compliance Dokumente',
                      componentChildren: [
                        textFieldFactory(
                          {
                            label: 'Compliance Dokumente',
                            name: 'firstName',
                            value: 'Compliance Dokumente',
                            placeholder: 'Compliance Dokumente',
                          },
                          'text-field-0',
                        ),
                        textFieldFactory(),
                        textFieldFactory(),
                        textFieldFactory(),
                      ],
                      navigationIcon: fontAwesomeIconFactory(),
                    }),
                    verticalNavigationItemFactory({
                      navigationTitle: 'Weitere Angaben',
                      hasError: true,
                      componentChildren: [
                        textFieldFactory(
                          {
                            label: 'Weitere Angaben',
                            name: 'firstName',
                            value: 'Weitere Angaben',
                            placeholder: 'Weitere Angaben',
                          },
                          'text-field-0',
                        ),
                        textFieldFactory(),
                        textFieldFactory(),
                        textFieldFactory(),
                      ],
                      navigationIcon: fontAwesomeIconFactory(),
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
