import { mockComponents, mockData } from '@hrworks/cypress-utils/fixtures';
import { generateTest, generateVisualTests, renderComponentWithTheme } from '@hrworks/cypress-utils/functions';

import { S as CollapsibleMenuEntry } from '../CollapsibleMenu/Entry/CollapsibleMenuEntry.styles';
import { S as ModalHeader } from '../Modal/Header/ModalHeader.styles';
import { DropdownMenu } from './DropdownMenu';
import type { DropdownMenuProps } from './DropdownMenu.types';
import { DropdownMenuDivider } from './DropdownMenuDivider';
import { DropdownMenuEntry } from './DropdownMenuEntry';
import { S as DesktopDropdownMenuEntry } from './DropdownMenuEntry/DesktopDropdownMenuEntry/DesktopDropdownMenuEntry.styles';
import { DropdownMenuSection } from './DropdownMenuSection';

const { floatDirections, testString, testStrings, testURL } = mockData;
const { Button, Icon, Image, Input } = mockComponents;

const clickTrigger = () => {
  cy.get('[data-cy-type="cy-test-element"]').click();
};

const defaultProps: Partial<DropdownMenuProps> = {
  title: 'DropdownMenu',
  trigger: Button,
  items: (
    <>
      <DropdownMenuSection data-cy="s1" data-guide-id="data-guide-section" title={testString}>
        <DropdownMenuEntry data-cy="s1-e1" data-guide-id="data-guide-entry" href="/">
          {testString}
        </DropdownMenuEntry>
        <DropdownMenuEntry
          data-cy="s1-e2"
          icon={Icon}
          submenu={
            <>
              <DropdownMenuEntry data-cy="s1-se1" icon={Icon} href="/">
                {testString}
              </DropdownMenuEntry>
              <DropdownMenuEntry data-cy="s1-se2" href="/">
                {testStrings[0]}
              </DropdownMenuEntry>
            </>
          }
        >
          {testStrings[1]}
        </DropdownMenuEntry>
      </DropdownMenuSection>
      <DropdownMenuDivider />
      <DropdownMenuSection data-cy="s2" title={testStrings[0]}>
        <DropdownMenuEntry data-cy="s2-e1">{testStrings[0]}</DropdownMenuEntry>
      </DropdownMenuSection>
    </>
  ),
};

const renderDropdownMenu = ({ presentation, ...otherProps }: Partial<DropdownMenuProps>) => {
  renderComponentWithTheme(DropdownMenu, { ...defaultProps, presentation, ...otherProps }, { centered: true });
};

context('DropdownMenu', () => {
  describe('Visual-Test', () => {
    generateVisualTests({
      renderFn: renderDropdownMenu,
      singleTests: {
        props: {
          trigger: [Button, Icon, Image, Input],
          placement: floatDirections,
        },
        config: {
          customScreenshotNames: {
            trigger: ['button', 'icon', 'image', 'input'],
          },
          cb: () => {
            cy.viewport(1024, 768);
            clickTrigger();
            cy.get('body').type('{downArrow}{downArrow}{rightArrow}');
            cy.get('[data-cy="s1-se1"]').should('be.visible');
            cy.get(`${DesktopDropdownMenuEntry.IconContainer} svg path`).should('exist');
          },
        },
      },
      combinationTests: {
        combinations: [
          {
            props: {
              presentation: 'dropdown',
            },
            config: {
              defaultProps,
              cb: () => {
                clickTrigger();
                cy.get('[data-cy="s1-e2"] svg path').should('exist');
                cy.get('body').type('{downArrow}{downArrow}{rightArrow}');
                cy.get('[data-cy="s1-se1"] svg path').should('exist');
              },
            },
          },
          {
            props: {
              presentation: 'modal',
              title: testStrings,
            },
            config: {
              defaultProps,
              cb: () => {
                clickTrigger();
                cy.get(`${ModalHeader.Header}`).should('be.visible');
                cy.get('[data-cy="s1-e2"] svg path').should('exist');
                cy.get('[data-cy="s1-e2"]').realClick();
                cy.get('[data-cy="s1-se1"] svg path').should('exist');
                cy.get(`${CollapsibleMenuEntry.IconContainer} svg path`).should('exist');
              },
            },
          },
        ],
      },
    });
  });

  describe('Functional-Test', () => {
    generateTest('onClick', 'is called', () => {
      const onClickSpy = cy.spy().as('onClickSpy');
      renderDropdownMenu({
        trigger: Button,
        items: (
          <DropdownMenuEntry data-cy="entry" onClick={onClickSpy}>
            {testString}
          </DropdownMenuEntry>
        ),
      });
      clickTrigger();
      cy.get('[data-cy="entry"]').click();
      cy.get('@onClickSpy').should('have.been.calledOnce');

      clickTrigger();
      cy.viewport(1024, 768);
      cy.get('[data-cy="entry"').click();
      cy.get('@onClickSpy').should('have.been.called');
    });

    generateTest('href', 'is set', () => {
      renderDropdownMenu({
        trigger: Button,
        items: (
          <DropdownMenuEntry data-cy="entry" href={testURL}>
            {testString}
          </DropdownMenuEntry>
        ),
      });
      clickTrigger();
      cy.get(`[data-cy="entry"] > a`).should('have.attr', 'href', testURL);
      cy.viewport(1024, 768);
      cy.get(`[data-cy="entry"] > a`).should('have.attr', 'href', testURL);
    });

    generateTest('Entry: target', 'should have correct target attributes', () => {
      ['_blank', '_self', '_parent', '_top'].forEach((target) => {
        renderDropdownMenu({
          trigger: Button,
          items: (
            <DropdownMenuEntry
              data-cy="entry"
              target={target}
              href={testURL}
              submenu={
                <DropdownMenuEntry data-cy="sub-entry" icon={Icon} href="/">
                  {testString}
                </DropdownMenuEntry>
              }
            >
              {testString}
            </DropdownMenuEntry>
          ),
        });
        clickTrigger();
        cy.get(`[data-cy="entry"] > a`).should('have.attr', 'target', target);
        cy.viewport(1024, 768);
        cy.get(`[data-cy="entry"] > a`).should('have.attr', 'target', target);
      });
    });
  });
});
