import { memo, ReactNode, useEffect, useState } from 'react';

import AuthContext from '@contexts/AuthContext';
import startup from '@utils/startup';

import { User } from '@requests/user';

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isRefreshed, setIsRefreshed] = useState(false);
  const [user, setUser] = useState(null as User | null);
  const [startupEnded, setStartupEnded] = useState(false);

  useEffect(() => {
    if (startupEnded) {
      setIsRefreshed(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    startup().then((u) => {
      setUser(u);
      setStartupEnded(true);
      setIsRefreshed(true);
    });
  }, []);

  if (!startupEnded) return <div />;

  return (
    <AuthContext.Provider value={{ user, setUser, isRefreshed }}>
      {children}
    </AuthContext.Provider>
  );
};

export default memo(AuthProvider);
