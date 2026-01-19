import { LocalizationContext } from '@hrworks/localization';
import { HelpText } from '@hrworks/sui-shared/components/HelpText';
import { observer } from 'mobx-react';
import { useContext, useId } from 'react';

import { FileList } from './FileList';
import { S } from './FileManager.styles';
import type { FileManagerProps } from './FileManager.types';
import { FileUpload } from './FileUpload';
import { HeadlessFileManager } from './HeadlessFileManager';

export const FileManager = observer(
  ({
    name,
    mode,
    onAddFiles,
    onValueChange,
    onRemoveFiles,
    showList = true,
    windowDropzone,
    validations,
    value,
    helpText,
    validationMessage,
    validationState,
    disabled,
    trigger,
    id = useId(),
    ...otherProps
  }: FileManagerProps) => {
    const { translate } = useContext(LocalizationContext);

    return (
      <HeadlessFileManager
        id={id}
        name={name}
        mode={mode}
        onAddFiles={onAddFiles}
        onRemoveFiles={onRemoveFiles}
        onValueChange={onValueChange}
        validations={validations}
        value={value}
        disabled={disabled}
        windowDropzone={
          windowDropzone && !disabled
            ? {
                show: !!windowDropzone.show,
                text:
                  windowDropzone.text ||
                  translate(mode === 'single' ? 'dropzone-text-singular' : 'dropzone-text-plural'),
              }
            : undefined
        }
      >
        {({ errorMessage }) => (
          <S.Wrapper disabled={disabled}>
            {trigger && (
              <FileUpload {...otherProps} disabled={disabled}>
                {trigger}
              </FileUpload>
            )}
            {errorMessage ? (
              <HelpText key={errorMessage} validationMessage={errorMessage} validationState="danger" />
            ) : (
              <HelpText validationMessage={validationMessage} helpText={helpText} validationState={validationState} />
            )}
            {showList && <FileList disabled={disabled} />}
          </S.Wrapper>
        )}
      </HeadlessFileManager>
    );
  },
);
