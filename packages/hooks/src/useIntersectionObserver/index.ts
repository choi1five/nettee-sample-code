import { useEffect, useState } from 'react';

interface IntersectionObserverParameter {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
  onChange?: (isIntersecting: boolean) => void;
  triggerOnce?: boolean;
}

interface IntersectionState {
  isIntersecting: boolean;
  entry?: IntersectionObserverEntry;
}

interface IntersectionObserverResult<El extends Element> {
  targetRef: (target: El | null) => void;
  isIntersecting: boolean;
  entry?: IntersectionObserverEntry;
}

export const useIntersectionObserver = <El extends Element>({
  threshold,
  root,
  rootMargin,
  onChange,
  triggerOnce,
}: IntersectionObserverParameter = {}): IntersectionObserverResult<El> => {
  const [target, setTarget] = useState<Element | null>(null);
  const [intersection, setIntersection] = useState<IntersectionState>({
    isIntersecting: false,
    entry: undefined,
  });

  useEffect(() => {
    if (!target) return;

    const element = target;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry?.isIntersecting ?? false;
        setIntersection({ isIntersecting, entry });
        onChange?.(isIntersecting);

        if (entry?.isIntersecting && triggerOnce) {
          observer.unobserve(element);
        }
      },
      {
        threshold,
        root,
        rootMargin,
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [target, threshold, root, rootMargin, triggerOnce, onChange]);

  return {
    targetRef: setTarget,
    ...intersection,
  };
};
