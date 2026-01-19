import { mockData } from '@hrworks/cypress-utils/fixtures';
import { generateVisualTests, renderComponentWithTheme } from '@hrworks/cypress-utils/functions';

import { Progress } from './Progress';
import type { ProgressProps } from './Progress.types';

const { colors, sizes } = mockData;

const defaultProps: Partial<ProgressProps> = { progress: 50, animated: false };

const basicProgressValues: ProgressProps['progress'][] = [0, 50, 100, undefined];
const edgeCaseProgressValues: ProgressProps['progress'][] = [-10, 120];
const allProgressValues = [...basicProgressValues, ...edgeCaseProgressValues];
const presentationValues: ProgressProps['presentation'][] = ['circular', 'linear', undefined];

const renderProgress = (props: ProgressProps) => {
  renderComponentWithTheme(Progress, { ...defaultProps, ...props }, { checkForExistence: true });
};

context('Progress', () => {
  describe('Visual-Test', () => {
    generateVisualTests({
      renderFn: renderProgress,
      singleTests: {
        props: {
          presentation: presentationValues,
          progress: allProgressValues,
          size: sizes,
          color: colors,
        },
      },
      combinationTests: {
        combinations: [
          {
            props: {
              presentation: presentationValues,
              progress: basicProgressValues,
            },
          },
          {
            props: {
              size: sizes,
              progress: basicProgressValues,
            },
          },
          {
            props: {
              size: [undefined],
              color: [undefined],
            },
          },
        ],
      },
    });
  });
});
