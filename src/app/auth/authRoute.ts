import { Router } from "express";
import { CatchWrapper } from "../../utils/CatchWrapper";
import { checkToken, loginController } from "./authController";
import { VerifyToken } from "../../middleware/verifyToken";

const route = Router();

route.post("/login", CatchWrapper(loginController));
route.post("/check-token", VerifyToken, CatchWrapper(checkToken));

export default route;
