import { useEffect, useState } from 'react';

export const useTabState = (selectedItemId?: string, defaultSelectedItemId?: string) => {
  if (!selectedItemId && !defaultSelectedItemId) {
    console.warn('Either selectedItemId or defaultSelectedItemId should be provided.');
  }

  const [internalSelectedId, setInternalSelectedId] = useState(() => {
    if (selectedItemId !== undefined && defaultSelectedItemId !== undefined) {
      console.warn(
        'You are providing both selectedItemId and defaultSelectedItemId. The component will be treated as controlled.',
      );
    }

    return defaultSelectedItemId || selectedItemId || '';
  });

  const isControlled = selectedItemId !== undefined;
  const activeId = isControlled ? selectedItemId : internalSelectedId;

  useEffect(() => {
    if (isControlled && selectedItemId !== activeId) {
      setInternalSelectedId(selectedItemId);
    }
  }, [isControlled, selectedItemId, activeId]);

  return { activeId, setInternalSelectedId, isControlled };
};
