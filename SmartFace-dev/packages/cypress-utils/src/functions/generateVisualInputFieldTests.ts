import { mockData } from '../fixtures/mockData';
import type { IntegerFieldProps, PasswordFieldProps, TextFieldProps } from '../types/Field.types';
import { generateFocusVisibleTest } from './generateFocusVisibleTests';
import { generateVisualTests } from './generateVisualTests';

const { testStrings, boolean, overflowString, testString, validationStates, sizes } = mockData;

type TestValue<T> = T[] | readonly T[];

export const generateVisualInputFieldTests = (
  selector: string,
  renderFn: (props?: Partial<TextFieldProps | PasswordFieldProps | IntegerFieldProps>) => void,
  defaultProps: Partial<TextFieldProps | PasswordFieldProps | IntegerFieldProps>,
  testValue: TestValue<string | undefined> = testStrings,
) => {
  generateVisualTests({
    renderFn: renderFn,
    singleTests: {
      props: {
        label: testStrings,
        defaultValue: testStrings,
        value: testValue,
        placeholder: testStrings,
        helpText: testStrings,
        validationState: validationStates,
        size: sizes,
        disabled: boolean,
        readOnly: boolean,
        mandatory: boolean,
      },
      config: {
        defaultProps,
      },
    },
    combinationTests: {
      combinations: [
        {
          props: { value: overflowString },
          config: {
            customScreenshotNames: {
              value: [`check-value-overflow`],
            },
          },
        },
        {
          props: { label: overflowString },
          config: {
            customScreenshotNames: {
              label: [`check-label-overflow`],
            },
          },
        },
        {
          props: { placeholder: overflowString },
          config: {
            customScreenshotNames: {
              placeholder: [`check-placeholder-overflow`],
            },
          },
        },
        {
          props: { label: testString },
          config: {
            cb: () => {
              cy.get(selector).focus();
            },
            customScreenshotNames: {
              label: [`check-floating-label`],
            },
          },
        },
        {
          props: { validationState: [undefined, 'danger'] },
          config: {
            cb: generateFocusVisibleTest,
            customScreenshotNames: {
              validationState: [`undefined-focus-visible`, `danger-focus-visible`],
            },
            defaultProps: { label: testString },
          },
        },
      ],
    },
  });
};
