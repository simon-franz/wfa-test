import type { NumberInputBackendProps } from './InputFieldBackendProps';

export type NumberInputFieldBackendProps = NumberInputBackendProps & {
  padFractionalZeros?: boolean;
  normalizeZeros?: boolean;
  mapToRadix?: string[];
  radix?: string;
  scale?: number;
};
