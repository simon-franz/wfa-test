import { mockData } from '@hrworks/cypress-utils/fixtures';
import { generateTest, generateVisualTests, renderComponentWithTheme } from '@hrworks/cypress-utils/functions';

import { CollapsibleMenu } from './CollapsibleMenu';
import { generateChildren } from './CollapsibleMenu.testData';
import type { ControlledCollapsibleMenuProps } from './CollapsibleMenu.types';

const renderCollapsibleMenu = (props?: Partial<ControlledCollapsibleMenuProps>) => {
  cy.viewport(500, 700);
  renderComponentWithTheme(CollapsibleMenu, { children: generateChildren(), ...props });
};

const { boolean } = mockData;

const openMultipleEntries = () => {
  cy.get('[data-cy="entry"]').realClick();
  cy.get('[data-cy="entry3"]').realClick();
};

context('CollapsibleMenu', () => {
  describe('Visual-Test', () => {
    generateVisualTests({
      renderFn: renderCollapsibleMenu,
      singleTests: {
        props: {
          children: [generateChildren(true), generateChildren(true, true), generateChildren(false)],
          activeEntryId: ['menu', 'menu-4'],
          expandedEntryIds: undefined,
        },
        config: {
          defaultProps: {
            children: generateChildren(true),
            expandedEntryIds: ['menu', 'menu-2', 'menu-3', 'menu-4'],
          },
          customScreenshotNames: {
            children: ['With Decals', 'Decals only on Layer 1', 'Without Decals'],
          },
        },
      },
      combinationTests: {
        combinations: [
          {
            props: { multiple: boolean },
            config: {
              cb: openMultipleEntries,
            },
          },
          {
            props: { showDepthIndicator: boolean },
            config: {
              defaultProps: {
                expandedEntryIds: ['menu', 'menu-2', 'menu-3', 'menu-4'],
              },
            },
          },
        ],
      },
    });
  });

  describe('Functional-Test', () => {
    generateTest('updateActiveEntryId', 'is called', () => {
      renderCollapsibleMenu({
        children: generateChildren(false, false, true),
        updateActiveEntryId: cy.spy().as('updateActiveEntry'),
      });
      cy.get('[data-cy="entry"]').click().get('@updateActiveEntry').should('have.been.called');
    });

    generateTest('updateExpandedEntryIds', 'is called', () => {
      renderCollapsibleMenu({
        updateExpandedEntryIds: cy.spy().as('updateExpandedEntryIdsSpy'),
      });
      cy.get('[data-cy="entry"]').click().get('@updateExpandedEntryIdsSpy').should('have.been.called');
    });

    generateTest('Entry: onClick', 'is called', () => {
      renderCollapsibleMenu({ children: generateChildren(false, false, true) });
      cy.get('[data-cy="entry"]').click().get('@onClickSpy').should('have.been.called');
    });

    generateTest('href & target', 'is set', () => {
      renderCollapsibleMenu();
      cy.get('[data-cy="entry2"] > a').should('have.attr', 'href', '/').should('have.attr', 'target', '_blank');
    });

    generateTest('Collapsed Entry', 'has tabindex -1', () => {
      renderCollapsibleMenu();
      cy.get('[data-cy="hidden"] > button').should('have.attr', 'tabindex', '-1');
    });
  });

  // TODO: Think about how we wanna approach this

  // generateTest('data-guide-id', 'is set', () => {
  //   renderCollapsibleMenu({ 'data-guide-id': 'data-guide-collapsibleMenu' });
  //   cy.get(`${CollapsibleMenuStyles.Container}`).should('have.attr', 'data-guide-id', 'data-guide-collapsibleMenu');
  //   cy.get(`[data-cy="entry"]`).should('have.attr', 'data-guide-id', 'data-guide-entry');
  //   cy.get(`[data-cy="section"]`).should('have.attr', 'data-guide-id', 'data-guide-section');
  // });
});
