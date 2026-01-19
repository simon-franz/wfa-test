import { mockComponents, mockData } from '@hrworks/cypress-utils/fixtures';
import { generateTest, generateVisualTests, renderComponentWithTheme } from '@hrworks/cypress-utils/functions';

import { Select } from './Select';
import type { SelectOptionProps, SelectProps } from './Select.types';
import { S as SelectListItem } from './SelectList/SelectListItem/SelectListItem.styles';

const { testString, boolean, sizes, validationStates } = mockData;
const { Icon } = mockComponents;

const options: SelectOptionProps[] = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

const manyOptions: SelectOptionProps[] = [
  { value: 'option4', label: 'Option 4' },
  { value: 'option5', label: 'Option 5' },
  { value: 'option6', label: 'Option 6' },
  { value: 'option7', label: 'Option 7' },
  { value: 'option8', label: 'Option 8' },
  { value: 'option9', label: 'Option 9' },
  { value: 'option10', label: 'Option 10' },
  { value: 'option11', label: 'Option 11' },
  { value: 'option12', label: 'Option 12' },
];

const manyOptionsWithAndWithoutMedia: SelectOptionProps[] = [
  { value: 'option4', label: 'Option 4', media: Icon },
  { value: 'option5', label: 'Option 5' },
  { value: 'option6', label: 'Option 6' },
  { value: 'option7', label: 'Option 7', media: Icon },
  { value: 'option8', label: 'Option 8' },
  { value: 'option9', label: 'Option 9', media: Icon },
  { value: 'option10', label: 'Option 10', media: Icon },
  { value: 'option11', label: 'Option 11' },
  { value: 'option12', label: 'Option 12', media: Icon },
];

const allOptions = [...options, ...manyOptions];

const defaultProps: Partial<SelectProps> = {
  options,
  name: 'default-select',
  label: testString,
  helpText: testString,
  mandatory: true,
  validationMessage: testString,
  'aria-label': testString,
};

const openSelect = () => {
  cy.get('[data-cy="sf-select"]').click();
  cy.get(`${SelectListItem.ItemContainer} svg path`).should('exist');
};

const renderSelect = (props: Partial<SelectProps>) => {
  renderComponentWithTheme(Select, { ...defaultProps, ...props } as Partial<SelectProps>, undefined);
};

// TODO: The noneOption is missing. It's unclear whether the component properly handles the noneOption. An issue has been written.

