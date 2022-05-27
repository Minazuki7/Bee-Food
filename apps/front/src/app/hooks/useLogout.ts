import AuthContext from '@contexts/AuthContext';
import { useLogout as useLogoutRequest } from '@requests/auth';
import localforage from 'localforage';
import { useContext } from 'react';

function useLogout() {
  const { setUser } = useContext(AuthContext);
  const [logout] = useLogoutRequest();

  const onLogout = () => {
    localforage
      .getItem<string>('auth')
      .then((data) => {
        if (data) {
          const authData = JSON.parse(data);
          logout({
            variables: { refreshToken: authData.token.refreshToken },
          });
        }
        localforage.removeItem('auth');
        setUser(null);
      })
      .catch(() => {
        localforage.removeItem('auth');
        setUser(null);
      });
  };

  return onLogout;
}

export default useLogout;
