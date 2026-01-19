import { mockData } from '@hrworks/cypress-utils/fixtures';
import { generateTest, generateVisualTests, renderComponentWithTheme } from '@hrworks/cypress-utils/functions';

import Radio from './Radio';
import { S as RadioStyles } from './Radio/Radio.styles';
import { RadioGroup } from './RadioGroup';
import type { RadioGroupProps } from './RadioGroup.types';

const { boolean, sizes, testString, testStrings, overflowString, validationStates } = mockData;

const defaultProps: Partial<RadioGroupProps> = {
  label: 'default label',
  children: [
    <Radio key="id-1" value="id-1">
      1. Option
    </Radio>,
    <Radio key="id-2" value="id-2">
      2. Option
    </Radio>,
    <Radio key="id-3" value="id-3">
      3. Option
    </Radio>,
    <Radio key="id-4" value="id-4">
      4. Option
    </Radio>,
  ],
};

const renderRadioGroup = (props: Partial<RadioGroupProps>) => {
  renderComponentWithTheme(RadioGroup, { name: 'RadioGroup', ...props });
};

context('RadioGroup', () => {
  describe('Visual-Test', () => {
    generateVisualTests({
      renderFn: renderRadioGroup,
      singleTests: {
        props: {
          label: testStrings,
          helpText: testStrings,
          mandatory: boolean,
          size: sizes,
          optionsDirection: ['column', 'row'],
          children: [
            [
              <Radio key="id-1" value="id-1">
                default label
              </Radio>,
              <Radio key="id-2" value="id-2">
                {testString}
              </Radio>,
            ],
            [
              <Radio key="id-1" value="id-1">
                default label
              </Radio>,
              <Radio key="id-2" value="id-2">
                {overflowString}
              </Radio>,
            ],
          ],
          value: ['id-1', 'id-2', 'id-3', 'id-4'],
        },
        config: { defaultProps },
      },
      combinationTests: {
        combinations: [
          {
            props: {
              validationMessage: testStrings,
              validationState: validationStates,
            },
            config: {
              defaultProps: {
                ...defaultProps,
                helpText: 'helpText text',
              },
            },
          },
          {
            props: {
              disabled: boolean,
            },
            config: {
              defaultProps: {
                ...defaultProps,
                helpText: 'helpText text',
              },
            },
          },
          {
            props: {
              children: [defaultProps.children, undefined],
              noOptionsAvailableText: testStrings,
            },
            config: {
              defaultProps: {
                ...defaultProps,
                helpText: 'helpText text',
              },
            },
          },
        ],
      },
    });
  });

  describe('Functional-Test', () => {
    generateTest('disabled', 'is not interactable', () => {
      const onValueChangeSpy = cy.spy().as('onValueChangeSpy');
      renderRadioGroup({ ...defaultProps, onValueChange: onValueChangeSpy, disabled: true });
      cy.get(`${RadioStyles.Input}[value='id-2']`).parent().click();
      cy.get('@onValueChangeSpy').should('not.have.been.called');
    });

    generateTest('onValueChange', 'is called', () => {
      renderRadioGroup({ ...defaultProps, onValueChange: cy.spy().as('onValueChangeSpy') });
      cy.get(`${RadioStyles.Input}[value='id-2']`).parent().click();
      cy.get('@onValueChangeSpy').should('have.been.calledOnce');
    });

    generateTest('aria-label', 'is set', () => {
      renderRadioGroup({ ...defaultProps, 'aria-label': 'aria-label-test' });
      cy.get(`[role="radiogroup"]`).should('have.attr', 'aria-label', 'aria-label-test');
    });

    generateTest('name', 'is set', () => {
      renderRadioGroup(defaultProps);
      cy.get(`${RadioStyles.Input}`).should('have.attr', 'name', 'RadioGroup');
    });
  });
});
