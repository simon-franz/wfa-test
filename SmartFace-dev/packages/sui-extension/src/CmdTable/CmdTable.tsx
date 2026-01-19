import { LocalizationContext } from '@hrworks/localization';
import { replacePlaceholder } from '@hrworks/sui-shared/functions/replacePlaceholder';
import { observer } from 'mobx-react';
import { useCallback, useContext } from 'react';

import { S } from './CmdTable.styles';
import type { CmdTableProps } from './CmdTable.types';

export const CmdTable = observer(
  ({ children, documentsCount, confirmedDocumentsCount, ...otherProps }: CmdTableProps) => {
    const { translate } = useContext(LocalizationContext);

    const confirmationStatus = useCallback(() => {
      return replacePlaceholder(translate('cmd-table-confirmed-status-2'), {
        '%1%': confirmedDocumentsCount,
        '%2%': documentsCount,
      });
    }, [confirmedDocumentsCount, documentsCount, translate]);

    return (
      <div {...otherProps}>
        <S.Title>{translate('cmd-table-title')}</S.Title>
        <S.ChildrenWrapper>{children}</S.ChildrenWrapper>
        <S.ConfirmationStatusWrapper>
          <S.ConfirmationStatus>{confirmationStatus()}</S.ConfirmationStatus>
        </S.ConfirmationStatusWrapper>
      </div>
    );
  },
);
