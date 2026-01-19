import { createContext } from 'react';

import type { FileManagerProps } from '../../FileManager';

export type FileManagerDropzoneProps = Pick<
  FileManagerProps,
  'mode' | 'validations' | 'disabled' | 'windowDropzone'
> & {
  id: string;
  onDrop: (files: File[]) => void;
};

export type DropzoneManagerContext = {
  onDrop: (files: File[], fileManagerId: string) => void;
  addFileManager: (argument: FileManagerDropzoneProps) => void;
  removeFileManager: (id: string) => void;
  getFileManager: (id: string) => FileManagerDropzoneProps | undefined;
  isWindowDragActive: boolean;
};

export const DropzoneManagerContext = createContext({} as DropzoneManagerContext);
