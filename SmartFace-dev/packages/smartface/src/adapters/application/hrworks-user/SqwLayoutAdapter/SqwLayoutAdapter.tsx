import VisibilityHandler from '@hrworks/sui-core/VisibilityHandler';
import { SqwLayout } from '@hrworks/sui-extension/SqwLayout';
import getId from '@hrworks/sui-shared/functions/getId';
import { observer } from 'mobx-react';
import { type MouseEvent, useContext } from 'react';

import { mapSmartFaceComponentsToAdapters } from '../../../../main/components/ComponentMapper';
import { mapSmartFaceComponentPartsToAdapter } from '../../../../main/components/ComponentMapper/mapSmartFaceComponentPartsToAdapters';
import { SmartFaceContext } from '../../../../main/components/SmartFaceContext';
import { SqwClockInButtonAdapter } from '../SqwClockInButtonAdapter';
import { SqwDropdownMenuAdapter } from '../SqwDropdownMenuAdapter';
import type { DropdownMenuEntryBackendDefinition } from '../SqwDropdownMenuAdapter/DropdownMenuEntryAdapter/DropdownMenuEntryAdapter.types';
import type { SqwDropdownMenuBackendDefinition } from '../SqwDropdownMenuAdapter/SqwDropdownMenuAdapter.types';
import { SqwProfileMenuAdapter } from '../SqwProfileMenuAdapter';
import { SqwSupportMenuAdapter } from '../SqwSupportMenuAdapter';
import type { SqwLayoutAdapterProps } from './SqwLayoutAdapter.types';
import type { SqwLayoutProps } from '@hrworks/sui-extension/SqwLayout/SqwLayout.types';

export const SqwLayoutAdapter = observer(
  ({ contentChildren, borderless, header = {}, sidebarChildren, ...otherProps }: SqwLayoutAdapterProps) => {
    const { applyEvents } = useContext(SmartFaceContext);
    const { logo, profileMenu, supportMenu, clockInButton, dropdowns } = header;

    const mergeHeaderDropdowns = (dropdowns: SqwDropdownMenuBackendDefinition[]): SqwDropdownMenuBackendDefinition => {
      const mergedComponentParts: DropdownMenuEntryBackendDefinition[] = [];
      dropdowns.forEach((dropdown) => {
        const { props = {}, sfComponent, ...otherAdapterProps } = dropdown;
        const { presentation, title, badge, icon, componentParts, ...otherProps } = props;
        mergedComponentParts.push({
          sfComponentPart: 'Entry',
          props: { text: title, badge, icon, componentParts: componentParts, ...otherProps },
          ...otherAdapterProps,
        });
      });

      return {
        sfComponent: 'SqwDropdownMenu',
        sfId: getId(),
        props: { presentation: 'collapsibleMenu' as const, componentParts: mergedComponentParts },
      };
    };

    const onLogoClick = (event: MouseEvent<HTMLElement>) => {
      event.preventDefault();
      event.stopPropagation();
      logo?.onClick && applyEvents(logo.onClick);
    };

    const content: SqwLayoutProps['content'] = {
      children: mapSmartFaceComponentsToAdapters(contentChildren),
      borderless,
    };

    const sidebar: SqwLayoutProps['sidebar'] = {
      upperSidebarChildren:
        dropdowns?.length &&
        mapSmartFaceComponentPartsToAdapter(SqwDropdownMenuAdapter, [mergeHeaderDropdowns(dropdowns)]),
      children: mapSmartFaceComponentsToAdapters(sidebarChildren),
    };

    const _header: SqwLayoutProps['header'] = {
      rightItems: (
        <>
          {clockInButton && (
            <VisibilityHandler visible=">=lg">
              {mapSmartFaceComponentPartsToAdapter(SqwClockInButtonAdapter, [clockInButton])}
            </VisibilityHandler>
          )}
          {supportMenu && mapSmartFaceComponentPartsToAdapter(SqwSupportMenuAdapter, [supportMenu])}
          {profileMenu && mapSmartFaceComponentPartsToAdapter(SqwProfileMenuAdapter, [profileMenu])}
        </>
      ),
      logo: logo && {
        onClick: logo.onClick && onLogoClick,
        target: logo.target,
        href: logo.href,
        alt: logo.alt,
        src: logo.src,
      },
      leftItems: mapSmartFaceComponentPartsToAdapter(SqwDropdownMenuAdapter, dropdowns),
    };

    return <SqwLayout content={content} sidebar={sidebar} header={_header} {...otherProps} />;
  },
);
