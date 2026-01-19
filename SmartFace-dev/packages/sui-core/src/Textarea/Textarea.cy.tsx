import { mockData } from '@hrworks/cypress-utils/fixtures';
import {
  generateFocusVisibleTest,
  generateFunctionalInputFieldTests,
  generateTest,
  generateVisualInputFieldTests,
  generateVisualTests,
  renderComponentWithTheme,
} from '@hrworks/cypress-utils/functions';
import type { InputProps } from '@hrworks/types/shared/UiTypes';

import { Textarea } from './Textarea';
import type { TextareaProps } from './Textarea.types';

const { testString, boolean, overflowString } = mockData;

const defaultProps: Partial<InputProps> = {
  label: testString,
  placeholder: testString,
  helpText: testString,
  mandatory: true,
  validationMessage: testString,
};

const selector = '[data-cy="Textarea"]';

const renderTextarea = (props?: Partial<TextareaProps>) => {
  renderComponentWithTheme(Textarea, { ...defaultProps, ...props }, { checkForExistence: true });
};

context('Textarea', () => {
  describe('Visual-Test', () => {
    generateVisualInputFieldTests(selector, renderTextarea as () => void, defaultProps);
    generateVisualTests({
      renderFn: renderTextarea,
      singleTests: {
        props: {
          rows: [1, 10, 15],
          resize: ['both', 'horizontal', 'none', 'vertical'],
          growsWithContent: boolean,
        },
        config: { defaultProps: { value: overflowString } },
      },
      combinationTests: {
        combinations: [
          {
            props: {
              validationState: [undefined, 'danger'],
            },
            config: {
              cb: generateFocusVisibleTest,
              customScreenshotNames: {
                validationState: [`undefined-focus-visible`, `danger-focus-visible`],
              },
            },
          },
        ],
      },
    });
  });

  describe('Functional-Test', () => {
    generateFunctionalInputFieldTests(selector, renderTextarea as () => void);

    generateTest('onValueChangeFinished', 'is called once  with "1" and value is set', () => {
      renderTextarea({ onValueChangeFinished: cy.spy().as('spy') });
      cy.get(selector).type('1').realPress('Tab');
      cy.get('@spy').should('have.been.calledOnce');
      cy.get('@spy').should('have.been.calledWith', '1');
      cy.get(selector).should('have.value', '1');
    });
  });
});
