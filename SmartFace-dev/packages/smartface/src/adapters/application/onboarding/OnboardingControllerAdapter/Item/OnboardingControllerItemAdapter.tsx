import type { OnboardingControllerItemProps } from '@hrworks/sui-extension/OnboardingController';
import { useContext } from 'react';

import { ComponentMapper, mapSmartFaceComponentsToAdapters } from '../../../../../main/components/ComponentMapper';
import { mapElementProps } from '../../../../../main/components/ComponentMapper/mapSmartFaceComponentPartsToAdapters';
import { SmartFaceContext } from '../../../../../main/components/SmartFaceContext';
import type { SfEventType } from '../../../../../types/shared/SfEventTypes';
import type { OnboardingControllerItemBackendDefinition } from './OnboardingControllerItemAdapter.types';

export const OnboardingControllerItemAdapter = (
  items: OnboardingControllerItemBackendDefinition[],
): OnboardingControllerItemProps[] => {
  const { applyEvents } = useContext(SmartFaceContext);

  return items.map((item) => {
    const {
      title,
      navigationTitle = title,
      componentChildren,
      navigationIcon,
      media,
      bottomArrowBar = {},
      topArrowBar = {},
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
    const _media = media && <ComponentMapper smartFaceComponent={media} />;
    const children = mapSmartFaceComponentsToAdapters(componentChildren);
    const _bottomArrowIcon = bottomArrowIcon && <ComponentMapper smartFaceComponent={bottomArrowIcon} />;
    const _onBottomArrowClick = onBottomArrowClick && (() => onArrowClick(onBottomArrowClick));
    const _topArrowIcon = topArrowIcon && <ComponentMapper smartFaceComponent={topArrowIcon} />;
    const _onTopArrowClick = onTopArrowClick && (() => onArrowClick(onTopArrowClick));

    return {
      title,
      navigationTitle,
      showBottomArrowBar,
      showTopArrowBar,
      navigationIcon: _navigationIcon,
      media: _media,
      children: children,
      bottomArrowDescription,
      bottomArrowIcon: _bottomArrowIcon,
      onBottomArrowClick: _onBottomArrowClick,
      topArrowDescription,
      topArrowIcon: _topArrowIcon,
      onTopArrowClick: _onTopArrowClick,
      ...otherItemProps,
    };
  });
};
