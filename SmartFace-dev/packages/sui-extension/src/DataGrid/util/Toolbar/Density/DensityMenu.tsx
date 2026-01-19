import { observer } from 'mobx-react';

import { S } from './DensityMenu.styles';
import type { DensityMenuProps } from './DensityMenu.types';
import { Entry } from './Entry';

export const DensityMenu = observer((props: DensityMenuProps) => (
  <S.Menu {...props}>
    <Entry density="low" />
    <Entry density="medium" />
    <Entry density="high" />
  </S.Menu>
));
