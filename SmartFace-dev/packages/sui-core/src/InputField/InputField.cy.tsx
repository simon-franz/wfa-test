import { mockData } from '@hrworks/cypress-utils/fixtures';
import { generateVisualTests, renderComponentWithTheme } from '@hrworks/cypress-utils/functions';

import { InputField } from './InputField';
import type { InputFieldProps } from './InputField.types';

const { testString, testStrings, validationStates, sizes, boolean, overflowString } = mockData;

const defaultProps: Partial<InputFieldProps> = {
  label: testString,
  placeholder: testString,
  helpText: testString,
  mandatory: true,
  validationMessage: testString,
  value: testString,
};

const renderInputField = (props?: Partial<InputFieldProps>) => {
  renderComponentWithTheme(
    InputField,
    {
      input: ({ id, inputStyles, buttonStyles }) => (
        <>
          <input id={id} css={inputStyles} placeholder={overflowString} />
          <button css={buttonStyles}>Test</button>
        </>
      ),
      ...defaultProps,
      ...props,
    },
    { checkForExistence: true },
  );
};

context('InputField', () => {
  describe('Visual-Test', () => {
    generateVisualTests({
      renderFn: renderInputField,
      singleTests: {
        props: {
          label: testStrings,
          helpText: testStrings,
          validationState: validationStates,
          size: sizes,
          mandatory: boolean,
          disabled: boolean,
          hasInputValue: boolean,
          hasInputFocus: boolean,
          hasButton: boolean,
        },
      },
      combinationTests: {
        combinations: [
          {
            props: {
              floatingValidations: [
                [{ hasError: () => true, text: overflowString }],
                [{ hasError: () => false, text: overflowString }],
              ],
              hasInputFocus: boolean,
            },
          },
        ],
      },
    });
  });
});
