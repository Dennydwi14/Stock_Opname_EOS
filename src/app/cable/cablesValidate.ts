import { MESSAGE_CODE } from "../../utils/MessageCode";
import { MESSAGES } from "../../utils/Messages";
import { ErrorApp } from "../../utils/ResponseMapper";
import { CableResponseBodyDTO } from "./cablesTypes"; // Ubah import sesuai dengan interface yang sudah diperbarui

export const createCableValidate = async ({
  type,
  size,
  quantity,
}: CableResponseBodyDTO) => {
  if (!type) {
    return new ErrorApp(
      MESSAGES.ERROR.REQUIRED.TYPE,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  if (!["Adaptor", "Patchcord"].includes(type)) {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.TYPE,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  if (!size) {
    return new ErrorApp(
      MESSAGES.ERROR.REQUIRED.SIZE,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  if (typeof size !== "string") {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.SIZE,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  if (!quantity) {
    return new ErrorApp(
      MESSAGES.ERROR.REQUIRED.QUANTITY,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  const quantityNumber = Number(quantity);
  if (isNaN(quantityNumber)) {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.QUANTITY,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }
};

export const updateCableValidate = async ({
  type,
  quantity,
  size,
}: CableResponseBodyDTO) => {
  if (type !== undefined) {
    if (!type) {
      return new ErrorApp(
        MESSAGES.ERROR.REQUIRED.TYPE,
        400,
        MESSAGE_CODE.BAD_REQUEST
      );
    }
    if (!["Adaptor", "Patchcord"].includes(type)) {
      return new ErrorApp(
        MESSAGES.ERROR.INVALID.STATUS,
        400,
        MESSAGE_CODE.BAD_REQUEST
      );
    }
  }

  if (size !== undefined) {
    if (!size) {
      return new ErrorApp(
        MESSAGES.ERROR.REQUIRED.SIZE,
        400,
        MESSAGE_CODE.BAD_REQUEST
      );
    }
    if (typeof size !== "string") {
      return new ErrorApp(
        MESSAGES.ERROR.INVALID.SERIAL_NUMBER,
        400,
        MESSAGE_CODE.BAD_REQUEST
      );
    }
  }

  if (quantity !== undefined) {
    if (!quantity) {
      return new ErrorApp(
        MESSAGES.ERROR.REQUIRED.QUANTITY,
        400,
        MESSAGE_CODE.BAD_REQUEST
      );
    }
    const quantityNumber = Number(quantity);
    if (isNaN(quantityNumber)) {
      return new ErrorApp(
        MESSAGES.ERROR.INVALID.QUANTITY,
        400,
        MESSAGE_CODE.BAD_REQUEST
      );
    }
  }
};
