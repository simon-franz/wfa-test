import { S } from './Button.styles';
import type { ButtonProps } from '@hrworks/sui-core/Button/Button.types';

export const Button = (props: ButtonProps) => <S.Button variant="unstyled" {...props} />;
