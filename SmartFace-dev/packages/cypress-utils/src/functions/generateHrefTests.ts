import { generateTest } from './generateTest';

export const generateHrefTests = (selector: string, renderFn: () => void) => {
  generateTest('href', 'causes tag to be rendered as <a>', () => {
    renderFn();
    cy.get(`[data-cy="${selector}"]`).then((element) => {
      if (element.prop('tagName') === 'A') {
        cy.get(`[data-cy="${selector}"]`).should('have.prop', 'tagName').and('equal', 'A');
      } else {
        cy.get(`[data-cy="${selector}"] > a`).should('have.prop', 'tagName').and('equal', 'A');
      }
    });
  });

  generateTest('href', 'is set', () => {
    renderFn();
    cy.get(`[data-cy="${selector}"]`).then((element) => {
      if (element.prop('tagName') === 'A') {
        cy.get(`[data-cy="${selector}"]`).should('have.attr', 'href').and('not.be.empty');
      } else {
        cy.get(`[data-cy="${selector}"] > a`).should('have.attr', 'href').and('not.be.empty');
      }
    });
  });
};
