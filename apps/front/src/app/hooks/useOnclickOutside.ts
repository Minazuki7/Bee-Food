import { useEffect, RefObject } from 'react';

export default function (handler: (e: Event) => void, ...refs: RefObject<HTMLElement | null>[]) {
  useEffect(() => {
    const listener = (event: Event) => {
      if (refs.find((ref) => ref.current && ref.current.contains(event.target as any))) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [refs, handler]);
}
