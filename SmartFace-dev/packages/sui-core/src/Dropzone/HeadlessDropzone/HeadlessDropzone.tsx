import { observer } from 'mobx-react';
import { type ReactElement, useContext } from 'react';
import ReactDropzone, { type DropzoneState } from 'react-dropzone';

import { HeadlessFileManagerContext } from '../../FileManager';
import { DropzoneManagerContext, type DropzoneProps } from '../';

type HeadlessDropzoneRenderProps = {
  isWindowDragActive: boolean;
} & DropzoneState;

export type HeadlessDropzoneProps = Pick<DropzoneProps, 'mode' | 'onDrop' | 'accept' | 'maxFileAmount' | 'disabled'> & {
  children: (props: HeadlessDropzoneRenderProps) => ReactElement;
};

export const HeadlessDropzone = observer(({ children, mode, onDrop, disabled, accept }: HeadlessDropzoneProps) => {
  const { isWindowDragActive } = useContext(DropzoneManagerContext);
  const fileManagerContext = useContext(HeadlessFileManagerContext);
  const hasFileManager = fileManagerContext?.addFiles !== undefined;

  return (
    <ReactDropzone
      onDrop={(accepted, rejected) => onDrop([...accepted, ...rejected.map(({ file }) => file)])}
      multiple={mode === 'growing' || mode === 'multi'}
      accept={accept && Object.fromEntries(accept.map((entry) => [entry, []]))}
      disabled={disabled}
      noClick={!hasFileManager}
    >
      {(props) =>
        children({
          isWindowDragActive,
          ...props,
        })
      }
    </ReactDropzone>
  );
});
