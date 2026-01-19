import Section from '@hrworks/sui-core/Section';
import { MISSING_STRING } from '@hrworks/sui-shared';
import { observer } from 'mobx-react';
import { useContext } from 'react';

import { mapSmartFaceComponentsToAdapters } from '../../../main/components/ComponentMapper';
import { DefaultValueContext } from '../../../main/components/DefaultValueProvider';
import { SmartFaceContext } from '../../../main/components/SmartFaceContext';
import type { SectionAdapterProps, SectionBackendProps } from './SectionAdapter.types';

export const SectionAdapter = observer(
  ({ componentChildren, titleChildren, title, id, divider, ...otherProps }: SectionAdapterProps) => {
    const { applyUpdates } = useContext(SmartFaceContext);
    const { defaultSize } = useContext(DefaultValueContext);

    const onExpandedChange: SectionBackendProps['onExpandedChange'] = (expanded) => {
      applyUpdates([{ operation: 'write', targetSfId: id, path: 'props.expanded', value: expanded }]);
    };

    const children = mapSmartFaceComponentsToAdapters(componentChildren);
    const _titleChildren = mapSmartFaceComponentsToAdapters(titleChildren);
    const _title = title || (!divider && !titleChildren?.length ? MISSING_STRING : undefined);

    return (
      <Section
        children={children}
        titleChildren={_titleChildren}
        divider={divider}
        id={id}
        title={_title}
        onExpandedChange={onExpandedChange}
        size={defaultSize}
        expanded={true}
        {...otherProps}
      />
    );
  },
);
