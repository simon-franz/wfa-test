import { mockData } from '@hrworks/cypress-utils/fixtures';
import { generateTest, generateVisualTests, renderComponentWithTheme } from '@hrworks/cypress-utils/functions';

import { CheckboxGroup } from './CheckboxGroup';
import type { CheckboxGroupOption, CheckboxGroupProps } from './CheckboxGroup.types';

const { boolean, sizes, testString, testStrings, validationStates } = mockData;

const singleOption: CheckboxGroupOption[] = [{ id: 'chk-0', label: 'Option 0' }];

const manyOptions: CheckboxGroupOption[] = [
  { id: 'chk-0', label: 'Option 0' },
  { id: 'chk-1', label: 'Option 1' },
  { id: 'chk-2', label: 'Option 2' },
  { id: 'chk-3', label: 'Option 3' },
  { id: 'chk-4', label: 'Option 4' },
  { id: 'chk-5', label: 'Option 5' },
];

const defaultProps: Partial<CheckboxGroupProps> = {
  label: testString,
  helpText: testString,
  options: manyOptions,
};

const checkboxGroup = '[data-cy="CheckboxGroup"]';
const checkedInputs = '[data-cy="CheckboxGroup"] input:checked';
const firstOptionInput = '#chk-0';
const secondOptionInput = '#chk-1';

const renderCheckboxGroup = (props?: Partial<CheckboxGroupProps>) => {
  renderComponentWithTheme(CheckboxGroup, { ...defaultProps, ...props });
};

context('CheckboxGroup', () => {
  describe('Visual-Test', () => {
    generateVisualTests({
      renderFn: renderCheckboxGroup,
      singleTests: {
        props: {
          label: testStrings,
          helpText: testStrings,
          value: [[], ['chk-0'], ['chk-0', 'chk-1'], undefined],
          options: [singleOption, manyOptions, []],
          optionsDirection: ['column', 'row', undefined],
          size: sizes,
          disabled: boolean,
          mandatory: boolean,
        },
      },
      combinationTests: {
        combinations: [
          {
            props: {
              validationState: validationStates,
              validationMessage: testString,
            },
          },
          {
            props: {
              options: [[]],
              noOptionsAvailableText: testStrings,
            },
          },
        ],
      },
    });
  });

  describe('Functional-Test', () => {
    generateTest('onValueChange', 'is called when checkbox is clicked', () => {
      const onValueChangeSpy = cy.spy().as('onValueChangeSpy');
      renderCheckboxGroup({ onValueChange: onValueChangeSpy });
      cy.get(firstOptionInput).realClick();
      cy.get('@onValueChangeSpy').should('have.been.calledOnce');
    });

    generateTest('disabled functionality', 'does not allow interaction when disabled', () => {
      const onValueChangeSpy = cy.spy().as('onValueChangeSpy');
      renderCheckboxGroup({ onValueChange: onValueChangeSpy, disabled: true });
      cy.get(firstOptionInput).realClick();
      cy.get('@onValueChangeSpy').should('not.have.been.called');
      cy.get(firstOptionInput).should('be.disabled');
    });

    generateTest('checked state', 'reflects the value prop correctly', () => {
      renderCheckboxGroup({ value: ['chk-0', 'chk-1'] });
      cy.get(firstOptionInput).should('be.checked');
      cy.get(secondOptionInput).should('be.checked');
    });

    generateTest('unchecked state', 'shows no checked boxes when value is empty array', () => {
      renderCheckboxGroup({ value: [] });
      cy.get(checkedInputs).should('have.length', 0);
    });

    generateTest('multiple de-/selection management', 'maintains correct count when selecting and deselecting', () => {
      renderCheckboxGroup();

      cy.get(checkedInputs).should('have.length', 0);

      cy.get(firstOptionInput).realClick();
      cy.get(checkedInputs).should('have.length', 1);
      cy.get(firstOptionInput).should('be.checked');
      cy.get(secondOptionInput).should('not.be.checked');

      cy.get(secondOptionInput).realClick();
      cy.get(checkedInputs).should('have.length', 2);
      cy.get(firstOptionInput).should('be.checked');
      cy.get(secondOptionInput).should('be.checked');

      cy.get(firstOptionInput).realClick();
      cy.get(checkedInputs).should('have.length', 1);
      cy.get(firstOptionInput).should('not.be.checked');
      cy.get(secondOptionInput).should('be.checked');

      cy.get(secondOptionInput).realClick();
      cy.get(checkedInputs).should('have.length', 0);
      cy.get(firstOptionInput).should('not.be.checked');
      cy.get(secondOptionInput).should('not.be.checked');
    });
  });

  describe('Responsive- & Accessibility-Test', () => {
    generateTest('aria-label', 'is set correctly', () => {
      const ariaLabel = 'Test CheckboxGroup ARIA Label';
      renderCheckboxGroup({ 'aria-label': ariaLabel });
      cy.get(checkboxGroup).should('have.attr', 'aria-label', ariaLabel);
    });
  });
});
