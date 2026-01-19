import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';

import { S } from './NestedChecklist.styles';
import type { NestedChecklistProps } from './NestedChecklist.types';
import { NestedChecklistContext } from './NestedChecklistContext';

export const NestedChecklist = observer(({ onFetchEntries, size, children }: NestedChecklistProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEntries = async () => {
      await onFetchEntries?.();
      setIsLoading(false);
    };
    fetchEntries();
  }, [onFetchEntries]);

  return (
    <NestedChecklistContext.Provider value={{ size }}>
      {children}
      {isLoading && <S.LoadingAnimation type="shimmer" count={3} />}
    </NestedChecklistContext.Provider>
  );
});
