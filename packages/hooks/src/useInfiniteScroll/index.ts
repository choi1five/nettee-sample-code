import { useEffect, useState } from 'react';

import { useIntersectionObserver } from '@/useIntersectionObserver';

export interface CursorPaginationResponse<Data> {
  data: Data[];
  nextCursor: string | null;
  hasMore: boolean;
}

interface UseInfiniteScrollParameter<Data> {
  initialData?: CursorPaginationResponse<Data>;
  limit?: number;
  fetchMore: (cursor: string | null, limit: number) => Promise<CursorPaginationResponse<Data>>;
  threshold?: number;
  rootMargin?: string;
}

const DEFAULT_LIMIT = 10;

export const useInfiniteScroll = <Data, Target extends Element>({
  initialData,
  limit = DEFAULT_LIMIT,
  fetchMore,
  threshold = 0,
  rootMargin = '0px',
}: UseInfiniteScrollParameter<Data>) => {
  const [cursorData, setCursorData] = useState<CursorPaginationResponse<Data>[]>(initialData ? [initialData] : []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { targetRef, isIntersecting } = useIntersectionObserver<Target>({
    threshold,
    rootMargin,
  });

  useEffect(() => {
    const loadMore = async () => {
      const lastResult = cursorData.at(-1);

      if (!isIntersecting || !lastResult?.hasMore || isLoading) return;

      setIsLoading(true);
      setError(null);

      try {
        const newItems = await fetchMore(lastResult.nextCursor, limit);
        setCursorData(prev => [...prev, newItems]);
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
    items: cursorData.flatMap(item => item.data),
    hasMore: cursorData.at(-1)?.hasMore ?? true,
    isLoading,
    error,
  };
};
