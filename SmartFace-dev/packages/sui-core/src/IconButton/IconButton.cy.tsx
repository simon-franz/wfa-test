import { mockComponents, mockData } from '@hrworks/cypress-utils/fixtures';
import {
  generateFunctionalButtonTests,
  generateVisualTests,
  renderComponentWithTheme,
} from '@hrworks/cypress-utils/functions';

import { IconButton } from './IconButton';
import type { IconButtonProps } from './IconButton.types';

const variants: IconButtonProps['variant'][] = ['filled', 'subtle', 'ghost', 'link', 'unstyled', undefined];

const { Icon } = mockComponents;
const { sizes, colors, corners, boolean } = mockData;

const defaultProps: Partial<IconButtonProps> = {
  children: Icon,
};

const renderIconButton = (props?: Partial<IconButtonProps>) => {
  renderComponentWithTheme(IconButton, { ...defaultProps, ...props }, undefined);
};

const selector = '[data-cy="IconButton"]';

context('IconButton', () => {
  describe('Visual-Test', () => {
    generateVisualTests({
      renderFn: renderIconButton,
      singleTests: {
        props: {
          color: colors,
          size: sizes,
          variant: variants,
          corner: corners,
          disabled: boolean,
        },
      },
      combinationTests: {
        combinations: [
          {
            props: {
              variant: variants,
              disabled: boolean,
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
    generateFunctionalButtonTests(selector, renderIconButton);
  });
});
