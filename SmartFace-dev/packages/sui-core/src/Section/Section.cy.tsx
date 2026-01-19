import { mockComponents, mockData } from '@hrworks/cypress-utils/fixtures';
import { generateVisualTests, renderComponentWithTheme } from '@hrworks/cypress-utils/functions';

import { Section } from './Section';
import { S as SectionStyles } from './Section.styles';
import type { SectionProps } from './Section.types';

const { Badge, Input } = mockComponents;
const { boolean, testStrings, alignTitles, sizes } = mockData;

const defaultProps: SectionProps = {
  title: 'Section Title',
  titleChildren: Badge,
  children: Input,
};

const renderSection = (props: Partial<SectionProps>) => {
  renderComponentWithTheme(Section, { ...defaultProps, ...props });
};

const toggleSection = () => cy.get(`${SectionStyles.SectionToggle}`).realClick();

context('Section', () => {
  describe('Visual-Test', () => {
    generateVisualTests({
      renderFn: renderSection,
      singleTests: {
        props: {
          title: testStrings,
          titleChildren: [Badge, Input, undefined],
          alignTitle: alignTitles,
          uppercase: boolean,
          breakTitleChildrenWithTitle: boolean,
          divider: boolean,
          collapsible: boolean,
          size: sizes,
        },
        config: {
          defaultProps,
        },
      },
      combinationTests: {
        combinations: [
          {
            props: {
              title: testStrings,
              breakTitleChildrenWithTitle: boolean,
            },
          },
          {
            props: {
              expanded: boolean,
            },
            config: {
              defaultProps: { collapsible: true },
            },
          },
          {
            props: {
              expanded: boolean,
            },
            config: {
              defaultProps: { collapsible: true },
              cb: toggleSection,
              customScreenshotNames: { expanded: ['true-click', 'false-click', 'undefined-click'] },
            },
          },
          {
            props: {
              defaultExpanded: boolean,
            },
            config: {
              defaultProps: { collapsible: true },
            },
          },
          {
            props: {
              defaultExpanded: boolean,
            },
            config: {
              defaultProps: { collapsible: true },
              cb: toggleSection,
              customScreenshotNames: {
                defaultExpanded: ['true-click', 'false-click', 'undefined-click'],
              },
            },
          },
        ],
      },
    });
  });

  describe('Functional-Test', () => {
    describe('Checking interactivity', () => {
      it('triggers onExpandedChange', () => {
        const onExpandedChangeSpy = cy.spy().as('onExpandedChangeSpy');
        renderComponentWithTheme(
          Section,
          {
            title: 'Section onExpand',
            children: defaultProps.children,
            collapsible: true,
            onExpandedChange: onExpandedChangeSpy,
          },
          { checkForExistence: true },
        );
        toggleSection();
        cy.get('@onExpandedChangeSpy').should('have.been.calledOnce');
      });
    });
  });
});
