import { NextFunction, Request, Response } from "express";
import { MESSAGES } from "../../utils/Messages";
import { ErrorApp, HandleResponseApi } from "../../utils/ResponseMapper";
import {
  createStbService,
  deleteStbService,
  getStbByIdService,
  getStbService,
  updateStbService,
} from "./stbsService";
import { MESSAGE_CODE } from "../../utils/MessageCode";
import { Status } from "@prisma/client";

export const getStbController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { page, perPage, search, status, locationId, deviceLocation } =
    req.query;

  const stbs = await getStbService({
    search: search as string,
    page: page ? Number(page) : undefined,
    perPage: perPage ? Number(perPage) : undefined,
    deviceLocation: deviceLocation
      ? (((deviceLocation as string).charAt(0).toUpperCase() +
          (deviceLocation as string).slice(1).toLowerCase()) as Status)
      : undefined,
    status: status as string,
    locationId: locationId as string,
  });

  if (stbs instanceof ErrorApp) {
    next(stbs);
    return;
  }

  HandleResponseApi(
    res,
    200,
    MESSAGE_CODE.SUCCESS,
    MESSAGES.SUCCESS.STB.GET,
    stbs.data,
    stbs.meta
  );
};

export const getStbByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const stb = await getStbByIdService(id);

  if (stb instanceof ErrorApp) {
    next(stb);
    return;
  }

  HandleResponseApi(
    res,
    200,
    MESSAGE_CODE.SUCCESS,
    MESSAGES.SUCCESS.STB.GET,
    stb
  );
};

export const createStbController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const stb = await createStbService({
    ...req.body,
    deviceLocation: ((req.body.deviceLocation as string).charAt(0).toUpperCase() +
      (req.body.deviceLocation as string).slice(1).toLowerCase()) as Status,
  });

  if (stb instanceof ErrorApp) {
    next(stb);
    return;
  }

  HandleResponseApi(res, 201, MESSAGE_CODE.SUCCESS, MESSAGES.CREATED.STB);
};

export const updateStbController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const stb = await updateStbService({
    ...req.body,
    id,
    deviceLocation: req.body.deviceLocation
      ? (((req.body.deviceLocation as string).charAt(0).toUpperCase() +
          (req.body.deviceLocation as string).slice(1).toLowerCase()) as Status)
      : undefined,
  });

  if (stb instanceof ErrorApp) {
    next(stb);
    return;
  }

  HandleResponseApi(
    res,
    200,
    MESSAGE_CODE.SUCCESS,
    MESSAGES.SUCCESS.STB.UPDATE
  );
};

export const deleteStbController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const stb = await deleteStbService(id);
  if (stb instanceof ErrorApp) {
    next(stb);
    return;
  }

  HandleResponseApi(
    res,
    200,
    MESSAGE_CODE.SUCCESS,
    MESSAGES.SUCCESS.STB.DELETE
  );
};
