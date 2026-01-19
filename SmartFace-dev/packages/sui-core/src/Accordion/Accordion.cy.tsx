import { mockComponents, mockData } from '@hrworks/cypress-utils/fixtures';
import { generateVisualTests, renderComponentWithTheme } from '@hrworks/cypress-utils/functions';

import { Accordion } from './Accordion';
import type { AccordionProps } from './Accordion.types';
import { AccordionItem } from './Item/AccordionItem';

const expandCollapseIcons: AccordionProps['expandCollapseIcon'][] = ['arrow', 'plus-minus', undefined];
const { overflowString, testString, boolean } = mockData;
const { Icon, Image } = mockComponents;

const defaultProps: Partial<AccordionProps> = {
  children: (
    <>
      <AccordionItem id="1" data-cy="acc1" title={testString}>
        {overflowString}
      </AccordionItem>
      <AccordionItem id="2" data-cy="acc2" title={testString}>
        {Icon}
        {testString}
      </AccordionItem>
      <AccordionItem id="3" data-cy="acc3" title={testString}>
        {Image}
        {testString}
      </AccordionItem>
    </>
  ),
};

const renderAccordion = (props?: Partial<AccordionProps>) => {
  renderComponentWithTheme(Accordion, { ...defaultProps, ...props });
};

context('Accordion', () => {
  describe('Visual-Test', () => {
    generateVisualTests({
      renderFn: renderAccordion,
      singleTests: {
        props: {
          expandCollapseIcon: expandCollapseIcons,
          itemSpacing: boolean,
        },
        config: {
          defaultProps: {
            expandedItemIds: ['1'],
          },
        },
      },
      combinationTests: {
        combinations: [
          {
            props: {
              expandedItemIds: [['1'], ['1', '3'], ['1', '2', '3']],
              multiple: boolean,
            },
          },
          {
            props: {
              multiple: true,
            },
            config: {
              cb: () => {
                cy.get('[data-cy="acc2"]').click();
                cy.get('[data-cy="acc3"]').click();
              },
            },
          },
        ],
      },
    });
  });
});
