import * as bcrypt from "bcrypt";
import { MESSAGE_CODE } from "../../utils/MessageCode";
import { MESSAGES } from "../../utils/Messages";
import { ErrorApp, Meta } from "../../utils/ResponseMapper";
import {
  changePasswordBodyDTO,
  IFilterUser,
  LoginAuthBodyDTO,
  RegisterAuthBodyDTO,
  RegisterAuthResponse,
} from "./authTypes";
import jwt, { decode } from "jsonwebtoken";
import { TokenDecodeInterface } from "../../middleware/tokenTypes";
import { environment } from "../../config/dotenvConfig";
import {
  createUser,
  deleteUser,
  getUser,
  getUserByEmail,
  getUserById,
  getUserCount,
  updateUser,
} from "./authRepository.";
import { registerValidate, updateUserValidate } from "./authValidate";

export const getUserService = async ({
  search,
  page = 1,
  perPage = 10,
  role,
}: IFilterUser) => {
  const [onts, totalData] = await Promise.all([
    getUser({ search, page, perPage, role }),
    getUserCount({ search, role }),
  ]);

  const response = { data: onts, meta: Meta(page, perPage, totalData) };
  return response;
};

export const registerService = async ({
  email,
  name,
  password,
  role,
}: RegisterAuthBodyDTO) => {
  const user = await getUserByEmail(email);
  if (user) {
    return new ErrorApp(
      MESSAGES.ERROR.ALREADY.USER,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  const validate = await registerValidate({ email, name, password, role });
  if (validate instanceof ErrorApp) {
    return new ErrorApp(validate.message, validate.statusCode, validate.code);
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const response = await createUser({
    email,
    name,
    password: hashPassword,
    role,
  });
  return response;
};

export const loginService = async (body: LoginAuthBodyDTO) => {
  if (typeof body.email !== "string" || typeof body.password !== "string") {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.BODY,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  const user = await getUserByEmail(body.email);
  if (!user) {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.LOGIN,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }
  const match = await bcrypt.compare(body.password, user.password);
  if (!match) {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.LOGIN,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }
  const token = jwt.sign(
    {
      id: user.id,
    },
    environment.JWT_SECRET as string,
    { expiresIn: "1d" }
  );

  return { access_token: token };
};

export const updateUserService = async ({
  id,
  name,
  email,
  role,
}: RegisterAuthResponse) => {
  if (!id) {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.ID,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  const userId = await getUserById(id);
  if (!userId) {
    return new ErrorApp(
      MESSAGES.ERROR.NOT_FOUND.USER.ACCOUNT,
      404,
      MESSAGE_CODE.NOT_FOUND
    );
  }

  const user = await getUserByEmail(email as string);
  if (user && userId.id !== id) {
    return new ErrorApp(
      MESSAGES.ERROR.ALREADY.USER,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  const validate = await updateUserValidate({
    name,
    email,
    role,
  });
  if (validate instanceof ErrorApp) {
    return new ErrorApp(validate.message, validate.statusCode, validate.code);
  }

  const updatedFields: Partial<RegisterAuthBodyDTO> = {};

  if (email !== undefined) updatedFields.email = email;
  if (name !== undefined) updatedFields.name = name;
  if (role !== undefined) updatedFields.role = role;

  const response = await updateUser(id, { ...updatedFields });
  return response;
};

export const logoutService = async (token: string) => {
  const decodeToken = decode(token) as TokenDecodeInterface;
  const id = decodeToken.id;
  const response = await getUserById(id);
  if (!response) {
    return new ErrorApp(
      MESSAGES.ERROR.NOT_FOUND.USER.ACCOUNT,
      404,
      MESSAGE_CODE.NOT_FOUND
    );
  }
  return response;
};

export const deleteUserService = async (id: string) => {
  if (!id) {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.ID,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  const user = await getUserById(id);
  if (!user) {
    return new ErrorApp(
      MESSAGES.ERROR.NOT_FOUND.USER.ACCOUNT,
      404,
      MESSAGE_CODE.NOT_FOUND
    );
  }

  const response = await deleteUser(id);
  return response;
};

export const changePasswordService = async ({
  id,
  password,
  newPassword,
}: changePasswordBodyDTO) => {
  if (!password) {
    return new ErrorApp(
      MESSAGES.ERROR.REQUIRED.OLD_PASSWORD,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  if (!newPassword) {
    return new ErrorApp(
      MESSAGES.ERROR.REQUIRED.NEW_PASSWORD,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  if (typeof password !== "string") {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.OLD_PASSWORD,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  if (typeof newPassword !== "string") {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.NEW_PASSWORD,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  if (newPassword.length < 8) {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.USER.PASSWORD_LENGTH,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  if (!id) {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.ID,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  const user = await getUserById(id);
  if (!user) {
    return new ErrorApp(
      MESSAGES.ERROR.NOT_FOUND.USER.ACCOUNT,
      404,
      MESSAGE_CODE.NOT_FOUND
    );
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.PASSWORD_MATCH,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  const matchNew = await bcrypt.compare(newPassword, user.password);
  if (matchNew) {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.PASSWORD_SAME,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  const hashPassword = await bcrypt.hash(newPassword, 10);

  const response = await updateUser(id, { password: hashPassword });
  return response;
};
