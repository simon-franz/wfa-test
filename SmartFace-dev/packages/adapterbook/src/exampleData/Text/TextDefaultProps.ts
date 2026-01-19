import { generateLoremSentences } from '@hrworks/sui-shared/functions/stringGenerator';

import { generateProps } from '../../utils/generateProps';
import type {
  TextAdapterProps,
  TextBackendProps,
} from '@hrworks/smartface/adapters/core/TextAdapter/TextAdapter.types';

export const textDefaultProps: TextBackendProps = {
  text: generateLoremSentences(),
  fontSize: 'medium',
  color: undefined,
  fullWidth: true,
  textAlign: 'start',
};

export const defaultText = (props?: Partial<TextAdapterProps>) =>
  generateProps('Text', { ...textDefaultProps, ...props });
