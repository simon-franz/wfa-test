import type { ReactNode } from 'react';

import type { HeadlessFileManagerContext } from '../HeadlessFileManagerContext';

export type HeadlessFileListProps = {
  // eslint-disable-next-line @stylistic/ts/object-curly-newline
  children: (renderProps: { fileList: HeadlessFileManagerContext['fileList'] }) => ReactNode;
};
