import { NextFunction, Request, Response } from "express";
import { MESSAGES } from "../../utils/Messages";
import { ErrorApp, HandleResponseApi } from "../../utils/ResponseMapper";
import { createLocationService, deleteLocationService, getLocationByIdService, getLocationService, updateLocationService } from "./locationService";
import { MESSAGE_CODE } from "../../utils/MessageCode";

export const getLocationController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { search, page, perPage } = req.query;

  const location = await getLocationService({
    search: search as string,
    page: page ? Number(page) : undefined,
    perPage: perPage ? Number(perPage) : undefined,
  });

  if (location instanceof ErrorApp) {
    next(location);
    return;
  }

  HandleResponseApi(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.LOCATION.GET, location.data, location.meta);
};

export const createLocationController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  const createLocation = await createLocationService({...req.body});

  if (createLocation instanceof ErrorApp) {
    next(createLocation);
    return;
  }
  HandleResponseApi(res, 201, MESSAGE_CODE.SUCCESS, MESSAGES.CREATED.LOCATION);
};

export const getLocationByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const location = await getLocationByIdService(id);

  if (location instanceof ErrorApp) {
    next(location);
    return;
  }

  HandleResponseApi(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.LOCATION.GET, location);
};

export const updateLocationController = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const location = await updateLocationService({...req.body, id});

  if (location instanceof ErrorApp) {
    next(location);
    return;
  }

  HandleResponseApi(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.LOCATION.UPDATE);
}

export const deleteLocationController = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const location = await deleteLocationService(id);
  if (location instanceof ErrorApp) {
    next(location);
  }
  HandleResponseApi(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.LOCATION.DELETE)
}