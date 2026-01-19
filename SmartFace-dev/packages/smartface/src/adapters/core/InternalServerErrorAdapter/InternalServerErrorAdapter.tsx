import InternalServerError from '@hrworks/sui-core/InternalServerError';
import { MISSING_STRING } from '@hrworks/sui-shared';
import { observer } from 'mobx-react';
import { useContext } from 'react';

import { SmartFaceContext } from '../../../main/components/SmartFaceContext';
import type { InternalServerErrorAdapterProps } from './InternalServerErrorAdapter.types';

export const InternalServerErrorAdapter = observer(
  ({ id, title = MISSING_STRING, message = MISSING_STRING, ...otherProps }: InternalServerErrorAdapterProps) => {
    const { applyUpdates } = useContext(SmartFaceContext);

    const close = () => applyUpdates([{ operation: 'delete', targetSfId: id, path: null }]);

    return <InternalServerError id={id} title={title} message={message} close={close} {...otherProps} />;
  },
);
