import type { CreateEventType } from '@hrworks/types/shared/SfEventTypes';
import type { AxiosProgressEvent, AxiosRequestConfig } from 'axios';
import type { ReactNode } from 'react';

import type { FileManagerProps } from '../FileManager.types';

type HeadlessFileManagerRenderProps = {
  errorMessage: string;
};

export type FileManagerPostEvent = CreateEventType<'file-manager-post'> & {
  targetSfIds?: string[];
};

export type FileManagerUploadedEvent = CustomEvent<{ targetSfIds: string[] }>;

export type FileManagerUploadProgressEvent = CustomEvent<
  AxiosProgressEvent & Required<Pick<FileManagerPostEvent, 'targetSfIds'>>
>;

export type HeadlessFileManagerProps = {
  id: string;
  mode: FileManagerProps['mode'];
  name: string;
  onValueChange: FileManagerProps['onValueChange'];
  value: FileManagerProps['value'];
  children: (render: HeadlessFileManagerRenderProps) => ReactNode;
  disabled?: boolean;
  windowDropzone?: Required<Required<FileManagerProps>['windowDropzone']>;
  onUploadProgress?: AxiosRequestConfig['onUploadProgress'];
  onAddFiles?: FileManagerProps['onAddFiles'];
  onRemoveFiles?: FileManagerProps['onRemoveFiles'];
  validations?: FileManagerProps['validations'];
};
