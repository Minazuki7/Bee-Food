import { SetMetadata } from "@nestjs/common";
import { ROLES as RolesEnum } from "../enums/role.enum";

export const ROLES = "ROLES";
export const Role = RolesEnum;
export const Roles = (...roles: string[]) => SetMetadata(ROLES, roles);
