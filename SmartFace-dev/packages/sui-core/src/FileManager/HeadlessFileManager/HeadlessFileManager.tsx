import { ERROR_CODES, ErrorHandlingContext } from '@hrworks/error-handling';
import { LocalizationContext } from '@hrworks/localization';
import { formatBytes } from '@hrworks/sui-shared/functions/formatBytes';
import { replacePlaceholder } from '@hrworks/sui-shared/functions/replacePlaceholder';
import { action, computed, observable, runInAction } from 'mobx';
import { observer, useLocalObservable } from 'mobx-react';
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

import { DropzoneManagerContext } from '../../Dropzone';
import {
  type FileManagerUploadedEvent,
  type FileManagerUploadProgressEvent,
  type FileManagerValue,
  HeadlessFileManagerContext,
  type HeadlessFileManagerProps,
} from '../';
import { FileModel } from './Models/File';

const sanitizeSize = (size: unknown): number => {
  return typeof size === 'number' && size > 0 ? size : 0;
};

export const HeadlessFileManager = observer(
  ({
    id,
    mode,
    validations = {},
    disabled,
    windowDropzone,
    name,
    children,
    value,
    onUploadProgress,
    onValueChange,
    onAddFiles,
    onRemoveFiles,
  }: HeadlessFileManagerProps) => {
    const { log } = useContext(ErrorHandlingContext);
    const inputRef = useRef<HTMLInputElement>(null);
    const { addFileManager, removeFileManager } = useContext(DropzoneManagerContext);
    const { translate } = useContext(LocalizationContext);

    const [errorMessageState, setErrorMessageState] = useState('');
    const fileList = useLocalObservable<FileModel[]>(() => []);
    const uploadProgress = observable.box<number | null>(null);

    const fileListSize = computed<number>(() =>
      // eslint-disable-next-line unicorn/no-array-reduce
      value.reduce(
        (accumulator, { size = 0, ignoreSize }) => (ignoreSize ? accumulator : accumulator + sanitizeSize(size)),
        0,
      ),
    );

    const createLocalFileUrl = useCallback(
      (file: File): string | undefined => {
        try {
          const url = URL.createObjectURL(file);

          return url;
        } catch (error) {
          log({
            type: 'error',
            code: ERROR_CODES.FILE_OPERATION_ERROR,
            error: error instanceof Error ? error : new Error(`Error creating object URL for ${file?.name}`),
          });
        }

        return undefined;
      },
      [log],
    );

    const updateFileInputValue = action(() => {
      if (inputRef.current) {
        const files = new DataTransfer();
        fileList.forEach(({ baseFile }) => files.items.add(baseFile));
        inputRef.current.files = files.files;
      }
    });

    const removeFile = action((fileParam: FileModel | FileManagerValue) => {
      const newValue = value.filter((file) => fileParam.id !== file.id);
      const fileListIndex = fileList.findIndex((file) => file.id === fileParam.id);
      if (fileListIndex !== -1) {
        fileList.splice(fileListIndex, 1);
        updateFileInputValue();
      }
      onValueChange?.(newValue);
      queueMicrotask(() => onRemoveFiles?.());
    });

    const isSingleFile = computed<boolean>(() => mode === 'single' || validations?.maxFileAmount?.value === 1);

    const fileListWithValues = computed<HeadlessFileManagerContext['fileList']>(() => {
      const ids = new Set(fileList.map(({ id }) => id));

      return value.map((file) => ({
        ...file,
        displayName: file.displayName,
        remove: () => removeFile(file),
        progress: ids.has(file.id) ? uploadProgress : null,
        size: file.size,
        ignoreSize: file.ignoreSize,
        displayUrl: file.displayUrl,
      }));
    });

    const allowedFileTypesErrorMessage = computed<string | null>(() => {
      const { allowedFileTypes } = validations;
      if (!allowedFileTypes?.value) {
        return null;
      }
      const { extensions = [], errorMessage } = allowedFileTypes;
      if (extensions.length === 1) {
        return replacePlaceholder(
          errorMessage ||
            translate(
              isSingleFile.get()
                ? 'file-manager-validation-allowed-file-type-singular-1'
                : 'file-manager-validation-allowed-file-type-plural-1',
            ),
          {
            '%1%': extensions[0],
          },
        );
      } else if (extensions.length > 1) {
        const extensionsString = `${extensions.slice(0, -1).join(', ')} ${translate('and')} ${extensions.slice(-1)}`;

        return replacePlaceholder(
          errorMessage ||
            translate(
              isSingleFile.get()
                ? 'file-manager-validation-allowed-file-types-singular-1'
                : 'file-manager-validation-allowed-file-types-plural-1',
            ),
          {
            '%1%': extensionsString,
          },
        );
      }

      return (
        errorMessage ||
        translate(
          isSingleFile.get()
            ? 'file-manager-validation-allowed-file-types-fallback-singular'
            : 'file-manager-validation-allowed-file-types-fallback-plural',
        )
      );
    });

    const sizeOfSingleFileErrorMessage = computed<string | null>(() => {
      const { sizeOfSingleFile } = validations;
      if (sizeOfSingleFile?.value == null) {
        return null;
      }
      const { value, errorMessage } = sizeOfSingleFile;

      return replacePlaceholder(
        errorMessage ||
          translate(
            isSingleFile.get()
              ? 'file-manager-validation-size-of-single-file-singular-1'
              : 'file-manager-validation-size-of-single-file-plural-1',
          ),
        { '%1%': formatBytes(value) },
      );
    });

    const sizeOfAllFilesErrorMessage = computed<string | null>(() => {
      const { sizeOfAllFiles } = validations;
      if (sizeOfAllFiles?.value == null) {
        return null;
      }
      const { value, errorMessage } = sizeOfAllFiles;

      return replacePlaceholder(
        errorMessage ||
          translate(
            isSingleFile.get()
              ? 'file-manager-validation-size-of-all-files-singular-1'
              : 'file-manager-validation-size-of-all-files-plural-1',
          ),
        { '%1%': formatBytes(value) },
      );
    });

    const maxFileAmountErrorMessage = computed<string | null>(() => {
      const { maxFileAmount } = validations;
      if (maxFileAmount?.value == null) {
        return null;
      }
      const { value, errorMessage } = maxFileAmount;

      return isSingleFile.get()
        ? errorMessage || translate('file-manager-validation-max-file-amount-singular')
        : replacePlaceholder(errorMessage || translate('file-manager-validation-max-file-amount-plural-1'), {
            '%1%': value,
          });
    });

    const emptyFileErrorMessage = useMemo(() => {
      return (
        validations.emptyFile?.errorMessage ||
        (mode === 'single'
          ? translate('file-manager-validation-empty-file-singular')
          : translate('file-manager-validation-empty-file-plural'))
      );
    }, [mode, translate, validations.emptyFile?.errorMessage]);

    const isSingleModeActive = mode === 'single';

    useEffect(() => {
      if (isSingleModeActive && fileList.length > 1) {
        runInAction(() => {
          fileList.splice(1); // is kicking out every file except the file at index 0
          updateFileInputValue();
          onValueChange?.(
            fileList.map(({ id, baseFile }) => ({
              id,
              displayName: baseFile.name,
              size: baseFile.size,
              displayUrl: createLocalFileUrl(baseFile),
            })),
          );
        });
      }
    }, [isSingleModeActive, fileList, updateFileInputValue, onValueChange, createLocalFileUrl]);

    const maxFiles = validations.maxFileAmount?.value;

    useEffect(() => {
      if (maxFiles && value.length > maxFiles) {
        // Last In, First Out - principle
        const filesToRemove = value.slice(-value.length + maxFiles);
        filesToRemove.forEach((file) => removeFile(file));
      }
    }, [maxFiles, value, removeFile]);

    const addFiles = action<HeadlessFileManagerContext['addFiles']>((files) => {
      setErrorMessageState('');
      if (isSingleModeActive && files.length > 1) {
        const singleFileErrorMessage =
          validations.maxFileAmount?.errorMessage || translate('file-manager-validation-max-file-amount-singular');
        setErrorMessageState(singleFileErrorMessage);

        return;
      }

      const emptyFiles = files.some((file) => file.size === 0);
      if (emptyFiles) {
        setErrorMessageState(emptyFileErrorMessage);

        return;
      }

      const { maxFileAmount, sizeOfSingleFile, sizeOfAllFiles, allowedFileTypes } = validations;

      if (
        maxFileAmount?.value != null &&
        (mode === 'growing' ? files.length + value.length : files.length) > maxFileAmount.value
      ) {
        const errorMessage = maxFileAmountErrorMessage.get();
        errorMessage && setErrorMessageState(errorMessage);

        return;
      }

      // If only a single file can be uploaded, there should not be the error message of sizeOfSingleFile and sizeOfAllFiles
      if (isSingleFile.get() && sizeOfSingleFile?.value && sizeOfAllFiles?.value) {
        // Only the error text of the smaller value should be set
        // true  - sizeOfSingleFile
        // false - sizeOfAllFiles
        let fileSize: number, errorMessageFunction;
        if (sizeOfSingleFile.value <= sizeOfAllFiles.value) {
          fileSize = sizeOfSingleFile.value;
          errorMessageFunction = sizeOfSingleFileErrorMessage;
        } else {
          fileSize = sizeOfAllFiles.value;
          errorMessageFunction = sizeOfAllFilesErrorMessage;
        }

        if (files.some(({ size }) => size > fileSize)) {
          const errorMessage = errorMessageFunction.get();
          errorMessage && setErrorMessageState(errorMessage);

          return;
        }
      } else {
        // It is not a single file upload, hence we can output both error messages
        if (sizeOfSingleFile?.value != null && files.some(({ size }) => sanitizeSize(size) > sizeOfSingleFile.value)) {
          const errorMessage = sizeOfSingleFileErrorMessage.get();
          errorMessage && setErrorMessageState(errorMessage);

          return;
        }
        if (sizeOfAllFiles?.value != null) {
          const newFilesSize = files.reduce((accumulator, { size }) => accumulator + sanitizeSize(size), 0);
          if ((mode === 'growing' ? newFilesSize + fileListSize.get() : newFilesSize) > sizeOfAllFiles.value) {
            const errorMessage = sizeOfAllFilesErrorMessage.get();
            errorMessage && setErrorMessageState(errorMessage);

            return;
          }
        }
      }

      if (allowedFileTypes?.value != null && files.some(({ type }) => !allowedFileTypes.value.includes(type))) {
        const errorMessage = allowedFileTypesErrorMessage.get();
        errorMessage && setErrorMessageState(errorMessage);

        return;
      }

      const newFileModels = files.map((file) => new FileModel(file));
      let newValue: FileManagerValue[] = [];

      if (mode === 'growing') {
        fileList.push(...newFileModels);
        newValue = [
          ...value,
          ...newFileModels.map(({ id, baseFile }) => ({
            id,
            displayName: baseFile.name,
            size: baseFile.size,
            displayUrl: createLocalFileUrl(baseFile),
          })),
        ];
      } else {
        fileList.splice(0, fileList.length);
        fileList.push(...newFileModels);
        newValue = newFileModels.map((file) => ({
          displayName: file.baseFile.name,
          id: file.id,
          size: file.baseFile.size,
          displayUrl: createLocalFileUrl(file.baseFile),
        }));
      }
      updateFileInputValue();
      onValueChange?.(newValue);
      // Using setTimeout with a delay of 0 ensures that onAddFiles is called after all current
      // synchronous code and any pending asynchronous work in onValueChange has been completed.
      setTimeout(() => onAddFiles?.(), 0);
    });

    const resetFileList = action((event: FileManagerUploadedEvent) => {
      if (event.detail.targetSfIds.includes(id)) {
        fileList.splice(0, fileList.length);
        updateFileInputValue();
      }
    });

    const onUploadProgressFn = action((event: FileManagerUploadProgressEvent) => {
      if (event.detail.targetSfIds.includes(id)) {
        onUploadProgress?.(event.detail);
        uploadProgress.set(event.detail.progress ?? null);
      }
    });

    useEffect(() => {
      addFileManager({
        id,
        onDrop: addFiles,
        mode,
        validations,
        disabled,
        windowDropzone,
      });

      return () => {
        removeFileManager(id);
      };
    }, [addFileManager, removeFileManager, id, mode, validations, disabled, windowDropzone, addFiles]);

    useEffect(() => {
      window.addEventListener('file-manager-upload' as any, onUploadProgressFn);
      window.addEventListener('file-manager-uploaded' as any, resetFileList);

      return () => {
        window.removeEventListener('file-manager-upload' as any, onUploadProgressFn);
        window.removeEventListener('file-manager-uploaded' as any, resetFileList);
      };
    }, [onUploadProgressFn, resetFileList]);

    const serializableValue = computed<string>(() =>
      JSON.stringify(value.filter(({ id }) => !fileList.some(({ id: fileId }) => id === fileId)).map(({ id }) => id)),
    );

    const contextValue = computed<HeadlessFileManagerContext>(() => ({
      allowedFileTypes: validations.allowedFileTypes,
      fileList: fileListWithValues.get(),
      maxFileAmount: validations.maxFileAmount,
      addFiles,
      mode,
      disabled,
    }));

    return (
      <HeadlessFileManagerContext.Provider value={contextValue.get()}>
        <input
          hidden
          aria-hidden
          readOnly
          type="file"
          ref={inputRef}
          data-get-form-data-ignore
          data-file-manager-id={id}
        />
        <input hidden aria-hidden name={name} readOnly data-get-form-data-array value={serializableValue.get()} />
        {children({ errorMessage: errorMessageState })}
      </HeadlessFileManagerContext.Provider>
    );
  },
);
