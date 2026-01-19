import { observer } from 'mobx-react';

import { S } from './Body.styles';
import type { BodyProps } from './Body.types';

export const Body = observer((props: BodyProps) => <S.Body {...props} />);