context('Select', () => {
  // First test group for props that should be tested in closed state
  describe('Visual-Test', () => {
    generateVisualTests({
      renderFn: renderSelect,
      singleTests: {
        props: {
          // mandatory: boolean, // If the snapshots were created headlessly, this test fails in the cygui and vice versa; a follow-up issue has been written
          disabled: boolean,
          size: sizes,
        },
        config: {
          defaultProps,
          customScreenshotNames: {
            size: [
              'small_closed',
              'extraSmall_closed',
              'medium_closed',
              'large_closed',
              'extraLarge_closed',
              'undefined_closed',
            ],
          },
        },
      },
      combinationTests: {
        combinations: [
          {
            props: {
              size: sizes,
              validationState: validationStates,
            },
            config: {
              customScreenshotNames: {
                size: [
                  'small_closed',
                  'extraSmall_closed',
                  'medium_closed',
                  'large_closed',
                  'extraLarge_closed',
                  'undefined_closed',
                ],
              },
            },
          },
        ],
      },
    });

    // Second test group for props that should be tested in open state
    generateVisualTests({
      renderFn: renderSelect,
      singleTests: {
        props: {
          size: sizes,
          options: [options, allOptions, manyOptionsWithAndWithoutMedia],
          multiple: [true, undefined],
        },
        config: {
          defaultProps,
          cb: () => openSelect(),
        },
      },
      combinationTests: {
        combinations: [
          {
            props: {
              size: sizes,
              validationState: validationStates,
            },
            config: {
              defaultProps,
              cb: () => openSelect(),
            },
          },
        ],
      },
    });
  });

  describe('Functional-Test', () => {
    generateTest('aria-label', 'is set', () => {
      renderSelect({ 'aria-label': testString });
      cy.get(`[data-cy="Select"] input`).should('have.attr', 'aria-label', testString);
    });

    generateTest('single selection with mouse', 'single select', () => {
      const onValueChangeSpy = cy.spy().as('onValueChangeSpy');
      renderSelect({ onValueChange: onValueChangeSpy });
      cy.get('[data-cy="sf-select"]').realClick();
      cy.get('[data-cy="sf-select-list"]').contains('Option 2').realClick();
      cy.get('@onValueChangeSpy').should('have.been.calledOnce');
      cy.get('[data-cy="sf-select"] input').should('have.value', 'option2');
      cy.get('@onValueChangeSpy').should('have.been.calledWith', 'option2');

      cy.get('[data-cy="sf-select"]').realClick();
      cy.get('[data-cy="sf-select-list"]').should('be.visible');
      cy.get('[data-cy="sf-select-list"]').contains('Option 1').realClick();
      cy.get('[data-cy="sf-select"] input').should('have.value', 'option1');
    });

    generateTest('single selection with mouse', 'multi select', () => {
      renderSelect({
        multiple: true,
      });
      cy.get('[data-cy="sf-select"]').realClick();
      cy.get('[data-cy="sf-select-list"]').contains('Option 2').realClick();
      cy.get('[data-cy="sf-select"] input').should('have.value', `["option2"]`);
    });

    generateTest('select and deselect with mouse', 'multi select', () => {
      renderSelect({
        multiple: true,
      });
      cy.get('[data-cy="sf-select"]').realClick();
      cy.get('[data-cy="sf-select-list"]').contains('Option 2').realClick();
      cy.get('[data-cy="sf-select"] input').should('have.value', `["option2"]`);
      cy.get('[data-cy="sf-select-list"]').contains('Option 2').realClick();
      cy.get('[data-cy="sf-select"] input').should('have.value', '[]');
    });

    generateTest('multi selection with mouse', 'multi select', () => {
      renderSelect({
        multiple: true,
      });
      cy.get('[data-cy="sf-select"]').realClick();
      cy.get('[data-cy="sf-select-list"]').contains('Option 1').realClick();
      cy.get('[data-cy="sf-select-list"]').contains('Option 2').realClick();
      cy.get('[data-cy="sf-select-list"]').contains('Option 3').realClick();
      cy.get('[data-cy="sf-select"] input').should('have.value', `["option1","option2","option3"]`);
    });

    generateTest('multi selection with keys', 'multi select', () => {
      renderSelect({
        multiple: true,
      });
      cy.get('[data-cy="sf-select"]').realClick();
      cy.get('[data-cy="sf-select"]').trigger('keydown', { key: 'ArrowDown' });
      cy.get('[data-cy="sf-select"]').trigger('keydown', { key: 'Enter' });
      cy.get('[data-cy="sf-select"]').trigger('keydown', { key: 'End' });
      cy.get('[data-cy="sf-select"]').trigger('keydown', { key: 'Enter' });
      cy.get('[data-cy="sf-select"] input').should('have.value', `["option1","option3"]`);
    });

    generateTest('close with esc', 'multi select', () => {
      renderSelect({
        multiple: true,
      });
      cy.get('[data-cy="sf-select"]').realClick();
      cy.get('[data-cy="sf-select-list"]').contains('Option 3').realClick();
      cy.get('[data-cy="sf-select"]').realClick();
      cy.get('[data-cy="sf-select"]').trigger('keydown', { key: 'Escape' });
    });

    generateTest('onValueChange and  onValueChangeFinished is called', 'multi select', () => {
      const onValueChangeSpy = cy.spy().as('onValueChangeSpy');
      const onValueChangeFinishedSpy = cy.spy().as('onValueChangeFinishedSpy');
      renderSelect({
        multiple: true,
        onValueChange: onValueChangeSpy,
        onValueChangeFinished: onValueChangeFinishedSpy,
      });
      cy.get('[data-cy="sf-select"]').realClick();
      cy.get('[data-cy="sf-select-list"]').contains('Option 2').realClick();
      cy.get('@onValueChangeSpy').should('have.been.calledOnce');
      cy.get('[data-cy="sf-select"] input').should('have.value', `["option2"]`);

      cy.get('[data-cy="sf-select-list"]').contains('Option 2').realClick();
      cy.get('[data-cy="sf-select-list"]').contains('Option 1').realClick();
      cy.get('body').realClick();
      cy.get('@onValueChangeFinishedSpy').should('have.been.calledOnce');
    });
  });
});
