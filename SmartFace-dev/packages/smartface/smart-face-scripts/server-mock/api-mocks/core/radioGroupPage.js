// @ts-check
import getId from '../../../../shared/getId.js';
import {
  accordionFactory,
  accordionItemFactory,
} from '../../../../shared/smartFaceComponentFactories/core/accordionFactory.js';
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { gridFactory, gridItemFactory } from '../../../../shared/smartFaceComponentFactories/core/gridFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { radioGroupFactory } from '../../../../shared/smartFaceComponentFactories/core/radioGroupFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { textFactory } from '../../../../shared/smartFaceComponentFactories/core/textFactory.js';
import { footer } from '../shared/footer.js';
import { sidebar } from '../shared/sidebar.js';

const validationStates = ['default', 'success', 'warning', 'danger'];
const sizes = ['extraSmall', 'small', 'medium', 'large', 'extraLarge'];

// RADIO-GROUP ----------------------------------------------------------
const generateRadioGroup = (id, size, state, optDirection, disabled) => {
  return gridItemFactory({
    size: 12,
    componentChildren: [
      radioGroupFactory(
        {
          'aria-label': `radio ${state}`,
          label: `${state}`,
          name: `radio-group-${id}`,
          size: `${size}`,
          validationState: state === 'default' ? undefined : `${state}`,
          validationMessage: state === 'default' ? undefined : `Validation Message: ${state}`,
          disabled: disabled,
          helpText: `Helptext`,
          mandatory: true,
          optionsDirection: optDirection,
          options: [
            { sfId: `rdg-0-${id}-${getId()}`, label: 'Option-0' },
            { sfId: `rdg-1-${id}-${getId()}`, label: 'Option-1' },
            { sfId: `rdg-2-${id}-${getId()}`, label: 'Option-2' },
          ],
          onValueChange: [
            {
              type: 'request',
              blockUi: false,
              data: {
                action: 'radio-group-page',
                targetId: `radio-group-${id}-${getId()}`,
                pageEvent: 'on-value-change',
              },
            },
          ],
        },
        `radio-group-${id}`,
        'data-guide-test',
      ),
    ],
  });
};

const generateRadioGroupAccContent = () => {
  let radioGroups = [];
  let radioGroupRow = [];
  sizes.forEach((size, indexSizes) => {
    // Validation Variants Row
    validationStates.forEach((state, indexVariant) => {
      radioGroupRow.push(generateRadioGroup(indexSizes + '-' + indexVariant, size, state, false));
    });
    radioGroups.push(
      gridItemFactory({
        componentChildren: [gridFactory({ items: [...radioGroupRow] })],
      }),
    );
    // Default + 'optionDirecton == Row' Row
    let rowDirectionRow = generateRadioGroup(`row-${indexSizes}`, size, 'default', false);
    radioGroups.push(
      gridItemFactory({
        componentChildren: [gridFactory({ items: [rowDirectionRow] })],
      }),
    );
    radioGroupRow = [];
  });

  return radioGroups;
};

const generateRadioGroupDisabledAccContent = () => {
  let radioGroups = [];
  let radioGroupRow = [];
  validationStates.forEach((state, indexVariant) => {
    radioGroupRow.push(generateRadioGroup('disabled' + '-' + indexVariant, 'medium', state, 'default', true));
  });
  radioGroups.push(
    gridItemFactory({
      componentChildren: [gridFactory({ items: [...radioGroupRow] })],
    }),
  );

  return radioGroups;
};

/**
 * @type { import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType.js').SmartFaceBackendDataType }
 */
export const radioGroupPage = smartFaceFactory({
  sfComponents: [
    pageFactory({
      document: { head: { title: 'RadioGroup Page' } },
      componentChildren: [
        classicLayoutFactory({
          sidebar: sidebar('radio-group-page', ['form-pages']),
          content: {
            header: {
              fixed: 'never',
              componentChildren: [
                gridFactory({
                  items: [
                    gridItemFactory({
                      componentChildren: [
                        textFactory({
                          text: 'RadioGroup Page',
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
              gridFactory({
                items: [
                  // RADIO-GROUP
                  gridItemFactory({
                    componentChildren: [
                      accordionFactory({
                        expandedItemSfIds: ['a1'],
                        items: [
                          accordionItemFactory(
                            {
                              icon: undefined,
                              title: 'RadioGroup - Sizes, Validationstates & Direction',
                              componentChildren: [gridFactory({ items: [...generateRadioGroupAccContent()] })],
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
                              title: 'RadioGroup - Disabled & Validationstates',
                              componentChildren: [gridFactory({ items: [...generateRadioGroupDisabledAccContent()] })],
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
                              title: 'RadioGroup - MISC',
                              componentChildren: [
                                gridFactory({
                                  items: [
                                    gridItemFactory({
                                      size: 12,
                                      componentChildren: [
                                        radioGroupFactory(
                                          {
                                            label: `Label`,
                                            name: `radio-group-some-misc-name`,
                                            size: `extraLarge`,
                                            helpText: `Helptext`,
                                            options: [
                                              { sfId: `rdg-0-helptext-${getId()}`, label: 'Option-0' },
                                              { sfId: `rdg-1-helptext-${getId()}`, label: 'Option-1' },
                                              { sfId: `rdg-2-helptext-${getId()}`, label: 'Option-2' },
                                            ],
                                          },
                                          `radio-group-MISC-helptext`,
                                          'data-guide-helptext',
                                        ),
                                      ],
                                    }),
                                  ],
                                }),
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
                              title: 'RadioGroup - No-Options Test',
                              componentChildren: [
                                gridFactory({
                                  items: [
                                    gridItemFactory({
                                      size: 12,
                                      componentChildren: [
                                        radioGroupFactory(
                                          {
                                            label: `Label`,
                                            name: `radio-group-some-misc-name`,
                                            size: `extraLarge`,
                                            helpText: `Helptext`,
                                            options: [],
                                            // options: undefined,
                                          },
                                          `radio-group-MISC-helptext`,
                                          'data-guide-helptext',
                                        ),
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
          },
          footer,
        }),
      ],
    }),
  ],
});
