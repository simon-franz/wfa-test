import FontAwesomeIcon from '@hrworks/sui-core/FontAwesomeIcon';
import { observer } from 'mobx-react';
import { useContext } from 'react';

import { SqwLayoutContext } from '../SqwLayoutContext';
import { S } from './SidebarToggle.styles';
import type { IconButtonProps } from '@hrworks/sui-core/IconButton/IconButton.types';

export const SidebarToggle = observer((props: IconButtonProps) => {
  const { isSidebarExpanded, setIsSidebarExpanded } = useContext(SqwLayoutContext);

  return (
    <S.SidebarToggle onClick={() => setIsSidebarExpanded(!isSidebarExpanded)} {...props}>
      <FontAwesomeIcon name="bars" variant="regular" />
    </S.SidebarToggle>
  );
});
