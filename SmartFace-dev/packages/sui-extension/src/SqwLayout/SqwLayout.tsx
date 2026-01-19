import { Notifications } from '@hrworks/sui-core/ClassicLayout/Notifications';
import { PageContext } from '@hrworks/sui-core/Page/PageContext';
import { observer } from 'mobx-react';
import { useContext, useMemo, useState } from 'react';

import { Backdrop, Content, Header, Sidebars, type SqwLayoutProps } from './';
import { S } from './SqwLayout.styles';
import { SqwLayoutContext, type SqwLayoutContextProps } from './SqwLayoutContext';

export const SqwLayout = observer(({ header, sidebar, content }: SqwLayoutProps) => {
  const { notifications } = useContext(PageContext);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const contextValue = useMemo<SqwLayoutContextProps>(
    () => ({
      isSidebarExpanded,
      setIsSidebarExpanded,
    }),
    [isSidebarExpanded],
  );

  return (
    <SqwLayoutContext.Provider value={contextValue}>
      <S.LayoutContainer>
        <Header {...header} />
        <Sidebars header={header} sidebar={sidebar} />
        <Content {...content} />
        <Backdrop />
        <Notifications notifications={notifications} />
      </S.LayoutContainer>
    </SqwLayoutContext.Provider>
  );
});
