import { MESSAGE_CODE } from "../../utils/MessageCode";
import { MESSAGES } from "../../utils/Messages";
import { ErrorApp, Meta } from "../../utils/ResponseMapper";
import { ToolModelTypes, IFilterTool, ToolResponseBodyDTO } from "./toolsTypes"; // Ubah import sesuai dengan interface yang sudah diperbarui
import { createTool, deleteTool, getTool, getToolById, getToolCount, updateTool } from "./toolsRepository";
import { createToolValidate, updateToolValidate } from "./toolsValidate";
import { getLocationById } from "../location/locationRepository";

export const getToolService = async ({ search, page = 1, perPage = 10, status, locationId }: IFilterTool) => {
  const [tools, totalData] = await Promise.all([
    getTool({ search, page, perPage, status, locationId }),
    getToolCount({ search, status, locationId }),
  ]);

  // if (!tools.length) {
  //   return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.TOOLS, 404, MESSAGE_CODE.NOT_FOUND);
  // }

  const response = { data: tools, meta: Meta(page, perPage, totalData) };
  return response;
};

export const getToolByIdService = async (id: string) => {
  if (!id) {
    return new ErrorApp(MESSAGES.ERROR.INVALID.ID, 400, MESSAGE_CODE.BAD_REQUEST);
  }

  const tool = await getToolById(id);
  if (!tool) {
    return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.TOOLS, 404, MESSAGE_CODE.NOT_FOUND);
  }
  return tool;
};

export const createToolService = async ({
  serialNumber,
  type,
  numberWo,
  instalasiUnit,
  locationId,
  unit,
  name,
  dateActivation,
  status,
  information,
}: ToolModelTypes) => {
  const location = await getLocationById(locationId);
  if (!location) {
    return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.LOCATION, 404, MESSAGE_CODE.NOT_FOUND);
  }
  
  const validate = await createToolValidate({ serialNumber, type, numberWo, instalasiUnit, unit, name, dateActivation, status, information, locationId });
  if (validate instanceof ErrorApp) {
    return new ErrorApp(validate.message, validate.statusCode, validate.code);
  }


  const response = await createTool({
    serialNumber,
    type,
    numberWo,
    instalasiUnit,
    locationId,
    unit,
    name,
    dateActivation,
    status,
    information,
  });
  return response;
};

export const updateToolService = async ({
  id,
  serialNumber,
  type,
  numberWo,
  instalasiUnit,
  locationId,
  unit,
  name,
  dateActivation,
  status,
  information,
}: ToolResponseBodyDTO) => {
  if (!id) {
    return new ErrorApp(MESSAGES.ERROR.INVALID.ID, 400, MESSAGE_CODE.BAD_REQUEST);
  }

  const tool = await getToolById(id);
  if (!tool) {
    return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.TOOLS, 404, MESSAGE_CODE.NOT_FOUND);
  }

  const location = await getLocationById(locationId);
  if (!location) {
    return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.LOCATION, 404, MESSAGE_CODE.NOT_FOUND);
  }

  const validate = await updateToolValidate({ serialNumber, type, numberWo, instalasiUnit, unit, name, dateActivation, status, information, locationId });
  if (validate instanceof ErrorApp) {
    return new ErrorApp(validate.message, validate.statusCode, validate.code);
  }

  
  const updatedFields: Partial<ToolModelTypes> = {};
  
  if (serialNumber) updatedFields.serialNumber = serialNumber;
  if (type) updatedFields.type = type;
  if (numberWo) updatedFields.numberWo = numberWo;
  if (instalasiUnit) updatedFields.instalasiUnit = instalasiUnit;
  if (unit) updatedFields.unit = unit;
  if (name) updatedFields.name = name;
  if (dateActivation) {
    const date = new Date(dateActivation);
    updatedFields.dateActivation = date;
  };
  if (status) updatedFields.status = status;
  if (information) updatedFields.information = information;

  const response = await updateTool(id, { ...updatedFields, locationId });
  return response;
};

export const deleteToolService = async (id: string) => {
  if (!id) {
    return new ErrorApp(MESSAGES.ERROR.INVALID.ID, 400, MESSAGE_CODE.BAD_REQUEST);
  }

  const tool = await getToolById(id);
  if (!tool) {
    return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.TOOLS, 404, MESSAGE_CODE.NOT_FOUND);
  }

  const response = await deleteTool(id);
  return response;
};
