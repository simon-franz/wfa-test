import type { HTMLAttributes, ReactNode } from 'react';

import type { HeaderAreaTitleProps } from './Header/Title/HeaderAreaTitle.types';

export type HeaderAreaProps = {
  header: HeaderAreaTitleProps;
  toolbarChildren?: ReactNode[];
  flexToolbarChildren?: ReactNode[];
  fullHeight?: boolean;
} & HTMLAttributes<HTMLDivElement>;
