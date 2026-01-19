import { observer } from 'mobx-react';
import { useState } from 'react';

import { ControlledVerticalNavigation } from './ControlledVerticalNavigation';
import type { ControlledVerticalNavigationProps, VerticalNavigationProps } from './VerticalNavigation.types';

export const VerticalNavigation = observer((props: VerticalNavigationProps) => {
  const [activeItemId, setActiveItemId] = useState<ControlledVerticalNavigationProps['activeItemId']>();

  return <ControlledVerticalNavigation activeItemId={activeItemId} setActiveItemId={setActiveItemId} {...props} />;
});
