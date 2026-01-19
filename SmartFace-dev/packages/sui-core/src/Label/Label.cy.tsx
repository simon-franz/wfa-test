import { mockComponents, mockData } from '@hrworks/cypress-utils/fixtures';
import { generateTest, generateVisualTests, renderComponentWithTheme } from '@hrworks/cypress-utils/functions';

import { Label } from './Label';
import { S as LabelStyles } from './Label.styles';
import type { LabelProps } from './Label.types';

const { boolean, testStrings, testString, validationStates } = mockData;
const { Icon, Input, RadioGroup } = mockComponents;

const defaultProps: Partial<LabelProps> = {
  label: testString,
  mandatory: true,
};

const renderLabel = (props: Partial<LabelProps>) => {
  renderComponentWithTheme(
    Label,
    { ...defaultProps, ...props },
    { checkForExistence: props.label !== undefined && props.children !== undefined },
  );
};

context('Label', () => {
  describe('Visual-Test', () => {
    generateVisualTests({
      renderFn: renderLabel,
      singleTests: {
        props: {
          label: testStrings,
          mandatory: boolean,
          validationState: validationStates,
          children: [Icon, RadioGroup, Input, undefined],
        },
      },
      combinationTests: {
        combinations: [
          {
            props: {
              label: testStrings,
              children: [Icon, RadioGroup, Input, undefined],
            },
          },
        ],
      },
    });
  });

  describe('Functional-Test', () => {
    generateTest('Label', 'should handle click event on children correctly', () => {
      renderLabel({
        children: (
          <button data-cy="sf-button" onClick={cy.spy().as('onClickSpy')}>
            Click Me
          </button>
        ),
      });
      cy.get('[data-cy="sf-button"]').click();
      cy.get('@onClickSpy').should('have.been.called');
    });
  });

  describe('Responsive- & Accessibility-Test', () => {
    generateTest('aria-label', 'is set', () => {
      renderLabel({ 'aria-label': 'aria-label-test' });
      cy.get(`${LabelStyles.LabelContainer}`).should('have.attr', 'aria-label', 'aria-label-test');
    });
  });
});
