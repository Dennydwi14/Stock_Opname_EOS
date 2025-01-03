import ExcelJS from "exceljs";
import { getAllOnt } from "../onts/ontsRepository";
import { getAllStb } from "../stbs/stbsRepository";
import { IFilterStb } from "../stbs/stbsTypes";
import { IFilterOnt } from "../onts/ontsTypes";
import { ErrorApp } from "../../utils/ResponseMapper";
import { MESSAGES } from "../../utils/Messages";
import { MESSAGE_CODE } from "../../utils/MessageCode";

export const exportOntService = async ({ locationId }: IFilterOnt) => {
  const onts = await getAllOnt({ locationId });

  if (!onts.length) {
    return new ErrorApp(
      MESSAGES.ERROR.NOT_FOUND.EXPORT,
      404,
      MESSAGE_CODE.NOT_FOUND
    );
  }

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("ONT Data");

  worksheet.columns = [
    { header: "Serial Number", key: "serialNumber", width: 15 },
    { header: "Type", key: "type", width: 15 },
    { header: "Number WO", key: "numberWo", width: 15 },
    { header: "Location", key: "location", width: 20 },
    { header: "Unit Address", key: "unitAddress", width: 30 },
    { header: "Name", key: "name", width: 20 },
    { header: "Date Activation", key: "dateActivation", width: 15 },
    { header: "Status", key: "status", width: 15 },
    { header: "Information", key: "information", width: 30 },
  ];

  onts.forEach((ont) => {
    const row = worksheet.addRow({
      serialNumber: ont.serialNumber,
      type: ont.type,
      numberWo: ont.numberWo,
      location: ont.location.location,
      unitAddress: ont.unitAddress,
      name: ont.name,
      dateActivation: ont.dateActivation.toLocaleDateString(),
      status: ont.status,
      information: ont.information || "",
    });

    const color =
      ont.status === "Active"
        ? "92D050"
        : ont.status === "Terminate"
        ? "FF0000"
        : null;

    if (color) {
      row.eachCell((cell: ExcelJS.Cell) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: color },
        };
      });
    }
  });

  return workbook;
};

export const exportStbService = async ({ locationId }: IFilterStb) => {
  const stbs = await getAllStb({ locationId });

  if (!stbs.length) {
    return new ErrorApp(
      MESSAGES.ERROR.NOT_FOUND.EXPORT,
      404,
      MESSAGE_CODE.NOT_FOUND
    );
  }

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("STB Data");

  worksheet.columns = [
    { header: "Serial Number", key: "serialNumber", width: 15 },
    { header: "Type", key: "type", width: 15 },
    { header: "Device ID", key: "deviceId", width: 15 },
    { header: "Number WO", key: "numberWo", width: 15 },
    { header: "Location", key: "location", width: 20 },
    { header: "Unit Address", key: "unitAddress", width: 30 },
    { header: "Package Name", key: "packageName", width: 20 },
    { header: "Status", key: "status", width: 15 },
    { header: "Date Activation", key: "dateActivation", width: 15 },
    { header: "Device Location", key: "deviceLocation", width: 15 },
    { header: "Information", key: "information", width: 30 },
    { header: "Notes", key: "notes", width: 30 },
  ];

  stbs.forEach((stb) => {
    const row = worksheet.addRow({
      serialNumber: stb.serialNumber,
      type: stb.type,
      deviceId: stb.deviceId,
      numberWo: stb.numberWo,
      location: stb.location.location,
      unitAddress: stb.unitAddress,
      packageName: stb.packageName,
      status: stb.status,
      dateActivation: stb.dateActivation.toLocaleDateString(),
      deviceLocation: stb.deviceLocation,
      information: stb.information || "",
      notes: stb.notes || "",
    });

    const color =
      stb.deviceLocation === "Active"
        ? "92D050"
        : stb.deviceLocation === "Terminate"
        ? "FF0000"
        : null;

    if (color) {
      row.eachCell((cell) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: color },
        };
      });
    }
  });

  return workbook;
};
