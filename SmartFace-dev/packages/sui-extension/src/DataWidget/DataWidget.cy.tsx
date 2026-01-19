import { mockComponents, mockData } from '@hrworks/cypress-utils/fixtures';
import { generateTest, generateVisualTests, renderComponentWithTheme } from '@hrworks/cypress-utils/functions';

import { DataWidget, DataWidgetCardStyles, type DataWidgetProps } from './';

const { testStrings, testString } = mockData;
const { Badge, Icon, TextField } = mockComponents;

const defaultProps: Partial<DataWidgetProps> = {
  label: testString,
  value: testString,
  icon: Icon,
};

const iconValues = [Icon, undefined];

const renderDataWidget = (props: Partial<DataWidgetProps>) => {
  renderComponentWithTheme(DataWidget, { ...defaultProps, ...props }, undefined);
};

const toggleSelector = `${DataWidgetCardStyles.IconContainer} svg path`;

context('DataWidget', () => {
  describe('Visual-Test', () => {
    generateVisualTests({
      renderFn: renderDataWidget,
      combinationTests: {
        combinations: [
          {
            props: {
              label: testStrings,
              value: testStrings,
            },
          },
          {
            props: {
              value: testStrings,
              icon: iconValues,
            },
          },
          {
            props: {
              label: testStrings,
              icon: iconValues,
            },
          },
          {
            props: {
              label: testStrings,
              children: [testStrings, Badge, TextField, Icon],
            },
            config: {
              cb: () => {
                cy.get(toggleSelector).click();
              },
            },
          },
        ],
      },
    });
  });

  describe('Responsive- & Accessibility-Test', () => {
    generateTest('aria-label', 'is set correctly', () => {
      const ariaLabel = 'Test DataWidget ARIA Label';
      renderDataWidget({ 'aria-label': ariaLabel });
      cy.get('[data-cy="DataWidget"]').should('have.attr', 'aria-label', ariaLabel);
    });
  });
});
