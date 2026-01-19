import type { ButtonHTMLAttributes } from 'react';

import type { IconButtonProps } from '@hrworks/sui-core/IconButton/IconButton.types';

export type NavigationButtonBaseProps = {
  direction: 'prev' | 'next';
  onPrevButtonClick?: () => void;
  onNextButtonClick?: () => void;
};

export type NavigationButtonProps = IconButtonProps &
  NavigationButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement>;
