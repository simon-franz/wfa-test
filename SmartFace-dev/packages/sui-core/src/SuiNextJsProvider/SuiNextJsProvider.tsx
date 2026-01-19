'use client';
import { EmotionCacheProvider } from '@hrworks/sui-shared';

import SuiProvider from '../SuiProvider';
import type { SuiNextJsProviderProps } from './SuiNextJsProvider.types';

export const SuiNextJsProvider = (props: SuiNextJsProviderProps) => (
  <EmotionCacheProvider>
    <SuiProvider {...props} />
  </EmotionCacheProvider>
);
