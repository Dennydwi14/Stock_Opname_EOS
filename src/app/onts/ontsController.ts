import { NextFunction, Request, Response } from "express";
import { MESSAGES } from "../../utils/Messages";
import { ErrorApp, HandleResponseApi } from "../../utils/ResponseMapper";
import { createOntService, deleteOntService, getOntByIdService, getOntService, updateOntService } from "./ontsService";
import { MESSAGE_CODE } from "../../utils/MessageCode";
import { Status } from "@prisma/client";

export const getOntController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { page, perPage, search, status, locationId } = req.query;

  const onts = await getOntService({
    search: search as string,
    page: page ? Number(page) : undefined,
    perPage: perPage ? Number(perPage) : undefined,
    status: status
    ? ((status as string).charAt(0).toUpperCase() + (status as string).slice(1).toLowerCase()) as Status
    : undefined, 
    locationId: locationId as string
  });

  if (onts instanceof ErrorApp) {
    next(onts);
    return;
  }

  HandleResponseApi(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.ONT.GET, onts.data, onts.meta);
};

export const getOntByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const ont = await getOntByIdService(id);

  if (ont instanceof ErrorApp) {
    next(ont);
    return;
  }

  HandleResponseApi(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.ONT.GET, ont);
};

export const createOntController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ont = await createOntService({...req.body, status: ((req.body.status as string).charAt(0).toUpperCase() + (req.body.status as string).slice(1).toLowerCase()) as Status});

  if (ont instanceof ErrorApp) {
    next(ont);
    return;
  }

  HandleResponseApi(res, 201, MESSAGE_CODE.SUCCESS, MESSAGES.CREATED.ONT);
};

export const updateOntController = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const ont = await updateOntService({ ...req.body, id, status: req.body.status ? ((req.body.status as string).charAt(0).toUpperCase() + (req.body.status as string).slice(1).toLowerCase()) as Status : undefined });

  if (ont instanceof ErrorApp) {
    next(ont);
    return;
  }

  HandleResponseApi(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.ONT.UPDATE);
};

export const deleteOntController = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const ont = await deleteOntService(id);
  if (ont instanceof ErrorApp) {
    next(ont);
    return;
  }

  HandleResponseApi(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.ONT.DELETE);
};
