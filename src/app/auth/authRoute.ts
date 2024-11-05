import { Router } from "express";
import { CatchWrapper } from "../../utils/CatchWrapper";
import { loginController } from "./authController";

const route = Router()

route.post("/login", CatchWrapper(loginController))

export default route