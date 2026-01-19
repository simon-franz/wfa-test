import { generateLoremWords } from '@hrworks/sui-shared/functions/stringGenerator';

import type { IframeBackendProps } from '@hrworks/smartface/adapters/core/IframeAdapter/IframeAdapter.types';

export const iFrameDefaultProps: IframeBackendProps = {
  title: generateLoremWords(),
  srcDoc: '<h1 style="color:blue;">A Blue Heading</h1><p style="color:red;">A red paragraph.</p>',
  fullHeight: true,
};
