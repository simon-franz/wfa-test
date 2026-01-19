import { mockComponents, mockData } from '@hrworks/cypress-utils/fixtures';
import { generateVisualTests, renderComponentWithTheme } from '@hrworks/cypress-utils/functions';
import times from 'lodash/times';

import { HeaderArea } from './HeaderArea';
import type { HeaderAreaProps } from './HeaderArea.types';

const { testString, testStrings, sizes, boolean } = mockData;
const { BadgeFullHeight, Icon, Image, Input } = mockComponents;

const defaultProps: Partial<HeaderAreaProps> = {
  header: {
    title: testString,
    subtitle: testString,
  },
};

const headerDefaultProps = {
  title: testString,
  titleSize: sizes[2],
  titleChildren: [Icon],
  subtitle: testStrings[0],
  subtitleSize: sizes[1],
  subtitleChildren: [Icon],
};

const generateHeaderObjectsTitlesText = () =>
  testStrings.map((string) => ({
    ...headerDefaultProps,
    title: string,
    subtitle: string,
  }));

const generateHeaderObjectsTitleSizes = () =>
  sizes.map((size) => ({
    ...headerDefaultProps,
    titleSize: size,
    subtitleSize: size,
  }));

const multipleIcons = times(10, () => Icon);

const childrenTestProps = [[Icon, Image, Input], [multipleIcons]];

const renderHeaderArea = (props: Partial<HeaderAreaProps>) => {
  renderComponentWithTheme(HeaderArea, { ...defaultProps, ...props }, undefined);
};

context('HeaderArea', () => {
  describe('Visual-Test', () => {
    generateVisualTests({
      renderFn: renderHeaderArea,
      singleTests: {
        props: {
          header: [...generateHeaderObjectsTitlesText(), ...generateHeaderObjectsTitleSizes()],
          toolbarChildren: childrenTestProps,
          flexToolbarChildren: childrenTestProps,
          fullHeight: boolean,
        },
      },
      combinationTests: {
        combinations: [
          {
            props: {
              toolbarChildren: childrenTestProps,
              flexToolbarChildren: childrenTestProps,
            },
          },
          {
            props: {
              fullHeight: boolean,
              children: [[BadgeFullHeight], ...childrenTestProps],
            },
          },
        ],
      },
    });
  });
});
