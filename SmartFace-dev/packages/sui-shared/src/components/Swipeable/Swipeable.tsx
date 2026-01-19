import { useSwipeable } from 'react-swipeable';

import type { SwipeableProps } from './Swipeable.types';

export const Swipeable = ({ className: classNameFromProps, children, ...otherProps }: SwipeableProps) => {
  const handlers = useSwipeable(otherProps);

  return (
    <div className={classNameFromProps} {...handlers}>
      {children}
    </div>
  );
};
