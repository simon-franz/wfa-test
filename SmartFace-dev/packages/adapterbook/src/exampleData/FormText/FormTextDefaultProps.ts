import { generateLoremSentences, generateLoremWords } from '@hrworks/sui-shared/functions/stringGenerator';

import type { FormTextBackendProps } from '@hrworks/smartface/adapters/core/FormTextAdapter/FormTextAdapter.types';

export const formTextDefaultProps: FormTextBackendProps = {
  label: generateLoremWords(),
  value: `<b>${generateLoremSentences()}</b>`,
  html: true,
  alignItems: 'center',
  size: 'medium',
};
