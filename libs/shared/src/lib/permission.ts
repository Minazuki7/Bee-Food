export enum RESOURCE {
  ANY = "any",
  VENDOR = "vendor",
  COMPANY = "company",
  DRIVER = "driver",
  ROLE = "role",
  ADMIN = "admin",
  TRUCK = "truck",
  CITY = "city",
  GOVERNORATE = "governorate",
  ZONE = "zone",
  LOCALITY = "locality",
  DEPOSIT = "deposit",
  ORDER = "order",
  BRANCH = "branch",
  FRANCHISE = "franchise",
  USER = "user",
  CLIENT = "client",
  SUPER_ADMIN = "superadmin",
}

export enum PERMISSION_TYPE {
  ALL = "*",
  READ = "read",
  WRITE = "write",
  DELETE = "delete",
}

export interface Permission {
  resource: RESOURCE | RESOURCE[];
  permissions: PERMISSION_TYPE[];
}

export enum ROLE {
  ALL = "*",
  ADMIN = "admin",
  CLIENT = "client",
  SUPER_ADMIN = "superadmin",
  OWNER = "owner",
}
export enum ORDER_STATUS {
  sent = "sent",
  confirmed = "confirmed",
  canceled = "canceled",
  preparing = "preparing",
  ready = "ready",
  delivery = "delivery",
  delivered = "delivered",
  rejected = "rejected",
  refused = "refused",
}

export function isPermissionFound(
  permission: Permission,
  userPermissions: Permission[]
) {
  const { resource } = permission;
  if (resource === RESOURCE.ANY) return true;

  if (typeof resource === "string") {
    const userPermission = userPermissions.find(
      ({ resource: r }) => r === RESOURCE.ANY || r === resource
    );

    if (!userPermission) return false;

    return userPermission.permissions.some(
      (p) =>
        p === PERMISSION_TYPE.ALL ||
        permission.permissions.some((permissionType) => permissionType === p)
    );
  }

  const permissions = userPermissions.filter(({ resource: r }) =>
    resource.some((name) => r === name)
  );
  if (permissions.length < resource.length) return false;

  return permissions.every((p) => {
    p.permissions.some(
      (name) =>
        name === PERMISSION_TYPE.ALL ||
        permission.permissions.some((permissionType) => permissionType === name)
    );
  });
}
