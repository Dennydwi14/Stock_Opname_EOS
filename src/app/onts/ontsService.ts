import { MESSAGE_CODE } from "../../utils/MessageCode";
import { MESSAGES } from "../../utils/Messages";
import { ErrorApp, Meta } from "../../utils/ResponseMapper";
import { OntModelTypes, IFilterOnt, OntResponseBodyDTO } from "./ontsTypes"; // Ubah import sesuai dengan interface yang sudah diperbarui
import { createOnt, deleteOnt, getOnt, getOntById, getOntCount, updateOnt } from "./ontsRepository";
import { createOntValidate, updateOntValidate } from "./ontsValidate";
import { getLocationById } from "../location/locationRepository";

export const getOntService = async ({ search, page = 1, perPage = 10, status, locationId }: IFilterOnt) => {
  const [onts, totalData] = await Promise.all([
    getOnt({ search, page, perPage, status, locationId }),
    getOntCount({ search, status, locationId }),
  ]);

  // if (!onts.length) {
  //   return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.ONT, 404, MESSAGE_CODE.NOT_FOUND);
  // }

  const response = { data: onts, meta: Meta(page, perPage, totalData) };
  return response;
};

export const getOntByIdService = async (id: string) => {
  if (!id) {
    return new ErrorApp(MESSAGES.ERROR.INVALID.ID, 400, MESSAGE_CODE.BAD_REQUEST);
  }

  const ont = await getOntById(id);
  if (!ont) {
    return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.ONT, 404, MESSAGE_CODE.NOT_FOUND);
  }
  return ont;
};

export const createOntService = async ({
  serialNumber,
  type,
  numberWo,
  locationId,
  unitAddress,
  name,
  dateActivation,
  status,
  information,
}: OntModelTypes) => {
  const location = await getLocationById(locationId);
  if (!location) {
    return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.LOCATION, 404, MESSAGE_CODE.NOT_FOUND);
  }
  
  const validate = await createOntValidate({ serialNumber, type, numberWo, unitAddress, name, dateActivation, status, information, locationId });
  if (validate instanceof ErrorApp) {
    return new ErrorApp(validate.message, validate.statusCode, validate.code);
  }


  const response = await createOnt({
    serialNumber,
    type,
    numberWo,
    locationId,
    unitAddress,
    name,
    dateActivation,
    status,
    information,
  });
  return response;
};

export const updateOntService = async ({
  id,
  serialNumber,
  type,
  numberWo,
  locationId,
  unitAddress,
  name,
  dateActivation,
  status,
  information,
}: OntResponseBodyDTO) => {
  if (!id) {
    return new ErrorApp(MESSAGES.ERROR.INVALID.ID, 400, MESSAGE_CODE.BAD_REQUEST);
  }

  const ont = await getOntById(id);
  if (!ont) {
    return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.ONT, 404, MESSAGE_CODE.NOT_FOUND);
  }

  const location = await getLocationById(locationId);
  if (!location) {
    return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.LOCATION, 404, MESSAGE_CODE.NOT_FOUND);
  }

  const validate = await updateOntValidate({ serialNumber, type, numberWo, unitAddress, name, dateActivation, status, information, locationId });
  if (validate instanceof ErrorApp) {
    return new ErrorApp(validate.message, validate.statusCode, validate.code);
  }

  
  const updatedFields: Partial<OntModelTypes> = {};
  
  if (serialNumber !== undefined) updatedFields.serialNumber = serialNumber;
  if (type !== undefined) updatedFields.type = type;
  if (numberWo !== undefined) updatedFields.numberWo = numberWo;
  if (unitAddress !== undefined) updatedFields.unitAddress = unitAddress;
  if (name !== undefined) updatedFields.name = name;
  if (dateActivation !== undefined) {
    const date = new Date(dateActivation);
    updatedFields.dateActivation = date;
  };
  if (status !== undefined) updatedFields.status = status;
  if (information !== undefined) updatedFields.information = information;

  const response = await updateOnt(id, { ...updatedFields, locationId });
  return response;
};

export const deleteOntService = async (id: string) => {
  if (!id) {
    return new ErrorApp(MESSAGES.ERROR.INVALID.ID, 400, MESSAGE_CODE.BAD_REQUEST);
  }

  const ont = await getOntById(id);
  if (!ont) {
    return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.ONT, 404, MESSAGE_CODE.NOT_FOUND);
  }

  const response = await deleteOnt(id);
  return response;
};
