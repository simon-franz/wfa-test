import { CmdTableItem } from '@hrworks/sui-extension/CmdTable';
import { MISSING_STRING } from '@hrworks/sui-shared';
import { observer } from 'mobx-react';
import { useContext } from 'react';

import { SmartFaceContext } from '../../../../../main/components/SmartFaceContext';
import type { CmdTableItemAdapterProps } from './CmdTableItemAdapter.types';

export const CmdTableItemAdapter = observer(
  ({ title = MISSING_STRING, url = '', onButtonClick, ...otherProps }: CmdTableItemAdapterProps) => {
    const { applyEvents } = useContext(SmartFaceContext);

    const _onButtonClick = () => onButtonClick && applyEvents(onButtonClick);

    return <CmdTableItem title={title} url={url} onClick={_onButtonClick} {...otherProps} />;
  },
);
