// @ts-check
import {
  accordionFactory,
  accordionItemFactory,
} from '../../../../shared/smartFaceComponentFactories/core/accordionFactory.js';
import { buttonFactory } from '../../../../shared/smartFaceComponentFactories/core/buttonFactory.js';
import { checkboxGroupFactory } from '../../../../shared/smartFaceComponentFactories/core/checkboxGroupFactory.js';
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { formFactory } from '../../../../shared/smartFaceComponentFactories/core/formFactory.js';
import { gridFactory, gridItemFactory } from '../../../../shared/smartFaceComponentFactories/core/gridFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { textFactory } from '../../../../shared/smartFaceComponentFactories/core/textFactory.js';
import { footer } from '../shared/footer.js';
import { sidebar } from '../shared/sidebar.js';

const validationStates = ['default', 'success', 'warning', 'danger'];
const sizes = ['extraSmall', 'small', 'medium', 'large', 'extraLarge'];

// CHECKBOX-GROUP ----------------------------------------------------------
const generateCheckboxGroup = (id, size, state, optDirection, gridItemSize, disabled) => {
  return gridItemFactory({
    size: gridItemSize,
    componentChildren: [
      checkboxGroupFactory(
        {
          label: `${state}`,
          'aria-label': `checkbox ${state}`,
          name: `checkbox-group-${id}`,
          size: `${size}`,
          validationState: state === 'default' ? undefined : `${state}`,
          validationMessage: state === 'default' ? undefined : `Validation Message: ${state}`,
          disabled: disabled,
          helpText: `Helptext`,
          mandatory: true,
          checked: true,
          optionsDirection: optDirection,
          options: [
            { sfId: 'chk-0', label: 'Option-0' },
            { sfId: 'chk-1', label: 'Option-1' },
            { sfId: 'chk-2', label: 'Option-2' },
          ],
          onValueChange: [
            {
              type: 'request',
              blockUi: false,
              data: {
                action: 'checkbox-group-page',
                targetId: `checkbox-group-${id}`,
                pageEvent: 'on-value-change',
              },
            },
          ],
        },
        `checkbox-group-${id}`,
        'data-guide-test',
      ),
    ],
  });
};

const generateCheckboxGroupAccContent = () => {
  let checkboxGroups = [];
  let checkboxGroupRow = [];
  sizes.forEach((size, indexSizes) => {
    // Validation Variants Row
    validationStates.forEach((state, indexVariant) => {
      checkboxGroupRow.push(
        generateCheckboxGroup('validation-' + indexSizes + '-' + indexVariant, size, state, undefined, 3),
      );
    });
    checkboxGroups.push(
      gridItemFactory({
        componentChildren: [gridFactory({ items: [...checkboxGroupRow] })],
      }),
    );
    // Default + 'optionDirecton == Row' Row
    let rowDirectionRow = generateCheckboxGroup(`row-${indexSizes}`, size, 'default', 'row', 12);
    checkboxGroups.push(
      gridItemFactory({
        componentChildren: [gridFactory({ items: [rowDirectionRow] })],
      }),
    );
    checkboxGroupRow = [];
  });

  return checkboxGroups;
};

const generateCheckboxGroupDisabledAccContent = () => {
  let checkboxGroups = [];
  let checkboxGroupRow = [];
  validationStates.forEach((state, indexVariant) => {
    checkboxGroupRow.push(generateCheckboxGroup('disabled' + '-' + indexVariant, 'medium', state, undefined, 3, true));
  });
  checkboxGroups.push(
    gridItemFactory({
      componentChildren: [gridFactory({ items: [...checkboxGroupRow] })],
    }),
  );

  return checkboxGroups;
};

/**
 * @type { import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType.js').SmartFaceBackendDataType }
 */
