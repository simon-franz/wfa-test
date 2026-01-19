import { mockComponents, mockData } from '@hrworks/cypress-utils/fixtures';
import { generateTest, generateVisualTests, renderComponentWithTheme } from '@hrworks/cypress-utils/functions';

import { Checkbox } from './Checkbox';
import type { CheckboxProps } from './Checkbox.types';

const { boolean, justifyContents, testStrings, testString, sizes, validationStates } = mockData;
const { Image, Icon } = mockComponents;

const defaultProps: Partial<CheckboxProps> = {
  label: testString,
};

const inputSelector = 'input';

const renderCheckbox = (props: Partial<CheckboxProps>) => {
  renderComponentWithTheme(Checkbox, { name: 'Checkbox', ...defaultProps, ...props });
};

context('Checkbox', () => {
  describe('Visual-Test', () => {
    generateVisualTests({
      renderFn: renderCheckbox,
      singleTests: {
        props: {
          label: testStrings,
          checked: boolean,
          defaultChecked: boolean,
          disabled: boolean,
          helpText: testStrings,
          mandatory: boolean,
          size: sizes,
          justifyContent: justifyContents,
          labelChildren: [Icon, Image, undefined],
        },
      },
      combinationTests: {
        combinations: [
          {
            props: {
              validationState: validationStates,
              validationMessage: testString,
            },
          },
          {
            props: {
              checked: boolean,
              disabled: boolean,
            },
          },
          {
            props: { validationState: [undefined, 'danger'] },
            config: {
              cb: () => {
                cy.get(inputSelector).focus();
              },
              customScreenshotNames: {
                validationState: ['undefined-focus-visible', 'danger-focus-visible'],
              },
              defaultProps: { label: testString },
            },
          },
        ],
      },
    });
  });

  describe('Functional-Test', () => {
    describe('checked', () => {
      it('is true', () => {
        renderCheckbox({ checked: true });
        cy.get(inputSelector).should('have.attr', 'checked');
      });

      it('is false', () => {
        renderCheckbox({ checked: false });
        cy.get(inputSelector).should('not.have.attr', 'checked');
      });
    });

    generateTest('onFocus', 'is called once by click', () => {
      renderCheckbox({ onFocus: cy.spy().as('onFocusSpy') });
      cy.get(inputSelector).realClick();
      cy.get('@onFocusSpy').should('have.been.calledOnce');
    });

    generateTest('onFocus', 'is called once', () => {
      renderCheckbox({ onFocus: cy.spy().as('onFocusSpy') });
      cy.get(inputSelector).focus();
      cy.get('@onFocusSpy').should('have.been.calledOnce');
    });

    generateTest('onValueChange', 'is not called when disabled', () => {
      renderCheckbox({ onValueChange: cy.spy().as('onValueChange'), disabled: true });
      cy.get(inputSelector).realClick();
      cy.get('@onValueChange').should('not.have.been.called');
    });

    generateTest('onValueChange', 'is called once after click', () => {
      renderCheckbox({ onValueChange: cy.spy().as('onValueChange') });
      cy.get(inputSelector).realClick();
      cy.get('@onValueChange').should('have.been.calledOnce');
    });

    generateTest('onChange', 'is called once after click', () => {
      renderCheckbox({ onChange: cy.spy().as('spy') });
      cy.get(inputSelector).realClick();
      cy.get('@spy').should('have.been.calledOnce');
    });

    generateTest('onChange', 'is not called when disabled', () => {
      renderCheckbox({ onChange: cy.spy().as('spy'), disabled: true });
      cy.get(inputSelector).realClick();
      cy.get('@spy').should('not.have.been.called');
    });

    generateTest('onChange and onValueChange', 'are both called once', () => {
      renderCheckbox({ onChange: cy.spy().as('onChange'), onValueChange: cy.spy().as('onValueChange') });
      cy.get(inputSelector).realClick();
      cy.get('@onChange').should('have.been.calledOnce');
      cy.get('@onValueChange').should('have.been.calledOnce');
    });

    generateTest('onChange and onValueChange', 'are not called when disabled', () => {
      renderCheckbox({
        onChange: cy.spy().as('onChange'),
        onValueChange: cy.spy().as('onValueChange'),
        disabled: true,
      });
      cy.get(inputSelector).realClick();
      cy.get('@onChange').should('not.have.been.called');
      cy.get('@onValueChange').should('not.have.been.called');
    });

    generateTest('aria-label', 'is set', () => {
      renderCheckbox({ 'aria-label': 'aria-label-test' });
      cy.get(inputSelector).should('have.attr', 'aria-label', 'aria-label-test');
    });

    generateTest('name', 'is set correctly on the input element', () => {
      const testName = 'checkbox-test-name';
      renderCheckbox({ name: testName });
      cy.get(inputSelector).should('have.attr', 'name', testName);
    });

    describe('controlled vs uncontrolled', () => {
      it('controlled: checked state does not change on click', () => {
        renderCheckbox({ checked: true });
        cy.get(inputSelector).realClick();
        cy.get(inputSelector).should('have.attr', 'checked');
      });

      it('controlled with disabled: maintains state and prevents interaction', () => {
        renderCheckbox({ checked: true, disabled: true });
        cy.get(inputSelector).realClick();
        cy.get(inputSelector).should('have.attr', 'checked');
      });

      it('uncontrolled: changes checked state on click', () => {
        renderCheckbox({ defaultChecked: false });
        cy.get(inputSelector).realClick();
        cy.get(inputSelector).should('be.checked');
      });

      it('uncontrolled: toggles from checked to unchecked on click', () => {
        renderCheckbox({ defaultChecked: true });
        cy.get(inputSelector).realClick();
        cy.get(inputSelector).should('not.be.checked');
      });

      it('uncontrolled with disabled: prevents state change', () => {
        renderCheckbox({ defaultChecked: false, disabled: true });
        cy.get(inputSelector).realClick();
        cy.get(inputSelector).should('not.be.checked');
      });
    });

    describe('defaultChecked', () => {
      it('is true', () => {
        renderCheckbox({ defaultChecked: true });
        cy.get(inputSelector).should('be.checked');
      });

      it('is false', () => {
        renderCheckbox({ defaultChecked: false });
        cy.get(inputSelector).should('not.be.checked');
      });
    });
  });
});
