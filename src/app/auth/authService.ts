import * as bcrypt from "bcrypt";
import { MESSAGE_CODE } from "../../utils/MessageCode";
import { MESSAGES } from "../../utils/Messages";
import { ErrorApp } from "../../utils/ResponseMapper";
import { LoginAuthBodyDTO } from "./authTypes";
import jwt, { decode } from "jsonwebtoken";
import { TokenDecodeInterface } from "../../middleware/tokenTypes";
import { environment } from "../../config/dotenvConfig";
import { getUserByEmail, getUserById } from "./authRepository.";

export const loginService = async (body: LoginAuthBodyDTO) => {

  if (
    typeof body.email !== 'string' ||
    typeof body.password !== 'string') {
      return new ErrorApp(MESSAGES.ERROR.INVALID.BODY, 400, MESSAGE_CODE.BAD_REQUEST);
    }
    
  const user = await getUserByEmail(body.email);
  if (!user) {
    return new ErrorApp(MESSAGES.ERROR.INVALID.LOGIN, 400, MESSAGE_CODE.BAD_REQUEST);
  }
  const match = await bcrypt.compare(body.password, user.password);
  if (!match) {
    return new ErrorApp(MESSAGES.ERROR.INVALID.LOGIN, 400, MESSAGE_CODE.BAD_REQUEST);
  }
  const token = jwt.sign({
    id: user.id,
  }, environment.JWT_SECRET as string, { expiresIn: '1d' })

  return { access_token: token }
}

export const logoutService = async (token: string) => {
  const decodeToken = decode(token) as TokenDecodeInterface
  const id = decodeToken.id
  const response = await getUserById(id)
  if (!response) {
      return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.USER.ACCOUNT, 404, MESSAGE_CODE.NOT_FOUND)
  }
  return response
}