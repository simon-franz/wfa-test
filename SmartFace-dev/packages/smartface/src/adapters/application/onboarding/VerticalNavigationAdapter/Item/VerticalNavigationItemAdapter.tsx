import type { VerticalNavigationItemProps } from '@hrworks/sui-extension/VerticalNavigation';
import { useContext } from 'react';

import { ComponentMapper, mapSmartFaceComponentsToAdapters } from '../../../../../main/components/ComponentMapper';
import { mapElementProps } from '../../../../../main/components/ComponentMapper/mapSmartFaceComponentPartsToAdapters';
import { SmartFaceContext } from '../../../../../main/components/SmartFaceContext';
import type { SfEventType } from '../../../../../types/shared/SfEventTypes';
import type { VerticalNavigationItemBackendDefinition } from './VerticalNavigationItemAdapter.types';

export const VerticalNavigationItemAdapter = (
  items: VerticalNavigationItemBackendDefinition[],
): VerticalNavigationItemProps[] => {
  const { applyEvents } = useContext(SmartFaceContext);

  return items.map((item) => {
    const {
      componentChildren,
      navigationIcon,
      topArrowBar = {},
      bottomArrowBar = {},
      ...otherItemProps
    } = mapElementProps(item);

    const {
      description: bottomArrowDescription,
      icon: bottomArrowIcon,
      onClick: onBottomArrowClick,
      show: showBottomArrowBar,
    } = bottomArrowBar;

    const {
      description: topArrowDescription,
      icon: topArrowIcon,
      onClick: onTopArrowClick,
      show: showTopArrowBar,
    } = topArrowBar;

    const onArrowClick = (onArrowClick: SfEventType) => {
      applyEvents(onArrowClick);
    };

    const _navigationIcon = navigationIcon && <ComponentMapper smartFaceComponent={navigationIcon} />;
    const children = mapSmartFaceComponentsToAdapters(componentChildren);
    const _bottomArrowIcon = bottomArrowIcon && <ComponentMapper smartFaceComponent={bottomArrowIcon} />;
    const _onBottomArrowClick = onBottomArrowClick && (() => onArrowClick(onBottomArrowClick));
    const _topArrowIcon = topArrowIcon && <ComponentMapper smartFaceComponent={topArrowIcon} />;
    const _onTopArrowClick = onTopArrowClick && (() => onArrowClick(onTopArrowClick));

    return {
      children,
      bottomArrowDescription,
      showBottomArrowBar,
      showTopArrowBar,
      bottomArrowIcon: _bottomArrowIcon,
      onBottomArrowClick: _onBottomArrowClick,
      topArrowDescription,
      topArrowIcon: _topArrowIcon,
      onTopArrowClick: _onTopArrowClick,
      navigationIcon: _navigationIcon,
      ...otherItemProps,
    };
  });
};
