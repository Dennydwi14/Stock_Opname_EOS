import { MESSAGE_CODE } from "../../utils/MessageCode"
import { MESSAGES } from "../../utils/Messages"
import { ErrorApp, Meta } from "../../utils/ResponseMapper"
import { createLocation, deleteLocation, getLocation, getLocationById, getLocationCount, updateLocation } from "./locationRepository"
import { IFilterLocation, LocationModelTypes, LocationResponseBodyDTO } from "./locationTypes"
import { createLocationValidate, updateLocationValidate } from "./locationValidate"

export const getLocationService = async ({ search, page = 1, perPage = 10 }: IFilterLocation) => {

  const [location, totalData] = await Promise.all([
      getLocation({ search, page, perPage }),
      getLocationCount({ search })
  ])

  // if (!location.length) {
  //     return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.USER.ACCOUNT, 404, MESSAGE_CODE.NOT_FOUND)
  // }

  const response = { data: location, meta: Meta(page, perPage, totalData) }
  return response
}


export const createLocationService = async ({
  location,
}: LocationResponseBodyDTO ) => {
  const validate = await createLocationValidate({ location });
  if (validate instanceof ErrorApp) {
    return new ErrorApp(validate.message, validate.statusCode, validate.code);
  }

  const response = await createLocation({
    location,
  });
  return response;
};

export const getLocationByIdService = async (id: string) => {
  if (!id) {
      return new ErrorApp(MESSAGES.ERROR.INVALID.ID, 400, MESSAGE_CODE.BAD_REQUEST)
  }
  const location = await getLocationById(id)
  if (!location) {
      return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.LOCATION, 404, MESSAGE_CODE.NOT_FOUND)
  }
  return location
}

export const updateLocationService =  async ({
  location,
  id,
}: LocationResponseBodyDTO ) => {
  if (!id) {
    return new ErrorApp(MESSAGES.ERROR.INVALID.ID, 400, MESSAGE_CODE.BAD_REQUEST)
}
  const locationById = await getLocationById(id)
  if (!locationById) {
      return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.LOCATION, 404, MESSAGE_CODE.NOT_FOUND)
  }

  const validate = await updateLocationValidate({ location, id });
  if (validate instanceof ErrorApp) {
    return new ErrorApp(validate.message, validate.statusCode, validate.code)
  }

  const updateFields: Partial<LocationModelTypes> = {};

  if (location) updateFields.location = location;

  const response = await updateLocation(id, updateFields);
  return response
}

export const deleteLocationService = async (id: string) => {
  if (!id) {
      return new ErrorApp(MESSAGES.ERROR.INVALID.ID, 400, MESSAGE_CODE.BAD_REQUEST)
  }
  const location = await getLocationById(id)
  if (!location) {
      return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.LOCATION, 404, MESSAGE_CODE.NOT_FOUND)
  }
  const response = await deleteLocation(id)
  return response
}