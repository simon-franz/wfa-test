import { useCallback, useRef, useState } from 'react';

import type { HeadlessComboBoxOption, HeadlessComboBoxResponse } from '../';

type CacheEntry = {
  more: boolean;
  isLoading: boolean;
  lastLoadedPage: number;
  options: HeadlessComboBoxOption[];
};

export const useCache = (
  getResult: (query: string, page: number) => Promise<HeadlessComboBoxResponse>,
  getResultDelay: number,
) => {
  const [queryCache, setQueryCache] = useState<Record<string, CacheEntry>>({});
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  const getDebouncedResult = useCallback(
    (query: string, page: number) =>
      new Promise<HeadlessComboBoxResponse | null>((resolve) => {
        if (timeoutId.current) {
          clearTimeout(timeoutId.current);
        }
        timeoutId.current = setTimeout(async () => {
          const result = await getResult(query, page);
          resolve(result);
        }, getResultDelay);
      }),
    [getResult, getResultDelay],
  );

  const getCurrentCache = useCallback((query: string) => queryCache[query] || null, [queryCache]);

  const getResultForQuery = useCallback(
    async (query: string) => {
      const currentCache = queryCache[query] || {
        isLoading: true,
        more: true,
        options: [],
        lastLoadedPage: 0,
      };

      setQueryCache((prev) => ({ ...prev, [query]: { ...currentCache, isLoading: true } }));

      const result = await getDebouncedResult(query, currentCache.lastLoadedPage + 1);

      if (result == null) {
        setQueryCache((prev) => ({ ...prev, [query]: { ...currentCache, isLoading: false } }));

        return;
      }

      setQueryCache((prev) => ({
        ...prev,
        [query]: {
          isLoading: false,
          more: !!result.pagination?.more,
          lastLoadedPage: currentCache.lastLoadedPage + 1,
          options: [...currentCache.options, ...result.results],
        },
      }));
    },
    [getDebouncedResult, queryCache],
  );

  return {
    getCurrentCache,
    getResult: getResultForQuery,
  };
};
