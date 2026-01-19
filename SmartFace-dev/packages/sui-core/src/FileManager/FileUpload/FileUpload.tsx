import { observer } from 'mobx-react';
import { type MouseEvent, useRef } from 'react';

import { HeadlessFileUpload } from '../';
import { S } from './FileUpload.styles';
import type { FileUploadProps } from './FileUpload.types';

export const FileUpload = observer(({ children, disabled, ...otherProps }: FileUploadProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onClick = (event: MouseEvent<HTMLElement>) => {
    if (!inputRef.current || disabled) {
      return;
    }

    event.stopPropagation();
    inputRef.current.click();
  };

  return (
    <HeadlessFileUpload>
      {({ onChange, value, multiple, accept }) => (
        <div {...otherProps}>
          <S.UploadButton onClick={disabled ? undefined : onClick} disabled={disabled}>
            {children}
          </S.UploadButton>
          <input
            ref={inputRef}
            hidden
            aria-hidden
            accept={accept}
            type="file"
            multiple={multiple}
            onChange={onChange}
            value={value}
            data-get-form-data-ignore
          />
        </div>
      )}
    </HeadlessFileUpload>
  );
});
