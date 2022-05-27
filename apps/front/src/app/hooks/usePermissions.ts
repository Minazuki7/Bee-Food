import { PERMISSION_TYPE, RESOURCE } from '@shared/permission';
import { useMemo } from 'react';
import { uniq } from 'lodash';
import useUser from './useUser';

export default function usePermissions(resource: RESOURCE): [boolean, boolean] {
  const user = useUser();

  return useMemo(() => {
    const permissions =
      uniq(
        user?.permissions
          .filter((p) => p.resource === resource || p.resource === RESOURCE.ANY)
          .map((p) => p.permissions)
          .flat()
      ) || [];

    const canWrite = permissions.some(
      (p) => p === PERMISSION_TYPE.ALL || p === PERMISSION_TYPE.WRITE
    );

    const canDelete = permissions.some(
      (p) => p === PERMISSION_TYPE.ALL || p === PERMISSION_TYPE.DELETE
    );

    return [canWrite, canDelete];
  }, [user, resource]);
}
