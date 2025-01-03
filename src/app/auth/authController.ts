import { NextFunction, Request, Response } from "express";
import { loginService, logoutService } from "./authService";
import { ErrorApp, HandleResponseApi } from "../../utils/ResponseMapper";
import { MESSAGE_CODE } from "../../utils/MessageCode";
import { MESSAGES } from "../../utils/Messages";
import { LoginAuthResponse } from "./authTypes";

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
  // const { email, password } = req.body
  const { body } = req

  const login = await loginService(body);
  if (login instanceof ErrorApp) {
      next(login)
      return
  }
  res.cookie("access_token", login, { httpOnly: true })
  HandleResponseApi<LoginAuthResponse>(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.LOGIN, login as LoginAuthResponse)
}

export const logoutController = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.replace("Bearer ", "")
  const logout = await logoutService(token as string)

  if (logout instanceof ErrorApp) {
      next(logout)
      return
  }

  HandleResponseApi(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.LOGOUT)
}

export const checkToken = async (
  req: Request,
  res: Response,
) => {
  HandleResponseApi(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.CHECK)
}