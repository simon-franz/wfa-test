import { S } from './KeypadButton.styles';
import type { KeypadButtonProps } from './KeypadButton.types';

export const KeypadButton = (props: KeypadButtonProps) => <S.IconButton corner="rounded" {...props} />;
