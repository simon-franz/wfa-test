import { createContext } from 'react';

import type { ClassicLayoutProps } from './ClassicLayout.types';

export type ClassicLayoutContext = {
  hasSidebar: boolean;
  isDesktopSidebarExpanded: boolean;
  isMobileSidebarExpanded: boolean;
  isDesktopSidebarVisible: boolean;
  desktopSidebarTogglerMode: ClassicLayoutProps['desktopSidebarTogglerMode'];
  setIsMobileSidebarExpanded: (value: boolean) => void;
  onToggleSidebar: () => void;
};

export const ClassicLayoutContext = createContext<ClassicLayoutContext>({} as ClassicLayoutContext);
