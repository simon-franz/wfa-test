import type { HTMLAttributes, ReactNode } from 'react';

import type { FileManagerProps } from '../FileManager';

export type DropzoneProps = Pick<FileManagerProps, 'mode' | 'disabled'> & {
  onDrop: (files: File[]) => void;
  accept?: Required<Required<FileManagerProps>['validations']>['allowedFileTypes']['value'];
  maxFileAmount?: Required<Required<FileManagerProps>['validations']>['maxFileAmount']['value'];
  alternativeChildren?: ReactNode;
  isWindowDropzone?: boolean;
} & Omit<HTMLAttributes<HTMLDivElement>, 'onDrop'>;
