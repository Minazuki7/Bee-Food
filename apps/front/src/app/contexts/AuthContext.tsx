import { createContext } from 'react';
import { User } from '@requests/user';

export default createContext<{
  user: User | null;
  setUser: (user: User | null) => void;
  isRefreshed: boolean;
}>({
  user: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUser: () => {},
  isRefreshed: false,
});
