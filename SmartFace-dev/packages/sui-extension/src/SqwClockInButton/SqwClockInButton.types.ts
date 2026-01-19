import type { HTMLAttributes, ReactNode } from 'react';

export type SqwClockInButtonProps = {
  label?: string;
  projectOrActivityDropdown?: ReactNode;
  projectOrActivityLabel?: string;
  startDateTime?: string;
  isActive?: boolean;
  onClockIn?: () => void;
  onClockOut?: () => void;
} & HTMLAttributes<HTMLDivElement>;
