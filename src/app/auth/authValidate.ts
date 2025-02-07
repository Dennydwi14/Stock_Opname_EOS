import { MESSAGE_CODE } from "../../utils/MessageCode";
import { MESSAGES } from "../../utils/Messages";
import { REGEX } from "../../utils/Regex";
import { ErrorApp } from "../../utils/ResponseMapper";
import { RegisterAuthBodyDTO, RegisterAuthResponse } from "./authTypes";

export const registerValidate = async ({
  email,
  name,
  password,
  role,
}: RegisterAuthBodyDTO) => {
  if (!email) {
    return new ErrorApp(
      MESSAGES.ERROR.REQUIRED.EMAIL,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  if (typeof email !== "string") {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.GLOBAL.EMAIL,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  if (!REGEX.email.test(email)) {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.GLOBAL.EMAIL,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  if (!name) {
    return new ErrorApp(
      MESSAGES.ERROR.REQUIRED.NAME,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  if (typeof name !== "string") {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.NAME,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  if (!password) {
    return new ErrorApp(
      MESSAGES.ERROR.REQUIRED.PASSWORD,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  if (typeof name !== "string") {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.USER.PASSWORD,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  if (password.length < 8) {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.USER.PASSWORD_LENGTH,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  if (!role) {
    return new ErrorApp(
      MESSAGES.ERROR.REQUIRED.BODY_ROLE,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  if (!["USER", "ADMIN", "LEADER"].includes(role)) {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.BODY_ROLE,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }
};

export const updateUserValidate = async ({
  email,
  name,
  role,
}: RegisterAuthResponse) => {
  if (email !== undefined) {
    if (!email) {
      return new ErrorApp(
        MESSAGES.ERROR.REQUIRED.EMAIL,
        400,
        MESSAGE_CODE.BAD_REQUEST
      );
    }
    if (typeof email !== "string") {
      return new ErrorApp(
        MESSAGES.ERROR.INVALID.GLOBAL.EMAIL,
        400,
        MESSAGE_CODE.BAD_REQUEST
      );
    }
    if (!REGEX.email.test(email)) {
      return new ErrorApp(
        MESSAGES.ERROR.INVALID.GLOBAL.EMAIL,
        400,
        MESSAGE_CODE.BAD_REQUEST
      );
    }
  }

  if (name !== undefined) {
    if (!name) {
      return new ErrorApp(
        MESSAGES.ERROR.REQUIRED.NAME,
        400,
        MESSAGE_CODE.BAD_REQUEST
      );
    }
    if (typeof name !== "string") {
      return new ErrorApp(
        MESSAGES.ERROR.INVALID.NAME,
        400,
        MESSAGE_CODE.BAD_REQUEST
      );
    }
  }

  if (role !== undefined) {
    if (!role) {
      return new ErrorApp(
        MESSAGES.ERROR.REQUIRED.BODY_ROLE,
        400,
        MESSAGE_CODE.BAD_REQUEST
      );
    }
    if (!["USER", "ADMIN", "LEADER"].includes(role)) {
      return new ErrorApp(
        MESSAGES.ERROR.INVALID.BODY_ROLE,
        400,
        MESSAGE_CODE.BAD_REQUEST
      );
    }
  }
};
