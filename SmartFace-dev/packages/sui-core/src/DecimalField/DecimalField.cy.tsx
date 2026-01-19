import { mockData } from '@hrworks/cypress-utils/fixtures';
import {
  generateFunctionalInputFieldTests,
  generateTest,
  generateVisualInputFieldTests,
  generateVisualTests,
  renderComponentWithTheme,
} from '@hrworks/cypress-utils/functions';

import { DecimalField } from './DecimalField';
import type { DecimalFieldProps } from './DecimalField.types';

const { testString } = mockData;

const defaultProps: Partial<DecimalFieldProps> = {
  label: testString,
  placeholder: testString,
  helpText: testString,
  mandatory: true,
  validationMessage: testString,
};

const decimalFieldTestStrings = ['123.456', '0.001', '999999.99', '-123.45'];

const renderDecimalField = (props?: Partial<DecimalFieldProps>) => {
  renderComponentWithTheme(DecimalField, { ...defaultProps, ...props });
};

const selector = '[data-cy="DecimalField"]';

context('DecimalField', () => {
  describe('Visual-Test', () => {
    generateVisualInputFieldTests(selector, renderDecimalField as () => void, defaultProps, decimalFieldTestStrings);

    generateVisualTests({
      renderFn: renderDecimalField,
      singleTests: {
        props: {
          thousandsSeparator: [',', '.', '-', undefined],
          scale: [0, 2, 4, undefined],
          radix: ['.', ',', ':', undefined],
        },
        config: { defaultProps: { value: '123456,7899' } },
      },
    });
  });

  describe('Functional-Test', () => {
    generateFunctionalInputFieldTests(selector, renderDecimalField as () => void);

    generateTest('scale prop', 'should limit decimal places', () => {
      renderDecimalField({ scale: 2 });
      cy.get(selector).type('123,456').blur();
      cy.get(selector).should('have.value', '123,45');
    });

    generateTest('min and max with decimals', 'should enforce decimal bounds', () => {
      renderDecimalField({ min: 1.5, max: 10.5 });

      cy.get(selector).type('0,5').blur();
      cy.get(selector).should('have.value', '1,5');

      cy.get(selector).clear().type('5,25').blur();
      cy.get(selector).should('have.value', '5,25');

      cy.get(selector).clear().type('15,75').blur();
      cy.get(selector).should('have.value', '1,75');

      cy.get(selector).clear().type('1,5').blur();
      cy.get(selector).should('have.value', '1,5');

      cy.get(selector).clear().type('10,5').blur();
      cy.get(selector).should('have.value', '10,5');
    });

    generateTest('signed prop', 'should allow or disallow negative numbers', () => {
      renderDecimalField({ signed: true });
      cy.get(selector).type('-123,45').blur();
      cy.get(selector).should('have.value', '-123,45');

      renderDecimalField({ signed: false });
      cy.get(selector).type('-123,45').blur();
      cy.get(selector).should('not.have.value', '-123,45');
      cy.get(selector).should('have.value', '123,45');
    });

    generateTest('padFractionalZeros prop', 'should pad decimal places with zeros', () => {
      renderDecimalField({ scale: 3, padFractionalZeros: true });
      cy.get(selector).type('123,4').blur();
      cy.get(selector).should('have.value', '123,400');

      renderDecimalField({ scale: 3, padFractionalZeros: false });
      cy.get(selector).type('123,4').blur();
      cy.get(selector).should('have.value', '123,4');
    });

    generateTest('normalizeZeros prop', 'should normalize leading/trailing zeros', () => {
      renderDecimalField({ normalizeZeros: true });
      cy.get(selector).type('000123,40').blur();
      cy.get(selector).should('have.value', '123,4');

      renderDecimalField({ normalizeZeros: false });
      cy.get(selector).type('000123,40').blur();
      cy.get(selector).should('have.value', '000123,40');
    });

    generateTest('radix prop', 'should use custom decimal separator', () => {
      renderDecimalField({ radix: ',' });
      cy.get(selector).type('123,45').blur();
      cy.get(selector).should('have.value', '123,45');

      renderDecimalField({ radix: '.' });
      cy.get(selector).type('123.45').blur();
      cy.get(selector).should('have.value', '123.45');
    });

    generateTest('mapToRadix prop', 'should map input characters to radix', () => {
      renderDecimalField({ radix: ',', mapToRadix: ['.', ','] });

      cy.get(selector).type('123.45').blur();
      cy.get(selector).should('have.value', '123,45');

      cy.get(selector).clear().type('123,45').blur();
      cy.get(selector).should('have.value', '123,45');
    });

    generateTest('aria-label', 'is set', () => {
      renderDecimalField({ 'aria-label': testString });
      cy.get(`${selector}`).should('have.attr', 'aria-label', testString);
    });

    generateTest('onValueChange callback', 'should be called during input', () => {
      const onValueChangeSpy = cy.spy().as('onValueChangeSpy');
      renderDecimalField({
        onValueChange: onValueChangeSpy,
      });

      cy.get(selector).type('123,45');
      cy.get('@onValueChangeSpy').should('have.been.called');
    });
  });
});
