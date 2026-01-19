import { observer } from 'mobx-react';
import { useState } from 'react';

import { MenuWrapper } from '../../MenuWrapper/MenuWrapper';
import { S } from './ToolbarButton.styles';
import type { ToolbarButtonProps } from './ToolbarButton.types';

export const ToolbarButton = observer(({ children, icon, menu, ...otherProps }: ToolbarButtonProps) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <S.Wrapper>
      <MenuWrapper
        useAnchorRef
        menu={menu}
        show={showMenu}
        closeMenu={() => setShowMenu(false)}
        placement="bottom-start"
      >
        {({ anchorRef }) => (
          <S.Button
            variant="subtle"
            ref={anchorRef}
            onClick={() => setShowMenu((prevState) => !prevState)}
            {...otherProps}
          >
            <S.Icon>{icon}</S.Icon>
            {children}
          </S.Button>
        )}
      </MenuWrapper>
    </S.Wrapper>
  );
});
