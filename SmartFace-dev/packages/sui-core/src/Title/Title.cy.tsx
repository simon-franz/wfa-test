import { mockComponents, mockData } from '@hrworks/cypress-utils/fixtures';
import { generateTest, generateVisualTests, renderComponentWithTheme } from '@hrworks/cypress-utils/functions';

import { Title } from './Title';
import type { TitleProps } from './Title.types';

const { Icon, Image } = mockComponents;
const { boolean, testString, testStrings, sizes, alignTitles, overflowString } = mockData;

const defaultProps: Partial<TitleProps> = {
  children: testString,
};

const renderTitle = (props: Partial<TitleProps>) => {
  renderComponentWithTheme(Title, { ...defaultProps, ...props }, undefined);
};

context('Title', () => {
  describe('Visual-Test', () => {
    generateVisualTests({
      renderFn: renderTitle,
      singleTests: {
        props: {
          icon: Icon,
          children: testStrings,
          size: sizes,
          uppercase: boolean,
          alignTitle: alignTitles,
          titleChildren: [Icon, Image, undefined],
        },
      },
      combinationTests: {
        combinations: [
          {
            props: {
              children: testStrings,
              breakTitleChildrenWithChildren: boolean,
            },
            config: {
              defaultProps: { titleChildren: Icon },
            },
          },
          {
            props: {
              children: overflowString,
              overflowBehaviour: ['break', 'ellipsis', undefined],
            },
          },
        ],
      },
    });
  });

  describe('Functional-Test', () => {
    (['h1', 'h6'] as const).forEach((tag) => {
      generateTest('Title', `renders with ${tag}`, () => {
        renderTitle({ headerTag: tag });
        cy.get(tag).should('exist');
      });
    });

    (['div', 'span', 'p', 'h4', 'article'] as const).forEach((element) => {
      generateTest('Title', `renders with as="${element}"`, () => {
        renderTitle({ as: element });
        cy.get(element).should('exist');
      });
    });
  });

  describe('Responsive- & Accessibility-Test', () => {
    generateTest('aria-label', 'is set', () => {
      renderTitle({ 'aria-label': 'aria-label-test' });
      cy.get(`[data-cy='Title']`).should('have.attr', 'aria-label', 'aria-label-test');
    });
  });
});
