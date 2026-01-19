import { generateLoremSentences } from '@hrworks/sui-shared/functions/stringGenerator';

import type { AlertBackendProps } from '@hrworks/smartface/adapters/core/AlertAdapter/AlertAdapter.types';

export const alertDefaultProps: AlertBackendProps = {
  title: generateLoremSentences(1),
};
