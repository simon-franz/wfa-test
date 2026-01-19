import { mockComponents, mockData } from '@hrworks/cypress-utils/fixtures';
import { generateVisualTests, renderComponentWithTheme } from '@hrworks/cypress-utils/functions';

import { FormGroup } from './FormGroup';
import type { FormGroupProps } from './FormGroup.types';

const { commonChildren, justifyContents, testString, testStrings, boolean, sizes, validationStates } = mockData;
const { Icon, Input } = mockComponents;

const defaultProps: FormGroupProps = {
  label: testString,
  children: Input,
};

const renderFormGroup = (props?: Partial<FormGroupProps>) => {
  renderComponentWithTheme(FormGroup, { ...defaultProps, ...props });
};

context('FormGroup', () => {
  describe('Visual-Test', () => {
    generateVisualTests({
      renderFn: renderFormGroup,
      singleTests: {
        props: {
          label: testStrings,
          helpText: testStrings,
          mandatory: boolean,
          size: sizes,
          justifyContent: justifyContents,
          element: ['label', 'div', undefined],
          labelChildren: commonChildren,
          children: [Icon, [Icon, Input], undefined],
        },
      },
      combinationTests: {
        combinations: [
          {
            props: {
              validationState: validationStates,
              validationMessage: testStrings,
            },
          },
          {
            props: {
              disabled: boolean,
            },
            config: {
              defaultProps: {
                helpText: testString,
                mandatory: true,
                labelChildren: Icon,
              },
            },
          },
          {
            props: {
              disabled: true,
            },
            config: {
              defaultProps: {
                validationState: validationStates[0],
                validationMessage: testString,
                mandatory: true,
                labelChildren: Icon,
              },
            },
          },
        ],
      },
    });
  });
});
