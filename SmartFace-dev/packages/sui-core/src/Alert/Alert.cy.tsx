import { mockComponents, mockData } from '@hrworks/cypress-utils/fixtures';
import { generateTest, generateVisualTests, renderComponentWithTheme } from '@hrworks/cypress-utils/functions';
import type { Corner } from '@hrworks/types/shared/UiTypes';

import { Alert } from './Alert';
import { S as AlertStyles } from './Alert.styles';
import type { AlertProps } from './Alert.types';

export const alertCorners: Exclude<Corner, 'pill'>[] = ['rounded', 'square'];

const { Icon, Input, Image } = mockComponents;
const { boolean, testString, testStrings, colors } = mockData;

const defaultProps: Partial<AlertProps> = {
  title: testString,
  text: testString,
};

const renderAlert = ({ closeable, ...otherProps }: Partial<AlertProps>) => {
  renderComponentWithTheme(Alert, { ...defaultProps, closeable, ...otherProps });
  closeable && cy.get(`${AlertStyles.ButtonWrapper} svg path`).should('exist');
};

context('Alert', () => {
  describe('Visual-Test', () => {
    generateVisualTests({
      renderFn: renderAlert,
      singleTests: {
        props: {
          title: testStrings,
          text: testStrings,
          corner: alertCorners,
          icon: [Icon],
          children: [Icon, Image, Input],
        },
        config: {
          customScreenshotNames: {
            children: ['Icon', 'Image', 'Inputfield'],
            icon: ['Icon'],
          },
        },
      },
      combinationTests: {
        combinations: [
          {
            props: {
              color: colors,
              closeable: boolean,
            },
          },
        ],
      },
    });
  });

  describe('Functional-Test', () => {
    generateTest('Alert', 'should close Alert via mouse', () => {
      const onCloseSpy = cy.spy().as('onCloseSpy');
      renderAlert({ closeable: true, onClose: onCloseSpy });
      cy.get(`${AlertStyles.ButtonWrapper} svg`).click();
      cy.get('@onCloseSpy').should('have.been.calledOnce');
      cy.get(`${AlertStyles.Container}`).should('not.exist');
    });
  });
});
