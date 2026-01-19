import { detectBrowser } from '@hrworks/sui-shared/functions/detectBrowser';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { Backdrop } from '../../Backdrop';
import { Dropzone } from '../';
import { S } from './DropzoneManager.styles';
import type { DropzoneManagerProps } from './DropzoneManager.types';
import { DropzoneManagerContext, type FileManagerDropzoneProps } from './DropzoneManagerContext';

export const DropzoneManager = observer(({ children }: DropzoneManagerProps) => {
  const [isWindowDragActive, setIsWindowDragActive] = useState(false);
  const [safariCount, setSafariCount] = useState(0);
  const [fileManager, setFileManager] = useState<FileManagerDropzoneProps[]>([]);

  const isSafari = useMemo(() => detectBrowser() === 'Safari', []);

  /* 
    Explanation to SafariCount:
    Safari has no easy way to determine if the user dragged a file outside the window / document
    since event.relatedTarget is always null and event.screenX is never 0 as in other browsers.
    We found this workaround:
    dragenter fires initially twice then followed by a dragleave.
    From then it fires alternately: dragenter - dragleave - deagenter - ... 
    Until: The dragged file leaves the document. At this point dragleave fires twice in a row
    Example: 
    initial: safariCount = 0 
    dragEnter: safariCount = 1 
    dragEnter: safariCount = 2
    dragLeave: safariCount = 1
    dragEnter: safariCount = 2
    dragLeave: safariCount = 1
    dragEnter: safariCount = 2
    ...
    dragLeave: safariCount = 1
    dragLeave: safariCount = 0 <-- user has left the document with the dragged file.
  */

  const onDragEnter = useCallback(
    ({ dataTransfer }: DragEvent) => {
      isSafari && setSafariCount(safariCount + 1);

      if (
        isWindowDragActive ||
        !dataTransfer ||
        dataTransfer.types.some((type) => type !== 'Files' && type !== 'application/x-moz-file')
      ) {
        return;
      }
      setIsWindowDragActive(true);
    },
    [isSafari, isWindowDragActive, safariCount],
  );

  const onDragLeave = useCallback(
    (event: DragEvent) => {
      if (isSafari) {
        setSafariCount(safariCount - 1);
        !safariCount && setTimeout(() => runInAction(() => setIsWindowDragActive(false)));
      } else if (!event.relatedTarget) {
        setTimeout(() => runInAction(() => setIsWindowDragActive(false)));
      }
    },
    [isSafari, safariCount],
  );

  const onDrop = useCallback(() => {
    isSafari && setSafariCount(0);

    setTimeout(() => runInAction(() => setIsWindowDragActive(false)));
  }, [isSafari]);

  useEffect(() => {
    document.addEventListener('dragenter', onDragEnter, { capture: true });
    document.addEventListener('dragleave', onDragLeave, { capture: true });
    document.addEventListener('drop', onDrop, { capture: true });

    return () => {
      document.removeEventListener('dragenter', onDragEnter, { capture: true });
      document.removeEventListener('dragleave', onDragLeave, { capture: true });
      document.removeEventListener('drop', onDrop, { capture: true });
    };
  }, [onDragEnter, onDragLeave, onDrop]);

  const addFileManager: DropzoneManagerContext['addFileManager'] = useCallback(
    (_fileManager) => {
      const tempFileManagerArr = fileManager;
      tempFileManagerArr.push(_fileManager);
      setFileManager(tempFileManagerArr);
    },
    [fileManager],
  );

  const removeFileManager: DropzoneManagerContext['removeFileManager'] = useCallback(
    (fileManagerId) => {
      const index = fileManager.findIndex(({ id }) => id === fileManagerId);
      const tempFileManagerArr = fileManager;
      tempFileManagerArr.splice(index, 1);
      setFileManager(tempFileManagerArr);
    },
    [fileManager],
  );

  const getFileManager: DropzoneManagerContext['getFileManager'] = useCallback(
    (fileManagerId) => fileManager.find(({ id }) => id === fileManagerId),
    [fileManager],
  );

  const onDropCallback: DropzoneManagerContext['onDrop'] = useCallback(
    (files, fileManagerId) => {
      const _fileManager = fileManager.find(({ id }) => id === fileManagerId);
      _fileManager && _fileManager.onDrop(files);
    },
    [fileManager],
  );

  const contextValue: DropzoneManagerContext = useMemo(
    () => ({
      onDrop: onDropCallback,
      addFileManager,
      removeFileManager,
      getFileManager,
      isWindowDragActive,
    }),
    [addFileManager, getFileManager, isWindowDragActive, onDropCallback, removeFileManager],
  );

  const fileManagerDropzones = useCallback(() => {
    const _fileManager = fileManager
      .filter(({ windowDropzone }) => windowDropzone?.show)
      .map(({ id, mode, disabled, validations, windowDropzone }) => (
        <Dropzone
          key={id}
          onDrop={(files) => onDropCallback(files, id)}
          mode={mode}
          isWindowDropzone={windowDropzone?.show}
          disabled={disabled}
          maxFileAmount={validations?.maxFileAmount?.value}
          accept={validations?.allowedFileTypes?.value}
        >
          {windowDropzone?.text}
        </Dropzone>
      ));

    return _fileManager.length ? _fileManager : null;
  }, [fileManager, onDropCallback]);

  return (
    <DropzoneManagerContext.Provider value={contextValue}>
      {isWindowDragActive && fileManagerDropzones() && (
        <Backdrop>
          <S.DropzoneManager>{fileManagerDropzones()}</S.DropzoneManager>
        </Backdrop>
      )}
      {children}
    </DropzoneManagerContext.Provider>
  );
});
