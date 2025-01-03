import { MESSAGE_CODE } from "../../utils/MessageCode";
import { MESSAGES } from "../../utils/Messages";
import { ErrorApp, Meta } from "../../utils/ResponseMapper";
import { StbModelTypes, IFilterStb, StbResponseBodyDTO } from "./stbsTypes"; // Ubah import sesuai dengan interface yang sudah diperbarui
import {
  createStb,
  deleteStb,
  getStb,
  getStbById,
  getStbCount,
  updateStb,
} from "./stbsRepository";
import { createStbValidate, updateStbValidate } from "./stbsValidate";
import { getLocationById } from "../location/locationRepository";

export const getStbService = async ({
  search,
  page = 1,
  perPage = 10,
  status,
  deviceLocation,
  locationId,
}: IFilterStb) => {
  const [onts, totalData] = await Promise.all([
    getStb({ search, page, perPage, status, locationId, deviceLocation }),
    getStbCount({ search, status, locationId, deviceLocation }),
  ]);

  // if (!onts.length) {
  //   return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.ONT, 404, MESSAGE_CODE.NOT_FOUND);
  // }

  const response = { data: onts, meta: Meta(page, perPage, totalData) };
  return response;
};

export const getStbByIdService = async (id: string) => {
  if (!id) {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.ID,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  const ont = await getStbById(id);
  if (!ont) {
    return new ErrorApp(
      MESSAGES.ERROR.NOT_FOUND.ONT,
      404,
      MESSAGE_CODE.NOT_FOUND
    );
  }
  return ont;
};

export const createStbService = async ({
  serialNumber,
  type,
  deviceId,
  deviceLocation,
  packageName,
  notes,
  numberWo,
  locationId,
  unitAddress,
  dateActivation,
  status,
  information,
}: StbModelTypes) => {
  const location = await getLocationById(locationId);
  if (!location) {
    return new ErrorApp(
      MESSAGES.ERROR.NOT_FOUND.LOCATION,
      404,
      MESSAGE_CODE.NOT_FOUND
    );
  }

  const validate = await createStbValidate({
    serialNumber,
    type,
    numberWo,
    unitAddress,
    deviceId,
    deviceLocation,
    notes,
    packageName,
    dateActivation,
    status,
    information,
    locationId,
  });
  if (validate instanceof ErrorApp) {
    return new ErrorApp(validate.message, validate.statusCode, validate.code);
  }

  const response = await createStb({
    serialNumber,
    type,
    numberWo,
    locationId,
    unitAddress,
    deviceId,
    deviceLocation,
    notes,
    packageName,
    dateActivation,
    status,
    information,
  });
  return response;
};

export const updateStbService = async ({
  id,
  serialNumber,
  type,
  numberWo,
  locationId,
  unitAddress,
  dateActivation,
  deviceId,
  deviceLocation,
  notes,
  packageName,
  status,
  information,
}: StbResponseBodyDTO) => {
  if (!id) {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.ID,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  const ont = await getStbById(id);
  if (!ont) {
    return new ErrorApp(
      MESSAGES.ERROR.NOT_FOUND.ONT,
      404,
      MESSAGE_CODE.NOT_FOUND
    );
  }

  const location = await getLocationById(locationId);
  if (!location) {
    return new ErrorApp(
      MESSAGES.ERROR.NOT_FOUND.LOCATION,
      404,
      MESSAGE_CODE.NOT_FOUND
    );
  }

  const validate = await updateStbValidate({
    serialNumber,
    type,
    numberWo,
    unitAddress,
    deviceId,
    deviceLocation,
    notes,
    packageName,
    dateActivation,
    status,
    information,
    locationId,
  });
  if (validate instanceof ErrorApp) {
    return new ErrorApp(validate.message, validate.statusCode, validate.code);
  }

  const updatedFields: Partial<StbModelTypes> = {};

  if (serialNumber !== undefined) updatedFields.serialNumber = serialNumber;
  if (type !== undefined) updatedFields.type = type;
  if (numberWo !== undefined) updatedFields.numberWo = numberWo;
  if (unitAddress !== undefined) updatedFields.unitAddress = unitAddress;
  if (deviceId !== undefined) updatedFields.deviceId = deviceId;
  if (deviceLocation !== undefined)
    updatedFields.deviceLocation = deviceLocation;
  if (notes !== undefined) updatedFields.notes = notes;
  if (packageName !== undefined) updatedFields.packageName = packageName;
  if (dateActivation !== undefined) {
    const date = new Date(dateActivation);
    updatedFields.dateActivation = date;
  }
  if (status !== undefined) updatedFields.status = status;
  if (information !== undefined) updatedFields.information = information;

  const response = await updateStb(id, { ...updatedFields, locationId });
  return response;
};

export const deleteStbService = async (id: string) => {
  if (!id) {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.ID,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  const ont = await getStbById(id);
  if (!ont) {
    return new ErrorApp(
      MESSAGES.ERROR.NOT_FOUND.ONT,
      404,
      MESSAGE_CODE.NOT_FOUND
    );
  }

  const response = await deleteStb(id);
  return response;
};
