import { useEffect, useState } from 'react';
interface IntersectionState {
  isIntersecting: boolean;
  entry?: IntersectionObserverEntry;
}

interface IntersectionObserverParameter {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
  onChange?: (intersection: IntersectionState) => void;
  triggerOnce?: boolean;
}

interface IntersectionObserverResult<Target extends Element> {
  targetRef: (target: Target | null) => void;
  isIntersecting: boolean;
  entry?: IntersectionObserverEntry;
}

export const useIntersectionObserver = <Target extends Element>({
  threshold = 0,
  root = null,
  rootMargin = '0px',
  onChange,
  triggerOnce = false,
}: IntersectionObserverParameter = {}): IntersectionObserverResult<Target> => {
  const [target, setTarget] = useState<Target | null>(null);
  const [intersection, setIntersection] = useState<IntersectionState>({
    isIntersecting: false,
    entry: undefined,
  });

  useEffect(() => {
    if (!target) return;

    const element = target;

    const handleIntersection = ([entry]: IntersectionObserverEntry[]) => {
      const isIntersecting = entry?.isIntersecting ?? false;
      setIntersection({ isIntersecting, entry });
      onChange?.({ isIntersecting, entry });

      if (isIntersecting && triggerOnce) {
        observer.unobserve(element);
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      root,
      rootMargin,
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [target, threshold, root, rootMargin, triggerOnce, onChange]);

  return {
    targetRef: setTarget,
    ...intersection,
  };
};
