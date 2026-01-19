import { observer } from 'mobx-react';
import { type HTMLAttributes, useContext } from 'react';

import { SqwLayoutContext } from '../SqwLayoutContext';
import { S } from './Backdrop.styles';

export const Backdrop = observer((props: HTMLAttributes<HTMLDivElement>) => {
  const { isSidebarExpanded, setIsSidebarExpanded } = useContext(SqwLayoutContext);

  return <S.Backdrop isVisible={isSidebarExpanded} onClick={() => setIsSidebarExpanded(false)} {...props} />;
});
