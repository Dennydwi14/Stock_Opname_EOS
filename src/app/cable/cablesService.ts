import { MESSAGE_CODE } from "../../utils/MessageCode";
import { MESSAGES } from "../../utils/Messages";
import { ErrorApp, Meta } from "../../utils/ResponseMapper";
import {
  CableModelTypes,
  IFilterCable,
  CableResponseBodyDTO,
} from "./cablesTypes"; // Ubah import sesuai dengan interface yang sudah diperbarui
import {
  createCable,
  deleteCable,
  getCable,
  getCableById,
  getCableCount,
  updateCable,
} from "./cablesRepository";
import { createCableValidate, updateCableValidate } from "./cablesValidate";
import { getLocationById } from "../location/locationRepository";

export const getCableService = async ({
  type,
  page = 1,
  perPage = 10,
  locationId,
}: IFilterCable) => {
  const [cables, totalData] = await Promise.all([
    getCable({ type, page, perPage, locationId }),
    getCableCount({ type, locationId }),
  ]);

  // if (!cables.length) {
  //   return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.CABLE, 404, MESSAGE_CODE.NOT_FOUND);
  // }

  const response = { data: cables, meta: Meta(page, perPage, totalData) };
  return response;
};

export const getCableByIdService = async (id: string) => {
  if (!id) {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.ID,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  const cable = await getCableById(id);
  if (!cable) {
    return new ErrorApp(
      MESSAGES.ERROR.NOT_FOUND.CABLE,
      404,
      MESSAGE_CODE.NOT_FOUND
    );
  }
  return cable;
};

export const createCableService = async ({
  quantity,
  size,
  type,
  locationId,
}: CableModelTypes) => {
  const location = await getLocationById(locationId);
  if (!location) {
    return new ErrorApp(
      MESSAGES.ERROR.NOT_FOUND.LOCATION,
      404,
      MESSAGE_CODE.NOT_FOUND
    );
  }

  const validate = await createCableValidate({
    quantity,
    size,
    type,
    locationId,
  });
  if (validate instanceof ErrorApp) {
    return new ErrorApp(validate.message, validate.statusCode, validate.code);
  }

  const response = await createCable({
    quantity,
    size,
    type,
    locationId,
  });
  return response;
};

export const updateCableService = async ({
  id,
  quantity,
  size,
  type,
  locationId,
}: CableResponseBodyDTO) => {
  if (!id) {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.ID,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  const cable = await getCableById(id);
  if (!cable) {
    return new ErrorApp(
      MESSAGES.ERROR.NOT_FOUND.CABLE,
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

  const validate = await updateCableValidate({
    quantity,
    size,
    type,
    locationId,
  });
  if (validate instanceof ErrorApp) {
    return new ErrorApp(validate.message, validate.statusCode, validate.code);
  }

  const updatedFields: Partial<CableModelTypes> = {};

  if (size) updatedFields.size = size;
  if (type) updatedFields.type = type;
  if (quantity) updatedFields.quantity = Number(quantity);

  const response = await updateCable(id, { ...updatedFields, locationId });
  return response;
};

export const deleteCableService = async (id: string) => {
  if (!id) {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.ID,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  const cable = await getCableById(id);
  if (!cable) {
    return new ErrorApp(
      MESSAGES.ERROR.NOT_FOUND.CABLE,
      404,
      MESSAGE_CODE.NOT_FOUND
    );
  }

  const response = await deleteCable(id);
  return response;
};
