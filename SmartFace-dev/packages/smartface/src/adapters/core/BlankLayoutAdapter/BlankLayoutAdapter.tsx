import BlankLayout from '@hrworks/sui-core/BlankLayout';
import { observer } from 'mobx-react';
import { type MouseEvent, useContext } from 'react';

import { mapSmartFaceComponentsToAdapters } from '../../../main/components/ComponentMapper';
import { SmartFaceContext } from '../../../main/components/SmartFaceContext';
import type { BlankLayoutAdapterProps } from './BlankLayoutAdapter.types';

export const BlankLayoutAdapter = observer(({ logo, componentChildren, ...otherProps }: BlankLayoutAdapterProps) => {
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

  const children = mapSmartFaceComponentsToAdapters(componentChildren);

  return <BlankLayout logo={_logo} children={children} {...otherProps} />;
});
