import { SqwDropdownMenu } from '@hrworks/sui-extension/SqwDropdownMenu';
import { observer } from 'mobx-react';

import { ComponentMapper } from '../../../../main/components/ComponentMapper';
import { mapSqwDropdownMenuComponentPart } from './mapSqwDropdownMenuComponentPart';
import type { SqwDropdownMenuBackendProps } from './SqwDropdownMenuAdapter.types';

export const SqwDropdownMenuAdapter = observer(
  ({ icon, badge, componentParts, ...otherProps }: SqwDropdownMenuBackendProps) => {
    const _icon = icon && <ComponentMapper smartFaceComponent={icon} />;
    const _badge = badge && <ComponentMapper smartFaceComponent={badge} />;
    const items = componentParts.map((componentPart) => mapSqwDropdownMenuComponentPart(componentPart));

    return <SqwDropdownMenu icon={_icon} badge={_badge} items={items} {...otherProps} />;
  },
);
