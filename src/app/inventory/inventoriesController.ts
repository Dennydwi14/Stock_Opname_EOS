import { NextFunction, Request, Response } from "express";
import { MESSAGES } from "../../utils/Messages";
import { ErrorApp, HandleResponseApi } from "../../utils/ResponseMapper";
import {
  createInventoryService,
  deleteInventoryService,
  getInventoryByIdService,
  getInventoryService,
  updateInventoryService,
} from "./inventoriesService";
import { MESSAGE_CODE } from "../../utils/MessageCode";
import { Status } from "@prisma/client";

export const getInventoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { page, perPage, search } = req.query;

  const inventories = await getInventoryService({
    search: search as string,
    page: page ? Number(page) : undefined,
    perPage: perPage ? Number(perPage) : undefined,
  });

  if (inventories instanceof ErrorApp) {
    next(inventories);
    return;
  }

  HandleResponseApi(
    res,
    200,
    MESSAGE_CODE.SUCCESS,
    MESSAGES.SUCCESS.INVENTORY.GET,
    inventories.data,
    inventories.meta
  );
};

export const getInventoryByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const inventory = await getInventoryByIdService(id);

  if (inventory instanceof ErrorApp) {
    next(inventory);
    return;
  }

  HandleResponseApi(
    res,
    200,
    MESSAGE_CODE.SUCCESS,
    MESSAGES.SUCCESS.INVENTORY.GET,
    inventory
  );
};

export const createInventoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const inventory = await createInventoryService({
    ...req.body,
    deviceLocation: ((req.body.deviceLocation as string)
      .charAt(0)
      .toUpperCase() +
      (req.body.deviceLocation as string).slice(1).toLowerCase()) as Status,
  });

  if (inventory instanceof ErrorApp) {
    next(inventory);
    return;
  }

  HandleResponseApi(res, 201, MESSAGE_CODE.SUCCESS, MESSAGES.CREATED.INVENTORY);
};

export const updateInventoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const inventory = await updateInventoryService({
    ...req.body,
    id,
    deviceLocation: req.body.deviceLocation
      ? (((req.body.deviceLocation as string).charAt(0).toUpperCase() +
          (req.body.deviceLocation as string).slice(1).toLowerCase()) as Status)
      : undefined,
  });

  if (inventory instanceof ErrorApp) {
    next(inventory);
    return;
  }

  HandleResponseApi(
    res,
    200,
    MESSAGE_CODE.SUCCESS,
    MESSAGES.SUCCESS.INVENTORY.UPDATE
  );
};

export const deleteInventoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const inventory = await deleteInventoryService(id);
  if (inventory instanceof ErrorApp) {
    next(inventory);
    return;
  }

  HandleResponseApi(
    res,
    200,
    MESSAGE_CODE.SUCCESS,
    MESSAGES.SUCCESS.INVENTORY.DELETE
  );
};
