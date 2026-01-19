import { observer } from 'mobx-react';

import { S } from './HrworksUserWhatsNew.styles';
import type { HrworksUserWhatsNewProps } from './HrworksUserWhatsNew.types';

export const HrworksUserWhatsNew = observer((props: HrworksUserWhatsNewProps) => <S.Container {...props} />);