export const checkboxGroupPage = smartFaceFactory({
  sfComponents: [
    pageFactory(
      {
        document: { head: { title: 'CheckboxGroup Page' } },
        componentChildren: [
          classicLayoutFactory({
            sidebar: sidebar('checkbox-group-page', ['form-pages']),
            content: {
              header: {
                fixed: 'never',
                componentChildren: [
                  gridFactory({
                    items: [
                      gridItemFactory({
                        componentChildren: [
                          textFactory({
                            text: 'CheckboxGroup Page',
                            fontSize: 'extraLarge',
                            fontWeight: 'bold',
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              },
              componentChildren: [
                formFactory({
                  componentChildren: [
                    gridFactory({
                      items: [
                        // CHECKBOX-GROUP
                        gridItemFactory({
                          componentChildren: [
                            accordionFactory({
                              expandedItemSfIds: ['a1'],
                              items: [
                                accordionItemFactory(
                                  {
                                    icon: undefined,
                                    title: 'CheckboxGroup - Sizes & Validationstates',
                                    componentChildren: [gridFactory({ items: [...generateCheckboxGroupAccContent()] })],
                                  },
                                  'a1',
                                ),
                              ],
                            }),
                          ],
                        }),
                        gridItemFactory({
                          componentChildren: [
                            accordionFactory({
                              expandedItemSfIds: ['a2'],
                              items: [
                                accordionItemFactory(
                                  {
                                    icon: undefined,
                                    title: 'CheckboxGroup - No rerender of Options on label change',
                                    componentChildren: [
                                      gridFactory({
                                        items: [
                                          gridItemFactory({
                                            componentChildren: [
                                              gridFactory({
                                                items: [generateCheckboxGroup('fisch', 'medium', 'default', 'row', 12)],
                                              }),
                                            ],
                                          }),
                                          gridItemFactory({
                                            componentChildren: [
                                              buttonFactory({
                                                text: 'Change Label',
                                                onClick: [
                                                  {
                                                    type: 'request',
                                                    data: {
                                                      action: 'reflect',
                                                      reflectedData: {
                                                        sideEffects: [
                                                          {
                                                            type: 'patch',
                                                            updates: [
                                                              {
                                                                operation: 'write',
                                                                targetSfId: 'checkbox-group-fisch',
                                                                path: 'props.label',
                                                                value: 'fisch',
                                                              },
                                                            ],
                                                          },
                                                          {
                                                            type: 'navigateToElement',
                                                            id: 'modal-0-button-0',
                                                            focus: true,
                                                            scrollIntoView: false,
                                                          },
                                                        ],
                                                      },
                                                    },
                                                  },
                                                ],
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                    ],
                                  },
                                  'a2',
                                ),
                              ],
                            }),
                          ],
                        }),
                        gridItemFactory({
                          componentChildren: [
                            accordionFactory({
                              expandedItemSfIds: ['a3'],
                              items: [
                                accordionItemFactory(
                                  {
                                    icon: undefined,
                                    title: 'CheckboxGroup - Disabled & Validationstates',
                                    componentChildren: [
                                      gridFactory({ items: [...generateCheckboxGroupDisabledAccContent()] }),
                                    ],
                                  },
                                  'a3',
                                ),
                              ],
                            }),
                          ],
                        }),
                        gridItemFactory({
                          componentChildren: [
                            accordionFactory({
                              expandedItemSfIds: ['a4'],
                              items: [
                                accordionItemFactory(
                                  {
                                    icon: undefined,
                                    title: 'CheckboxGroup - No-Options Test',
                                    componentChildren: [
                                      gridFactory({
                                        items: [
                                          gridItemFactory({
                                            size: 12,
                                            componentChildren: [
                                              checkboxGroupFactory({
                                                label: `Label`,
                                                name: `checkbox-group-some-misc-name`,
                                                size: `extraLarge`,
                                                helpText: `Helptext`,
                                                options: [],
                                                // options: undefined,
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                    ],
                                  },
                                  'a4',
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
            },
            footer,
          }),
        ],
      },
      'c-g-page-0',
    ),
  ],
});
