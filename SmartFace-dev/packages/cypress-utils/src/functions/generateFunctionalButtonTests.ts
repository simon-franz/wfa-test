import { mockData } from '../fixtures/mockData';
import type { ButtonProps, IconButtonProps } from '../types/Button.types';
import { generateTest } from './generateTest';

const { testURL } = mockData;

export const generateFunctionalButtonTests = (
  selector: string,
  renderFn: (props?: Partial<ButtonProps & IconButtonProps>) => void,
) => {
  generateTest('href', 'does not add href prop without link', () => {
    renderFn();
    cy.get(selector).should('not.have.attr', 'href');
  });

  generateTest('tagName', 'renders an <button>', () => {
    renderFn();
    cy.get(selector).should('have.prop', 'tagName').and('equal', 'BUTTON');
  });

  generateTest('htmlTag', 'renders an <button> tag with htmlTag', () => {
    renderFn({ htmlTag: 'button' });
    cy.get(selector).should('have.prop', 'tagName').and('equal', 'BUTTON');
  });

  generateTest('href', 'renders an <a> tag with href + htmlTag: button', () => {
    renderFn({ href: testURL, htmlTag: 'button' });
    cy.get(selector).should('have.prop', 'tagName').and('equal', 'A');
  });

  generateTest('htmlTag', 'renders an <a> tag with htmlTag', () => {
    renderFn({ htmlTag: 'a' });
    cy.get(selector).should('have.prop', 'tagName').and('equal', 'A');
  });

  generateTest('href & htmlTag', 'renders an <a> tag with href + htmlTag: a', () => {
    renderFn({ href: testURL, htmlTag: 'a' });
    cy.get(selector).should('have.prop', 'tagName').and('equal', 'A');
  });

  generateTest('mouse: onClick', 'calls the onclick event', () => {
    const onClickSpy = cy.spy().as('onClickSpy');
    renderFn({ onClick: onClickSpy });
    cy.get(selector).click().get('@onClickSpy').should('have.been.called');
  });

  generateTest('disabled: mouse', 'should not call onclick when disabled', () => {
    const onClickSpy = cy.spy().as('onClickSpy');
    renderFn({ onClick: onClickSpy, disabled: true });
    cy.get(selector).click({ force: true }).get('@onClickSpy').should('not.have.been.called');
  });

  generateTest('keyboard: Enter', 'calls onClick on Enter key', () => {
    const onClickSpy = cy.spy().as('onClickSpy');
    renderFn({ onClick: onClickSpy });
    cy.get(selector).focus().realType('{enter}');
    cy.get('@onClickSpy').should('have.been.calledOnce');
  });

  generateTest('disabled: keyboard', 'should not respond to keyboard events when disabled', () => {
    const onClickSpy = cy.spy().as('onClickSpy');
    renderFn({ onClick: onClickSpy, disabled: true });
    cy.get('body').realPress('Tab');
    cy.get('body').realPress('Enter');
    cy.get('body').realPress('Space');
    cy.get('@onClickSpy').should('not.have.been.called');
  });
};
