import ClassicLayout from '@hrworks/sui-core/ClassicLayout';
import { observer } from 'mobx-react';
import { type MouseEvent, useContext } from 'react';

import { mapSmartFaceComponentsToAdapters } from '../../../main/components/ComponentMapper';
import { SmartFaceContext } from '../../../main/components/SmartFaceContext';
import type { ClassicLayoutAdapterProps } from './ClassicLayoutAdapter.types';

export const ClassicLayoutAdapter = observer(
  ({ content, footer, header, sidebar, logo, ...otherProps }: ClassicLayoutAdapterProps) => {
    const { applyEvents } = useContext(SmartFaceContext);

    const _onLogoClick = (event: MouseEvent<HTMLElement>) => {
      event.preventDefault();
      event.stopPropagation();
      applyEvents(logo!.onClick!);
    };

    const _content = content && {
      children: mapSmartFaceComponentsToAdapters(content?.componentChildren),
      headerChildren: mapSmartFaceComponentsToAdapters(content?.header?.componentChildren),
      headerFixed: content?.header?.fixed,
    };
    const _footer = footer && { children: mapSmartFaceComponentsToAdapters(footer?.componentChildren) };
    const _header = header && {
      children: mapSmartFaceComponentsToAdapters(header?.componentChildren),
      flexComponentChildren: mapSmartFaceComponentsToAdapters(header?.flexComponentChildren),
    };
    const _sidebar = sidebar && { children: mapSmartFaceComponentsToAdapters(sidebar?.componentChildren) };
    const _logo = logo && {
      ...logo,
      onClick: logo?.onClick && _onLogoClick,
    };

    return (
      <ClassicLayout
        header={_header}
        content={_content}
        footer={_footer}
        sidebar={_sidebar}
        logo={_logo}
        {...otherProps}
      />
    );
  },
);
