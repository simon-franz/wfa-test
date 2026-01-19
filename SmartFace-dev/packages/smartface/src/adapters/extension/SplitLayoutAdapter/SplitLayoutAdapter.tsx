import SplitLayout from '@hrworks/sui-extension/SplitLayout';
import { observer } from 'mobx-react';
import { type MouseEvent, useContext } from 'react';

import { mapSmartFaceComponentsToAdapters } from '../../../main/components/ComponentMapper';
import { SmartFaceContext } from '../../../main/components/SmartFaceContext';
import type { SplitLayoutAdapterProps } from './SplitLayoutAdapter.types';

export const SplitLayoutAdapter = observer(
  ({ sidebarChildren, componentChildren, logo, ...otherProps }: SplitLayoutAdapterProps) => {
    const { applyEvents } = useContext(SmartFaceContext);

    const onLogoClick = (event: MouseEvent<HTMLElement>) => {
      event.preventDefault();
      event.stopPropagation();
      logo?.onClick && applyEvents(logo.onClick);
    };

    const _logo = logo && {
      onClick: logo.onClick && onLogoClick,
      target: logo.target,
      href: logo.href,
      alt: logo.alt,
      src: logo.src,
    };

    const _sidebarChildren = mapSmartFaceComponentsToAdapters(sidebarChildren);
    const children = mapSmartFaceComponentsToAdapters(componentChildren);

    return <SplitLayout sidebarChildren={_sidebarChildren} children={children} logo={_logo} {...otherProps} />;
  },
);
