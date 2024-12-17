import { NextFunction, Request, Response } from "express";
import { MESSAGES } from "../../utils/Messages";
import { ErrorApp, HandleResponseApi } from "../../utils/ResponseMapper";
import {
  createCableService,
  deleteCableService,
  getCableByIdService,
  getCableService,
  updateCableService,
} from "./cablesService";
import { MESSAGE_CODE } from "../../utils/MessageCode";
import { Status, TypeCable } from "@prisma/client";

export const getCableController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { page, perPage, type, locationId } = req.query;

  const cables = await getCableService({
    page: page ? Number(page) : undefined,
    perPage: perPage ? Number(perPage) : undefined,
    type: type
      ? (((type as string).charAt(0).toUpperCase() +
          (type as string).slice(1).toLowerCase()) as TypeCable)
      : undefined,
    locationId: locationId as string,
  });

  if (cables instanceof ErrorApp) {
    next(cables);
    return;
  }

  HandleResponseApi(
    res,
    200,
    MESSAGE_CODE.SUCCESS,
    MESSAGES.SUCCESS.CABLE.GET,
    cables.data,
    cables.meta
  );
};

export const getCableByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const cable = await getCableByIdService(id);

  if (cable instanceof ErrorApp) {
    next(cable);
    return;
  }

  HandleResponseApi(
    res,
    200,
    MESSAGE_CODE.SUCCESS,
    MESSAGES.SUCCESS.CABLE.GET,
    cable
  );
};

export const createCableController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cable = await createCableService({
    ...req.body,
    status: ((req.body.status as string).charAt(0).toUpperCase() +
      (req.body.status as string).slice(1).toLowerCase()) as Status,
  });

  if (cable instanceof ErrorApp) {
    next(cable);
    return;
  }

  HandleResponseApi(res, 201, MESSAGE_CODE.SUCCESS, MESSAGES.CREATED.CABLE);
};

export const updateCableController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const cable = await updateCableService({
    ...req.body,
    id,
    status: req.body.status
      ? (((req.body.status as string).charAt(0).toUpperCase() +
          (req.body.status as string).slice(1).toLowerCase()) as Status)
      : undefined,
  });

  if (cable instanceof ErrorApp) {
    next(cable);
    return;
  }

  HandleResponseApi(
    res,
    200,
    MESSAGE_CODE.SUCCESS,
    MESSAGES.SUCCESS.CABLE.UPDATE
  );
};

export const deleteCableController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const cable = await deleteCableService(id);
  if (cable instanceof ErrorApp) {
    next(cable);
    return;
  }

  HandleResponseApi(
    res,
    200,
    MESSAGE_CODE.SUCCESS,
    MESSAGES.SUCCESS.CABLE.DELETE
  );
};
