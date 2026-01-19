import type { ButtonHTMLAttributes } from 'react';

import type { ButtonProps } from '../Button/Button.types';

export type IconButtonProps = Omit<ButtonProps, 'leftIcon' | 'rightIcon' | 'fullWidth' | 'text'> &
  ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement>;
