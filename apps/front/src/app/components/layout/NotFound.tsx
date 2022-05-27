import Redirect from '@components/ui/Redirect';
import AuthContext from '@contexts/AuthContext';
import { useContext } from 'react';

const NotFound = () => {
  const { isRefreshed } = useContext(AuthContext);

  if (!isRefreshed) return <Redirect to="/" />;

  return <div>404</div>;
};

export default NotFound;
