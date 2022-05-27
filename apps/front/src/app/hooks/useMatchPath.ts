import { matchPath, useLocation, useResolvedPath } from 'react-router-dom';

function useMatchPath(path: string, end?: boolean) {
  const resolvedPath = useResolvedPath(path);
  const location = useLocation();

  return matchPath({ path: resolvedPath.pathname, end }, location.pathname);
}

export default useMatchPath;
