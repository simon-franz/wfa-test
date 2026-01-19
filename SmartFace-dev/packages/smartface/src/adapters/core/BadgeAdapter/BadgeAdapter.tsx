import Badge from '@hrworks/sui-core/Badge';
import { MISSING_STRING } from '@hrworks/sui-shared';
import { observer } from 'mobx-react';
import { useContext } from 'react';

import { ComponentMapper } from '../../../main/components/ComponentMapper';
import { DefaultValueContext } from '../../../main/components/DefaultValueProvider';
import type { BadgeAdapterProps } from './BadgeAdapter.types';

export const BadgeAdapter = observer(({ text, anchor, ...otherProps }: BadgeAdapterProps) => {
  const { defaultSize } = useContext(DefaultValueContext);

  const _anchor = anchor && <ComponentMapper smartFaceComponent={anchor} />;
  const children = anchor ? text : text || MISSING_STRING;

  return <Badge anchor={_anchor} children={children} size={defaultSize} {...otherProps} />;
});
