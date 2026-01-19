import { mockComponents, mockData } from '@hrworks/cypress-utils/fixtures';
import { generateTest, generateVisualTests, renderComponentWithTheme } from '@hrworks/cypress-utils/functions';

import Tooltip from '../Tooltip';
import type { TooltipProps } from './Tooltip.types';

const { testStrings, boolean, floatDirections, mainAxisOffset } = mockData;
const { Button, Badge } = mockComponents;

const defaultProps: Partial<TooltipProps> = {
  children: Button,
  text: testStrings[1],
};

const htmlContent = `
  <div>
    <h4>HTML Content</h4>
    <p>This tooltip content is rendered from a <strong>string</strong>.</p>
    <ul>
      <li>List item A</li>
      <li>List item B</li>
    </ul>
  </div>
`;

const renderTooltip = (props: Partial<TooltipProps>) => {
  renderComponentWithTheme(
    Tooltip,
    { ...defaultProps, ...props },
    {
      centered: true,
    },
  );
  cy.viewport(800, 800);
};

const buttonSelector = '[data-cy="cy-button"]';
const tooltipSelector = '[data-cy="Tooltip"]';
const cyWrapperSelector = '[data-cy="wrapper"]';

context('Tooltip', () => {
  describe('Visual-Test', () => {
    generateVisualTests({
      renderFn: renderTooltip,
      singleTests: {
        props: {
          title: testStrings,
          text: testStrings,
          placement: floatDirections,
          mainAxisOffset: mainAxisOffset,
          customTooltip: Badge,
        },
        config: {
          cb: () => {
            cy.get(buttonSelector).trigger('mouseover');
            cy.wait(1000); // Exception until we find a robust solution for hover to capture elements via snapshot.
          },
        },
      },
      combinationTests: {
        combinations: [
          {
            props: {
              html: boolean,
              text: htmlContent,
            },
            config: {
              cb: () => {
                cy.get(buttonSelector).trigger('mouseover');
                cy.wait(1000); // Exception until we find a robust solution for hover to capture elements via snapshot.
              },
            },
          },
          {
            props: {
              fullWidth: boolean,
              placement: 'bottom',
            },
            config: {
              cb: () => {
                // Reset centering styles for fullWidth test
                cy.get(cyWrapperSelector).invoke(
                  'attr',
                  'style',
                  'padding: 20px; overflow: hidden; height: 100%; display: block;',
                );
                cy.get(buttonSelector).trigger('mouseover');
                cy.wait(1000);
              },
            },
          },
          {
            props: {
              unstyledTrigger: boolean,
              placement: 'bottom',
            },
            config: {
              cb: () => {
                // Reset centering styles for unstyledTrigger test
                cy.get(cyWrapperSelector).invoke(
                  'attr',
                  'style',
                  'padding: 20px; overflow: hidden; height: 100%; display: block;',
                );
                cy.get(buttonSelector).trigger('mouseover');
                cy.wait(1000);
              },
            },
          },
        ],
      },
    });
  });

  describe('Functional-Test', () => {
    generateTest('Tooltip', 'should render div element when htmlTag is set to div', () => {
      renderTooltip({ htmlTag: 'div' });
      cy.get(tooltipSelector).should('have.prop', 'tagName').and('equal', 'DIV');
    });

    generateTest('Tooltip', 'should render span element when htmlTag is set to span', () => {
      renderTooltip({ htmlTag: 'span' });
      cy.get(tooltipSelector).should('have.prop', 'tagName').and('equal', 'SPAN');
    });

    generateTest('Tooltip', 'should render section element when htmlTag is set to section', () => {
      renderTooltip({ htmlTag: 'section' });
      cy.get(tooltipSelector).should('have.prop', 'tagName').and('equal', 'SECTION');
    });
  });
});
