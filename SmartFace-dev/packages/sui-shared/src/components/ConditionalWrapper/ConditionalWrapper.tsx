import { observer } from 'mobx-react';

import type { ConditionalWrapperProps } from './ConditionalWrapper.types';

export const ConditionalWrapper = observer(({ children, condition, wrapper }: ConditionalWrapperProps) =>
  condition ? wrapper(children) : <>{children}</>,
);
