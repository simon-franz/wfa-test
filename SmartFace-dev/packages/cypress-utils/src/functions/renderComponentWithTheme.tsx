import { MotionGlobalConfig } from 'motion/react';
import { type ComponentProps, createElement, type ElementType, type ReactElement } from 'react';

import { CypressComponentWrapper } from '../components/CypressComponentWrapper';

export type Config = {
  firstSibling?: ReactElement;
  lastSibling?: ReactElement;
  Wrapper?: ElementType;
  checkForExistence?: boolean;
  centered?: boolean;
};

MotionGlobalConfig.skipAnimations = true;

const CYPRESS_STYLES = `
  @import '@hrworks/design-system/styles/critical.css';

  * {
  -o-transition: none !important;
  -moz-transition: none !important;
  -ms-transition: none !important;
  -webkit-transition: none !important;
  transition: none !important;
  -o-animation: none !important;
  -moz-animation: none !important;
  -webkit-animation: none !important;
  animation: none !important;
  caret-color: transparent !important;
  }

  html, body { margin: 0; padding: 0; height: 100%; overflow: hidden; }
  #cypress-root { height: 100%; }
`;

let stylesInjected = false;

const injectStyles = () => {
  if (stylesInjected) return;

  const style = document.createElement('style');
  style.textContent = CYPRESS_STYLES;
  document.head.insertBefore(style, document.head.firstChild); // Priority
  stylesInjected = true;
};

export const renderComponentWithTheme = <T extends ElementType>(
  Component: T,
  props?: Partial<ComponentProps<T>>,
  config?: Config,
) => {
  const componentProps = {
    ...(props as ComponentProps<T>),
    'data-cy': Cypress.spec.fileName,
  };
  const { firstSibling, lastSibling, checkForExistence, centered } = config || {};
  injectStyles();

  const content = (
    <>
      {firstSibling}
      {createElement(Component, componentProps)}
      {lastSibling}
    </>
  );

  const wrappedContent = config?.Wrapper ? createElement(config.Wrapper, {}, content) : content;

  cy.mount(
    <CypressComponentWrapper data-cy="wrapper" tabIndex={0} centered={centered}>
      {wrappedContent}
    </CypressComponentWrapper>,
  );

  cy.window().then((win) => {
    // If Inter Font is already loaded, return
    if (win.document.fonts.check('16px Inter')) {
      return;
    }

    return new Promise<void>((resolve) => {
      const startTime = Date.now();
      const maxWait = 1500;

      const checkFont = () => {
        if (win.document.fonts.check('16px Inter') || Date.now() - startTime > maxWait) {
          resolve();
        } else {
          setTimeout(checkFont, 25);
        }
      };

      checkFont();
    });
  });

  checkForExistence && cy.get(`[data-cy="${Cypress.spec.fileName}"]`).should('exist');

  cy.get('body').then(($body) => {
    if ($body.find('[data-cy="icon-not-ready"]').length > 0) {
      cy.get('[data-cy="icon-not-ready"]', { timeout: 5000 }).should('have.length', 0);
    }
  });
};
