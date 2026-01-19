import { SuiThemeContext } from '@hrworks/design-system';
import DropdownMenu from '@hrworks/sui-core/DropdownMenu';
import getId from '@hrworks/sui-shared/functions/getId';
import defaultsDeep from 'lodash/defaultsDeep';
import { observer } from 'mobx-react';
import { useContext, useRef } from 'react';

import { ComponentMapper } from '../../../main/components/ComponentMapper';
import { mapSmartFaceComponentPartsToAdapter } from '../../../main/components/ComponentMapper/mapSmartFaceComponentPartsToAdapters';
import { getSmartFaceIconComponent } from '../../../main/lib/getSmartFaceIconComponent';
import { isSmartFaceComponent } from '../../../main/lib/isSmartFaceComponent';
import { ButtonAdapter } from '../ButtonAdapter';
import { IconButtonAdapter } from '../IconButtonAdapter';
import { DropdownMenuDividerAdapter } from './Divider/DropdownMenuDividerAdapter';
import type { DropdownMenuAdapterProps, DropdownMenuComponentPartBackendDefinition } from './DropdownMenuAdapter.types';
import { DropdownMenuEntryAdapter } from './Entry/DropdownMenuEntryAdapter';
import { DropdownMenuSectionAdapter } from './Section/DropdownMenuSectionAdapter';

export const mapDropdownMenuComponentPart = ({
  sfComponentPart,
  ...adapterProps
}: DropdownMenuComponentPartBackendDefinition) => {
  switch (sfComponentPart) {
    case 'Section':
      return mapSmartFaceComponentPartsToAdapter(DropdownMenuSectionAdapter, [adapterProps]);
    case 'Entry':
      return mapSmartFaceComponentPartsToAdapter(DropdownMenuEntryAdapter, [adapterProps]);
    case 'Divider':
      return mapSmartFaceComponentPartsToAdapter(DropdownMenuDividerAdapter, [adapterProps]);
  }
};

export const DropdownMenuAdapter = observer(
  ({ trigger, componentParts, title, ...otherProps }: DropdownMenuAdapterProps) => {
    const { iconSet } = useContext(SuiThemeContext);

    const isSfComponent = isSmartFaceComponent(trigger);
    const isSfButton = isSfComponent && trigger.sfComponent === 'Button';
    const isSfIconButton = isSfComponent && trigger.sfComponent === 'IconButton';
    const iconSfId = useRef(getId());

    const getTriggerComponent = ({ open }: { open: boolean }) => {
      if (isSfComponent && !isSfButton && !isSfIconButton) {
        return <ComponentMapper smartFaceComponent={trigger} />;
      }

      const icon = getSmartFaceIconComponent(
        iconSet,
        open ? 'dropdown-arrow-up' : 'dropdown-arrow-down',
        iconSfId.current,
      );

      if (isSfButton) {
        return <ButtonAdapter {...defaultsDeep({}, trigger?.props, { rightIcon: icon })} />;
      }

      return <IconButtonAdapter {...defaultsDeep({}, trigger?.props, { icon })} />;
    };

    const items = componentParts?.map((element) => mapDropdownMenuComponentPart(element));
    const _title = title || (isSfButton && trigger.props?.text) || undefined;

    return <DropdownMenu title={_title} trigger={getTriggerComponent} items={items} {...otherProps} />;
  },
);
