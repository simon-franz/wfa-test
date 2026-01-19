import type { HTMLAttributes } from 'react';

import { S } from './Divider.styles';

type DividerPropsType = HTMLAttributes<HTMLHRElement>;

export const Divider = (props: DividerPropsType) => <S.Divider {...props} />;
