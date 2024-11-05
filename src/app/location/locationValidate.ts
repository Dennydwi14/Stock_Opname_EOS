import { MESSAGE_CODE } from "../../utils/MessageCode";
import { MESSAGES } from "../../utils/Messages";
import { ErrorApp } from "../../utils/ResponseMapper";
import { getLocationByNameLocation } from "./locationRepository";
import { LocationResponseBodyDTO } from "./locationTypes";

export const createLocationValidate = async ({ location }: LocationResponseBodyDTO) => {
    if (!location) {
        return new ErrorApp(MESSAGES.ERROR.REQUIRED.LOCATION, 400, MESSAGE_CODE.BAD_REQUEST);
    }

    const locationExists = await getLocationByNameLocation(location as string);
    if (locationExists) {
        return new ErrorApp(
        MESSAGES.ERROR.ALREADY.LOCATION,
        400,
        MESSAGE_CODE.BAD_REQUEST
        );
    }
}
  
export const updateLocationValidate = async ({ location, id }: LocationResponseBodyDTO) => {
    if (location) {
        const locationExists = await getLocationByNameLocation(location as string);
        if (locationExists && locationExists.id !== id) {
            return new ErrorApp(MESSAGES.ERROR.ALREADY.LOCATION, 400, MESSAGE_CODE.BAD_REQUEST);
        }
    }
}