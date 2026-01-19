import { observer } from 'mobx-react';

import { S } from './Iframe.styles';
import type { IframeProps } from './Iframe.types';

export const Iframe = observer((props: IframeProps) => <S.Iframe {...props} />);
