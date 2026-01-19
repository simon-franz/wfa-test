import { WARNING_CODES } from '@hrworks/error-handling';
import { observer } from 'mobx-react';
import { useEffect } from 'react';

import type { FilterMenuProps } from './FilterMenu.types';

export const FilterMenu = observer((props: FilterMenuProps) => {
  useEffect(() => {
    console.warn(WARNING_CODES.UNSUPPORTED_FEATURE, 'You have the filter menu enabled, which is not implemented yet.');
  }, []);

  return (
    <div {...props}>
      <div>FilterMenu</div>
    </div>
  );
});
