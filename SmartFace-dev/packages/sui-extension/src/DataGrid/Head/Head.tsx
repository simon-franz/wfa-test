import { observer } from 'mobx-react';
import { createElement, useState } from 'react';

import { MenuWrapper } from '../util/MenuWrapper/MenuWrapper';
import { ColumnsMenu } from '../util/Toolbar/Columns';
import { DensityMenu } from '../util/Toolbar/Density';
import { S } from './Head.styles';
import type { HeadProps } from './Head.types';
import { DataGridHeadContext } from './HeadContext';

const menu = {
  columns: ColumnsMenu,
  density: DensityMenu,
} as const;

export const Head = observer(({ children, ...otherProps }: HeadProps) => {
  const [toolbarMenu, setToolbarMenu] = useState<DataGridHeadContext['toolbarMenu']>(null);

  return (
    <DataGridHeadContext.Provider value={{ toolbarMenu, setToolbarMenu }}>
      <MenuWrapper
        menu={toolbarMenu && createElement(menu[toolbarMenu])}
        show={toolbarMenu != null}
        closeMenu={() => setToolbarMenu(null)}
        placement="bottom-start"
      >
        {({ anchorRef }) => (
          <S.Head ref={anchorRef} {...otherProps}>
            {children}
          </S.Head>
        )}
      </MenuWrapper>
    </DataGridHeadContext.Provider>
  );
});
