import { mockComponents, mockData } from '@hrworks/cypress-utils/fixtures';
import { generateVisualTests, renderComponentWithTheme } from '@hrworks/cypress-utils/functions';

import { ServerStatus } from './ServerStatus';
import type { ServerStatusProps } from './ServerStatus.types';

const { testStrings, testString } = mockData;
const { Image, Icon } = mockComponents;

const defaultProps: Partial<ServerStatusProps> = {
  statusCode: '404',
  subtitle: testString,
  media: Image,
};

const renderServerStatus = (props: Partial<ServerStatusProps>) => {
  renderComponentWithTheme(ServerStatus, { ...defaultProps, ...props }, undefined);
};

context('ServerStatus', () => {
  describe('Visual-Test', () => {
    generateVisualTests({
      renderFn: renderServerStatus,
      singleTests: {
        props: {
          statusCode: ['404', ...testStrings],
          title: testStrings,
          subtitle: testStrings,
          media: [Icon, Image, undefined],
        },
      },
    });
  });
});
