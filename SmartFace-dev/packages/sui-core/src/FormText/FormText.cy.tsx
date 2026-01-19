import { mockData } from '@hrworks/cypress-utils/fixtures';
import { generateVisualTests, renderComponentWithTheme } from '@hrworks/cypress-utils/functions';

import { FormText } from './FormText';
import type { FormTextProps } from './FormText.types';

const { alignTitles, boolean, commonChildren, sizes, testString, testStrings, testURL, overflowString } = mockData;

const defaultProps: Partial<FormTextProps> = {
  label: testString,
};

const renderFormText = (props?: Partial<FormTextProps>) => {
  renderComponentWithTheme(FormText, { ...defaultProps, ...props });
};

context('Image', () => {
  describe('Visual-Test', () => {
    generateVisualTests({
      renderFn: renderFormText,
      singleTests: {
        props: {
          label: testStrings,
          size: sizes,
          alignItems: alignTitles,
          labelChildren: commonChildren,
        },
      },
      combinationTests: {
        combinations: [
          {
            props: {
              html: boolean,
              value: [
                [
                  `<div>${testString}</div>`,
                  `<span class="test">${testString}</span>`,
                  `<p style="color: red;">${testString}</p>`,
                  `<h1>${testString}</h1>`,
                  `<a href="#">${testString}</a>`,
                  `<strong>${testString}</strong>`,
                  `<em>${testString}</em>`,
                  `<ul><li>${testString}</li></ul>`,
                  `<img src="test.jpg" alt="${testString}" />`,
                  `<input type="text" value="${testString}" />`,
                  `<button onclick="alert('test')">${testString}</button>`,
                  `<div><span><p>${testString}</p></span></div>`,
                ].join(''),
                `<tag>${testURL}QueryParams+#################################</tag>`,
                `<strong>${testURL + overflowString}</strong>`,
              ],
            },
          },
        ],
      },
    });
  });
});
