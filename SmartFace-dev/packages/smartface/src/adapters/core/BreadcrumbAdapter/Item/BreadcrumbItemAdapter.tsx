import { BreadcrumbItem } from '@hrworks/sui-core/Breadcrumb/BreadcrumbItem/BreadcrumbItem';
import { MISSING_STRING } from '@hrworks/sui-shared';
import { observer } from 'mobx-react';
import { type MouseEvent, useContext } from 'react';

import { SmartFaceContext } from '../../../../main/components/SmartFaceContext';
import type { BreadcrumbItemAdapterProps } from '../Item/BreadcrumbItemAdapter.types';

export const BreadcrumbItemAdapter = observer(
  ({ text = MISSING_STRING, onClick, ...otherProps }: BreadcrumbItemAdapterProps) => {
    const { applyEvents } = useContext(SmartFaceContext);

    const _onClick =
      onClick &&
      ((event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();
        applyEvents(onClick);
      });

    return <BreadcrumbItem children={text} onClick={_onClick} {...otherProps} />;
  },
);
