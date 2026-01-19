import { observer } from 'mobx-react';

import { Modals } from './Modals/Modals';
import type { PageProps } from './Page.types';
import { PageContext } from './PageContext';

export const Page = observer(({ modals, children, notifications, onDismissNotification }: PageProps) => {
  const contextValue: PageContext = {
    onDismissNotification,
    notifications,
  };

  return (
    <PageContext.Provider value={contextValue}>
      {children}
      <Modals modals={modals} />
    </PageContext.Provider>
  );
});
