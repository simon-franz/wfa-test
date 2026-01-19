import { mockData } from '@hrworks/cypress-utils/fixtures';
import {
  generateFunctionalInputFieldTests,
  generateTest,
  generateVisualInputFieldTests,
  generateVisualTests,
  renderComponentWithTheme,
} from '@hrworks/cypress-utils/functions';

import { PasswordField } from './PasswordField';
import type { PasswordFieldProps } from './PasswordField.types';

const { testString } = mockData;

const defaultProps: Partial<PasswordFieldProps> = {
  label: testString,
  placeholder: testString,
  helpText: testString,
  mandatory: true,
  validationMessage: testString,
};

const renderPasswordField = (props?: Partial<PasswordFieldProps>) => {
  renderComponentWithTheme(PasswordField, { ...defaultProps, ...props });
};

const selector = '[data-cy="PasswordField"]';

context('PasswordField', () => {
  describe('Visual-Test', () => {
    generateVisualInputFieldTests(selector, renderPasswordField, defaultProps);
    generateVisualTests({
      renderFn: renderPasswordField,
      combinationTests: {
        combinations: [
          {
            props: { value: [testString] },
            config: {
              cb: () => {
                cy.get('button').click();
              },
              customScreenshotNames: { value: ['password-visible'] },
            },
          },
        ],
      },
    });
  });

  describe('Functional-Test', () => {
    generateFunctionalInputFieldTests(selector, renderPasswordField);

    generateTest('password visibility toggle', 'toggles between password and text types', () => {
      renderPasswordField();
      cy.get(selector).should('have.attr', 'type', 'password');
      cy.get('button').click();
      cy.get(selector).should('have.attr', 'type', 'text');
      cy.get('button').click();
      cy.get(selector).should('have.attr', 'type', 'password');
    });
  });
});
