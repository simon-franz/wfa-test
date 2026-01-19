import { mockData } from '@hrworks/cypress-utils/fixtures';
import {
  generateFunctionalTests,
  generateHrefTests,
  generateTargetTests,
  generateTest,
  generateVisualTests,
  renderComponentWithTheme,
} from '@hrworks/cypress-utils/functions';
import { overflowBehaviours } from '@hrworks/types/shared/UiTypes';

import { Text } from './Text';
import type { TextProps } from './Text.types';

const { boolean, testString, testStrings, overflowString, colors, sizes, textAligns, testURL } = mockData;

const variants: TextProps['variant'][] = ['default', 'subtle'];
const fontWeights: TextProps['fontWeight'][] = ['thin', 'normal', 'bold'];

const defaultProps: Partial<TextProps> = {
  children: testString,
};

const renderText = (props: Partial<TextProps>) => {
  renderComponentWithTheme(Text, { ...defaultProps, ...props }, { checkForExistence: true });
};

context('Text', () => {
  describe('Visual-Test', () => {
    generateVisualTests({
      renderFn: renderText,
      singleTests: {
        props: {
          hover: boolean,
          variant: variants,
          children: testStrings,
          color: colors,
          underlined: boolean,
          italic: boolean,
          fontSize: sizes,
          fontWeight: fontWeights,
        },
      },
      combinationTests: {
        combinations: [
          {
            props: { overflowBehaviour: overflowBehaviours },
            config: { defaultProps: { children: overflowString } },
          },
          {
            props: {
              color: colors,
              variant: variants,
            },
            config: {
              defaultProps: {
                underlined: true,
                children: testString,
              },
            },
          },
          {
            props: {
              fullWidth: true,
              textAlign: textAligns,
            },
          },
          {
            props: {
              children: [
                '<ul><li>Diego Luna</li><li>Adria Arjona</li><li>Denise Gough</li><li>Welche Serie?</li></ul>',
              ],
              html: boolean,
            },
            config: { customScreenshotNames: { children: ['html-elements'] } },
          },
          { props: { fullWidth: boolean }, config: { defaultProps: { style: { backgroundColor: 'red' } } } },
        ],
      },
    });
  });

  describe('Functional-Test', () => {
    generateTest('Text', 'should render div element when htmlTag is set to div', () => {
      renderText({ htmlTag: 'div' });
      cy.get('[data-cy="Text"]').should('have.prop', 'tagName').and('equal', 'DIV');
    });

    generateTest('Text', 'should render span element when htmlTag is set to span', () => {
      renderText({ htmlTag: 'span' });
      cy.get('[data-cy="Text"]').should('have.prop', 'tagName').and('equal', 'SPAN');
    });

    generateHrefTests('Text', () => {
      renderText({ href: testURL });
    });

    generateFunctionalTests({
      renderFn: renderText,
      singleTests: generateTargetTests('[data-cy="Text"]'),
    });
  });
});
