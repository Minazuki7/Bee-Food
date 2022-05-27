import { Navigate, NavigateProps } from 'react-router-dom';

const Redirect = (props: NavigateProps) => {
  return <Navigate replace {...props} />;
};

export default Redirect;
