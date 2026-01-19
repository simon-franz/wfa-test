import HeaderArea from '@hrworks/sui-extension/HeaderArea';
import { observer } from 'mobx-react';
import { useContext } from 'react';

import { mapSmartFaceComponentsToAdapters } from '../../../main/components/ComponentMapper';
import { DefaultValueContext } from '../../../main/components/DefaultValueProvider';
import type { HeaderAreaAdapterProps } from './HeaderAreaAdapter.types';
import type { HeaderAreaProps } from '@hrworks/sui-extension/HeaderArea/HeaderArea.types';

export const HeaderAreaAdapter = observer(
  ({
    title,
    subtitle,
    titleChildren,
    subtitleChildren,
    titleSize,
    subtitleSize,
    toolbarChildren,
    flexToolbarChildren,
    componentChildren,
    ...otherProps
  }: HeaderAreaAdapterProps) => {
    const { defaultFullHeight } = useContext(DefaultValueContext);
    const _toolbarChildren = mapSmartFaceComponentsToAdapters(toolbarChildren);
    const _flexToolbarChildren = mapSmartFaceComponentsToAdapters(flexToolbarChildren);
    const children = mapSmartFaceComponentsToAdapters(componentChildren);

    const header: HeaderAreaProps['header'] = {
      title,
      subtitle,
      titleChildren: mapSmartFaceComponentsToAdapters(titleChildren),
      subtitleChildren: mapSmartFaceComponentsToAdapters(subtitleChildren),
      titleSize,
      subtitleSize,
    };

    return (
      <HeaderArea
        header={header}
        toolbarChildren={_toolbarChildren}
        flexToolbarChildren={_flexToolbarChildren}
        children={children}
        fullHeight={defaultFullHeight}
        {...otherProps}
      />
    );
  },
);
