import { Suspense, lazy, ComponentType, ComponentProps } from 'react';
import FullScreenLoader from '@components/ui/FullScreenLoader';

export default function <T extends ComponentType<any>>(
  path: () => Promise<{ default: T }>
) {
  const Component = lazy(path);

  return function (props: ComponentProps<T>) {
    return (
      <Suspense fallback={<FullScreenLoader />}>
        <Component {...props} />
      </Suspense>
    );
  };
}
