import type { ChangeEventHandler, ReactNode } from 'react';

export type HeadlessFileUploadProps = {
  children: (renderProps: {
    multiple: boolean;
    onChange: ChangeEventHandler<HTMLInputElement>;
    value: string;
    accept?: string;
  }) => ReactNode;
};
