import { NextFunction, Request, Response } from "express";
import {
  changePasswordService,
  deleteUserService,
  getUserService,
  loginService,
  logoutService,
  registerService,
  updateUserService,
} from "./authService";
import { ErrorApp, HandleResponseApi } from "../../utils/ResponseMapper";
import { MESSAGE_CODE } from "../../utils/MessageCode";
import { MESSAGES } from "../../utils/Messages";
import { LoginAuthResponse } from "./authTypes";
import { Role } from "@prisma/client";

export const getUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { page, perPage, search, role } = req.query;

  const user = await getUserService({
    search: search as string,
    page: page ? Number(page) : undefined,
    perPage: perPage ? Number(perPage) : undefined,
    role: role ? (role.toString().toUpperCase() as Role) : undefined,
  });

  if (user instanceof ErrorApp) {
    next(user);
    return;
  }

  HandleResponseApi(
    res,
    200,
    MESSAGE_CODE.SUCCESS,
    MESSAGES.SUCCESS.USER.GET,
    user.data,
    user.meta
  );
};

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const { email, password } = req.body
  const { body } = req;

  const login = await loginService(body);
  if (login instanceof ErrorApp) {
    next(login);
    return;
  }
  res.cookie("access_token", login, { httpOnly: true });
  HandleResponseApi<LoginAuthResponse>(
    res,
    200,
    MESSAGE_CODE.SUCCESS,
    MESSAGES.SUCCESS.LOGIN,
    login as LoginAuthResponse
  );
};

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { body } = req;

  const register = await registerService({
    ...body,
    role: body.role ? (body.role.toUpperCase() as Role) : Role.USER,
  });

  if (register instanceof ErrorApp) {
    next(register);
    return;
  }
  HandleResponseApi(
    res,
    201,
    MESSAGE_CODE.SUCCESS,
    MESSAGES.CREATED.USER.ACCOUNT
  );
};

export const updateUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const user = await updateUserService({
    ...req.body,
    id,
    role: req.body.role ? (req.body.role.toUpperCase() as Role) : undefined,
  });

  if (user instanceof ErrorApp) {
    next(user);
    return;
  }

  HandleResponseApi(
    res,
    200,
    MESSAGE_CODE.SUCCESS,
    MESSAGES.SUCCESS.USER.UPDATE
  );
};

export const logoutController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  const logout = await logoutService(token as string);

  if (logout instanceof ErrorApp) {
    next(logout);
    return;
  }

  HandleResponseApi(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.LOGOUT);
};

export const deleteUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const user = await deleteUserService(id);
  if (user instanceof ErrorApp) {
    next(user);
    return;
  }

  HandleResponseApi(
    res,
    200,
    MESSAGE_CODE.SUCCESS,
    MESSAGES.SUCCESS.USER.DELETE
  );
};

export const checkToken = async (req: Request, res: Response) => {
  HandleResponseApi(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.CHECK);
};

export const changePasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const { email, password } = req.body
  const { body } = req;
  const { id } = req.params;

  const change = await changePasswordService({ id, ...body });
  if (change instanceof ErrorApp) {
    next(change);
    return;
  }
  HandleResponseApi<LoginAuthResponse>(
    res,
    200,
    MESSAGE_CODE.SUCCESS,
    MESSAGES.SUCCESS.CHANGE_PASSWORD
  );
};
