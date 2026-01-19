import { HrworksAdminLayout } from '@hrworks/sui-extension/HrworksAdminLayout';
import { observer } from 'mobx-react';
import { type MouseEvent, useContext } from 'react';

import { mapSmartFaceComponentsToAdapters } from '../../../../main/components/ComponentMapper';
import { SmartFaceContext } from '../../../../main/components/SmartFaceContext';
import type { HrworksAdminLayoutAdapterProps } from './HrworksAdminLayoutAdapter.types';
import { NavItemAdapter } from './NavItem/NavItemAdapter';

export const HrworksAdminLayoutAdapter = observer(
  ({
    activeNavigationItemSfId,
    header = {},
    contentHeaderChildren,
    contentChildren,
    ...otherProps
  }: HrworksAdminLayoutAdapterProps) => {
    const { applyEvents } = useContext(SmartFaceContext);
    const _contentHeaderChildren = mapSmartFaceComponentsToAdapters(contentHeaderChildren);
    const _contentChildren = mapSmartFaceComponentsToAdapters(contentChildren);
    const activeNavigationItemId = activeNavigationItemSfId;

    const { logo = {}, navigationItems, componentChildren } = header;
    const { onClick, target, href, alt, src } = logo;

    const onLogoClick = (event: MouseEvent<HTMLElement>) => {
      event.preventDefault();
      event.stopPropagation();
      onClick && applyEvents(onClick);
    };

    const _header = {
      logo: {
        onClick: onClick && onLogoClick,
        target,
        href,
        alt,
        src,
      },
      navigationItems: navigationItems?.map(({ sfId, ...otherProps }) => (
        <NavItemAdapter sfId={sfId} key={sfId} {...otherProps} />
      )),
      children: mapSmartFaceComponentsToAdapters(componentChildren),
    };

    return (
      <HrworksAdminLayout
        contentHeaderChildren={_contentHeaderChildren}
        header={_header}
        children={_contentChildren}
        activeNavigationItemId={activeNavigationItemId}
        {...otherProps}
      />
    );
  },
);
