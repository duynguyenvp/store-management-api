import { RoleRepository } from "../models/roles";

export const checkPermission = permission => {
  return (req, res, next) => {
    const userRole = req.user ? req.user.role : "anonymous";
    const userPermissions = RoleRepository.getPermissionsByRoleName(
      userRole
    );

    if (userPermissions.includes(permission)) {
      return next();
    } else {
      return res.error("Access denied. You don't have permission to access.", 403);
    }
  };
};
