import { MESSAGE_CODE } from "../../utils/MessageCode";
import { MESSAGES } from "../../utils/Messages";
import { ErrorApp } from "../../utils/ResponseMapper";
import { StbResponseBodyDTO } from "./stbsTypes"; // Ubah import sesuai dengan interface yang sudah diperbarui

export const createStbValidate = async ({
  serialNumber,
  type,
  numberWo,
  unitAddress,
  deviceId,
  notes,
  packageName,
  dateActivation,
  status,
  information,
  deviceLocation,
}: StbResponseBodyDTO) => {
  if (!serialNumber) {
    return new ErrorApp(
      MESSAGES.ERROR.REQUIRED.SERIAL_NUMBER,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  if (typeof serialNumber !== "string") {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.SERIAL_NUMBER,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  if (!type) {
    return new ErrorApp(
      MESSAGES.ERROR.REQUIRED.TYPE,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  if (typeof type !== "string") {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.TYPE,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  if (!numberWo) {
    return new ErrorApp(
      MESSAGES.ERROR.REQUIRED.NUMBER_WO,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  if (typeof numberWo !== "string") {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.NUMBER_WO,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  if (!unitAddress) {
    return new ErrorApp(
      MESSAGES.ERROR.REQUIRED.UNIT_ADDRESS,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  if (typeof unitAddress !== "string") {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.UNIT_ADDRESS,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  if (!deviceId) {
    return new ErrorApp(
      MESSAGES.ERROR.REQUIRED.DEVICE_ID,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  if (typeof deviceId !== "string") {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.DEVICE_ID,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  if (!packageName) {
    return new ErrorApp(
      MESSAGES.ERROR.REQUIRED.PACKAGE_NAME,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  if (typeof packageName !== "string") {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.PACKAGE_NAME,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  if (!dateActivation) {
    return new ErrorApp(
      MESSAGES.ERROR.REQUIRED.DATE_ACTIVATION,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  const activationDate = new Date(dateActivation);
  if (isNaN(activationDate.getTime())) {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.DATE_ACTIVATION,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  if (!deviceLocation) {
    return new ErrorApp(
      MESSAGES.ERROR.REQUIRED.DEVICE_LOCATION,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  if (!["Active", "Ready", "Terminate"].includes(deviceLocation)) {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.DEVICE_LOCATION,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  if (information && typeof information !== "string") {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.INFORMATION,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  if (status && typeof status !== "string") {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.STATUS,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  if (notes && typeof notes !== "string") {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.NOTES,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }
};

export const updateStbValidate = async ({
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
}: StbResponseBodyDTO) => {
  if (serialNumber !== undefined) {
    if (!serialNumber) {
      return new ErrorApp(
        MESSAGES.ERROR.REQUIRED.SERIAL_NUMBER,
        400,
        MESSAGE_CODE.BAD_REQUEST
      );
    }
    if (typeof serialNumber !== "string") {
      return new ErrorApp(
        MESSAGES.ERROR.INVALID.SERIAL_NUMBER,
        400,
        MESSAGE_CODE.BAD_REQUEST
      );
    }
  }

  if (type !== undefined) {
    if (!type) {
      return new ErrorApp(
        MESSAGES.ERROR.REQUIRED.TYPE,
        400,
        MESSAGE_CODE.BAD_REQUEST
      );
    }
    if (typeof type !== "string") {
      return new ErrorApp(
        MESSAGES.ERROR.INVALID.TYPE,
        400,
        MESSAGE_CODE.BAD_REQUEST
      );
    }
  }

  if (numberWo !== undefined) {
    if (!numberWo) {
      return new ErrorApp(
        MESSAGES.ERROR.REQUIRED.NUMBER_WO,
        400,
        MESSAGE_CODE.BAD_REQUEST
      );
    }
    if (typeof numberWo !== "string") {
      return new ErrorApp(
        MESSAGES.ERROR.INVALID.NUMBER_WO,
        400,
        MESSAGE_CODE.BAD_REQUEST
      );
    }
  }

  if (unitAddress !== undefined) {
    if (!unitAddress) {
      return new ErrorApp(
        MESSAGES.ERROR.REQUIRED.UNIT_ADDRESS,
        400,
        MESSAGE_CODE.BAD_REQUEST
      );
    }
    if (typeof unitAddress !== "string") {
      return new ErrorApp(
        MESSAGES.ERROR.INVALID.UNIT_ADDRESS,
        400,
        MESSAGE_CODE.BAD_REQUEST
      );
    }
  }

  if (deviceId !== undefined) {
    if (!deviceId) {
      return new ErrorApp(
        MESSAGES.ERROR.REQUIRED.DEVICE_ID,
        400,
        MESSAGE_CODE.BAD_REQUEST
      );
    }
    if (typeof deviceId !== "string") {
      return new ErrorApp(
        MESSAGES.ERROR.INVALID.DEVICE_ID,
        400,
        MESSAGE_CODE.BAD_REQUEST
      );
    }
  }

  if (packageName !== undefined) {
    if (!packageName) {
      return new ErrorApp(
        MESSAGES.ERROR.REQUIRED.PACKAGE_NAME,
        400,
        MESSAGE_CODE.BAD_REQUEST
      );
    }
    if (typeof packageName !== "string") {
      return new ErrorApp(
        MESSAGES.ERROR.INVALID.PACKAGE_NAME,
        400,
        MESSAGE_CODE.BAD_REQUEST
      );
    }
  }

  if (dateActivation !== undefined) {
    if (!dateActivation) {
      return new ErrorApp(
        MESSAGES.ERROR.REQUIRED.DATE_ACTIVATION,
        400,
        MESSAGE_CODE.BAD_REQUEST
      );
    }
    const activationDate = new Date(dateActivation);
    if (isNaN(activationDate.getTime())) {
      return new ErrorApp(
        MESSAGES.ERROR.INVALID.DATE_ACTIVATION,
        400,
        MESSAGE_CODE.BAD_REQUEST
      );
    }
  }

  if (deviceLocation !== undefined) {
    if (!deviceLocation) {
      return new ErrorApp(
        MESSAGES.ERROR.REQUIRED.DEVICE_LOCATION,
        400,
        MESSAGE_CODE.BAD_REQUEST
      );
    }
    if (!["Active", "Ready", "Terminate"].includes(deviceLocation)) {
      return new ErrorApp(
        MESSAGES.ERROR.INVALID.STATUS,
        400,
        MESSAGE_CODE.BAD_REQUEST
      );
    }
  }

  if (information !== undefined && typeof information !== "string") {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.INFORMATION,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  if (status !== undefined && typeof status !== "string") {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.STATUS,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  if (notes !== undefined && typeof notes !== "string") {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.NOTES,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }
};
