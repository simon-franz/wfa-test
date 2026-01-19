import { observer } from 'mobx-react';
import { useContext } from 'react';

import { HeadlessFileManagerContext } from '../HeadlessFileManagerContext';
import type { HeadlessFileListProps } from './HeadlessFileList.types';

export const HeadlessFileList = observer(({ children }: HeadlessFileListProps) => {
  const { fileList } = useContext(HeadlessFileManagerContext);

  return (
    <>
      {children({
        fileList,
      })}
    </>
  );
});
