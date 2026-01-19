import Icon from '@hrworks/sui-core/Icon';
import { observer } from 'mobx-react';

import { S } from './ExpansionButton.styles';
import type { ExpansionButtonProps } from './ExpansionButton.types';

export const ExpansionButton = observer(({ expanded, ...otherProps }: ExpansionButtonProps) => (
  <S.Expander isExpanded={expanded} {...otherProps}>
    <Icon name="data-grid-expand" />
  </S.Expander>
));
