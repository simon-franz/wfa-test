import type { FormComponentProps } from '@hrworks/types/shared/UiTypes';
import type { HTMLAttributes, ReactNode } from 'react';

export type FileManagerValue = {
  id: string;
  displayName: string;
  size?: number;
  displayUrl?: string;
  ignoreSize?: boolean;
};

type FileManagerValidation<T> = {
  value: T;
  errorMessage?: string;
};

export type FileManagerValidations = {
  allowedFileTypes?: FileManagerValidation<string[]> & {
    extensions?: string[];
  }; // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
  maxFileAmount?: FileManagerValidation<number>;
  sizeOfAllFiles?: FileManagerValidation<number>;
  sizeOfSingleFile?: FileManagerValidation<number>;
  emptyFile?: FileManagerValidation<boolean>;
};

export type FileManagerProps = Omit<FormComponentProps, 'mandatory' | 'size' | 'label'> & {
  mode: 'single' | 'multi' | 'growing';
  value: FileManagerValue[];
  showList?: boolean;
  onValueChange?: (value: FileManagerProps['value']) => void;
  onAddFiles?: () => void;
  onRemoveFiles?: () => void;
  trigger?: ReactNode;
  windowDropzone?: {
    show?: boolean;
    text?: string;
  };
  validations?: FileManagerValidations;
} & HTMLAttributes<HTMLDivElement>;
