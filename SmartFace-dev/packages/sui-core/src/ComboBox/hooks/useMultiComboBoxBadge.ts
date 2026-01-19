import { type MouseEvent, useCallback, useContext } from 'react';

import { HeadlessComboBoxContext } from '../';

type UseMultiComboBoxBadgeReturn = {
  disabled: boolean;
  readOnly: boolean;
  remove(event: MouseEvent<HTMLElement>): void;
};

export const useMultiComboBoxBadge = (id: string): UseMultiComboBoxBadgeReturn => {
  const { disabled, readOnly, remove: removeFromContext } = useContext(HeadlessComboBoxContext);

  // Removing a badge by clicking on X
  const remove = useCallback<UseMultiComboBoxBadgeReturn['remove']>(
    (event) => {
      event.stopPropagation();
      removeFromContext(id);
    },
    [id, removeFromContext],
  );

  return { disabled, readOnly, remove };
};
