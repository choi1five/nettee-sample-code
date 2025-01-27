import { useEffect, useState } from 'react';

import { useIntersectionObserver } from '@/useIntersectionObserver';

export interface CursorPaginationResponse<T> {
  data: T[];
  nextCursor: string | null;
  hasMore: boolean;
}

interface UseInfiniteScrollParameter<T> {
  initialItems?: CursorPaginationResponse<T>;
  limit?: number;
  fetchMore: (cursor: string | null, limit: number) => Promise<CursorPaginationResponse<T>>;
  threshold?: number;
  rootMargin?: string;
}

const DEFAULT_LIMIT = 10;

export const useInfiniteScroll = <T, El extends Element>({
  initialItems,
  limit = DEFAULT_LIMIT,
  fetchMore,
  threshold = 0,
  rootMargin = '0px',
}: UseInfiniteScrollParameter<T>) => {
  const [items, setItems] = useState<CursorPaginationResponse<T>[]>(initialItems ? [initialItems] : []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { targetRef, isIntersecting } = useIntersectionObserver<El>({
    threshold,
    rootMargin,
  });

  useEffect(() => {
    const loadMore = async () => {
      const lastItem = items.at(-1);

      if (!isIntersecting || !lastItem?.hasMore || isLoading) return;

      setIsLoading(true);
      setError(null);

      try {
        const newItems = await fetchMore(lastItem.nextCursor, limit);
        setItems(prev => [...prev, newItems]);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isIntersecting]);

  return {
    targetRef,
    items: items.flatMap(item => item.data),
    hasMore: items.at(-1)?.hasMore ?? true,
    isLoading,
    error,
  };
};
