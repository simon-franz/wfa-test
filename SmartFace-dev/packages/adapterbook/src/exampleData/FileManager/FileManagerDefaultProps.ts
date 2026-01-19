import getId from '@hrworks/sui-shared/functions/getId';
import { generateLoremSentences } from '@hrworks/sui-shared/functions/stringGenerator';

import { addNotification } from '../../utils/eventFunctions/addNotification';
import { preset } from '../../utils/preset';
import { defaultButton } from '../Button/ButtonDefaultProps';
import type { FileManagerBackendProps } from '@hrworks/smartface/adapters/core/FileManagerAdapter/FileManagerAdapter.types';

export const fileManagerDefaultProps: FileManagerBackendProps = {
  helpText: preset.formDefaultProps.helpText,
  name: preset.formDefaultProps.name,
  validationMessage: preset.formDefaultProps.validationMessage,
  value: [
    {
      displayName: generateLoremSentences(),
      ignoreSize: false,
      size: 5 * 1024 * 1024,
      sfId: getId(),
    },
    {
      displayName: generateLoremSentences(2),
      displayUrl: 'FileManager',
      ignoreSize: false,
      size: 3 * 1024 * 1024,
      sfId: getId(),
    },
  ],

  onRemoveFiles: [addNotification('File deleted')],
  onValueChange: [addNotification('Value changed')],
  mode: 'multi',
  validations: {
    sizeOfAllFiles: {
      value: 5 * 1024 * 1024,
    },
    maxFileAmount: {
      value: 4,
    },
  },
  windowDropzone: {
    show: true,
    text: generateLoremSentences(),
  },
  showList: true,
  trigger: defaultButton(),
  disabled: false,
};
