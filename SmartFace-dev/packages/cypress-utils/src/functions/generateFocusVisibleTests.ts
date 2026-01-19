export const generateFocusVisibleTest = () => {
  cy.get('[data-cy="wrapper"]').focus();
  cy.realPress('Tab');
};
