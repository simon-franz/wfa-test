import type { InputFieldProps, PasswordFieldProps, TextFieldProps } from '../types/Field.types';
import { generateTest } from './generateTest';

export const generateFunctionalInputFieldTests = (
  selector: string,
  renderFn: (props?: Partial<(InputFieldProps & TextFieldProps) | PasswordFieldProps>) => void,
) => {
  generateTest('onClick', 'is called once', () => {
    renderFn({ onClick: cy.spy().as('spy') });
    cy.get(selector).click();
    cy.get('@spy').should('have.been.calledOnce');
  });

  generateTest('onClick', 'is not called when disabled', () => {
    renderFn({ onClick: cy.spy().as('spy'), disabled: true });
    cy.get(selector).click({ force: true });
    cy.get('@spy').should('not.have.been.called');
  });

  generateTest('onFocus', 'is called once by click', () => {
    renderFn({ onFocus: cy.spy().as('spy') });
    cy.get(selector).click();
    cy.get('@spy').should('have.been.calledOnce');
  });

  generateTest('onFocus', 'is called once', () => {
    renderFn({ onFocus: cy.spy().as('spy') });
    cy.get(selector).focus();
    cy.get('@spy').should('have.been.calledOnce');
  });

  generateTest('onBlur', 'is called once after focus', () => {
    renderFn({ onBlur: cy.spy().as('spy') });
    cy.get(selector).focus().blur();
    cy.get('@spy').should('have.been.calledOnce');
  });

  generateTest('onKeyDown', 'is called when 1 key is pressed', () => {
    renderFn({ onKeyDown: cy.spy().as('spy') });
    cy.get(selector).type('{enter}', { release: false });
    cy.get('@spy').should('have.been.calledOnce');
  });

  generateTest('onKeyDown', 'is not called when disabled', () => {
    renderFn({ onKeyDown: cy.spy().as('spy'), disabled: true });
    cy.get(selector).realType('1');
    cy.get('@spy').should('not.have.been.called');
  });

  generateTest('onChange', 'is called once with "1" and value is set ', () => {
    renderFn({ onChange: cy.spy().as('spy') });
    cy.get(selector).type('1');
    cy.get('@spy').should('have.been.calledOnce');
    cy.get('@spy').invoke('getCall', 0).its('args.0.target.value').should('equal', '1');
    cy.get(selector).should('have.value', '1');
  });

  generateTest('onChange', 'is not called when disabled and expect no value to be set', () => {
    renderFn({ onChange: cy.spy().as('spy'), disabled: true });
    cy.get(selector).realType('1');
    cy.get('@spy').should('not.have.been.called');
    cy.get(selector).should('not.have.value', '1');
  });

  generateTest('onValueChange', 'is called once  with "1" and value is set', () => {
    renderFn({ onValueChange: cy.spy().as('spy') });
    cy.get(selector).type('1');
    cy.get('@spy').should('have.been.calledOnce');
    cy.get('@spy').should('have.been.calledWith', '1');
    cy.get(selector).should('have.value', '1');
  });

  generateTest('onValueChange', 'is not called when disabled and expect no value to be set', () => {
    renderFn({ onValueChange: cy.spy().as('spy'), disabled: true });
    cy.get(selector).realType('1');
    cy.get('@spy').should('not.have.been.called');
    cy.get(selector).should('not.have.value', '1');
  });

  generateTest('onValueChange and onChange', 'are called once  with "1" and value is set', () => {
    renderFn({ onValueChange: cy.spy().as('spy'), onChange: cy.spy().as('spy2') });
    cy.get(selector).type('1');
    cy.get('@spy').should('have.been.calledOnce');
    cy.get('@spy').should('have.been.calledWith', '1');
    cy.get('@spy2').should('have.been.calledOnce');
    cy.get('@spy2').invoke('getCall', 0).its('args.0.target.value').should('equal', '1');
    cy.get(selector).should('have.value', '1');
  });

  generateTest('onValueChange and onChange', 'are not called when disabled and expect no value to be set', () => {
    renderFn({
      onValueChange: cy.spy().as('spy'),
      onChange: cy.spy().as('spy2'),
      disabled: true,
    });
    cy.get(selector).realType('1');
    cy.get('@spy').should('not.have.been.called');
    cy.get('@spy2').should('not.have.been.called');
    cy.get(selector).should('not.have.value', '1');
  });

  generateTest('input', 'is disabled', () => {
    renderFn({ disabled: true });
    cy.get(selector).should('be.disabled');
  });

  generateTest('readOnly', 'prevents value change when read-only', () => {
    renderFn({ readOnly: true, value: '1' });
    cy.get(selector).should('have.attr', 'readOnly');
    cy.get(selector).type('New', { force: true });
    cy.get(selector).should('have.value', '1');
  });

  generateTest('clearing uncontrolled input', 'allows clearing the input field', () => {
    renderFn({ defaultValue: '1' });
    cy.get(selector).clear().blur();
    cy.get(selector).should('have.value', '');
  });

  generateTest('clearing controlled input', 'prevents clearing the input field', () => {
    renderFn({ value: '1' });
    cy.get(selector).clear().blur();
    cy.get(selector).should('have.value', '1');
  });

  generateTest('value', 'persists after blur', () => {
    renderFn({});
    cy.get(selector).focus().type('1').blur();
    cy.get(selector).should('have.value', '1');
  });
};
