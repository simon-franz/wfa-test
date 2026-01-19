import { observer } from 'mobx-react';
import { useContext } from 'react';

import { TabsContext } from '../TabsContext';
import { S } from './TabPanel.styles';
import type { TabPanelProps } from './TabPanel.types';

export const TabPanel = observer(({ children, id, ...otherProps }: TabPanelProps) => {
  const { isSelected, fullHeight } = useContext(TabsContext);
  const selected = isSelected(id);

  return (
    <S.TabPanel
      id={id}
      key={id}
      aria-labelledby={id}
      role="tabpanel"
      hidden={!selected}
      fullHeight={fullHeight}
      {...otherProps}
    >
      {children}
    </S.TabPanel>
  );
});
