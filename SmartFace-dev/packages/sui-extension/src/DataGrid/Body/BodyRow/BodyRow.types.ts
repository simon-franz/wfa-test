import type { Row } from '@tanstack/react-table';
import type { HTMLAttributes, KeyboardEvent, MouseEvent } from 'react';

export type BodyRowProps = {
  row: Row<unknown> & {
    original: {
      onClick?: (event?: KeyboardEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>) => void;
    };
  };
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;
