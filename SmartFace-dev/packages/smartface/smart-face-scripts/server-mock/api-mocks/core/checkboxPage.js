// @ts-check
import {
  accordionFactory,
  accordionItemFactory,
} from '../../../../shared/smartFaceComponentFactories/core/accordionFactory.js';
import { checkboxFactory } from '../../../../shared/smartFaceComponentFactories/core/checkboxFactory.js';
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { fontAwesomeIconFactory } from '../../../../shared/smartFaceComponentFactories/core/fontAwesomeIconFactory.js';
import { gridFactory, gridItemFactory } from '../../../../shared/smartFaceComponentFactories/core/gridFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { textFactory } from '../../../../shared/smartFaceComponentFactories/core/textFactory.js';
import { footer } from '../shared/footer.js';
import { sidebar } from '../shared/sidebar.js';

const validationStates = ['default', 'success', 'warning', 'danger'];
const sizes = ['extraSmall', 'small', 'medium', 'large', 'extraLarge'];

// CHECKBOX ----------------------------------------------------------
const generateCheckbox = (id, size, state, disabled) => {
  return gridItemFactory({
    size: 3,
    componentChildren: [
      checkboxFactory(
        {
          label: `${state}`,
          'aria-label': `checkbox ${state}`,
          name: `checkbox-${id}`,
          size: `${size}`,
          disabled: disabled,
          validationState: state === 'default' ? undefined : `${state}`,
          validationMessage: state === 'default' ? undefined : `Validation Message: ${state}`,
          helpText: `Helptext`,
          mandatory: true,
          labelChildren: [fontAwesomeIconFactory(), fontAwesomeIconFactory()],
          checked: true,
          onValueChange: [
            {
              type: 'request',
              blockUi: false,
              data: {
                action: 'form-page',
                targetId: `checkbox-${id}`,
                pageEvent: 'on-value-change',
              },
            },
          ],
        },
        `checkbox-${id}`,
        'data-guide-test',
      ),
    ],
  });
};

const generateCheckboxAccContent = () => {
  let checkboxes = [];
  let checkboxRow = [];
  sizes.forEach((size, indexSizes) => {
    validationStates.forEach((state, indexVariant) => {
      checkboxRow.push(generateCheckbox(indexSizes + '-' + indexVariant, size, state));
    });
    checkboxes.push(
      gridItemFactory({
        componentChildren: [gridFactory({ items: [...checkboxRow] })],
      }),
    );
    checkboxRow = [];
  });

  return checkboxes;
};

const generateCheckboxDisabledAccContent = () => {
  let checkbox = [];
  let checkboxRow = [];
  validationStates.forEach((state, indexVariant) => {
    checkboxRow.push(generateCheckbox('disabled' + '-' + indexVariant, 'medium', state, true));
  });
  checkbox.push(
    gridItemFactory({
      componentChildren: [gridFactory({ items: [...checkboxRow] })],
    }),
  );

  return checkbox;
};

/**
 * @type { import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType.js').SmartFaceBackendDataType }
 */
export const checkboxPage = smartFaceFactory({
  sfComponents: [
    pageFactory({
      document: { head: { title: 'Checkbox Page' } },
      componentChildren: [
        classicLayoutFactory({
          sidebar: sidebar('checkbox-page', ['form-pages']),
          content: {
            header: {
              fixed: 'never',
              componentChildren: [
                gridFactory({
                  items: [
                    gridItemFactory({
                      componentChildren: [
                        textFactory({
                          text: 'Checkbox Page',
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
                  // CHECKBOX
                  gridItemFactory({
                    componentChildren: [
                      accordionFactory({
                        expandedItemSfIds: ['a1'],
                        items: [
                          accordionItemFactory(
                            {
                              icon: undefined,
                              title: 'Checkbox - Sizes & Validationstates',
                              componentChildren: [gridFactory({ items: [...generateCheckboxAccContent()] })],
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
                              title: 'Checkbox - Disabled & Validationstates',
                              componentChildren: [gridFactory({ items: [...generateCheckboxDisabledAccContent()] })],
                            },
                            'a2',
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
