import { Tab } from '@hrworks/sui-core/Tabs/Tab/Tab';
import { MISSING_STRING } from '@hrworks/sui-shared';
import { observer } from 'mobx-react';
import { useContext } from 'react';

import { SmartFaceContext } from '../../../../../main/components/SmartFaceContext';
import type { TabAdapterProps } from './TabAdapter.types';

export const TabAdapter = observer(
  ({
    title = MISSING_STRING,
    onBeforeInitialSelect,
    onBeforeSelect,
    onAfterInitialSelect,
    onAfterSelect,
    onDeselect,
    ...otherProps
  }: TabAdapterProps) => {
    const { applyEvents } = useContext(SmartFaceContext);

    const _onBeforeInitialSelect = onBeforeInitialSelect && (() => applyEvents(onBeforeInitialSelect));
    const _onBeforeSelect = onBeforeSelect && (() => applyEvents(onBeforeSelect));
    const _onAfterInitialSelect = onAfterInitialSelect && (() => applyEvents(onAfterInitialSelect));
    const _onAfterSelect = onAfterSelect && (() => applyEvents(onAfterSelect));
    const _onDeselect = onDeselect && (() => applyEvents(onDeselect));

    return (
      <Tab
        children={title}
        onBeforeInitialSelect={_onBeforeInitialSelect}
        onBeforeSelect={_onBeforeSelect}
        onAfterInitialSelect={_onAfterInitialSelect}
        onAfterSelect={_onAfterSelect}
        onDeselect={_onDeselect}
        {...otherProps}
      />
    );
  },
);
