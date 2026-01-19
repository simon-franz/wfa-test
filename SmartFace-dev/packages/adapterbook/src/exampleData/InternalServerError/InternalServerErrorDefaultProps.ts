import { generateLoremSentences, generateLoremWords } from '@hrworks/sui-shared/functions/stringGenerator';

import type { InternalServerErrorBackendProps } from '@hrworks/smartface/adapters/core/InternalServerErrorAdapter/InternalServerErrorAdapter.types';

export const internalServerErrorDefaultProps: InternalServerErrorBackendProps = {
  title: generateLoremWords(),
  message: generateLoremSentences(),
  html: true,
};
