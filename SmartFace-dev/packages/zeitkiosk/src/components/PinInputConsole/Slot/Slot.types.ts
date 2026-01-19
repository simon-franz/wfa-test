import type { SlotProps } from 'input-otp';
import type { HTMLAttributes } from 'react';

export type ExtendedSlotProps = { index: number } & SlotProps & HTMLAttributes<HTMLDivElement>;
