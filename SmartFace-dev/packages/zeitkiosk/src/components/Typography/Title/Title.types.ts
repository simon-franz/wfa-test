import type { TitleProps as TitleComponentProps } from '@hrworks/sui-core/Title/Title.types';

export type TitleProps = {
  type?: 'title' | 'subtitle';
} & TitleComponentProps;
