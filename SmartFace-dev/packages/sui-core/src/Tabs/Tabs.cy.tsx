import { mockComponents, mockData } from '@hrworks/cypress-utils/fixtures';
import {
  generateTargetTests,
  generateTest,
  generateVisualTests,
  renderComponentWithTheme,
} from '@hrworks/cypress-utils/functions';

import { Tab } from './Tab/Tab';
import { TabList } from './TabList/TabList';
import { TabPanel } from './TabPanel/TabPanel';
import { Tabs } from './Tabs';
import type { TabsProps } from './Tabs.types';

const { testString, colors, boolean, testURL, gaps } = mockData;
const { BadgeFullHeight } = mockComponents;

const tabIds: string[] = [];

const defaultProps: Partial<TabsProps> = {
  defaultSelectedItemId: 'tab-0',
  children: (
    <>
      <TabList>
        {colors.map((color, index) => {
          tabIds.push(`tab-${index}`);

          return (
            <Tab key={index} id={`tab-${index}`} color={color}>
              {testString}
            </Tab>
          );
        })}
      </TabList>
      {colors.map((_color, index) => (
        <TabPanel key={index} id={`tab-${index}`}>
          {BadgeFullHeight}
        </TabPanel>
      ))}
    </>
  ),
};

const renderTabs = (props: Partial<TabsProps>) => {
  renderComponentWithTheme(Tabs, { ...defaultProps, ...props });
  cy.viewport(750, 500);
};

context('Tabs', () => {
  describe('Visual-Test', () => {
    generateVisualTests({
      renderFn: renderTabs,
      singleTests: {
        props: {
          fullHeight: boolean,
          selectedItemId: [...tabIds, undefined],
          defaultSelectedItemId: [...tabIds, undefined],
          contentGap: gaps,
        },
      },
      combinationTests: {
        combinations: [
          {
            props: {
              children: [
                <>
                  <TabList>
                    <Tab id="tab-0">{testString}</Tab>
                    <Tab id="tab-1" preventSelect={true}>
                      {testString}
                    </Tab>
                  </TabList>
                  <TabPanel id="tab-0">{testString}</TabPanel>
                  <TabPanel id="tab-1">{testString}</TabPanel>
                </>,
                <>
                  <TabList>
                    <Tab id="tab-0">{testString}</Tab>
                    <Tab id="tab-1" preventInitialSelect={true}>
                      {testString}
                    </Tab>
                  </TabList>
                  <TabPanel id="tab-0">{testString}</TabPanel>
                  <TabPanel id="tab-1">{testString}</TabPanel>
                </>,
              ],
            },
            config: {
              cb: () => {
                cy.get('#tab-1').click();
              },
              customScreenshotNames: { children: ['check-preventSelect', 'check-preventInitialSelect'] },
            },
          },
        ],
      },
    });
  });

  describe('Functional-Test', () => {
    generateTest('Tab: href attribute', 'should have correct href attribute', () => {
      renderTabs({
        children: (
          <TabList>
            <Tab data-cy="tab-href-test" href={testURL} />
          </TabList>
        ),
      });

      cy.get('[data-cy="tab-href-test"] > a').should('have.attr', 'href', testURL);
    });

    generateTest('Tab: target attribute', 'should have correct target attributes', () => {
      const targetTest = generateTargetTests('[data-cy="tab-target-test"] > a');

      targetTest.props.target.forEach((target) => {
        renderTabs({
          children: (
            <TabList>
              <Tab data-cy="tab-target-test" href={testURL} target={target} />
            </TabList>
          ),
        });

        targetTest.config.cb(target);
      });
    });

    generateTest('Tab: onClick', 'onClick is called', () => {
      const onClickSpy = cy.spy().as('onClickSpy');
      renderTabs({ onClick: onClickSpy });
      cy.get('#tab-1').click();
      cy.get('@onClickSpy').should('have.been.calledOnce');
    });

    generateTest(
      'Tab: onAfterInitialSelect & onBeforeInitialSelect',
      'calls onAfterInitialSelect and onBeforeInitialSelect when tab is selected initially',
      () => {
        const onAfterInitialSelectSpy = cy.spy().as('onAfterInitialSelectSpy');
        const onBeforeInitialSelectSpy = cy.spy().as('onBeforeInitialSelectSpy');

        renderTabs({
          children: (
            <>
              <TabList>
                <Tab
                  id="tab-1"
                  onBeforeInitialSelect={onBeforeInitialSelectSpy}
                  onAfterInitialSelect={onAfterInitialSelectSpy}
                >
                  {testString}
                </Tab>
                <Tab id="tab-2"> {testString}</Tab>
              </TabList>
              <TabPanel id="tab-1"> {testString}</TabPanel>
              <TabPanel id="tab-2"> {testString}</TabPanel>
            </>
          ),
        });

        cy.get('#tab-1').click();

        cy.get('@onBeforeInitialSelectSpy').should('have.been.calledOnce');
        cy.get('@onAfterInitialSelectSpy').should('have.been.calledOnce');
      },
    );

    generateTest(
      'Tab: onBeforeSelect, onAfterSelect and onDeselect',
      'calls onBeforeSelect, onAfterSelect and onDeselect when tab is clicked',
      () => {
        const onAfterSelectSpy = cy.spy().as('onAfterSelectSpy');
        const onBeforeSelectSpy = cy.spy().as('onBeforeSelectSpy');
        const onDeselectSpy = cy.spy().as('onDeselectSpy');

        renderTabs({
          children: (
            <>
              <TabList>
                <Tab id="tab-1" onBeforeSelect={onBeforeSelectSpy} onAfterSelect={onAfterSelectSpy}>
                  {testString}
                </Tab>
                <Tab id="tab-2" onDeselect={onDeselectSpy}>
                  {testString}
                </Tab>
              </TabList>
              <TabPanel id="tab-1"> {testString}</TabPanel>
              <TabPanel id="tab-2"> {testString}</TabPanel>
            </>
          ),
          defaultSelectedItemId: 'tab-2',
        });

        cy.get('#tab-1').click();

        cy.get('@onBeforeSelectSpy').should('have.been.calledOnce');
        cy.get('@onAfterSelectSpy').should('have.been.calledOnce');
        cy.get('@onDeselectSpy').should('have.been.calledOnce');
      },
    );

    generateTest('Tabs: updateSelectedItemId', 'is called with the correct itemId', () => {
      const updateSpy = cy.spy().as('updateSpy');
      renderTabs({ selectedItemId: 'tab-2', updateSelectedItemId: updateSpy });

      cy.get('#tab-1').click();

      cy.get('@updateSpy').should('have.been.calledWith', 'tab-1');
    });
  });
});
