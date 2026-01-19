import { mockData } from '@hrworks/cypress-utils/fixtures';
import {
  generateFunctionalInputFieldTests,
  generateTest,
  generateVisualInputFieldTests,
  generateVisualTests,
  renderComponentWithTheme,
} from '@hrworks/cypress-utils/functions';

import { IntegerField } from './IntegerField';
import type { IntegerFieldProps } from './IntegerField.types';

const { testString } = mockData;

const defaultProps: Partial<IntegerFieldProps> = {
  label: testString,
  placeholder: testString,
  helpText: testString,
  mandatory: true,
  validationMessage: testString,
};

const integerFieldTestStrings = ['8'.repeat(100), '123456789', undefined];

const renderIntegerField = (props?: Partial<IntegerFieldProps>) => {
  renderComponentWithTheme(IntegerField, { ...defaultProps, ...props }, { checkForExistence: true });
};

const selector = '[data-cy="IntegerField"]';

context('IntegerField', () => {
  describe('Visual-Test', () => {
    generateVisualInputFieldTests(selector, renderIntegerField as () => void, defaultProps, integerFieldTestStrings);
    generateVisualTests({
      renderFn: renderIntegerField,
      singleTests: { props: { thousandsSeparator: [',', '.', '-'] }, config: { defaultProps: { value: '123456789' } } },
    });
  });

  describe('Functional-Test', () => {
    generateFunctionalInputFieldTests(selector, renderIntegerField as () => void);

    generateTest('min and max props', 'should enforce min and max values', () => {
      renderIntegerField({ min: 2, max: 5 });

      cy.get(selector).type('1').blur();
      cy.get(selector).should('have.value', '2');

      cy.get(selector).clear().type('3').blur();
      cy.get(selector).should('have.value', '3');

      cy.get(selector).clear().type('9').blur();
      cy.get(selector).should('have.value', '');

      renderIntegerField({ min: -10, max: 10 });
      cy.get(selector).clear().type('-20').blur();
      cy.get(selector).should('have.value', '-2');

      cy.get(selector).clear().type('0').blur();
      cy.get(selector).should('have.value', '0');

      cy.get(selector).clear().type('15').blur();
      cy.get(selector).should('have.value', '1');
    });
  });
});
