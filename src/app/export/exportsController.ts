import { NextFunction, Request, Response } from "express";
import { MESSAGES } from "../../utils/Messages";
import { ErrorApp, HandleResponseApi } from "../../utils/ResponseMapper";
import { exportOntService, exportStbService } from "./exportsService";
import { MESSAGE_CODE } from "../../utils/MessageCode";

export const exportOntController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { locationId } = req.query;

    const workbook = await exportOntService({
      locationId: locationId as string,
    });
    if (workbook instanceof ErrorApp) {
      next(workbook);
      return;
    }
    const buffer = await workbook.xlsx.writeBuffer();

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=ont-data.xlsx");
    res.send(buffer);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    HandleResponseApi(
      res,
      200,
      MESSAGE_CODE.BAD_REQUEST,
      MESSAGES.ERROR.INVALID.EXPORT
    );
  }
};

export const exportStbController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { locationId } = req.query;

    const workbook = await exportStbService({
      locationId: locationId as string,
    });
    if (workbook instanceof ErrorApp) {
      next(workbook);
      return;
    }
    const buffer = await workbook.xlsx.writeBuffer();

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=ont-data.xlsx");
    res.send(buffer);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    HandleResponseApi(
      res,
      200,
      MESSAGE_CODE.BAD_REQUEST,
      MESSAGES.ERROR.INVALID.EXPORT
    );
  }
};
