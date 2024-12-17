import { NextFunction, Request, Response } from "express";
import { MESSAGES } from "../../utils/Messages";
import { ErrorApp, HandleResponseApi } from "../../utils/ResponseMapper";
import { getHistoryService } from "./historiesService";
import { MESSAGE_CODE } from "../../utils/MessageCode";

export const getHistoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { page, perPage, type } = req.query;

  const histories = await getHistoryService({
    page: page ? Number(page) : undefined,
    perPage: perPage ? Number(perPage) : undefined,
    type: type as string,
  });

  if (histories instanceof ErrorApp) {
    next(histories);
    return;
  }

  HandleResponseApi(
    res,
    200,
    MESSAGE_CODE.SUCCESS,
    MESSAGES.SUCCESS.HISTORY.GET,
    histories.data,
    histories.meta
  );
};
