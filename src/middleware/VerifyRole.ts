import { NextFunction, type Response, type Request } from "express";
import { MESSAGES } from "../utils/Messages";
import { MESSAGE_CODE } from "../utils/MessageCode";
import { HandleResponseApi } from "../utils/ResponseMapper";
import { VerifyToken } from "./verifyToken";
import { Role } from "@prisma/client";

export const VerifyRole = (requiredRole: Role) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = JSON.parse(req.params.user);

    if (!user || user.role !== requiredRole) {
      const roleKey =
        requiredRole.toUpperCase() as keyof typeof MESSAGES.ERROR.INVALID.ROLE;
      return HandleResponseApi(
        res,
        401,
        MESSAGE_CODE.UNAUTHORIZED,
        MESSAGES.ERROR.INVALID.ROLE[
          roleKey as keyof typeof MESSAGES.ERROR.INVALID.ROLE
        ] || MESSAGES.ERROR.INVALID.AUTH
      );
    }

    next();
  };
};

export const VerifyAdmin = [VerifyToken, VerifyRole(Role.ADMIN)];
export const VerifyUser = [VerifyToken, VerifyRole(Role.USER)];
export const VerifyLeader = [VerifyToken, VerifyRole(Role.LEADER)];