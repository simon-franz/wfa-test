import type { IObservableValue } from 'mobx';
import { createContext } from 'react';

import type { FileManagerValue } from '../FileManager.types';
import type { HeadlessFileManagerProps } from './HeadlessFileManager.types';
import type { FileModel } from './Models/File';

type FileProps = (FileManagerValue | FileModel) & {
  displayName: string;
  remove: () => void;
  progress?: IObservableValue<number | null> | null;
  size?: number;
  displayUrl?: string;
  ignoreSize?: boolean;
};

export type HeadlessFileManagerContext = {
  addFiles: (files: File[]) => void;
  fileList: FileProps[];
  mode: HeadlessFileManagerProps['mode'];
  disabled: HeadlessFileManagerProps['disabled'];
  maxFileAmount: Required<HeadlessFileManagerProps>['validations']['maxFileAmount'];
  allowedFileTypes?: Required<HeadlessFileManagerProps>['validations']['allowedFileTypes'];
};

export const HeadlessFileManagerContext = createContext<HeadlessFileManagerContext>({} as HeadlessFileManagerContext);
