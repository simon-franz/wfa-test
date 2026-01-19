import { LocalizationContext } from '@hrworks/localization';
import { Dropzone, DropzoneManagerContext } from '@hrworks/sui-core/Dropzone';
import { HeadlessFileManagerContext } from '@hrworks/sui-core/FileManager';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import { useContext } from 'react';

import { mapSmartFaceComponentsToAdapters } from '../../../main/components/ComponentMapper';
import type { DropzoneAdapterProps } from './DropzoneAdapter.types';
import type { DropzoneProps } from '@hrworks/sui-core/Dropzone/Dropzone.types';

export const DropzoneAdapter = observer(
  ({ fileManagerSfId, componentChildren, alternativeComponentChildren, ...otherProps }: DropzoneAdapterProps) => {
    const { getFileManager, onDrop: ctxOnDrop } = useContext(DropzoneManagerContext);
    const { translate } = useContext(LocalizationContext);
    const fileManagerContext = useContext(HeadlessFileManagerContext);

    const fileManagerProps = computed((): Pick<DropzoneProps, 'mode' | 'accept' | 'maxFileAmount' | 'disabled'> => {
      const fileManager = fileManagerSfId && getFileManager(fileManagerSfId);
      if (fileManager) {
        return {
          mode: fileManager.mode,
          accept: fileManager.validations?.allowedFileTypes?.value,
          maxFileAmount: fileManager.validations?.maxFileAmount?.value,
          disabled: fileManager.disabled,
        };
      } else if (fileManagerContext) {
        return {
          mode: fileManagerContext.mode,
          accept: fileManagerContext.allowedFileTypes?.value,
          maxFileAmount: fileManagerContext.maxFileAmount?.value,
          disabled: fileManagerContext.disabled,
        };
      } else {
        return { mode: 'single' };
      }
    });

    const onDrop = computed<DropzoneProps['onDrop']>(
      () => (files) => (fileManagerSfId ? ctxOnDrop(files, fileManagerSfId) : fileManagerContext?.addFiles(files)),
    );

    const children = computed<DropzoneProps['children']>(() =>
      componentChildren?.length
        ? mapSmartFaceComponentsToAdapters(componentChildren)
        : translate(fileManagerProps.get().mode === 'single' ? 'dropzone-text-singular' : 'dropzone-text-plural'),
    );

    const alternativeChildren = computed<DropzoneProps['alternativeChildren']>(() =>
      alternativeComponentChildren?.length ? mapSmartFaceComponentsToAdapters(alternativeComponentChildren) : undefined,
    );

    return (
      <Dropzone
        {...fileManagerProps.get()}
        alternativeChildren={alternativeChildren.get()}
        onDrop={onDrop.get()}
        {...otherProps}
      >
        {children.get()}
      </Dropzone>
    );
  },
);
