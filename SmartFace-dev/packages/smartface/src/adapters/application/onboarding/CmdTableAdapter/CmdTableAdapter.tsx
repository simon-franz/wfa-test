import { CmdTable } from '@hrworks/sui-extension/CmdTable';
import { observer } from 'mobx-react';

import { mapSmartFaceComponentPartsToAdapter } from '../../../../main/components/ComponentMapper/mapSmartFaceComponentPartsToAdapters';
import { type CmdTableAdapterProps, CmdTableItemAdapter } from './';

export const CmdTableAdapter = observer(({ items, ...otherProps }: CmdTableAdapterProps) => {
  const confirmedDocumentsCount = items?.filter((item) => item.props?.confirmed).length || 0;
  const documentsCount = items?.length || 0;

  const children = mapSmartFaceComponentPartsToAdapter(CmdTableItemAdapter, items);

  return (
    <CmdTable
      documentsCount={documentsCount}
      confirmedDocumentsCount={confirmedDocumentsCount}
      children={children}
      {...otherProps}
    />
  );
});
