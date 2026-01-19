import type { AlignTitle, OverflowBehaviour, Size } from '@hrworks/types/shared/UiTypes';
import type { ElementType, HTMLAttributes, ReactNode } from 'react';

export type TitleBaseProps = {
  titleChildren?: ReactNode;
  size?: Size;
  uppercase?: boolean;
  alignTitle?: AlignTitle;
};

export type TitleProps = {
  titleContainerClassNames?: string;
  icon?: ReactNode;
  breakTitleChildrenWithChildren?: boolean;
  overflowBehaviour?: OverflowBehaviour;
  headerTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  as?: ElementType;
} & TitleBaseProps &
  HTMLAttributes<HTMLDivElement>;
