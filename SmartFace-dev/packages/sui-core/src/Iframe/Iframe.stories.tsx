import type { Meta } from '@storybook/react';

import { Iframe } from './Iframe';

export default {
  title: 'Components/Media/Iframe',
  component: Iframe,
} as Meta<typeof Iframe>;

export const DefaultIframe = {
  args: { title: 'HRworks Webseite', src: 'https://www.hrworks.de' },
};

export const PDF = {
  args: {
    title: 'PDF-test',
    height: 700,
    src: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
};
