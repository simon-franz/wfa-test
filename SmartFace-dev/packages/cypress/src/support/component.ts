import '@hrworks/design-system/styles/critical.css';
import '@reportportal/agent-js-cypress/lib/commands/reportPortalCommands';
import 'cypress-mochawesome-reporter/register';
import '@hrworks/cypress-utils/commands';

// --------------------------------------------------------------
// ERROR HANDLING
// --------------------------------------------------------------
Cypress.on('uncaught:exception', (err) => !err.message.includes('ResizeObserver'));
