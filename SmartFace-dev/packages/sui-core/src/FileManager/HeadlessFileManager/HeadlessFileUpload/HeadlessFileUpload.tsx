import { observer } from 'mobx-react';
import { type ChangeEventHandler, useContext, useState } from 'react';

import { HeadlessFileManagerContext } from '../HeadlessFileManagerContext';
import type { HeadlessFileUploadProps } from './HeadlessFileUpload.types';

export const HeadlessFileUpload = observer(({ children }: HeadlessFileUploadProps) => {
  const { addFiles, mode, allowedFileTypes } = useContext(HeadlessFileManagerContext);
  const [value, setValue] = useState('');

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) {
      return;
    }
    addFiles([...files]);
    setValue('');
  };

  return (
    <>
      {children({
        onChange,
        value,
        multiple: mode !== 'single',
        accept: (allowedFileTypes?.value || []).join(','),
      })}
    </>
  );
});
