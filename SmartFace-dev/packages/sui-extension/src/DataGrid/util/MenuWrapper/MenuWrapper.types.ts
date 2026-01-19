import type { FloatPropsType } from '@hrworks/sui-shared/components/Float';
import type { ReactNode } from 'react';

type MenuWrapperRenderProps = {
  anchorRef(ref: HTMLElement | null): void;
};

export type MenuWrapperProps = {
  children(props: MenuWrapperRenderProps): ReactNode;
  closeMenu(): void;
  menu: ReactNode | null;
  useAnchorRef?: boolean;
} & Pick<FloatPropsType, 'placement' | 'show'>;
