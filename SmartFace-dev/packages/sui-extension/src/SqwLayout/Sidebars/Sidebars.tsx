import { observer } from 'mobx-react';
import { useCallback, useContext, useEffect } from 'react';

import { Branding } from '../Branding';
import { SidebarToggle } from '../SidebarToggle';
import { SqwLayoutContext } from '../SqwLayoutContext';
import { S } from './Sidebars.styles';
import type { SidebarsProps } from './Sidebars.types';

export const Sidebars = observer(({ header, sidebar, ...otherProps }: SidebarsProps) => {
  const { isSidebarExpanded, setIsSidebarExpanded } = useContext(SqwLayoutContext);

  const onKeyDown = useCallback(
    ({ key }: KeyboardEvent) => {
      isSidebarExpanded && key === 'Escape' && setIsSidebarExpanded(false);
    },
    [isSidebarExpanded, setIsSidebarExpanded],
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);

  return (
    <>
      <S.DesktopSidebar {...sidebar} {...otherProps} />
      <S.MobileSidebar
        isExpanded={isSidebarExpanded}
        brandingElement={
          <Branding {...header?.logo}>
            <SidebarToggle variant="subtle" />
          </Branding>
        }
        showUpperSidebarChildren
        {...sidebar}
      />
    </>
  );
});
