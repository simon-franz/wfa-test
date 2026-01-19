import 'cypress-real-events';

import { addMatchImageSnapshotCommand } from '@simonsmith/cypress-image-snapshot/command';
import { mount } from 'cypress/react';

// Extend Cypress Chainable interface with custom commands
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      matchImageSnapshotAndUpload(screenshotName: string, options?: any): Chainable<void>;
      shouldNotBeActionable(
        done: Mocha.Done,
        clickOptions?: Partial<Cypress.ClickOptions> & {
          position?: Cypress.PositionType;
        },
      ): Chainable<Element>;
      mount: typeof mount;
    }
  }
}

// --------------------------------------------------------------
// SCREENSHOT CONFIGURATION
// --------------------------------------------------------------
const failureThreshold = 12;

// https://docs.cypress.io/api/cypress-api/screenshot-api
Cypress.Screenshot.defaults({
  scale: false,
  capture: 'viewport',
});

addMatchImageSnapshotCommand({
  failureThreshold,
  failureThresholdType: 'pixel',
});

// --------------------------------------------------------------
// IMAGE SNAPSHOT CONFIGURATION & CUSTOM COMMAND
// --------------------------------------------------------------
// https://github.com/simonsmith/cypress-image-snapshot
Cypress.Commands.add('matchImageSnapshotAndUpload', (screenshotName: string, options = {}) => {
  options.delay && cy.wait(options.delay);

  cy.matchImageSnapshot(screenshotName, {
    failureThreshold,
    failureThresholdType: 'pixel',
    // I don't know why, but adding an extra folder generates the correct "Path"  ¯\_(ツ)_/¯
    customSnapshotsDir: './outputs/plugin/snapshots/ThisFolder-NotCreated-ButNeeded',
    customDiffDir: './outputs/plugin/diffs/ThisFolder-NotCreated-ButNeeded',
    customReceivedDir: './outputs/plugin/received/ThisFolder-NotCreated-ButNeeded',
    ...options,
  });
});

// Is Actionable Check
Cypress.Commands.add(
  'shouldNotBeActionable',
  { prevSubject: 'element' },
  (subject, done, { position, timeout = 100, ...clickOptions } = {}) => {
    cy.once('fail', (err) => {
      expect(err.message).contain('`cy.click()` failed because this element');
      expect(err.message).contain('is being covered by another element');
      done();
    });

    const chainable = position
      ? cy.wrap(subject).click(position, { timeout, ...clickOptions })
      : cy.wrap(subject).click({ timeout, ...clickOptions });

    chainable.then(() => done(new Error('Expected element NOT to be clickable, but click() succeeded')));
  },
);

Cypress.Commands.add('mount', mount);
