import { mockComponents, mockData } from '@hrworks/cypress-utils/fixtures';
import {
  generateFunctionalButtonTests,
  generateVisualTests,
  renderComponentWithTheme,
} from '@hrworks/cypress-utils/functions';

import Button from '../Button';
import type { ButtonProps } from './Button.types';

const variants: ButtonProps['variant'][] = ['filled', 'subtle', 'ghost', 'text', 'link', 'unstyled', undefined];

const { Icon } = mockComponents;
const { testStrings, colors, sizes, corners, boolean, textAligns } = mockData;

const defaultProps: Partial<ButtonProps> = {
  children: 'Click me!',
};

const renderButton = (props?: Partial<ButtonProps>) => {
  renderComponentWithTheme(Button, { ...defaultProps, ...props }, undefined);
};

const selector = '[data-cy="Button"]';

context('Button', () => {
  describe('Visual-Test', () => {
    generateVisualTests({
      renderFn: renderButton,
      singleTests: {
        props: {
          children: testStrings,
          color: colors,
          size: sizes,
          corner: corners,
          variant: variants,
          fullWidth: boolean,
          disabled: boolean,
          leftIcon: [Icon],
          rightIcon: [Icon],
        },
        config: {
          defaultProps,
        },
      },
      combinationTests: {
        combinations: [
          {
            props: {
              variant: variants,
              disabled: boolean,
            },
            config: {
              defaultProps,
            },
          },
          {
            props: {
              textAlign: textAligns,
              children: testStrings,
            },
            config: {
              defaultProps: {
                fullWidth: true,
              },
            },
          },
          {
            props: {
              color: colors,
              variant: variants,
            },
          },
        ],
      },
    });
  });

  describe('Functional-Test', () => {
    generateFunctionalButtonTests(selector, renderButton);
  });
});
