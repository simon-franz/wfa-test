import type { HTMLAttributes, ReactNode } from 'react';
import type { SwipeableProps as ReactSwipeableProps } from 'react-swipeable';

export type SwipeableProps = {
  children?: ReactNode;
} & ReactSwipeableProps &
  HTMLAttributes<HTMLDivElement>;
