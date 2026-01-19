import getId from '@hrworks/sui-shared/functions/getId';

import { defaultButton } from '../Button/ButtonDefaultProps';
import { defaultText } from '../Text/TextDefaultProps';
import type { DropzoneBackendProps } from '@hrworks/smartface/adapters/core/DropzoneAdapter/DropzoneAdapter.types';

export const dropzoneDefaultProps: DropzoneBackendProps = {
  alternativeComponentChildren: [defaultButton({ variant: 'text' })],
  componentChildren: [defaultText()],
  fileManagerSfId: getId(),
};
