import { NextFunction, Request, Response } from "express";
import { MESSAGES } from "../../utils/Messages";
import { ErrorApp, HandleResponseApi } from "../../utils/ResponseMapper";
import { createToolService, deleteToolService, getToolByIdService, getToolService, updateToolService } from "./toolsService";
import { MESSAGE_CODE } from "../../utils/MessageCode";
import { Status } from "@prisma/client";

export const getToolController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { page, perPage, search, status, locationId } = req.query;

  const tools = await getToolService({
    search: search as string,
    page: page ? Number(page) : undefined,
    perPage: perPage ? Number(perPage) : undefined,
    status: status
    ? ((status as string).charAt(0).toUpperCase() + (status as string).slice(1).toLowerCase()) as Status
    : undefined, 
    locationId: locationId as string
  });

  if (tools instanceof ErrorApp) {
    next(tools);
    return;
  }

  HandleResponseApi(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.TOOL.GET, tools.data, tools.meta);
};

export const getToolByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const tool = await getToolByIdService(id);

  if (tool instanceof ErrorApp) {
    next(tool);
    return;
  }

  HandleResponseApi(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.TOOL.GET, tool);
};

export const createToolController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tool = await createToolService({...req.body, status: ((req.body.status as string).charAt(0).toUpperCase() + (req.body.status as string).slice(1).toLowerCase()) as Status});

  if (tool instanceof ErrorApp) {
    next(tool);
    return;
  }

  HandleResponseApi(res, 201, MESSAGE_CODE.SUCCESS, MESSAGES.CREATED.TOOL);
};

export const updateToolController = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const tool = await updateToolService({ ...req.body, id, status: req.body.status ? ((req.body.status as string).charAt(0).toUpperCase() + (req.body.status as string).slice(1).toLowerCase()) as Status : undefined });

  if (tool instanceof ErrorApp) {
    next(tool);
    return;
  }

  HandleResponseApi(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.TOOL.UPDATE);
};

export const deleteToolController = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const tool = await deleteToolService(id);
  if (tool instanceof ErrorApp) {
    next(tool);
    return;
  }

  HandleResponseApi(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.TOOL.DELETE);
};
