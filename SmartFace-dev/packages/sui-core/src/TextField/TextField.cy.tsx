import { mockData } from '@hrworks/cypress-utils/fixtures';
import {
  generateFunctionalInputFieldTests,
  generateTest,
  generateVisualInputFieldTests,
  renderComponentWithTheme,
} from '@hrworks/cypress-utils/functions';

import { TextField } from './TextField';
import type { TextFieldProps } from './TextField.types';

const { testString } = mockData;

const renderButton: TextFieldProps['renderButton'] = (styles) => (
  <button data-cy="renderButton" onClick={cy.spy().as('onClickSpy')} css={styles}>
    Test
  </button>
);

const defaultProps: Partial<TextFieldProps> = {
  label: testString,
  placeholder: testString,
  helpText: testString,
  mandatory: true,
  validationMessage: testString,
  renderButton,
};

const renderTextField = (props?: Partial<TextFieldProps>) => {
  renderComponentWithTheme(TextField, props, { checkForExistence: true });
};

const selector = '[data-cy="TextField"]';

context('TextField', () => {
  describe('Visual-Test', () => {
    generateVisualInputFieldTests(selector, renderTextField, defaultProps);
  });

  describe('Functional-Test', () => {
    generateFunctionalInputFieldTests(selector, renderTextField);

    generateTest('renderButton', 'is clickable', () => {
      renderTextField({ renderButton });
      cy.get('[data-cy="renderButton"]').click().get('@onClickSpy').should('have.been.calledOnce');
    });
  });
});
