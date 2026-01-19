import { createContext } from 'react';

import type { PageProps } from './Page.types';

export type PageContext = {
  onDismissNotification: PageProps['onDismissNotification'];
  notifications: PageProps['notifications'];
};

export const PageContext = createContext<PageContext>({} as PageContext);
