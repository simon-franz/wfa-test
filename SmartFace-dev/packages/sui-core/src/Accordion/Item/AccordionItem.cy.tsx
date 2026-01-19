import { mockComponents, mockData } from '@hrworks/cypress-utils/fixtures';
import {
  generateFocusVisibleTest,
  generateTest,
  generateVisualTests,
  renderComponentWithTheme,
} from '@hrworks/cypress-utils/functions';

import { Accordion } from '../Accordion';
import { AccordionItem } from './AccordionItem';
import type { AccordionItemProps } from './AccordionItem.types';

const { testString, testStrings, colors, commonChildren, boolean } = mockData;
const { Icon } = mockComponents;

const defaultProps: AccordionItemProps = { title: testString, children: testString, id: '1' };

const selector = '[data-cy="AccordionItem"]';

const renderAccordionItem = (props?: Partial<AccordionItemProps>) => {
  renderComponentWithTheme(AccordionItem, { ...defaultProps, ...props }, { Wrapper: Accordion });
};

const openAccordionItem = () => {
  cy.get(selector).realClick();
};

context('AccordionItem', () => {
  describe('Visual-Test', () => {
    generateVisualTests({
      renderFn: renderAccordionItem,
      singleTests: { props: { title: testStrings, icon: [Icon, undefined] } },
      combinationTests: {
        combinations: [
          { props: { preventExpand: boolean }, config: { cb: openAccordionItem } },
          {
            props: { preventInitialExpand: boolean },
            config: {
              cb: openAccordionItem,
            },
          },
          {
            props: { color: [undefined, 'danger'] },
            config: {
              cb: () => {
                openAccordionItem();
                generateFocusVisibleTest();
              },
              customScreenshotNames: { color: [`undefined-focus-visible`, `danger-focus-visible`] },
            },
          },
          { props: { color: colors }, config: { cb: openAccordionItem } },
          {
            props: { children: [...testStrings, ...commonChildren] },
            config: {
              cb: openAccordionItem,
            },
          },
        ],
      },
    });
  });
  describe('Functional-Test', () => {
    generateTest('onBeforeInitialExpand', 'is called once when accordion item is opened for the first time', () => {
      renderAccordionItem({ onBeforeInitialExpand: cy.spy().as('spy') });
      cy.get(selector).realClick();
      cy.get(selector).realClick();
      cy.get(selector).realClick();
      cy.get('@spy').should('have.been.calledOnce');
    });

    generateTest('onBeforeExpand', 'is called once when accordion item is opened', () => {
      renderAccordionItem({ onBeforeExpand: cy.spy().as('spy') });
      cy.get(selector).realClick();
      cy.get('@spy').should('have.been.calledOnce');
    });

    generateTest('onAfterInitialExpand', 'is called once after accordion item is opened for the first time', () => {
      renderAccordionItem({ onAfterInitialExpand: cy.spy().as('spy') });
      cy.get(selector).realClick();
      cy.get(selector).realClick();
      cy.get(selector).realClick();
      cy.get('@spy').should('have.been.calledOnce');
    });

    generateTest('onAfterExpand', 'is called once after accordion item is opened', () => {
      renderAccordionItem({ onAfterExpand: cy.spy().as('spy') });
      cy.get(selector).realClick();
      cy.get('@spy').should('have.been.calledOnce');
    });

    generateTest('onCollapse', 'is called once when accordion item is collapsed', () => {
      renderAccordionItem({ onCollapse: cy.spy().as('spy') });
      cy.get(selector).realClick();
      cy.get(selector).realClick();
      cy.get('@spy').should('have.been.calledOnce');
    });

    generateTest('onBeforeInitialExpand', 'is called when preventInitialExpand is true', () => {
      renderAccordionItem({ onBeforeInitialExpand: cy.spy().as('spy'), preventInitialExpand: true });
      cy.get(selector).realClick();
      cy.get('@spy').should('have.been.calledOnce');
    });

    generateTest('onBeforeExpand', 'is called when preventExpand is true', () => {
      renderAccordionItem({ onBeforeExpand: cy.spy().as('spy'), preventExpand: true });
      cy.get(selector).realClick();
      cy.get('@spy').should('have.been.calledOnce');
    });

    generateTest('onAfterInitialExpand', 'is not called when preventInitialExpand is true', () => {
      renderAccordionItem({ onAfterInitialExpand: cy.spy().as('spy'), preventInitialExpand: true });
      cy.get(selector).realClick();
      cy.get('@spy').should('not.have.been.called');
    });

    generateTest('onAfterExpand', 'is not called when preventExpand is true', () => {
      renderAccordionItem({ onAfterExpand: cy.spy().as('spy'), preventExpand: true });
      cy.get(selector).realClick();
      cy.get('@spy').should('not.have.been.called');
    });

    generateTest('onCollapse', 'is not called when preventExpand is true', () => {
      renderAccordionItem({ onCollapse: cy.spy().as('spy'), preventExpand: true });
      cy.get(selector).realClick();
      cy.get('@spy').should('not.have.been.called');
    });
  });
});
