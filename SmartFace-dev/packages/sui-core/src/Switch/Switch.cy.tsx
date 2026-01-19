import { mockComponents, mockData } from '@hrworks/cypress-utils/fixtures';
import { generateTest, generateVisualTests, renderComponentWithTheme } from '@hrworks/cypress-utils/functions';

import { Switch } from './Switch';
import { S as SwitchStyles } from './Switch.styles';
import type { SwitchProps } from './Switch.types';

const { justifyContents, testStrings, testString, boolean, sizes, validationStates } = mockData;
const { Icon, Image } = mockComponents;

const defaultProps: Partial<SwitchProps> = {
  label: testString,
  helpText: testString,
  mandatory: true,
};

const renderSwitch = (props: Partial<SwitchProps>) => {
  renderComponentWithTheme(Switch, { ...defaultProps, ...props }, undefined);
};

context('Switch', () => {
  describe('Visual-Test', () => {
    generateVisualTests({
      renderFn: renderSwitch,
      singleTests: {
        props: {
          label: testStrings,
          helpText: testStrings,
          mandatory: boolean,
          size: sizes,
        },
      },
      combinationTests: {
        combinations: [
          {
            props: {
              checked: boolean,
              disabled: boolean,
            },
          },
          {
            props: {
              size: sizes,
              labelChildren: [Icon, Image, undefined],
            },
          },
          {
            props: {
              justifyContent: justifyContents,
              labelChildren: [Icon, Image, undefined],
            },
          },
          {
            props: {
              validationMessage: testStrings,
              validationState: validationStates,
            },
          },
        ],
      },
    });
  });

  describe('Functional-Test', () => {
    generateTest('Switch', 'calls the onValueChange event', () => {
      const onValueChangeSpy = cy.spy().as('onValueChangeSpy');
      renderSwitch({ onChange: onValueChangeSpy });
      cy.get(`${SwitchStyles.SwitchInput}`).parent().click();
      cy.get('@onValueChangeSpy').should('have.been.called');
    });

    generateTest('Switch', 'does not allow interaction or trigger onChange when disabled', () => {
      const onValueChangeSpy = cy.spy().as('onValueChangeSpy');
      renderSwitch({ disabled: true, onChange: onValueChangeSpy });
      cy.get(`${SwitchStyles.SwitchInput}`).parent().click();
      cy.get('@onValueChangeSpy').should('not.have.been.called');
      cy.get(`${SwitchStyles.SwitchInput}`).should('be.disabled');
    });

    generateTest('Switch', 'should not toggle state and should remain disabled', () => {
      renderSwitch({ checked: true, disabled: true });
      cy.get(`${SwitchStyles.SwitchInput}`).parent().click();
      cy.get(`${SwitchStyles.SwitchInput}`).should('be.checked').and('be.disabled');
    });

    generateTest('Switch', 'handles rapid state changes without errors', () => {
      const onValueChangeSpy = cy.spy().as('onValueChangeSpy');
      renderSwitch({ onChange: onValueChangeSpy });
      cy.get(`${SwitchStyles.SwitchInput}`).parent().as('switchInput');
      cy.get('@switchInput').then(($input) => {
        for (let i = 0; i < 10; i++) {
          cy.wrap($input).click();
        }
      });
      cy.get('@onValueChangeSpy').should('have.callCount', 10);
    });

    generateTest('aria-label', 'is set', () => {
      renderSwitch({ 'aria-label': 'aria-label-test' });
      cy.get(`${SwitchStyles.FormGroup}`).should('have.attr', 'aria-label', 'aria-label-test');
    });
  });
});
