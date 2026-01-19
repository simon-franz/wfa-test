import { Card, CardFooter, CardHeader, CardTitle } from '@hrworks/sui-core/Card';
import { CardBody } from '@hrworks/sui-core/Card/CardBody/CardBody';
import { observer } from 'mobx-react';
import { type MouseEvent, useContext } from 'react';

import { ComponentMapper, mapSmartFaceComponentsToAdapters } from '../../../main/components/ComponentMapper';
import { DefaultValueContext } from '../../../main/components/DefaultValueProvider';
import { SmartFaceContext } from '../../../main/components/SmartFaceContext';
import type { CardAdapterProps } from './CardAdapter.types';

export const CardAdapter = observer(
  ({
    toolbarChildren,
    bodyChildren,
    footerChildren,
    icon,
    onClick,
    title,
    subtitle,
    keepToolbarAlwaysOnTop = true,
    ...otherProps
  }: CardAdapterProps) => {
    const { applyEvents } = useContext(SmartFaceContext);
    const { defaultFullHeight } = useContext(DefaultValueContext);

    const _onClick =
      onClick &&
      ((event: MouseEvent) => {
        event.stopPropagation();
        applyEvents(onClick);
      });

    const _toolbarChildren = mapSmartFaceComponentsToAdapters(toolbarChildren);
    const _bodyChildren = mapSmartFaceComponentsToAdapters(bodyChildren);
    const _footerChildren = mapSmartFaceComponentsToAdapters(footerChildren);
    const _icon = icon && <ComponentMapper smartFaceComponent={icon} />;
    const hasHeaderContent = !!(title || subtitle || _icon || _toolbarChildren);

    return (
      <Card onClick={_onClick} fullHeight={defaultFullHeight} {...otherProps}>
        {hasHeaderContent && (
          <CardHeader wrapChildren={!keepToolbarAlwaysOnTop}>
            {(title || subtitle || _icon) && (
              <CardTitle icon={_icon} subtitle={subtitle}>
                {title}
              </CardTitle>
            )}
            {_toolbarChildren}
          </CardHeader>
        )}
        {_bodyChildren && <CardBody>{_bodyChildren}</CardBody>}
        {_footerChildren && <CardFooter>{_footerChildren}</CardFooter>}
      </Card>
    );
  },
);
