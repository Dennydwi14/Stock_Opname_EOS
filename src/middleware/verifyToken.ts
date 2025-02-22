import { NextFunction, type Response, type Request } from "express";
import { TokenExpiredError, decode, verify } from 'jsonwebtoken';
import { MESSAGES } from "../utils/Messages";
import { MESSAGE_CODE } from "../utils/MessageCode";
import { environment } from "../config/dotenvConfig";
import { HandleResponseApi } from "../utils/ResponseMapper";
import { TokenDecodeInterface } from "./tokenTypes";
import { getUserById } from "../app/auth/authRepository.";

export const VerifyToken = (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        return HandleResponseApi(res, 401, MESSAGE_CODE.UNAUTHORIZED, MESSAGES.ERROR.UNAUTHORIZED.FORBIDDEN)
    }
    const token = req.headers.authorization.replace("Bearer ", "")
    verify(token, environment.JWT_SECRET as string, async (err) => {
        if (err) {
            if (err instanceof TokenExpiredError) {

                return HandleResponseApi(res, 401, MESSAGE_CODE.UNAUTHORIZED, MESSAGES.ERROR.UNAUTHORIZED.EXPIRED)
            }
            return HandleResponseApi(res, 401, MESSAGE_CODE.UNAUTHORIZED, MESSAGES.ERROR.INVALID.AUTH)
        }
        const decoded = decode(token) as TokenDecodeInterface;
        if (!(decoded as TokenDecodeInterface)?.id) {
            return HandleResponseApi(res, 401, MESSAGE_CODE.UNAUTHORIZED, MESSAGES.ERROR.UNAUTHORIZED.RECOGNIZED)
        }
        const user = await getUserById(decoded.id)
        if (!user) {
            return HandleResponseApi(res, 401, MESSAGE_CODE.UNAUTHORIZED, MESSAGES.ERROR.UNAUTHORIZED.RECOGNIZED)
        }
        req.params.user = JSON.stringify(user);
        req.params.userId = decoded?.id;
        req.params.token = token;
        next()
    })


}